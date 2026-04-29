"use client";

import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BESTSELLERS = [
  {
    id: "1",
    name: "Belgian Chocolate Truffle",
    price: 1200,
    category: "Cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop",
    isEggless: true,
  },
  {
    id: "2",
    name: "Classic New York Cheesecake",
    price: 1500,
    category: "Cheesecakes",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop",
    isEggless: false,
  },
  {
    id: "3",
    name: "Red Velvet Bliss",
    price: 950,
    category: "Cakes",
    image: "https://images.unsplash.com/photo-1586788680434-30d324671ff6?q=80&w=600&auto=format&fit=crop",
    isEggless: true,
  },
  {
    id: "4",
    name: "Assorted French Macarons",
    price: 600,
    category: "Pastries",
    image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=600&auto=format&fit=crop",
    isEggless: true,
  },
];

export default function Bestsellers() {
  return (
    <section className="py-24 bg-cream/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-chocolate mb-4">
              Our <span className="text-pink-deep">Bestsellers</span>
            </h2>
            <p className="text-chocolate-light max-w-xl">
              The cakes and treats that our customers love the most. Handcrafted fresh every single day.
            </p>
          </div>
          <Link href="/menu" className="group flex items-center gap-2 text-chocolate font-bold border-b-2 border-pink-pastel pb-1 hover:border-pink-deep transition-all">
            View All Products
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BESTSELLERS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
