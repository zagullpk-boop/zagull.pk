"use server";

import { login } from "@/lib/admin/auth-actions";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function authenticate(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return "Please enter both username and password.";
  }

  try {
    // 1. Fetch admin from database
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .single();

    if (error || !admin) {
      return "Invalid username or password.";
    }

    // 2. Verify password
    const isPasswordCorrect = await bcrypt.compare(password, admin.password_hash);
    if (!isPasswordCorrect) {
      return "Invalid username or password.";
    }

    // 3. Create session
    await login(admin.id, admin.username);
    
    // 4. Redirect to dashboard
    // Note: redirect() throws an error, so it must be outside the try/catch or handled.
  } catch (err) {
    console.error("Auth error:", err);
    return "An error occurred during authentication.";
  }

  redirect("/admin/dashboard");
}

export async function setupInitialAdmin() {
  const username = "zagull.pk@gmail.com";
  const password = "10101213";
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("admins")
    .insert([{ username, password_hash: hashedPassword }])
    .select();

  return { data, error };
}
