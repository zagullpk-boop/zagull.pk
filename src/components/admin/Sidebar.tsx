import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  User, 
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "./LogoutButton";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col h-full bg-white border-r border-border-light", className)}>
      <div className="p-8 pb-4">
        <Link href="/admin" className="group">
          <span className="text-2xl font-serif tracking-tight text-text-primary group-hover:text-accent-forest transition-colors">
            ZAGULL
          </span>
          <span className="block text-[10px] uppercase font-bold tracking-widest text-accent-forest mt-1">
            Admin Panel
          </span>
        </Link>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-text-secondary hover:bg-background-primary hover:text-accent-forest transition-all group"
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {item.name}
            </div>
            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border-light">
        <LogoutButton />
      </div>
    </div>
  );
}
