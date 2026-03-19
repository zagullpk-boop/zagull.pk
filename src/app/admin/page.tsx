"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  TrendingDown, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package,
  ArrowUpRight,
  MoreHorizontal,
  Loader2
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdminData() {
      try {
        setLoading(true);
        // 1. Fetch Total Revenue
        const { data: revenueData } = await supabase
          .from('orders')
          .select('total_amount');
        const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

        // 2. Fetch Total Orders
        const { count: orderCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true });

        // 3. Fetch Total Customers
        const { count: customerCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // 4. Fetch Inventory
        const { count: productCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        setStats([
          {
            name: "Total Revenue",
            value: `PKR ${totalRevenue.toLocaleString()}`,
            change: "+100%", // New system
            trend: "up",
            icon: DollarSign,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            name: "Total Orders",
            value: orderCount || "0",
            change: "+100%",
            trend: "up",
            icon: ShoppingBag,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            name: "New Customers",
            value: customerCount || "0",
            change: "+100%",
            trend: "up",
            icon: Users,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            name: "Inventory Status",
            value: `${productCount} Items`,
            change: "Live",
            trend: "neutral",
            icon: Package,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ]);

        // 5. Fetch Recent Orders (Last 5)
        const { data: orders } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (orders) {
          setRecentOrders(orders.map(o => ({
            id: o.order_number,
            customer: o.shipping_address?.fullName || "Guest",
            date: new Date(o.created_at).toLocaleDateString(),
            status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
            total: `PKR ${Number(o.total_amount).toLocaleString()}`,
            color: o.status === 'delivered' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          })));
        }

      } catch (err) {
        console.error("Admin data fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAdminData();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-text-primary">Dashboard Overview</h1>
          <p className="text-text-secondary text-sm mt-1 font-sans">Welcome back, Zain. Here&apos;s what&apos;s happening with ZAGULL today.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="bg-white border-border-light shadow-sm font-sans font-medium text-xs">
            Generate Report
          </Button>
          <Link href="/admin/products">
            <Button className="bg-accent-forest font-sans font-medium text-xs">
              Manage Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i} className="p-6 border-none shadow-sm flex items-center justify-center h-32">
              <Loader2 className="w-6 h-6 text-accent-forest animate-spin opacity-20" />
            </Card>
          ))
        ) : (
          stats.map((stat, i) => (
            <Card key={i} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className={cn("p-2 rounded-xl", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
                  stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                )}>
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">{stat.name}</p>
                <h3 className="text-2xl font-bold text-text-primary mt-1">{stat.value}</h3>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Placeholder */}
        <Card className="lg:col-span-2 p-6 border-none shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-serif">Revenue Growth</h3>
            <select className="text-xs bg-gray-50 border-none rounded-lg p-1.5 outline-none font-sans">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full bg-gray-50/50 rounded-2xl flex items-end justify-between p-6 gap-2">
            {[40, 70, 45, 90, 65, 80, 50, 85, 95, 60, 75, 40].map((h, i) => (
              <div key={i} className="flex-grow group relative">
                <div 
                  className="w-full bg-accent-forest/10 rounded-t-lg transition-all duration-500 group-hover:bg-accent-forest group-hover:shadow-[0_0_20px_rgba(45,74,62,0.2)]" 
                  style={{ height: `${h}%` }}
                />
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-text-primary text-white px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-sans">
                  PKR {h * 1500}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 px-2">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
              <span key={m} className="text-[10px] text-text-secondary font-medium uppercase">{m}</span>
            ))}
          </div>
        </Card>

        {/* Support Alert */}
        <Card className="p-6 border-none shadow-sm bg-accent-forest text-white">
          <h3 className="text-lg font-serif mb-4 italic">Nature First</h3>
          <p className="text-xs opacity-80 leading-relaxed font-sans">
            Remember that all orders must be packed in our biodegradable nature-inspired materials. Check stock of forest-green boxes today.
          </p>
          <div className="mt-8 p-4 bg-white/10 rounded-2xl border border-white/20">
            <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Sustainability Tip</p>
            <p className="text-xs font-medium">Reusing forest clippings for cushioning reduced waste by 12% last month.</p>
          </div>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="p-0 border-none shadow-sm overflow-hidden text-sm">
        <div className="p-6 flex items-center justify-between border-b border-border-light">
          <h3 className="text-lg font-serif">Recent Orders</h3>
          <Link href="/admin/orders" className="text-xs text-accent-forest font-bold hover:underline font-sans">
            View All Orders
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 text-center">
              <Loader2 className="w-8 h-8 text-accent-forest animate-spin mx-auto opacity-20" />
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="p-20 text-center">
              <Package className="w-12 h-12 text-text-secondary/10 mx-auto mb-4" />
              <p className="text-text-secondary italic">No orders found yet.</p>
            </div>
          ) : (
            <table className="w-full text-left font-sans">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Order ID</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Customer</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-text-secondary uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-text-primary">{order.id}</td>
                    <td className="px-6 py-4 text-text-primary">{order.customer}</td>
                    <td className="px-6 py-4 text-xs text-text-secondary">{order.date}</td>
                    <td className="px-6 py-4 font-bold text-text-primary">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold", order.color)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-white rounded border border-transparent hover:border-border-light transition-all">
                        <ArrowUpRight className="w-4 h-4 text-text-secondary" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Card>
    </div>
  );
}
