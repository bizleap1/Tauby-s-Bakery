"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { REGULAR_CAKES, MAIN_CATEGORIES, SUB_CATEGORIES } from "@/constants";
import ProductCard from "@/components/product/ProductCard";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_PRODUCTS = [
  ...REGULAR_CAKES.map((cake) => ({
    ...cake,
    mainCategory: "Our Products",
    isEggless: true,
  })),
  {
    id: "ds-1",
    name: "Blueberry Cheesecake",
    price: 1300,
    category: "Desserts",
    mainCategory: "Our Products",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600",
    isEggless: true,
  },
  {
    id: "gl-1",
    name: "Artisan Pistachio Gelato",
    price: 250,
    category: "Gelato",
    mainCategory: "Our Products",
    image: "/artisan-gelato-hero.png",
    isEggless: true,
  },
  {
    id: "oc-1",
    name: "Tiered Wedding Cake",
    price: 5000,
    category: "Wedding Cake",
    mainCategory: "Occasional Cakes",
    image: "https://images.unsplash.com/photo-1535254973040-607b474cb80d?q=80&w=600",
    isEggless: true,
  }
];

const ALL_SUB_CATEGORIES = [
  ...SUB_CATEGORIES["Our Products"],
  ...SUB_CATEGORIES["Occasional Cakes"],
];

function MenuContent() {
  const searchParams = useSearchParams();
  const rawCategory = searchParams.get("category");
  const rawMain = searchParams.get("main");
  const [mounted, setMounted] = useState(false);

  const deriveInitialMain = () => {
    if (rawMain === "our-products") return "Our Products";
    if (rawMain === "occasional-cakes") return "Occasional Cakes";
    return "All";
  };

  const [activeMain, setActiveMain] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEgglessOnly, setIsEgglessOnly] = useState(false);

  useEffect(() => {
    setMounted(true);
    setActiveMain(deriveInitialMain());
  }, [rawMain]);

  const visibleSubCategories =
    activeMain === "All"
      ? ALL_SUB_CATEGORIES
      : SUB_CATEGORIES[activeMain as keyof typeof SUB_CATEGORIES] ?? [];

  if (!mounted) {
    return (
      <div className="pt-32 pb-24 bg-cream/30 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="mb-12 animate-pulse">
            <div className="h-12 w-48 bg-chocolate/10 rounded mb-4" />
            <div className="h-4 w-64 bg-chocolate/10 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesMain = activeMain === "All" || product.mainCategory === activeMain;
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesEggless = !isEgglessOnly || product.isEggless;
    return matchesMain && matchesCategory && matchesSearch && matchesEggless;
  });

  const handleMainChange = (main: string) => {
    setActiveMain(main);
    setSelectedCategory("All");
  };

  return (
    <div className="pt-32 pb-24 bg-cream/30 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-chocolate mb-4">
            Our <span className="text-pink-deep">Menu</span>
          </h1>
          <p className="text-chocolate-light">Browse our collection of handcrafted sweet treats.</p>
        </div>

        {/* Main Category Tabs */}
        <div className="flex gap-3 mb-6">
          {["All", ...MAIN_CATEGORIES].map((main) => (
            <button
              key={main}
              onClick={() => handleMainChange(main)}
              className={cn(
                "px-6 py-2 rounded-full font-bold transition-all text-sm uppercase tracking-wide",
                activeMain === main
                  ? "bg-red-primary text-white shadow-lg"
                  : "bg-white text-chocolate border border-chocolate/10 hover:bg-pink-pastel/30"
              )}
            >
              {main}
            </button>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Search & Eggless Toggle */}
          <div className="flex flex-col sm:flex-row gap-4 ml-auto">
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
                isEgglessOnly
                  ? "bg-green-500 text-white border-green-600"
                  : "bg-white text-chocolate border-chocolate/5 hover:bg-pink-pastel/30"
              )}
            >
              <span className={cn("w-2 h-2 rounded-full", isEgglessOnly ? "bg-white" : "bg-green-500")} />
              Eggless Only
            </button>
          </div>
        </div>

        {/* Price note for Regular Cakes */}
        {(selectedCategory === "Regular Cakes" || selectedCategory === "All") && (
          <p className="text-xs text-chocolate/50 mb-6 italic">
            * Regular Cake prices are for 500gm (half kg). Delivery: ₹100 flat within 7 km of Nagpur.
          </p>
        )}

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
              onClick={() => {
                setActiveMain("All");
                setSelectedCategory("All");
                setSearchQuery("");
                setIsEgglessOnly(false);
              }}
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

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-chocolate/40">Loading menu...</div>
        </div>
      }
    >
      <MenuContent />
    </Suspense>
  );
}
