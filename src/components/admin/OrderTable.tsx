"use client";

import React, { useState } from "react";
import { 
  Eye, 
  Trash2, 
  ChevronDown, 
  MoreHorizontal, 
  Clock, 
  CheckCircle, 
  Truck, 
  CheckCircle2, 
  XCircle,
  Phone,
  MapPin,
  Calendar,
  Loader2,
  ShoppingBag
} from "lucide-react";
import { updateOrderStatus, deleteOrder } from "@/lib/admin/order-actions";
import Link from "next/link";

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-amber-50 text-amber-600 border-amber-100', icon: Clock },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: CheckCircle },
  { value: 'delivered', label: 'Delivered', color: 'bg-orange-50 text-orange-600 border-orange-100', icon: Truck },
  { value: 'completed', label: 'Completed', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: CheckCircle2 },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-slate-50 text-slate-500 border-slate-100', icon: XCircle },
];

interface OrderTableProps {
  initialOrders: any[];
}

export function OrderTable({ initialOrders }: OrderTableProps) {
  const [orders, setOrders] = useState(initialOrders);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus, updated_at: new Date().toISOString() } : o));
    } else {
      alert("Error updating order: " + result.error);
    }
    setUpdatingId(null);
  };

  const handleDelete = async (orderId: string) => {
    if (!window.confirm("Permanently delete this order record?")) return;
    const result = await deleteOrder(orderId);
    if (result.success) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         o.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         o.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All Statuses" || o.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-3xl border border-border-light shadow-xl shadow-black/5 overflow-hidden">
      <div className="p-6 border-b border-border-light bg-background-primary/30 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search by ID, name or phone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-forest/20 focus:border-accent-forest transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light rounded-xl">
            <Filter size={14} className="text-text-secondary" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-xs font-bold uppercase tracking-widest text-text-secondary focus:outline-none cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Pending</option>
              <option>Confirmed</option>
              <option>Delivered</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-visible">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-background-primary/50 border-b border-border-light">
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary whitespace-nowrap">Order Info</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary whitespace-nowrap">Customer</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary whitespace-nowrap">Total</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary whitespace-nowrap">Status</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light relative">
            {filteredOrders.map((order) => {
              const currentStatus = statusOptions.find(s => s.value === order.status) || statusOptions[0];
              const StatusIcon = currentStatus.icon;

              return (
                <tr key={order.id} className="hover:bg-background-primary/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-text-primary">#{order.id.split('-')[0]}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-text-secondary uppercase tracking-widest">
                        <Calendar size={10} />
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-1 max-w-[200px]">
                      <p className="text-sm font-bold text-text-primary truncate">{order.customer_name || 'Guest User'}</p>
                      <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                        <Phone size={10} className="text-accent-forest" />
                        {order.phone || 'No phone'}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-text-primary">PKR {Number(order.total_amount).toLocaleString()}</p>
                      <p className="text-[10px] text-text-secondary text-accent-forest font-bold">{order.order_items?.length || 0} items</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="relative group/status inline-block">
                      <button 
                        disabled={updatingId === order.id}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${currentStatus.color} hover:shadow-md`}
                      >
                        {updatingId === order.id ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <StatusIcon size={12} />
                        )}
                        {currentStatus.label}
                        <ChevronDown size={10} className="ml-1 opacity-50" />
                      </button>
                      
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-border-light rounded-2xl shadow-2xl opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all z-50 p-2 transform origin-top scale-95 group-hover/status:scale-100">
                        {statusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => handleStatusUpdate(order.id, option.value)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all hover:bg-background-primary ${
                              order.status === option.value ? option.color + ' border' : 'text-text-secondary'
                            }`}
                          >
                            <option.icon size={14} />
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-right">
                      <button className="p-2 text-text-secondary hover:text-accent-forest hover:bg-emerald-50 rounded-lg transition-all">
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-background-primary flex items-center justify-center text-text-secondary">
                      <ShoppingBag size={32} />
                    </div>
                    <p className="text-text-primary font-serif text-lg">No orders found</p>
                    <p className="text-text-secondary text-sm">Try adjusting your search or filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { Search, Filter } from "lucide-react";
