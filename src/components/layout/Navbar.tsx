"use client";

import * as React from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Instagram, MessageCircle, ChevronRight, Facebook, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "Jewellery",
    href: "/shop?category=Jewellery",
    dropdown: ["Pendants", "Rings", "Bracelets", "Earrings", "Anklets"],
  },
  {
    name: "Clothing",
    href: "/shop?category=Clothing",
    dropdown: ["Scarves", "Tops", "Skirts"],
  },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const [activeAccordion, setActiveAccordion] = React.useState<string | null>(null);
  
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/90 backdrop-blur-xl py-3 shadow-xl shadow-[#c9956c]/5 border-b border-[#c9956c]/10"
          : "bg-transparent py-6"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Mobile Menu Trigger */}
        <button 
          className="md:hidden w-10 h-10 flex items-center justify-start text-[#2d1b10]"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-7 h-7" />
        </button>

        {/* Logo */}
        <Link href="/" className="group absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
          <span className="text-3xl md:text-4xl font-serif tracking-tight text-[#2d1b10] group-hover:text-[#c9956c] transition-colors duration-500">
            ZAGULL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <div key={item.name} className="relative group/nav">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-1.5 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                  pathname === item.href || (item.dropdown && pathname === "/shop")
                    ? "text-[#c9956c]"
                    : "text-[#2d1b10] hover:text-[#c9956c]"
                )}
              >
                <span>{item.name}</span>
                {item.dropdown && <ChevronDown className="w-3 h-3 opacity-50 group-hover/nav:rotate-180 transition-transform duration-500" />}
              </Link>
              
              {item.dropdown && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible transition-all duration-500">
                  <div className="bg-white border border-[#c9956c]/10 shadow-2xl rounded-3xl overflow-hidden min-w-[220px] p-2 backdrop-blur-xl">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub}
                        href={`${item.href}&sub=${sub}`}
                        className="flex items-center justify-between px-6 py-3.5 text-[10px] font-bold uppercase tracking-widest text-[#8b6e5a] hover:bg-[#fdf6f0] hover:text-[#c9956c] rounded-2xl transition-all group/sub"
                      >
                        {sub}
                        <ChevronRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-2 md:space-x-6">
          <button 
            className="w-10 h-10 flex items-center justify-center text-[#2d1b10] hover:text-[#c9956c] transition-colors"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          
          <Link href="/wishlist" className="relative w-10 h-10 flex items-center justify-center text-[#2d1b10] hover:text-[#c9956c] transition-colors">
            <Heart className={cn("w-5 h-5 md:w-6 md:h-6", wishlistCount > 0 && "fill-[#c9956c] text-[#c9956c]")} />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#c9956c] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-lg shadow-[#c9956c]/20 border border-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link href="/cart" className="relative w-10 h-10 flex items-center justify-center text-[#2d1b10] hover:text-[#c9956c] transition-colors">
            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 bg-[#2d1b10] text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold border border-white shadow-lg">
                {totalItems}
              </span>
            )}
          </Link>

          <Link href="/admin/login" className="hidden lg:flex w-10 h-10 items-center justify-center text-[#2d1b10] hover:text-[#c9956c] transition-colors opacity-20 hover:opacity-100">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </nav>

      {/* Section 9: Premium Mobile Drawer */}
      <div 
        className={cn(
          "fixed inset-0 z-[100] transition-all duration-700 md:hidden",
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-700",
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Drawer Content */}
        <div 
          className={cn(
            "absolute top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-[#fdf6f0] shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col pt-32 pb-12 px-8",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Close Button */}
          <button 
            className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg border border-[#c9956c]/10 text-[#2d1b10]"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Mobile Nav Links */}
          <div className="flex-grow space-y-8 overflow-y-auto pr-4 scrollbar-hide">
            {navItems.map((item) => (
              <div key={item.name} className="space-y-4">
                <div className="flex items-center justify-between group">
                  <Link
                    href={item.href}
                    className="text-4xl font-serif text-[#2d1b10] hover:text-[#c9956c] transition-colors"
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <button 
                      onClick={() => setActiveAccordion(activeAccordion === item.name ? null : item.name)}
                      className={cn(
                        "w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-[#c9956c]/10 transition-transform duration-500",
                        activeAccordion === item.name ? "rotate-180" : ""
                      )}
                    >
                      <ChevronDown className="w-5 h-5 text-[#8b6e5a]" />
                    </button>
                  )}
                </div>

                {item.dropdown && (
                  <div className={cn(
                    "grid grid-cols-1 gap-3 overflow-hidden transition-all duration-500",
                    activeAccordion === item.name ? "max-h-[300px] opacity-100 py-2" : "max-h-0 opacity-0"
                  )}>
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub}
                        href={`${item.href}&sub=${sub}`}
                        className="text-xs font-bold uppercase tracking-widest text-[#8b6e5a] hover:text-[#c9956c] pl-4 py-1"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-8">
              <Link href="/shop" className="inline-block w-full bg-[#2d1b10] text-white py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.3em] text-center shadow-2xl shadow-black/20 transform active:scale-95 transition-all">
                Shop the Collection
              </Link>
            </div>
          </div>

          {/* Social Footer */}
          <div className="pt-12 border-t border-[#c9956c]/10 space-y-8">
            <div className="flex items-center justify-between">
              <Link href="https://instagram.com/zagull.pk" target="_blank" className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-[#c9956c]/10 text-[#8b6e5a] hover:text-[#c9956c] transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="https://wa.me/923329024005" target="_blank" className="w-12 h-12 rounded-2xl bg-[#25D366] flex items-center justify-center shadow-lg text-white hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </Link>
              <Link href="https://tiktok.com/@zagull.pk" target="_blank" className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-[#c9956c]/10 text-[#8b6e5a] hover:text-[#c9956c] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                   <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14z"/>
                </svg>
              </Link>
              <Link href="https://facebook.com/zagull.pk" target="_blank" className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg border border-[#c9956c]/10 text-[#8b6e5a] hover:text-[#c9956c] transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="flex justify-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-[#8b6e5a]/40">
              <Link href="/shipping">Shipping</Link>
              <span>•</span>
              <Link href="/faqs">FAQs</Link>
              <span>•</span>
              <p>© 2024 ZAGULL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[110] bg-[#2d1b10]/60 backdrop-blur-md flex items-start justify-center pt-32 px-6 animate-in fade-in duration-500"
          onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(201,149,108,0.2)] overflow-hidden border border-[#c9956c]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-6 p-8">
              <Search className="w-7 h-7 text-[#c9956c] flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search the collection..."
                className="flex-grow text-2xl font-serif text-[#2d1b10] placeholder:text-[#8b6e5a]/30 focus:outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="w-12 h-12 rounded-2xl bg-[#fdf6f0] flex items-center justify-center text-[#8b6e5a] hover:text-[#c9956c] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </form>
            
            {searchQuery.length === 0 && (
              <div className="px-12 pb-12 border-t border-[#fdf6f0]">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9956c] pt-8 mb-6">Popular In Faisalabad</p>
                <div className="flex flex-wrap gap-3">
                  {["Earrings", "Gold Pendants", "Girls Tops", "Bracelets", "Gift Baskets"].map((term) => (
                    <button
                      key={term}
                      onClick={() => { setSearchQuery(term); }}
                      className="text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full bg-[#fdf6f0] border border-[#c9956c]/10 text-[#8b6e5a] hover:border-[#c9956c] hover:text-[#c9956c] transition-all"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
