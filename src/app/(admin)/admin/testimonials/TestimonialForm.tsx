"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import type { Testimonial } from "@/types";

interface TestimonialFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  testimonial?: Testimonial;
}

export function TestimonialForm({ action, testimonial }: TestimonialFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/testimonials">
      {testimonial?.id && <input type="hidden" name="id" value={testimonial.id} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input name="name" defaultValue={testimonial?.name} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ort</label>
          <input name="location" defaultValue={testimonial?.location} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bewertung (1-5)</label>
          <select name="rating" defaultValue={testimonial?.rating ?? 5} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} {"★".repeat(n)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dienstleistung</label>
          <input name="service" defaultValue={testimonial?.service} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
          <input name="date" defaultValue={testimonial?.date} placeholder="z.B. März 2024" required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
          <textarea name="text" defaultValue={testimonial?.text} required rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div className="md:col-span-2">
          <AdminImageUpload name="image" currentImage={testimonial?.image} label="Kundenfoto" />
        </div>
      </div>
    </AdminForm>
  );
}
