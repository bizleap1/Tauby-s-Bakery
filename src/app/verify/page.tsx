"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }
    
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Verification code sent to your email!");
    }
    setIsLoading(false);
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !token) {
      toast.error("Please provide both email and verification code");
      return;
    }

    setIsLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Email verified successfully!");
      router.push("/");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-cream/30 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6"
      >
        <div className="premium-card p-8 bg-white shadow-premium">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-chocolate mb-2">Verify Email</h1>
            <p className="text-chocolate-light">Enter the 6-digit code sent to your mail</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/20" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-12 pr-6 py-3 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">Verification Code</label>
                <button 
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[10px] font-bold text-pink-deep hover:underline uppercase tracking-tighter"
                >
                  Send Code
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/20" size={18} />
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="6-digit code"
                  required
                  className="w-full pl-12 pr-6 py-3 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify & Sign In"}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-chocolate-light">
            Need an account?{" "}
            <Link href="/register" className="text-pink-deep font-bold hover:underline">Register</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-cream/30">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-deep"></div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  );
}
