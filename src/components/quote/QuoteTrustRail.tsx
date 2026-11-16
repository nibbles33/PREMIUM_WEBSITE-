import Link from "next/link";
import { WHY_PREMIUM_POINTS } from "@/data/homepage-authority";

/** Compact credibility rail. Secondary to the quote wizard. */
export default function QuoteTrustRail() {
  return (
    <aside aria-label="Why Premium">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
        Why Premium
      </p>
      <ul className="mt-2 divide-y divide-border/80 border-y border-border/80">
        {WHY_PREMIUM_POINTS.map((point) => (
          <li key={point.title} className="py-2.5">
            <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-charcoal">
              {point.title}
            </p>
            <p className="mt-1 text-[13px] leading-snug text-secondary">
              {point.body}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[13px] leading-snug text-charcoal">
        RIBO-licensed property and casualty brokers. A division of Oracle RMS.
      </p>
      <p className="mt-1 text-[13px] leading-snug text-secondary">
        3063 Dougall Ave, Windsor, ON
      </p>
      <a
        href="tel:+12267826000"
        className="mt-2 inline-flex min-h-11 items-center text-[14px] font-medium text-charcoal underline-offset-4 hover:text-gold-dark hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        226-782-6000
      </a>
      <div>
        <Link
          href="/compliance/"
          className="inline-flex min-h-11 items-center text-[13px] font-medium text-gold-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Licensing and disclosure
        </Link>
      </div>
    </aside>
  );
}
