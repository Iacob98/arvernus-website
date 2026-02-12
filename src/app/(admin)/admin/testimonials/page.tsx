import Link from "next/link";
import { getTestimonials } from "@/lib/dal";
import { deleteTestimonialAction } from "@/actions/admin/testimonials";
import { TestimonialsList } from "./TestimonialsList";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bewertungen</h1>
        <Link
          href="/admin/testimonials/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          + Neue Bewertung
        </Link>
      </div>
      <TestimonialsList testimonials={testimonials} deleteAction={deleteTestimonialAction} />
    </div>
  );
}
