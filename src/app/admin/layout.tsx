"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  BarChart3, 
  PenTool, 
  Settings, 
  Bell, 
  User, 
  LogOut,
  ChevronDown,
  Menu,
  X,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";
import AdminUserMenu from "@/components/admin/AdminUserMenu";
import NotificationBell from "@/components/admin/NotificationBell";
import CommandPalette from "@/components/admin/CommandPalette";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Products", "Orders"]);
  const [counts, setCounts] = useState({ orders: 0, messages: 0 });
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchCounts = async () => {
      const [orderCount, messageCount] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }).neq('status', 'cancelled').neq('status', 'draft'),
        supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false)
      ]);
      setCounts({
        orders: orderCount.count || 0,
        messages: messageCount.count || 0
      });
    };
    fetchCounts();
    
    // Subscribe to changes
    const orderSub = supabase.channel('orders_count').on('postgres_changes', { event: '*', table: 'orders' }, fetchCounts).subscribe();
    const msgSub = supabase.channel('msgs_count').on('postgres_changes', { event: '*', table: 'messages' }, fetchCounts).subscribe();
    
    return () => {
      supabase.removeChannel(orderSub);
      supabase.removeChannel(msgSub);
    };
  }, [supabase]);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { 
      name: "Products", 
      href: "/admin/products", 
      icon: Package,
      children: [
        { name: "All Products", href: "/admin/products" },
        { name: "Add New", href: "/admin/products/add" },
        { name: "Categories", href: "/admin/products/categories" },
        { name: "Bundles", href: "/admin/products/bundles" },
      ]
    },
    { 
      name: "Orders", 
      href: "/admin/orders", 
      icon: ShoppingBag,
      badge: counts.orders,
      children: [
        { name: "All Orders", href: "/admin/orders" },
        { name: "Pending", href: "/admin/orders?status=pending" },
        { name: "Processing", href: "/admin/orders?status=processing" },
        { name: "Shipped", href: "/admin/orders?status=shipped" },
        { name: "Delivered", href: "/admin/orders?status=delivered" },
        { name: "Cancelled", href: "/admin/orders?status=cancelled" },
      ]
    },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare, badge: counts.messages },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Content", href: "/admin/content", icon: PenTool },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-gray-900 tracking-tighter">ZAGULL</span>
              <span className="text-[10px] font-bold bg-gray-900 text-white px-1.5 py-0.5 rounded uppercase">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-grow overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
              const isExpanded = expandedItems.includes(item.name);

              return (
                <div key={item.name} className="space-y-1">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all",
                          isActive ? "bg-accent-forest/5 text-accent-forest" : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge > 0 && (
                            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{item.badge}</span>
                          )}
                          <ChevronDown className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="ml-7 mt-1.5 space-y-1 border-l border-gray-100 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "block py-1.5 text-xs font-semibold transition-colors",
                                pathname === child.href ? "text-accent-forest" : "text-gray-400 hover:text-gray-900"
                              )}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold transition-all",
                        pathname === item.href ? "bg-accent-forest text-white shadow-lg shadow-accent-forest/10" : "text-gray-400 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </div>
                      {item.badge > 0 && (
                        <span className={cn(
                          "text-[10px] px-2 py-0.5 rounded-full font-bold",
                          pathname === item.href ? "bg-white text-accent-forest" : "bg-red-500 text-white"
                        )}>{item.badge}</span>
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-border-light bg-gray-50/50">
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:bg-white hover:text-gray-900 hover:shadow-sm transition-all">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-border-light px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-6 flex-grow max-w-2xl">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2.5 hover:bg-gray-50 rounded-xl transition-all"
            >
              <Menu className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex-grow">
              <CommandPalette />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NotificationBell />
            <div className="h-8 w-px bg-gray-100 mx-4" />
            <AdminUserMenu initialName="Admin Zain" initialEmail="zagull.pk@gmail.com" />
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 animate-in fade-in duration-700">
          {children}
        </main>
      </div>
    </div>
  );
}
