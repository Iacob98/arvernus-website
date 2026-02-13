"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import {
  gebaeudetypen,
  waermepumpenTypOptionen,
  zeitrahmenOptionen,
} from "@/data/rechner-options";
import type { RechnerSubmissionData } from "@/lib/dal-schemas";

interface RechnerListProps {
  submissions: RechnerSubmissionData[];
  deleteAction: (id: string) => Promise<void>;
  markReadAction: (id: string) => Promise<void>;
}

function getLabel(options: { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function RechnerList({ submissions, deleteAction, markReadAction }: RechnerListProps) {
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
            <th className="px-4 py-3 text-left font-medium text-gray-600">Ort</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Wärmepumpe</th>
            <th className="px-4 py-3 text-left font-medium text-gray-600">Zeitrahmen</th>
            <th className="px-4 py-3 text-right font-medium text-gray-600">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s) => (
            <RechnerRow
              key={s.id}
              submission={s}
              deleteAction={deleteAction}
              markReadAction={markReadAction}
            />
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                Keine Rechner-Anfragen vorhanden.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function RechnerRow({
  submission: s,
  deleteAction,
  markReadAction,
}: {
  submission: RechnerSubmissionData;
  deleteAction: (id: string) => Promise<void>;
  markReadAction: (id: string) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className={`border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${!s.read ? "bg-blue-50/40" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-4 py-3">
          <button
            type="button"
            disabled={pending}
            onClick={(e) => {
              e.stopPropagation();
              startTransition(() => markReadAction(s.id));
            }}
            className="cursor-pointer"
            title={s.read ? "Als ungelesen markieren" : "Als gelesen markieren"}
          >
            <span className={`inline-block h-3 w-3 rounded-full ${s.read ? "bg-gray-300" : "bg-blue-500"}`} />
          </button>
        </td>
        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
          {new Date(s.createdAt).toLocaleDateString("de-DE")}
        </td>
        <td className="px-4 py-3 font-medium text-gray-900">
          {s.vorname} {s.nachname}
        </td>
        <td className="px-4 py-3 text-gray-600">{s.email}</td>
        <td className="px-4 py-3 text-gray-600">{s.plz} {s.ort}</td>
        <td className="px-4 py-3 text-gray-600">{getLabel(waermepumpenTypOptionen, s.waermepumpentyp)}</td>
        <td className="px-4 py-3 text-gray-600">{getLabel(zeitrahmenOptionen, s.zeitrahmen)}</td>
        <td className="px-4 py-3 text-right">
          <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
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
      {expanded && (
        <tr className="bg-gray-50/50">
          <td colSpan={8} className="px-8 py-4">
            <ExpandedDetails submission={s} />
          </td>
        </tr>
      )}
    </>
  );
}

function ExpandedDetails({ submission: s }: { submission: RechnerSubmissionData }) {
  const details = [
    ["Gebäudetyp", getLabel(gebaeudetypen, s.gebaeudetyp)],
    ["Wärmepumpentyp", getLabel(waermepumpenTypOptionen, s.waermepumpentyp)],
    ["Zeitrahmen", getLabel(zeitrahmenOptionen, s.zeitrahmen)],
    ["Adresse", `${s.strasse}, ${s.plz} ${s.ort}`],
    ["Telefon", s.telefon],
  ];
  if (s.nachricht) details.push(["Nachricht", s.nachricht]);

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
      {details.map(([label, value]) => (
        <div key={label}>
          <span className="font-medium text-gray-700">{label}:</span>{" "}
          <span className="text-gray-600">{value}</span>
        </div>
      ))}
    </div>
  );
}
