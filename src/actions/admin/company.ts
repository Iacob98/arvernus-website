"use server";

import { revalidatePath } from "next/cache";
import { getCompany, saveCompany } from "@/lib/dal";
import type { CompanyData } from "@/types";

export async function updateCompanyAction(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData
): Promise<{ success?: boolean; error?: string }> {
  try {
    const current = await getCompany();
    const updated: CompanyData = {
      ...current,
      name: formData.get("name") as string || current.name,
      fullName: formData.get("fullName") as string || current.fullName,
      tagline: formData.get("tagline") as string || current.tagline,
      foundedYear: Number(formData.get("foundedYear")) || current.foundedYear,
      phone: formData.get("phone") as string || current.phone,
      phoneDisplay: formData.get("phoneDisplay") as string || current.phoneDisplay,
      email: formData.get("email") as string || current.email,
      whatsapp: formData.get("whatsapp") as string || current.whatsapp,
      website: formData.get("website") as string || current.website,
      address: {
        street: formData.get("street") as string || current.address.street,
        zip: formData.get("zip") as string || current.address.zip,
        city: formData.get("city") as string || current.address.city,
        state: formData.get("state") as string || current.address.state,
        country: formData.get("country") as string || current.address.country,
      },
      hours: {
        weekdays: formData.get("weekdays") as string || current.hours.weekdays,
        saturday: formData.get("saturday") as string || current.hours.saturday,
        sunday: formData.get("sunday") as string || current.hours.sunday,
      },
      social: {
        facebook: formData.get("facebook") as string || current.social.facebook,
        instagram: formData.get("instagram") as string || current.social.instagram,
        linkedin: formData.get("linkedin") as string || current.social.linkedin,
      },
      stats: {
        projectsCompleted: Number(formData.get("projectsCompleted")) || current.stats.projectsCompleted,
        satisfactionRate: Number(formData.get("satisfactionRate")) || current.stats.satisfactionRate,
        maxFoerderung: Number(formData.get("maxFoerderung")) || current.stats.maxFoerderung,
      },
    };

    await saveCompany(updated);
    revalidatePath("/", "layout");
    return { success: true };
  } catch {
    return { error: "Fehler beim Speichern" };
  }
}
