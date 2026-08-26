import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

type AwardBadge = {
  src: string;
  alt: string;
  /** Left side of caption, e.g. "Platinum" or "5-Star Brokerage, Ontario" */
  label: string;
  year: string;
  source?: string;
};

/** Strongest verified subset — full history retained in the streak line below. */
const featuredBadges: AwardBadge[] = [
  {
    src: "/images/awards/award-windsor-platinum-2024.png",
    alt: "Windsor Community Vote Platinum Winner 2024",
    label: "Platinum",
    year: "2024",
  },
  {
    src: "/images/awards/award-windsor-gold-2026.png",
    alt: "Windsor Community Vote Gold Winner 2026",
    label: "Gold",
    year: "2026",
  },
  {
    src: "/images/awards/award-5star-brokerage-ontario-2022.png",
    alt: "Insurance Business Canada 5-Star Brokerage Ontario 2022",
    label: "5-Star Brokerage, Ontario",
    year: "2022",
    source: "Insurance Business Canada",
  },
  {
    src: "/images/awards/award-fast-brokerages-2024.png",
    alt: "Insurance Business Canada Fast Brokerages 2024",
    label: "Fast Brokerages",
    year: "2024",
    source: "Insurance Business Canada",
  },
];

function BadgeImage({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative flex h-[72px] w-[72px] items-center justify-center sm:h-[80px] sm:w-[80px]">
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="h-full w-full object-contain opacity-90 grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0"
      />
    </span>
  );
}

export default function AwardsSection() {
  return (
    <section
      className="border-t border-border bg-offwhite py-12 sm:py-14 lg:py-16"
      aria-labelledby="awards-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="awards-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Built here. Recognized here.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
              Windsor-Essex since 2019 — recognized by our community and our
              industry.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
          <RevealOnScroll>
            <div>
              <ul className="flex flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-x-8 sm:gap-y-6 lg:justify-start">
                {featuredBadges.map((badge) => (
                  <li
                    key={badge.src}
                    className="flex w-[6.75rem] flex-col items-center text-center sm:w-[7.5rem]"
                  >
                    <BadgeImage src={badge.src} alt={badge.alt} />
                    <p className="mt-2.5 text-[11px] leading-snug sm:text-[12px]">
                      <span className="text-secondary">{badge.label}</span>
                      <span className="text-secondary"> — </span>
                      <span className="font-medium text-charcoal">
                        {badge.year}
                      </span>
                    </p>
                    {badge.source ? (
                      <p className="mt-0.5 text-[10px] leading-snug text-secondary/80 sm:text-[11px]">
                        {badge.source}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-center text-[13px] leading-relaxed text-secondary sm:text-[14px] lg:text-left">
                Platinum Winner four years running (2021–2024) · Gold Winner
                2026
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <figure className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[14px] shadow-[0_12px_28px_rgba(32,39,40,0.1)] lg:mx-0 lg:max-w-none lg:min-h-[200px] lg:aspect-[5/4]">
              <Image
                src="/images/awards/event-golf-sponsorship.jpg"
                alt="Premium Insurance Brokers community sponsorship banner."
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover object-center"
              />
            </figure>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
