"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Search, Trash2, Reply, CheckCircle, Clock, Loader2, User, Mail, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { createBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedMsg, setSelectedMsg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    await supabase.from('messages').update({ is_read: true }).eq('id', id);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, is_read: true } : m));
    if (selectedMsg?.id === id) setSelectedMsg({ ...selectedMsg, is_read: true });
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    await supabase.from('messages').delete().eq('id', id);
    setMessages(prev => prev.filter(m => m.id !== id));
    if (selectedMsg?.id === id) setSelectedMsg(null);
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase())
  );

  const unreadCount = messages.filter(m => !m.is_read).length;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-serif text-gray-900 tracking-tight">Support Inbox</h1>
          <p className="text-gray-400 text-sm mt-1">Direct inquiries from your customers via ZAGULL.PK</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 min-w-fit">
           <button className="px-6 py-2.5 text-[10px] font-bold bg-gray-900 text-white shadow-lg shadow-gray-900/10 rounded-xl uppercase tracking-widest transition-all">
             Inbox ({unreadCount})
           </button>
           <button className="px-6 py-2.5 text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest">
             Archive
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[75vh]">
        {/* Message List */}
        <Card className="lg:col-span-1 p-0 border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] bg-white overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-50 flex-shrink-0">
             <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="text" 
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search sender or subject..." 
                  className="w-full bg-gray-50 border-none rounded-2xl py-3 pl-12 pr-4 text-xs focus:ring-1 focus:ring-accent-forest/10 outline-none transition-all"
                />
             </div>
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar divide-y divide-gray-50">
            {loading ? (
              <div className="p-20 text-center"><Loader2 className="w-6 h-6 animate-spin text-accent-forest mx-auto opacity-20" /></div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-20 text-center text-gray-400 font-serif italic text-sm">No messages found.</div>
            ) : (
              filteredMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  onClick={() => { setSelectedMsg(msg); if (!msg.is_read) markAsRead(msg.id); }}
                  className={cn(
                  "p-6 cursor-pointer transition-all relative group",
                  selectedMsg?.id === msg.id ? "bg-accent-forest/[0.03]" : "hover:bg-gray-50/50",
                  !msg.is_read && "font-bold"
                )}
                >
                  {!msg.is_read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-forest" />}
                  <div className="flex justify-between items-start mb-2">
                    <p className={cn("text-xs tracking-tight", !msg.is_read ? "text-gray-900" : "text-gray-500")}>{msg.name}</p>
                    <span className="text-[9px] text-gray-300 font-bold uppercase tracking-wider">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={cn("text-[11px] truncate", !msg.is_read ? "text-accent-forest" : "text-gray-400 font-medium")}>
                    {msg.subject || "(No Subject)"}
                  </p>
                  <p className="text-[11px] text-gray-400 line-clamp-1 mt-1 font-medium leading-relaxed opacity-60">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Message Detail View */}
        <Card className="lg:col-span-2 p-0 border-none shadow-xl shadow-gray-100/50 rounded-[2.5rem] bg-white flex flex-col overflow-hidden">
           {selectedMsg ? (
             <div className="flex flex-col h-full animate-in fade-in duration-300">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-accent-forest text-white rounded-[1.25rem] flex items-center justify-center font-bold text-lg shadow-lg shadow-accent-forest/10">
                        {selectedMsg.name[0].toUpperCase()}
                      </div>
                      <div>
                         <h3 className="text-xl font-serif text-gray-900">{selectedMsg.name}</h3>
                         <p className="text-xs text-gray-400 font-medium">{selectedMsg.email}</p>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button 
                        onClick={() => deleteMessage(selectedMsg.id)}
                        className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button className="p-3 text-gray-300 hover:text-accent-forest hover:bg-accent-forest/5 rounded-xl transition-all">
                        <Reply className="w-5 h-5" />
                      </button>
                   </div>
                </div>
                
                <div className="flex-grow p-10 overflow-y-auto space-y-8 custom-scrollbar">
                   <div className="space-y-10 max-w-2xl">
                      <div className="space-y-2">
                         <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Subject</span>
                         <h4 className="text-lg font-bold text-gray-900 leading-tight">{selectedMsg.subject || "No Subject Provided"}</h4>
                      </div>

                      <div className="space-y-4">
                         <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Message Body</span>
                         <div className="text-sm text-gray-600 leading-[1.8] font-medium whitespace-pre-wrap bg-gray-50/50 p-8 rounded-[2rem] border border-gray-50">
                           {selectedMsg.message}
                         </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-6 bg-white border border-gray-100 rounded-3xl space-y-1">
                            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Received via</span>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                               <MessageSquare className="w-3.5 h-3.5 text-accent-forest" /> Contact Form
                            </div>
                         </div>
                         <div className="p-6 bg-white border border-gray-100 rounded-3xl space-y-1">
                            <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Timestamp</span>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                               <Calendar className="w-3.5 h-3.5 text-accent-forest" /> {new Date(selectedMsg.created_at).toLocaleString()}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="p-8 border-t border-gray-50 bg-gray-50/30 flex justify-between items-center">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <Clock className="w-3 h-3" /> Awaiting response
                   </div>
                   <Button className="bg-gray-900 text-white rounded-xl px-10 py-4 font-bold text-[11px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-gray-900/10 gap-2">
                      <Reply className="w-4 h-4" /> Send Reply
                   </Button>
                </div>
             </div>
           ) : (
             <div className="h-full flex flex-col items-center justify-center text-center p-20 space-y-6">
                <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-accent-forest/10 border border-gray-100 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                   <MessageSquare className="w-10 h-10" />
                </div>
                <div className="max-w-xs">
                   <h3 className="text-2xl font-serif text-gray-900 leading-tight italic">Your support team is ready.</h3>
                   <p className="text-xs text-gray-400 font-medium mt-3 leading-relaxed">Select a support ticket from the inbox to view the conversation and help your customers.</p>
                </div>
                <div className="pt-4">
                   <span className="text-[10px] font-bold text-gray-300 bg-gray-50 px-4 py-1.5 rounded-full uppercase tracking-widest border border-gray-100">
                     End-to-End Encrypted
                   </span>
                </div>
             </div>
           )}
        </Card>
      </div>
    </div>
  );
}
