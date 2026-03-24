"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Instagram, MessageCircle } from "lucide-react";
import { 
  ZAGULL_PHONE, 
  ZAGULL_WHATSAPP, 
  ZAGULL_EMAIL, 
  ZAGULL_ADDRESS 
} from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f0]">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section 11A: Breadcrumb Integration */}
          <Breadcrumb 
            items={[{ label: "Contact Us" }]} 
            className="mb-12"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Section 5B: Left Info Column */}
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c9956c]">Contact Us</p>
                <h1 className="text-5xl md:text-7xl font-serif text-[#2d1b10] leading-tight">We&apos;d Love to Hear from You</h1>
                <p className="text-[#8b6e5a] text-lg font-medium leading-relaxed max-w-lg">
                  Whether you have a question about our collection, your order, or just want to say hello, our team in Faisalabad is ready to help.
                </p>
              </div>
              
              <div className="space-y-10 pt-4">
                <div className="flex items-center space-x-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-[#c9956c]/5 border border-[#c9956c]/10 group-hover:bg-[#c9956c] transition-all duration-300">
                    <Mail className="w-6 h-6 text-[#c9956c] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b6e5a] mb-1">Email</p>
                    <a href={`mailto:${ZAGULL_EMAIL}`} className="text-lg font-serif text-[#2d1b10] hover:text-[#c9956c] transition-colors">{ZAGULL_EMAIL}</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-[#c9956c]/5 border border-[#c9956c]/10 group-hover:bg-[#c9956c] transition-all duration-300">
                    <Phone className="w-6 h-6 text-[#c9956c] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b6e5a] mb-1">WhatsApp</p>
                    <a href={ZAGULL_WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-lg font-serif text-[#2d1b10] hover:text-[#c9956c] transition-colors">{ZAGULL_PHONE}</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-lg shadow-[#c9956c]/5 border border-[#c9956c]/10 group-hover:bg-[#c9956c] transition-all duration-300">
                    <MapPin className="w-6 h-6 text-[#c9956c] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8b6e5a] mb-1">Visit Us</p>
                    <p className="text-lg font-serif text-[#2d1b10]">{ZAGULL_ADDRESS}</p>
                  </div>
                </div>
              </div>

              {/* Social Links under contact info - Section 5D */}
              <div className="pt-12 border-t border-[#c9956c]/10">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b6e5a] mb-8">Follow Our Story</p>
                <div className="flex gap-4">
                  <Link 
                    href="https://facebook.com/zagull.pk" 
                    target="_blank" 
                    className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-[#c9956c]/5 border border-[#c9956c]/10 hover:bg-[#c9956c] group transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-[#8b6e5a] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </Link>
                  <Link 
                    href="https://instagram.com/zagull.pk" 
                    target="_blank" 
                    className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-[#c9956c]/5 border border-[#c9956c]/10 hover:bg-[#c9956c] group transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5 text-[#8b6e5a] group-hover:text-white transition-colors" />
                  </Link>
                  <Link 
                    href="https://tiktok.com/@zagull.pk" 
                    target="_blank" 
                    className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-[#c9956c]/5 border border-[#c9956c]/10 hover:bg-[#c9956c] group transition-all duration-300"
                  >
                    <svg className="w-5 h-5 text-[#8b6e5a] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 448 512">
                      <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14z"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Section 5A: Right Form Column */}
            <div className="bg-white p-12 md:p-16 rounded-[3rem] border border-[#c9956c]/10 shadow-2xl shadow-[#c9956c]/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9956c]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
              
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center h-full py-12 space-y-8 text-center animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-[#25D366]/10 rounded-full flex items-center justify-center border border-[#25D366]/20 shadow-xl shadow-[#25D366]/10">
                    <CheckCircle2 className="w-12 h-12 text-[#25D366]" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-4xl font-serif text-[#2d1b10]">Message Sent!</h3>
                    <p className="text-[#8b6e5a] font-medium max-w-xs leading-relaxed">
                      Thank you! We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                  <Button
                    onClick={() => setStatus("idle")}
                    className="bg-[#c9956c] text-white px-10 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#2d1b10] transition-all duration-300"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b6e5a]">Full Name</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="h-14 bg-[#fdf6f0]/30 border-[#c9956c]/10 rounded-2xl focus:ring-[#c9956c]/20 focus:border-[#c9956c] text-[#2d1b10] font-medium"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b6e5a]">Email Address</label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="h-14 bg-[#fdf6f0]/30 border-[#c9956c]/10 rounded-2xl focus:ring-[#c9956c]/20 focus:border-[#c9956c] text-[#2d1b10] font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8b6e5a]">How Can We Help?</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full min-h-[180px] p-6 rounded-[2rem] border border-[#c9956c]/10 bg-[#fdf6f0]/30 focus:outline-none focus:ring-4 focus:ring-[#c9956c]/5 focus:border-[#c9956c] transition-all text-[#2d1b10] font-medium placeholder-[#8b6e5a]/40"
                      placeholder="Write your message here..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={status === "loading"}
                    className={cn(
                      "w-full h-14 rounded-2xl text-xs font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-xl",
                      status === "loading" 
                        ? "bg-[#8b6e5a] cursor-not-allowed" 
                        : "bg-[#c9956c] text-white hover:bg-[#2d1b10] shadow-[#c9956c]/20 hover:shadow-[#2d1b10]/20"
                    )}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>

                  {status === "error" && (
                    <div className="flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest justify-center animate-bounce">
                      <AlertCircle className="w-4 h-4" />
                      Error sending message. Try WhatsApp!
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
