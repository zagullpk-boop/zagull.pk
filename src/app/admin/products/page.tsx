import React from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Search, Filter, Download } from "lucide-react";
import Link from "next/link";
import { ProductTable } from "@/components/admin/ProductTable";

import { requireAdminAuth } from "@/lib/admin/auth-actions";

export default async function AdminProductsPage() {
  await requireAdminAuth();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500">Error loading products: {error.message}</div>;
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif text-text-primary tracking-tight">Products</h1>
          <p className="text-text-secondary text-sm">Manage your inventory and showcase your collections.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-text-primary bg-white border border-border-light rounded-2xl hover:bg-background-primary transition-all shadow-sm">
            <Download size={14} /> 
            Export
          </button>
          <Link href="/admin/products/add" className="flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-accent-forest rounded-2xl hover:bg-black transition-all shadow-lg shadow-accent-forest/20">
            <Plus size={14} /> 
            Add Product
          </Link>
        </div>
      </div>

      <ProductTable initialProducts={products || []} />
    </div>
  );
}
