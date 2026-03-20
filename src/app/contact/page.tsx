"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { 
  ZAGULL_PHONE, 
  ZAGULL_WHATSAPP, 
  ZAGULL_EMAIL, 
  ZAGULL_ADDRESS 
} from "@/lib/constants";

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
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-primary">
      <Navbar />
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-6xl font-serif text-text-primary">Get in Touch</h1>
            <p className="text-text-secondary font-sans leading-relaxed">
              Have questions about our collection or your order? We&apos;re here to help. Reach out to us via the form or our contact details.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-accent-forest transition-colors">
                  <Mail className="w-5 h-5 text-accent-forest group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Email</p>
                  <a href={`mailto:${ZAGULL_EMAIL}`} className="text-text-primary font-medium hover:text-accent-forest transition-colors">{ZAGULL_EMAIL}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-accent-forest transition-colors">
                  <Phone className="w-5 h-5 text-accent-forest group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Phone</p>
                  <a href={ZAGULL_WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-text-primary font-medium hover:text-accent-forest transition-colors">{ZAGULL_PHONE}</a>
                </div>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-accent-forest transition-colors">
                  <MapPin className="w-5 h-5 text-accent-forest group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-text-secondary">Location</p>
                  <p className="text-text-primary font-medium">{ZAGULL_ADDRESS}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-border-light shadow-sm">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full py-16 space-y-6 text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-accent-forest/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-accent-forest" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-serif text-text-primary">Message Sent!</h3>
                  <p className="text-text-secondary font-sans text-sm">
                    Thank you, {formData.name}. We&apos;ll get back to you within 24 hours at {formData.email}.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setStatus("idle");
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">Subject</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What are you inquiring about?"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-secondary">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full min-h-[150px] p-4 rounded-xl border border-border-light bg-background-primary focus:outline-none focus:ring-2 focus:ring-accent-forest/20 focus:border-accent-forest transition-all text-sm font-sans"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                  <Button type="submit" className="w-full h-12" disabled={status === "loading"}>
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>
                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-500 text-xs font-medium justify-center animate-in fade-in slide-in-from-top-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Something went wrong. Please try again or WhatsApp us directly.
                    </div>
                  )}
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
