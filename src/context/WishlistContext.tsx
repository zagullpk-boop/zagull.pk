"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  // 1. Handle Auth State Change
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Load wishlist (Supabase for logged in, localStorage for guests)
  useEffect(() => {
    async function loadWishlist() {
      if (userId) {
        // Fetch from Supabase
        const { data, error } = await supabase
          .from('wishlist')
          .select('product_id, products(*)');
        
        if (error) {
          console.error("Error fetching wishlist:", error.message);
        } else if (data) {
          // Format the data to match our Product interface
          const dbWishlist = data.map((item: any) => ({
            id: item.products.id,
            name: item.products.name,
            price: Number(item.products.price),
            image: item.products.image_url,
            category: item.products.category,
            isNew: item.products.is_new
          }));
          setWishlist(dbWishlist);
        }
      } else {
        // Fetch from localStorage
        const savedWishlist = localStorage.getItem("zagull-wishlist");
        if (savedWishlist) {
          try {
            setWishlist(JSON.parse(savedWishlist));
          } catch (e) {
            console.error("Failed to parse wishlist", e);
          }
        }
      }
    }
    loadWishlist();
  }, [userId]);

  // 3. Persist to localStorage for guests
  useEffect(() => {
    if (!userId) {
      localStorage.setItem("zagull-wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, userId]);

  const addToWishlist = async (product: Product) => {
    if (userId) {
      // Add to Supabase
      const { error } = await supabase
        .from('wishlist')
        .insert({ user_id: userId, product_id: product.id });
      
      if (error && error.code !== '23505') { // Ignore duplicate key errors
        console.error("Error adding to wishlist:", error.message);
        return;
      }
    }

    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = async (productId: string) => {
    if (userId) {
      // Remove from Supabase
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .match({ user_id: userId, product_id: productId });
      
      if (error) {
        console.error("Error removing from wishlist:", error.message);
        return;
      }
    }

    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
