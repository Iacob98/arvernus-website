"use client";

import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  waermepumpenTypOptionen,
  photovoltaikOptionen,
  zeitrahmenOptionen,
} from "@/data/rechner-options";
import type { RechnerFormData } from "@/types";

interface StepProps {
  data: RechnerFormData;
  errors: Record<string, string>;
  updateField: (field: keyof RechnerFormData, value: unknown) => void;
}

export function RechnerStep4({ data, errors, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Ihre Wünsche</h2>
        <p className="mt-1 text-muted-foreground">
          Welche Lösung interessiert Sie?
        </p>
      </div>
      <RadioGroup
        name="waermepumpentyp"
        label="Gewünschter Wärmepumpentyp"
        options={waermepumpenTypOptionen}
        value={data.waermepumpentyp}
        onChange={(v) => updateField("waermepumpentyp", v)}
        error={errors.waermepumpentyp}
        columns={2}
      />
      <RadioGroup
        name="photovoltaik"
        label="Interesse an Photovoltaik"
        options={photovoltaikOptionen}
        value={data.photovoltaik}
        onChange={(v) => updateField("photovoltaik", v)}
        error={errors.photovoltaik}
        columns={2}
      />
      <RadioGroup
        name="zeitrahmen"
        label="Zeitrahmen"
        options={zeitrahmenOptionen}
        value={data.zeitrahmen}
        onChange={(v) => updateField("zeitrahmen", v)}
        error={errors.zeitrahmen}
        columns={3}
      />
    </div>
  );
}
