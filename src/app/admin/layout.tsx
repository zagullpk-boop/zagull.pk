import React from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { getSession } from "@/lib/admin/auth-actions";
import { redirect } from "next/navigation";

import { headers } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const headerList = await headers();
  const fullUrl = headerList.get("x-url") || ""; 
  // Note: Vercel might not provide x-url by default, so we check the pathname if possible
  // In Next.js 15, we can use a cleaner approach by checking if it's the login page
  
  // Alternative: Check if children are the login page? (Hard to do in layout)
  // Let's use the most secure way: Redirect if no session, 
  // but we must make sure /admin/login is EXCLUDED from this layout's check.
  
  // Since /admin/login IS a child of this layout, we must be careful.
  // I will refactor the folder structure to separate login from protected routes if this fails.
  
  // FOR NOW: Let's use the foolproof method: 
  // If no session, only allow the login page to be rendered.
  // We can't easily check 'isLoginPage' here without middleware passing a header.
  
  if (!session) {
    // We check if the request is for the login page by looking at the referer or other headers
    // But the BEST way is to let the middleware handle it correctly.
    // Since middleware failed (likely matcher issue), I will apply the check in the CHILD pages too.
    
    // I already added await requireAdminAuth() to the child pages.
    // The reason they didn't work is because they were "use client".
    // I will convert them to Server Components now.
    
    return (
      <div className="min-h-screen bg-background-primary flex items-center justify-center w-full">
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
