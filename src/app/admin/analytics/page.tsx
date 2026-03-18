"use client";

import React from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  PieChart,
  Calendar,
  Download,
  ArrowUpRight
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const reportStats = [
  { label: "Total Revenue", value: "PKR 456,780", change: "+18.5%", trend: "up", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Orders", value: "256", change: "+8.2%", trend: "up", icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Avg. Order Value", value: "PKR 1,784", change: "-2.4%", trend: "down", icon: BarChart3, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Conversion Rate", value: "3.2%", change: "+0.5%", trend: "up", icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
];

const topProducts = [
  { name: "Golden Heart Pendant", sold: 45, revenue: "PKR 54,000", price: "PKR 1,200", growth: "+12%" },
  { name: "Silver Hoop Earrings", sold: 38, revenue: "PKR 32,300", price: "PKR 850", growth: "+8%" },
  { name: "Rose Gold Bracelet", sold: 32, revenue: "PKR 28,800", price: "PKR 900", growth: "+15%" },
  { name: "Pearl Drop Earrings", sold: 28, revenue: "PKR 30,800", price: "PKR 1,100", growth: "-3%" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Analytics & Reports</h1>
          <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
            <Link href="/admin" className="hover:text-accent-forest transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">Reports</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-border-light h-10 px-4 text-xs font-sans font-bold shadow-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-accent-forest h-10 px-4 text-xs font-sans font-bold">
            <Download className="w-4 h-4 mr-2" />
            Export Full Report
          </Button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportStats.map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className={cn("p-2 rounded-xl", stat.bg)}>
                <stat.icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
                stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
              )}>
                {stat.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold text-text-primary mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Sales Chart */}
        <Card className="lg:col-span-2 p-8 border-none shadow-sm space-y-8">
           <div className="flex items-center justify-between">
              <div>
                 <h3 className="text-lg font-serif">Revenue Performance</h3>
                 <p className="text-xs text-text-secondary font-sans mt-0.5">Daily sales trend over the last 30 days</p>
              </div>
              <div className="flex bg-gray-50 p-1 rounded-xl">
                 <button className="px-3 py-1 text-[10px] font-bold bg-white shadow-sm rounded-lg text-accent-forest">Revenue</button>
                 <button className="px-3 py-1 text-[10px] font-bold text-text-secondary hover:text-text-primary">Orders</button>
              </div>
           </div>
           
           <div className="h-[300px] w-full flex items-end justify-between gap-1 px-4 relative">
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5 pr-full">
                {[1,2,3,4,5].map(i => <div key={i} className="border-t border-text-primary w-full" />)}
             </div>
              {[30, 45, 20, 60, 80, 50, 40, 90, 70, 85, 95, 60, 40, 75, 55, 65, 80, 45, 90, 100, 85, 70, 60, 50, 45, 65, 80, 95, 85, 70].map((h, i) => (
                <div key={i} className="flex-grow group relative h-full flex items-end">
                   <div 
                      className="w-full bg-accent-forest/10 rounded-t-md transition-all duration-300 group-hover:bg-accent-forest" 
                      style={{ height: `${h}%` }}
                   />
                   {i % 5 === 0 && (
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-text-secondary uppercase">Jan {i+1}</span>
                   )}
                </div>
              ))}
           </div>
           <div className="pt-8 grid grid-cols-3 gap-8 border-t border-border-light">
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Gross Profit</p>
                 <p className="text-lg font-bold text-text-primary">PKR 182,450</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Tax (GST)</p>
                 <p className="text-lg font-bold text-text-primary">PKR 12,340</p>
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Refunds</p>
                 <p className="text-lg font-bold text-red-600">PKR 4,250</p>
              </div>
           </div>
        </Card>

        {/* Sales by Category */}
        <Card className="p-8 border-none shadow-sm space-y-8">
           <h3 className="text-lg font-serif">Sales by Category</h3>
           <div className="aspect-square relative flex items-center justify-center">
              {/* Semi-circular chart UI */}
              <div className="w-full h-full rounded-full border-[20px] border-emerald-500/10 relative">
                 <div className="absolute inset-0 border-[20px] border-emerald-500 rounded-full clip-path-70" />
                 <div className="absolute inset-0 border-[20px] border-blue-500 rounded-full clip-path-30 rotate-[252deg]" />
              </div>
              <div className="absolute text-center bg-white p-4 rounded-full shadow-lg border border-border-light">
                 <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Total Sales</p>
                 <p className="text-xl font-bold text-accent-forest">256</p>
              </div>
           </div>
           <div className="space-y-4 font-sans">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-sm font-medium text-text-primary">Jewellery</span>
                 </div>
                 <span className="text-sm font-bold">70%</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm font-medium text-text-primary">Clothing</span>
                 </div>
                 <span className="text-sm font-bold">30%</span>
              </div>
           </div>
           <Button variant="outline" className="w-full border-border-light text-xs font-bold hover:bg-gray-50 mt-4">
              Detailed Breakdown
           </Button>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card className="p-0 border-none shadow-sm overflow-hidden font-sans">
        <div className="p-6 border-b border-border-light bg-gray-50/30 flex items-center justify-between">
           <h3 className="text-lg font-serif">Top Selling Products</h3>
           <Link href="/admin/products" className="text-xs text-accent-forest font-bold hover:underline">View All Inventory</Link>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left">
              <thead className="bg-[#F8F9FA]">
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Product</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Units Sold</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">UnitPrice</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-center">Gross Revenue</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">Growth</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                 {topProducts.map((p, i) => (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                       <td className="px-6 py-4 font-bold text-text-primary text-sm">{p.name}</td>
                       <td className="px-6 py-4 text-sm text-text-secondary font-medium">{p.sold}</td>
                       <td className="px-6 py-4 text-sm text-text-secondary">{p.price}</td>
                       <td className="px-6 py-4 text-sm font-bold text-accent-forest text-center">{p.revenue}</td>
                       <td className="px-6 py-4 text-right">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-lg",
                            p.growth.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                          )}>
                            {p.growth}
                          </span>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </Card>
    </div>
  );
}
