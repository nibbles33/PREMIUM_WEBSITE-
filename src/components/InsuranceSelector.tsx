import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Car,
  Home,
  Truck,
  type LucideIcon,
} from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

type QuoteOption = {
  label: string;
  type: string;
  icon: LucideIcon;
  description: string;
};

const options: QuoteOption[] = [
  {
    label: "My Vehicle",
    type: "vehicle",
    icon: Car,
    description: "Cars, trucks & more",
  },
  {
    label: "My Home",
    type: "home",
    icon: Home,
    description: "House, condo & contents",
  },
  {
    label: "My Business",
    type: "business",
    icon: Building2,
    description: "Shops, offices & trades",
  },
  {
    label: "Commercial Vehicles",
    type: "commercial-vehicles",
    icon: Truck,
    description: "Fleets & work vehicles",
  },
];

export default function InsuranceSelector() {
  return (
    <section
      className="bg-offwhite py-14 sm:py-16 lg:py-20"
      aria-labelledby="selector-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-gold-dark">
              Choose where you want to start
            </p>
            <h2
              id="selector-heading"
              className="mt-3 text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              What can we help you insure?
            </h2>
            <p className="mt-3 text-[15px] text-secondary sm:text-base">
              Answer a few quick questions — a licensed broker takes it from
              there.
            </p>
          </div>
        </RevealOnScroll>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <li key={option.type} className="min-w-0">
                <Link
                  href={`/get-a-quote?type=${option.type}`}
                  className="card-interactive group flex h-full min-h-[44px] flex-col border border-border bg-white p-4 hover:border-gold hover:bg-[color-mix(in_srgb,var(--brand-gold)_9%,white)] focus-visible:border-gold focus-visible:bg-[color-mix(in_srgb,var(--brand-gold)_9%,white)] sm:p-5"
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color-mix(in_srgb,#D0AD26_14%,#FAFAF8)] transition-colors group-hover:bg-[color-mix(in_srgb,#D0AD26_22%,#FAFAF8)] group-focus-visible:bg-[color-mix(in_srgb,#D0AD26_22%,#FAFAF8)] sm:h-12 sm:w-12">
                      <Icon
                        className="h-5 w-5 text-gold-dark sm:h-6 sm:w-6"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </span>
                    <ArrowRight
                      className="mt-1 h-4 w-4 shrink-0 text-secondary transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:text-gold-dark group-focus-visible:translate-x-[3px] group-focus-visible:text-gold-dark"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <span className="mt-4 block text-sm font-medium leading-snug text-charcoal sm:mt-5 sm:text-base">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-xs leading-snug text-secondary sm:text-[13px]">
                    {option.description}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
