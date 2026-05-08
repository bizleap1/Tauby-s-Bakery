"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Heart, MessageSquare, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_TESTIMONIALS = [
  {
    id: 1,
    name: "Anjali Deshmukh",
    role: "Bride",
    content: "The wedding cake was beyond my expectations. It was not just a cake but a piece of art that everyone couldn't stop talking about. Thank you, Tauby's!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=anjali",
    category: "Wedding",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb80d?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Rohan Sharma",
    role: "Birthday Host",
    content: "We've been ordering from Tauby's for over 10 years. Their Belgian Chocolate is still the best in Nagpur. Consistent quality and great service.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=rohan",
    category: "Birthday"
  },
  {
    id: 3,
    name: "Dr. Smita Kulkarni",
    role: "Regular Customer",
    content: "I love their eggless options. The texture is so light and airy, you can't even tell the difference. Highly recommend the Red Velvet!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=smita",
    category: "Regular"
  },
  {
    id: 4,
    name: "Vikram Mehra",
    role: "Corporate Client",
    content: "Tauby's gift hampers were perfect for our festive corporate gifting. The packaging was premium and the contents were delicious.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=vikram",
    category: "Gifting"
  },
  {
    id: 5,
    name: "Priya Nair",
    role: "Mother of Two",
    content: "The custom kids' cake for my son's 5th birthday was incredible. The level of detail in the fondant work was impressive.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=priya",
    category: "Kids"
  },
  {
    id: 6,
    name: "Amit Patel",
    role: "Gelato Lover",
    content: "Their artisan gelato is a hidden gem in Nagpur. The Sicilian Pistachio takes me straight back to Italy. Simply divine.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=amit",
    category: "Gelato"
  }
];

const STATS = [
  { value: "50k+", label: "Celebrations" },
  { value: "4.9", label: "Avg Rating" },
  { value: "20+", label: "Years" },
  { value: "100%", label: "Pure Veg" },
];

export default function TestimonialsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredTestimonials = activeFilter === "All" 
    ? ALL_TESTIMONIALS 
    : ALL_TESTIMONIALS.filter(t => t.category === activeFilter);

  if (!mounted) return <div className="min-h-screen bg-cream/20" />;

  return (
    <div className="min-h-screen bg-[#fdfaf8]">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2000&auto=format&fit=crop"
          alt="Happy Customers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-dark/40 backdrop-blur-[2px]" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold mb-8"
          >
            <Star size={14} className="text-gold fill-gold" /> Nagpur&apos;s Most Trusted Bakery
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight"
          >
            Real Stories, <br/>
            <span className="text-gold">Sinfull Moments</span>
          </motion.h1>
        </div>
      </section>

      {/* Floating Stats Bar */}
      <section className="relative -mt-16 z-20">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-[3rem] shadow-premium p-8 md:p-12 border border-dark/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s, i) => (
                <div key={i} className="text-center relative">
                  {i < STATS.length - 1 && <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-dark/10" />}
                  <p className="text-4xl font-heading font-bold text-red-primary mb-2">{s.value}</p>
                  <p className="text-[10px] text-dark-muted uppercase tracking-[0.2em] font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Testimonials Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
            <div>
              <h2 className="text-4xl font-heading font-bold text-dark mb-4 text-center md:text-left">What Nagpur Thinks</h2>
              <p className="text-dark-muted text-center md:text-left">Thousands of families trust us with their most precious celebrations.</p>
            </div>
            
            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
              {["All", "Wedding", "Birthday", "Gifting", "Gelato"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-6 py-2 rounded-full font-bold transition-all text-xs uppercase tracking-wide border",
                    activeFilter === f
                      ? "bg-red-primary text-white border-red-primary shadow-lg"
                      : "bg-white text-dark/40 border-dark/5 hover:border-red-primary/20"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTestimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-dark/5 flex flex-col group hover:shadow-premium transition-all"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-gold text-gold" />
                      ))}
                    </div>
                    <Quote className="text-red-primary/10 group-hover:text-red-primary/20 transition-colors" size={40} />
                  </div>
                  
                  <p className="text-dark/80 text-lg leading-relaxed italic mb-10 flex-1">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-8 border-t border-dark/5">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-red-primary/10">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-dark">{t.name}</h4>
                      <p className="text-[10px] text-dark-muted uppercase tracking-widest font-bold">{t.role}</p>
                    </div>
                    <div className="ml-auto text-[10px] bg-cream px-2 py-1 rounded-full font-bold text-dark/40 uppercase tracking-tighter">
                      {t.category}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Share Your Story CTA */}
      <section className="py-32 bg-dark text-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-primary/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-[4rem] p-12 md:p-20 border border-white/10 relative overflow-hidden text-center">
            <div className="absolute top-10 left-10 text-gold opacity-20">
              <Sparkles size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-red-primary rounded-3xl flex items-center justify-center mx-auto mb-10 rotate-12">
                <MessageSquare size={32} className="text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">Share Your Sinfull Moment</h2>
              <p className="text-white/60 text-lg mb-12 max-w-xl mx-auto">
                Did our cake make your celebration extra special? We would love to hear your story and feature you on our page.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="bg-white text-dark px-12 py-4 rounded-full font-bold hover:bg-gold transition-all shadow-xl">
                  Leave a Review
                </button>
                <button className="bg-transparent border border-white/20 text-white px-12 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Play size={18} fill="white" /> Watch Stories
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-sm font-bold text-dark/40 uppercase tracking-[0.5em] mb-12">As Featured In</h3>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
            {["Nagpur Times", "The Hitavada", "Foodies of Nagpur", "Lokmat Times"].map(n => (
              <span key={n} className="text-2xl font-heading font-bold text-dark">{n}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
