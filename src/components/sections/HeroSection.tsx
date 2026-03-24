import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center">
      {/* Background Image (Optimized Single Loader) - Section 10B */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_banner.png"
          alt="ZAGULL Elegant Jewellery & Fashion"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          className="object-center"
        />
        {/* Subtle Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 pt-20">
        <div className="max-w-2xl space-y-10">
          <div className="space-y-4">
            <h2 className="text-white text-sm tracking-[0.3em] font-medium animate-in fade-in slide-in-from-bottom-4 duration-700">
              NEW COLLECTION 2025
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              Elegant Jewellery <br /> & Fashion
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-sans max-w-lg leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1200 delay-500">
              Discover nature-inspired beauty for the modern woman. Sophisticated designs crafted with passion in Faisalabad.
            </p>
          </div>

          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-16 duration-1500 delay-700">
            <div className="flex flex-wrap gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-[#c9956c] hover:bg-white hover:text-[#c9956c] text-white transition-all border-none font-bold uppercase tracking-widest text-xs px-10">
                  Shop Now
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold uppercase tracking-widest text-xs px-10">
                  View Collection
                </Button>
              </Link>
            </div>

            {/* Trust Badges - Section 3D */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Secure Checkout</span>
              </div>
              <div className="hidden md:block w-px h-3 bg-white/20" />
              
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Verified Brand</span>
              </div>
              <div className="hidden md:block w-px h-3 bg-white/20" />

              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.3 7 12 12l8.7-5"/><path d="M12 22V12"/>
                </svg>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">COD Available</span>
              </div>
              <div className="hidden md:block w-px h-3 bg-white/20" />

              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">100+ Happy Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 animate-bounce opacity-50">
        <div className="w-[1px] h-12 bg-white" />
      </div>
    </section>
  );
}
