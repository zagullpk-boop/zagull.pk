"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Info, 
  DollarSign, 
  Image as ImageIcon, 
  Box, 
  Layers, 
  Search, 
  Globe,
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "basic", label: "Basic Info", icon: Info },
  { id: "pricing", label: "Pricing", icon: DollarSign },
  { id: "images", label: "Images", icon: ImageIcon },
  { id: "inventory", label: "Inventory", icon: Box },
  { id: "variants", label: "Variants", icon: Layers },
  { id: "seo", label: "SEO & Visibility", icon: Globe },
];

export default function AddProductPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [variants, setVariants] = useState<any[]>([]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Add New Product</h1>
          <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
            <Link href="/admin" className="hover:text-accent-forest transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/admin/products" className="hover:text-accent-forest transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">Add New</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-border-light h-10 px-6 text-xs font-sans font-bold">
            Save as Draft
          </Button>
          <Button className="bg-accent-forest h-10 px-6 text-xs font-sans font-bold">
            Publish Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                activeTab === tab.id 
                  ? "bg-accent-forest text-white shadow-lg shadow-accent-forest/10" 
                  : "text-text-secondary hover:bg-white hover:text-text-primary border border-transparent hover:border-border-light"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-white" : "text-text-secondary group-hover:text-accent-forest")} />
              {tab.label}
            </button>
          ))}
          <div className="pt-8 px-4 hidden lg:block">
             <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
               <div className="flex gap-3">
                 <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                 <p className="text-[11px] text-amber-800 leading-relaxed font-sans font-medium">
                   Don't forget to add high-quality images and clear descriptions for better SEO performance.
                 </p>
               </div>
             </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-8 border-none shadow-sm min-h-[500px]">
            {activeTab === "basic" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Product Name *</label>
                    <Input placeholder="e.g. Golden Heart Pendant" className="bg-gray-50/50 border-border-light focus:ring-accent-forest/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-primary uppercase tracking-wider">SKU *</label>
                    <div className="relative">
                      <Input placeholder="ZAG-J-001" className="bg-gray-50/50 border-border-light" />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-accent-forest bg-white px-2 py-1 rounded-md border border-border-light shadow-sm">Auto</button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Category</label>
                    <select className="w-full bg-gray-50/50 border border-border-light rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-accent-forest/20 outline-none font-sans">
                      <option>Jewellery</option>
                      <option>Clothing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Subcategory</label>
                    <select className="w-full bg-gray-50/50 border border-border-light rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-accent-forest/20 outline-none font-sans">
                      <option>Pendants</option>
                      <option>Rings</option>
                      <option>Bracelets</option>
                      <option>Earrings</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Short Description</label>
                  <textarea 
                    placeholder="Brief overview of the product..." 
                    rows={2}
                    className="w-full bg-gray-50/50 border border-border-light rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-accent-forest/20 outline-none font-sans resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Full Description</label>
                  <div className="border border-border-light rounded-xl overflow-hidden">
                    <div className="bg-gray-50 border-b border-border-light p-2 flex gap-2">
                      <button className="p-1 px-2 rounded hover:bg-white text-xs font-bold">B</button>
                      <button className="p-1 px-2 rounded hover:bg-white text-xs italic">I</button>
                      <button className="p-1 px-2 rounded hover:bg-white text-xs underline">U</button>
                      <div className="w-px h-4 bg-border-light mx-1 mt-1" />
                      <button className="p-1 px-2 rounded hover:bg-white text-xs">List</button>
                    </div>
                    <textarea 
                      placeholder="Detailed product information..." 
                      rows={6}
                      className="w-full bg-white px-3 py-3 text-sm outline-none font-sans"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pricing" && (
              <div className="space-y-8 animate-in fade-in duration-300 max-w-xl">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Regular Price (PKR)</label>
                      <Input type="number" placeholder="2500" className="bg-gray-50/50 border-border-light" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Sale Price (PKR)</label>
                      <Input type="number" placeholder="1999" className="bg-gray-50/50 border-border-light" />
                    </div>
                 </div>
                 <div className="p-6 bg-accent-forest/5 rounded-2xl border border-accent-forest/10">
                    <p className="text-xs font-bold text-accent-forest uppercase tracking-widest mb-4">Profit Analysis</p>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-sm font-sans">
                         <span className="text-text-secondary">Cost Price</span>
                         <Input type="number" placeholder="1200" className="w-32 h-8 bg-white border-border-light py-1" />
                       </div>
                       <div className="flex justify-between items-center text-sm font-sans">
                         <span className="text-text-secondary">Gross Margin</span>
                         <span className="font-bold text-emerald-600">40%</span>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded border-2 border-border-light group-hover:border-accent-forest transition-colors flex items-center justify-center">
                        <div className="w-2 h-2 bg-accent-forest rounded-sm scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-sans text-text-secondary group-hover:text-text-primary">Apply sales tax (GST 17%)</span>
                    </label>
                 </div>
              </div>
            )}

            {activeTab === "images" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="border-2 border-dashed border-border-light rounded-3xl p-12 text-center flex flex-col items-center gap-4 hover:border-accent-forest/50 transition-colors cursor-pointer group">
                  <div className="p-4 bg-accent-forest/5 rounded-full group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-8 h-8 text-accent-forest" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif">Upload Product Media</h4>
                    <p className="text-xs font-sans text-text-secondary mt-1">Drag and drop images, or click to browse files</p>
                  </div>
                  <Button variant="outline" className="mt-4 border-border-light text-xs font-sans font-bold">Select Files</Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                  <div className="aspect-square bg-gray-50 rounded-2xl border border-border-light flex items-center justify-center text-[10px] text-text-secondary uppercase font-bold">Preview 1</div>
                  <div className="aspect-square bg-gray-50 rounded-2xl border border-border-light flex items-center justify-center text-[10px] text-text-secondary uppercase font-bold">Preview 2</div>
                </div>
              </div>
            )}

            {activeTab === "inventory" && (
              <div className="space-y-8 animate-in fade-in duration-300 max-w-xl">
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Stock Quantity</label>
                       <Input type="number" placeholder="100" className="bg-gray-50/50 border-border-light" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Low Stock SKU Alert</label>
                       <Input type="number" placeholder="5" className="bg-gray-50/50 border-border-light" />
                    </div>
                 </div>
                 <div className="space-y-4 pt-4 border-t border-border-light">
                   <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-sans font-bold text-text-primary">Track Inventory</p>
                        <p className="text-[11px] text-text-secondary leading-tight">Enable automated stock reduction after every order</p>
                      </div>
                      <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner">
                         <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-sans font-bold text-text-primary">Allow Backorders</p>
                        <p className="text-[11px] text-text-secondary leading-tight">Customers can purchase item even when out of stock</p>
                      </div>
                      <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer">
                         <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                      </div>
                   </div>
                 </div>
              </div>
            )}

            {activeTab === "variants" && (
              <div className="space-y-6 animate-in fade-in duration-300 font-sans">
                <div className="flex items-center justify-between">
                   <h3 className="text-lg font-serif">Product Variants</h3>
                   <Button variant="outline" className="h-8 text-[10px] font-bold border-border-light">
                     Add Property
                   </Button>
                </div>
                
                <div className="p-6 bg-gray-50/50 rounded-2xl border border-border-light border-dashed text-center">
                   <Layers className="w-10 h-10 text-text-secondary/30 mx-auto mb-3" />
                   <p className="text-sm text-text-secondary font-medium italic">Add size or color properties to create product variations.</p>
                   <Button className="mt-4 bg-transparent border border-accent-forest text-accent-forest h-8 text-xs hover:bg-accent-forest/5 font-bold">
                     Create Variants Matrix
                   </Button>
                </div>

                <div className="mt-8 overflow-x-auto">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="border-b border-border-light font-sans">
                         <th className="py-2 text-[10px] font-bold text-text-secondary uppercase">Variant</th>
                         <th className="py-2 text-[10px] font-bold text-text-secondary uppercase">SKU Suffix</th>
                         <th className="py-2 text-[10px] font-bold text-text-secondary uppercase">Price Delta</th>
                         <th className="py-2 text-[10px] font-bold text-text-secondary uppercase">Inventory</th>
                       </tr>
                     </thead>
                     <tbody className="text-sm text-text-secondary italic">
                        <tr>
                          <td colSpan={4} className="py-8 text-center">No variants created yet.</td>
                        </tr>
                     </tbody>
                   </table>
                </div>
              </div>
            )}

            {activeTab === "seo" && (
              <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl font-sans">
                 <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 mb-8">
                    <h4 className="text-[10px] font-bold text-blue-800 uppercase tracking-widest mb-3">Google Search Preview</h4>
                    <p className="text-blue-600 text-lg hover:underline cursor-pointer font-medium">Golden Heart Pendant | Premium ZAGULL Jewellery</p>
                    <p className="text-emerald-700 text-xs mt-1">zagull.pk › products › golden-heart-pendant</p>
                    <p className="text-text-secondary text-xs mt-2 leading-relaxed">Shop the elegant Golden Heart Pendant from ZAGULL. Handcrafted jewelry with forest green and rose gold accents. Free shipping on orders over 3000 PKR.</p>
                 </div>

                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-text-primary uppercase tracking-wider">SEO Title</label>
                       <Input placeholder="Leave blank to use product name" className="bg-gray-50/50 border-border-light" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-text-primary uppercase tracking-wider">Meta Description</label>
                       <textarea 
                         rows={3}
                         placeholder="Custom meta description for search engines..." 
                         className="w-full bg-gray-50/50 border border-border-light rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-accent-forest/20 outline-none font-sans resize-none"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-text-primary uppercase tracking-wider">SEO Friendly URL</label>
                       <div className="flex items-center gap-2">
                         <span className="text-xs text-text-secondary">zagull.pk/products/</span>
                         <Input placeholder="golden-heart-pendant" className="flex-grow bg-gray-50/50 border-border-light h-9" />
                       </div>
                    </div>
                 </div>
              </div>
            )}
          </Card>

          {/* Assistant / Help area */}
          <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-border-light/50 font-sans">
             <div className="w-8 h-8 rounded-full bg-accent-forest flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-white">AI</span>
             </div>
             <p className="text-xs text-text-secondary">
               Need help with descriptions? Click the <span className="font-bold text-accent-forest cursor-pointer hover:underline">ZAGULL Assistant</span> to generate professional copy.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
