"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

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
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isAdded, setIsAdded] = React.useState(false);
  
  const isWishlisted = isInWishlist(id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, category }, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image, category, isNew });
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-border-light transition-all hover:shadow-md">
      {/* Link Overlay */}
      <Link href={`/products/${id}`} className="absolute inset-0 z-0">
        <span className="sr-only">View {name}</span>
      </Link>

      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="bg-accent-forest text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            New
          </span>
        )}
        {isOutOfStock && (
          <span className="bg-text-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Sold Out
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleWishlistToggle}
        className={cn(
          "absolute top-4 right-4 z-10 w-10 h-10 rounded-full backdrop-blur-sm border border-border-light flex items-center justify-center transition-all",
          isWishlisted 
            ? "bg-red-500 text-white border-red-500" 
            : "bg-white/80 text-text-primary hover:bg-accent-forest hover:text-white hover:border-accent-forest"
        )}
      >
        <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
      </button>

      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-background-primary">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <span className="text-[10px] text-accent-forest font-semibold uppercase tracking-widest leading-none">
            {category}
          </span>
          <h4 className="text-lg font-serif text-text-primary truncate">
            {name}
          </h4>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-medium text-text-primary">
            Rs. {price.toLocaleString()}
          </span>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs text-text-secondary font-medium">4.8</span>
          </div>
        </div>

        {!isOutOfStock && (
          <Button 
            onClick={handleQuickAdd}
            className={cn(
              "w-full h-11 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300",
              isAdded 
                ? "bg-green-600 text-white" 
                : "bg-accent-forest text-white hover:bg-black shadow-md hover:shadow-lg"
            )}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
