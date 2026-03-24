import React from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { getSession } from "@/lib/admin/auth-actions";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  // If there's no session, we're likely on the login page or unauthorized.
  // In those cases, we render the children without the sidebar.
  if (!session) {
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary flex overflow-hidden">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block w-72 flex-shrink-0">
        <Sidebar className="h-screen sticky top-0" />
      </div>

      {/* Main Content */}
      <div className="flex-grow transition-all duration-300">
        <main className="p-8 max-w-[1600px] mx-auto min-h-screen">
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
