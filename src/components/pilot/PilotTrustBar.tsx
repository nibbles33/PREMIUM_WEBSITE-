import { Check } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { trustPoints } from "@/data/trust-points";

export default function PilotTrustBar() {
  return (
    <section className="bg-offwhite" aria-label="Why Premium Insurance Brokers">
      <RevealOnScroll>
        <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-0 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8 xl:max-w-7xl">
          {trustPoints.map((point, index) => (
            <li
              key={point}
              className={`flex items-start gap-2 px-2 py-2.5 text-[13px] leading-snug text-secondary sm:items-center ${
                index > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""
              }`}
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
