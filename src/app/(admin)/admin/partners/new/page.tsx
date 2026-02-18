import { getPartners } from "@/lib/dal";
import { createPartnerAction } from "@/actions/admin/partners";
import { PartnerForm } from "../PartnerForm";

export default async function NewPartnerPage() {
  const partners = await getPartners();
  const featuredCount = partners.filter((p) => p.featured).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neuer Partner</h1>
      <PartnerForm action={createPartnerAction} featuredCount={featuredCount} />
    </div>
  );
}
