"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPartners, savePartners } from "@/lib/dal";
import { uploadImage } from "./images";

export async function createPartnerAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const partners = await getPartners();
    const maxId = partners.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);

    let logo = formData.get("logo_current") as string || "";
    const file = formData.get("logo") as File;
    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      logo = result.path!;
    }

    partners.push({
      id: String(maxId + 1),
      name: formData.get("name") as string,
      logo,
      featured: formData.get("featured") === "on",
      description: formData.get("description") as string || undefined,
      order: partners.length,
    });
    await savePartners(partners);
    revalidatePath("/", "layout");
  } catch {
    return { error: "Fehler beim Erstellen" };
  }
  redirect("/admin/partners");
}

export async function updatePartnerAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string;
    const partners = await getPartners();
    const index = partners.findIndex((p) => p.id === id);
    if (index === -1) return { error: "Nicht gefunden" };

    let logo = formData.get("logo_current") as string || partners[index].logo;
    const file = formData.get("logo") as File;
    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      logo = result.path!;
    }

    partners[index] = {
      ...partners[index],
      name: formData.get("name") as string,
      logo,
      featured: formData.get("featured") === "on",
      description: formData.get("description") as string || undefined,
    };
    await savePartners(partners);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}

export async function deletePartnerAction(id: string): Promise<void> {
  const partners = await getPartners();
  await savePartners(partners.filter((p) => p.id !== id));
  revalidatePath("/", "layout");
  redirect("/admin/partners");
}
