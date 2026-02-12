"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import type { Service, WaermepumpenType } from "@/types";

interface ServicesEditorProps {
  data: { services: Service[]; waermepumpenTypes: WaermepumpenType[] };
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
}

export function ServicesEditor({ data, action }: ServicesEditorProps) {
  return (
    <AdminForm action={action} backHref="/admin">
      <input type="hidden" name="serviceCount" value={data.services.length} />
      <input type="hidden" name="wpCount" value={data.waermepumpenTypes.length} />

      {/* Services */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dienstleistungen</h2>
        <div className="space-y-4">
          {data.services.map((service, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <span className="text-sm font-medium text-gray-500 mb-2 block">Dienstleistung {i + 1}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                  <input name={`service_title_${i}`} defaultValue={service.title} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link (href)</label>
                  <input name={`service_href_${i}`} defaultValue={service.href} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                  <input name={`service_icon_${i}`} defaultValue={service.icon} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                  <textarea name={`service_description_${i}`} defaultValue={service.description} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (eine pro Zeile)</label>
                  <textarea name={`service_features_${i}`} defaultValue={service.features.join("\n")} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wärmepumpentypen */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Wärmepumpentypen</h2>
        <div className="space-y-4">
          {data.waermepumpenTypes.map((wp, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <span className="text-sm font-medium text-gray-500 mb-2 block">{wp.title}</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
                  <input name={`wp_title_${i}`} defaultValue={wp.title} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input name={`wp_slug_${i}`} defaultValue={wp.slug} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Beschreibung</label>
                  <textarea name={`wp_description_${i}`} defaultValue={wp.description} rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">COP</label>
                  <input name={`wp_cop_${i}`} defaultValue={wp.cop} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ideal für</label>
                  <input name={`wp_idealFor_${i}`} defaultValue={wp.idealFor} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vorteile (eine pro Zeile)</label>
                  <textarea name={`wp_advantages_${i}`} defaultValue={wp.advantages.join("\n")} rows={3} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminForm>
  );
}
