"use client";

import { cn } from "@/lib/utils";

interface CheckboxProps {
  name: string;
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  className?: string;
}

export function Checkbox({ name, label, checked, onChange, error, className }: CheckboxProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <label className="flex items-start gap-3 cursor-pointer">
        <div className="relative mt-0.5">
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
          />
          <div
            className={cn(
              "h-5 w-5 rounded border-2 flex items-center justify-center transition-colors",
              checked ? "bg-primary border-primary" : "border-border",
            )}
          >
            {checked && (
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
      </label>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
