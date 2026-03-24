import React from "react";
import { requireAdminAuth } from "@/lib/admin/auth-actions";
import DashboardOverview from "@/components/admin/DashboardOverview";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // This runs ONLY on the server
  await requireAdminAuth();
  
  return <DashboardOverview />;
}
