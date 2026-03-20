"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2 } from "lucide-react";

interface NewsletterFormProps {
  variant?: "default" | "footer";
  className?: string;
}

export function NewsletterForm({ variant = "default", className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 bg-accent-forest/10 border border-accent-forest/20 p-4 rounded-2xl animate-in zoom-in duration-500">
        <CheckCircle2 className="w-5 h-5 text-accent-forest shrink-0" />
        <p className="text-accent-forest text-sm font-medium leading-tight">
          {variant === "footer" 
            ? "You're all set! Check your inbox soon." 
            : "Successfully subscribed! Enjoy 10% off your first order."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      <div className={cn(
        "flex gap-2", 
        variant === "default" ? "flex-col sm:flex-row" : "flex-col"
      )}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
          className={cn(
            "h-12 border-none bg-background-primary focus-visible:ring-1 focus-visible:ring-accent-forest/30",
            variant === "footer" ? "bg-white/50" : "bg-white"
          )}
        />
        <Button
          type="submit"
          className={cn(
            "h-12 min-w-[140px] shadow-lg shadow-accent-forest/10",
            variant === "default" && "px-8"
          )}
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            variant === "footer" ? "Subscribe" : "Join Now"
          )}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-red-500 text-xs font-medium ml-1 animate-in fade-in slide-in-from-top-1">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
