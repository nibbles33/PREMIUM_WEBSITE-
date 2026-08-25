import Link from "next/link";
import { Building2, Car, Home, Truck, type LucideIcon } from "lucide-react";

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
    description: "Personal auto coverage",
  },
  {
    label: "My Home",
    type: "home",
    icon: Home,
    description: "Home & contents",
  },
  {
    label: "My Business",
    type: "business",
    icon: Building2,
    description: "Commercial policies",
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
      className="bg-offwhite py-16 sm:py-20 lg:py-24"
      aria-labelledby="selector-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="selector-heading"
            className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
          >
            What can we help you insure?
          </h2>
          <p className="mt-3 text-base text-secondary">
            Answer a few quick questions — a licensed broker takes it from
            there.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <li key={option.type}>
                <Link
                  href={`/get-a-quote?type=${option.type}`}
                  className="group flex min-h-[44px] h-full flex-col items-start gap-4 border border-border bg-white p-4 transition-[border-color,background-color,transform] duration-200 ease-out hover:border-gold hover:bg-[color-mix(in_srgb,var(--brand-gold)_8%,white)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark active:scale-[0.99] sm:p-5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center border border-border bg-offwhite transition-colors group-hover:border-gold/40 group-hover:bg-white">
                    <Icon
                      className="h-5 w-5 text-gold-dark"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-charcoal sm:text-base">
                      {option.label}
                    </span>
                    <span className="mt-1 block text-xs text-secondary sm:text-sm">
                      {option.description}
                    </span>
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
