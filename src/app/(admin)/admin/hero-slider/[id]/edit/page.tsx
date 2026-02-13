import { notFound } from "next/navigation";
import { getHeroSlides } from "@/lib/dal";
import { updateHeroSlideAction } from "@/actions/admin/hero-slides";
import { SlideForm } from "../../SlideForm";

export default async function EditSlidePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const slides = await getHeroSlides();
  const slide = slides.find((s) => s.id === id);
  if (!slide) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Slide bearbeiten</h1>
      <SlideForm action={updateHeroSlideAction} slide={slide} />
    </div>
  );
}
