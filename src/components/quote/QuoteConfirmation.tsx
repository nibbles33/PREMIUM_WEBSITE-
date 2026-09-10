"use client";

import { Check } from "lucide-react";

const PHONE_DISPLAY = "226-782-6000";
const PHONE_HREF = "tel:+12267826000";

export default function QuoteConfirmation() {
  return (
    <div className="flex flex-col items-center px-2 py-6 text-center sm:py-10">
      <span
        className="journey-check-enter inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-charcoal"
        aria-hidden
      >
        <Check className="h-7 w-7" strokeWidth={2.25} />
      </span>
      <h2 className="mt-6 text-2xl font-medium tracking-[-0.02em] text-charcoal sm:text-3xl">
        You&apos;re all set.
      </h2>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-secondary sm:text-base">
        We&apos;ve received your information. A licensed Premium Insurance
        Brokers broker will review it and follow up with you.
      </p>
      <p className="mt-6 text-[15px] leading-relaxed text-charcoal sm:text-base">
        Need to speak with someone now?{" "}
        <a
          href={PHONE_HREF}
          className="font-medium text-gold-dark underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Call {PHONE_DISPLAY}
        </a>
        .
      </p>
      <p className="mt-4 text-[14px] leading-relaxed text-secondary">
        Already a client and need to make a claim?{" "}
        <a
          href="/claims/"
          className="font-medium text-gold-dark underline-offset-4 hover:underline"
        >
          Visit our Claims page
        </a>
        .
      </p>
    </div>
  );
}
