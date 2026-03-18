"use client";

import React from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Search, Trash2, Reply, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const messages = [
  { id: 1, sender: "Ahmed Malik", email: "ahmed@mail.com", subject: "Order #ZAG-1234 Status", message: "Hi, I haven't received an update on my order yet. Could you please check?", time: "2 hours ago", unread: true },
  { id: 2, sender: "Sobia Khan", email: "sobia@mail.com", subject: "Size Guide Inquiry", message: "Do you have a more detailed size guide for the winter collection tops?", time: "5 hours ago", unread: false },
  { id: 3, sender: "Farhan Saeed", email: "farhan@mail.com", subject: "Partnership Request", message: "We are interested in collaborating with ZAGULL for a local event.", time: "1 day ago", unread: false },
];

export default function AdminMessagesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Messages</h1>
          <p className="text-xs text-text-secondary mt-1">Direct support inquiries from the website contact form.</p>
        </div>
        <div className="flex bg-gray-50 p-1 rounded-xl border border-border-light max-w-fit">
           <button className="px-4 py-1.5 text-xs font-bold bg-white shadow-sm rounded-lg text-accent-forest">Inbox (3)</button>
           <button className="px-4 py-1.5 text-xs font-bold text-text-secondary hover:text-text-primary">Replied</button>
           <button className="px-4 py-1.5 text-xs font-bold text-text-secondary hover:text-text-primary">Archived</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Message List */}
        <Card className="lg:col-span-1 p-0 border-none shadow-sm overflow-hidden h-fit">
          <div className="p-4 border-b border-border-light">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search messages..." 
                  className="w-full bg-gray-50 border-none rounded-xl py-2 pl-10 pr-4 text-xs outline-none"
                />
             </div>
          </div>
          <div className="divide-y divide-border-light">
            {messages.map((msg) => (
              <div key={msg.id} className={cn(
                "p-4 cursor-pointer transition-colors relative",
                msg.unread ? "bg-white" : "bg-gray-50/30 grayscale-[0.5]"
              )}>
                {msg.unread && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-forest" />}
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-bold text-text-primary">{msg.sender}</p>
                  <span className="text-[9px] text-text-secondary font-medium">{msg.time}</span>
                </div>
                <p className="text-[11px] font-bold text-accent-forest truncate">{msg.subject}</p>
                <p className="text-[11px] text-text-secondary line-clamp-2 mt-1 leading-relaxed">{msg.message}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Message Detail View Placeholder */}
        <Card className="lg:col-span-2 p-12 border-none shadow-sm flex flex-col items-center justify-center text-center space-y-4">
           <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-accent-forest/20">
              <MessageSquare className="w-10 h-10" />
           </div>
           <div>
              <h3 className="text-xl font-serif text-text-primary">Select a message</h3>
              <p className="text-xs text-text-secondary font-sans mt-1">Choose a support ticket from the sidebar to view full conversation and reply.</p>
           </div>
           <Button variant="outline" className="border-border-light text-xs font-bold">Refresh Inbox</Button>
        </Card>
      </div>
    </div>
  );
}
