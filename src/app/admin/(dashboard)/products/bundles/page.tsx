"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Sparkles, Plus, Edit2, Trash2, Package, Tag } from "lucide-react";

const bundles = [
  { name: "Wedding Guest Set", items: 3, price: "PKR 5,450", status: "Active", discounted: "PKR 6,200" },
  { name: "Daily Essentials Pack", items: 2, price: "PKR 2,100", status: "Active", discounted: "PKR 2,450" },
  { name: "Nature's Palette Box", items: 4, price: "PKR 7,800", status: "Draft", discounted: "PKR 9,000" },
];

export default function AdminBundlesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Product Bundles</h1>
          <p className="text-xs text-text-secondary mt-1">Create discounted product sets to increase Average Order Value (AOV).</p>
        </div>
        <Button className="bg-accent-forest h-10 px-6 text-xs font-sans font-bold">
          <Sparkles className="w-4 h-4 mr-2" />
          Create New Bundle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {bundles.map((bundle, i) => (
          <Card key={i} className="p-0 border-none shadow-sm overflow-hidden group">
            <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
               <Package className="w-12 h-12 text-text-secondary/10" />
               <div className="absolute top-4 right-4">
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                    bundle.status === "Active" ? "bg-emerald-500 text-white" : "bg-gray-400 text-white"
                  }`}>
                    {bundle.status}
                  </span>
               </div>
            </div>
            <div className="p-6 space-y-4 font-sans">
              <div className="flex justify-between items-start">
                 <div>
                    <h3 className="text-lg font-serif text-text-primary">{bundle.name}</h3>
                    <p className="text-xs text-text-secondary mt-1">{bundle.items} Products included</p>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-bold text-accent-forest">{bundle.price}</p>
                    <p className="text-[10px] text-text-secondary line-through">{bundle.discounted}</p>
                 </div>
              </div>
              
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                 <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-50 rounded-lg text-text-secondary hover:text-blue-600 transition-all"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-gray-50 rounded-lg text-text-secondary hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                 </div>
                 <Button variant="outline" className="h-8 text-[10px] font-bold px-4 border-border-light">Edit Contents</Button>
              </div>
            </div>
          </Card>
        ))}
        
        <button className="border-2 border-dashed border-border-light rounded-3xl flex flex-col items-center justify-center p-12 text-text-secondary hover:border-accent-forest/50 hover:text-accent-forest transition-all group min-h-[300px]">
           <Plus className="w-8 h-8 mb-4 opacity-30 group-hover:scale-110 transition-transform" />
           <p className="font-serif text-xl">Create New Bundle</p>
           <p className="text-xs mt-1 font-sans">Bundle products together for a shared discount</p>
        </button>
      </div>
    </div>
  );
}
