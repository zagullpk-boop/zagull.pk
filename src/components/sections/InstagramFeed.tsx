import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";

export function InstagramFeed() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-[#2d1b10]">
            Follow us @zagull.pk
          </h2>
          <p className="text-[#8b6e5a] tracking-widest uppercase text-[10px] font-bold">
            Stay updated with our latest drops and style inspiration
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Link 
              key={i}
              href="https://instagram.com/zagull.pk"
              target="_blank"
              className="aspect-square rounded-2xl overflow-hidden relative group bg-gradient-to-br from-[#f5e6d3] to-[#e8c9b0]"
            >
              {/* Mock Image Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                <Instagram className="w-8 h-8 text-white/40 group-hover:text-white/80 transition-colors" />
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Instagram className="w-10 h-10 text-white" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            href="https://instagram.com/zagull.pk"
            target="_blank"
            className="inline-flex items-center gap-3 bg-[#c9956c] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#2d1b10] transition-all duration-500 shadow-xl shadow-[#c9956c]/20"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow on Instagram @zagull.pk</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
