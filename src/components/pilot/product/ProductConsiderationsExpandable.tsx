"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import type { ConsiderationItem } from "@/components/LineInsurancePage";
import { extractConsiderationTeaser } from "@/lib/extractConsiderationTeaser";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ProductConsiderationsExpandableProps = {
  items: ConsiderationItem[];
};

export default function ProductConsiderationsExpandable({
  items,
}: ProductConsiderationsExpandableProps) {
  const baseId = useId();
  const reduceMotion = usePrefersReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle(index);
    }
  };

  return (
    <section
      className="border-b border-border bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="pilot-product-considerations-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="pilot-product-considerations-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Practical considerations
            </h2>
          </div>
        </RevealOnScroll>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            const teaser = extractConsiderationTeaser(item.description);

            return (
              <li key={item.title} className="min-w-0">
                <RevealOnScroll className="h-full">
                  <div
                    className={`h-full rounded-xl border bg-offwhite transition-[border-color,box-shadow] ${
                      isOpen
                        ? "border-gold/35 shadow-[0_8px_24px_rgba(32,39,40,0.06)]"
                        : "border-border"
                    }`}
                  >
                    <h3 className="m-0">
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="flex w-full items-start justify-between gap-3 p-6 text-left sm:p-7"
                        onClick={() => toggle(index)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                      >
                        <span className="min-w-0">
                          <span className="block text-lg font-medium text-charcoal">
                            {item.title}
                          </span>
                          {!isOpen ? (
                            <span className="mt-2 block text-[15px] leading-relaxed text-secondary">
                              {teaser}
                            </span>
                          ) : null}
                        </span>
                        <ChevronDown
                          className={`mt-1 h-4 w-4 shrink-0 text-secondary transition-transform ${
                            reduceMotion ? "" : "duration-300 ease-out"
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
                      className={`grid px-6 sm:px-7 ${
                        reduceMotion ? "" : "transition-[grid-template-rows] duration-300 ease-out"
                      } ${isOpen ? "pb-6 sm:pb-7" : ""}`}
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        {isOpen ? (
                          <p
                            className={`text-[15px] leading-relaxed text-secondary ${
                              reduceMotion ? "" : "consideration-panel-enter"
                            }`}
                          >
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
