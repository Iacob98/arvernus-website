"use client";

import Link from "next/link";
import { useTransition } from "react";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import type { ContactSubmissionData } from "@/lib/dal-schemas";

interface ContactListProps {
  submissions: ContactSubmissionData[];
  deleteAction: (id: string) => Promise<void>;
  markReadAction: (id: string) => Promise<void>;
}

export function ContactList({ submissions, deleteAction, markReadAction }: ContactListProps) {
  const sorted = [...submissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Datum</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">E-Mail</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Telefon</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Nachricht</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s) => (
            <tr key={s.id} className={`border-b border-gray-100 last:border-0 ${!s.read ? "bg-blue-50/40" : ""}`}>
              <td className="px-4 py-3">
                <MarkReadButton read={!!s.read} onToggle={() => markReadAction(s.id)} />
              </td>
              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                {new Date(s.createdAt).toLocaleDateString("de-DE")}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {s.vorname} {s.nachname}
              </td>
              <td className="px-4 py-3 text-gray-600">{s.email}</td>
              <td className="px-4 py-3 text-gray-600">{s.telefon || "–"}</td>
              <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{s.nachricht}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/submissions/${s.id}`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Details
                  </Link>
                  <DeleteConfirmDialog
                    onDelete={() => deleteAction(s.id)}
                    itemName="diese Anfrage"
                  />
                </div>
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                Keine Kontaktanfragen vorhanden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function MarkReadButton({ read, onToggle }: { read: boolean; onToggle: () => void }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => onToggle())}
      className="cursor-pointer"
      title={read ? "Als ungelesen markieren" : "Als gelesen markieren"}
    >
      <span className={`inline-block h-3 w-3 rounded-full ${read ? "bg-gray-300" : "bg-blue-500"}`} />
    </button>
  );
}
