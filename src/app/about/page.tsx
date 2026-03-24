import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about ZAGULL's journey from Faisalabad to becoming a leading nature-inspired fashion brand in Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-24 space-y-6">
            <p className="text-xs uppercase tracking-[0.3em] text-accent-forest font-bold mb-3">Our Story</p>
            <h1 className="text-5xl md:text-7xl font-serif text-text-primary leading-tight">Born in Faisalabad.<br />Worn with Love.</h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed font-sans italic">
              "Bringing nature-inspired elegance from the heart of Pakistan to your everyday story."
            </p>
          </section>

          {/* Core Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <div className="space-y-8">
              <h2 className="text-3xl font-serif text-text-primary">Crafting Affordable Elegance</h2>
              <div className="space-y-6 text-text-secondary leading-relaxed font-sans">
                <p>
                  ZAGULL was born from a simple belief — that every woman deserves to feel beautiful, no matter her budget. Founded in Faisalabad, the historic textile hub of Pakistan, we started with a mission to bridge the gap between premium aesthetics and accessible pricing.
                </p>
                <p>
                  We recognized that the modern woman seeks jewellery and clothing that doesn't just look beautiful, but feels like an extension of her personality. Our collections reflect this balance of delicacy, strength, and timeless style.
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] bg-white rounded-[3rem] p-12 shadow-sm border border-border-light flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-5xl font-serif text-accent-forest/20 italic block">Est. 2024</span>
              <p className="text-sm uppercase tracking-widest text-text-secondary font-bold">Nature-Inspired Designs</p>
              <div className="w-12 h-0.5 bg-accent-forest/30" />
            </div>
          </div>

          {/* Values Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[
              { title: 'Authentic Designs', desc: 'Every piece is thoughtfully designed in-house, inspired by nature and crafted with attention to detail.' },
              { title: 'Affordable Lux', desc: 'Premium aesthetics should be accessible to everyone. We source materials that shine without the markup.' },
              { title: 'Made with Heart', desc: 'From Faisalabad to your doorstep, every order is packed with care, love, and a touch of elegance.' },
            ].map(v => (
              <div key={v.title} className="bg-white p-10 border border-border-light rounded-[2.5rem] hover:shadow-xl hover:shadow-accent-forest/5 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-background-primary flex items-center justify-center mb-6 group-hover:bg-accent-forest transition-colors">
                  <div className="w-2 h-2 rounded-full bg-accent-forest group-hover:bg-white" />
                </div>
                <h3 className="font-serif text-xl text-text-primary mb-3">{v.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed font-sans">{v.desc}</p>
              </div>
            ))}
          </section>

          {/* Visual Timeline */}
          <section className="mb-24 space-y-12">
            <h2 className="text-3xl font-serif text-center text-text-primary">Our Journey</h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border-light hidden md:block" />
              <div className="space-y-12">
                {[
                  { year: 'Jan 2024', event: 'The ZAGULL Vision was born in Faisalabad.' },
                  { year: 'Mar 2024', event: 'First Jewellery Collection "Nature Blooms" launched.' },
                  { year: 'Jun 2024', event: 'Expanded into premium clothing and gift hampers.' },
                  { year: 'Aug 2024', event: 'Serving 5,000+ happy women across Pakistan.' },
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "relative flex items-center justify-between gap-8 flex-col md:flex-row",
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  )}>
                    <div className="flex-1 md:text-right w-full">
                       <div className={cn("p-8 bg-white border border-border-light rounded-3xl group hover:border-accent-forest/30 transition-all", i % 2 === 0 ? "md:text-left" : "md:text-right")}>
                         <p className="text-accent-forest font-bold text-sm mb-2">{item.year}</p>
                         <p className="text-text-primary font-serif italic text-lg">{item.event}</p>
                       </div>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-accent-forest border-4 border-white shadow-sm z-10 hidden md:block" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission Statement */}
          <section className="bg-white rounded-[3.5rem] p-12 md:p-20 text-center border border-border-light shadow-sm mb-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-accent-forest/5 opacity-40 grayscale pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl font-serif text-text-primary mb-6">Our Mission</h2>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed font-sans">
                To make every woman in Pakistan feel confident, beautiful, and celebrated — through jewellery and fashion 
                that tells her story. We are more than a store. We are a community of women who believe in the power of style.
              </p>
            </div>
          </section>

          {/* Meet the Team */}
          <section className="mb-24 space-y-12">
             <div className="text-center space-y-4">
               <h2 className="text-3xl font-serif text-text-primary">Meet the Visionaries</h2>
               <p className="text-text-secondary max-w-xl mx-auto italic">The creative minds bringing you the best of Faisalabad craftsmanship.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { name: 'Ayesha R.', role: 'Founder & Creative Lead', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AyeshaR' },
                  { name: 'Omar K.', role: 'Operations & Sourcing', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OmarK' },
                  { name: 'Fatima Z.', role: 'Customer Success', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FatimaZ' },
                ].map((member, i) => (
                  <div key={i} className="text-center group">
                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-[2rem] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-lg">
                      <Image src={member.img} alt={member.name} fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
                    </div>
                    <h4 className="text-xl font-serif text-text-primary">{member.name}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-forest mt-1">{member.role}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Contact CTA */}
          <section className="text-center space-y-6">
            <p className="text-text-secondary font-sans italic">Want to know more or collaborate with us?</p>
            <a href="/contact" className="inline-block bg-accent-forest text-white px-10 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-accent-forest/90 transition-all transform hover:-translate-y-1 shadow-lg shadow-accent-forest/10">
              Get in Touch
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
