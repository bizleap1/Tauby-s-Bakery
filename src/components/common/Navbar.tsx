"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/useCart";
import CartDrawer from "../cart/CartDrawer";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const getItemCount = useCart((state) => state.getItemCount);
  const cartCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft py-2 border-b border-red-primary/10"
            : "bg-white/90 backdrop-blur-sm py-3"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Tauby's Bakery — Sinful Delights"
              width={160}
              height={72}
              className="object-contain h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-bold tracking-wide transition-all text-sm uppercase",
                  pathname === link.href
                    ? "text-red-primary border-b-2 border-red-primary pb-0.5"
                    : "text-dark hover:text-red-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <button className="text-dark hover:text-red-primary transition-colors" aria-label="Search">
              <Search size={22} />
            </button>
            <Link href="/login" className="text-dark hover:text-red-primary transition-colors" aria-label="Account">
              <User size={22} />
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-dark hover:text-red-primary transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Order Now CTA - Desktop */}
            <Link
              href="/menu"
              className="hidden md:block btn-primary !py-2 !px-5 !text-sm"
            >
              Order Now
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-dark"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-premium md:hidden border-t-4 border-red-primary"
            >
              <nav className="flex flex-col p-6 gap-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-bold uppercase tracking-wide py-2 border-b border-red-primary/10",
                      pathname === link.href ? "text-red-primary" : "text-dark"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link
                    href="/menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full text-center block"
                  >
                    Order Now 🎂
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
