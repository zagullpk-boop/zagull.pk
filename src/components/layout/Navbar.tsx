"use client";

import * as React from "react";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown, Facebook, Instagram, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

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

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [mounted, setMounted] = React.useState(false);
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 bg-transparent py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="group">
            <span className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary group-hover:text-accent-forest transition-colors">
              ZAGULL
            </span>
          </Link>
        </nav>
      </header>
    );
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
        isScrolled
          ? "bg-white/80 backdrop-blur-md py-4 shadow-sm border-b border-border-light"
          : "bg-transparent py-6"
      )}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span className="text-3xl md:text-4xl font-serif tracking-tight text-text-primary group-hover:text-accent-forest transition-colors">
            ZAGULL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div key={item.name} className="relative group/nav">
              <Link
                href={item.href}
                className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-accent-forest transition-colors"
              >
                <span>{item.name}</span>
                {item.dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>
              
              {item.dropdown && (
                <div className="absolute top-full left-0 pt-4 hidden group-hover/nav:block">
                  <div className="bg-white border border-border-light shadow-lg rounded-xl overflow-hidden min-w-[180px]">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub}
                        href={`${item.href}&sub=${sub}`}
                        className="block px-6 py-3 text-sm text-text-secondary hover:bg-background-primary hover:text-accent-forest transition-all"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button 
            className="text-text-primary hover:text-accent-forest transition-colors"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </button>
          <Link href="/account" className="text-text-primary hover:text-accent-forest transition-colors hidden sm:block">
            <User className="w-5 h-5" />
          </Link>
          <Link href="/wishlist" className="relative text-text-primary hover:text-accent-forest transition-colors">
            <Heart className="w-5 h-5" />
            {mounted && wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in duration-300">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative text-text-primary hover:text-accent-forest transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-forest text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white z-40 p-6 animate-in slide-in-from-right duration-300">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <div key={item.name} className="space-y-4">
                <Link
                  href={item.href}
                  className="text-2xl font-serif text-text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="grid grid-cols-2 gap-4 pl-4">
                    {item.dropdown.map((sub) => (
                      <Link
                        key={sub}
                        href={`${item.href}&sub=${sub}`}
                        className="text-sm text-text-secondary"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-8 border-t border-border-light flex items-center justify-center space-x-10">
              <Link href="https://facebook.com/zagull.pk" target="_blank" className="text-text-secondary hover:text-accent-forest transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="https://instagram.com/zagull.pk" target="_blank" className="text-text-secondary hover:text-accent-forest transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="https://wa.me/923329024005" target="_blank" className="text-text-secondary hover:text-accent-forest transition-colors">
                <MessageCircle className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-32 px-6"
          onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex items-center gap-4 p-6">
              <Search className="w-5 h-5 text-text-secondary flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, categories..."
                className="flex-grow text-lg text-text-primary placeholder:text-text-secondary/50 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-accent-forest text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-accent-forest/90 transition-colors"
              >
                Search
              </button>
            </form>
            {searchQuery.length === 0 && (
              <div className="px-6 pb-6 border-t border-border-light">
                <p className="text-xs text-text-secondary font-bold uppercase tracking-widest pt-4 mb-3">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Earrings", "Rings", "Pendants", "Bracelets", "Scarves"].map((term) => (
                    <button
                      key={term}
                      onClick={() => { setSearchQuery(term); }}
                      className="text-xs px-4 py-1.5 rounded-full bg-background-primary border border-border-light text-text-secondary hover:border-accent-forest hover:text-accent-forest transition-all"
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
