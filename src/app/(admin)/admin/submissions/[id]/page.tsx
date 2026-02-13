import Link from "next/link";
import { notFound } from "next/navigation";
import { getContactSubmissions, getRechnerSubmissions } from "@/lib/dal";
import {
  deleteContactSubmissionAction,
  deleteRechnerSubmissionAction,
  markContactReadAction,
  markRechnerReadAction,
} from "@/actions/admin/submissions";
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
import { DetailActions } from "./DetailActions";

function getLabel(options: { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [contactSubs, rechnerSubs] = await Promise.all([
    getContactSubmissions(),
    getRechnerSubmissions(),
  ]);

  const contactSub = contactSubs.find((s) => s.id === id);
  const rechnerSub = rechnerSubs.find((s) => s.id === id);

  if (!contactSub && !rechnerSub) notFound();

  if (contactSub) {
    return (
      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Link href="/admin/submissions" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
              &larr; Zurück zu Anfragen
            </Link>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">Kontaktanfrage</h1>
          </div>
          <DetailActions
            id={id}
            read={!!contactSub.read}
            deleteAction={deleteContactSubmissionAction}
            markReadAction={markContactReadAction}
          />
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Anrede" value={contactSub.anrede} />
            <Field label="Vorname" value={contactSub.vorname} />
            <Field label="Nachname" value={contactSub.nachname} />
            <Field label="E-Mail" value={contactSub.email} />
            <Field label="Telefon" value={contactSub.telefon || "–"} />
            <Field label="Eingegangen am" value={new Date(contactSub.createdAt).toLocaleString("de-DE")} />
            <div className="sm:col-span-2">
              <Field label="Nachricht" value={contactSub.nachricht} />
            </div>
          </dl>
        </div>
      </div>
    );
  }

  const r = rechnerSub!;
  const details = [
    { section: "Gebäude", items: [
      ["Gebäudetyp", getLabel(gebaeudetypen, r.gebaeudetyp)],
      ["Eigentümer", getLabel(eigentuemerOptionen, r.eigentuemer)],
      ["Baujahr", getLabel(baujahrOptionen, r.baujahr)],
      ["Wohnfläche", getLabel(wohnflaecheOptionen, r.wohnflaeche)],
      ["Dämmung", getLabel(daemmungOptionen, r.daemmung)],
      ["Fenster", getLabel(fensterOptionen, r.fenster)],
    ]},
    { section: "Heizung", items: [
      ["Aktuelle Heizung", getLabel(aktuelleHeizungOptionen, r.aktuelleHeizung)],
      ["Heizungsalter", getLabel(heizungsalterOptionen, r.heizungsalter)],
      ["Warmwasser", getLabel(warmwasserOptionen, r.warmwasser)],
    ]},
    { section: "Wärmepumpe", items: [
      ["Wärmepumpentyp", getLabel(waermepumpenTypOptionen, r.waermepumpentyp)],
      ["Photovoltaik", getLabel(photovoltaikOptionen, r.photovoltaik)],
      ["Zeitrahmen", getLabel(zeitrahmenOptionen, r.zeitrahmen)],
    ]},
    { section: "Kontakt", items: [
      ["Anrede", r.anrede],
      ["Vorname", r.vorname],
      ["Nachname", r.nachname],
      ["E-Mail", r.email],
      ["Telefon", r.telefon],
      ["Straße", r.strasse],
      ["PLZ / Ort", `${r.plz} ${r.ort}`],
      ["Nachricht", r.nachricht || "–"],
    ]},
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/admin/submissions" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            &larr; Zurück zu Anfragen
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Rechner-Anfrage</h1>
          <p className="text-sm text-gray-500 mt-1">
            Eingegangen am {new Date(r.createdAt).toLocaleString("de-DE")}
          </p>
        </div>
        <DetailActions
          id={id}
          read={!!r.read}
          deleteAction={deleteRechnerSubmissionAction}
          markReadAction={markRechnerReadAction}
        />
      </div>

      <div className="space-y-6">
        {details.map(({ section, items }) => (
          <div key={section} className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">{section}</h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map(([label, value]) => (
                <Field key={label} label={label} value={value} />
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  );
}
