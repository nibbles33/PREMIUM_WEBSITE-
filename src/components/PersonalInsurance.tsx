import Link from "next/link";
import { Car, Home, type LucideIcon } from "lucide-react";

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
      className="border-t border-border bg-offwhite py-14 sm:py-16 lg:py-20"
      aria-labelledby="personal-insurance-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
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

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="group flex h-full flex-col border border-border bg-white p-8 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-1 hover:border-gold hover:shadow-[0_8px_24px_rgba(32,39,40,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark sm:p-9 lg:p-10"
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
