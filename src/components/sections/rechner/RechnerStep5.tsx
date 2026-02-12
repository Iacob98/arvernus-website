"use client";

import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { RadioGroup } from "@/components/ui/RadioGroup";
import { Checkbox } from "@/components/ui/Checkbox";
import { anredeOptionen } from "@/data/rechner-options";
import type { RechnerFormData } from "@/types";

interface StepProps {
  data: RechnerFormData;
  errors: Record<string, string>;
  updateField: (field: keyof RechnerFormData, value: unknown) => void;
}

export function RechnerStep5({ data, errors, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Ihre Kontaktdaten</h2>
        <p className="mt-1 text-muted-foreground">
          Wir erstellen Ihr persönliches Angebot — kostenlos und unverbindlich.
        </p>
      </div>
      <RadioGroup
        name="anrede"
        label="Anrede"
        options={anredeOptionen}
        value={data.anrede}
        onChange={(v) => updateField("anrede", v)}
        error={errors.anrede}
        columns={2}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Vorname *"
          name="vorname"
          value={data.vorname}
          onChange={(e) => updateField("vorname", e.target.value)}
          error={errors.vorname}
          placeholder="Max"
        />
        <Input
          label="Nachname *"
          name="nachname"
          value={data.nachname}
          onChange={(e) => updateField("nachname", e.target.value)}
          error={errors.nachname}
          placeholder="Mustermann"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="E-Mail *"
          name="email"
          type="email"
          value={data.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
          placeholder="max@beispiel.de"
        />
        <Input
          label="Telefon *"
          name="telefon"
          type="tel"
          value={data.telefon}
          onChange={(e) => updateField("telefon", e.target.value)}
          error={errors.telefon}
          placeholder="0170 1234567"
        />
      </div>
      <Input
        label="Straße und Hausnummer *"
        name="strasse"
        value={data.strasse}
        onChange={(e) => updateField("strasse", e.target.value)}
        error={errors.strasse}
        placeholder="Musterstraße 1"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="PLZ *"
          name="plz"
          value={data.plz}
          onChange={(e) => updateField("plz", e.target.value)}
          error={errors.plz}
          placeholder="12345"
          maxLength={5}
        />
        <Input
          label="Ort *"
          name="ort"
          value={data.ort}
          onChange={(e) => updateField("ort", e.target.value)}
          error={errors.ort}
          placeholder="Musterstadt"
        />
      </div>
      <Textarea
        label="Nachricht (optional)"
        name="nachricht"
        value={data.nachricht}
        onChange={(e) => updateField("nachricht", e.target.value)}
        placeholder="Haben Sie noch Fragen oder Anmerkungen?"
      />
      <Checkbox
        name="datenschutz"
        checked={data.datenschutz}
        onChange={(v) => updateField("datenschutz", v)}
        error={errors.datenschutz}
        label={
          <>
            Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
            <Link href="/datenschutz" className="text-primary hover:underline" target="_blank">
              Datenschutzerklärung
            </Link>{" "}
            zu. *
          </>
        }
      />
    </div>
  );
}
