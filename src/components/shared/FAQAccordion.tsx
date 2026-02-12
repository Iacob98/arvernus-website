import { Accordion } from "@/components/ui/Accordion";
import type { FAQItem } from "@/types";

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion
      items={items.map((item, i) => ({
        id: `faq-${i}`,
        title: item.question,
        content: item.answer,
      }))}
      className={className}
    />
  );
}
