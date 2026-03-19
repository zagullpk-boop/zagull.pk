"use client";

import * as React from "react";
import { supabase } from "@/lib/supabase";

export interface CartItem {
  id: string; // This is the product_id
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  variants?: any;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity: number, variants?: any) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [userId, setUserId] = React.useState<string | null>(null);

  // 1. Handle Auth State Change
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Load cart (Supabase for logged in, localStorage for guests)
  React.useEffect(() => {
    async function loadCart() {
      if (userId) {
        const { data, error } = await supabase
          .from('cart')
          .select('quantity, variants, products(*)');
        
        if (error) {
          console.error("Error fetching cart:", error.message);
        } else if (data) {
          const dbCart = data.map((item: any) => ({
            id: item.products.id,
            name: item.products.name,
            price: Number(item.products.price),
            image: item.products.image_url,
            category: item.products.category,
            quantity: item.quantity,
            variants: item.variants
          }));
          setCart(dbCart);
        }
      } else {
        const savedCart = localStorage.getItem("zagull-cart");
        if (savedCart) {
          try {
            setCart(JSON.parse(savedCart));
          } catch (e) {
            console.error("Failed to parse cart", e);
          }
        }
      }
    }
    loadCart();
  }, [userId]);

  // 3. Persist to localStorage for guests
  React.useEffect(() => {
    if (!userId) {
      localStorage.setItem("zagull-cart", JSON.stringify(cart));
    }
  }, [cart, userId]);

  const addToCart = async (product: any, quantity: number, variants: any = {}) => {
    if (userId) {
      // Upsert into Supabase
      const { error } = await supabase
        .from('cart')
        .upsert({ 
          user_id: userId, 
          product_id: product.id, 
          quantity: quantity,
          variants: variants 
        }, { onConflict: 'user_id, product_id, variants' });
      
      if (error) {
        console.error("Error adding to cart:", error.message);
        return;
      }
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id && JSON.stringify(item.variants) === JSON.stringify(variants));
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && JSON.stringify(item.variants) === JSON.stringify(variants))
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity,
          variants
        },
      ];
    });
  };

  const removeFromCart = async (id: string) => {
    if (userId) {
      const { error } = await supabase
        .from('cart')
        .delete()
        .match({ user_id: userId, product_id: id });
      
      if (error) {
        console.error("Error removing from cart:", error.message);
        return;
      }
    }
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;

    if (userId) {
      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .match({ user_id: userId, product_id: id });
      
      if (error) {
        console.error("Error updating quantity:", error.message);
        return;
      }
    }

    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = async () => {
    if (userId) {
      const { error } = await supabase
        .from('cart')
        .delete()
        .match({ user_id: userId });
      
      if (error) {
        console.error("Error clearing cart:", error.message);
      }
    }
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
