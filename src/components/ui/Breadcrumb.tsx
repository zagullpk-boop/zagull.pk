"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#8b6e5a]", className)}
    >
      <Link 
        href="/" 
        className="flex items-center hover:text-[#c9956c] transition-colors duration-300"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3 h-3 opacity-30 shrink-0" />
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-[#c9956c] transition-colors duration-300 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#2d1b10] truncate max-w-[150px] md:max-w-none">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

import * as React from "react";
