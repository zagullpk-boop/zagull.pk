import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Our Story | ZAGULL Boutique Fashion",
  description: "Learn about ZAGULL's journey from Faisalabad to becoming a leading nature-inspired fashion brand in Pakistan. Affordable elegance for every woman.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f0]">
      <Navbar />
      <main className="flex-grow pt-32 pb-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section 11A: Breadcrumb Integration */}
          <Breadcrumb 
            items={[{ label: "Our Story" }]} 
            className="mb-12"
          />
          
          {/* Hero Header */}
          <section className="text-center mb-24 space-y-6">
            <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#c9956c] mb-3">Est. 2024 • Faisalabad</p>
            <h1 className="text-5xl md:text-7xl font-serif text-[#2d1b10] leading-tight">Born in Faisalabad.<br />Worn with Love.</h1>
            <p className="text-lg text-[#8b6e5a] max-w-2xl mx-auto leading-relaxed font-sans italic">
              "Bringing nature-inspired elegance from the heart of Pakistan to your everyday story."
            </p>
          </section>

          {/* Intro Text */}
          <section className="max-w-3xl mx-auto mb-20 space-y-8">
            <h2 className="text-3xl font-serif text-[#2d1b10] text-center">Crafting Affordable Elegance</h2>
            <div className="space-y-6 text-[#8b6e5a] text-center leading-relaxed font-medium">
              <p>
                ZAGULL was born from a simple belief — that every woman deserves to feel beautiful, no matter her budget. Founded in Faisalabad, the historic textile hub of Pakistan, we started with a mission to bridge the gap between premium aesthetics and accessible pricing.
              </p>
              <p>
                We recognized that the modern woman seeks jewellery and clothing that doesn't just look beautiful, but feels like an extension of her personality. Our collections reflect this balance of delicacy, strength, and timeless style.
              </p>
            </div>

            {/* Section 4B: Founder Note */}
            <div className="mt-16 p-10 bg-white rounded-3xl border-l-4 border-[#c9956c] shadow-xl shadow-[#c9956c]/5 relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#c9956c] rounded-full flex items-center justify-center text-white shadow-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <p className="text-xl font-serif italic text-[#2d1b10] leading-relaxed">
                "ZAGULL started from a kitchen table with a handful of designs and a big 
                dream — to make every woman in Pakistan feel elegantly dressed without 
                breaking the bank. What started in 2024 has grown into a community we're 
                incredibly proud of."
              </p>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#c9956c]">
                — Founder, ZAGULL
              </p>
            </div>
          </section>

          {/* Section 4A: Visual Story Cards */}
          <section className="mb-24 space-y-12">
            <h2 className="text-3xl font-serif text-center text-[#2d1b10]">Our Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="space-y-6 group">
                <div className="relative aspect-video md:aspect-square overflow-hidden rounded-[2.5rem] bg-[#f5e6d3] border border-[#c9956c]/10">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b10]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-2 px-2">
                  <h4 className="text-lg font-serif text-[#2d1b10]">Our Studio</h4>
                  <p className="text-xs text-[#8b6e5a] leading-relaxed font-medium">
                    Where every piece is designed and quality-checked before shipping.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="space-y-6 group">
                <div className="relative aspect-video md:aspect-square overflow-hidden rounded-[2.5rem] bg-[#f5e6d3] border border-[#c9956c]/10">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b10]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-2 px-2">
                  <h4 className="text-lg font-serif text-[#2d1b10]">Handpacked with Love</h4>
                  <p className="text-xs text-[#8b6e5a] leading-relaxed font-medium">
                    Every order is wrapped carefully in eco-friendly packaging.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="space-y-6 group">
                <div className="relative aspect-video md:aspect-square overflow-hidden rounded-[2.5rem] bg-[#f5e6d3] border border-[#c9956c]/10">
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.2 7.8A2 2 0 0 1 22 9.8V21a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V9.8a2 2 0 0 1 1.8-2l3-1.5V6a5 5 0 0 1 10 0v.3z"/><path d="m16 6-4-4-4 4"/></svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d1b10]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="space-y-2 px-2">
                  <h4 className="text-lg font-serif text-[#2d1b10]">The Collection</h4>
                  <p className="text-xs text-[#8b6e5a] leading-relaxed font-medium">
                    Nature-inspired designs for the modern Pakistani woman.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline & Stats */}
          <section className="bg-white rounded-[3.5rem] p-12 md:p-24 text-center border border-[#c9956c]/10 shadow-xl shadow-[#c9956c]/5 mb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9956c]/5 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl font-serif text-[#2d1b10]">Crafting Affordable Elegance</h2>
              <p className="text-lg text-[#8b6e5a] max-w-2xl mx-auto leading-relaxed">
                Serving 100+ happy customers across Pakistan with 100% genuine, hand-checked quality products.
              </p>
              <div className="flex flex-wrap justify-center gap-12 pt-8">
                <div className="text-center">
                  <p className="text-4xl font-serif text-[#c9956c]">100+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#8b6e5a]">Orders delivered</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-serif text-[#c9956c]">50+</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#8b6e5a]">Unqiue Designs</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-serif text-[#c9956c]">24/7</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#8b6e5a]">WhatsApp Support</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Section 4C: Back to Shop CTA */}
        <section className="bg-[#c9956c] py-20 px-6 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            <h2 className="text-4xl md:text-5xl font-serif">Ready to find your next favourite piece?</h2>
            <Link href="/shop" className="inline-block bg-white text-[#c9956c] px-12 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[#2d1b10] hover:text-white transition-all duration-500 shadow-2xl shadow-black/10 transform hover:-translate-y-1">
              Shop the Collection
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
