"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<"password" | "otp">("password");
  const [otpSent, setOtpSent] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (authMode === "password") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Welcome back!");
        router.push("/");
      }
    } else {
      // OTP Verification
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully!");
        router.push("/");
      }
    }
    setIsLoading(false);
  };

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
      setOtpSent(true);
      toast.success("OTP sent to your email!");
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) toast.error(error.message);
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
            <h1 className="text-3xl font-heading font-bold text-chocolate mb-2">Welcome Back</h1>
            <p className="text-chocolate-light">
              {authMode === "password" ? "Sign in with your password" : "Sign in with email OTP"}
            </p>
          </div>

          <div className="flex bg-cream/30 p-1 rounded-xl mb-8">
            <button 
              onClick={() => { setAuthMode("password"); setOtpSent(false); }}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${authMode === "password" ? "bg-white text-chocolate shadow-sm" : "text-chocolate/40"}`}
            >
              Password
            </button>
            <button 
              onClick={() => setAuthMode("otp")}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${authMode === "otp" ? "bg-white text-chocolate shadow-sm" : "text-chocolate/40"}`}
            >
              Email OTP
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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

            <AnimatePresence mode="wait">
              {authMode === "password" ? (
                <motion.div 
                  key="password"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between">
                    <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">Password</label>
                    <Link href="/forgot-password" className="text-xs text-pink-deep hover:underline">Forgot?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/20" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required={authMode === "password"}
                      className="w-full pl-12 pr-6 py-3 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="otp"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-6"
                >
                  {otpSent ? (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-chocolate/40">Verification Code</label>
                      <div className="relative">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/20" size={18} />
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="6-digit code"
                          required={authMode === "otp"}
                          className="w-full pl-12 pr-6 py-3 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none"
                        />
                      </div>
                      <p className="text-[10px] text-chocolate/60 text-center">Enter the code sent to your email.</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl border-2 border-chocolate/5 hover:border-pink-deep text-chocolate font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isLoading ? "Sending..." : "Send Verification Code"}
                      <ArrowRight size={18} />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {(authMode === "password" || (authMode === "otp" && otpSent)) && (
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign In"}
                {!isLoading && <ArrowRight size={20} />}
              </button>
            )}
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-chocolate/10"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-chocolate/40 font-bold">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-chocolate/10 hover:bg-chocolate/5 transition-all font-medium text-chocolate"
          >
            <span className="font-bold text-pink-deep text-lg">G</span>
            Google Account
          </button>

          <p className="mt-8 text-center text-sm text-chocolate-light">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-pink-deep font-bold hover:underline">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
