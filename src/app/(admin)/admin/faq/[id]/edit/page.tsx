import { notFound } from "next/navigation";
import { getFAQ } from "@/lib/dal";
import { updateFAQAction } from "@/actions/admin/faq";
import { FAQForm } from "../../FAQForm";

export default async function EditFAQPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { id } = await params;
  const { category } = await searchParams;
  const faq = await getFAQ();

  // Find item across all categories
  let foundItem = null;
  let foundCategory = category || "";
  for (const [cat, items] of Object.entries(faq)) {
    const item = items.find((i) => i.id === id);
    if (item) {
      foundItem = item;
      foundCategory = cat;
      break;
    }
  }

  if (!foundItem) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">FAQ-Frage bearbeiten</h1>
      <FAQForm action={updateFAQAction} item={foundItem} defaultCategory={foundCategory} />
    </div>
  );
}
