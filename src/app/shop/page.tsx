"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Input } from "@/components/ui/Input";
import { Search, SlidersHorizontal, ChevronDown, X, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { cn } from "@/lib/utils";

import { Suspense } from "react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSubCategory = searchParams.get("sub") || "All";
  const initialSearch = searchParams.get("q") || "";
  
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [activeCategory, setActiveCategory] = React.useState(initialCategory);
  const [activeSubCategory, setActiveSubCategory] = React.useState(initialSubCategory);
  const [searchQuery, setSearchQuery] = React.useState(initialSearch);
  const [sortBy, setSortBy] = React.useState("latest");
  const [showFilters, setShowFilters] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState([0, 20000]);

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

  // Update category if query param changes
  React.useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All");
    setActiveSubCategory(searchParams.get("sub") || "All");
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const categories = ["All", "Jewellery", "Clothing"];
  const subCategories = activeCategory === "Jewellery" 
    ? ["Pendants", "Rings", "Earrings", "Bracelets", "Necklaces", "Anklets"]
    : activeCategory === "Clothing"
    ? ["Dresses", "Tops", "Outerwear", "Scarves", "Skirts"]
    : [];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSubCategory = activeSubCategory === "All" || product.sub_category === activeSubCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSubCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary mb-8">
            <Link href="/" className="hover:text-accent-forest transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary">Shop</span>
            {activeCategory !== "All" && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-text-primary">{activeCategory}</span>
              </>
            )}
          </nav>

          {/* Header */}
          <div className="mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary">
              {activeCategory === "All" ? "Our Collection" : activeCategory}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-text-secondary font-sans">
                Showing <span className="font-bold text-text-primary">{filteredProducts.length}</span> results
              </p>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-border-light rounded-full px-6 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-forest/20 transition-all cursor-pointer shadow-sm"
                  >
                    <option value="latest">Latest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "rounded-full px-6 flex items-center gap-2",
                    showFilters && "bg-accent-forest text-white border-accent-forest"
                  )}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className={cn(
              "lg:w-64 space-y-10 transition-all duration-300",
              !showFilters && "hidden lg:block opacity-50 pointer-events-none lg:opacity-100 lg:pointer-events-auto"
            )}>
              {/* Category Search */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-primary">Search</h3>
                <div className="relative">
                  <Input 
                    placeholder="Search titles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                </div>
              </div>

              {/* Top Categories */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-primary">Collection</h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setActiveSubCategory("All"); }}
                      className={cn(
                        "text-left py-1 text-sm transition-all hover:translate-x-1",
                        activeCategory === cat ? "text-accent-forest font-bold" : "text-text-secondary"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub Categories */}
              {subCategories.length > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-left-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-text-primary">Sub Category</h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setActiveSubCategory("All")}
                      className={cn(
                        "text-left py-1 text-sm transition-all hover:translate-x-1",
                        activeSubCategory === "All" ? "text-accent-forest font-bold" : "text-text-secondary"
                      )}
                    >
                      All {activeCategory}
                    </button>
                    {subCategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setActiveSubCategory(sub)}
                        className={cn(
                          "text-left py-1 text-sm transition-all hover:translate-x-1",
                          activeSubCategory === sub ? "text-accent-forest font-bold" : "text-text-secondary"
                        )}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Filter */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-text-primary">Price Range</h3>
                <div className="space-y-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="20000" 
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-accent-forest"
                  />
                  <div className="flex justify-between text-xs font-bold text-text-secondary">
                    <span>Rs. 0</span>
                    <span>Rs. {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                fullWidth 
                className="text-xs uppercase tracking-tighter"
                onClick={() => {
                  setActiveCategory("All");
                  setActiveSubCategory("All");
                  setSearchQuery("");
                  setPriceRange([0, 20000]);
                }}
              >
                Clear All Filters
              </Button>
            </aside>

            {/* Product Grid */}
            <div className="flex-grow">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-accent-forest" />
                  <p className="text-text-secondary animate-pulse">Loading collection...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-700">
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
                <div className="text-center py-32 space-y-6 bg-white/50 rounded-3xl border border-dashed border-border-light">
                  <div className="w-20 h-20 bg-background-primary rounded-full flex items-center justify-center mx-auto">
                    <Search className="w-8 h-8 text-text-secondary opacity-20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-serif text-text-primary">No products found</p>
                    <p className="text-text-secondary max-w-xs mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                  </div>
                  <Button 
                    onClick={() => { setActiveCategory("All"); setActiveSubCategory("All"); setSearchQuery(""); setPriceRange([0, 20000]); }}
                    variant="outline"
                  >
                    Reset all filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background-primary">
        <Loader2 className="w-10 h-10 animate-spin text-accent-forest" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
