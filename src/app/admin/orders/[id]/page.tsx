"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Printer, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  Truck, 
  PackageCheck,
  MoreHorizontal,
  ArrowUpRight,
  AlertCircle,
  DollarSign
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const timeline = [
  { status: "Order Placed", date: "Jan 15, 2025 3:45 PM", icon: Clock, color: "text-emerald-500", done: true },
  { status: "Confirmed", date: "Jan 15, 2025 4:30 PM", icon: CheckCircle2, color: "text-emerald-500", done: true },
  { status: "Shipped", date: "Pending", icon: Truck, color: "text-gray-300", done: false },
  { status: "Delivered", date: "Pending", icon: PackageCheck, color: "text-gray-300", done: false },
];

import { use } from "react";

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [status, setStatus] = useState("Pending");

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-border-light transition-all group">
            <ChevronLeft className="w-5 h-5 text-text-secondary group-hover:text-text-primary" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-serif text-text-primary">Order #ZAG-{id}</h1>
              <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-red-100">
                {status}
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-1 font-sans">Placed on Jan 15, 2025 at 3:45 PM (2 hours ago)</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-border-light h-10 px-4 text-xs font-sans font-bold">
            <Printer className="w-4 h-4 mr-2" />
            Print Invoice
          </Button>
          <Button className="bg-accent-forest h-10 px-4 text-xs font-sans font-bold">
            Update Status
          </Button>
        </div>
      </div>

      {/* Progress Tracker */}
      <Card className="p-8 border-none shadow-sm">
        <div className="relative flex justify-between max-w-4xl mx-auto items-start">
          <div className="absolute top-[18px] left-[5%] right-[5%] h-0.5 bg-gray-100 -z-0" />
          <div className="absolute top-[18px] left-[5%] w-[33%] h-0.5 bg-emerald-500 -z-0 transition-all duration-1000" />
          
          {timeline.map((item, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-4 bg-white transition-colors duration-500",
                item.done ? "border-emerald-500 text-emerald-500" : "border-gray-100 text-gray-300"
              )}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="text-center">
                <p className={cn("text-xs font-bold", item.done ? "text-text-primary" : "text-text-secondary")}>{item.status}</p>
                <p className="text-[10px] text-text-secondary mt-0.5">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Order Items */}
          <Card className="p-0 border-none shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border-light bg-gray-50/30">
              <h3 className="text-lg font-serif">Order Items</h3>
            </div>
            <div className="overflow-x-auto font-sans">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase text-left">Product</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase text-center">Price</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase text-center">Qty</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  <tr className="group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 border border-border-light overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200&h=200&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">Golden Heart Pendant</p>
                          <p className="text-[10px] text-text-secondary mt-1">SKU: ZAG-J-001 • Variant: Rose Gold, M</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">PKR 1,200</td>
                    <td className="px-6 py-4 text-center text-sm">2</td>
                    <td className="px-6 py-4 text-right text-sm font-bold">PKR 2,400</td>
                  </tr>
                  <tr className="group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 border border-border-light overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=200&h=200&fit=crop" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">Silver Hoop Earrings</p>
                          <p className="text-[10px] text-text-secondary mt-1">SKU: ZAG-J-002</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">PKR 850</td>
                    <td className="px-6 py-4 text-center text-sm">1</td>
                    <td className="px-6 py-4 text-right text-sm font-bold">PKR 850</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-gray-50/30 flex flex-col items-end space-y-2 font-sans">
                <div className="flex justify-between w-64 text-sm text-text-secondary">
                  <span>Subtotal</span>
                  <span>PKR 3,250</span>
                </div>
                <div className="flex justify-between w-64 text-sm text-text-secondary">
                  <span>Shipping</span>
                  <span>PKR 250</span>
                </div>
                <div className="h-px bg-border-light w-64 my-2" />
                <div className="flex justify-between w-64 text-lg font-bold text-accent-forest">
                  <span>Total</span>
                  <span>PKR 3,500</span>
                </div>
            </div>
          </Card>

          {/* Activity Log */}
          <Card className="p-8 border-none shadow-sm font-sans">
             <h3 className="text-lg font-serif mb-8">Activity History</h3>
             <div className="space-y-8">
                <div className="flex gap-4 relative">
                   <div className="absolute left-[13px] top-8 w-px h-[calc(100%+32px)] bg-border-light" />
                   <div className="w-7 h-7 bg-blue-50 border border-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0 z-10">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-text-primary">Status Updated to "Confirmed"</p>
                      <p className="text-[11px] text-text-secondary">by Admin Zain at 4:30 PM</p>
                      <div className="mt-2 p-3 bg-gray-50 rounded-xl text-[11px] text-text-secondary border border-border-light">
                        "Payment verified via bank screenshot."
                      </div>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-7 h-7 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 z-10">
                      <Mail className="w-3.5 h-3.5" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-text-primary">Confirmation Email Sent</p>
                      <p className="text-[11px] text-text-secondary">at 3:46 PM (System)</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="w-7 h-7 bg-gray-50 border border-gray-100 text-text-secondary rounded-full flex items-center justify-center shrink-0 z-10">
                      <Clock className="w-3.5 h-3.5" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-sm font-bold text-text-primary">Order Placed</p>
                      <p className="text-[11px] text-text-secondary">at 3:45 PM by Sara Ahmed</p>
                   </div>
                </div>
             </div>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Customer Info Card */}
          <Card className="p-8 border-none shadow-sm space-y-6 font-sans">
            <h3 className="text-lg font-serif">Customer Details</h3>
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-2xl bg-accent-forest text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-accent-forest/10">
                 SA
               </div>
               <div>
                  <h4 className="text-base font-bold text-text-primary">Sara Ahmed</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Customer since Jan 2025</p>
               </div>
            </div>
            
            <div className="space-y-4 pt-6 border-t border-border-light">
               <div className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-border-light flex items-center justify-center group-hover:bg-white transition-colors">
                     <Mail className="w-4 h-4 text-text-secondary group-hover:text-accent-forest" />
                  </div>
                  <p className="text-xs text-text-primary font-medium tracking-tight">sara@email.com</p>
               </div>
               <div className="flex items-center gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 border border-border-light flex items-center justify-center group-hover:bg-white transition-colors">
                     <Phone className="w-4 h-4 text-text-secondary group-hover:text-accent-forest" />
                  </div>
                  <p className="text-xs text-text-primary font-medium tracking-tight">+92 344 7018335</p>
               </div>
            </div>

            <div className="space-y-3">
               <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Shipping Address</p>
                  <button className="text-[10px] font-bold text-accent-forest hover:underline">Edit</button>
               </div>
               <div className="flex gap-3 text-xs text-text-primary leading-relaxed">
                  <MapPin className="w-4 h-4 text-text-secondary shrink-0" />
                  <p>123 Main Street, Sector F-10, Faisalabad, Punjab 38000, Pakistan</p>
               </div>
               <button className="w-full flex items-center justify-center gap-2 py-2 bg-gray-50 rounded-xl text-[10px] font-bold text-text-secondary hover:bg-gray-100 transition-colors">
                  <ExternalLink className="w-3 h-3" /> View on Maps
               </button>
            </div>
          </Card>

          {/* Payment Method Card */}
          <Card className="p-8 border-none shadow-sm space-y-4 font-sans border-t-4 border-t-amber-500">
             <div className="flex items-center justify-between">
                <h3 className="text-lg font-serif">Payment Method</h3>
                <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-lg border border-amber-100">
                  Unpaid
                </span>
             </div>
             <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                   <DollarSign className="w-5 h-5 text-accent-forest" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text-primary">Cash on Delivery</p>
                  <p className="text-[10px] text-text-secondary">Expected collection: PKR 3,500</p>
                </div>
             </div>
             <Button variant="outline" className="w-full border-border-light text-xs font-bold hover:bg-gray-50">
                Mark as Paid
             </Button>
          </Card>

          {/* Additional Notes Card */}
          <Card className="p-8 border-none shadow-sm space-y-4 font-sans bg-accent-forest/5 border border-accent-forest/10">
             <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-accent-forest" />
                <h3 className="text-sm font-bold text-text-primary">Special Instructions</h3>
             </div>
             <p className="text-xs text-text-secondary leading-relaxed italic">
               "Please call me before arriving at the address. I'll be in office during the day."
             </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
