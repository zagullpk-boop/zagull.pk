"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-16">
          <section className="space-y-8 text-center">
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary">Our Story</h1>
            <p className="text-xl text-text-secondary font-sans max-w-2xl mx-auto leading-relaxed italic">
              "Bringing nature-inspired elegance from the heart of Faisalabad to the world."
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-text-primary">Crafting Elegance</h2>
              <div className="space-y-4 font-sans text-text-secondary leading-relaxed">
                <p>
                  Founded in Faisalabad, the textile hub of Pakistan, **ZAGULL** began with a simple vision: to create a destination where traditional craftsmanship meets modern aesthetics. 
                </p>
                <p>
                  We recognized that the modern woman seeks jewellery and clothing that doesn't just look beautiful, but feels like an extension of her personality. Our collections reflect this balance of delicacy and strength.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] bg-background-secondary rounded-3xl overflow-hidden shadow-inner flex items-center justify-center p-12">
               <div className="text-center space-y-4">
                 <span className="text-4xl font-serif text-accent-forest/40 italic block">Est. 2024</span>
                 <p className="text-xs uppercase tracking-widest text-text-secondary">Born from a passion for timeless style</p>
               </div>
            </div>
          </section>

          <section className="bg-white p-12 md:p-16 rounded-[3rem] border border-border-light shadow-sm space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-serif text-text-primary">Our Values</h2>
              <div className="w-12 h-1 bg-accent-forest mx-auto rounded-full" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <h3 className="text-lg font-bold uppercase tracking-tighter text-text-primary">Quality First</h3>
                <p className="text-sm text-text-secondary leading-relaxed">Every piece in our jewellery collection is hand-selected and verified for durability and shine.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold uppercase tracking-tighter text-text-primary">Nature Inspired</h3>
                <p className="text-sm text-text-secondary leading-relaxed">Our designs draw inspiration from the organic forms of leaves, flowers, and the natural world.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-bold uppercase tracking-tighter text-text-primary">Customer Care</h3>
                <p className="text-sm text-text-secondary leading-relaxed">Based in Faisalabad, we provide local support and fast shipping to ensure you're always satisfied.</p>
              </div>
            </div>
          </section>

          <section className="text-center space-y-8 pt-8">
            <h2 className="text-3xl font-serif text-text-primary">Our Mission</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              We strive to empower women by providing high-quality, premium artificial jewellery and contemporary clothing that makes every occasion feel special. At Zagull, elegance isn't just a look—it's a lifestyle.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
