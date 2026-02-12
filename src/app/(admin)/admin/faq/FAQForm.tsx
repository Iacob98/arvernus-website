"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import type { FAQItem } from "@/types";

interface FAQFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  item?: FAQItem;
  defaultCategory?: string;
}

export function FAQForm({ action, item, defaultCategory }: FAQFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/faq">
      {item?.id && <input type="hidden" name="id" value={item.id} />}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
          <select name="category" defaultValue={defaultCategory || "general"} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
            <option value="general">Allgemein</option>
            <option value="waermepumpen">Wärmepumpen</option>
            <option value="photovoltaik">Photovoltaik</option>
            <option value="foerderung">Förderung</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Frage</label>
          <input name="question" defaultValue={item?.question} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Antwort</label>
          <textarea name="answer" defaultValue={item?.answer} required rows={5} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
      </div>
    </AdminForm>
  );
}
