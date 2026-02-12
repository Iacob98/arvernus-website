"use server";

import { redirect } from "next/navigation";
import { verifyPassword, createToken, setTokenCookie, deleteTokenCookie } from "@/lib/auth";

export async function loginAction(
  _prevState: { error?: string } | null,
  formData: FormData
): Promise<{ error?: string }> {
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
