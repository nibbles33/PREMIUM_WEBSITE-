"use client";

import {
  Building2,
  Car,
  Home,
  Tractor,
  Truck,
  type LucideIcon,
} from "lucide-react";
import type { QuoteCategory } from "@/lib/quote/types";
import { CATEGORY_LABELS } from "@/lib/quote/types";

const OPTIONS: {
  id: QuoteCategory;
  label: string;
  icon: LucideIcon;
  accent: string;
}[] = [
  { id: "auto", label: CATEGORY_LABELS.auto, icon: Car, accent: "#5B7A99" },
  { id: "home", label: CATEGORY_LABELS.home, icon: Home, accent: "#B37A5A" },
  {
    id: "business",
    label: CATEGORY_LABELS.business,
    icon: Building2,
    accent: "#5A8A73",
  },
  {
    id: "commercialAuto",
    label: CATEGORY_LABELS.commercialAuto,
    icon: Truck,
    accent: "#D0AD26",
  },
  {
    id: "farm",
    label: CATEGORY_LABELS.farm,
    icon: Tractor,
    accent: "#6B8F5E",
  },
];

type QuoteCategoryPickerProps = {
  onSelect: (category: QuoteCategory) => void;
};

export default function QuoteCategoryPicker({
  onSelect,
}: QuoteCategoryPickerProps) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
        Get a quote
      </p>
      <h1 className="mt-3 text-[1.75rem] font-medium leading-[1.12] tracking-[-0.02em] text-charcoal sm:text-3xl">
        What are you looking to insure?
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-secondary">
        Pick a category to start — it only takes a minute.
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {OPTIONS.map((option) => {
          const Icon = option.icon;
          return (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => onSelect(option.id)}
                className="interactive-press flex min-h-[64px] w-full items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 text-left transition-colors hover:border-gold-dark/50 hover:bg-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <span
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${option.accent} 14%, #FAFAF8)`,
                  }}
                >
                  <Icon
                    className="h-5 w-5"
                    style={{ color: option.accent }}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <span className="text-[15px] font-medium text-charcoal sm:text-base">
                  {option.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
