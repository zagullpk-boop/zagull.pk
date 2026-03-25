import React from "react";
import DashboardOverview from "@/components/admin/DashboardOverview";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  // Authentication is handled by middleware.ts
  
  return <DashboardOverview />;
}
