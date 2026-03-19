"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { User, Package, Heart, MapPin, Settings, LogOut, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    }
    getUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("zagull-cart");
    localStorage.removeItem("zagull-wishlist");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-background-primary">
        <Loader2 className="w-8 h-8 text-accent-forest animate-spin" />
      </div>
    );
  }

  const userEmail = user?.email || "guest@example.com";
  const userName = user?.user_metadata?.full_name || userEmail.split('@')[0];

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar */}
            <aside className="w-full md:w-64 space-y-2">
              <div className="p-6 bg-white rounded-2xl border border-border-light shadow-sm text-center mb-8">
                <div className="w-16 h-16 bg-accent-forest rounded-full mx-auto flex items-center justify-center text-white text-2xl font-serif mb-4 shadow-inner">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-lg font-serif text-text-primary truncate">{userName}</h2>
                <p className="text-[10px] text-text-secondary truncate uppercase tracking-widest">{userEmail}</p>
              </div>

              {[
                { name: "My Profile", icon: User, href: "/account", active: true },
                { name: "My Orders", icon: Package, href: "/account/orders" },
                { name: "Wishlist", icon: Heart, href: "/wishlist" },
                { name: "Addresses", icon: MapPin, href: "/account/addresses" },
                { name: "Settings", icon: Settings, href: "/account/settings" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium transition-all ${
                    item.active
                      ? "bg-accent-forest text-white shadow-lg shadow-accent-forest/20"
                      : "text-text-secondary hover:bg-white hover:text-text-primary border border-transparent hover:border-border-light"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-8"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </aside>

            {/* Main Content */}
            <div className="flex-grow space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Total Orders", value: "0", icon: Package },
                  { label: "In Wishlist", value: "0", icon: Heart },
                  { label: "Status", value: "Verified User", icon: User },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white p-6 rounded-2xl border border-border-light shadow-sm text-center">
                    <stat.icon className="w-5 h-5 text-accent-forest mx-auto mb-3 opacity-30" />
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{stat.label}</p>
                    <p className="text-lg font-bold text-text-primary mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl border border-border-light shadow-sm overflow-hidden">
                <div className="p-8 border-b border-border-light flex justify-between items-center">
                  <h3 className="text-xl font-serif text-text-primary">Recent Orders</h3>
                  <Link href="/account/orders" className="text-xs text-accent-forest font-bold hover:underline transition-all">View All</Link>
                </div>
                <div className="p-8 text-center py-20">
                  <Package className="w-12 h-12 text-text-secondary/10 mx-auto mb-4" />
                  <p className="text-text-secondary italic text-sm">You haven&apos;t placed any orders yet.</p>
                  <Link href="/shop">
                    <Button className="mt-6 bg-accent-forest hover:bg-accent-forest/90 px-8 h-11">Start Shopping</Button>
                  </Link>
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
