"use client";

import { useState } from "react";
import type { QuoteCategory } from "@/lib/quote/types";
import { COMMERCIAL_LINES, lineGroup } from "@/components/quote/quoteLines";

type QuoteLineSwitcherProps = {
  category: QuoteCategory;
  onSelect: (category: QuoteCategory) => void;
};

const TOP: { id: "auto" | "home" | "commercial"; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "home", label: "Home" },
  { id: "commercial", label: "Commercial" },
];

export default function QuoteLineSwitcher({
  category,
  onSelect,
}: QuoteLineSwitcherProps) {
  const activeGroup = lineGroup(category);
  const [commercialOpen, setCommercialOpen] = useState(
    activeGroup === "commercial",
  );
  const showCommercial = commercialOpen || activeGroup === "commercial";

  return (
    <div className="mb-3">
      <div
        className="grid grid-cols-3 gap-2"
        role="group"
        aria-label="Coverage line"
      >
        {TOP.map((item) => {
          const selected = activeGroup === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                if (item.id === "commercial") {
                  setCommercialOpen(true);
                  return;
                }
                setCommercialOpen(false);
                if (item.id !== category) onSelect(item.id);
              }}
              className={`inline-flex h-11 items-center justify-center rounded-full border px-2 text-[13px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-[14px] ${
                selected
                  ? "border-charcoal bg-charcoal text-white"
                  : "border-border bg-white text-charcoal hover:border-gold-dark"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {showCommercial ? (
        <div
          className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3"
          role="group"
          aria-label="Commercial lines"
        >
          {COMMERCIAL_LINES.map((item) => {
            const selected = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  if (item.id !== category) onSelect(item.id);
                }}
                className={`inline-flex min-h-11 items-center justify-center rounded-full border px-3 text-[13px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  selected
                    ? "border-gold bg-gold/20 text-charcoal"
                    : "border-border bg-white text-charcoal hover:border-gold-dark"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
