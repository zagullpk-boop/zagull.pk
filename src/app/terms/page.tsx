"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4 border-b border-border-light pb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Terms & Conditions</h1>
            <p className="text-text-secondary font-sans leading-relaxed">
              Please read these terms and conditions carefully before using the ZAGULL store.
            </p>
          </div>

          <div className="space-y-10 font-sans text-text-secondary leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">1. Acceptance of Terms</h2>
              <p>By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations in Pakistan. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">2. Product Availability & Pricing</h2>
              <p>All products listed on the ZAGULL store are subject to availability. We reserve the right to limit the quantity of products we supply. Prices for our products are subject to change without notice.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">3. Intellectual Property</h2>
              <p>All content on this website, including designs, text, graphics, and images, is the property of ZAGULL and is protected by copyright laws. You may not reproduce, distribute, or use any content without prior written consent.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">4. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of Pakistan. You irrevocably submit to the exclusive jurisdiction of the courts in Faisalabad.</p>
            </section>

            <section className="bg-accent-forest/5 p-8 rounded-3xl border border-accent-forest/10">
              <p className="italic text-sm">
                ZAGULL reserves the right to modify these terms at any time. Your continued use of the site following any changes signifies your acceptance of the new terms.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
