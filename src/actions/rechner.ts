"use server";

import { rechnerFullSchema } from "@/lib/schemas";
import type { RechnerFormData } from "@/types";

export async function submitRechner(data: RechnerFormData) {
  const result = rechnerFullSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Validierungsfehler. Bitte überprüfen Sie Ihre Angaben." };
  }

  // TODO: Integrate with email service or CRM
  // For now, log the submission
  console.log("Rechner submission:", result.data);

  return { success: true };
}
