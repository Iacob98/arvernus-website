"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import type { HeroSlideData } from "@/lib/dal-schemas";

interface SlideFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  slide?: HeroSlideData;
}

export function SlideForm({ action, slide }: SlideFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/hero-slider">
      {slide?.id && <input type="hidden" name="id" value={slide.id} />}
      <div className="space-y-4">
        <AdminImageUpload name="image" currentImage={slide?.image} label="Slide-Bild" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titel (optional)</label>
          <input name="title" defaultValue={slide?.title} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Untertitel (optional)</label>
          <input name="subtitle" defaultValue={slide?.subtitle} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        </div>
      </div>
    </AdminForm>
  );
}
