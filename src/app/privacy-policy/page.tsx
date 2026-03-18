"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4 border-b border-border-light pb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Privacy Policy</h1>
            <p className="text-text-secondary font-sans">Effective Date: March 17, 2026</p>
          </div>

          <div className="space-y-10 font-sans text-text-secondary leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">1. Information We Collect</h2>
              <p>We collect personal information that you provide to us when placing an order, including your name, email address, phone number, and shipping address. This information is necessary to fulfill your orders and provide customer support.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">2. How We Use Your Information</h2>
              <p>Your data is used solely for processing transactions, shipping your products, and communicating order updates. We may also use your email to send promotional offers if you have opted in to our newsletter.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">3. Data Security</h2>
              <p>We implement a variety of security measures to maintain the safety of your personal information. We do not store credit card or payment information on our servers. All online transactions are processed through secure, encrypted gateways.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif text-text-primary">4. Cookies</h2>
              <p>Our website uses cookies to enhance your browsing experience and keep track of items in your shopping cart. You can choose to disable cookies in your browser settings, though this may limit some site features.</p>
            </section>

            <section className="space-y-4 bg-white p-8 rounded-3xl border border-border-light">
              <h2 className="text-2xl font-serif text-text-primary">Contact Us</h2>
              <p>If you have any questions regarding this privacy policy or how we handle your data, please contact us at <strong>support@zagull.pk</strong>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
