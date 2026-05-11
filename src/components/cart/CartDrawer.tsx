"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/store/useCart";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, getItemCount } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-[70] shadow-premium flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-dark/5 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-dark flex items-center gap-3">
                <ShoppingBag className="text-red-primary" />
                Your Bag <span className="text-sm font-body font-normal text-dark/40">({getItemCount()} items)</span>
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-red-light/20 rounded-full transition-colors">
                <X size={24} className="text-dark" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={`${item.id}-${item.weight}-${item.eggType}-${item.deliveryDate}-${item.deliverySlot}-${item.customMessage}`} className="flex gap-4 group">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white shrink-0 shadow-soft">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-dark leading-tight">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id, item.weight, item.eggType, item.deliveryDate, item.deliverySlot, item.customMessage)}
                          className="text-dark/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-dark/60 mb-2">
                        {item.weight} • {item.eggType}
                        {item.deliveryDate && <span className="block mt-1">Delivery: {item.deliveryDate} ({item.deliverySlot})</span>}
                      </p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-dark/10 rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.weight, item.eggType, item.deliveryDate, item.deliverySlot, item.customMessage)}
                            className="px-3 py-1 hover:bg-white"
                          >-</button>
                          <span className="px-2 font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.weight, item.eggType, item.deliveryDate, item.deliverySlot, item.customMessage)}
                            className="px-3 py-1 hover:bg-white"
                          >+</button>
                        </div>
                        <p className="font-bold text-dark">₹{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-red-light/20 rounded-full flex items-center justify-center text-red-primary mb-4">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-dark">Your bag is empty</h3>
                  <p className="text-dark-muted text-sm max-w-[200px]">Looks like you haven&apos;t added any sweet treats yet.</p>
                  <button 
                    onClick={onClose}
                    className="btn-primary mt-4"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-dark/5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-dark/60">
                    <span>Subtotal</span>
                    <span>₹{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-dark/60">
                    <span>Delivery Charge</span>
                    <span className="text-green-600 font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-dark pt-2">
                    <span>Total</span>
                    <span>₹{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
                
                <Link 
                  href="/checkout" 
                  onClick={onClose}
                  className="btn-primary w-full flex items-center justify-center gap-3"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </Link>
                <p className="text-[10px] text-center text-dark/40 uppercase tracking-widest font-medium">
                  Freshly baked • Secure Payment • Fast Delivery
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
