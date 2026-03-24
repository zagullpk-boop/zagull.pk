"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isOutOfStock?: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  isNew,
  isOutOfStock,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = React.useState(false);
  const [isWishlisted, setIsWishlisted] = React.useState(false);

  // Wishlist logic using LocalStorage as requested
  React.useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("zagull_wishlist") || "[]");
    setIsWishlisted(wishlist.includes(id));
  }, [id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("zagull_wishlist") || "[]");
    let newWishlist;
    if (wishlist.includes(id)) {
      newWishlist = wishlist.filter((item: string) => item !== id);
      setIsWishlisted(false);
    } else {
      newWishlist = [...wishlist, id];
      setIsWishlisted(true);
    }
    localStorage.setItem("zagull_wishlist", JSON.stringify(newWishlist));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, category }, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group relative flex flex-col transition-all duration-500 hover:-translate-y-1">
      {/* Image Container */}
      <Link href={`/products/${id}`} className="relative aspect-square overflow-hidden rounded-2xl bg-[#c9956c]/5 border border-[#c9956c]/5">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Wishlist Heart */}
        <button 
          onClick={toggleWishlist}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-[#c9956c]/10"
        >
          <Heart 
            className={cn(
              "w-4 h-4 transition-colors duration-300", 
              isWishlisted ? "fill-red-500 text-red-500" : "text-[#8b6e5a]"
            )} 
          />
        </button>

        {/* NEW Badge */}
        {isNew && (
          <div className="absolute top-4 left-4 z-10 bg-[#c9956c] text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-lg shadow-[#c9956c]/20">
            New
          </div>
        )}

        {/* Sold Out Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2d1b10] bg-white px-4 py-2 rounded-full shadow-sm">
              Sold Out
            </span>
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="mt-6 space-y-3 px-1">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#c9956c]">
            {category}
          </span>
          <h4 className="text-sm font-semibold text-[#2d1b10] truncate group-hover:text-[#c9956c] transition-colors">
            {name}
          </h4>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#2d1b10]">
            PKR {price.toLocaleString()}
          </span>
        </div>

        <Button 
          onClick={handleAddToCart}
          disabled={isOutOfStock || isAdded}
          className={cn(
            "w-full h-11 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500",
            isAdded 
              ? "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/20" 
              : "bg-[#c9956c] text-white hover:bg-[#2d1b10] shadow-lg shadow-[#c9956c]/10"
          )}
        >
          {isAdded ? (
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
