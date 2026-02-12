"use client";

import Link from "next/link";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import type { TeamMember } from "@/types";

interface TeamListProps {
  team: TeamMember[];
  deleteAction: (id: string) => Promise<void>;
}

export function TeamList({ team, deleteAction }: TeamListProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Rolle</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Beschreibung</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {team.map((m) => (
            <tr key={m.id} className="border-b border-gray-100 last:border-0">
              <td className="px-4 py-3 font-medium text-gray-900">{m.name}</td>
              <td className="px-4 py-3 text-gray-600">{m.role}</td>
              <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{m.description}</td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/admin/team/${m.id}/edit`}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Bearbeiten
                  </Link>
                  <DeleteConfirmDialog
                    onDelete={() => deleteAction(m.id!)}
                    itemName="dieses Teammitglied"
                  />
                </div>
              </td>
            </tr>
          ))}
          {team.length === 0 && (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                Keine Teammitglieder vorhanden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
