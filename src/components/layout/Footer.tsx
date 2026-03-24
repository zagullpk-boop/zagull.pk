"use client";

import React from "react";
import Link from "next/link";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#c9956c]/10 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        {/* Column 1: Brand & Social */}
        <div className="space-y-8">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-serif tracking-tight text-[#2d1b10]">
              ZAGULL
            </span>
          </Link>
          <p className="text-[#8b6e5a] text-xs leading-relaxed max-w-xs font-medium uppercase tracking-widest">
            Crafting nature-inspired elegance for the modern woman. From Faisalabad to your doorstep, we bring you the finest in artificial jewellery and contemporary clothing.
          </p>
          
          {/* Section 9A: Social Media Icons */}
          <div className="flex items-center gap-4">
            <Link 
              href="https://instagram.com/zagull.pk" 
              target="_blank"
              className="w-10 h-10 rounded-full border border-[#c9956c]/10 flex items-center justify-center text-[#8b6e5a] hover:bg-[#c9956c] hover:text-white hover:border-[#c9956c] transition-all duration-300 shadow-sm shadow-[#c9956c]/5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </Link>
            <Link 
              href="https://tiktok.com/@zagull.pk" 
              target="_blank"
              className="w-10 h-10 rounded-full border border-[#c9956c]/10 flex items-center justify-center text-[#8b6e5a] hover:bg-[#c9956c] hover:text-white hover:border-[#c9956c] transition-all duration-300 shadow-sm shadow-[#c9956c]/5"
            >
              <svg width="20" height="20" viewBox="0 0 448 512" fill="currentColor">
                <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14z"/>
              </svg>
            </Link>
            <Link 
              href="https://facebook.com/zagull.pk" 
              target="_blank"
              className="w-10 h-10 rounded-full border border-[#c9956c]/10 flex items-center justify-center text-[#8b6e5a] hover:bg-[#c9956c] hover:text-white hover:border-[#c9956c] transition-all duration-300 shadow-sm shadow-[#c9956c]/5"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#2d1b10] mb-8">Shop Selection</h4>
          <ul className="space-y-4">
            {[
              { name: "All Collections", href: "/shop" },
              { name: "Jewellery", href: "/shop?category=Jewellery" },
              { name: "Clothing", href: "/shop?category=Clothing" },
              { name: "Gift Baskets", href: "/shop?category=GiftBaskets" },
              { name: "New Arrivals", href: "/shop?sort=newest" }
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-[10px] font-bold uppercase tracking-widest text-[#8b6e5a] hover:text-[#c9956c] transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Policy & Support */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#2d1b10] mb-8">Customer Care</h4>
          <ul className="space-y-4">
            {[
              { name: "About ZAGULL", href: "/about" },
              { name: "Order Tracking", href: "/order-tracking" },
              { name: "FAQs", href: "/faqs" },
              { name: "Shipping Policy", href: "/shipping" },
              { name: "Returns & Exchanges", href: "/returns" },
              { name: "Contact Support", href: "/contact" }
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-[10px] font-bold uppercase tracking-widest text-[#8b6e5a] hover:text-[#c9956c] transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-8">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#2d1b10]">The Newsletter</h4>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#8b6e5a]">
            Exclusive access to our latest drops & private sales.
          </p>
          <NewsletterForm variant="footer" />
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-[#c9956c]/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8b6e5a]">
            © 2025 ZAGULL • FISALABAD
          </p>
          
          {/* Section 9B: Trust Badges in Footer */}
          <div className="flex items-center gap-4 bg-[#fdf6f0] px-4 py-2 rounded-full border border-[#c9956c]/5">
            <div className="flex items-center gap-1.5 grayscale opacity-70">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8b6e5a" strokeWidth="2.5">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>
              </svg>
              <span className="text-[9px] uppercase font-black text-[#8b6e5a]">COD Available</span>
            </div>
            <div className="w-px h-2 bg-[#c9956c]/20" />
            <div className="flex items-center gap-1.5 grayscale opacity-70">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8b6e5a" strokeWidth="2.5">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span className="text-[9px] uppercase font-black text-[#8b6e5a]">Secure Site</span>
            </div>
            <div className="w-px h-2 bg-[#c9956c]/20" />
            <div className="flex items-center gap-1.5 grayscale opacity-70">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8b6e5a" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="text-[9px] uppercase font-black text-[#8b6e5a]">PK-Wide Delivery</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#8b6e5a]/50 italic">
            Nature-Inspired Designs for the Modern Woman
          </span>
        </div>
      </div>
    </footer>
  );
}
