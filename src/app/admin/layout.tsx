import React from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex overflow-hidden">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <Sidebar className="h-screen sticky top-0" />
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-y-auto bg-[#fdf6f0]/30">
        <AdminHeader />
        <main className="p-8 max-w-[1600px] mx-auto w-full">
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
