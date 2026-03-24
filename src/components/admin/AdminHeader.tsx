"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdminHeader() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="h-16 border-b border-[#c9956c]/10 bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-[#8b6e5a]">
          Dashboard Control
        </h2>
      </div>
      
      <Button
        onClick={handleLogout}
        disabled={isLoggingOut}
        variant="outline"
        className="h-9 px-4 rounded-full border-[#c9956c]/20 text-[#8b6e5a] hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all duration-300 gap-2 text-xs font-semibold"
      >
        {isLoggingOut ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </>
        )}
      </Button>
    </header>
  );
}
