"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Newsletter error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-accent-forest text-white text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-5xl font-serif leading-tight">
          Sign up to our newsletter and get 10% off your first order.
        </h2>
        <p className="text-white/80 font-sans">
          Be the first to hear about new collections, nature-inspired style tips, and exclusive events.
        </p>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8 animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif">Welcome to the inner circle!</h3>
              <p className="text-white/80 font-sans">
                A welcome gift has been sent to <strong>{email}</strong>.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-grow bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all font-sans"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-white text-accent-forest px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-background-primary transition-all disabled:opacity-70 shadow-xl active:scale-95"
              >
                {isLoading ? "Joining..." : "Join Now"}
              </button>
            </form>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">
              Secure & Private • Unsubscribe at any time
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
