import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  HOMEPAGE_AUTHORITY,
  HOMEPAGE_TEAM_FEATURED,
} from "@/data/homepage-authority";
import { teamMembers } from "@/data/team";

const BROKER_HREF = "/contact/?intent=broker";

/**
 * Human credibility — real Premium team photos only.
 */
export default function PilotTeamCredibility() {
  const featured = HOMEPAGE_TEAM_FEATURED.map((name) =>
    teamMembers.find((member) => member.name === name),
  ).filter((member): member is (typeof teamMembers)[number] => Boolean(member));

  return (
    <section
      className="border-t border-border bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="pilot-team-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold-dark">
              Real brokers
            </p>
            <h2
              id="pilot-team-heading"
              className="mt-2 text-[1.75rem] font-medium tracking-[-0.02em] text-charcoal sm:text-3xl"
            >
              Real brokers. Real advice.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-secondary">
              Technology should make insurance easier — not remove the person
              responsible for helping you.{" "}
              {HOMEPAGE_AUTHORITY.combinedExperience.value} years combined
              experience across the Premium team.
            </p>
          </div>
        </RevealOnScroll>

        {featured.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {featured.map((member) => (
              <li key={member.name}>
                <RevealOnScroll>
                  <article className="overflow-hidden rounded-[14px] border border-border bg-offwhite/70">
                    <div className="relative aspect-[4/5] bg-[#eceae4]">
                      <Image
                        src={member.photo}
                        alt={member.photoAlt}
                        fill
                        sizes="(max-width: 1024px) 45vw, 22vw"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="px-3 py-3.5 sm:px-4">
                      <p className="text-[14px] font-medium text-charcoal sm:text-[15px]">
                        {member.name}
                      </p>
                      <p className="mt-0.5 text-[12px] text-secondary">
                        {member.title}
                      </p>
                    </div>
                  </article>
                </RevealOnScroll>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/team/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-white px-5 py-2.5 text-[14px] font-medium text-charcoal transition-colors hover:border-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Meet the Team
          </Link>
          <Link
            href={BROKER_HREF}
            className="inline-flex items-center justify-center rounded-full bg-charcoal px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-charcoal/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          >
            Talk to a Broker
          </Link>
        </div>
      </div>
    </section>
  );
}
