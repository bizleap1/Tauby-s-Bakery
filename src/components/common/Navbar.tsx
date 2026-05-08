"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Search, Menu, X, ChevronDown, MapPin, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/store/useCart";
import CartDrawer from "../cart/CartDrawer";
import { SUB_CATEGORIES } from "@/constants";

interface NavItem {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
}

const NAV_LINKS: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Our Products",
    href: "/menu?main=our-products",
    dropdown: SUB_CATEGORIES["Our Products"].map((cat) => ({
      name: cat,
      href: `/menu?category=${encodeURIComponent(cat.toLowerCase())}`,
    })),
  },
  {
    name: "Custom Cakes",
    href: "/custom-cakes",
  },
  { name: "Gelato", href: "/gelato" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "About", href: "/about" },
];

function DropdownMenu({ items }: { items: { name: string; href: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden z-50"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-5 py-2.5 text-sm text-dark hover:bg-red-primary hover:text-white transition-colors font-medium"
        >
          {item.name}
        </Link>
      ))}
    </motion.div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const getItemCount = useCart((state) => state.getItemCount);
  const cartCount = mounted ? getItemCount() : 0;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        {/* ── Top Info Bar ── */}
        <div className="bg-red-deep text-white text-xs hidden md:block">
          <div className="container mx-auto px-6 flex items-center justify-between py-2">
            <div className="flex items-center gap-6 text-white/80">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-gold shrink-0" />
                Behind Poonam Plaza, Palm Road, Civil Lines, Nagpur 440001
              </span>
              <span className="flex items-center gap-1.5">
                <Phone size={12} className="text-gold shrink-0" />
                7420026601 / 7420026602
              </span>
            </div>
            <Link
              href="/menu?category=customised+cakes"
              className="flex items-center gap-1 text-gold font-semibold hover:text-white transition-colors"
            >
              ✦ Personalised Cakes
            </Link>
          </div>
        </div>

        {/* ── Main Navbar ── */}
        <header
          className={cn(
            "bg-white transition-all duration-300",
            isScrolled ? "shadow-md border-b border-gray-100 py-2" : "border-b border-gray-100 py-0"
          )}
          ref={navRef}
        >
          <div className="container mx-auto px-6 flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/logo.png"
                alt="Tauby's Bakery"
                width={140}
                height={64}
                className="object-contain h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-5 text-sm font-semibold transition-colors whitespace-nowrap",
                      pathname === link.href || pathname.startsWith(link.href.split("?")[0] + "?")
                        ? "text-red-primary border-b-2 border-red-primary"
                        : "text-dark hover:text-red-primary"
                    )}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown
                        size={14}
                        className={cn(
                          "transition-transform duration-200",
                          openDropdown === link.name ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </Link>

                  {link.dropdown && (
                    <AnimatePresence>
                      {openDropdown === link.name && (
                        <DropdownMenu items={link.dropdown} />
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="text-dark hover:text-red-primary transition-colors hidden md:block" aria-label="Search">
                <Search size={20} />
              </button>
              <Link href="/login" className="text-dark hover:text-red-primary transition-colors" aria-label="Account">
                <User size={20} />
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-dark hover:text-red-primary transition-colors"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link href="/menu" className="hidden md:inline-flex btn-primary !py-2 !px-5 !text-sm whitespace-nowrap">
                Order Now
              </Link>

              {/* Mobile toggle */}
              <button
                className="lg:hidden text-dark p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
              >
                {/* Mobile top info */}
                <div className="bg-red-deep text-white/80 text-xs px-6 py-3 flex flex-col gap-1">
                  <span className="flex items-center gap-1.5"><MapPin size={11} className="text-gold" /> Civil Lines · 7420026601</span>
                </div>

                <nav className="flex flex-col px-6 py-4">
                  {NAV_LINKS.map((link) => (
                    <div key={link.href}>
                      <div className="flex items-center justify-between">
                        <Link
                          href={link.href}
                          onClick={() => { if (!link.dropdown) setIsMobileMenuOpen(false); }}
                          className={cn(
                            "flex-1 py-3 text-sm font-semibold border-b border-gray-50",
                            pathname === link.href ? "text-red-primary" : "text-dark"
                          )}
                        >
                          {link.name}
                        </Link>
                        {link.dropdown && (
                          <button
                            onClick={() => setMobileOpenDropdown(mobileOpenDropdown === link.name ? null : link.name)}
                            className="p-2 text-dark"
                          >
                            <ChevronDown
                              size={16}
                              className={cn("transition-transform", mobileOpenDropdown === link.name ? "rotate-180" : "")}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {link.dropdown && mobileOpenDropdown === link.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden bg-gray-50 rounded-lg mb-2"
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-5 py-2.5 text-sm text-dark/70 hover:text-red-primary border-b border-white last:border-0"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  <Link
                    href="/menu"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="btn-primary w-full text-center mt-4"
                  >
                    Order Now
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
