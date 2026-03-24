"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Truck, Zap, Globe, Package, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const cities = [
  "Faisalabad", "Lahore", "Karachi", "Islamabad", "Rawalpindi", 
  "Peshawar", "Multan", "Quetta", "Sialkot", "Gujranwala", "Hyderabad"
];

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f0]">
      <Navbar />
      <main className="flex-grow pt-32 pb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section 11A: Breadcrumb Integration */}
          <Breadcrumb 
            items={[{ label: "Shipping Information" }]} 
            className="mb-12"
          />

          <div className="max-w-4xl mx-auto space-y-20 pb-24">
            <div className="text-center space-y-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9956c]">Logistics & Delivery</p>
              <h1 className="text-4xl md:text-6xl font-serif text-[#2d1b10]">Swift & Secure Shipping</h1>
              <p className="text-[#8b6e5a] text-sm font-medium italic max-w-lg mx-auto leading-relaxed">
                We strive to get your ZAGULL pieces to you as quickly and safely as possible, 
                wherever you are in Pakistan.
              </p>
            </div>

            {/* Delivery Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group bg-white p-10 rounded-[3rem] border border-[#c9956c]/10 shadow-2xl shadow-[#c9956c]/5 relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9956c]/5 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000" />
                <div className="w-14 h-14 bg-[#c9956c]/10 rounded-2xl flex items-center justify-center mb-8">
                  <Truck className="w-7 h-7 text-[#c9956c]" />
                </div>
                <h2 className="text-2xl font-serif text-[#2d1b10] mb-4">Standard Delivery</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#c9956c]" />
                    <p className="text-sm font-medium text-[#8b6e5a]">3–5 working days</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#c9956c]" />
                    <p className="text-sm font-medium text-[#8b6e5a]">Fee: PKR 250 (Full Tracking)</p>
                  </div>
                </div>
              </div>

              <div className="group bg-[#2d1b10] p-10 rounded-[3rem] border border-white/5 shadow-2xl shadow-black/10 relative overflow-hidden transition-all duration-500 hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9956c]/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-1000" />
                <div className="w-14 h-14 bg-[#c9956c] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-[#c9956c]/20">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-2xl font-serif text-white mb-4">Express Delivery</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#c9956c]" />
                    <p className="text-sm font-medium text-white/60">1–2 working days</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#c9956c]" />
                    <p className="text-sm font-medium text-white/60">Fee: PKR 500 flat rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8B: Cities We Cover Pills */}
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-serif text-[#2d1b10]">Nationwide Coverage</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c9956c]">Delivering to 200+ cities</p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {cities.map(city => (
                  <span key={city} className="px-5 py-2 rounded-full border border-[#c9956c]/20 bg-white text-[10px] font-bold uppercase tracking-widest text-[#8b6e5a]">
                    {city}
                  </span>
                ))}
                <span className="px-5 py-2 rounded-full border border-[#c9956c]/20 bg-[#c9956c]/5 text-[10px] font-bold uppercase tracking-widest text-[#c9956c]">
                  & Many More
                </span>
              </div>
            </div>

            {/* Packaging & Quality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white p-12 rounded-[3.5rem] border border-[#c9956c]/10 shadow-xl shadow-[#c9956c]/5">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif text-[#2d1b10]">Eco-Luxe Packaging</h2>
                <div className="space-y-4 text-[#8b6e5a] text-sm font-medium leading-relaxed">
                  <p>
                    All items are hand-packed in our Faisalabad studio with eco-friendly ZAGULL pouches and secure padding to ensure your orders arrive in pristine condition.
                  </p>
                  <p>
                    Every shipment is quality-checked twice before being handed over to our courier partners.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-3xl bg-[#fdf6f0] flex flex-col items-center justify-center text-center p-4">
                  <Globe className="w-6 h-6 text-[#c9956c] mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#2d1b10]">PK Nationwide</span>
                </div>
                <div className="aspect-square rounded-3xl bg-[#fdf6f0] flex flex-col items-center justify-center text-center p-4">
                  <Package className="w-6 h-6 text-[#c9956c] mb-2" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#2d1b10]">Safe Packing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8C: Free Delivery Banner & CTA */}
        <section className="bg-[#2d1b10] py-24 px-6 text-center text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513519245088-0e12902e35a6?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-1000" />
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="inline-block px-8 py-3 bg-[#c9956c] rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-[#c9956c]/20 mb-4 animate-bounce">
              Special Offer
            </div>
            <h2 className="text-4xl md:text-6xl font-serif leading-tight">FREE Delivery on all orders <br className="hidden md:block" /> above PKR 3,000</h2>
            <p className="text-white/60 text-sm font-medium max-w-lg mx-auto uppercase tracking-widest">
              Standard shipping fees apply for smaller orders nationwide.
            </p>
            <div className="pt-6">
              <Link href="/shop" className="inline-block bg-white text-[#2d1b10] px-12 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#c9956c] hover:text-white transition-all duration-500 shadow-2xl shadow-black/10 transform hover:-translate-y-1">
                Browse the Collection
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
