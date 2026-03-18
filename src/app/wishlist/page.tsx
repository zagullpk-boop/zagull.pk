"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary">Your Wishlist</h1>
            <p className="text-text-secondary max-w-xl mx-auto font-sans">
              Those special pieces you've had your eye on.
            </p>
          </div>

          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlist.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 space-y-6 bg-white rounded-3xl border border-dashed border-border-light max-w-2xl mx-auto">
              <Heart className="w-16 h-16 text-text-secondary/10 mx-auto" />
              <div className="space-y-2">
                <p className="text-2xl font-serif text-text-primary">Your wishlist is empty</p>
                <p className="text-text-secondary font-sans px-8">
                  Start adding pieces that inspire you and build your perfect collection.
                </p>
              </div>
              <Link href="/shop">
                <Button className="bg-accent-forest px-8 py-6 rounded-xl text-lg shadow-lg shadow-accent-forest/10">
                  Explore Collection
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
