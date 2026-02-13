"use client";

import { useTransition } from "react";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";

interface DetailActionsProps {
  id: string;
  read: boolean;
  deleteAction: (id: string) => Promise<void>;
  markReadAction: (id: string) => Promise<void>;
}

export function DetailActions({ id, read, deleteAction, markReadAction }: DetailActionsProps) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => startTransition(() => markReadAction(id))}
        className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer disabled:opacity-50"
      >
        {read ? "Als ungelesen markieren" : "Als gelesen markieren"}
      </button>
      <DeleteConfirmDialog
        onDelete={() => deleteAction(id)}
        itemName="diese Anfrage"
      />
    </div>
  );
}
