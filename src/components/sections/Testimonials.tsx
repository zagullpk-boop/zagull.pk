import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Absolutely loved the earrings! The packaging was so beautiful, felt like a gift even to myself.",
    name: "Ayesha R.",
    city: "Lahore",
    stars: 5,
  },
  {
    quote: "The gift basket was perfect for Eid. Everyone asked where I got it from. Will definitely order again!",
    name: "Sana M.",
    city: "Karachi",
    stars: 5,
  },
  {
    quote: "Great quality for the price. Delivery was faster than expected. The jewellery looks so premium!",
    name: "Hina K.",
    city: "Islamabad",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#fdf6f0]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2d1b10]">
            What Our Customers Say
          </h2>
          <p className="text-[#8b6e5a] tracking-widest uppercase text-[10px] font-bold">
            Loved by women across Pakistan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 snap-x snap-mandatory overflow-x-auto pb-8 -mb-8 no-scrollbar">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="snap-center min-w-[300px] bg-white p-10 rounded-[2.5rem] border border-[#c9956c]/10 shadow-xl shadow-[#c9956c]/5 relative group hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-8 left-8 text-[#c9956c]/10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="flex gap-1 mb-6 relative">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#c9956c] text-[#c9956c]" />
                ))}
              </div>

              <p className="text-[#2d1b10] font-serif text-lg leading-relaxed mb-8 relative">
                &quot;{t.quote}&quot;
              </p>

              <div className="space-y-1 pt-4 border-t border-[#fdf6f0] relative">
                <p className="font-bold text-sm tracking-widest uppercase text-[#2d1b10]">
                  {t.name}
                </p>
                <p className="text-[10px] text-[#8b6e5a] uppercase font-medium tracking-widest">
                  {t.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
