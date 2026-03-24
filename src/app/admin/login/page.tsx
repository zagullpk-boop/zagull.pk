"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6f0] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block mb-4">
            <span className="text-4xl font-serif tracking-tight text-[#2d1b10] underline decoration-[#c9956c]/30 underline-offset-8">
              ZAGULL
            </span>
          </Link>
          <h1 className="text-2xl font-serif text-[#2d1b10]">Admin Portal</h1>
          <p className="text-[#8b6e5a] text-sm font-sans">Sign in to manage your store</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-[#c9956c]/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="username" 
                className="text-xs font-bold uppercase tracking-widest text-[#8b6e5a] ml-1"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6e5a]" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  className="pl-12 h-12 rounded-xl focus:ring-[#c9956c] focus:border-[#c9956c]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="text-xs font-bold uppercase tracking-widest text-[#8b6e5a] ml-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6e5a]" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-12 h-12 rounded-xl focus:ring-[#c9956c] focus:border-[#c9956c]"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-red-600 text-xs font-medium animate-in shake-in duration-300">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-[#c9956c] hover:bg-[#2d1b10] text-white transition-all duration-300 shadow-lg shadow-[#c9956c]/20 font-sans uppercase tracking-widest text-xs"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#fdf6f0] text-center">
            <p className="text-[10px] text-[#8b6e5a] uppercase tracking-widest font-sans">
              Secure Access • Authorized Personnel Only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
