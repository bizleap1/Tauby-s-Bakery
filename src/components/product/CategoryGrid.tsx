"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/constants";

const CATEGORY_IMAGES: Record<string, string> = {
  "Cakes": "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop",
  "Cheesecakes": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop",
  "Pastries": "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=600&auto=format&fit=crop",
  "Cupcakes": "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=600&auto=format&fit=crop",
  "Chocolates": "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=600&auto=format&fit=crop",
  "Snacks": "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",
};

export default function CategoryGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-chocolate mb-4">
            Explore Our <span className="text-pink-deep">Collections</span>
          </h2>
          <p className="text-chocolate-light max-w-2xl mx-auto">
            From our signature celebration cakes to gourmet snacks, find the perfect treat for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/menu?category=${category.toLowerCase()}`}
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
      </div>
    </section>
  );
}
