"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Upload, Check, Info } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const STEPS = ["Event Details", "Design & Flavor", "Review Request"];

export default function CustomCakeForm() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: "",
    theme: "",
    flavor: "",
    size: "500gm",
    guests: "",
    colors: "",
    date: "",
    location: "",
    notes: "",
    references: [] as string[],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!mounted) return <div className="min-h-[400px] animate-pulse bg-white/10 rounded-[3rem]" />;

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-8 bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-premium"
      >
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
          <Check size={40} className="text-white" />
        </div>
        <h2 className="text-4xl font-heading font-bold text-dark mb-4">Request Received</h2>
        <p className="text-dark-muted max-w-md mx-auto leading-relaxed">
          Your dream cake request has been received. Our master bakers will review your vision and craft a personalized quotation for your special celebration.
        </p>
        <button
          onClick={() => window.location.href = "/"}
          className="mt-10 bg-red-primary text-white px-10 py-4 rounded-full font-bold hover:bg-red-deep transition-all"
        >
          Return Home
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      {/* Form Container */}
      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/20 shadow-premium">
        {/* Progress */}
        <div className="flex items-center gap-4 mb-12">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex flex-col gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                  step > i + 1 ? "bg-green-500 text-white" : step === i + 1 ? "bg-red-primary text-white" : "bg-white text-dark-muted border border-dark/10"
                )}>
                  {step > i + 1 ? <Check size={18} /> : i + 1}
                </div>
              </div>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-dark/10" />}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-dark/60 ml-2">Event Type</label>
                  <select
                    name="eventType"
                    required
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className="w-full bg-white/60 border border-white/40 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all"
                  >
                    <option value="">Select Event Type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Other">Other Celebration</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-dark/60 ml-2">Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-white/60 border border-white/40 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold text-dark/60 ml-2">Guest Count</label>
                    <input
                      type="number"
                      name="guests"
                      placeholder="e.g. 50"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full bg-white/60 border border-white/40 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-dark/60 ml-2">Delivery Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Nagpur Area (e.g. Civil Lines)"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full bg-white/60 border border-white/40 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all"
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-dark/60 ml-2">Flavor Profile</label>
                  <input
                    type="text"
                    name="flavor"
                    placeholder="e.g. Belgian Chocolate with Raspberry"
                    value={formData.flavor}
                    onChange={handleInputChange}
                    className="w-full bg-white/60 border border-white/40 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-dark/60 ml-2">Design Theme & Colors</label>
                  <textarea
                    name="theme"
                    placeholder="Describe your vision, colors, and specific elements..."
                    rows={4}
                    value={formData.theme}
                    onChange={handleInputChange}
                    className="w-full bg-white/60 border border-white/40 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-dark/60 ml-2">Inspiration Upload</label>
                  <div className="border-2 border-dashed border-dark/10 rounded-2xl p-8 text-center bg-white/20 hover:bg-white/40 transition-all cursor-pointer group">
                    <Upload size={32} className="text-dark/20 mx-auto mb-4 group-hover:text-red-primary transition-colors" />
                    <p className="text-sm font-medium text-dark/60">Drag and drop or <span className="text-red-primary">browse files</span></p>
                    <p className="text-[10px] text-dark/30 mt-2">PDF, PNG, JPG (Max 5MB)</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/60 rounded-2xl p-6 border border-white/40">
                  <h4 className="text-sm font-bold text-dark uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Info size={16} /> Summary
                  </h4>
                  <div className="space-y-3 text-sm">
                    <p><span className="text-dark/40">Event:</span> {formData.eventType || "Not specified"}</p>
                    <p><span className="text-dark/40">Date:</span> {formData.date || "Not specified"}</p>
                    <p><span className="text-dark/40">Flavor:</span> {formData.flavor || "Standard"}</p>
                    <p><span className="text-dark/40">Guests:</span> {formData.guests || "Not specified"}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold text-dark/60 ml-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    placeholder="Anything else we should know?"
                    rows={3}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full bg-white/60 border border-white/40 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-primary/20 transition-all resize-none"
                  />
                </div>

                <div className="flex items-start gap-3 p-4 bg-gold/10 rounded-2xl border border-gold/20">
                  <Info className="text-gold mt-0.5 shrink-0" size={18} />
                  <p className="text-[11px] text-dark/70 leading-relaxed italic">
                    By submitting this request, you understand that this is for a personalized quotation. Pricing is determined manually based on design complexity and size.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-12">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 text-dark/60 font-bold hover:text-dark transition-colors"
              >
                <ChevronLeft size={20} /> Back
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="bg-red-primary text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-red-deep transition-all shadow-lg shadow-red-primary/20"
              >
                Next Step <ChevronRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-primary text-white px-12 py-4 rounded-full font-bold hover:bg-red-deep transition-all shadow-lg shadow-red-primary/20 disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? "Processing..." : "Request Personalized Quote"}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Preview Card */}
      <div className="sticky top-32">
        <div className="bg-red-deep rounded-[3rem] overflow-hidden shadow-2xl relative">
          {/* Animated Background Gradients */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative p-10 text-white">
            <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 border border-white/10">
              Live Preview
            </span>
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden mb-8 border border-white/10 group">
              <Image
                src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=800&q=80"
                alt="Cake Preview"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-xs uppercase tracking-widest font-bold opacity-60">Design Style</p>
                <p className="text-lg font-heading font-bold">{formData.eventType || "Boutique Creation"}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-heading font-bold mb-2">
                  {formData.flavor || "Your Custom Flavor"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/10">
                    {formData.guests ? `${formData.guests} Guests` : "Bespoke Size"}
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/10">
                    Handcrafted
                  </span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-white/60 leading-relaxed italic">
                  &ldquo;{formData.theme || "Every detail of your cake will be designed to match your celebration's unique story and aesthetic."}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
