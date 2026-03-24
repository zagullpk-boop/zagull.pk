"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, Package, MapPin, CheckCircle2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order | ZAGULL LIVE Status",
  description: "Enter your Order ID to get the latest status of your ZAGULL package via our automated WhatsApp tracking system. Fast delivery across Pakistan.",
};

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = React.useState("");
  const [name, setName] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);

  React.useEffect(() => {
    setIsValid(orderId.length >= 4 && name.length >= 2);
  }, [orderId, name]);

  const handleTrackWhatsApp = () => {
    if (!isValid) return;
    
    // Section 7: WhatsApp Redirect Logic
    const message = `Assalam o Alaikum ZAGULL, I'd like to track my order ${orderId}. My name is ${name}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923329024005?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f0]">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Section 11A: Breadcrumb Integration */}
          <Breadcrumb 
            items={[{ label: "Order Tracking" }]} 
            className="mb-12"
          />

          {/* Section 7: Order Tracking Transformation */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#c9956c]/5 border border-[#c9956c]/10 mb-6 group">
              <Package className="w-10 h-10 text-[#c9956c] group-hover:scale-110 transition-transform duration-500" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9956c]">Order Tracking</p>
            <h1 className="text-4xl md:text-6xl font-serif text-[#2d1b10]">Where is your ZAGULL?</h1>
            <p className="text-[#8b6e5a] text-sm font-medium italic max-w-lg mx-auto leading-relaxed">
              Enter your details below to track your order. We provide live updates via WhatsApp for your convenience.
            </p>
          </div>

          <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-[#c9956c]/10 shadow-2xl shadow-[#c9956c]/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9956c]/5 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <div className="space-y-10 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b6e5a] ml-2">Order ID</label>
                  <div className="relative">
                    <Input
                      placeholder="e.g. ZGL-12345"
                      className="h-14 pl-12 bg-[#fdf6f0]/30 border-[#c9956c]/10 rounded-2xl focus:ring-[#c9956c]/20 focus:border-[#c9956c]"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8b6e5a]/40" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b6e5a] ml-2">Your Name</label>
                  <Input
                    placeholder="Enter your name"
                    className="h-14 bg-[#fdf6f0]/30 border-[#c9956c]/10 rounded-2xl focus:ring-[#c9956c]/20 focus:border-[#c9956c]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Button 
                  onClick={handleTrackWhatsApp} 
                  disabled={!isValid}
                  className={cn(
                    "w-full h-15 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl flex items-center justify-center gap-3",
                    isValid 
                      ? "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-[#25D366]/20" 
                      : "bg-[#8b6e5a] text-white opacity-50 cursor-not-allowed"
                  )}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Track via WhatsApp</span>
                </Button>
                
                <p className="text-center text-[10px] font-bold uppercase tracking-widest text-[#8b6e5a]/60">
                  Direct connection to our support team
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 bg-white/50 rounded-3xl border border-[#c9956c]/10 flex flex-col items-center text-center space-y-3">
               <div className="w-10 h-10 bg-[#c9956c]/10 rounded-full flex items-center justify-center">
                 <CheckCircle2 className="w-5 h-5 text-[#c9956c]" />
               </div>
               <p className="text-[10px] uppercase font-black text-[#2d1b10] tracking-widest">Order Confirmed</p>
               <p className="text-[10px] font-medium text-[#8b6e5a]">We process all orders within 24 hours.</p>
            </div>
            <div className="p-8 bg-white/50 rounded-3xl border border-[#c9956c]/10 flex flex-col items-center text-center space-y-3">
               <div className="w-10 h-10 bg-[#c9956c]/10 rounded-full flex items-center justify-center">
                 <Package className="w-5 h-5 text-[#c9956c]" />
               </div>
               <p className="text-[10px] uppercase font-black text-[#2d1b10] tracking-widest">Quality Checked</p>
               <p className="text-[10px] font-medium text-[#8b6e5a]">Hand-verified before dispatch.</p>
            </div>
            <div className="p-8 bg-white/50 rounded-3xl border border-[#c9956c]/10 flex flex-col items-center text-center space-y-3">
               <div className="w-10 h-10 bg-[#c9956c]/10 rounded-full flex items-center justify-center">
                 <MapPin className="w-5 h-5 text-[#c9956c]" />
               </div>
               <p className="text-[10px] uppercase font-black text-[#2d1b10] tracking-widest">Doorstep Delivery</p>
               <p className="text-[10px] font-medium text-[#8b6e5a]">Fast shipping to 200+ cities in PK.</p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] text-[#8b6e5a] max-w-sm mx-auto leading-relaxed font-bold uppercase tracking-widest bg-white/50 py-4 px-8 rounded-full border border-[#c9956c]/10">
              * Order ID is in your confirmation SMS / Email
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
