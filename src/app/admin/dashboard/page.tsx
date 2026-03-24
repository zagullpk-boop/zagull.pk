import React from "react";
import { supabase } from "@/lib/supabase";
import { Package, ShoppingBag, DollarSign, TrendingUp, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch basic stats
  const [
    { count: productCount },
    { count: orderCount },
    { data: recentOrders },
    { data: revenueData }
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("orders").select("total_amount").eq("status", "completed")
  ]);

  const totalRevenue = revenueData?.reduce((acc, curr) => acc + Number(curr.total_amount), 0) || 0;

  const stats = [
    { name: "Total Products", value: productCount || 0, icon: Package, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Total Orders", value: orderCount || 0, icon: ShoppingBag, color: "text-accent-forest", bg: "bg-emerald-50" },
    { name: "Net Revenue", value: `PKR ${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-amber-600", bg: "bg-amber-50" },
    { name: "Pending Orders", value: recentOrders?.filter(o => o.status === 'pending').length || 0, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif text-text-primary tracking-tight">Overview</h1>
          <p className="text-text-secondary text-sm">Welcome back to your store's control center.</p>
        </div>
        <div className="flex bg-white rounded-2xl p-1 border border-border-light shadow-sm">
          <button className="px-6 py-2 text-xs font-bold uppercase tracking-widest bg-accent-forest text-white rounded-xl shadow-lg shadow-accent-forest/20">All Time</button>
          <button className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors">This Month</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-8 rounded-3xl border border-border-light shadow-xl shadow-black/5 hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={20} />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-text-secondary text-xs uppercase font-bold tracking-widest mb-1">{stat.name}</h3>
            <p className="text-2xl font-serif text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-border-light shadow-xl shadow-black/5 overflow-hidden">
          <div className="p-8 border-b border-border-light flex items-center justify-between">
            <h2 className="text-xl font-serif text-text-primary">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs font-bold uppercase tracking-widest text-accent-forest hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background-primary">
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Order ID</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Total</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Status</th>
                  <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {recentOrders?.map((order) => (
                  <tr key={order.id} className="hover:bg-background-primary/50 transition-colors">
                    <td className="px-8 py-5 text-sm font-medium text-text-primary truncate max-w-[120px]">
                      #{order.id.split('-')[0]}
                    </td>
                    <td className="px-8 py-5 text-sm font-bold text-text-primary">
                      PKR {Number(order.total_amount).toLocaleString()}
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        order.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                        order.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-xs text-text-secondary">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-accent-forest p-8 rounded-3xl text-white shadow-xl shadow-accent-forest/30 space-y-4">
            <h2 className="text-xl font-serif">Store Quick Actions</h2>
            <p className="text-white/80 text-sm">Efficiently manage your inventory and fulfillment.</p>
            <div className="grid grid-cols-1 gap-2 pt-2">
              <Link href="/admin/products/add" className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between group transition-all">
                <span className="text-sm font-bold">Add New Product</span>
                <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/admin/orders" className="bg-white/20 hover:bg-white/30 backdrop-blur-md p-4 rounded-2xl flex items-center justify-between group transition-all">
                <span className="text-sm font-bold">Fulfill Orders</span>
                <Clock size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border border-border-light shadow-xl shadow-black/5">
            <h2 className="text-lg font-serif text-text-primary mb-6">Recent Activities</h2>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-forest mt-1.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs text-text-primary font-bold">New order received from client Zain</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
