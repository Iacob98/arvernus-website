"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import type { TimelineEvent } from "@/types";

interface TimelineEditorProps {
  timeline: TimelineEvent[];
  updateAction: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  deleteAction: (id: string) => Promise<void>;
}

export function TimelineEditor({ timeline, updateAction, deleteAction }: TimelineEditorProps) {
  const sorted = [...timeline].sort((a, b) => (a.year ?? 0) - (b.year ?? 0));

  return (
    <AdminForm action={updateAction} backHref="/admin">
      <input type="hidden" name="count" value={sorted.length} />
      <div className="space-y-4">
        {sorted.map((event, i) => (
          <div key={event.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex items-start justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">Ereignis {i + 1}</span>
              <DeleteConfirmDialog
                onDelete={() => deleteAction(event.id!)}
                itemName="dieses Ereignis"
              />
            </div>
            <input type="hidden" name={`id_${i}`} value={event.id} />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jahr</label>
                <input name={`year_${i}`} type="number" defaultValue={event.year} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                <input name={`title_${i}`} defaultValue={event.title} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                <textarea name={`description_${i}`} defaultValue={event.description} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
            </div>
          </div>
        ))}
        {sorted.length === 0 && (
          <p className="text-center text-gray-500 py-8">Keine Ereignisse vorhanden.</p>
        )}
      </div>
    </AdminForm>
  );
}
