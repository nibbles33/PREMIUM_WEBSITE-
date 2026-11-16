import Link from "next/link";
import CountUpStat from "@/components/CountUpStat";
import { HOMEPAGE_AUTHORITY } from "@/data/homepage-authority";

const VALUE_CLASS =
  "text-[1.95rem] font-medium leading-none tracking-[-0.03em] text-charcoal sm:text-[2.25rem] lg:text-[2.5rem]";
const LABEL_CLASS =
  "mt-2.5 text-[12px] font-medium uppercase tracking-[0.14em] text-secondary sm:text-[13px]";

/**
 * Editorial authority band under the hero.
 * The Google cell links to the Business Profile. It does not show a rating
 * or review count. Oracle RMS remains in the hero, Windsor story, and
 * company identity.
 *
 * Note: a carrier count is intentionally not shown.
 */
export default function PilotAuthorityStrip() {
  const { clients, google } = HOMEPAGE_AUTHORITY;

  return (
    <section
      className="pilot-authority-strip border-b border-border bg-[#F7F1E4]"
      aria-label="Premium Insurance Brokers at a glance"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <ul className="grid grid-cols-2 lg:grid-cols-4">
          <li className="flex min-h-[118px] flex-col justify-center px-3 py-5 sm:min-h-[136px] sm:px-5 sm:py-7 lg:min-h-[148px] lg:px-7">
            <CountUpStat
              value={2700}
              suffix="+"
              ariaLabel={`${clients.value} ${clients.label}`}
              className={VALUE_CLASS}
            />
            <p className={LABEL_CLASS}>{clients.label}</p>
          </li>

          <li className="flex min-h-[118px] flex-col justify-center border-l border-border/70 px-3 py-5 sm:min-h-[136px] sm:px-5 sm:py-7 lg:min-h-[148px] lg:px-7">
            <CountUpStat
              value={31}
              suffix="+"
              ariaLabel="31+ years combined experience"
              className={VALUE_CLASS}
            />
            <p className={LABEL_CLASS}>Years combined experience</p>
          </li>

          <li className="flex min-h-[118px] flex-col justify-center border-t border-border/70 px-3 py-5 sm:min-h-[136px] sm:px-5 sm:py-7 lg:min-h-[148px] lg:border-l lg:border-t-0 lg:px-7">
            <CountUpStat
              value={9}
              ariaLabel="9 awards and recognition"
              className={VALUE_CLASS}
            />
            <p className={LABEL_CLASS}>Awards &amp; recognition</p>
          </li>

          <li className="flex min-h-[118px] flex-col justify-center border-l border-t border-border/70 px-3 py-5 sm:min-h-[136px] sm:px-5 sm:py-7 lg:min-h-[148px] lg:border-t-0 lg:px-7">
            <p className={VALUE_CLASS}>Google</p>
            <p className={LABEL_CLASS}>Client reviews</p>
            <Link
              href={google.shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-[12px] font-medium text-gold-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:text-[13px]"
            >
              Read on Google →
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
