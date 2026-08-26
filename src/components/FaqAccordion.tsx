"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const reduceMotion = usePrefersReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <li key={item.question}>
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="faq-trigger flex w-full items-center justify-between gap-4 py-4 text-left text-[15px] font-medium leading-snug text-charcoal transition-colors hover:text-gold-dark sm:py-5 sm:text-base"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-secondary transition-transform ${
                    reduceMotion ? "" : "duration-200 ease-out"
                  } ${isOpen ? "rotate-180" : ""}`}
                  strokeWidth={1.75}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={isOpen ? "pb-4 sm:pb-5" : undefined}
            >
              {isOpen ? (
                <p
                  className={`max-w-3xl text-[14px] leading-relaxed text-secondary sm:text-[15px] ${
                    reduceMotion ? "" : "faq-panel-enter"
                  }`}
                >
                  {item.answer}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
