import Image from "next/image";
import Hero from "@/components/common/Hero";
import CategoryGrid from "@/components/product/CategoryGrid";
import Bestsellers from "@/components/product/Bestsellers";
import { Star, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CategoryGrid />
      <Bestsellers />
      
      {/* Why Choose Us Section */}
      <section className="py-24 bg-white border-t border-chocolate/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-pastel/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-deep">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-chocolate">Premium Quality</h3>
              <p className="text-chocolate-light">We use only the finest ingredients, from Belgian chocolate to fresh organic berries, ensuring every bite is perfection.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-pastel/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-deep">
                <Truck size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-chocolate">Safe Delivery</h3>
              <p className="text-chocolate-light">Our specialized delivery fleet ensures your delicate cakes arrive in pristine condition, exactly when you need them.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-pink-pastel/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-pink-deep">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-heading font-bold text-chocolate">Hygienic Process</h3>
              <p className="text-chocolate-light">We maintain the highest standards of hygiene in our state-of-the-art kitchen, following all safety protocols.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials (Simple for now) */}
      <section className="py-24 bg-chocolate text-cream">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-12">What Our Customers <span className="text-pink-pastel">Say</span></h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-2xl italic font-heading leading-relaxed mb-8">
              &quot;The Belgian Chocolate Truffle cake was absolute heaven! It made our anniversary so special. The delivery was right on time and the cake was beautifully packed.&quot;
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-12 h-12 rounded-full bg-pink-pastel/20 overflow-hidden">
                <Image src="https://i.pravatar.cc/150?u=priya" alt="Priya Sharma" fill className="object-cover" />
              </div>
              <div className="text-left">
                <span className="block font-bold">Priya Sharma</span>
                <span className="text-sm text-cream/60 text-pink-pastel">Loyal Customer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-pink-pastel">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-chocolate mb-2">Planning a special event?</h2>
            <p className="text-chocolate-light">Our cake consultants are here to help you design the perfect centerpiece.</p>
          </div>
          <button className="btn-primary whitespace-nowrap">
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  );
}
