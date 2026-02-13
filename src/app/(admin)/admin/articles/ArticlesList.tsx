"use client";

import Link from "next/link";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import type { Article } from "@/types";

interface ArticlesListProps {
  articles: Article[];
  deleteAction: (id: string) => Promise<void>;
}

export function ArticlesList({ articles, deleteAction }: ArticlesListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-600">Titel</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Slug</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Kategorie</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Datum</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Featured</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 font-medium text-gray-900">{a.title}</td>
              <td className="px-4 py-3 text-gray-500 font-mono text-xs">{a.slug}</td>
              <td className="px-4 py-3 text-gray-600">{a.category}</td>
              <td className="px-4 py-3 text-gray-600">{a.publishedDate}</td>
              <td className="px-4 py-3">
                {a.featured && (
                  <span className="inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary">
                    Featured
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/articles/${a.id}/edit`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Bearbeiten
                  </Link>
                  <DeleteConfirmDialog
                    onDelete={() => deleteAction(a.id!)}
                    itemName="diesen Artikel"
                  />
                </div>
              </td>
            </tr>
          ))}
          {articles.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                Keine Artikel vorhanden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
