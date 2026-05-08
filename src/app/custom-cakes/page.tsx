"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CustomCakeForm from "@/components/custom/CustomCakeForm";
import { Sparkles, Camera, PenTool, ClipboardCheck, Heart } from "lucide-react";

const HOW_IT_WORKS = [
  {
    icon: <PenTool className="text-red-primary" size={24} />,
    title: "Share Your Vision",
    description: "Describe the theme, colors, and essence of your celebration."
  },
  {
    icon: <Camera className="text-gold" size={24} />,
    title: "Upload Inspiration",
    description: "Share reference images or mood boards that inspire your dream cake."
  },
  {
    icon: <ClipboardCheck className="text-red-primary" size={24} />,
    title: "Personalized Quote",
    description: "Receive a handcrafted quotation tailored to your unique requirements."
  }
];

export default function CustomCakesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#fdfaf8]" />;
  }

  return (
    <div className="min-h-screen bg-[#fdfaf8]">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/regular-cakes-grid.png"
          alt="Luxury Cake"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/20 to-transparent" />
        
        {/* Floating Gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse delay-1000" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[10px] uppercase tracking-widest font-bold mb-8 animate-fade-in">
            <Sparkles size={14} className="text-gold" /> Bespoke Cake Studio
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-bold text-white mb-8 leading-tight animate-slide-up">
            Design Your <br/>
            <span className="text-gold">Dream Cake</span>
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-12 animate-fade-in delay-500">
            Every celebration deserves a masterpiece crafted exactly the way you imagine it. Let&apos;s create something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="bg-red-primary text-white px-12 py-5 rounded-full font-bold hover:bg-red-deep transition-all shadow-2xl hover:scale-105 active:scale-95">
              Start Customizing
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-full font-bold hover:bg-white/20 transition-all">
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-heading font-bold text-dark mb-6">The Journey to Perfection</h2>
            <p className="text-dark-muted text-lg">A simple, elegant three-step process to bring your vision to life.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="group relative p-10 bg-white rounded-[3rem] shadow-soft border border-dark/5 hover:shadow-premium transition-all hover:-translate-y-2">
                <div className="w-14 h-14 bg-cream rounded-2xl flex items-center justify-center mb-8 group-hover:bg-red-primary group-hover:text-white transition-all duration-500">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-dark mb-4">{step.title}</h3>
                <p className="text-dark-muted leading-relaxed">{step.description}</p>
                <span className="absolute top-10 right-10 text-5xl font-heading font-bold text-dark/5">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-32 bg-gradient-to-b from-white to-[#fdfaf8] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-primary/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-5xl font-heading font-bold text-dark mb-6">Bespoke Inquiry</h2>
            <p className="text-dark-muted text-lg">Tell us about your celebration, and our artisans will guide you through the creative process.</p>
          </div>
          <CustomCakeForm />
        </div>
      </section>

      {/* Social Proof & Gallery */}
      <section className="py-32 bg-dark text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-gold text-sm font-bold uppercase tracking-widest mb-4">
                <Camera size={18} /> @TaubysNagpur
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Celebrations Crafted <br/>With Pure <span className="text-gold">Passion</span>
              </h2>
            </div>
            <button className="px-8 py-4 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all">
              Follow Our Journey
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "/regular-cakes-grid.png",
              "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=800&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop"
            ].map((img, i) => (
              <div key={i} className="aspect-square relative rounded-3xl overflow-hidden group">
                <Image
                  src={img}
                  alt={`Cake ${i}`}
                  fill
                  className="object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="text-white fill-white" size={32} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 pt-20 border-t border-white/10 text-center">
            <p className="text-gold font-heading text-3xl italic mb-8">&ldquo;Tauby&apos;s made our wedding day unforgettable. The cake wasn&apos;t just a dessert; it was the center of our celebration.&rdquo;</p>
            <p className="text-sm uppercase tracking-widest font-bold opacity-60">— Priya & Rahul, Nagpur</p>
          </div>
        </div>
      </section>
    </div>
  );
}
