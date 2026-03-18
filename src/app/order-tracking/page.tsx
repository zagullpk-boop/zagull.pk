"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = React.useState("");
  const [status, setStatus] = React.useState<null | string>(null);

  const handleTrack = () => {
    if (!orderId) return;
    setStatus("searching");
    // Simulate API call
    setTimeout(() => {
      setStatus("Your order is being processed and will be dispatched within 24 hours.");
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Track Your Order</h1>
            <p className="text-text-secondary font-sans">
              Enter your ZAGULL order ID below to see the current status of your package.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-border-light shadow-sm space-y-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-2">Order ID</label>
              <div className="flex gap-4">
                <div className="relative flex-grow">
                  <Input
                    placeholder="e.g. ZGL-123456"
                    className="h-14 pl-12 rounded-2xl"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                </div>
                <Button onClick={handleTrack} disabled={!orderId || status === "searching"} className="h-14 px-10 rounded-2xl">
                  {status === "searching" ? "Searching..." : "Track Now"}
                </Button>
              </div>
            </div>

            {status && status !== "searching" && (
              <div className="p-6 bg-accent-forest/5 border border-accent-forest/20 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-accent-forest font-bold mb-2 flex items-center gap-2">
                  <span>📦</span> Order Status
                </h3>
                <p className="text-text-primary text-sm leading-relaxed">{status}</p>
              </div>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
              * Your order ID can be found in the confirmation email sent to you after your purchase. If you cannot find it, please contact our support.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
