"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Award, Users, Clock, Sparkles, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const VALUES = [
  {
    icon: <Heart className="text-red-primary" size={32} />,
    title: "Handcrafted with Love",
    description: "Every creation is infused with passion and crafted with the same devotion we share with our own families."
  },
  {
    icon: <Award className="text-gold" size={32} />,
    title: "Uncompromising Quality",
    description: "We source only the world's finest ingredients, from Belgian chocolate to fresh local fruits, ensuring perfection."
  },
  {
    icon: <Users className="text-red-primary" size={32} />,
    title: "Nagpur's Legacy",
    description: "Born and raised in the heart of Nagpur, we are proud to be a cherished part of your family's celebrations."
  },
  {
    icon: <Clock className="text-gold" size={32} />,
    title: "Freshness Guaranteed",
    description: "Our artisanal studios churn out fresh batches every single day, maintaining the highest standards of taste."
  }
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-cream/20" />;

  return (
    <div className="min-h-screen bg-[#fdfaf8]">
      {/* Editorial Hero */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop"
          alt="Tauby's Artistry"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-dark/50 backdrop-blur-[1px]" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold mb-8"
          >
            <Sparkles size={14} className="text-gold" /> Crafting Memories
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight"
          >
            20+ Years of <br/>
            <span className="text-gold italic">Pure Excellence.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            From a humble home-grown dream to Nagpur&apos;s most iconic dessert destination, our journey is a story of passion, precision, and the pursuit of perfection.
          </motion.p>
        </div>
      </section>

      {/* The Founder's Vision */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-premium">
                <Image
                  src="https://images.unsplash.com/photo-1581339399838-2a120c18bba3?auto=format&fit=crop&w=800&q=80"
                  alt="Tauby"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-red-deep p-10 rounded-[2rem] shadow-2xl text-white hidden md:block">
                <p className="text-5xl font-heading font-bold text-gold mb-2">20+</p>
                <p className="text-xs uppercase tracking-widest font-bold opacity-60">Years of Legacy</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-dark leading-tight">
                Where Every Bite <br/>Tell a <span className="text-red-primary">Story.</span>
              </h2>
              <div className="space-y-6 text-dark-muted text-lg leading-relaxed">
                <p>
                  Tauby&apos;s began with a simple yet powerful vision: to redefine the artisanal baking experience in Nagpur. For more than two decades, we have remained true to our craft, hand-finishing every cake with the utmost attention to detail.
                </p>
                <p>
                  Our journey is deeply rooted in the community. We aren&apos;t just a bakery; we are a cherished part of your birthdays, weddings, and every small victory in between. We believe that a cake is more than just a dessert—it&apos;s the centerpiece of your most precious memories.
                </p>
                <p className="font-heading italic text-2xl text-dark">
                  &ldquo;Baking is an art that requires patience, heart, and the finest ingredients life has to offer.&rdquo;
                </p>
              </div>
              <div className="flex gap-12 pt-8">
                <div>
                  <p className="text-3xl font-heading font-bold text-red-primary">4</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-dark-muted">Locations</p>
                </div>
                <div>
                  <p className="text-3xl font-heading font-bold text-red-primary">50k+</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-dark-muted">Happy Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-heading font-bold text-red-primary">100%</p>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-dark-muted">Love</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-cream/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-heading font-bold text-dark mb-6 text-center">Our Core Values</h2>
            <p className="text-dark-muted text-center">What drives our passion for perfection every single day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] shadow-soft hover:shadow-premium transition-all text-center border border-dark/5"
              >
                <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center mx-auto mb-8">
                  {v.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">{v.title}</h3>
                <p className="text-dark-muted text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-dark rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-white flex flex-col md:flex-row items-center gap-16">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex-1 space-y-8 relative z-10">
              <h2 className="text-5xl font-heading font-bold leading-tight">
                Visit our <br/>
                <span className="text-gold">Boutique Studios</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                Experience the magic firsthand at any of our four signature locations across Nagpur. From artisanal breads to custom masterpieces, there&apos;s always something fresh waiting for you.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-red-primary text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-red-primary transition-all shadow-xl">
                  Get Directions
                </button>
                <button className="bg-white/10 border border-white/20 text-white px-10 py-4 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-2">
                  <MapPin size={18} /> Our Branches
                </button>
              </div>
            </div>

            <div className="flex-1 relative aspect-video w-full rounded-3xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1000&auto=format&fit=crop"
                alt="Store Interior"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-2">
                <Sparkles size={16} className="text-gold" />
                <span className="text-xs font-bold uppercase tracking-widest">Main Studio, Nagpur</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
