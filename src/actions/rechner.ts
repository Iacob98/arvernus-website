"use server";

import { rechnerFullSchema } from "@/lib/schemas";
import { getRechnerSubmissions, saveRechnerSubmissions } from "@/lib/dal";
import { sendNotificationEmail } from "@/lib/email";
import {
  gebaeudetypen,
  eigentuemerOptionen,
  baujahrOptionen,
  wohnflaecheOptionen,
  daemmungOptionen,
  fensterOptionen,
  aktuelleHeizungOptionen,
  heizungsalterOptionen,
  warmwasserOptionen,
  waermepumpenTypOptionen,
  photovoltaikOptionen,
  zeitrahmenOptionen,
} from "@/data/rechner-options";
import type { RechnerFormData } from "@/types";

function getLabel(options: { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export async function submitRechner(data: RechnerFormData) {
  const result = rechnerFullSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Validierungsfehler. Bitte überprüfen Sie Ihre Angaben." };
  }

  const d = result.data;

  const submission = {
    id: crypto.randomUUID(),
    gebaeudetyp: d.gebaeudetyp,
    eigentuemer: d.eigentuemer,
    baujahr: d.baujahr,
    wohnflaeche: d.wohnflaeche,
    daemmung: d.daemmung,
    fenster: d.fenster,
    aktuelleHeizung: d.aktuelleHeizung,
    heizungsalter: d.heizungsalter,
    warmwasser: d.warmwasser,
    waermepumpentyp: d.waermepumpentyp,
    photovoltaik: d.photovoltaik,
    zeitrahmen: d.zeitrahmen,
    anrede: d.anrede,
    vorname: d.vorname,
    nachname: d.nachname,
    email: d.email,
    telefon: d.telefon,
    strasse: d.strasse,
    plz: d.plz,
    ort: d.ort,
    nachricht: d.nachricht || "",
    createdAt: new Date().toISOString(),
    read: false,
  };

  const submissions = await getRechnerSubmissions();
  submissions.push(submission);
  await saveRechnerSubmissions(submissions);

  const rows = [
    ["Gebäudetyp", getLabel(gebaeudetypen, d.gebaeudetyp)],
    ["Eigentümer", getLabel(eigentuemerOptionen, d.eigentuemer)],
    ["Baujahr", getLabel(baujahrOptionen, d.baujahr)],
    ["Wohnfläche", getLabel(wohnflaecheOptionen, d.wohnflaeche)],
    ["Dämmung", getLabel(daemmungOptionen, d.daemmung)],
    ["Fenster", getLabel(fensterOptionen, d.fenster)],
    ["Aktuelle Heizung", getLabel(aktuelleHeizungOptionen, d.aktuelleHeizung)],
    ["Heizungsalter", getLabel(heizungsalterOptionen, d.heizungsalter)],
    ["Warmwasser", getLabel(warmwasserOptionen, d.warmwasser)],
    ["Wärmepumpentyp", getLabel(waermepumpenTypOptionen, d.waermepumpentyp)],
    ["Photovoltaik", getLabel(photovoltaikOptionen, d.photovoltaik)],
    ["Zeitrahmen", getLabel(zeitrahmenOptionen, d.zeitrahmen)],
    ["Name", `${d.anrede} ${d.vorname} ${d.nachname}`],
    ["E-Mail", d.email],
    ["Telefon", d.telefon],
    ["Adresse", `${d.strasse}, ${d.plz} ${d.ort}`],
    ["Nachricht", d.nachricht || "–"],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">${label}</td><td style="padding:8px;border:1px solid #ddd">${value}</td></tr>`
    )
    .join("");

  await sendNotificationEmail(
    `Neue Rechner-Anfrage von ${d.vorname} ${d.nachname}`,
    `<h2>Neue Wärmepumpen-Rechner Anfrage</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px">${tableRows}</table>`
  );

  return { success: true };
}
