"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import type { Project } from "@/types";

interface ProjectFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  project?: Project;
}

export function ProjectForm({ action, project }: ProjectFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/projects">
      {project?.id && <input type="hidden" name="id" value={project.id} />}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
            <input name="title" defaultValue={project?.title} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
            <textarea name="description" defaultValue={project?.description} required rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
            <select name="category" defaultValue={project?.category || "waermepumpe"} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
              <option value="waermepumpe">Wärmepumpe</option>
              <option value="photovoltaik">Photovoltaik</option>
              <option value="kombiniert">Kombiniert</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ort</label>
            <input name="location" defaultValue={project?.location} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jahr</label>
            <input name="year" type="number" defaultValue={project?.year || new Date().getFullYear()} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Spezifikationen (eine pro Zeile)</label>
          <textarea name="specs" defaultValue={project?.specs?.join("\n")} rows={4} placeholder="z.B. 10 kWp Photovoltaikanlage&#10;Luft-Wasser-Wärmepumpe" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <AdminImageUpload name="image" currentImage={project?.image} label="Projektbild" />
      </div>
    </AdminForm>
  );
}
