"use server";

import { cookies } from "next/headers";
import { encrypt, decrypt } from "../auth";

export async function login(adminId: string, username: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ adminId, username, expires });

  (await cookies()).set("admin_session", session, { expires, httpOnly: true, secure: true });
}

export async function logout() {
  (await cookies()).set("admin_session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = (await cookies()).get("admin_session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
