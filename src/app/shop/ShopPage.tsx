"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialCategory = searchParams.get("category") || "All";
  
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(initialCategory);
  const [sortBy, setSortBy] = React.useState("newest");

  // Fetch products from Supabase
  React.useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Sync category with URL
  React.useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const categories = ["All", "Jewellery", "Clothing", "Gift Baskets"];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    return matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "All") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    router.replace(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f0]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section 11A: Breadcrumb Integration */}
          <Breadcrumb 
            items={[{ label: "Shop" }]} 
            className="mb-8"
          />

          {/* Section 2: Shop Header & Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 border-y border-[#c9956c]/10 py-6">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all duration-300 border",
                    activeCategory === cat
                      ? "bg-[#c9956c] text-white border-[#c9956c] shadow-lg shadow-[#c9956c]/20"
                      : "bg-transparent text-[#8b6e5a] border-[#c9956c]/20 hover:border-[#c9956c] hover:text-[#c9956c]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort & Count */}
            <div className="flex items-center gap-6">
              <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-[#8b6e5a]">
                {filteredProducts.length} Items found
              </span>
              
              <div className="relative group">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-[#c9956c]/20 rounded-xl px-10 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[#2d1b10] focus:outline-none focus:ring-2 focus:ring-[#c9956c]/20 transition-all cursor-pointer min-w-[200px]"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b6e5a] pointer-events-none group-hover:text-[#c9956c] transition-colors" />
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="min-h-[400px]">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse space-y-6">
                    <div className="bg-[#c9956c]/5 rounded-2xl aspect-square w-full" />
                    <div className="space-y-3">
                      <div className="bg-[#c9956c]/5 h-4 w-2/3 rounded-full" />
                      <div className="bg-[#c9956c]/5 h-4 w-1/3 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image_url}
                    category={product.category}
                    isNew={product.is_new}
                    isOutOfStock={product.stock_status === 'out_of_stock'}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center text-center py-24 space-y-8 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl shadow-[#c9956c]/5 border border-[#c9956c]/10">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#c9956c]">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                
                <div className="space-y-3 max-w-sm">
                  <h2 className="text-3xl font-serif text-[#2d1b10]">New arrivals coming soon!</h2>
                  <p className="text-[#8b6e5a] text-sm leading-relaxed">
                    We&apos;re adding our latest collection. Check back shortly or follow us <Link href="https://instagram.com/zagull.pk" className="text-[#c9956c] font-bold">@zagull.pk</Link> for first looks.
                  </p>
                </div>

                <Link 
                  href="https://wa.me/923329024005" 
                  target="_blank"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#128C7E] transition-all duration-300 shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle className="w-5 h-5" />
                  Ask about availability
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { MessageCircle } from "lucide-react";

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf6f0] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#c9956c]" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6e5a]">Entering ZAGULL</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
