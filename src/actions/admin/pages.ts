"use server";

import { revalidatePath } from "next/cache";
import { getPages, savePages } from "@/lib/dal";

export async function updatePageAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const slug = formData.get("slug") as string;
    const pages = await getPages();
    const content: Record<string, Record<string, unknown>> = {};

    // Collect all field keys for this page
    for (const [key, value] of formData.entries()) {
      if (key === "slug") continue;
      // Keys follow pattern: section.field (e.g., hero.title)
      const parts = key.split(".");
      if (parts.length === 2) {
        const [section, field] = parts;
        if (!content[section]) content[section] = {};
        content[section][field] = value;
      }
    }

    pages[slug] = content;
    await savePages(pages);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}
