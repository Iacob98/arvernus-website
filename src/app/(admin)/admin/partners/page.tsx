import Link from "next/link";
import { getPartners } from "@/lib/dal";
import { deletePartnerAction } from "@/actions/admin/partners";
import { PartnersList } from "./PartnersList";

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Partner</h1>
        <Link
          href="/admin/partners/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          + Neuer Partner
        </Link>
      </div>
      <PartnersList partners={partners} deleteAction={deletePartnerAction} />
    </div>
  );
}
