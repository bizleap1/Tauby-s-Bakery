"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/store/useCart";
import { MapPin, Truck, CreditCard, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "react-hot-toast";
import Script from "next/script";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/actions/payment";
import { motion } from "framer-motion";

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayErrorResponse {
  error: { description: string };
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any; 
  }
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    city: "Nagpur",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotalPrice();
  const deliveryCharge = subtotal > 1000 ? 0 : 50;
  const total = subtotal + deliveryCharge;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!window.Razorpay) {
      toast.error("Payment system is currently unavailable. Please try again later.");
      return;
    }

    setIsProcessing(true);
    const loadingToast = toast.loading("Initializing payment...");

    try {
      // 1. Create order on server
      const { success, order, error } = await createRazorpayOrder(total);

      if (!success || !order) {
        throw new Error(error || "Failed to create order");
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use public key here if you have one, or configure proxy
        amount: order.amount,
        currency: order.currency,
        name: "Tauby's Bakery",
        description: "Order Payment",
        image: "https://taubys.com/favicon.ico", // Replace with actual logo URL if available
        order_id: order.id,
        handler: async function (response: RazorpayResponse) {
          toast.loading("Verifying payment...", { id: loadingToast });
          
          // 3. Verify payment on server
          const verifyResult = await verifyRazorpayPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );

          if (verifyResult.success) {
            toast.success("Payment successful! Order placed.", { id: loadingToast });
            setOrderId(`#TB-${(Math.random() * 1000000).toFixed(0)}`);
            setStep(3);
            clearCart();
          } else {
            toast.error("Payment verification failed. Please contact support.", { id: loadingToast });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#3E2723", // Chocolate Brown
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: RazorpayErrorResponse) {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      
      toast.dismiss(loadingToast);
      rzp.open();

    } catch (error: unknown) {
      console.error("Checkout error:", error);
      const errorMessage = error instanceof Error ? error.message : "An error occurred during checkout";
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="pt-40 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-heading font-bold text-chocolate mb-4">Your bag is empty</h2>
        <Link href="/menu" className="btn-primary">Return to Menu</Link>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="pt-32 pb-24 bg-cream/30 min-h-screen">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Checkout Progress */}
          <div className="flex items-center justify-center mb-12 gap-4">
            <div className={cn("flex items-center gap-2", step >= 1 ? "text-chocolate" : "text-chocolate/20")}>
              <span className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", step >= 1 ? "bg-chocolate text-cream" : "bg-chocolate/10")}>1</span>
              <span className="font-bold hidden sm:block">Delivery</span>
            </div>
            <ChevronRight size={20} className="text-chocolate/20" />
            <div className={cn("flex items-center gap-2", step >= 2 ? "text-chocolate" : "text-chocolate/20")}>
              <span className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", step >= 2 ? "bg-chocolate text-cream" : "bg-chocolate/10")}>2</span>
              <span className="font-bold hidden sm:block">Payment</span>
            </div>
            <ChevronRight size={20} className="text-chocolate/20" />
            <div className={cn("flex items-center gap-2", step >= 3 ? "text-chocolate" : "text-chocolate/20")}>
              <span className={cn("w-8 h-8 rounded-full flex items-center justify-center font-bold", step >= 3 ? "bg-chocolate text-cream" : "bg-chocolate/10")}>3</span>
              <span className="font-bold hidden sm:block">Confirmation</span>
            </div>
          </div>

          {step < 3 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Checkout Form */}
              <div className="lg:col-span-2 space-y-8">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-8 bg-white">
                    <h2 className="text-2xl font-heading font-bold text-chocolate mb-6 flex items-center gap-3">
                      <MapPin className="text-pink-deep" /> Delivery Details
                    </h2>
                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">Full Name</label>
                          <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">Phone Number</label>
                          <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">Email Address</label>
                          <input required name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none" />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">Delivery Address</label>
                          <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none resize-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">Pincode</label>
                          <input required name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">City</label>
                          <input name="city" value={formData.city} readOnly className="w-full px-4 py-3 rounded-xl bg-chocolate/5 border border-chocolate/5 text-chocolate/40 cursor-not-allowed" />
                        </div>
                      </div>
                      <button type="submit" className="btn-primary w-full mt-8">Continue to Payment</button>
                    </form>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="premium-card p-8 bg-white">
                    <h2 className="text-2xl font-heading font-bold text-chocolate mb-6 flex items-center gap-3">
                      <CreditCard className="text-pink-deep" /> Payment Method
                    </h2>
                    <div className="space-y-4">
                      <div className="p-6 rounded-2xl border-2 border-chocolate bg-cream/20 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1">
                            <Image src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" width={32} height={32} />
                          </div>
                          <div>
                            <p className="font-bold text-chocolate">Razorpay Secure</p>
                            <p className="text-xs text-chocolate/60">UPI, Cards, Netbanking, Wallets</p>
                          </div>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-chocolate flex items-center justify-center text-cream">
                          <CheckCircle2 size={16} />
                        </div>
                      </div>
                      <p className="text-sm text-chocolate/40 text-center italic">You will be redirected to Razorpay secure checkout.</p>
                    </div>
                    <div className="flex gap-4 mt-8">
                      <button onClick={() => setStep(1)} className="px-8 py-3 rounded-full font-bold border border-chocolate/10 hover:bg-chocolate/5 transition-colors">Back</button>
                      <button 
                        onClick={handlePayment} 
                        disabled={isProcessing}
                        className="btn-primary flex-grow disabled:opacity-70 flex justify-center items-center"
                      >
                        {isProcessing ? "Processing..." : `Pay ₹${total.toLocaleString()}`}
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="premium-card p-6 bg-white sticky top-32">
                  <h3 className="text-xl font-heading font-bold text-chocolate mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 scrollbar-thin">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.weight}-${item.eggType}`} className="flex justify-between gap-4">
                        <div className="flex-grow">
                          <p className="text-sm font-bold text-chocolate line-clamp-1">{item.name}</p>
                          <p className="text-[10px] text-chocolate/40 uppercase font-medium">{item.quantity} x {item.weight} ({item.eggType})</p>
                        </div>
                        <span className="text-sm font-bold text-chocolate whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3 pt-6 border-t border-chocolate/5">
                    <div className="flex justify-between text-sm text-chocolate/60">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-chocolate/60">
                      <span>Delivery Charge</span>
                      <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-chocolate pt-2 border-t border-chocolate/5">
                      <span>Total</span>
                      <span className="text-pink-deep">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-pink-pastel/10 rounded-xl flex items-start gap-3">
                    <Truck size={18} className="text-pink-deep shrink-0 mt-0.5" />
                    <p className="text-xs text-chocolate-light leading-snug">
                      Estimated delivery: <strong>{items[0]?.deliveryDate || "Soon"}</strong> during <strong>{items[0]?.deliverySlot || "standard hours"}</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Order Confirmation Step */
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto text-center space-y-8 py-12">
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={64} />
              </div>
              <div>
                <h2 className="text-4xl font-heading font-bold text-chocolate mb-2">Order Confirmed!</h2>
                <p className="text-chocolate-light">Thank you for choosing Tauby&apos;s Bakery. Your sweet celebration is on its way.</p>
              </div>
              <div className="premium-card p-8 bg-white text-left space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-chocolate/5">
                  <span className="text-chocolate/40 font-bold uppercase tracking-widest text-xs">Order ID</span>
                  <span className="font-bold text-chocolate">{orderId}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-chocolate/5">
                  <span className="text-chocolate/40 font-bold uppercase tracking-widest text-xs">Delivery Address</span>
                  <span className="text-sm font-medium text-chocolate text-right">{formData.address}, {formData.pincode}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-chocolate/40 font-bold uppercase tracking-widest text-xs">Amount Paid</span>
                  <span className="text-xl font-bold text-pink-deep">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/profile/orders" className="btn-primary">Track Your Order</Link>
                <Link href="/" className="btn-secondary">Back to Home</Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
