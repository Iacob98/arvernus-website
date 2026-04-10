"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { verifyPassword, createToken, setTokenCookie, deleteTokenCookie } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const { success: allowed } = rateLimit(`login:${ip}`, { maxRequests: 3, windowMs: 60_000 });
  if (!allowed) {
    return { error: "Zu viele Anmeldeversuche. Bitte warten Sie eine Minute." };
  }

  const password = formData.get("password") as string;

  if (!password) {
    return { error: "Bitte Passwort eingeben" };
  }

  const valid = await verifyPassword(password);
  if (!valid) {
    return { error: "Falsches Passwort" };
  }

  const token = await createToken();
  await setTokenCookie(token);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await deleteTokenCookie();
  redirect("/admin/login");
}
