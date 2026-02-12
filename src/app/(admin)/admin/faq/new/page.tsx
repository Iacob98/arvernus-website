import { createFAQAction } from "@/actions/admin/faq";
import { FAQForm } from "../FAQForm";

export default function NewFAQPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neue FAQ-Frage</h1>
      <FAQForm action={createFAQAction} />
    </div>
  );
}
