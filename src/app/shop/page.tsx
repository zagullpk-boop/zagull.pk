"use client";

import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Input } from "@/components/ui/Input";
import { Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import productsData from "@/data/products.json";

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("q") || "";
  
  const [activeCategory, setActiveCategory] = React.useState(initialCategory);
  const [activeSubCategory, setActiveSubCategory] = React.useState(searchParams.get("sub") || "All");
  const [searchQuery, setSearchQuery] = React.useState(initialSearch);
  const [sortBy, setSortBy] = React.useState("latest");

  // Update category if query param changes
  React.useEffect(() => {
    setActiveCategory(searchParams.get("category") || "All");
    setActiveSubCategory(searchParams.get("sub") || "All");
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const categories = ["All", "Jewellery", "Clothing"];

  const filteredProducts = productsData.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSubCategory = activeSubCategory === "All" || product.subCategory === activeSubCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNewFilter = searchParams.get("filter") === "new" ? product.isNew : true;
    return matchesCategory && matchesSubCategory && matchesSearch && matchesNewFilter;
  });

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary">Our Collection</h1>
            <p className="text-text-secondary max-w-xl mx-auto font-sans">
              Discover the perfect blend of nature-inspired beauty and contemporary fashion.
            </p>
          </div>

          {/* Filters & Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Category Tabs */}
            <div className="flex bg-white rounded-full p-1 border border-border-light shadow-sm overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-accent-forest text-white shadow-md"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 bg-white"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              </div>
              <button className="h-11 px-4 bg-white rounded-lg border border-border-light flex items-center gap-2 hover:bg-background-primary transition-all text-sm font-medium">
                <SlidersHorizontal className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="mb-8 flex items-center gap-2">
            {activeSubCategory !== "All" && (
              <div className="flex items-center gap-2 bg-accent-forest/10 text-accent-forest px-4 py-1 rounded-full text-xs font-medium">
                Collection: {activeSubCategory}
                <button onClick={() => setActiveSubCategory("All")} className="hover:text-text-primary transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                  isNew={product.isNew}
                  isOutOfStock={!product.inStock}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 space-y-4 bg-white/40 rounded-2xl border border-dashed border-border-light">
              <p className="text-2xl font-serif text-text-primary">No products found</p>
              <p className="text-text-secondary font-sans">Try adjusting your search or category filters.</p>
              <button 
                onClick={() => { setActiveCategory("All"); setActiveSubCategory("All"); setSearchQuery(""); }}
                className="text-accent-forest font-medium underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
