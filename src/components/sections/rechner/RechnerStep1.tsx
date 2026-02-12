"use client";

import { RadioGroup } from "@/components/ui/RadioGroup";
import { gebaeudetypen, eigentuemerOptionen } from "@/data/rechner-options";
import type { RechnerFormData } from "@/types";

interface StepProps {
  data: RechnerFormData;
  errors: Record<string, string>;
  updateField: (field: keyof RechnerFormData, value: unknown) => void;
}

export function RechnerStep1({ data, errors, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welches Gebäude möchten Sie beheizen?</h2>
        <p className="mt-1 text-muted-foreground">
          Wählen Sie den Gebäudetyp und Ihren Status.
        </p>
      </div>
      <RadioGroup
        name="gebaeudetyp"
        label="Gebäudetyp"
        options={gebaeudetypen}
        value={data.gebaeudetyp}
        onChange={(v) => updateField("gebaeudetyp", v)}
        error={errors.gebaeudetyp}
        columns={2}
      />
      <RadioGroup
        name="eigentuemer"
        label="Sind Sie Eigentümer?"
        options={eigentuemerOptionen}
        value={data.eigentuemer}
        onChange={(v) => updateField("eigentuemer", v)}
        error={errors.eigentuemer}
        columns={2}
      />
    </div>
  );
}
