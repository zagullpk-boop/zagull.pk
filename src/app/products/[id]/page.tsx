"use client";

import * as React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Star, ChevronLeft, Check } from "lucide-react";
import productsData from "@/data/products.json";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedImage, setSelectedImage] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);
  const [isAdded, setIsAdded] = React.useState(false);
  const [selectedVariants, setSelectedVariants] = React.useState<Record<string, string>>({});

  const product = productsData.find((p) => p.id === id);
  const isWishlisted = product ? isInWishlist(product.id) : false;

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
      addToWishlist({ id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, isNew: product.isNew });
    }
  };

  const handleVariantSelect = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: option }));
  };

  // Sample variants for demonstration (to be replaced by DB data later)
  const variants = [
    { name: "Material", options: ["Gold Plated", "Sterling Silver"] },
    { name: "Gemstone", options: ["Emerald", "No Stone"] },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-text-secondary hover:text-accent-forest transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Collection</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Gallery Section */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-border-light bg-background-primary">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[product.image, "/images/jewellery_cat.png", "/images/clothing_cat.png", product.image].map((img, i) => (
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
                <span className="text-sm text-accent-forest font-semibold uppercase tracking-widest">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-serif text-text-primary">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 pt-2">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4 fill-current", i >= Math.floor(product.rating) && "text-gray-300")} />
                    ))}
                    <span className="text-sm font-medium text-text-primary ml-2">{product.rating}</span>
                  </div>
                  <span className="text-sm text-text-secondary">({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="text-3xl font-medium text-text-primary">
                Rs. {product.price.toLocaleString()}
              </div>

              <p className="text-text-secondary leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Variants */}
              {variants.map((variant) => (
                <div key={variant.name} className="space-y-3">
                  <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider">
                    Select {variant.name}
                    {selectedVariants[variant.name] && (
                      <span className="ml-2 font-normal text-accent-forest normal-case tracking-normal">
                        — {selectedVariants[variant.name]}
                      </span>
                    )}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {variant.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleVariantSelect(variant.name, option)}
                        className={cn(
                          "px-6 py-2 rounded-full border text-sm font-medium transition-all",
                          selectedVariants[variant.name] === option
                            ? "border-accent-forest bg-accent-forest text-white shadow-md"
                            : "border-border-light hover:border-accent-forest"
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity & Actions */}
              <div className="space-y-6 pt-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center border border-border-light rounded-lg overflow-hidden bg-background-primary h-12">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 hover:bg-white transition-colors text-text-primary"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-text-primary">
                      {quantity}
                    </span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 hover:bg-white transition-colors text-text-primary"
                    >
                      +
                    </button>
                  </div>
                  <Button 
                    onClick={handleAddToCart}
                    className={cn(
                      "flex-grow h-12 text-lg transition-all",
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
                <Button variant="outline" onClick={handleWishlistToggle} className={cn(
                  "w-full h-12 text-lg transition-all",
                  isWishlisted && "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                )}>
                  <Heart className={cn("w-5 h-5 mr-3", isWishlisted && "fill-red-500 text-red-500")} />
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-border-light">
                <div className="flex items-center space-x-3 text-text-secondary">
                  <Truck className="w-5 h-5 text-accent-forest" />
                  <span className="text-xs font-medium">Free Delivery</span>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <RotateCcw className="w-5 h-5 text-accent-forest" />
                  <span className="text-xs font-medium">7 Days Return</span>
                </div>
                <div className="flex items-center space-x-3 text-text-secondary">
                  <ShieldCheck className="w-5 h-5 text-accent-forest" />
                  <span className="text-xs font-medium">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
