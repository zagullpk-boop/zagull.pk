"use client";

import React, { useActionState } from "react";
import { authenticate } from "@/lib/admin/actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Lock, User, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [errorMessage, dispatch, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen bg-background-primary flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block mb-4">
            <span className="text-4xl font-serif tracking-tight text-text-primary underline decoration-accent-forest/30 underline-offset-8">
              ZAGULL
            </span>
          </Link>
          <h1 className="text-2xl font-serif text-text-primary">Admin Portal</h1>
          <p className="text-text-secondary text-sm">Sign in to manage your store</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-black/5 border border-border-light">
          <form action={dispatch} className="space-y-6">
            <div className="space-y-2">
              <label 
                htmlFor="username" 
                className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1"
              >
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="username"
                  name="username"
                  placeholder="admin"
                  required
                  className="pl-12 h-12 rounded-xl focus:ring-accent-forest focus:border-accent-forest"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="password" 
                className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="pl-12 h-12 rounded-xl focus:ring-accent-forest focus:border-accent-forest"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 border border-red-100 p-3 rounded-xl text-red-600 text-xs font-medium animate-in shake-in duration-300">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-xl bg-accent-forest hover:bg-black text-white transition-all duration-300 shadow-lg shadow-accent-forest/20"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-light text-center">
            <p className="text-[10px] text-text-secondary uppercase tracking-widest">
              Secure access for authorized personnel only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
