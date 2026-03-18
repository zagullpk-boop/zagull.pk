"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FolderPlus, Plus, Edit2, Trash2, Folder, Layers } from "lucide-react";

const categories = [
  { name: "Jewellery", subCount: 5, productCount: 156, icon: "✨" },
  { name: "Clothing", subCount: 3, productCount: 42, icon: "👗" },
  { name: "Accessories", subCount: 2, productCount: 12, icon: "👜" },
  { name: "Gift Boxes", subCount: 1, productCount: 8, icon: "🎁" },
];

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Categories Management</h1>
          <p className="text-xs text-text-secondary mt-1">Organize your products into logical hierarchical structures.</p>
        </div>
        <Button className="bg-accent-forest h-10 px-6 text-xs font-sans font-bold">
          <FolderPlus className="w-4 h-4 mr-2" />
          Create New Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl border border-border-light group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 hover:bg-white rounded-lg text-text-secondary hover:text-blue-600 border border-transparent hover:border-border-light"><Edit2 className="w-3.5 h-3.5" /></button>
                <button className="p-2 hover:bg-white rounded-lg text-text-secondary hover:text-red-500 border border-transparent hover:border-border-light"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <h3 className="text-lg font-serif text-text-primary">{cat.name}</h3>
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-50">
               <div>
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Sub-cats</p>
                  <p className="text-sm font-bold mt-0.5">{cat.subCount}</p>
               </div>
               <div className="w-px h-6 bg-border-light" />
               <div>
                  <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">Products</p>
                  <p className="text-sm font-bold mt-0.5">{cat.productCount}</p>
               </div>
            </div>
            <Button variant="outline" className="w-full mt-6 border-border-light text-[10px] font-bold h-8">
               Manage Subcategories
            </Button>
          </Card>
        ))}
        
        <button className="aspect-[4/5] border-2 border-dashed border-border-light rounded-3xl flex flex-col items-center justify-center gap-3 text-text-secondary hover:border-accent-forest/50 hover:text-accent-forest transition-all group">
           <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-accent-forest/5">
              <Plus className="w-5 h-5" />
           </div>
           <span className="text-xs font-bold uppercase tracking-widest">Add Primary Category</span>
        </button>
      </div>
    </div>
  );
}
