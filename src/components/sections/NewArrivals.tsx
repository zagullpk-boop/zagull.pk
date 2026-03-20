"use client";

import * as React from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export function NewArrivals() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    
    async function fetchNewArrivals() {
      // Set a safety timeout for 5 seconds
      const timeoutId = setTimeout(() => {
        if (loading && isMounted) {
          setLoading(false);
          setError("Request timed out. Please refresh.");
        }
      }, 5000);

      try {
        const { data, error: supabaseError } = await supabase
          .from('products')
          .select('*')
          .eq('is_new', true)
          .limit(4);
        
        clearTimeout(timeoutId);
        if (!isMounted) return;

        if (supabaseError) throw supabaseError;
        setProducts(data || []);
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching new arrivals:", err);
          setError("Failed to load products.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchNewArrivals();

    return () => { isMounted = false; };
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-sm tracking-[0.2em] text-accent-forest font-medium uppercase">
            Fresh From the Studio
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-text-primary">
            New Arrivals
          </h3>
          <p className="text-text-secondary max-w-xl mx-auto font-sans">
            Explore our latest nature-inspired creations, designed to add a touch of timeless elegance to your everyday look.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-8 h-8 animate-spin text-accent-forest opacity-20" />
            <p className="text-xs text-text-secondary animate-pulse uppercase tracking-widest font-bold">Discovering treasures...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
            <p className="text-sm text-text-secondary italic">{error}</p>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
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
          <div className="text-center py-20 border border-dashed border-border-light rounded-3xl">
            <p className="text-text-secondary font-sans italic">Our latest collection is arriving soon.</p>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/shop?category=All">
            <Button variant="outline" size="lg" className="px-12">
              View All Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
