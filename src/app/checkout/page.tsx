"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCart } from "@/context/CartContext";
import { 
  ChevronRight, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  Truck,
  ShieldCheck,
  Package,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

type Step = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<Step>("shipping");
  const [mounted, setMounted] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  // Controlled form state
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "Faisalabad",
    postalCode: "",
    paymentMethod: "cod",
  });

  React.useEffect(() => {
    setMounted(true);
    // Generate a random order number once on mount
    const randomId = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(`#ZGL-${randomId}`);

    // Get current user
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
        setFormData(prev => ({
          ...prev,
          fullName: user.user_metadata?.full_name || prev.fullName,
          email: user.email || prev.email
        }));
      }
    });
  }, []);

  if (!mounted) return null;

  const totalAmount = totalPrice > 3000 ? totalPrice : totalPrice + 250;
  const shippingCost = totalPrice > 3000 ? 0 : 250;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = async () => {
    if (currentStep === "shipping") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      setIsSubmitting(true);
      try {
        // 1. Create Order in Supabase
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user?.id || null,
            total_amount: totalAmount,
            status: 'pending',
            shipping_address: formData,
            order_number: orderNumber
          })
          .select()
          .single();

        if (orderError) throw orderError;

        // 2. Create Order Items
        const orderItems = cart.map(item => ({
          order_id: orderData.id,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }));

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) throw itemsError;

        // 3. Clear Cart & Finalize
        clearCart(); 
        setCurrentStep("confirmation");
      } catch (err) {
        console.error("Order submission failed:", err);
        alert("Failed to place order. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep === "payment") setCurrentStep("shipping");
    else if (currentStep === "shipping") router.push("/cart");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Step Progress */}
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center w-full max-w-2xl px-4">
              <div className={cn(
                "flex flex-col items-center gap-2 flex-1 relative",
                currentStep !== "shipping" && "text-accent-forest"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                  currentStep === "shipping" ? "border-accent-forest bg-accent-forest text-white" : "border-accent-forest bg-white text-accent-forest"
                )}>
                  {currentStep !== "shipping" ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Shipping</span>
                <div className="absolute top-5 left-1/2 w-full h-[2px] bg-border-light -z-10" />
              </div>

              <div className={cn(
                "flex flex-col items-center gap-2 flex-1 relative",
                currentStep === "payment" ? "text-accent-forest" : "text-text-secondary"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all",
                  currentStep === "payment" ? "border-accent-forest text-accent-forest" : "border-border-light"
                )}>
                  {currentStep === "confirmation" ? <CheckCircle2 className="w-5 h-5 text-accent-forest" /> : "2"}
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Payment</span>
                <div className="absolute top-5 left-1/2 w-full h-[2px] bg-border-light -z-10" />
              </div>

              <div className={cn(
                "flex flex-col items-center gap-2 flex-1",
                currentStep === "confirmation" ? "text-accent-forest" : "text-text-secondary"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all",
                  currentStep === "confirmation" ? "border-accent-forest text-accent-forest" : "border-border-light"
                )}>
                  3
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Review</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {currentStep === "shipping" && (
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-sm space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-serif text-text-primary">Shipping Information</h2>
                    <p className="text-text-secondary text-sm">Please enter the delivery details for your ZAGULL products.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Full Name</label>
                      <Input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email Address</label>
                      <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="example@email.com" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Phone Number</label>
                      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+92 XXX XXXXXXX" className="h-12" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Street Address</label>
                      <Input name="address" value={formData.address} onChange={handleChange} placeholder="House No, Street, Area" className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">City</label>
                      <Input name="city" value={formData.city} onChange={handleChange} className="h-12" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Postal Code (Optional)</label>
                      <Input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="XXXXX" className="h-12" />
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button onClick={handleNext} className="w-full md:w-auto px-12 h-14 text-lg">
                      Review Payment
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === "payment" && (
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-sm space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-serif text-text-primary">Select Payment Method</h2>
                    <p className="text-text-secondary text-sm">Choose how you would like to pay for your order.</p>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full p-6 border-2 border-accent-forest bg-background-primary flex items-center justify-between rounded-2xl transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-accent-forest text-white flex items-center justify-center">
                          <Package className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-text-primary">Cash on Delivery (COD)</h4>
                          <p className="text-xs text-text-secondary">Pay when you receive your order.</p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-accent-forest" />
                    </button>

                    <button className="w-full p-6 border-2 border-border-light bg-white flex items-center justify-between rounded-2xl hover:border-accent-forest/30 transition-all opacity-60">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-background-primary text-text-secondary flex items-center justify-center">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-bold text-text-primary">Online Payment</h4>
                          <p className="text-xs text-text-secondary">Credit Card, JazzCash, EasyPaisa (Coming Soon)</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-6">
                    <Button 
                      onClick={handleNext} 
                      className="flex-grow h-14 text-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete Order
                          <ChevronRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleBack} className="h-14 px-12" disabled={isSubmitting}>
                      Go Back
                    </Button>
                  </div>
                </div>
              )}

              {currentStep === "confirmation" && (
                <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-sm text-center space-y-8 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-accent-forest text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-4xl font-serif text-text-primary">Your Order is Placed!</h2>
                    <p className="text-text-secondary">Order {orderNumber} is being prepared with nature-inspired care.</p>
                  </div>
                  <div className="max-w-md mx-auto p-6 bg-background-primary rounded-2xl flex flex-col gap-4 text-left">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Order #:</span>
                      <span className="font-bold text-accent-forest">{orderNumber}</span>
                    </div>
                    {formData.fullName && (
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Name:</span>
                        <span className="font-bold">{formData.fullName}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Status:</span>
                      <span className="font-bold text-accent-forest">Pending Confirmation</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Payment:</span>
                      <span className="font-bold">Cash on Delivery</span>
                    </div>
                  </div>
                  <Link href="/shop" className="inline-block pt-4">
                    <Button size="lg" className="px-12">Back to Collections</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Sticky Order Summary Summary */}
            <div className="space-y-6">
              <div className="p-8 bg-white rounded-3xl border border-border-light shadow-sm sticky top-32 space-y-8">
                <h3 className="text-xl font-serif text-text-primary">Order Summary</h3>
                
                <div className="max-h-60 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border-light flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow space-y-1">
                        <h4 className="text-xs font-bold text-text-primary line-clamp-1">{item.name}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-text-secondary">Qty: {item.quantity}</span>
                          <span className="text-sm font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-border-light">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-medium">Rs. {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Shipping</span>
                    <span className="text-accent-forest font-medium">
                       {totalPrice > 3000 ? "FREE" : "Rs. 250"}
                    </span>
                  </div>
                  <div className="pt-4 flex justify-between items-end">
                    <span className="text-lg font-serif">Grand Total</span>
                    <span className="text-2xl font-bold text-accent-forest">
                      Rs. {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Trust Signal */}
                <div className="pt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <ShieldCheck className="w-4 h-4 text-accent-forest" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">SSL Secure Packaging</span>
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Truck className="w-4 h-4 text-accent-forest" />
                    <span className="text-[10px] uppercase font-bold tracking-widest">Tracked Shipping</span>
                  </div>
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
