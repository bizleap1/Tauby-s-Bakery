"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-hot-toast";

const ADMIN_LINKS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, signOut } = useAuth();

  // Basic route protection
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to access the admin panel.");
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null; // Will redirect in useEffect

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-zinc-50 pt-28"> {/* pt-28 to clear the 2-bar Navbar */}
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-chocolate/5 flex flex-col h-[calc(100vh-112px)] sticky top-28">
        <div className="p-6">
          <h2 className="text-xl font-heading font-bold text-chocolate mb-1">Admin Panel</h2>
          <p className="text-xs text-chocolate/40 font-medium">Manage your bakery</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {ADMIN_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                  isActive
                    ? "bg-pink-deep text-white shadow-md shadow-pink-deep/20"
                    : "text-chocolate/60 hover:bg-cream/50 hover:text-chocolate"
                )}
              >
                <Icon size={20} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-chocolate/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-all font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
