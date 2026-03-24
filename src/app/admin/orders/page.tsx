import React from "react";
import { supabase } from "@/lib/supabase";
import { ShoppingBag, Search, Filter, Download, Calendar, ArrowRight } from "lucide-react";
import { OrderTable } from "@/components/admin/OrderTable";

export default async function OrdersPage() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading orders: {error.message}</div>;
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif text-text-primary tracking-tight">Orders</h1>
          <p className="text-text-secondary text-sm">Track and fulfill your customer orders across Pakistan.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-text-primary bg-white border border-border-light rounded-2xl hover:bg-background-primary transition-all shadow-sm">
            <Download size={14} /> 
            Labels
          </button>
          <div className="flex items-center gap-2 px-4 py-3 bg-white border border-border-light rounded-2xl shadow-sm text-xs font-bold uppercase tracking-widest text-text-secondary">
            <Calendar size={14} />
            Today
          </div>
        </div>
      </div>

      <OrderTable initialOrders={orders || []} />
    </div>
  );
}
