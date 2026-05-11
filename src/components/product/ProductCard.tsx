"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Star } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  isEggless?: boolean;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  category,
  rating = 4.5,
  isEggless = false,
}: ProductCardProps) {
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="premium-card group overflow-hidden bg-white">
      <Link href={`/product/${id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          {mounted ? (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority={id.startsWith('rc-')} // Priority for regular cakes
            />
          ) : (
            <div className="absolute inset-0 bg-dark/5 animate-pulse" />
          )}
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isEggless && (
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1 border border-green-200">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Eggless
              </span>
            )}
            <span className="bg-white/90 backdrop-blur-sm text-dark text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm border border-dark/5">
              {category}
            </span>
          </div>

          {/* Quick Action */}
          <div
            className="absolute bottom-4 right-4 bg-white text-dark w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-primary hover:text-white"
          >
            <Plus size={20} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-1 mb-2">
            <Star size={14} className="fill-gold text-gold" />
            <span className="text-xs font-semibold text-dark/60">{rating}</span>
          </div>
          <h3 className="font-heading text-lg font-bold text-dark mb-1 line-clamp-1 group-hover:text-red-primary transition-colors">
            {name}
          </h3>
          <p className="text-red-primary font-bold text-xl">
            ₹{formatPrice(price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
