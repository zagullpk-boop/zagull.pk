"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Settings, 
  Truck, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Bell, 
  Database, 
  Save,
  Plus,
  Trash2,
  Lock,
  Smartphone
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

const settingsTabs = [
  { id: "general", label: "General", icon: Settings },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "emails", label: "Emails", icon: Mail },
  { id: "seo", label: "SEO Config", icon: Globe },
  { id: "admin", label: "Admin Accounts", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "advanced", label: "Advanced", icon: Database },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Settings</h1>
          <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
            <Link href="/admin" className="hover:text-accent-forest transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">Store Configuration</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-accent-forest h-10 px-6 text-xs font-sans font-bold shadow-lg shadow-accent-forest/10">
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-2">
          {settingsTabs.map((tab) => (
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
        <div className="lg:col-span-3">
           {activeTab === "general" && (
             <Card className="p-8 border-none shadow-sm space-y-8 animate-in fade-in duration-300">
                <div className="space-y-6">
                   <h3 className="text-lg font-serif">Store Information</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Store Name</label>
                         <Input defaultValue="ZAGULL" className="bg-gray-50/50 border-border-light font-bold" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Store Tagline</label>
                         <Input defaultValue="Elegant Jewellery & Fashion" className="bg-gray-50/50 border-border-light" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Support Email</label>
                         <Input defaultValue="hello@zagull.pk" className="bg-gray-50/50 border-border-light" />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">WhatsApp Number</label>
                         <Input defaultValue="+92 344 7018335" className="bg-gray-50/50 border-border-light" />
                      </div>
                   </div>
                   <div className="space-y-2 font-sans">
                      <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Business Address</label>
                      <textarea 
                        className="w-full bg-gray-50/50 border border-border-light rounded-xl py-2.5 px-3 text-sm focus:ring-1 focus:ring-accent-forest/20 outline-none font-sans resize-none"
                        rows={3}
                        defaultValue="Sector F-10, Faisalabad, Punjab 38000, Pakistan"
                      />
                   </div>
                </div>
             </Card>
           )}

           {activeTab === "shipping" && (
             <Card className="p-8 border-none shadow-sm space-y-8 animate-in fade-in duration-300 font-sans">
                <div className="space-y-6">
                   <div className="flex items-center justify-between border-b border-border-light pb-4">
                      <h3 className="text-lg font-serif">Shipping Rates</h3>
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase">Standard Active</span>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Flat Rate (PKR)</label>
                         <Input defaultValue="250" type="number" className="bg-gray-50/50 border-border-light font-bold text-lg" />
                         <p className="text-[10px] text-text-secondary">Applicable on all orders within Pakistan.</p>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Free Shipping Threshold</label>
                         <Input defaultValue="3000" type="number" className="bg-gray-50/50 border-border-light font-bold text-lg" />
                         <p className="text-[10px] text-text-secondary">Orders above this amount get free shipping.</p>
                      </div>
                   </div>
                   <div className="space-y-2 pt-4 border-t border-border-light">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-5 h-5 rounded-full border-2 border-accent-forest flex items-center justify-center">
                           <div className="w-2.5 h-2.5 bg-accent-forest rounded-full" />
                        </div>
                        <span className="text-sm font-bold text-text-primary">Enable Cash on Delivery (COD)</span>
                      </label>
                      <p className="text-[11px] text-text-secondary ml-8">Allows customers to pay when the package is delivered.</p>
                   </div>
                </div>
             </Card>
           )}

           {activeTab === "admin" && (
             <Card className="p-8 border-none shadow-sm space-y-8 animate-in fade-in duration-300 font-sans">
                <div className="flex items-center justify-between border-b border-border-light pb-4">
                   <h3 className="text-lg font-serif">Admin Accounts</h3>
                   <Button className="h-8 px-3 text-[10px] font-bold bg-accent-forest text-white">Add Manager</Button>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-border-light group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-accent-forest text-white flex items-center justify-center font-bold text-sm">AZ</div>
                         <div>
                            <p className="text-sm font-bold text-text-primary">Admin Zain (You)</p>
                            <p className="text-[10px] text-text-secondary">hello@zagull.pk • Super Admin</p>
                         </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 hover:bg-white rounded-lg text-text-secondary hover:text-accent-forest"><Lock className="w-4 h-4" /></button>
                      </div>
                   </div>
                   <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-border-light group">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">SA</div>
                         <div>
                            <p className="text-sm font-bold text-text-primary">Sara Assistant</p>
                            <p className="text-[10px] text-text-secondary">sara@zagull.pk • Editor</p>
                         </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 hover:bg-white rounded-lg text-text-secondary hover:text-accent-forest"><Lock className="w-4 h-4" /></button>
                         <button className="p-2 hover:bg-white rounded-lg text-text-secondary hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                   </div>
                </div>
                
                <div className="p-6 bg-red-50/30 rounded-2xl border border-red-100 space-y-4">
                   <div className="flex items-center gap-2 text-red-600">
                      <Lock className="w-4 h-4" />
                      <h4 className="text-xs font-bold uppercase tracking-widest">Security Settings</h4>
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                         <p className="text-sm font-bold text-text-primary">Two-Factor Authentication (2FA)</p>
                         <p className="text-[10px] text-text-secondary">Require a security code for all admin logins.</p>
                      </div>
                      <div className="w-8 h-4 bg-gray-200 rounded-full relative cursor-pointer">
                          <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                      </div>
                   </div>
                </div>
             </Card>
           )}
        </div>
      </div>
    </div>
  );
}
