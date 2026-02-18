import { notFound } from "next/navigation";
import { getPartners } from "@/lib/dal";
import { updatePartnerAction } from "@/actions/admin/partners";
import { PartnerForm } from "../../PartnerForm";

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partners = await getPartners();
  const partner = partners.find((p) => p.id === id);
  if (!partner) notFound();

  const featuredCount = partners.filter((p) => p.featured).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Partner bearbeiten</h1>
      <PartnerForm action={updatePartnerAction} partner={partner} featuredCount={featuredCount} />
    </div>
  );
}
