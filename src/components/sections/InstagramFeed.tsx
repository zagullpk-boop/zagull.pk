"use client";

import { Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const igPosts = [
  { id: 1, image: "/images/ig_1.png" },
  { id: 2, image: "/images/ig_2.png" },
  { id: 3, image: "/images/ig_3.png" },
  { id: 4, image: "/images/jewellery_cat.png" },
  { id: 5, image: "/images/clothing_cat.png" },
  { id: 6, image: "/images/gift_baskets_cat.png" },
];

export function InstagramFeed() {
  return (
    <section className="py-24 px-6 md:px-12 bg-background-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-sm tracking-[0.2em] text-accent-forest font-medium uppercase">
              Join the Community
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-text-primary">
              Follow Us @ZAGULL.PK
            </h3>
            <p className="text-text-secondary max-w-lg">
              Get a behind-the-scenes look at our nature-inspired designs and be the first to know about new arrivals.
            </p>
          </div>
          <Link 
            href="https://instagram.com/zagull.pk" 
            target="_blank"
            className="group flex items-center space-x-3 bg-white px-8 py-4 rounded-full border border-border-light hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Follow ZAGULL</span>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {igPosts.map((post) => (
            <Link 
              key={post.id} 
              href="https://instagram.com/zagull.pk" 
              target="_blank"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-white border border-border-light"
            >
              <Image 
                src={post.image} 
                alt={`Instagram post ${post.id}`} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Instagram className="text-white w-8 h-8" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
