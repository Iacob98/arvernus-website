"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
import type { Article } from "@/types";

interface ArticleFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  article?: Article;
}

export function ArticleForm({ action, article }: ArticleFormProps) {
  return (
    <AdminForm action={action} backHref="/admin/articles">
      {article?.id && <input type="hidden" name="id" value={article.id} />}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Titel</label>
            <input name="title" defaultValue={article?.title} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input name="slug" defaultValue={article?.slug} required placeholder="z.B. waermepumpe-im-altbau" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kurztext (Excerpt)</label>
            <textarea name="excerpt" defaultValue={article?.excerpt} required rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Inhalt (Markdown)</label>
            <textarea name="content" defaultValue={article?.content} required rows={15} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategorie</label>
            <select name="category" defaultValue={article?.category || "Wärmepumpen"} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm">
              <option value="Wärmepumpen">Wärmepumpen</option>
              <option value="Photovoltaik">Photovoltaik</option>
              <option value="Förderung">Förderung</option>
              <option value="Energiesparen">Energiesparen</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
            <input name="author" defaultValue={article?.author} placeholder="z.B. Arvernus Redaktion" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Veröffentlichungsdatum</label>
            <input name="publishedDate" type="date" defaultValue={article?.publishedDate || new Date().toISOString().split("T")[0]} required className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" name="featured" defaultChecked={article?.featured} className="rounded border-gray-300" />
              Featured (wird hervorgehoben)
            </label>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">SEO</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta-Titel (optional)</label>
              <input name="metaTitle" defaultValue={article?.metaTitle} placeholder="Falls abweichend vom Titel" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta-Beschreibung (optional)</label>
              <textarea name="metaDescription" defaultValue={article?.metaDescription} rows={2} placeholder="SEO-Beschreibung für Suchergebnisse" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </div>
        <AdminImageUpload name="image" currentImage={article?.image} label="Artikelbild" />
      </div>
    </AdminForm>
  );
}
