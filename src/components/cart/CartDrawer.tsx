"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/store/useCart";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, getItemCount } = useCart();

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
            className="fixed inset-0 bg-chocolate/40 backdrop-blur-sm z-[60]"
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
            <div className="p-6 border-b border-chocolate/5 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-chocolate flex items-center gap-3">
                <ShoppingBag className="text-pink-deep" />
                Your Bag <span className="text-sm font-body font-normal text-chocolate/40">({getItemCount()} items)</span>
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-pink-pastel/20 rounded-full transition-colors">
                <X size={24} className="text-chocolate" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={`${item.id}-${item.weight}-${item.eggType}`} className="flex gap-4 group">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white shrink-0 shadow-soft">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-chocolate leading-tight">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id, item.weight)}
                          className="text-chocolate/20 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-chocolate/60 mb-2">
                        {item.weight} • {item.eggType}
                      </p>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border border-chocolate/10 rounded-full">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.weight)}
                            className="px-3 py-1 hover:bg-white"
                          >-</button>
                          <span className="px-2 font-bold text-sm min-w-[20px] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.weight)}
                            className="px-3 py-1 hover:bg-white"
                          >+</button>
                        </div>
                        <p className="font-bold text-chocolate">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-pink-pastel/20 rounded-full flex items-center justify-center text-pink-deep mb-4">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-chocolate">Your bag is empty</h3>
                  <p className="text-chocolate-light text-sm max-w-[200px]">Looks like you haven&apos;t added any sweet treats yet.</p>
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
              <div className="p-6 bg-white border-t border-chocolate/5 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-chocolate/60">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-chocolate/60">
                    <span>Delivery Charge</span>
                    <span className="text-green-600 font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-chocolate pt-2">
                    <span>Total</span>
                    <span>₹{getTotalPrice().toLocaleString()}</span>
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
                <p className="text-[10px] text-center text-chocolate/40 uppercase tracking-widest font-medium">
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
