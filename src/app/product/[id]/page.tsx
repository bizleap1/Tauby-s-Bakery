"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ShoppingCart, Heart, Calendar, Clock, Info } from "lucide-react";
import { motion } from "framer-motion";
import { WEIGHT_OPTIONS, DELIVERY_SLOTS, EGG_TYPES, REGULAR_CAKES } from "@/constants";
import { useCart } from "@/store/useCart";
import { toast } from "react-hot-toast";
import { cn, formatPrice } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  rating: number;
  reviews: number;
}

// Generate full product list from constants
const ALL_PRODUCTS_LIST = [
  ...REGULAR_CAKES.map((c, index) => ({
    ...c,
    description: "Indulge in our artisanal " + c.name + ". Handcrafted with the finest ingredients and a perfect balance of flavors.",
    images: [c.image, "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600"],
    rating: 4.8,
    reviews: 120 + (index % 10)
  })),
  {
    id: "ds-1",
    name: "Blueberry Cheesecake",
    description: "Creamy, rich cheesecake topped with a generous layer of fresh blueberry compote.",
    price: 1300,
    category: "Desserts",
    images: ["https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=1000"],
    rating: 4.9,
    reviews: 89
  },
  {
    id: "gl-1",
    name: "Artisan Pistachio Gelato",
    description: "Authentic Italian-style gelato made with roasted Sicilian pistachios.",
    price: 250,
    category: "Gelato",
    images: ["/artisan-gelato-hero.png"],
    rating: 5.0,
    reviews: 45
  }
];

const MOCK_PRODUCTS: Record<string, Product> = ALL_PRODUCTS_LIST.reduce((acc, p) => ({
  ...acc,
  [p.id]: p
}), {});

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = MOCK_PRODUCTS[id as string] || ALL_PRODUCTS_LIST[0];
  const { addItem, setIsOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [minDate, setMinDate] = useState("");
  const [selectedWeight, setSelectedWeight] = useState<string>(WEIGHT_OPTIONS[0]);
  const [selectedEggType, setSelectedEggType] = useState<string>(EGG_TYPES[1]); // Eggless default
  const [customMessage, setCustomMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setMounted(true);
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleAddToCart = () => {
    if (!deliveryDate || !deliverySlot) {
      toast.error("Please select a delivery date and slot");
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      eggType: selectedEggType as "Egg" | "Eggless",
      weight: selectedWeight,
      customMessage,
      deliveryDate,
      deliverySlot,
    });

    setIsOpen(true);
    toast.success("Added to bag!");
  };

  if (!mounted) return <div className="min-h-screen bg-cream animate-pulse" />;

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-3xl overflow-hidden bg-cream/30 shadow-premium"
            >
              <Image
                src={product.images[activeImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    activeImage === idx ? "border-pink-deep" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info & Options */}
          <div className="space-y-8">
            <div>
              <span className="text-red-primary font-bold tracking-widest uppercase text-sm">{product.category}</span>
              <h1 className="text-4xl font-heading font-bold text-dark mt-2 mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 text-dark/60">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-sm">({product.reviews} customer reviews)</span>
              </div>
              <p className="text-3xl font-bold text-red-primary mt-6">₹{formatPrice(product.price)}</p>
            </div>

            <p className="text-dark-muted leading-relaxed">{product.description}</p>

            <div className="space-y-6 border-t border-dark/5 pt-8">
              {/* Weight Options */}
              <div>
                <label className="block text-sm font-bold text-dark uppercase tracking-widest mb-4">Select Weight</label>
                <div className="flex flex-wrap gap-3">
                  {WEIGHT_OPTIONS.map((weight) => (
                    <button
                      key={weight}
                      onClick={() => setSelectedWeight(weight)}
                      className={cn(
                        "px-6 py-2 rounded-full border-2 transition-all font-medium",
                        selectedWeight === weight ? "border-red-primary bg-red-primary/5 text-red-primary" : "border-dark/10 text-dark/60 hover:border-dark/20"
                      )}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Egg/Eggless Options */}
              <div>
                <label className="block text-sm font-bold text-dark uppercase tracking-widest mb-4">Dietary Preference</label>
                <div className="flex gap-4">
                  {EGG_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedEggType(type)}
                      className={cn(
                        "flex-1 py-3 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all",
                        selectedEggType === type ? "border-dark bg-dark text-cream" : "border-dark/10 text-dark/60 hover:border-dark/20"
                      )}
                    >
                      <span className={cn("w-3 h-3 rounded-full", type === "Eggless" ? "bg-green-500" : "bg-red-500")} />
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Message */}
              <div>
                <label className="block text-sm font-bold text-dark uppercase tracking-widest mb-4">Custom Message on Cake (Optional)</label>
                <input
                  type="text"
                  maxLength={30}
                  placeholder="E.g., Happy Birthday Mom"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  className="w-full px-6 py-3 rounded-2xl bg-cream/30 border border-dark/10 focus:outline-none focus:border-red-primary"
                />
              </div>

              {/* Delivery Schedule */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-dark uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Calendar size={16} /> Delivery Date
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full px-6 py-3 rounded-2xl bg-cream/30 border border-dark/10 focus:outline-none focus:border-red-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Clock size={16} /> Delivery Slot
                  </label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-6 py-3 rounded-2xl bg-cream/30 border border-dark/10 focus:outline-none focus:border-red-primary appearance-none"
                  >
                    <option value="">Select a slot</option>
                    {DELIVERY_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Add to Cart Actions */}
              <div className="flex gap-4 pt-8">
                <div className="flex items-center border-2 border-dark/10 rounded-full overflow-hidden">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-3 hover:bg-cream/50">-</button>
                  <span className="px-4 font-bold text-lg min-w-[40px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-3 hover:bg-cream/50">+</button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-grow btn-primary flex items-center justify-center gap-3"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="p-4 rounded-full border-2 border-dark/10 text-dark/40 hover:text-red-primary hover:border-red-primary transition-all">
                  <Heart size={24} />
                </button>
              </div>

              <div className="bg-red-light/10 rounded-2xl p-4 flex items-start gap-4">
                <span className="text-red-primary shrink-0 mt-1"><Info size={20} /></span>
                <p className="text-sm text-dark-muted leading-snug">
                  Please note: Final price may vary based on weight and custom decorations. Same day delivery available for orders before 2 PM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
