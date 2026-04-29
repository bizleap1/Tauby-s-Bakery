"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/constants";
import ProductCard from "@/components/product/ProductCard";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_PRODUCTS = [
  { id: "1", name: "Belgian Chocolate Truffle", price: 1200, category: "Cakes", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600", isEggless: true },
  { id: "2", name: "Classic New York Cheesecake", price: 1500, category: "Cheesecakes", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600", isEggless: false },
  { id: "3", name: "Red Velvet Bliss", price: 950, category: "Cakes", image: "https://images.unsplash.com/photo-1586788680434-30d324671ff6?q=80&w=600", isEggless: true },
  { id: "4", name: "Assorted French Macarons", price: 600, category: "Pastries", image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?q=80&w=600", isEggless: true },
  { id: "5", name: "Double Chocolate Cupcake", price: 150, category: "Cupcakes", image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=600", isEggless: false },
  { id: "6", name: "Dark Chocolate Bark", price: 450, category: "Chocolates", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=600", isEggless: true },
  { id: "7", name: "Veggie Pizza Slice", price: 120, category: "Snacks", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600", isEggless: true },
  { id: "8", name: "Blueberry Cheesecake", price: 1600, category: "Cheesecakes", image: "https://images.unsplash.com/photo-1524351199679-46cddfddb234?q=80&w=600", isEggless: false },
];

export default function MenuPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ? initialCategory.charAt(0).toUpperCase() + initialCategory.slice(1) : "All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEgglessOnly, setIsEgglessOnly] = useState(false);

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEggless = !isEgglessOnly || product.isEggless;
    return matchesCategory && matchesSearch && matchesEggless;
  });

  return (
    <div className="pt-32 pb-24 bg-cream/30 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-chocolate mb-4">
            Our <span className="text-pink-deep">Menu</span>
          </h1>
          <p className="text-chocolate-light">Browse our collection of handcrafted sweet treats and savory snacks.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Categories */}
          <div className="flex-1">
            <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory("All")}
                className={cn(
                  "px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all",
                  selectedCategory === "All" ? "bg-chocolate text-cream" : "bg-white text-chocolate hover:bg-pink-pastel/30"
                )}
              >
                All
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all",
                    selectedCategory === category ? "bg-chocolate text-cream" : "bg-white text-chocolate hover:bg-pink-pastel/30"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Toggle */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/40" size={18} />
              <input
                type="text"
                placeholder="Search treats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-2 rounded-full bg-white border border-chocolate/5 focus:outline-none focus:border-pink-deep w-full sm:w-64"
              />
            </div>
            
            <button
              onClick={() => setIsEgglessOnly(!isEgglessOnly)}
              className={cn(
                "flex items-center justify-center gap-2 px-6 py-2 rounded-full font-medium border transition-all",
                isEgglessOnly ? "bg-green-500 text-white border-green-600" : "bg-white text-chocolate border-chocolate/5 hover:bg-pink-pastel/30"
              )}
            >
              <span className={cn("w-2 h-2 rounded-full", isEgglessOnly ? "bg-white" : "bg-green-500")} />
              Eggless Only
            </button>
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-chocolate/20">
            <h3 className="text-2xl font-heading text-chocolate/40 font-bold mb-2">No treats found</h3>
            <p className="text-chocolate-light">Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); setIsEgglessOnly(false); }}
              className="mt-6 text-pink-deep font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
