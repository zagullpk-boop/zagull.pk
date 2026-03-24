"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { ZAGULL_WHATSAPP } from "@/lib/constants";

interface WhatsAppButtonProps {
  className?: string;
}

export function WhatsAppButton({ className }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <a
      href={ZAGULL_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 group animate-in fade-in slide-in-from-bottom-5",
        !isVisible && "opacity-0 pointer-events-none translate-y-10",
        className
      )}
    >
      <div className="relative">
        <WhatsAppIcon size={24} className="fill-current" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#25D366] animate-pulse" />
      </div>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] uppercase tracking-widest font-bold opacity-80 mb-1">Chat with us</span>
        <span className="text-sm font-bold">WhatsApp</span>
      </div>
      
      {/* Ripple Effect */}
      <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
