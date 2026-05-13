"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Package, MapPin, Calendar, Clock, CheckCircle2, ChevronLeft, Truck, UtensilsCrossed, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";

import { Order } from "@/types";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          ),
          addresses (*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching order:", error);
        router.push("/profile/orders");
      } else {
        setOrder(data);
      }
      setIsLoading(false);
    };

    if (id) fetchOrder();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 bg-cream/30 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-primary"></div>
      </div>
    );
  }

  if (!order) return null;

  const steps = [
    { label: "Paid", icon: CheckCircle2, status: ["Paid", "Confirmed", "Preparing", "Out for Delivery", "Delivered"] },
    { label: "Confirmed", icon: ShoppingBag, status: ["Confirmed", "Preparing", "Out for Delivery", "Delivered"] },
    { label: "Preparing", icon: UtensilsCrossed, status: ["Preparing", "Out for Delivery", "Delivered"] },
    { label: "Out for Delivery", icon: Truck, status: ["Out for Delivery", "Delivered"] },
    { label: "Delivered", icon: CheckCircle2, status: ["Delivered"] },
  ];

  const currentStepIndex = steps.findIndex(step => step.status.includes(order.status));

  return (
    <div className="pt-32 pb-24 bg-cream/30 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link 
          href="/profile/orders"
          className="inline-flex items-center gap-2 text-dark/60 hover:text-red-primary transition-colors font-bold mb-8"
        >
          <ChevronLeft size={20} />
          Back to Orders
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Tracking Card */}
            <div className="premium-card p-8 bg-white shadow-premium">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h1 className="text-2xl font-heading font-bold text-dark">Track Order</h1>
                  <p className="text-dark/40 text-xs font-bold uppercase tracking-widest mt-1">Order #{order.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Status</p>
                  <p className="font-bold text-red-primary uppercase tracking-wider">{order.status}</p>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative flex justify-between">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-dark/5 -z-10" />
                <div 
                  className="absolute top-5 left-0 h-0.5 bg-red-primary transition-all duration-1000 -z-10" 
                  style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                />
                
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index <= currentStepIndex;
                  return (
                    <div key={index} className="flex flex-col items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive ? "bg-red-primary text-white shadow-lg shadow-red-primary/30" : "bg-white text-dark/20 border-2 border-dark/5"
                      }`}>
                        <Icon size={18} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider text-center max-w-[80px] ${
                        isActive ? "text-dark" : "text-dark/20"
                      }`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items Card */}
            <div className="premium-card p-8 bg-white">
              <h2 className="text-xl font-heading font-bold text-dark mb-6">Order Items</h2>
              <div className="space-y-6">
                {order.order_items.map((item: any) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <div className="w-20 h-20 bg-cream rounded-2xl overflow-hidden shrink-0 border border-dark/5">
                      <img 
                        src={item.products?.image_url || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=200&auto=format&fit=crop"} 
                        alt={item.products?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-dark">{item.products?.name || "Premium Product"}</h4>
                      <p className="text-xs text-dark/60 mt-1 uppercase font-medium tracking-wider">
                        {item.weight} • {item.egg_type}
                      </p>
                      {item.custom_message && (
                        <p className="text-xs italic text-red-primary mt-1">
                          &quot;{item.custom_message}&quot;
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-dark">₹{formatPrice(item.price)}</p>
                      <p className="text-xs text-dark/40 font-medium">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-dark/5 space-y-3">
                <div className="flex justify-between text-sm text-dark/60">
                  <span>Subtotal</span>
                  <span>₹{formatPrice(order.total_amount - 150)}</span>
                </div>
                <div className="flex justify-between text-sm text-dark/60">
                  <span>Delivery Charge</span>
                  <span>₹150.00</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-dark pt-3 border-t border-dark/5">
                  <span>Total</span>
                  <span className="text-red-primary">₹{formatPrice(order.total_amount)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Delivery Info */}
            <div className="premium-card p-6 bg-white">
              <h3 className="text-lg font-heading font-bold text-dark mb-6 flex items-center gap-2">
                <Truck size={18} className="text-red-primary" /> Delivery Info
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-dark/20 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Address</p>
                    <p className="text-sm text-dark leading-relaxed">
                      {order.addresses?.address_line}<br />
                      {order.addresses?.city}, {order.addresses?.pincode}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Calendar size={18} className="text-dark/20 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Delivery Date</p>
                    <p className="text-sm text-dark">{format(new Date(order.delivery_date), 'PPPP')}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock size={18} className="text-dark/20 shrink-0 mt-1" />
                  <div>
                    <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Delivery Slot</p>
                    <p className="text-sm text-dark">{order.delivery_slot}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="premium-card p-6 bg-red-primary text-white">
              <h3 className="text-lg font-heading font-bold mb-4">Need Help?</h3>
              <p className="text-sm text-white/80 mb-6">If you have any questions regarding your order, please contact our support.</p>
              <a href="tel:7420026601" className="block w-full text-center py-3 rounded-xl bg-white text-red-primary font-bold text-sm hover:bg-cream transition-colors">
                Call Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
