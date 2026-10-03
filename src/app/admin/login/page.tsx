"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import api from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data?.success && res.data.token) {
        localStorage.setItem("doorstep_admin_token", res.data.token);
        localStorage.setItem("doorstep_admin_user", JSON.stringify(res.data.user));
        router.push("/admin");
      } else {
        throw new Error(res.data?.message || "Invalid login response");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err.response?.data?.message ||
        err?.message ||
        "Login failed. Please verify your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1117] flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#2954F5]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#E51F25]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md mb-4 shadow-xl">
            <Image
              src="/logo/80X80 px-01.png"
              alt="Doorstep Limited"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Doorstep <span className="text-[#E51F25]">Admin Portal</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign in to manage CMS content, client inquiries &amp; brand assets
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#171923] border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          {error && (
            <div className="mb-5 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/30 border border-gray-700 text-white text-sm outline-none focus:border-[#2954F5] focus:ring-1 focus:ring-[#2954F5] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/30 border border-gray-700 text-white text-sm outline-none focus:border-[#2954F5] focus:ring-1 focus:ring-[#2954F5] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-[#2954F5] hover:bg-[#1E42D0] active:scale-[0.99] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-800 text-center">
            <span className="text-[11px] text-gray-500 flex items-center justify-center gap-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>JWT Encrypted &amp; Secured Session</span>
            </span>
          </div>
        </div>

        {/* Back to site */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Doorstep Limited Website
          </a>
        </div>
      </div>
    </div>
  );
}
