"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { 
  User, 
  Package, 
  Heart, 
  MapPin, 
  LogOut, 
  ChevronRight, 
  ShoppingBag,
  ExternalLink,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "profile" | "orders" | "wishlist" | "addresses";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);
  const [activeTab, setActiveTab] = React.useState<Tab>("profile");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  if (loading) return null;
  if (!user) return null;

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar */}
            <aside className="w-full md:w-80 space-y-8">
              <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-accent-forest text-white flex items-center justify-center text-2xl font-serif">
                    {user.user_metadata?.full_name?.[0] || user.email?.[0]}
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <h2 className="text-xl font-serif text-text-primary truncate">
                      {user.user_metadata?.full_name || "ZAGULL Member"}
                    </h2>
                    <p className="text-xs text-text-secondary truncate">{user.email}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as Tab)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl transition-all group",
                        activeTab === tab.id 
                          ? "bg-accent-forest text-white" 
                          : "hover:bg-background-primary text-text-primary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <tab.icon className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-widest">{tab.label}</span>
                      </div>
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform group-hover:translate-x-1",
                        activeTab === tab.id ? "text-white" : "text-text-secondary"
                      )} />
                    </button>
                  ))}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-4 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold uppercase tracking-widest text-sm mt-4 border-t border-border-light pt-6"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-accent-forest p-8 rounded-3xl text-white space-y-4">
                <h4 className="font-serif text-xl">Need Assistance?</h4>
                <p className="text-white/80 text-sm leading-relaxed">
                  Our nature-inspired care team is here to help with your orders or any questions.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b border-white/40 pb-1 hover:border-white transition-all">
                  Contact Support <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </aside>

            {/* Content Area */}
            <div className="flex-grow space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               {activeTab === "profile" && (
                 <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-sm space-y-8">
                   <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                     <h3 className="text-3xl font-serif text-text-primary">Profile Details</h3>
                     <Button variant="outline" size="sm">
                       <Settings className="w-4 h-4 mr-2" />
                       Edit Profile
                     </Button>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                     <div className="space-y-2">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Full Name</p>
                       <p className="text-lg text-text-primary">{user.user_metadata?.full_name || "Not set"}</p>
                     </div>
                     <div className="space-y-2">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Email Address</p>
                       <p className="text-lg text-text-primary">{user.email}</p>
                     </div>
                     <div className="space-y-2">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Phone Number</p>
                       <p className="text-lg text-text-primary">{user.user_metadata?.phone || "Not set"}</p>
                     </div>
                     <div className="space-y-2">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">Member Since</p>
                       <p className="text-lg text-text-primary">
                         {new Date(user.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                       </p>
                     </div>
                   </div>
                 </div>
               )}

               {activeTab === "orders" && (
                 <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-sm space-y-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                   <div className="w-20 h-20 bg-background-primary rounded-full flex items-center justify-center mb-4">
                     <Package className="w-8 h-8 text-accent-forest opacity-20" />
                   </div>
                   <div className="space-y-2 max-w-sm">
                     <h3 className="text-2xl font-serif text-text-primary">No Orders Yet</h3>
                     <p className="text-text-secondary text-sm">
                       You haven't placed any orders yet. Start shopping our curated collections!
                     </p>
                   </div>
                   <Link href="/shop" className="pt-4">
                     <Button>Start Shopping</Button>
                   </Link>
                 </div>
               )}

               {activeTab === "wishlist" && (
                 <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-sm space-y-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-background-primary rounded-full flex items-center justify-center mb-4">
                     <Heart className="w-8 h-8 text-accent-forest opacity-20" />
                   </div>
                   <div className="space-y-2 max-w-sm">
                     <h3 className="text-2xl font-serif text-text-primary">Wishlist is Empty</h3>
                     <p className="text-text-secondary text-sm">
                       Save your favorite items to your wishlist and they'll appear here.
                     </p>
                   </div>
                   <Link href="/shop" className="pt-4">
                     <Button variant="outline">Browse Collection</Button>
                   </Link>
                 </div>
               )}

               {activeTab === "addresses" && (
                 <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-light shadow-sm space-y-8">
                   <div className="flex justify-between items-center">
                     <h3 className="text-3xl font-serif text-text-primary">Saved Addresses</h3>
                     <Button size="sm">Add New</Button>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                     <div className="p-6 bg-background-primary rounded-2xl border border-border-light space-y-4">
                        <div className="flex justify-between">
                          <span className="bg-accent-forest text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Default</span>
                          <button className="text-xs text-text-secondary hover:text-red-500 font-bold uppercase tracking-widest">Delete</button>
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-text-primary">Home Address</p>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            House 123, Street 5<br />
                            Phase 6, DHA<br />
                            Faisalabad, PK
                          </p>
                        </div>
                     </div>
                   </div>
                 </div>
               )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
