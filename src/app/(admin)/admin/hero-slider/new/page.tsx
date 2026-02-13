import { createHeroSlideAction } from "@/actions/admin/hero-slides";
import { SlideForm } from "../SlideForm";

export default function NewSlidePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neuer Slide</h1>
      <SlideForm action={createHeroSlideAction} />
    </div>
  );
}
