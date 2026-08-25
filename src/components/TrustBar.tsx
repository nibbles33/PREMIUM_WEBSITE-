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
        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-0 px-4 py-3.5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-6 xl:max-w-7xl xl:grid-cols-5 xl:px-8">
          {trustPoints.map((point, index) => (
            <li
              key={point}
              className={`flex items-start gap-2 px-1 py-2.5 text-[13px] font-normal leading-snug text-secondary sm:items-center sm:px-3 sm:py-2 xl:px-3 ${
                index > 0 ? "border-t border-border sm:border-t-0" : ""
              } ${index % 2 === 1 ? "sm:border-l sm:border-border" : ""} ${
                index >= 2 ? "lg:border-l lg:border-border" : ""
              } ${
                index === 3 || index === 4
                  ? "lg:border-t lg:border-border xl:border-t-0"
                  : ""
              } ${index > 0 ? "xl:border-l xl:border-border" : ""}`}
            >
              <Check
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark sm:mt-0"
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
