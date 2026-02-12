import { notFound } from "next/navigation";
import { getPages } from "@/lib/dal";
import { updatePageAction } from "@/actions/admin/pages";
import { PageEditor } from "./PageEditor";

const slugLabels: Record<string, string> = {
  home: "Startseite",
  waermepumpen: "Wärmepumpen",
  photovoltaik: "Photovoltaik",
  referenzen: "Referenzen",
  "ueber-uns": "Über uns",
  kontakt: "Kontakt",
  foerderung: "Förderung",
};

export default async function EditPagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pages = await getPages();
  const pageContent = pages[slug];
  if (!pageContent) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Seite bearbeiten: {slugLabels[slug] || slug}
      </h1>
      <PageEditor slug={slug} content={pageContent} action={updatePageAction} />
    </div>
  );
}
