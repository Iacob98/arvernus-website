"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getTestimonials, saveTestimonials } from "@/lib/dal";
import { uploadImage } from "./images";

export async function createTestimonialAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const testimonials = await getTestimonials();
    const maxId = testimonials.reduce((max, t) => Math.max(max, Number(t.id) || 0), 0);

    let image = formData.get("image_current") as string || undefined;
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      image = result.path!;
    }

    const newItem = {
      id: String(maxId + 1),
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      rating: Number(formData.get("rating")) || 5,
      text: formData.get("text") as string,
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      image: image || undefined,
      order: testimonials.length,
    };
    testimonials.push(newItem);
    await saveTestimonials(testimonials);
    revalidatePath("/", "layout");
  } catch {
    return { error: "Fehler beim Erstellen" };
  }
  redirect("/admin/testimonials");
}

export async function updateTestimonialAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string;
    const testimonials = await getTestimonials();
    const index = testimonials.findIndex((t) => t.id === id);
    if (index === -1) return { error: "Nicht gefunden" };

    let image = formData.get("image_current") as string || testimonials[index].image;
    const file = formData.get("image") as File;
    if (file && file.size > 0) {
      const result = await uploadImage(file);
      if (result.error) return { error: result.error };
      image = result.path!;
    }

    testimonials[index] = {
      ...testimonials[index],
      name: formData.get("name") as string,
      location: formData.get("location") as string,
      rating: Number(formData.get("rating")) || 5,
      text: formData.get("text") as string,
      service: formData.get("service") as string,
      date: formData.get("date") as string,
      image: image || undefined,
    };
    await saveTestimonials(testimonials);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}

export async function deleteTestimonialAction(id: string): Promise<void> {
  const testimonials = await getTestimonials();
  const filtered = testimonials.filter((t) => t.id !== id);
  await saveTestimonials(filtered);
  revalidatePath("/", "layout");
  redirect("/admin/testimonials");
}
