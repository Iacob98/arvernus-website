import Link from "next/link";
import { getHeroSlides } from "@/lib/dal";
import { deleteHeroSlideAction, reorderHeroSlidesAction } from "@/actions/admin/hero-slides";
import { SlidesList } from "./SlidesList";

export default async function HeroSliderPage() {
  const slides = await getHeroSlides();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hero Slider</h1>
        <Link
          href="/admin/hero-slider/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          + Neuer Slide
        </Link>
      </div>
      <SlidesList
        slides={slides}
        deleteAction={deleteHeroSlideAction}
        reorderAction={reorderHeroSlidesAction}
      />
    </div>
  );
}
