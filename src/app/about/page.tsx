"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-serif text-text-primary">About ZAGULL</h1>
          <div className="prose prose-lg font-sans text-text-secondary leading-relaxed">
            <p>
              Welcome to ZAGULL, your destination for elegant artificial jewelry and fashion. Based in Faisalabad, Pakistan, we curate beautiful, affordable pieces that add charm to every woman's style.
            </p>
            <p>
              Each piece is carefully selected for quality and design, bringing you the latest trends without compromising on elegance. Our mission is to make premium aesthetics accessible to everyone.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
