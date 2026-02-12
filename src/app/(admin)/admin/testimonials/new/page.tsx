import { createTestimonialAction } from "@/actions/admin/testimonials";
import { TestimonialForm } from "../TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neue Bewertung</h1>
      <TestimonialForm action={createTestimonialAction} />
    </div>
  );
}
