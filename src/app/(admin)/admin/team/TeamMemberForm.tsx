"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import type { TeamMember } from "@/types";

interface TeamMemberFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  member?: TeamMember;
}

export function TeamMemberForm({ action, member }: TeamMemberFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/team">
      {member?.id && <input type="hidden" name="id" value={member.id} />}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input name="name" defaultValue={member?.name} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rolle</label>
            <input name="role" defaultValue={member?.role} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
          <textarea name="description" defaultValue={member?.description} required rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
      </div>
    </AdminForm>
  );
}
