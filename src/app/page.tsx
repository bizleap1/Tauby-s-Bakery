import Hero from "@/components/common/Hero";
import CategoryGrid from "@/components/product/CategoryGrid";
import Bestsellers from "@/components/product/Bestsellers";
import Testimonials from "@/components/common/Testimonials";
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

      <Testimonials />

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
