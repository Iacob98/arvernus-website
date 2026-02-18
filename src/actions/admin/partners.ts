"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getPartners, savePartners } from "@/lib/dal";
import { uploadImage } from "./images";

const MAX_FEATURED = 4;

function parseFeaturedFields(formData: FormData) {
  const featured = formData.get("featured") === "on";
  if (!featured) return { featured: false } as const;

  let benefits: string[] = [];
  try {
    const raw = formData.get("benefits") as string;
    if (raw) benefits = JSON.parse(raw).filter((s: string) => s.trim());
  } catch { /* ignore */ }

  return {
    featured: true,
    badge: (formData.get("badge") as string) || undefined,
    featuredText: (formData.get("featuredText") as string) || undefined,
    benefits: benefits.length > 0 ? benefits : undefined,
  };
}

export async function createPartnerAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const partners = await getPartners();
    const maxId = partners.reduce((max, p) => Math.max(max, Number(p.id) || 0), 0);

    const featuredFields = parseFeaturedFields(formData);
    const currentFeatured = partners.filter((p) => p.featured).length;
    if (featuredFields.featured && currentFeatured >= MAX_FEATURED) {
      return { error: `Maximal ${MAX_FEATURED} Featured-Partner erlaubt.` };
    }

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
      description: (formData.get("description") as string) || undefined,
      ...featuredFields,
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

    const featuredFields = parseFeaturedFields(formData);
    const currentFeatured = partners.filter((p) => p.featured && p.id !== id).length;
    if (featuredFields.featured && currentFeatured >= MAX_FEATURED) {
      return { error: `Maximal ${MAX_FEATURED} Featured-Partner erlaubt.` };
    }

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
      description: (formData.get("description") as string) || undefined,
      ...featuredFields,
    };

    // Clean featured fields if not featured
    if (!featuredFields.featured) {
      delete partners[index].badge;
      delete partners[index].featuredText;
      delete partners[index].benefits;
    }

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
