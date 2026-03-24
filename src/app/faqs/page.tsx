"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import * as React from "react";
import { ChevronDown, MessageCircle, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const faqs = [
  { 
    q: "Do you ship all over Pakistan?", 
    a: "Yes! We deliver to 200+ cities across Pakistan. Standard delivery time is 3-5 working days depending on your location." 
  },
  { 
    q: "What are the delivery charges?", 
    a: "We offer FREE delivery on all orders above PKR 3,000. For orders below this amount, a flat shipping fee of PKR 250 applies nationwide." 
  },
  { 
    q: "Do you have a physical store?", 
    a: "We are currently an online-focused brand based in Faisalabad. This allows us to keep our overheads low and provide you with premium designs at exceptionally affordable prices." 
  },
  { 
    q: "Can I return or exchange an item?", 
    a: "Absolutely. We offer a 7-day hassle-free return policy. If you're not happy with your purchase, you can return or exchange any unused item in its original packaging. Please note that for hygiene reasons, earrings cannot be returned." 
  },
  { 
    q: "What payment methods do you accept?", 
    a: "Our most popular method is Cash on Delivery (COD). We also accept Bank Transfers — simply reach out to us on WhatsApp after placing your order for bank details." 
  },
  { 
    q: "How do I track my order?", 
    a: "You can use our 'Order Tracking' page with your Order ID. Alternatively, feel free to message us on WhatsApp with your name, and our team will give you a live update." 
  },
  { 
    q: "Is your jewellery real gold?", 
    a: "Our collection features high-quality fashion jewellery. Many pieces are premium gold-plated or crafted from curated alloys designed to maintain their brilliance and 'real look' for a long time." 
  },
  { 
    q: "How should I care for my ZAGULL jewellery?", 
    a: "To keep your pieces shining, avoid contact with water, perfumes, and harsh chemicals. We recommend storing them in the airtight ZAGULL pouch provided with your order." 
  },
];

import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f0]">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Section 11A: Breadcrumb Integration */}
          <Breadcrumb 
            items={[{ label: "Support" }, { label: "FAQs" }]} 
            className="mb-12"
          />

          {/* Header */}
          <div className="text-center space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9956c]">Support Center</p>
            <h1 className="text-4xl md:text-6xl font-serif text-[#2d1b10]">Frequently Asked Questions</h1>
            <p className="text-[#8b6e5a] text-sm font-medium italic">Everything you need to know about shopping with ZAGULL.</p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={cn(
                  "bg-white rounded-3xl border transition-all duration-500 overflow-hidden shadow-sm",
                  openIndex === i ? "border-[#c9956c]/30 shadow-xl shadow-[#c9956c]/5" : "border-[#c9956c]/10 hover:border-[#c9956c]/30"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left px-8 py-6 flex justify-between items-center group"
                >
                  <span className={cn(
                    "font-serif text-lg transition-colors duration-300",
                    openIndex === i ? "text-[#c9956c]" : "text-[#2d1b10] group-hover:text-[#c9956c]"
                  )}>
                    {faq.q}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500",
                    openIndex === i ? "bg-[#c9956c] border-[#c9956c] rotate-180" : "bg-transparent border-[#c9956c]/20 group-hover:border-[#c9956c]"
                  )}>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-colors",
                      openIndex === i ? "text-white" : "text-[#8b6e5a]"
                    )} />
                  </div>
                </button>
                
                <div 
                  className={cn(
                    "px-8 transition-all duration-500 ease-in-out",
                    openIndex === i ? "max-h-[500px] pb-8 opacity-100" : "max-h-0 pb-0 opacity-0"
                  )}
                >
                  <div className="pt-4 border-t border-[#fdf6f0] text-[#8b6e5a] text-sm font-medium leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA - Section 6C */}
          <div className="bg-[#2d1b10] rounded-[3rem] p-10 md:p-16 text-center shadow-2xl shadow-black/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9956c]/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 bg-[#c9956c] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#c9956c]/20">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-serif text-white">Still have questions?</h3>
                <p className="text-white/60 text-sm font-medium max-w-sm mx-auto">
                  Our team is available 24/7 on WhatsApp to assist you with your orders and products.
                </p>
              </div>
              <Link 
                href="https://wa.me/923329024005" 
                target="_blank"
                className="inline-flex items-center gap-3 bg-[#25D366] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#128C7E] transition-all duration-500 shadow-xl shadow-[#25D366]/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with us on WhatsApp</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
