"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SUB_CATEGORIES } from "@/constants";

const CATEGORY_IMAGES: Record<string, string> = {
  "Regular Cakes":  "/regular-cakes-grid.png",
  "Tea Time Cakes": "/tea-time-cakes-hero.png",
  "Desserts":       "/desserts-grid.png",
  "Gelato":         "/artisan-gelato-hero.png",
  "Gift Hampers":   "/gift-hampers-grid.png",
  "Cookies":        "/cookies-grid.png",
};

const OUR_PRODUCTS = SUB_CATEGORIES["Our Products"];

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-chocolate mb-4">
            Explore Our <span className="text-pink-deep">Collections</span>
          </h2>
          <p className="text-chocolate-light max-w-2xl mx-auto">
            From signature celebration cakes to artisan gelato and gourmet cookies, find the perfect treat for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {OUR_PRODUCTS.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/menu?category=${encodeURIComponent(category.toLowerCase())}`}
                className="group block text-center"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-soft group-hover:shadow-premium transition-all duration-500">
                  <Image
                    src={CATEGORY_IMAGES[category]}
                    alt={category}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/20 transition-colors duration-500" />
                </div>
                <h3 className="font-heading text-lg font-bold text-chocolate group-hover:text-pink-deep transition-colors">
                  {category}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Occasional Cakes CTA */}
        <div className="mt-12 text-center">
          <p className="text-chocolate-light mb-4">Planning something special?</p>
          <Link
            href="/menu?main=occasional-cakes"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-chocolate text-chocolate font-bold hover:bg-chocolate hover:text-cream transition-all duration-300"
          >
            Explore Occasional Cakes
          </Link>
        </div>
      </div>
    </section>
  );
}
