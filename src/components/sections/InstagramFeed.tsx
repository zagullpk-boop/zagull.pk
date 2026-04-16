import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";

const igPosts = [
  { id: 1, image: "/images/ig_1.png" },
  { id: 2, image: "/images/ig_2.png" },
  { id: 3, image: "/images/ig_3.png" },
  { id: 4, image: "/images/ig_4.png" },
  { id: 5, image: "/images/ig_5.png" },
  { id: 6, image: "/images/ig_6.png" },
];

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
          {igPosts.map((post) => (
            <Link
              key={post.id}
              href="https://instagram.com/zagull.pk"
              target="_blank"
              className="group rounded-2xl overflow-hidden bg-[#fdf6f0] block"
              style={{ position: "relative" }}
            >
              {/* Padding-trick container forces 1:1 aspect ratio with a real pixel height */}
              <div className="w-full" style={{ paddingBottom: "100%", position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={`Instagram post ${post.id}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.7s ease",
                  }}
                  className="group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: "rgba(0,0,0,0.35)" }}
                >
                  <Instagram className="w-8 h-8 text-white" />
                </div>
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
