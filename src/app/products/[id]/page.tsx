"use client";

import * as React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Star, ChevronLeft, Check, Loader2, MessageCircle, ChevronRight, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [product, setProduct] = React.useState<any>(null);
  const [relatedProducts, setRelatedProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);
  const [isAdded, setIsAdded] = React.useState(false);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  // Fetch Data
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();
        
        if (productError) throw productError;
        setProduct(productData);

        const { data: relatedData } = await supabase
          .from('products')
          .select('*')
          .eq('category', productData.category)
          .neq('id', id)
          .limit(4);
        
        setRelatedProducts(relatedData || []);

        // Wishlist logic
        const wishlist = JSON.parse(localStorage.getItem("zagull_wishlist") || "[]");
        setIsWishlisted(wishlist.includes(id));

      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("zagull_wishlist") || "[]");
    let newWishlist;
    if (wishlist.includes(id)) {
      newWishlist = wishlist.filter((item: string) => item !== id);
      setIsWishlisted(false);
    } else {
      newWishlist = [...wishlist, id as string];
      setIsWishlisted(true);
    }
    localStorage.setItem("zagull_wishlist", JSON.stringify(newWishlist));
  };

  const handleAddToCart = () => {
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      image: product.image_url, 
      category: product.category 
    }, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf6f0] space-y-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#c9956c]" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b6e5a]">Revealing ZAGULL Elegance</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf6f0]">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-serif text-[#2d1b10]">Product Not Found</h1>
          <Button onClick={() => router.push("/shop")} className="bg-[#c9956c] text-white">Back to Shop</Button>
        </div>
      </div>
    );
  }

  const whatsappInquiryUrl = `https://wa.me/923329024005?text=${encodeURIComponent(`Assalam o Alaikum ZAGULL, I'm interested in the "${product.name}" (PKR ${product.price.toLocaleString()}). Is it available?`)}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f0]">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section 11A: Breadcrumb Integration */}
          <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6e5a] mb-12">
            <Link href="/" className="hover:text-[#c9956c] transition-colors">Home</Link>
            <span className="opacity-50">›</span>
            <Link href="/shop" className="hover:text-[#c9956c] transition-colors">Shop</Link>
            <span className="opacity-50">›</span>
            <span className="text-[#2d1b10]">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Gallery Section - Section 10B */}
            <div className="lg:w-3/5 space-y-6">
              <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-white border border-[#c9956c]/10 shadow-2xl shadow-[#c9956c]/5 group">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  priority
                />
                
                {/* Wishlist Toggle */}
                <button 
                  onClick={toggleWishlist}
                  className="absolute top-8 right-8 z-10 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xl border border-[#c9956c]/10 transition-all duration-300 hover:scale-110"
                >
                  <Heart className={cn("w-5 h-5 transition-colors", isWishlisted ? "fill-red-500 text-red-500" : "text-[#8b6e5a]")} />
                </button>

                {/* Badges */}
                <div className="absolute top-8 left-8 flex flex-col gap-3">
                  {product.is_new && (
                    <span className="bg-[#c9956c] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-lg shadow-[#c9956c]/20">New Arrival</span>
                  )}
                  {product.stock_status === 'out_of_stock' && (
                    <span className="bg-[#2d1b10] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-lg shadow-black/20">Sold Out</span>
                  )}
                </div>
              </div>
            </div>

            {/* Info Section - Sticky on Desktop - Section 10A */}
            <div className="lg:w-2/5 lg:sticky lg:top-32 lg:h-fit space-y-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9956c] bg-[#c9956c]/5 px-4 py-1.5 rounded-full border border-[#c9956c]/10">
                    {product.category}
                  </span>
                  <button className="text-[#8b6e5a] hover:text-[#c9956c] transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-[#2d1b10] leading-tight capitalize">
                  {product.name}
                </h1>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1 text-[#c9956c]">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    <span className="text-xs font-black ml-2 text-[#2d1b10]">4.9</span>
                  </div>
                  <span className="w-px h-3 bg-[#c9956c]/20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#8b6e5a] underline decoration-[#c9956c]/30 underline-offset-4">12 Verified Reviews</span>
                </div>
              </div>

              <div className="text-4xl font-serif text-[#c9956c]">
                PKR {product.price.toLocaleString()}
              </div>

              <p className="text-[#8b6e5a] text-base leading-relaxed font-sans font-medium">
                {product.description || "A masterfully crafted piece inspired by the natural beauty and elegance of Pakistan. Each detail is thoughtfully designed to celebrate the modern woman."}
              </p>

              {/* Quantity & Cart Actions - Section 10C */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white border border-[#c9956c]/10 rounded-2xl overflow-hidden h-14 shadow-sm">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 hover:bg-[#fdf6f0] transition-colors text-[#2d1b10] font-black text-xl">-</button>
                    <span className="w-12 text-center text-sm font-black text-[#c9956c]">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-6 hover:bg-[#fdf6f0] transition-colors text-[#2d1b10] font-black text-xl">+</button>
                  </div>
                  
                  <Button 
                    onClick={handleAddToCart}
                    disabled={product.stock_status === 'out_of_stock'}
                    className={cn(
                      "flex-grow h-14 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl active:scale-95",
                      isAdded 
                        ? "bg-[#25D366] text-white shadow-[#25D366]/20" 
                        : "bg-[#c9956c] text-white hover:bg-[#2d1b10] shadow-[#c9956c]/20"
                    )}
                  >
                    {isAdded ? (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* WhatsApp Inquire Button - Section 10C */}
                <Link 
                  href={whatsappInquiryUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-3 w-full h-14 rounded-2xl bg-white border border-[#25D366]/20 text-[#25D366] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#25D366]/5 transition-all duration-300 shadow-lg shadow-[#25D366]/5"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Inquire on WhatsApp</span>
                </Link>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#c9956c]/10">
                <div className="flex flex-col items-center text-center space-y-2 group">
                  <Truck className="w-5 h-5 text-[#c9956c] group-hover:translate-x-1 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#2d1b10]">Fast Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 group">
                  <RotateCcw className="w-5 h-5 text-[#c9956c] group-hover:rotate-12 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#2d1b10]">Easy Returns</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-2 group">
                  <ShieldCheck className="w-5 h-5 text-[#c9956c] group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#2d1b10]">Secure COD</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section - Section 10D */}
          {relatedProducts.length > 0 && (
            <section className="py-32 border-t border-[#c9956c]/10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9956c]">Curated for You</p>
                  <h2 className="text-4xl md:text-5xl font-serif text-[#2d1b10]">You May Also Like</h2>
                </div>
                <Link href="/shop" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#c9956c] hover:text-[#2d1b10] transition-all">
                  <span>Explore More</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {relatedProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image_url}
                    category={p.category}
                    isNew={p.is_new}
                    isOutOfStock={p.stock_status === 'out_of_stock'}
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
