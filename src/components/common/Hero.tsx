"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop"
          alt="Premium Chocolate Cake"
          fill
          priority
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60" />
      </div>

      {/* Gold diagonal accent */}
      <div className="absolute right-0 top-0 w-1/2 h-full z-0 overflow-hidden hidden lg:block">
        <div
          className="absolute right-[-10%] top-[-10%] w-[80%] h-[130%] opacity-20"
          style={{ background: "linear-gradient(135deg, #F5C518 0%, #E0A800 100%)", transform: "skewX(-10deg)" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 bg-gold/15 text-red-deep font-bold tracking-widest uppercase text-xs px-4 py-2 rounded-full mb-6 border border-gold/40">
              🎂 ESTD. 1995 — Sinful Delights
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-dark leading-tight mb-6">
              Sweetening Your{" "}
              <span className="text-red-primary">Celebrations</span>{" "}
              <span className="text-gold">Every Day</span>
            </h1>
            <p className="text-lg text-dark-muted leading-relaxed mb-10 max-w-lg">
              From artisanal cakes to delicate pastries, experience the magic of premium baking delivered right to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/menu" className="btn-primary flex items-center justify-center gap-2">
                Order Online 🎂
              </Link>
              <Link href="/custom-cakes" className="btn-secondary flex items-center justify-center">
                Custom Cake Request
              </Link>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="mt-14 flex items-center gap-10 pt-8 border-t border-red-primary/10"
            >
              <div className="text-center">
                <span className="block text-3xl font-heading font-bold text-red-primary">50k+</span>
                <span className="text-xs text-dark-muted uppercase tracking-widest font-bold">Happy Customers</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-heading font-bold text-red-primary">100%</span>
                <span className="text-xs text-dark-muted uppercase tracking-widest font-bold">Freshly Baked</span>
              </div>
              <div className="text-center">
                <span className="block text-3xl font-heading font-bold text-gold">4.9/5</span>
                <span className="text-xs text-dark-muted uppercase tracking-widest font-bold">Top Rated</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Logo large on right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gold/20 blur-3xl scale-110" />
              <Image
                src="/logo.png"
                alt="Tauby's Bakery"
                width={480}
                height={480}
                className="object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
