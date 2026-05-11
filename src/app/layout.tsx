import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Tauby's Bakery | Premium Custom Cakes & Desserts in Nagpur",
  description: "Experience the finest handcrafted cakes, artisanal pastries, and savory snacks in Nagpur. Order custom celebration cakes online with same-day delivery.",
  keywords: ["Bakery Nagpur", "Custom Cakes", "Eggless Cakes", "Birthday Cakes", "Pastries", "Taubys", "Cake Delivery"],
  authors: [{ name: "Tauby's Bakery" }],
  openGraph: {
    title: "Tauby's Bakery | Premium Custom Cakes",
    description: "Experience the finest handcrafted cakes and desserts in Nagpur.",
    url: "https://taubys.com",
    siteName: "Tauby's Bakery",
    images: [
      {
        url: "https://taubys.com/og-image.jpg", // Replace with actual OG image URL later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tauby's Bakery | Premium Custom Cakes",
    description: "Experience the finest handcrafted cakes and desserts in Nagpur.",
    images: ["https://taubys.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${playfair.variable} ${poppins.variable} font-body bg-cream text-dark min-h-full flex flex-col antialiased`}>
        <Toaster position="top-center" />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
