"use client";

import { useState } from "react";
import { Building2, Car, Home, type LucideIcon } from "lucide-react";
import type { QuoteCategory } from "@/lib/quote/types";
import { COMMERCIAL_LINES } from "@/components/quote/quoteLines";

const TOP: {
  id: "auto" | "home" | "commercial";
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  {
    id: "auto",
    label: "Auto",
    hint: "Car, SUV, pickup, van, motorcycle, or boat",
    icon: Car,
  },
  {
    id: "home",
    label: "Home",
    hint: "House, condo, tenant, or landlord",
    icon: Home,
  },
  {
    id: "commercial",
    label: "Commercial",
    hint: "Business, commercial vehicles, or farm",
    icon: Building2,
  },
];

type QuoteCategoryPickerProps = {
  onSelect: (category: QuoteCategory) => void;
};

export default function QuoteCategoryPicker({
  onSelect,
}: QuoteCategoryPickerProps) {
  const [commercialOpen, setCommercialOpen] = useState(false);

  return (
    <div>
      <h2 className="text-[1.15rem] font-medium tracking-[-0.02em] text-charcoal sm:text-[1.3rem]">
        Choose a line
      </h2>
      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {TOP.map((option) => {
          const Icon = option.icon;
          const open = option.id === "commercial" && commercialOpen;
          return (
            <li key={option.id}>
              <button
                type="button"
                aria-expanded={option.id === "commercial" ? commercialOpen : undefined}
                onClick={() => {
                  if (option.id === "commercial") {
                    setCommercialOpen((value) => !value);
                    return;
                  }
                  onSelect(option.id);
                }}
                className={`interactive-press flex min-h-[108px] w-full flex-col items-start justify-between rounded-2xl border bg-white px-4 py-3.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  open
                    ? "border-charcoal"
                    : "border-border hover:border-gold-dark"
                }`}
              >
                <Icon className="h-5 w-5 text-gold-dark" strokeWidth={1.5} aria-hidden />
                <span>
                  <span className="block text-[16px] font-medium text-charcoal">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-[12px] leading-snug text-secondary sm:text-[13px]">
                    {option.hint}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {commercialOpen ? (
        <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {COMMERCIAL_LINES.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onSelect(option.id)}
                className="interactive-press flex min-h-11 w-full items-center justify-center rounded-full border border-border bg-white px-3 text-[14px] font-medium text-charcoal hover:border-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
