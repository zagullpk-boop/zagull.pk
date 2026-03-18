"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ChevronLeft } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 space-y-2">
            <h1 className="text-4xl md:text-5xl font-serif text-text-primary">Shopping Cart</h1>
            <p className="text-text-secondary font-sans">
              You have {totalItems} items in your basket.
            </p>
          </div>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => (
                  <div 
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-border-light shadow-sm transition-all"
                  >
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-border-light flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex-grow space-y-1 text-center sm:text-left">
                      <span className="text-[10px] text-accent-forest font-bold uppercase tracking-widest">
                        {item.category}
                      </span>
                      <h4 className="text-lg font-serif text-text-primary">{item.name}</h4>
                      <p className="text-sm font-medium text-text-primary">
                        Rs. {item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center border border-border-light rounded-lg overflow-hidden h-10 bg-background-primary">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 hover:bg-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm font-bold">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 hover:bg-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="flex flex-col items-center sm:items-end gap-2 pr-2">
                      <span className="text-lg font-bold text-text-primary">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-600 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}

                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="mt-4"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </div>

              {/* Order Summary Summary */}
              <div className="space-y-6">
                <div className="p-8 bg-white rounded-2xl border border-border-light shadow-sm space-y-6">
                  <h3 className="text-2xl font-serif text-text-primary border-b border-border-light pb-4">
                    Order Summary
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Subtotal</span>
                      <span className="font-medium text-text-primary">Rs. {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Shipping</span>
                      <span className="text-accent-forest font-medium">
                        {totalPrice > 3000 ? "FREE" : "Rs. 250"}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-border-light flex justify-between items-end">
                      <span className="text-lg font-serif">Total</span>
                      <div className="text-right">
                        <span className="block text-2xl font-bold text-text-primary">
                          Rs. {(totalPrice > 3000 ? totalPrice : totalPrice + 250).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-text-secondary uppercase tracking-tight">
                          Including local taxes
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href="/checkout" className="block w-full">
                    <Button className="w-full h-14 text-lg group shadow-lg">
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <div className="bg-background-primary/50 p-4 rounded-xl flex items-start gap-3">
                    <Truck className="w-5 h-5 text-accent-forest flex-shrink-0" />
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {totalPrice > 3000 
                        ? "Your order qualifies for FREE shipping!" 
                        : `Add Rs. ${(3000 - totalPrice).toLocaleString()} more for FREE shipping.`}
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-border-light space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-text-primary">
                    We Accept
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {/* Payment Icons */}
                    <div className="bg-background-primary h-8 px-4 flex items-center rounded text-[10px] font-bold text-text-secondary">
                      Cash on Delivery
                    </div>
                    <div className="bg-background-primary h-8 px-4 flex items-center rounded text-[10px] font-bold text-text-secondary">
                      Bank Transfer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-white/40 rounded-3xl border border-dashed border-border-light space-y-8">
              <div className="w-20 h-20 bg-background-primary rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-10 h-10 text-accent-forest/40" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-serif text-text-primary">Your cart is empty</h2>
                <p className="text-text-secondary font-sans max-w-sm mx-auto">
                  Looks like you haven't added anything to your cart yet. Explore our latest collections and find something you love!
                </p>
              </div>
              <Link href="/shop" className="inline-block">
                <Button size="lg" className="px-12">
                  Start Shopping
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
