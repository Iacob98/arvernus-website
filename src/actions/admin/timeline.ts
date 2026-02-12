"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getTimeline, saveTimeline } from "@/lib/dal";

export async function updateTimelineAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const count = Number(formData.get("count")) || 0;
    const timeline = [];
    for (let i = 0; i < count; i++) {
      timeline.push({
        id: (formData.get(`id_${i}`) as string) || String(i + 1),
        year: Number(formData.get(`year_${i}`)) || 2024,
        title: formData.get(`title_${i}`) as string || "",
        description: formData.get(`description_${i}`) as string || "",
        order: i,
      });
    }
    await saveTimeline(timeline);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}

export async function addTimelineEventAction(): Promise<void> {
  const timeline = await getTimeline();
  const maxId = timeline.reduce((max, e) => Math.max(max, Number(e.id) || 0), 0);
  timeline.push({
    id: String(maxId + 1),
    year: new Date().getFullYear(),
    title: "Neues Ereignis",
    description: "Beschreibung",
    order: timeline.length,
  });
  await saveTimeline(timeline);
  revalidatePath("/admin/timeline");
  redirect("/admin/timeline");
}

export async function deleteTimelineEventAction(id: string): Promise<void> {
  const timeline = await getTimeline();
  await saveTimeline(timeline.filter((e) => e.id !== id));
  revalidatePath("/", "layout");
  redirect("/admin/timeline");
}
