import Image from "next/image";
import RevealOnScroll from "@/components/RevealOnScroll";

type WindsorBadge = {
  src: string;
  alt: string;
  tier: string;
  year: string;
};

type IndustryBadge = {
  src: string;
  alt: string;
  title: string;
  year: string;
  source: string;
};

const windsorBadges: WindsorBadge[] = [
  {
    src: "/images/awards/award-windsor-platinum-2021.png",
    alt: "Windsor Community Vote Platinum Winner 2021",
    tier: "Platinum",
    year: "2021",
  },
  {
    src: "/images/awards/award-windsor-platinum-2022.png",
    alt: "Windsor Community Vote Platinum Winner 2022",
    tier: "Platinum",
    year: "2022",
  },
  {
    src: "/images/awards/award-windsor-platinum-2023.png",
    alt: "Windsor Community Vote Platinum Winner 2023",
    tier: "Platinum",
    year: "2023",
  },
  {
    src: "/images/awards/award-windsor-platinum-2024.png",
    alt: "Windsor Community Vote Platinum Winner 2024",
    tier: "Platinum",
    year: "2024",
  },
  {
    src: "/images/awards/award-windsor-gold-2026.png",
    alt: "Windsor Community Vote Gold Winner 2026",
    tier: "Gold",
    year: "2026",
  },
];

const industryBadges: IndustryBadge[] = [
  {
    src: "/images/awards/award-5star-brokerage-2021.png",
    alt: "Insurance Business Canada 5-Star Brokerage 2021",
    title: "5-Star Brokerage",
    year: "2021",
    source: "Insurance Business Canada",
  },
  {
    src: "/images/awards/award-5star-brokerage-ontario-2022.png",
    alt: "Insurance Business Canada 5-Star Brokerage Ontario 2022",
    title: "5-Star Brokerage, Ontario",
    year: "2022",
    source: "Insurance Business Canada",
  },
  {
    src: "/images/awards/award-fast-brokerages-2024.png",
    alt: "Insurance Business Canada Fast Brokerages 2024",
    title: "Fast Brokerages",
    year: "2024",
    source: "Insurance Business Canada",
  },
];

function BadgeImage({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="relative flex h-[100px] w-[100px] items-center justify-center sm:h-[112px] sm:w-[112px]">
      <Image
        src={src}
        alt={alt}
        width={112}
        height={112}
        className="h-full w-full object-contain opacity-90 grayscale transition-[filter,opacity] duration-300 ease-out hover:opacity-100 hover:grayscale-0"
      />
    </span>
  );
}

export default function AwardsSection() {
  return (
    <section
      className="border-t border-border bg-offwhite py-14 sm:py-16 lg:py-20"
      aria-labelledby="awards-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="awards-heading"
              className="text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Proudly Windsor-Essex, since 2019
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary sm:text-base">
              Recognized by our community and our industry.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid items-start gap-10 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12">
          <div>
            <RevealOnScroll>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-charcoal">
                  Windsor Community Vote
                </h3>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-secondary">
                  Platinum Winner four years running, Gold Winner in 2026.
                </p>
              </div>
            </RevealOnScroll>

            <RevealOnScroll className="mt-6">
              <ul className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
                {windsorBadges.map((badge) => (
                  <li
                    key={badge.src}
                    className="flex w-[7.5rem] shrink-0 flex-col items-center text-center sm:w-auto"
                  >
                    <BadgeImage src={badge.src} alt={badge.alt} />
                    <p className="mt-3 text-[12px] leading-snug sm:text-[13px]">
                      <span className="text-secondary">{badge.tier}</span>
                      <span className="text-secondary"> — </span>
                      <span className="font-medium text-charcoal">
                        {badge.year}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>
          </div>

          <RevealOnScroll>
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[17px] shadow-[0_16px_40px_rgba(32,39,40,0.12)] lg:aspect-auto lg:min-h-[280px] lg:h-full">
              <Image
                src="/images/awards/event-golf-sponsorship.jpg"
                alt="Premium Insurance Brokers at Beachgrove Golf & Country Club for a Windsor-Essex community sponsorship event"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
            </figure>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mt-14 border-t border-border pt-12 sm:mt-16 sm:pt-14">
          <div>
            <h3 className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-charcoal">
              Industry Recognition
            </h3>
            <ul className="mt-8 flex justify-start gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center sm:gap-10 sm:overflow-visible">
              {industryBadges.map((badge) => (
                <li
                  key={badge.src}
                  className="flex w-[10.5rem] shrink-0 flex-col items-center text-center sm:w-[12rem]"
                >
                  <BadgeImage src={badge.src} alt={badge.alt} />
                  <p className="mt-3 text-[12px] leading-snug sm:text-[13px]">
                    <span className="text-secondary">{badge.title}</span>
                    <span className="text-secondary"> — </span>
                    <span className="font-medium text-charcoal">
                      {badge.year}
                    </span>
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-secondary sm:text-[12px]">
                    ({badge.source})
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
