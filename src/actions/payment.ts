"use server";

import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export async function createRazorpayOrder(amount: number) {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay works in paise
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
  signature: string
) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    
    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(`${razorpayOrderId}|${razorpayPaymentId}`);
    const digest = shasum.digest("hex");

    if (digest !== signature) {
      return { success: false, error: "Invalid payment signature" };
    }

    return { success: true };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return { success: false, error: "Failed to verify payment" };
  }
}
