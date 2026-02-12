"use client";

import { useActionState } from "react";
import Link from "next/link";

interface AdminFormProps {
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  backHref: string;
  submitLabel?: string;
  children: React.ReactNode;
}

export function AdminForm({ action, backHref, submitLabel = "Speichern", children }: AdminFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-6">
      {state?.error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-sm text-green-700">
          Erfolgreich gespeichert!
        </div>
      )}

      {children}

      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50 transition-colors cursor-pointer"
        >
          {pending ? "Wird gespeichert..." : submitLabel}
        </button>
        <Link
          href={backHref}
          className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Abbrechen
        </Link>
      </div>
    </form>
  );
}
