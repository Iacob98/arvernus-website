"use client";

import { RadioGroup } from "@/components/ui/RadioGroup";
import {
  baujahrOptionen,
  wohnflaecheOptionen,
  daemmungOptionen,
  fensterOptionen,
} from "@/data/rechner-options";
import type { RechnerFormData } from "@/types";

interface StepProps {
  data: RechnerFormData;
  errors: Record<string, string>;
  updateField: (field: keyof RechnerFormData, value: unknown) => void;
}

export function RechnerStep2({ data, errors, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Informationen zu Ihrem Gebäude</h2>
        <p className="mt-1 text-muted-foreground">
          Diese Angaben helfen uns, die optimale Wärmepumpe zu empfehlen.
        </p>
      </div>
      <RadioGroup
        name="baujahr"
        label="Baujahr des Gebäudes"
        options={baujahrOptionen}
        value={data.baujahr}
        onChange={(v) => updateField("baujahr", v)}
        error={errors.baujahr}
        columns={3}
      />
      <RadioGroup
        name="wohnflaeche"
        label="Wohnfläche"
        options={wohnflaecheOptionen}
        value={data.wohnflaeche}
        onChange={(v) => updateField("wohnflaeche", v)}
        error={errors.wohnflaeche}
        columns={3}
      />
      <RadioGroup
        name="daemmung"
        label="Dämmzustand"
        options={daemmungOptionen}
        value={data.daemmung}
        onChange={(v) => updateField("daemmung", v)}
        error={errors.daemmung}
        columns={2}
      />
      <RadioGroup
        name="fenster"
        label="Fenster"
        options={fensterOptionen}
        value={data.fenster}
        onChange={(v) => updateField("fenster", v)}
        error={errors.fenster}
        columns={2}
      />
    </div>
  );
}
