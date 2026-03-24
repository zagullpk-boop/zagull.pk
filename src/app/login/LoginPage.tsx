"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase";
import { Loader2, Mail, Lock, CheckCircle2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/account");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-xl space-y-8 relative overflow-hidden">
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-forest/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="text-center space-y-2 relative z-10">
              <h1 className="text-3xl font-serif text-text-primary">Welcome Back</h1>
              <p className="text-text-secondary text-sm">Sign in to your ZAGULL account</p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <Input 
                      required
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 pl-12"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Password</label>
                    <Link href="/forgot-password" title="Forgot Password" className="text-[10px] font-bold uppercase tracking-widest text-accent-forest hover:underline">
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <Input 
                      required
                      type="password"
                      placeholder="••••••••"
                      className="h-12 pl-12"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-sm font-bold uppercase tracking-widest"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="text-center pt-4 relative z-10">
              <p className="text-sm text-text-secondary">
                Don't have an account?{" "}
                <Link href="/register" className="text-accent-forest font-bold hover:underline">
                  Create one now
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-text-secondary grayscale opacity-60">
             <div className="flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4" />
               <span className="text-[10px] font-bold uppercase tracking-widest">Secure Login</span>
             </div>
             <div className="flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4" />
               <span className="text-[10px] font-bold uppercase tracking-widest">GDPR Compliant</span>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
