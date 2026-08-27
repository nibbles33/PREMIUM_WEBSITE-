"use client";

import type { KeyboardEvent } from "react";

type QuoteOptionButtonProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
  id: string;
};

export default function QuoteOptionButton({
  label,
  selected,
  onSelect,
  id,
}: QuoteOptionButtonProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      id={id}
      type="button"
      onClick={onSelect}
      onKeyDown={onKeyDown}
      aria-pressed={selected}
      className={`interactive-press min-h-[52px] w-full rounded-xl border px-4 py-3.5 text-left text-[15px] font-medium leading-snug transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-base ${
        selected
          ? "border-gold bg-gold/15 text-charcoal shadow-[0_6px_18px_rgba(208,173,38,0.18)]"
          : "border-border bg-white text-charcoal hover:border-gold-dark/50 hover:bg-offwhite"
      }`}
    >
      {label}
    </button>
  );
}
