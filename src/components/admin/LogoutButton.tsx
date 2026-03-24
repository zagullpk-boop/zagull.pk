"use client";

import React from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const [isPending, setIsPending] = React.useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsPending(true);
    try {
      // We can't use the 'logout' server action directly in a client component easily without 'useActionState' 
      // or similar if it's not a form action. But we can just call it if it's exported as a server action.
      // Alternatively, we can use a dedicated API route or just the server action.
      const { logout: logoutAction } = await import("@/lib/admin/auth-actions");
      await logoutAction();
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all w-full"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
      Logout
    </button>
  );
}
