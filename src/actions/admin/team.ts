"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getTeam, saveTeam } from "@/lib/dal";

export async function createTeamMemberAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const team = await getTeam();
    const maxId = team.reduce((max, m) => Math.max(max, Number(m.id) || 0), 0);
    team.push({
      id: String(maxId + 1),
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      description: formData.get("description") as string,
      order: team.length,
    });
    await saveTeam(team);
    revalidatePath("/", "layout");
  } catch {
    return { error: "Fehler beim Erstellen" };
  }
  redirect("/admin/team");
}

export async function updateTeamMemberAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const id = formData.get("id") as string;
    const team = await getTeam();
    const index = team.findIndex((m) => m.id === id);
    if (index === -1) return { error: "Nicht gefunden" };
    team[index] = {
      ...team[index],
      name: formData.get("name") as string,
      role: formData.get("role") as string,
      description: formData.get("description") as string,
    };
    await saveTeam(team);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}

export async function deleteTeamMemberAction(id: string): Promise<void> {
  const team = await getTeam();
  await saveTeam(team.filter((m) => m.id !== id));
  revalidatePath("/", "layout");
  redirect("/admin/team");
}
