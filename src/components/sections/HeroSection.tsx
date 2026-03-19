import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden flex items-center">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Mobile Background */}
        <div className="relative w-full h-full md:hidden">
          <Image
            src="/images/hero_banner.png"
            alt="ZAGULL Elegant Jewellery & Fashion"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        
        {/* Desktop Background */}
        <div className="relative w-full h-full hidden md:block">
          <Image
            src="/images/hero_banner_desktop_ultra_4k.png"
            alt="ZAGULL Elegant Jewellery & Fashion - Desktop"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
            unoptimized={true}
          />
        </div>

        {/* Subtle Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/15 md:bg-black/10" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 pt-20">
        <div className="max-w-2xl space-y-8">
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

          <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1500 delay-700">
            <Link href="/shop">
              <Button size="lg" className="bg-white text-accent-forest hover:bg-background-primary transition-all border-none">
                Shop Now
              </Button>
            </Link>
            <Link href="/shop?filter=new">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 animate-bounce opacity-70">
        <div className="w-[1px] h-12 bg-white/50" />
      </div>
    </section>
  );
}
