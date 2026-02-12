"use client";

import Link from "next/link";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import type { FAQItem } from "@/types";

interface FAQListProps {
  items: FAQItem[];
  category: string;
  deleteAction: (id: string, category: string) => Promise<void>;
}

export function FAQList({ items, category, deleteAction }: FAQListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500 mb-4">Keine Einträge in dieser Kategorie.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white mb-4">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-600">Frage</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 text-gray-900">{item.question}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/faq/${item.id}/edit?category=${category}`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Bearbeiten
                  </Link>
                  <DeleteConfirmDialog
                    onDelete={() => deleteAction(item.id!, category)}
                    itemName="diese Frage"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
