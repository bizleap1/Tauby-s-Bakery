"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-red-deep text-white pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <Image
            src="/logo.png"
            alt="Tauby's Bakery"
            width={160}
            height={72}
            className="object-contain h-16 w-auto brightness-0 invert"
          />
          <p className="text-white/70 leading-relaxed text-sm">
            Crafting sinful delights since 1995. We take pride in using the finest ingredients to create cakes that look as good as they taste.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-dark hover:border-gold transition-all font-bold text-sm text-gold">
              IG
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-dark hover:border-gold transition-all font-bold text-sm text-gold">
              FB
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-dark hover:border-gold transition-all font-bold text-sm text-gold">
              YT
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-gold">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/menu" className="text-white/70 hover:text-gold transition-colors text-sm">Our Menu</Link></li>
            <li><Link href="/about" className="text-white/70 hover:text-gold transition-colors text-sm">Our Story</Link></li>
            <li><Link href="/custom-cakes" className="text-white/70 hover:text-gold transition-colors text-sm">Custom Cakes</Link></li>
            <li><Link href="/corporate" className="text-white/70 hover:text-gold transition-colors text-sm">Corporate Orders</Link></li>
            <li><Link href="/faq" className="text-white/70 hover:text-gold transition-colors text-sm">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-gold">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
              <span className="text-white/70 text-sm">123 Bakery Lane, Sweet District, Nagpur, Maharashtra 440001</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-gold shrink-0" />
              <span className="text-white/70 text-sm">+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-gold shrink-0" />
              <span className="text-white/70 text-sm">orders@taubys.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-gold">Newsletter</h4>
          <p className="text-white/70 mb-4 text-sm">Subscribe to get special offers and cake inspiration.</p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-gold/30 text-white placeholder-white/40 focus:outline-none focus:border-gold text-sm"
            />
            <button type="button" className="btn-secondary w-full text-center justify-center">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gold/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} Tauby&apos;s Bakery — Sinful Delights. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
