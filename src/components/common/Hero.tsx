"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    title: "Tea Time Cakes",
    subtitle: "Afternoon Perfection",
    description: "Light, airy, and perfectly balanced. Our tea time cakes are the ideal companion for your evening brew.",
    image: "/tea-time-cakes-hero.png",
    link: "/menu?category=tea%20time%20cakes",
    accent: "bg-gold"
  },
  {
    id: 2,
    title: "Artisan Gelato",
    subtitle: "Chilled Delights",
    description: "Experience the creamy, authentic taste of Italy with our handcrafted gelato made from fresh local ingredients.",
    image: "/artisan-gelato-hero.png",
    link: "/menu?category=gelato",
    accent: "bg-red-primary"
  },
  {
    id: 3,
    title: "Black Forest",
    subtitle: "The Timeless Classic",
    description: "Layers of moist chocolate sponge, fresh whipped cream, and tart cherries. A celebration in every bite.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=2000",
    link: "/menu?category=regular%20cakes",
    accent: "bg-red-deep"
  },
  {
    id: 4,
    title: "Red Velvet",
    subtitle: "Velvety Elegance",
    description: "Strikingly beautiful and incredibly delicious. Our red velvet cakes are as smooth as they are stunning.",
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=2000&auto=format&fit=crop",
    link: "/menu?category=regular%20cakes",
    accent: "bg-red-primary"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden bg-cream">
      <AnimatePresence initial={false} custom={direction}>
        {!mounted ? (
          <div className="absolute inset-0 w-full h-full">
            {/* Initial SSR Background */}
            <div className="absolute inset-0 z-0">
              <Image
                src={SLIDES[0].image}
                alt={SLIDES[0].title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent lg:from-dark/70 lg:via-dark/20" />
            </div>

            {/* Initial SSR Content */}
            <div className="container mx-auto px-6 h-full flex items-center relative z-10">
              <div className="max-w-2xl text-white">
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-6 ${SLIDES[0].accent}`}>
                  {SLIDES[0].subtitle}
                </span>
                <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 drop-shadow-lg">
                  {SLIDES[0].title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-10 max-w-lg leading-relaxed drop-shadow-md">
                  {SLIDES[0].description}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={SLIDES[currentSlide].image}
                alt={SLIDES[currentSlide].title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent lg:from-dark/70 lg:via-dark/20" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 h-full flex items-center relative z-10">
              <div className="max-w-2xl text-white">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-6 ${SLIDES[currentSlide].accent}`}
                >
                  {SLIDES[currentSlide].subtitle}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl md:text-8xl font-heading font-bold mb-6 drop-shadow-lg"
                >
                  {SLIDES[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-white/90 mb-10 max-w-lg leading-relaxed drop-shadow-md"
                >
                  {SLIDES[currentSlide].description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link href={SLIDES[currentSlide].link} className="btn-primary flex items-center gap-2">
                    Order Now 🍰
                  </Link>
                  <Link href="/menu" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-3 rounded-full font-bold transition-all border border-white/30">
                    View Full Menu
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Controls - Hidden during hydration to avoid mismatch if SLIDES length were dynamic (though it isn't here) */}
      {mounted && (
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center gap-8">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Indicators */}
          <div className="flex gap-3">
            {SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-8 bg-gold" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Trust Badges Floating (Mobile Hidden) */}
      {mounted && (
        <div className="absolute top-1/2 right-10 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white text-center w-32">
            <span className="block text-2xl font-bold font-heading">50k+</span>
            <span className="text-[10px] uppercase tracking-widest opacity-80">Fans</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white text-center w-32">
            <span className="block text-2xl font-bold font-heading">100%</span>
            <span className="text-[10px] uppercase tracking-widest opacity-80">Fresh</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white text-center w-32">
            <span className="block text-2xl font-bold font-heading">4.9/5</span>
            <span className="text-[10px] uppercase tracking-widest opacity-80">Rated</span>
          </div>
        </div>
      )}
    </section>
  );
}
