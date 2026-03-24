"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Package, Image as ImageIcon, Tag, DollarSign, Database, Loader2 } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
  initialData?: any;
  action: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  title: string;
}

export function ProductForm({ initialData, action, title }: ProductFormProps) {
  const [isPending, setIsPending] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await action(formData);
    
    if (result.success) {
      window.location.href = "/admin/products";
    } else {
      setError(result.error || "An error occurred.");
      setIsPending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-1">
        <h1 className="text-4xl font-serif text-text-primary tracking-tight">{title}</h1>
        <p className="text-text-secondary text-sm">Fill in the details below to update your inventory.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-border-light shadow-xl shadow-black/5 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Product Name</label>
              <Input 
                name="name" 
                defaultValue={initialData?.name} 
                required 
                placeholder="Ex: Luxury Gold Necklace"
                className="rounded-xl h-12"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Description</label>
              <textarea 
                name="description" 
                defaultValue={initialData?.description} 
                required 
                rows={5}
                placeholder="Product details, materials, and care instructions..."
                className="w-full p-4 rounded-xl border border-border-light focus:outline-none focus:ring-2 focus:ring-accent-forest/20 focus:border-accent-forest transition-all text-sm"
              />
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-border-light shadow-xl shadow-black/5 grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Price (PKR)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input 
                  name="price" 
                  type="number" 
                  defaultValue={initialData?.price} 
                  required 
                  className="pl-12 rounded-xl h-12"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Stock Quantity</label>
              <div className="relative">
                <Database className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input 
                  name="stock" 
                  type="number" 
                  defaultValue={initialData?.stock} 
                  required 
                  className="pl-12 rounded-xl h-12"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-border-light shadow-xl shadow-black/5 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Category</label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <select 
                  name="category" 
                  defaultValue={initialData?.category} 
                  className="w-full pl-12 pr-4 h-12 bg-white border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-forest/20 focus:border-accent-forest transition-all cursor-pointer"
                >
                  <option value="Jewellery">Jewellery</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <Input 
                  name="image_url" 
                  defaultValue={initialData?.image_url} 
                  placeholder="https://images.unsplash.com/..."
                  className="pl-12 rounded-xl h-12"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl text-red-600 text-xs font-medium">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-14 rounded-2xl bg-accent-forest hover:bg-black text-white text-sm font-bold uppercase tracking-widest shadow-xl shadow-accent-forest/20 transition-all duration-300"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Product"}
          </Button>
          
          <Link href="/admin/products" className="block text-center text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
