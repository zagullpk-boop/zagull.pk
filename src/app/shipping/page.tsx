"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Shipping Information</h1>
            <p className="text-text-secondary max-w-xl mx-auto font-sans">
              We strive to get your ZAGULL pieces to you as quickly and safely as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-4">
              <div className="w-12 h-12 bg-accent-forest/10 rounded-full flex items-center justify-center text-accent-forest mb-4">
                🚚
              </div>
              <h2 className="text-2xl font-serif text-text-primary">Standard Delivery</h2>
              <div className="space-y-2 text-text-secondary font-sans">
                <p><strong>Timeline:</strong> 3–5 working days</p>
                <p><strong>Cost:</strong> Rs. 250 for orders under Rs. 3,000</p>
                <p className="text-accent-forest font-bold">FREE for orders above Rs. 3,000</p>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-4">
              <div className="w-12 h-12 bg-accent-forest/10 rounded-full flex items-center justify-center text-accent-forest mb-4">
                ⚡
              </div>
              <h2 className="text-2xl font-serif text-text-primary">Express Delivery</h2>
              <div className="space-y-2 text-text-secondary font-sans">
                <p><strong>Timeline:</strong> 1–2 working days</p>
                <p><strong>Cost:</strong> Rs. 500 flat rate nationwide</p>
              </div>
            </section>
          </div>

          <section className="bg-white p-10 rounded-3xl border border-border-light shadow-sm space-y-6">
            <h2 className="text-2xl font-serif text-text-primary">Nationwide Coverage</h2>
            <p className="text-text-secondary leading-relaxed">
              We deliver to all major cities across Pakistan including Faisalabad, Lahore, Karachi, Islamabad, Peshawar, and Quetta. For remote areas or villages, please allow an additional 2 working days for your package to arrive.
            </p>
            <p className="text-text-secondary leading-relaxed">
              All orders are packed with care in eco-friendly packaging to ensure they reach you in perfect condition.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
