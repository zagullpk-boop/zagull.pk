"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Home, 
  Info, 
  FileText, 
  Megaphone, 
  Layout, 
  Eye,
  Save,
  Image as ImageIcon,
  Plus,
  Trash2,
  MoveUp,
  MoveDown
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const cmsTabs = [
  { id: "homepage", label: "Homepage Editor", icon: Home },
  { id: "announcement", label: "Announcement Bar", icon: Megaphone },
  { id: "about", label: "About Us Page", icon: Info },
  { id: "footer", label: "Footer Config", icon: Layout },
  { id: "legal", label: "Legal Pages", icon: FileText },
];

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState("homepage");

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Content Management</h1>
          <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
            <Link href="/admin" className="hover:text-accent-forest transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">CMS</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-border-light h-10 px-6 text-xs font-sans font-bold">
            <Eye className="w-4 h-4 mr-2" />
            Preview Site
          </Button>
          <Button className="bg-accent-forest h-10 px-6 text-xs font-sans font-bold">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {cmsTabs.map((tab) => (
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
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3 space-y-8">
          {activeTab === "homepage" && (
            <div className="space-y-8 animate-in fade-in duration-300">
               {/* Hero Section Editor */}
               <Card className="p-8 border-none shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-border-light pb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 italic font-serif">H</div>
                        <h3 className="text-lg font-serif">Hero Section</h3>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-text-secondary uppercase">Visible</span>
                        <div className="w-8 h-4 bg-emerald-500 rounded-full relative cursor-pointer">
                           <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Main Headline</label>
                           <Input defaultValue="Timeless Elegance For Every Moment" className="bg-gray-50/50 border-border-light font-serif text-lg" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Sub-headline</label>
                           <textarea 
                             className="w-full bg-gray-50/50 border border-border-light rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-accent-forest/20 outline-none font-sans resize-none"
                             rows={3}
                             defaultValue="Discover handcrafted jewellery and apparel inspired by nature's sophisticated palette. Premium quality for the modern woman."
                           />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Button Text</label>
                              <Input defaultValue="Shop Collection" className="bg-gray-50/50 border-border-light" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Button Link</label>
                              <Input defaultValue="/shop" className="bg-gray-50/50 border-border-light" />
                           </div>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Hero Background</label>
                        <div className="aspect-[4/3] bg-gray-50 border-2 border-dashed border-border-light rounded-2xl flex flex-col items-center justify-center gap-3 group hover:border-accent-forest/50 transition-colors cursor-pointer relative overflow-hidden">
                           <img src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=600&h=450&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700" />
                           <div className="relative z-10 text-center p-4">
                              <ImageIcon className="w-8 h-8 text-accent-forest mx-auto mb-2" />
                              <p className="text-[10px] font-bold uppercase tracking-widest">Change Image</p>
                              <p className="text-[9px] text-text-secondary mt-1">1600 x 900 recommended</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </Card>

               {/* Featured Collections Editor */}
               <Card className="p-8 border-none shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-border-light pb-4">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 italic font-serif text-xs px-2 whitespace-nowrap">FC</div>
                        <h3 className="text-lg font-serif">Featured Collections</h3>
                     </div>
                     <Button className="h-8 px-3 text-[10px] font-bold bg-gray-100 text-text-primary hover:bg-gray-200">Add Collection</Button>
                  </div>

                  <div className="space-y-4 font-sans">
                     {[
                       { title: "The Jewellery Edit", items: 45, items_list: "Pendants, Rings, Earrings" },
                       { title: "Winter Essentials", items: 12, items_list: "Scarves, Skirts" }
                     ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-gray-50/50 border border-border-light rounded-2xl group">
                           <div className="flex flex-col gap-1">
                              <button className="p-1 hover:bg-white rounded shadow-sm"><MoveUp className="w-3 h-3 text-text-secondary"/></button>
                              <button className="p-1 hover:bg-white rounded shadow-sm"><MoveDown className="w-3 h-3 text-text-secondary"/></button>
                           </div>
                           <div className="flex-grow">
                              <p className="text-sm font-bold text-text-primary">{item.title}</p>
                              <p className="text-[10px] text-text-secondary mt-0.5">{item.items} items • Includes {item.items_list}</p>
                           </div>
                           <div className="flex gap-2">
                              <button className="p-2 hover:bg-white rounded-lg text-text-secondary hover:text-accent-forest"><Plus className="w-4 h-4" /></button>
                              <button className="p-2 hover:bg-white rounded-lg text-text-secondary hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                           </div>
                        </div>
                     ))}
                  </div>
               </Card>
            </div>
          )}

          {activeTab === "announcement" && (
            <Card className="p-8 border-none shadow-sm space-y-8 animate-in fade-in duration-300 font-sans max-w-2xl">
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h3 className="text-lg font-serif">Announcement Bar</h3>
                     <div className="w-10 h-5 bg-emerald-500 rounded-full relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                     </div>
                  </div>

                  <div className="p-4 bg-accent-forest text-white rounded-xl text-center text-xs font-medium shadow-lg shadow-accent-forest/10">
                    Free Delivery on Orders Above 3000 PKR! 🎉
                  </div>

                  <div className="space-y-4 pt-4">
                     <div className="space-y-2">
                        <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Bar Message</label>
                        <Input defaultValue="Free Delivery on Orders Above 3000 PKR! 🎉" className="bg-gray-50/50" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-center">
                           <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block mb-2">Background Color</label>
                           <div className="flex items-center gap-2 justify-center">
                              <div className="w-8 h-8 rounded-full bg-accent-forest border-2 border-white shadow-sm ring-1 ring-border-light cursor-pointer" />
                              <span className="text-xs font-mono text-text-secondary uppercase">#2D4A3E</span>
                           </div>
                        </div>
                        <div className="space-y-2 text-center">
                           <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest block mb-2">Text Color</label>
                           <div className="flex items-center gap-2 justify-center">
                              <div className="w-8 h-8 rounded-full bg-white border-2 border-white shadow-sm ring-1 ring-border-light cursor-pointer" />
                              <span className="text-xs font-mono text-text-secondary uppercase">#FFFFFF</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Card>
          )}

          {/* Assistant / Help area */}
          <div className="flex items-center gap-4 p-4 bg-white/50 rounded-2xl border border-border-light/50 font-sans mt-8">
             <div className="w-8 h-8 rounded-full bg-accent-forest flex items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-white">AI</span>
             </div>
             <p className="text-xs text-text-secondary">
               Need inspiration for seasonal banners? Ask the <span className="font-bold text-accent-forest cursor-pointer hover:underline">ZAGULL Design Assistant</span> to suggest nature-inspired palettes.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
