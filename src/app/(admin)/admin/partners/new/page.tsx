import { createPartnerAction } from "@/actions/admin/partners";
import { PartnerForm } from "../PartnerForm";

export default function NewPartnerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neuer Partner</h1>
      <PartnerForm action={createPartnerAction} />
    </div>
  );
}
