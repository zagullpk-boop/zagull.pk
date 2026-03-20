"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Search, Filter, MoreHorizontal, Mail, Phone, Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const customers = [
  { id: 1, name: "Sara Ahmed", email: "sara@example.com", phone: "+92 344 7018335", orders: 5, spent: "PKR 12,450", lastOrder: "2 days ago" },
  { id: 2, name: "Ali Hassan", email: "ali@example.com", phone: "+92 321 7654321", orders: 2, spent: "PKR 4,200", lastOrder: "15 mins ago" },
  { id: 3, name: "Ayesha Khan", email: "ayesha@example.com", phone: "+92 345 9876543", orders: 8, spent: "PKR 22,100", lastOrder: "1 week ago" },
  { id: 4, name: "Zainab Bibi", email: "zainab@example.com", phone: "+92 312 3456789", orders: 1, spent: "PKR 1,500", lastOrder: "3 hours ago" },
];

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Customers</h1>
          <p className="text-xs text-text-secondary mt-1">Manage your customer relationships and order history.</p>
        </div>
        <Button className="bg-accent-forest h-10 px-6 text-xs font-sans font-bold">
          Add New Customer
        </Button>
      </div>

      <Card className="p-4 border-none shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <Input 
              placeholder="Search by name, email, phone..." 
              className="pl-10 bg-gray-50/50 border-border-light"
            />
          </div>
          <Button variant="outline" className="h-11 px-4 border-border-light font-sans font-bold text-xs gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>
      </Card>

      <Card className="p-0 border-none shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto font-sans">
          <table className="w-full text-left">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-center">Orders</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-center">Total Spent</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">Last Order</th>
                <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-accent-forest/5 text-accent-forest flex items-center justify-center font-bold text-xs border border-accent-forest/10">
                        {customer.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">{customer.name}</p>
                        <p className="text-[10px] text-text-secondary mt-0.5">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-text-primary">{customer.orders}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-bold text-accent-forest">{customer.spent}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 text-text-secondary text-xs">
                       <Calendar className="w-3 h-3 opacity-50" />
                       {customer.lastOrder}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border-light transition-all">
                        <ArrowUpRight className="w-4 h-4 text-text-secondary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
