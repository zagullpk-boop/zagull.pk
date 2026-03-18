"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsLoading(true);
    // Simulate API call — replace with real service when ready
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 700);
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
          <div className="flex flex-col items-center gap-3 py-4">
            <CheckCircle2 className="w-10 h-10 text-white" />
            <p className="text-lg font-serif">
              You&apos;re on the list! Check <strong>{email}</strong> for your 10% off code.
            </p>
          </div>
        ) : (
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
              className="flex-grow bg-white/10 border border-white/20 rounded-lg px-6 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-white text-accent-forest px-8 py-3 rounded-lg font-medium hover:bg-white/90 transition-all disabled:opacity-70"
            >
              {isLoading ? "Joining..." : "Join Now"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
