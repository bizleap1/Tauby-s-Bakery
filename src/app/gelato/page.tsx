"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Leaf, Heart, Snowflake, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const GELATO_FLAVORS = [
  {
    name: "Classic Belgian Chocolate",
    description: "Rich, dark chocolate made with premium Belgian cocoa.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600",
    tag: "Bestseller"
  },
  {
    name: "Sicilian Pistachio",
    description: "Authentic roasted pistachios for a nutty, creamy finish.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=600",
    tag: "Premium"
  },
  {
    name: "Wild Berry Sorbet",
    description: "Refreshing blend of seasonal berries, 100% dairy-free.",
    image: "https://images.unsplash.com/photo-1534706936160-d5ee67737249?q=80&w=600",
    tag: "Vegan"
  },
  {
    name: "Alphonso Mango",
    description: "Pure mango pulp from the finest Ratnagiri mangoes.",
    image: "/mango-gelato.png",
    tag: "Seasonal"
  },
  {
    name: "Vanilla Bean",
    description: "Classic Madagascar vanilla with visible bean specks.",
    image: "/vanilla-gelato.png",
    tag: "Classic"
  },
  {
    name: "Roasted Hazelnut",
    description: "Indulgent hazelnut paste blended with smooth cream.",
    image: "/hazelnut-gelato.png",
    tag: "New"
  }
];

export default function GelatoPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-pink-pastel/10" />;

  return (
    <div className="min-h-screen bg-[#fffcf9] overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <Image
          src="/gelato-hero-new.png"
          alt="Artisan Gelato"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/10 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[9px] md:text-[10px] uppercase tracking-widest font-bold mb-6 md:mb-8"
          >
            <Sparkles size={14} className="text-gold" /> Artisan Italian Gelato
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl font-heading font-bold text-white mb-6 md:mb-8 leading-tight"
          >
            Sinfull <span className="text-gold">Chill</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 max-w-2xl mx-auto text-base md:text-xl leading-relaxed mb-10 md:mb-12"
          >
            Experience the true essence of Italian craftsmanship. Our gelato is churned fresh daily with low overrun for a dense, silky, and intense flavor experience.
          </motion.p>
        </div>

        {/* Floating Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 hidden md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Explore Flavors</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534706936160-d5ee67737249?q=80&w=800&auto=format&fit=crop"
                alt="Gelato Making"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-red-primary/10 mix-blend-overlay" />
            </div>
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark leading-tight">
                Why Tauby&apos;s Gelato is <br/>
                <span className="text-red-primary italic">Different.</span>
              </h2>
              <div className="space-y-8 pt-8">
                {[
                  { icon: <Leaf className="text-green-500" />, title: "100% Natural Ingredients", desc: "No artificial colors, flavors, or preservatives. Just pure fruit pulps and premium nuts." },
                  { icon: <Snowflake className="text-blue-400" />, title: "Low Overrun", desc: "Less air means a denser, creamier texture and more intense flavor per spoonful." },
                  { icon: <Heart className="text-red-primary" />, title: "Fresh Daily", desc: "Small batches churned every morning in our Nagpur studio to ensure peak freshness." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-dark mb-2">{item.title}</h4>
                      <p className="text-dark-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flavor Grid */}
      <section className="py-32 bg-[#fffcf9]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-heading font-bold text-dark mb-6">Our Signature Flavors</h2>
            <p className="text-dark-muted text-lg">From timeless classics to seasonal inspirations, explore our curated selection of artisanal scoops.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GELATO_FLAVORS.map((flavor, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-soft border border-dark/5 flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={flavor.image}
                    alt={flavor.name}
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-dark shadow-sm">
                      {flavor.tag}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-heading font-bold text-dark mb-3 group-hover:text-red-primary transition-colors">
                    {flavor.name}
                  </h3>
                  <p className="text-dark-muted text-sm leading-relaxed mb-6">
                    {flavor.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-dark/5 flex justify-between items-center">
                    <span className="text-red-primary font-bold text-sm tracking-widest uppercase">Artisan Scoop</span>
                    <button className="text-dark/40 hover:text-red-primary transition-colors">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us CTA */}
      <section className="py-32 bg-red-deep text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">Ready for a scoop of happiness?</h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg mb-12">
            Visit our dessert studio to try our seasonal flavors and experience the magic of fresh Tauby&apos;s gelato.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-red-primary text-white px-12 py-4 rounded-full font-bold hover:bg-white hover:text-red-primary transition-all shadow-xl">
              Find a Store
            </button>
            <button className="bg-white/10 border border-white/20 text-white px-12 py-4 rounded-full font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <MapPin size={18} /> Our Locations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
