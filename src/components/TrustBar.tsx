import { Check } from "lucide-react";
import { trustPoints } from "@/data/trust-points";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function TrustBar() {
  return (
    <section
      className="border-y border-border bg-offwhite"
      aria-label="Why PremiumIB"
    >
      <RevealOnScroll>
        <ul className="mx-auto flex max-w-6xl flex-col items-stretch gap-0 px-4 py-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-0 sm:px-6 lg:flex-nowrap lg:justify-between lg:px-8 xl:max-w-7xl">
          {trustPoints.map((point, index) => (
            <li
              key={point}
              className={`flex items-center gap-2 py-2 text-[13px] font-normal leading-none text-secondary sm:px-5 sm:py-1 ${
                index > 0
                  ? "border-t border-border sm:border-l sm:border-t-0"
                  : ""
              }`}
            >
              <Check
                className="h-3.5 w-3.5 shrink-0 text-gold-dark"
                strokeWidth={1.75}
                aria-hidden
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}
