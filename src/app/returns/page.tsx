"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Returns & Exchanges</h1>
            <p className="text-text-secondary max-w-xl mx-auto font-sans">
              Your satisfaction is our priority. If you're not happy with your purchase, we're here to help.
            </p>
          </div>

          <div className="space-y-8">
            <section className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">Our Policy</h2>
              <div className="space-y-4 text-text-secondary font-sans leading-relaxed">
                <p>We accept returns and exchanges for most items within <strong>7 days</strong> of delivery. To be eligible, your item must be:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>In its original, unused condition.</li>
                  <li>In the original packaging with all tags attached.</li>
                  <li>Accompanied by the original invoice or proof of purchase.</li>
                </ul>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-4">
              <h2 className="text-2xl font-serif text-text-primary text-red-800">Exceptions</h2>
              <p className="text-text-secondary font-sans leading-relaxed">
                For hygiene reasons, <strong>earrings and nose rings are strictly non-returnable</strong> unless they are defective upon arrival. 
              </p>
              <p className="text-text-secondary font-sans leading-relaxed">
                Items bought during a "Final Sale" or promotional clearance are also ineligible for return or exchange.
              </p>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">How to Return</h2>
              <p className="text-text-secondary font-sans leading-relaxed">
                Contact our support team at <strong>support@zagull.pk</strong> or message us on WhatsApp with your Order ID and photos of the item. Once approved, you can ship the item back to our Faisalabad warehouse.
              </p>
              <p className="text-sm text-text-secondary italic pt-2">
                * Note: Return shipping costs are the responsibility of the customer unless the item was damaged or incorrect.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
