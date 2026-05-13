"use server";

import Razorpay from "razorpay";
import crypto from "crypto";
import { createClient } from "@/utils/supabase/server";

import { CartItem } from "@/types";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function createRazorpayOrder(amount: number) {
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay works in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return { success: true, order };
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return { success: false, error: "Failed to create payment order" };
  }
}

export async function verifyRazorpayPayment(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  signature: string,
  orderData: {
    items: CartItem[];
    total: number;
    address: string;
    pincode: string;
    deliveryDate: string;
    deliverySlot: string;
  }
) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== signature) {
      return { success: false, error: "Invalid payment signature" };
    }

    // ─── SAVE TO SUPABASE ───
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    // 1. Get or Create Address
    // For simplicity, we'll just use the provided address string in the order
    // In a real app, you'd save it to the addresses table first
    const { data: addressData, error: addressError } = await supabase
      .from('addresses')
      .insert({
        user_id: user.id,
        address_line: orderData.address,
        pincode: orderData.pincode,
        is_default: true
      })
      .select()
      .single();

    if (addressError) {
      console.error("Address error:", addressError);
      // Continue even if address save fails, but use a null address_id
    }

    // 2. Insert Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: orderData.total,
        status: 'Paid',
        delivery_date: orderData.deliveryDate,
        delivery_slot: orderData.deliverySlot,
        address_id: addressData?.id,
        payment_id: razorpayPaymentId,
        order_id: razorpayOrderId
      })
      .select()
      .single();

    if (orderError) {
      throw orderError;
    }

    // 3. Insert Order Items
    const orderItems = orderData.items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
      egg_type: item.eggType,
      weight: item.weight,
      custom_message: item.customMessage
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      throw itemsError;
    }

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error verifying payment and saving order:", error);
    return { success: false, error: "Failed to verify payment and save order" };
  }
}
