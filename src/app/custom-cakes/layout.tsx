import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Your Dream Cake | Tauby's Boutique",
  description: "Experience the ultimate in cake personalization. From wedding masterpieces to bespoke celebration cakes, design your dream cake with Tauby's.",
};

export default function CustomCakesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
