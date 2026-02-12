"use server";

import { contactFormSchema } from "@/lib/schemas";
import type { ContactFormData } from "@/types";

export async function submitContact(data: ContactFormData) {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Validierungsfehler. Bitte überprüfen Sie Ihre Angaben." };
  }

  // TODO: Integrate with email service or CRM
  console.log("Contact submission:", result.data);

  return { success: true };
}
