"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("zagull_admin_token")?.value;
  const secretToken = process.env.ADMIN_SECRET_TOKEN;

  if (!token || !secretToken || token !== secretToken) {
    redirect("/admin/login");
  }

  return { authenticated: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("zagull_admin_token", "", { expires: new Date(0), path: "/" });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("zagull_admin_token")?.value;
  const secretToken = process.env.ADMIN_SECRET_TOKEN;

  if (!token || !secretToken || token !== secretToken) return null;
  return { authenticated: true };
}
