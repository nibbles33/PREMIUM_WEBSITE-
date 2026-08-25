import Link from "next/link";
import { Car, Home, type LucideIcon } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

type PersonalCard = {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
};

const cards: PersonalCard[] = [
  {
    title: "Auto Insurance",
    description:
      "Liability, collision, and comprehensive coverage for cars, trucks, and more.",
    href: "/auto-insurance/",
    cta: "See Auto Coverage",
    icon: Car,
  },
  {
    title: "Home Insurance",
    description:
      "Protection for your property, belongings, and liability — owned or rented.",
    href: "/home-insurance/",
    cta: "See Home Coverage",
    icon: Home,
  },
];

export default function PersonalInsurance() {
  return (
    <section
      className="border-t border-border py-14 sm:py-16 lg:py-20"
      style={{ backgroundColor: "#FBF5E5" }}
      aria-labelledby="personal-insurance-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="personal-insurance-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Personal insurance, covered properly
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
              Auto and home coverage built around how you actually live — not a
              one-size template.
            </p>
          </div>
        </RevealOnScroll>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="card-interactive group flex h-full flex-col border border-border bg-white p-8 hover:border-gold sm:p-9 lg:p-10"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,#D0AD26_14%,#FAFAF8)] transition-colors group-hover:bg-[color-mix(in_srgb,#D0AD26_22%,#FAFAF8)]">
                    <Icon
                      className="h-6 w-6 text-gold-dark"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                  <h3 className="mt-6 text-xl font-medium tracking-tight text-charcoal">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-secondary">
                    {card.description}
                  </p>
                  <span className="mt-6 inline-flex items-center text-sm font-medium text-gold-dark">
                    {card.cta}
                    <span
                      aria-hidden
                      className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                    >
                      →
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
