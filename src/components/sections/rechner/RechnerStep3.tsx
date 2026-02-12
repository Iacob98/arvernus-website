"use client";

import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  aktuelleHeizungOptionen,
  heizungsalterOptionen,
  warmwasserOptionen,
} from "@/data/rechner-options";
import type { RechnerFormData } from "@/types";

interface StepProps {
  data: RechnerFormData;
  errors: Record<string, string>;
  updateField: (field: keyof RechnerFormData, value: unknown) => void;
}

export function RechnerStep3({ data, errors, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Ihr aktuelles Heizsystem</h2>
        <p className="mt-1 text-muted-foreground">
          Welche Heizung nutzen Sie aktuell?
        </p>
      </div>
      <RadioGroup
        name="aktuelleHeizung"
        label="Aktuelle Heizung"
        options={aktuelleHeizungOptionen}
        value={data.aktuelleHeizung}
        onChange={(v) => updateField("aktuelleHeizung", v)}
        error={errors.aktuelleHeizung}
        columns={2}
      />
      <RadioGroup
        name="heizungsalter"
        label="Alter der Heizung"
        options={heizungsalterOptionen}
        value={data.heizungsalter}
        onChange={(v) => updateField("heizungsalter", v)}
        error={errors.heizungsalter}
        columns={3}
      />
      <RadioGroup
        name="warmwasser"
        label="Warmwasserbereitung"
        options={warmwasserOptionen}
        value={data.warmwasser}
        onChange={(v) => updateField("warmwasser", v)}
        error={errors.warmwasser}
        columns={2}
      />
    </div>
  );
}
