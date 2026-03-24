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
  Loader2,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import { getDashboardStats, getRevenueData } from "@/lib/admin/stats";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export const dynamic = 'force-dynamic';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [revenueChartData, setRevenueChartData] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const [dashboardStats, chartData, ordersData] = await Promise.all([
        getDashboardStats(),
        getRevenueData(),
        supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      setStats(dashboardStats);
      setRevenueChartData(chartData);
      
      if (ordersData.data) {
        setRecentOrders(ordersData.data.map(o => ({
          id: o.order_number || o.id.slice(0, 8),
          customer: o.shipping_address?.fullName || "Guest",
          date: new Date(o.created_at).toLocaleDateString(),
          status: o.status,
          total: `Rs. ${Number(o.total_amount).toLocaleString()}`,
          color: getStatusColor(o.status)
        })));
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return "bg-emerald-100 text-emerald-700";
      case 'cancelled': return "bg-red-100 text-red-700";
      case 'processing': return "bg-blue-100 text-blue-700";
      case 'shipped': return "bg-purple-100 text-purple-700";
      default: return "bg-amber-100 text-amber-700";
    }
  };

  if (error) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <div>
          <h2 className="text-xl font-serif text-gray-900">Failed to load dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Please check your connection and try again.</p>
        </div>
        <Button onClick={fetchData} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" /> Retry
        </Button>
      </div>
    );
  }

  const statCards = stats ? [
    {
      name: "Lifetime Revenue",
      value: `Rs. ${stats.revenue.total.toLocaleString()}`,
      change: `${stats.revenue.growth >= 0 ? '+' : ''}${stats.revenue.growth.toFixed(1)}%`,
      trend: stats.revenue.growth >= 0 ? "up" : "down",
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      name: "Total Orders",
      value: stats.orders.total.toLocaleString(),
      change: `${stats.orders.growth >= 0 ? '+' : ''}${stats.orders.growth.toFixed(1)}%`,
      trend: stats.orders.growth >= 0 ? "up" : "down",
      icon: ShoppingBag,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      name: "New Customers",
      value: stats.customers.monthly.toLocaleString(),
      change: `${stats.customers.growth >= 0 ? '+' : ''}${stats.customers.growth.toFixed(1)}%`,
      trend: stats.customers.growth >= 0 ? "up" : "down",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      name: "Sync Status",
      value: `Live`,
      change: "Stable",
      trend: "neutral",
      icon: Package,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ] : [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time statistics for ZAGULL.PK</p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={async () => {
              window.location.href = '/api/admin/reports/sales';
            }}
            variant="outline" 
            className="bg-white border-gray-100 rounded-xl px-6 font-bold text-[10px] uppercase tracking-widest hover:shadow-md transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-3 h-3" /> Generate Report
          </Button>
          <Link href="/admin/products/add">
            <Button className="bg-gray-900 text-white rounded-xl px-6 font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-gray-900/10">
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i} className="p-8 border-none shadow-xl shadow-gray-100/50 rounded-[2rem] flex items-center justify-center h-36 bg-white/50 animate-pulse">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl" />
                  <div className="w-16 h-4 bg-gray-100 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="w-20 h-3 bg-gray-100 rounded-full" />
                  <div className="w-32 h-6 bg-gray-100 rounded-full" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          statCards.map((stat, i) => (
            <Card key={i} className="p-8 border-none shadow-xl shadow-gray-100/50 rounded-[2rem] hover:shadow-2xl transition-all group bg-white">
              <div className="flex items-start justify-between">
                <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110 duration-300", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.color)} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full",
                  stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : stat.trend === "down" ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-500"
                )}>
                  {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : stat.trend === "down" ? <TrendingDown className="w-3 h-3" /> : null}
                  {stat.change}
                </div>
              </div>
              <div className="mt-6">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">{stat.name}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{stat.value}</h3>
              </div>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-8 border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] bg-white">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-serif text-gray-900">Revenue Performance</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Last 6 Months Data</p>
            </div>
          </div>
          <div className="h-[350px] w-full">
            {loading ? (
              <div className="h-full w-full bg-gray-50 rounded-3xl animate-pulse flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-200 animate-spin" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2D4A3E" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2D4A3E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', padding: '15px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    labelStyle={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#999', marginBottom: '5px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#2D4A3E" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                    animationDuration={2000}
                  />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 'bold', fill: '#CCC' }} 
                    dy={10}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </Card>

        {/* Support Alert / Quick Actions */}
        <div className="space-y-6">
          <Card className="p-8 border-none shadow-xl shadow-accent-forest/10 rounded-[2.5rem] bg-gray-900 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-forest/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-accent-forest/30 transition-all duration-700" />
            <h3 className="text-xl font-serif mb-4 italic leading-tight">Nature First<br/>Standard</h3>
            <p className="text-xs opacity-70 leading-relaxed font-medium">
              Every parcel shipped is a promise to the forest. Ensure premium green packaging for all confirmed orders today.
            </p>
            <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-40 mb-2">Inventory Alert</p>
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-accent-forest">Packaging Materials</p>
                <span className="text-[10px] font-bold bg-accent-forest/20 text-accent-forest px-2 py-0.5 rounded-full">Low Stock</span>
              </div>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] bg-white">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Bulk Edit', icon: Package, color: 'bg-blue-50 text-blue-600' },
                { label: 'Discount', icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
                { label: 'Subscribers', icon: Users, color: 'bg-purple-50 text-purple-600' },
                { label: 'Report', icon: BarChartIcon, color: 'bg-amber-50 text-amber-600' },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center justify-center p-4 rounded-3xl hover:bg-gray-50 transition-all group border border-gray-50">
                  <div className={cn("p-3 rounded-2xl mb-3 group-hover:scale-110 transition-transform", item.color)}>
                  {/* @ts-ignore */}
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-900 transition-colors uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Orders Table */}
      <Card className="p-0 border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] bg-white overflow-hidden">
        <div className="p-8 flex items-center justify-between border-b border-gray-50">
          <div>
            <h3 className="text-xl font-serif text-gray-900">Incoming Orders</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Last 5 Activities</p>
          </div>
          <Link href="/admin/orders">
            <Button variant="outline" className="text-[10px] font-bold text-gray-900 uppercase tracking-[0.2em] px-6 py-2 rounded-xl border-gray-100">
              View All
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 text-center">
              <Loader2 className="w-8 h-8 text-accent-forest animate-spin mx-auto opacity-20" />
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="p-24 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto border border-dashed border-gray-200">
                <Package className="w-8 h-8 text-gray-200" />
              </div>
              <p className="text-sm text-gray-400 font-serif italic">Your store is quiet today... why not promote a sale?</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">ID No.</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Client</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Timestamp</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Value</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Preview</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-all group">
                    <td className="px-8 py-6 font-bold text-gray-900 text-sm">#{order.id}</td>
                    <td className="px-8 py-6 text-gray-600 text-sm font-medium">{order.customer}</td>
                    <td className="px-8 py-6 text-[11px] text-gray-400 font-bold uppercase tracking-wider">{order.date}</td>
                    <td className="px-8 py-6 font-bold text-gray-900 text-sm">{order.total}</td>
                    <td className="px-8 py-6">
                      <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", order.color)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <Link href={`/admin/orders/${order.id}`}>
                        <button className="p-2.5 hover:bg-white rounded-xl border border-transparent hover:border-gray-200 transition-all hover:shadow-sm text-gray-400 hover:text-accent-forest">
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="p-6 bg-gray-50/30 flex justify-center border-t border-gray-50">
           <Link href="/admin/orders" className="text-[10px] font-bold text-gray-400 hover:text-gray-900 uppercase tracking-[0.4em] transition-colors">
            Scroll for full database analysis
           </Link>
        </div>
      </Card>
    </div>
  );
}

// Dummy components because I don't know if they exist yet in user's UI kit
import { BarChart as BarChartIcon } from "lucide-react";
