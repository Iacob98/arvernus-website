import { notFound } from "next/navigation";
import { getTestimonials } from "@/lib/dal";
import { updateTestimonialAction } from "@/actions/admin/testimonials";
import { TestimonialForm } from "../../TestimonialForm";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const testimonials = await getTestimonials();
  const testimonial = testimonials.find((t) => t.id === id);
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bewertung bearbeiten</h1>
      <TestimonialForm action={updateTestimonialAction} testimonial={testimonial} />
    </div>
  );
}
