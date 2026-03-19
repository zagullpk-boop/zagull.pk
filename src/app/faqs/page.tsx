"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import * as React from "react";

const faqs = [
  { q: "Do you ship all over Pakistan?", a: "Yes! We ship to all cities in Pakistan via courier services." },
  { q: "How long does delivery take?", a: "Standard delivery takes 3-5 working days. Express delivery is 1-2 days." },
  { q: "Can I return a product?", a: "Yes, we accept returns within 7 days of delivery if the item is unused and in original packaging." },
  { q: "Are your products original?", a: "All our jewellery and clothing items are carefully curated for quality and authenticity." },
  { q: "How can I track my order?", a: "You can track your order from the 'Order Tracking' page using your order ID." },
];

export default function FAQsPage() {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-5xl font-serif text-text-primary text-center">Frequently Asked Questions</h1>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left px-6 py-5 font-medium text-text-primary flex justify-between items-center hover:bg-background-primary transition-colors"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className="text-accent-forest font-bold text-xl">{open === i ? "−" : "+"}</span>
                </button>
                {open === i && (
                  <div className="px-6 pb-6 text-text-secondary font-sans text-sm border-t border-border-light pt-4 bg-background-primary/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
