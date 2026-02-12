import { getServices } from "@/lib/dal";
import { updateServicesAction } from "@/actions/admin/services";
import { ServicesEditor } from "./ServicesEditor";

export default async function ServicesPage() {
  const data = await getServices();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dienstleistungen & Wärmepumpentypen</h1>
      <ServicesEditor data={data} action={updateServicesAction} />
    </div>
  );
}
