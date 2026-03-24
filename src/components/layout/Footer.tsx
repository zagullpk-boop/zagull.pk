"use client";

import * as React from "react";
import Link from "next/link";
import { 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";
import { TikTokIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { 
  ZAGULL_PHONE, 
  ZAGULL_WHATSAPP, 
  ZAGULL_EMAIL, 
  ZAGULL_INSTAGRAM, 
  ZAGULL_TIKTOK,
  ZAGULL_ADDRESS
} from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import { NewsletterForm } from "@/components/sections/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border-light pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Column 1: About */}
        <div className="space-y-6">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-serif tracking-tight text-text-primary">
              ZAGULL
            </span>
          </Link>
          <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
            Crafting nature-inspired elegance for the modern woman. From Faisalabad to your doorstep, we bring you the finest in artificial jewellery and contemporary clothing.
          </p>
          <div className="flex space-x-4">
            <Link href={ZAGULL_INSTAGRAM} target="_blank" className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center text-text-primary hover:bg-accent-forest hover:text-white hover:border-accent-forest transition-all" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href={ZAGULL_WHATSAPP} target="_blank" className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center text-text-primary hover:bg-accent-forest hover:text-white hover:border-accent-forest transition-all" aria-label="WhatsApp">
              <WhatsAppIcon size={20} />
            </Link>
            <Link href={ZAGULL_TIKTOK} target="_blank" className="w-10 h-10 rounded-full border border-border-light flex items-center justify-center text-text-primary hover:bg-accent-forest hover:text-white hover:border-accent-forest transition-all" aria-label="TikTok">
              <TikTokIcon size={20} />
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif text-lg text-text-primary mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {[
              { name: "Home", href: "/" },
              { name: "Shop All", href: "/shop" },
              { name: "About Us", href: "/about" },
              { name: "Contact Us", href: "/contact" },
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms & Conditions", href: "/terms" }
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-forest transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div>
          <h4 className="font-serif text-lg text-text-primary mb-6">Customer Service</h4>
          <ul className="space-y-4">
            {[
              { name: "FAQs", href: "/faqs" },
              { name: "Shipping Information", href: "/shipping" },
              { name: "Returns & Exchanges", href: "/returns" },
              { name: "Size Guide", href: "/size-guide" },
              { name: "Order Tracking", href: "/order-tracking" }
            ].map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-forest transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-6">
          <h4 className="font-serif text-lg text-text-primary">Stay Updated</h4>
          <p className="text-sm text-text-secondary">
            Join our newsletter for exclusive offers and style inspiration.
          </p>
          <div className="space-y-3">
            <NewsletterForm variant="footer" />
          </div>
          <div className="pt-4 space-y-3">
            <div className="flex items-center space-x-3 text-text-secondary">
              <Phone className="w-4 h-4" />
              <a href={ZAGULL_WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-accent-forest transition-colors">{ZAGULL_PHONE}</a>
            </div>
            <div className="flex items-center space-x-3 text-text-secondary">
              <Mail className="w-4 h-4" />
              <a href={`mailto:${ZAGULL_EMAIL}`} className="text-xs hover:text-accent-forest transition-colors">{ZAGULL_EMAIL}</a>
            </div>
            <div className="flex items-center space-x-3 text-text-secondary">
              <MapPin className="w-4 h-4" />
              <span className="text-xs">{ZAGULL_ADDRESS}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-border-light pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-xs text-text-secondary">
          Copyright © 2025 ZAGULL. All rights reserved.
        </p>
        <div className="flex space-x-6 text-xs text-text-secondary">
          <span>Designed with nature in mind</span>
          <div className="flex space-x-2">
            {/* Payment Icons Placeholder */}
            <div className="w-8 h-5 bg-background-primary rounded" />
            <div className="w-8 h-5 bg-background-primary rounded" />
            <div className="w-8 h-5 bg-background-primary rounded" />
          </div>
        </div>
      </div>
    </footer>
  );
}
