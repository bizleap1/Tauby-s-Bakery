"use client";

import React from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BESTSELLERS = [
  {
    id: "rc-6",
    name: "Black Forest",
    price: 575,
    category: "Regular Cakes",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80",
    isEggless: true,
  },
  {
    id: "rc-8",
    name: "Chocolate Truffle",
    price: 575,
    category: "Regular Cakes",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80",
    isEggless: true,
  },
  {
    id: "rc-14",
    name: "Red Velvet",
    price: 600,
    category: "Regular Cakes",
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=800&q=80",
    isEggless: true,
  },
  {
    id: "rc-16",
    name: "Alphonso Mango",
    price: 800,
    category: "Regular Cakes",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80",
    isEggless: true,
  },
];

export default function Bestsellers() {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <section className="py-24 bg-cream/50 min-h-[400px]">
      <div className="container mx-auto px-6" />
    </section>
  );

  return (
    <section className="py-24 bg-cream/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-chocolate mb-4">
              Our <span className="text-pink-deep">Bestsellers</span>
            </h2>
            <p className="text-chocolate-light max-w-xl">
              The cakes our customers love the most. Handcrafted fresh every single day.
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
