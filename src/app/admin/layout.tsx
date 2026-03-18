"use client";

import React, { useState } from "react";
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
    badge: 12,
    children: [
      { name: "All Orders", href: "/admin/orders" },
      { name: "Pending", href: "/admin/orders?status=Pending" },
      { name: "Confirmed", href: "/admin/orders?status=Confirmed" },
    ]
  },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare, badge: 3 },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Content", href: "/admin/content", icon: PenTool },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState<string[]>(["Products", "Orders"]);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border-light transition-transform duration-300 transform lg:translate-x-0 lg:static lg:inset-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-border-light">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-accent-forest tracking-tighter">ZAGULL</span>
              <span className="text-[10px] font-bold bg-accent-forest text-white px-1.5 py-0.5 rounded uppercase">Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-grow overflow-y-auto p-4 space-y-1 custom-scrollbar">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const isExpanded = expandedItems.includes(item.name);

              return (
                <div key={item.name} className="space-y-1">
                  {item.children ? (
                    <>
                      <button
                        onClick={() => toggleExpand(item.name)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                          isActive ? "bg-accent-forest/5 text-accent-forest" : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          {item.name}
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full">{item.badge}</span>
                          )}
                          <ChevronDown className={cn("w-3 h-3 transition-transform", isExpanded && "rotate-180")} />
                        </div>
                      </button>
                      {isExpanded && (
                        <div className="ml-7 space-y-1 border-l border-border-light/50">
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className={cn(
                                "block px-4 py-1.5 text-xs transition-colors",
                                pathname === child.href ? "text-accent-forest font-bold" : "text-text-secondary hover:text-text-primary"
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
                        "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        pathname === item.href ? "bg-accent-forest text-white" : "text-text-secondary hover:bg-gray-50 hover:text-text-primary"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        {item.name}
                      </div>
                      {item.badge && (
                        <span className={cn(
                          "text-[10px] px-1.5 rounded-full",
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
          <div className="p-4 border-t border-border-light space-y-1">
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-secondary hover:bg-gray-50 hover:text-text-primary">
              <User className="w-4 h-4" />
              My Account
            </Link>
            <button 
              onClick={() => alert("Logging out of ZAGULL Admin... Redirecting to login.")}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-border-light px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-grow max-w-xl">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search anything... (⌘K)" 
                className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-accent-forest/20 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-50 rounded-lg">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-border-light mx-2" />
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-text-primary leading-none">Admin Zain</p>
                <p className="text-[10px] text-text-secondary mt-1">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-accent-forest text-white flex items-center justify-center font-bold text-sm">
                AZ
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
