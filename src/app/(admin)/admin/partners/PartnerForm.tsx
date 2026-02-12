"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import type { Partner } from "@/types";

interface PartnerFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  partner?: Partner;
}

export function PartnerForm({ action, partner }: PartnerFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/partners">
      {partner?.id && <input type="hidden" name="id" value={partner.id} />}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input name="name" defaultValue={partner?.name} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <AdminImageUpload name="logo" currentImage={partner?.logo} label="Logo" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung (optional)</label>
          <textarea name="description" defaultValue={partner?.description} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="featured" id="featured" defaultChecked={partner?.featured} className="rounded border-gray-300" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured (hervorgehoben)</label>
        </div>
      </div>
    </AdminForm>
  );
}
