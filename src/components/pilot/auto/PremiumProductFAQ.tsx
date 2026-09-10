"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { FaqItem } from "@/components/FaqAccordion";

type PremiumProductFAQProps = {
  title: string;
  intro: string;
  items: FaqItem[];
};

export default function PremiumProductFAQ({
  title,
  intro,
  items,
}: PremiumProductFAQProps) {
  const baseId = useId();
  const reduceMotion = usePrefersReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="border-b border-border bg-offwhite py-14 sm:py-16 lg:py-20"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id={`${baseId}-heading`}
            className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-3 text-[15px] text-secondary">{intro}</p>
        </div>

        <ul className="mt-8 space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <li key={item.question}>
                <div
                  className={`pilot-auto-faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="pilot-auto-faq-trigger"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <span
                        className={`pilot-auto-faq-icon ${reduceMotion ? "" : "transition-transform duration-200"}`}
                        aria-hidden
                      >
                        <Plus
                          className={`h-4 w-4 ${isOpen ? "rotate-45" : ""} ${reduceMotion ? "" : "transition-transform duration-200"}`}
                          strokeWidth={2}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="pilot-auto-faq-panel"
                  >
                    {isOpen ? (
                      <p
                        className={
                          reduceMotion ? "" : "pilot-auto-faq-panel-enter"
                        }
                      >
                        {item.answer}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
