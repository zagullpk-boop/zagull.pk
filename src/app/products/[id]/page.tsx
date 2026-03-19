"use client";

import * as React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Star, ChevronLeft, Check, Loader2, MessageSquare, Plus, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [product, setProduct] = React.useState<any>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [isAdded, setIsAdded] = React.useState(false);
  const [selectedVariants, setSelectedVariants] = React.useState<Record<string, string>>({});

  const isWishlisted = product ? isInWishlist(product.id) : false;

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch main product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (productError) throw productError;
        setProduct(productData);

        // Fetch related products (same category, excluding current)
        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .neq('id', id)
          .limit(4);
        
        setRelatedProducts(relatedData || []);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background-primary gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-accent-forest" />
        <p className="text-text-secondary animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-primary">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif text-text-primary">Product Not Found</h1>
          <Button onClick={() => router.push("/shop")}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image_url, 
        category: product.category, 
        isNew: product.is_new 
      });
    }
  };

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: option }));
  };

  // Sample variants for demonstration
  const variants = [
    { name: "Material", options: ["Gold Plated", "Sterling Silver", "Rose Gold"] },
    { name: "Size", options: ["Standard", "Large", "Small"] },
  ];

  // Mock Reviews
  const mockReviews = [
    { id: 1, user: "Sarah K.", rating: 5, date: "2 days ago", comment: "Absolutely stunning! The emerald detail is even more beautiful in person. The packaging was also very premium." },
    { id: 2, user: "Ahmed R.", rating: 4, date: "1 week ago", comment: "Very good quality. My wife loved it. Delivery was fast too." },
    { id: 3, user: "Elena M.", rating: 5, date: "2 weeks ago", comment: "Perfect gift. The silver is very high quality and doesn't tarnish easily." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-text-secondary mb-8">
            <button onClick={() => router.push("/shop")} className="hover:text-accent-forest transition-colors">Shop</button>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-text-primary">{product.category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
            {/* Gallery Section */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border-light bg-background-primary shadow-sm group">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[product.image_url, product.image_url, product.image_url, product.image_url].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                      selectedImage === i ? "border-accent-forest" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt={`${product.name} view ${i}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-sm text-accent-forest font-semibold uppercase tracking-widest bg-accent-forest/5 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-serif text-text-primary pt-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4 fill-current", i >= 4 && "text-gray-300")} />
                    ))}
                    <span className="text-sm font-medium text-text-primary ml-2">4.8</span>
                  </div>
                  <span className="text-sm text-text-secondary">({product.reviews_count || 12} reviews)</span>
                </div>
              </div>

              <div className="text-3xl font-medium text-text-primary">
                Rs. {product.price.toLocaleString()}
              </div>

              <p className="text-text-secondary leading-relaxed font-sans text-lg">
                {product.description}
              </p>

              {/* Variants */}
              <div className="space-y-6 pt-4">
                {variants.map((variant) => (
                  <div key={variant.name} className="space-y-3">
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                      Select {variant.name}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {variant.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleVariantSelect(variant.name, option)}
                          className={cn(
                            "px-6 py-2 rounded-full border text-sm font-medium transition-all",
                            selectedVariants[variant.name] === option
                              ? "border-accent-forest bg-accent-forest text-white shadow-md scale-105"
                              : "border-border-light hover:border-accent-forest"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-6 pt-8">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center border border-border-light rounded-xl overflow-hidden bg-background-primary h-14 shadow-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-5 hover:bg-white transition-colors text-text-primary text-xl"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-base font-bold text-text-primary">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-5 hover:bg-white transition-colors text-text-primary text-xl"
                    >
                      +
                    </button>
                  </div>
                  <Button 
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-grow h-14 text-lg rounded-xl transition-all shadow-lg active:scale-95",
                      isAdded && "bg-green-600 hover:bg-green-700"
                    )}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5 mr-3" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5 mr-3" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleWishlistToggle} 
                  className={cn(
                    "w-full h-14 text-lg rounded-xl transition-all",
                    isWishlisted && "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                  )}
                >
                  <Heart className={cn("w-5 h-5 mr-3", isWishlisted && "fill-red-500 text-red-500")} />
                  {isWishlisted ? "In Wishlist" : "Save to Wishlist"}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border-light">
                <div className="flex items-center space-x-3 text-text-secondary">
                  <div className="w-10 h-10 rounded-full bg-accent-forest/10 flex items-center justify-center text-accent-forest">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Fast</span>
                    <span className="text-xs font-medium">Free Delivery</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <div className="w-10 h-10 rounded-full bg-accent-forest/10 flex items-center justify-center text-accent-forest">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Secure</span>
                    <span className="text-xs font-medium">7 Days Return</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <div className="w-10 h-10 rounded-full bg-accent-forest/10 flex items-center justify-center text-accent-forest">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Genuine</span>
                    <span className="text-xs font-medium">Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs / Reviews Section */}
          <section className="py-24 border-t border-border-light">
            <div className="flex flex-col md:flex-row gap-16">
              <div className="md:w-1/3 space-y-6">
                <h2 className="text-3xl font-serif text-text-primary">Customer Reviews</h2>
                <div className="p-8 bg-background-primary rounded-3xl space-y-4">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-serif text-text-primary">4.8</span>
                    <span className="text-text-secondary mb-1">/ 5.0</span>
                  </div>
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-sm text-text-secondary">Based on {product.reviews_count || 12} reviews</p>
                  <Button fullWidth className="mt-4">Write a Review</Button>
                </div>
              </div>
              
              <div className="md:w-2/3 space-y-10">
                {mockReviews.map((review) => (
                  <div key={review.id} className="space-y-4 pb-10 border-b border-border-light last:border-0">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex text-yellow-500 mb-1">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                        </div>
                        <h4 className="font-bold text-text-primary">{review.user}</h4>
                      </div>
                      <span className="text-xs text-text-secondary font-medium">{review.date}</span>
                    </div>
                    <p className="text-text-secondary leading-relaxed">{review.comment}</p>
                    <div className="flex gap-2">
                      <button className="text-[10px] uppercase font-bold tracking-widest text-accent-forest hover:underline">Helpful</button>
                      <button className="text-[10px] uppercase font-bold tracking-widest text-text-secondary hover:underline">Report</button>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 text-sm font-bold uppercase tracking-widest text-text-secondary hover:text-accent-forest transition-colors border-t border-dashed border-border-light">
                  Load More Reviews
                </button>
              </div>
            </div>
          </section>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <section className="py-24 border-t border-border-light">
              <div className="flex justify-between items-end mb-12">
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif text-text-primary">You May Also Like</h2>
                  <p className="text-text-secondary">Complete your look with these carefully curated pieces.</p>
                </div>
                <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-accent-forest hover:translate-x-1 transition-all">
                  View Collection <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image_url}
                    category={p.category}
                    isNew={p.is_new}
                  />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

