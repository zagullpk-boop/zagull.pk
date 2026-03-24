"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { supabase } from "@/lib/supabase";
import { Loader2, User, Mail, Lock, CheckCircle2, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      setSuccess(true);
      // Optional: Auto-login or wait for email confirmation
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen bg-background-primary">
        <Navbar />
        <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6 text-center">
          <div className="bg-white p-12 rounded-3xl border border-border-light shadow-xl space-y-6 max-w-md animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-accent-forest text-white rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-serif text-text-primary">Welcome to ZAGULL!</h1>
              <p className="text-text-secondary leading-relaxed">
                Your account has been created successfully. We've sent a verification email to <strong>{formData.email}</strong>.
              </p>
            </div>
            <p className="text-sm text-accent-forest font-bold">Redirecting you to login...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-forest/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="text-center space-y-2 relative z-10">
              <h1 className="text-3xl font-serif text-text-primary">Create Account</h1>
              <p className="text-text-secondary text-sm">Join the ZAGULL nature-inspired community</p>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6 relative z-10">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <Input 
                      id="fullName"
                      required
                      placeholder="Jane Doe"
                      className="h-12 pl-12"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <Input 
                      id="email"
                      required
                      type="email"
                      placeholder="name@example.com"
                      className="h-12 pl-12"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                    <Input 
                      id="password"
                      required
                      type="password"
                      placeholder="Min. 6 characters"
                      className="h-12 pl-12"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                 <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded text-accent-forest border-border-light focus:ring-accent-forest transition-all" />
                 <label htmlFor="terms" className="text-xs text-text-secondary leading-tight">
                   I agree to the <Link href="/terms" className="text-accent-forest font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-accent-forest font-bold hover:underline">Privacy Policy</Link>.
                 </label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-sm font-bold uppercase tracking-widest"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center pt-4 relative z-10">
              <p className="text-sm text-text-secondary">
                Already have an account?{" "}
                <Link href="/login" className="text-accent-forest font-bold hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
