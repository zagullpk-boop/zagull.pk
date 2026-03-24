"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Ahmed",
    location: "Lahore",
    content: "The jewellery from ZAGULL is simply breathtaking. The attention to detail in the pendants I ordered for my sister's wedding was incredible. Truly premium quality!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    name: "Zainab Malik",
    location: "Islamabad",
    content: "I've never seen such beautiful gift baskets in Pakistan. The presentation was so elegant, and the mix of items felt really thoughtful. It was the perfect birthday surprise.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
  },
  {
    name: "Ayesha Khan",
    location: "Karachi",
    content: "The clothing line is so graceful. The fabric is premium and the designs are contemporary yet modest. ZAGULL has become my go-to for special occasions.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-forest/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-forest/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm tracking-[0.2em] text-accent-forest font-medium uppercase">
            Customer Stories
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-text-primary">
            Trusted by Women Across Pakistan
          </h3>
          <p className="text-text-secondary">
            Hear from our community about their experience with ZAGULL's nature-inspired collections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-background-primary p-8 md:p-12 rounded-3xl border border-border-light hover:border-accent-forest/30 transition-all duration-500 hover:shadow-xl group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent-forest text-accent-forest" />
                ))}
              </div>
              
              <div className="relative mb-8">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-accent-forest/10" />
                <p className="text-text-primary font-sans leading-relaxed relative z-10 italic">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-border-light">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white border border-border-light group-hover:border-accent-forest/50 transition-colors">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">{testimonial.name}</h4>
                  <p className="text-xs text-text-secondary font-medium tracking-wider uppercase">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
