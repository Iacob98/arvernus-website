"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getHeroSlides, saveHeroSlides } from "@/lib/dal";
import { uploadImage } from "./images";

export async function createHeroSlideAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const slides = await getHeroSlides();
    const maxId = slides.reduce((max, s) => Math.max(max, Number(s.id) || 0), 0);

    const file = formData.get("image") as File;
    if (!file || file.size === 0) {
      return { error: "Bild ist erforderlich" };
    }
    const result = await uploadImage(file);
    if (result.error) return { error: result.error };

    slides.push({
      id: String(maxId + 1),
      image: result.path!,
      title: (formData.get("title") as string) || undefined,
      subtitle: (formData.get("subtitle") as string) || undefined,
      order: slides.length,
    });
    await saveHeroSlides(slides);
    revalidatePath("/", "layout");
  } catch {
    return { error: "Fehler beim Erstellen" };
  }
  redirect("/admin/hero-slider");
}

export async function updateHeroSlideAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string;
    const slides = await getHeroSlides();
    const index = slides.findIndex((s) => s.id === id);
    if (index === -1) return { error: "Nicht gefunden" };

    let image = formData.get("image_current") as string || slides[index].image;
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      image = result.path!;
    }

    slides[index] = {
      ...slides[index],
      image,
      title: (formData.get("title") as string) || undefined,
      subtitle: (formData.get("subtitle") as string) || undefined,
    };
    await saveHeroSlides(slides);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}

export async function deleteHeroSlideAction(id: string): Promise<void> {
  const slides = await getHeroSlides();
  await saveHeroSlides(slides.filter((s) => s.id !== id));
  revalidatePath("/", "layout");
  redirect("/admin/hero-slider");
}

export async function reorderHeroSlidesAction(orderedIds: string[]): Promise<void> {
  const slides = await getHeroSlides();
  const reordered = orderedIds
    .map((id, i) => {
      const slide = slides.find((s) => s.id === id);
      if (!slide) return null;
      return { ...slide, order: i };
    })
    .filter(Boolean) as typeof slides;
  await saveHeroSlides(reordered);
  revalidatePath("/", "layout");
}
