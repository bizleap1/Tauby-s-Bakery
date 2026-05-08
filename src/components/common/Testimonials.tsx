"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Swarnim Shukla",
    review:
      "Thank you very much for the prompt delivery and delicious cake. We will definitely order from you again for our next party.",
    rating: 5,
    product: "Celebration Cake",
  },
  {
    id: 2,
    name: "Ankita Bhongade",
    review:
      "I wanted to thank all of you for the excellent Blueberry Chilled Cheese Cake. Absolutely divine — every bite was perfect!",
    rating: 5,
    product: "Blueberry Chilled Cheese Cake",
  },
  {
    id: 3,
    name: "Sumedh Burange",
    review:
      "Thank you very much for the wonderful cake. The quality was outstanding and the presentation was beautiful. Thanks again!",
    rating: 5,
    product: "Custom Cake",
  },
  {
    id: 4,
    name: "Maria",
    review:
      "The Blueberry Chilled Cheese Cake was absolutely excellent. Tauby's never disappoints — the best bakery in Nagpur!",
    rating: 5,
    product: "Blueberry Chilled Cheese Cake",
  },
  {
    id: 5,
    name: "Priya Sharma",
    review:
      "The Belgian Chocolate Truffle cake was absolute heaven! It made our anniversary so special. Delivery was right on time and beautifully packed.",
    rating: 5,
    product: "Belgian Chocolate Truffle",
  },
  {
    id: 6,
    name: "Rahul Deshmukh",
    review:
      "Ordered the Red Velvet for my daughter's birthday — she was thrilled! The cake was moist, rich, and tasted incredible. Will order again!",
    rating: 5,
    product: "Red Velvet Cake",
  },
];

interface TestimonialsProps {
  showAll?: boolean;
  limit?: number;
}

export default function Testimonials({ showAll = false, limit = 4 }: TestimonialsProps) {
  const [active, setActive] = useState(0);
  const displayed = showAll ? TESTIMONIALS : TESTIMONIALS.slice(0, limit);

  const prev = () => setActive((a) => (a - 1 + displayed.length) % displayed.length);
  const next = () => setActive((a) => (a + 1) % displayed.length);

  return (
    <section className="py-24 bg-red-deep text-white overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-gold text-xs font-bold uppercase tracking-widest mb-4 border border-gold/40 px-4 py-1.5 rounded-full">
            Customer Love
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            What Our Customers{" "}
            <span className="text-gold">Say</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Thousands of happy customers across Nagpur. Here&apos;s what they think about Tauby&apos;s.
          </p>
        </div>

        {/* Featured / Carousel (for homepage, show one at a time) */}
        {!showAll ? (
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center"
                >
                  <Quote size={48} className="text-gold/30 mx-auto mb-6" />
                  <p className="text-xl md:text-2xl italic font-heading leading-relaxed mb-10 text-white/90">
                    &ldquo;{displayed[active].review}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {[...Array(displayed[active].rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-bold text-white text-lg">{displayed[active].name}</p>
                  <p className="text-gold/70 text-sm mt-1">{displayed[active].product}</p>
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons */}
              <div className="flex items-center justify-center gap-6 mt-12">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-dark hover:border-gold transition-all text-gold"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex gap-2">
                  {displayed.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        i === active ? "bg-gold w-6" : "bg-white/30"
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center hover:bg-gold hover:text-dark hover:border-gold transition-all text-gold"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 border border-gold/40 text-gold px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gold hover:text-dark transition-all"
              >
                Read All Reviews
              </Link>
            </div>
          </div>
        ) : (
          /* Grid layout for /testimonials page */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayed.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors"
              >
                <Quote size={28} className="text-gold/40 mb-4" />
                <p className="text-white/80 leading-relaxed mb-6 italic">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-gold/60 text-xs mt-0.5">{t.product}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
