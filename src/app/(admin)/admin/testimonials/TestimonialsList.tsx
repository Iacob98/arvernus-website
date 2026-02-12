"use client";

import Link from "next/link";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import type { Testimonial } from "@/types";

interface TestimonialsListProps {
  testimonials: Testimonial[];
  deleteAction: (id: string) => Promise<void>;
}

export function TestimonialsList({ testimonials, deleteAction }: TestimonialsListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Ort</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Bewertung</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Dienstleistung</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t) => (
            <tr key={t.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 font-medium text-gray-900">{t.name}</td>
              <td className="px-4 py-3 text-gray-600">{t.location}</td>
              <td className="px-4 py-3 text-gray-600">{"★".repeat(t.rating)}</td>
              <td className="px-4 py-3 text-gray-600">{t.service}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/testimonials/${t.id}/edit`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Bearbeiten
                  </Link>
                  <DeleteConfirmDialog
                    onDelete={() => deleteAction(t.id!)}
                    itemName="diese Bewertung"
                  />
                </div>
              </td>
            </tr>
          ))}
          {testimonials.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                Keine Bewertungen vorhanden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
