import { getCompany } from "@/lib/dal";
import { updateCompanyAction } from "@/actions/admin/company";
import { CompanyForm } from "./CompanyForm";

export default async function CompanyPage() {
  const company = await getCompany();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Firmendaten bearbeiten</h1>
      <CompanyForm company={company} action={updateCompanyAction} />
    </div>
  );
}
