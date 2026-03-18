"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  Calendar, 
  Printer, 
  Download, 
  MoreHorizontal, 
  ChevronRight,
  Eye,
  Clock,
  CheckCircle2,
  Truck,
  PackageCheck,
  XCircle,
  RotateCcw
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const orderTabs = [
  { id: "all", label: "All Orders", count: 256, icon: Clock },
  { id: "pending", label: "Pending", count: 12, icon: Clock, color: "text-red-600 bg-red-50" },
  { id: "confirmed", label: "Confirmed", count: 8, icon: CheckCircle2, color: "text-blue-600 bg-blue-50" },
  { id: "shipped", label: "Shipped", count: 5, icon: Truck, color: "text-amber-600 bg-amber-50" },
  { id: "delivered", label: "Delivered", count: 225, icon: PackageCheck, color: "text-emerald-600 bg-emerald-50" },
  { id: "cancelled", label: "Cancelled", count: 4, icon: XCircle, color: "text-gray-600 bg-gray-50" },
  { id: "returned", label: "Returned", count: 2, icon: RotateCcw, color: "text-purple-600 bg-purple-50" },
];

const mockOrders = [
  { 
    id: "#ZAG-1234", 
    customer: "Sara Ahmed", 
    email: "sara@email.com",
    date: "Jan 15, 2025 3:45 PM", 
    items: 3, 
    status: "Pending", 
    payment: "COD (Unpaid)", 
    total: "PKR 2,850" 
  },
  { 
    id: "#ZAG-1233", 
    customer: "Ali Hassan", 
    email: "ali@email.com",
    date: "Jan 15, 2025 2:20 PM", 
    items: 1, 
    status: "Delivered", 
    payment: "COD (Paid)", 
    total: "PKR 1,200" 
  },
  { 
    id: "#ZAG-1232", 
    customer: "Ayesha Khan", 
    email: "ayesha@email.com",
    date: "Jan 14, 2025 11:30 AM", 
    items: 2, 
    status: "Shipped", 
    payment: "COD (Unpaid)", 
    total: "PKR 3,500" 
  },
  { 
    id: "#ZAG-1231", 
    customer: "Zainab Bibi", 
    email: "zainab@email.com",
    date: "Jan 14, 2025 9:15 AM", 
    items: 4, 
    status: "Confirmed", 
    payment: "COD (Unpaid)", 
    total: "PKR 4,800" 
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Pending": return "bg-red-50 text-red-700 border-red-100";
    case "Confirmed": return "bg-blue-50 text-blue-700 border-blue-100";
    case "Shipped": return "bg-amber-50 text-amber-700 border-amber-100";
    case "Delivered": return "bg-emerald-50 text-emerald-700 border-emerald-100";
    case "Cancelled": return "bg-gray-50 text-gray-700 border-gray-100";
    case "Returned": return "bg-purple-50 text-purple-700 border-purple-100";
    default: return "bg-gray-50 text-gray-700 border-gray-100";
  }
};

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Orders</h1>
          <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
            <Link href="/admin" className="hover:text-accent-forest transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">All Orders</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-border-light h-10 px-4 text-xs font-sans font-bold">
            <Download className="w-4 h-4 mr-2" />
            Export Selected
          </Button>
          <Button className="bg-accent-forest h-10 px-4 text-xs font-sans font-bold">
            <Printer className="w-4 h-4 mr-2" />
            Print Bulk Invoices
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {orderTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
              activeTab === tab.id 
                ? "bg-white shadow-sm border border-border-light text-accent-forest scale-105" 
                : "text-text-secondary hover:text-text-primary hover:bg-white/50"
            )}
          >
            <tab.icon className={cn("w-3.5 h-3.5", activeTab === tab.id ? "text-accent-forest" : "text-text-secondary")} />
            {tab.label}
            <span className={cn(
              "px-1.5 py-0.5 rounded-full text-[10px]",
              activeTab === tab.id ? "bg-accent-forest/10 text-accent-forest" : "bg-gray-100 text-text-secondary"
            )}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <Card className="p-4 border-none shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search by Order #, Customer..." 
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-accent-forest/20 outline-none font-sans"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl text-xs font-bold text-text-secondary hover:bg-gray-100 transition-colors">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl text-xs font-bold text-text-secondary hover:bg-gray-100 transition-colors">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </Card>

      {/* Orders Table */}
      <Card className="p-0 border-none shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto font-sans">
          <table className="w-full text-left">
            <thead className="bg-[#F8F9FA] border-b border-border-light">
              <tr>
                <th className="px-6 py-4">
                   <div className="w-4 h-4 border-2 border-border-light rounded cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-left">Order #</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-left">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-left">Date & Time</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-left">Items</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-left">Total</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-left">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 group transition-colors">
                  <td className="px-6 py-4">
                     <div className="w-4 h-4 border-2 border-border-light rounded cursor-pointer group-hover:border-accent-forest transition-colors" />
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/orders/${order.id.replace("#", "")}`} className="text-sm font-bold text-text-primary hover:text-accent-forest transition-colors underline decoration-dotted underline-offset-4">
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-accent-forest/5 text-accent-forest flex items-center justify-center text-[10px] font-bold border border-accent-forest/10">
                         {order.customer.split(' ').map(n=>n[0]).join('')}
                       </div>
                       <div className="space-y-0.5">
                         <p className="text-sm font-medium text-text-primary">{order.customer}</p>
                         <p className="text-[10px] text-text-secondary">{order.email}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-text-secondary">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-text-primary">
                    {order.items} items
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-text-primary">
                    {order.total}
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                      getStatusStyles(order.status)
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/orders/${order.id.replace("#", "")}`}>
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border-light text-text-secondary hover:text-accent-forest transition-all" title="View details">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border-light text-text-secondary hover:text-text-primary transition-all" title="Print Invoice">
                        <Printer className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border-light text-text-secondary hover:text-text-primary transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Empty State Mock */}
        {activeTab === "returned" && (
           <div className="p-20 text-center flex flex-col items-center gap-4 bg-gray-50/20">
              <RotateCcw className="w-12 h-12 text-text-secondary/20" />
              <div>
                <h3 className="text-lg font-serif">No returned orders</h3>
                <p className="text-xs text-text-secondary font-sans mt-1">There are no orders with a 'Returned' status at this time.</p>
              </div>
           </div>
        )}
      </Card>
    </div>
  );
}
