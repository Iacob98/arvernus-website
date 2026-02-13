"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  getContactSubmissions,
  saveContactSubmissions,
  getRechnerSubmissions,
  saveRechnerSubmissions,
} from "@/lib/dal";

export async function deleteContactSubmissionAction(id: string): Promise<void> {
  const submissions = await getContactSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);
  await saveContactSubmissions(filtered);
  revalidatePath("/admin/submissions");
  redirect("/admin/submissions");
}

export async function deleteRechnerSubmissionAction(id: string): Promise<void> {
  const submissions = await getRechnerSubmissions();
  const filtered = submissions.filter((s) => s.id !== id);
  await saveRechnerSubmissions(filtered);
  revalidatePath("/admin/submissions");
  redirect("/admin/submissions");
}

export async function markContactReadAction(id: string): Promise<void> {
  const submissions = await getContactSubmissions();
  const index = submissions.findIndex((s) => s.id === id);
  if (index !== -1) {
    submissions[index].read = !submissions[index].read;
    await saveContactSubmissions(submissions);
  }
  revalidatePath("/admin/submissions");
}

export async function markRechnerReadAction(id: string): Promise<void> {
  const submissions = await getRechnerSubmissions();
  const index = submissions.findIndex((s) => s.id === id);
  if (index !== -1) {
    submissions[index].read = !submissions[index].read;
    await saveRechnerSubmissions(submissions);
  }
  revalidatePath("/admin/submissions");
}
