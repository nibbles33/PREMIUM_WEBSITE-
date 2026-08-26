"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Check,
  Minus,
  UserRound,
} from "lucide-react";
import {
  useCallback,
  useId,
  useState,
  type CSSProperties,
} from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const BROKER_HREF = "/talk-to-a-broker/";
const QUOTE_HREF = "/get-a-quote/";
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const SWAP_MS = 300;
const STAGGER_MS = 70;

type FeatureKind = "benefit" | "tradeoff" | "absent";

type OptionCard = {
  id: "a" | "b" | "c";
  name: string;
  tier: string;
  features: { label: string; kind: FeatureKind }[];
  badge?: {
    label: string;
    note: string;
  };
};

const OPTIONS: OptionCard[] = [
  {
    id: "a",
    name: "Option A",
    tier: "$",
    features: [
      { label: "$2M Liability", kind: "benefit" },
      { label: "Sewer Backup", kind: "benefit" },
      { label: "Claim Forgiveness", kind: "benefit" },
      { label: "$2,500 Deductible", kind: "tradeoff" },
    ],
    badge: {
      label: "Lowest price",
      note: "Option A is cheaper, but carries a higher deductible.",
    },
  },
  {
    id: "b",
    name: "Option B",
    tier: "$$",
    features: [
      { label: "$2M Liability", kind: "benefit" },
      { label: "Higher Water Damage Limit", kind: "benefit" },
      { label: "Lower Deductible", kind: "benefit" },
      { label: "No Claim Forgiveness", kind: "absent" },
    ],
    badge: {
      label: "Best fit",
      note: "Option B costs a little more, but provides a lower deductible and stronger water coverage.",
    },
  },
  {
    id: "c",
    name: "Option C",
    tier: "$$$",
    features: [
      { label: "$2M Liability", kind: "benefit" },
      { label: "Rental Vehicle", kind: "benefit" },
      { label: "Sewer Backup", kind: "benefit" },
      { label: "Different Deductible", kind: "tradeoff" },
    ],
  },
];

function ComplianceLabel({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-[12px] font-medium uppercase tracking-[0.08em] text-gold-dark ${className}`}
    >
      Illustrative example — not an actual quote
    </p>
  );
}

function FeatureIcon({ kind }: { kind: FeatureKind }) {
  if (kind === "benefit") {
    return (
      <span
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-charcoal"
        aria-label="Included"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
      </span>
    );
  }

  if (kind === "tradeoff") {
    return (
      <span
        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3EDE3] text-[#8A6A3A] ring-1 ring-[#D4C4A8]"
        aria-label="Trade-off"
      >
        <AlertTriangle className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      </span>
    );
  }

  return (
    <span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ECEAE4] text-secondary ring-1 ring-border"
      aria-label="Not included"
    >
      <Minus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
    </span>
  );
}

export default function Differentiator() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const [brokerAdded, setBrokerAdded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  const addBroker = useCallback(() => {
    if (brokerAdded) return;
    setBrokerAdded(true);

    if (reduceMotion) {
      setExpanded(true);
      setContentReady(true);
      return;
    }

    // Expand cards first, then reveal coverage + advisor layer
    requestAnimationFrame(() => {
      setExpanded(true);
      window.setTimeout(() => setContentReady(true), SWAP_MS * 0.55);
    });
  }, [brokerAdded, reduceMotion]);

  const resetComparison = useCallback(() => {
    setContentReady(false);
    setExpanded(false);
    if (reduceMotion) {
      setBrokerAdded(false);
      return;
    }
    window.setTimeout(() => setBrokerAdded(false), SWAP_MS * 0.4);
  }, [reduceMotion]);

  const cardTransition: CSSProperties = reduceMotion
    ? { transition: "none" }
    : {
        transition: `border-color ${SWAP_MS}ms ease-out, box-shadow ${SWAP_MS}ms ease-out, transform ${SWAP_MS}ms ${SPRING}, background-color ${SWAP_MS}ms ease-out`,
      };

  const detailTransition: CSSProperties = reduceMotion
    ? { transition: "none" }
    : {
        transition: `opacity ${SWAP_MS}ms ease-out, transform ${SWAP_MS}ms ${SPRING}, max-height ${SWAP_MS}ms ${SPRING}`,
      };

  return (
    <section
      className="border-t border-border bg-offwhite py-16 sm:py-20 lg:py-24"
      aria-labelledby="differentiator-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 xl:max-w-7xl">
        <RevealOnScroll>
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="differentiator-heading"
              className="text-[1.875rem] font-medium leading-[1.12] tracking-[-0.02em] sm:text-4xl sm:leading-[1.1] lg:text-[2.75rem] xl:text-[3rem]"
            >
              <span className="text-charcoal">Technology finds your options.</span>{" "}
              <span className="text-gold">A broker finds the right one.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-secondary sm:mt-6 sm:text-base">
              Comparison apps show you prices. We show you what those prices
              actually cover — and speak up for you when it matters.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mx-auto mt-12 max-w-5xl sm:mt-14 lg:mt-16">
          <div className="rounded-[18px] border border-border bg-white p-5 shadow-[0_16px_40px_rgba(32,39,40,0.08)] sm:p-7 lg:p-8">
            <ComplianceLabel className="text-center" />

            <div
              id={`${baseId}-demo`}
              aria-live="polite"
              className="mt-5 sm:mt-6"
            >
              <p className="sr-only">
                {brokerAdded
                  ? "Broker comparison view: three illustrative options with coverage details and broker notes."
                  : "Comparison view: three illustrative options shown as relative price tiers only."}
              </p>

              {/* Mobile: intentional vertical stack. Desktop: 3-column row. */}
              <ul className="flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-4 lg:gap-5">
                {OPTIONS.map((option, index) => {
                  const showDetails = expanded && contentReady;
                  const staggerDelay = reduceMotion
                    ? 0
                    : index * STAGGER_MS;

                  return (
                    <li key={option.id} className="min-w-0">
                      <article
                        className={`relative flex h-full flex-col overflow-hidden rounded-[14px] border px-4 py-5 sm:px-5 sm:py-6 ${
                          expanded
                            ? "border-gold/35 bg-offwhite/90 shadow-[0_10px_28px_rgba(32,39,40,0.08)]"
                            : "border-[#d8d8d8] bg-[#f7f7f7]"
                        }`}
                        style={cardTransition}
                      >
                        <div className="text-center">
                          <p
                            className={`text-[13px] font-medium ${
                              expanded ? "text-charcoal" : "text-[#555555]"
                            }`}
                            style={
                              expanded
                                ? undefined
                                : {
                                    fontFamily: "Arial, Helvetica, sans-serif",
                                  }
                            }
                          >
                            {option.name}
                          </p>
                          <p
                            className={`mt-2 font-bold tracking-tight ${
                              expanded
                                ? "text-2xl text-charcoal sm:text-[1.65rem]"
                                : "text-[26px] text-[#222222] sm:text-[28px]"
                            }`}
                            style={
                              expanded
                                ? undefined
                                : {
                                    fontFamily: "Arial, Helvetica, sans-serif",
                                  }
                            }
                            aria-label={`Price tier ${option.tier.length} of 3`}
                          >
                            {option.tier}
                          </p>
                        </div>

                        {/* Expanded coverage list */}
                        <div
                          className={`overflow-hidden ${
                            showDetails
                              ? "mt-5 max-h-[280px] translate-y-0 opacity-100"
                              : "mt-0 max-h-0 translate-y-2 opacity-0"
                          }`}
                          style={{
                            ...detailTransition,
                            transitionDelay: showDetails
                              ? `${staggerDelay}ms`
                              : "0ms",
                          }}
                          aria-hidden={!showDetails}
                        >
                          <ul className="space-y-2.5 text-left">
                            {option.features.map((feature) => (
                              <li
                                key={feature.label}
                                className="flex items-start gap-2.5"
                              >
                                <FeatureIcon kind={feature.kind} />
                                <span
                                  className={`pt-0.5 text-[13px] font-medium leading-snug sm:text-[14px] ${
                                    feature.kind === "absent"
                                      ? "text-secondary"
                                      : feature.kind === "tradeoff"
                                        ? "text-secondary"
                                        : "text-charcoal"
                                  }`}
                                >
                                  {feature.label}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {option.badge ? (
                            <div
                              className={`mt-4 rounded-lg border px-3 py-3 ${
                                option.badge.label === "Best fit"
                                  ? "border-gold/35 bg-[color-mix(in_srgb,#D0AD26_10%,white)]"
                                  : "border-border bg-white"
                              }`}
                            >
                              <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-charcoal">
                                <UserRound
                                  className="h-3.5 w-3.5 text-gold-dark"
                                  strokeWidth={1.75}
                                  aria-hidden
                                />
                                {option.badge.label}
                              </p>
                              <p className="mt-1.5 text-[12px] leading-snug text-secondary sm:text-[13px]">
                                {option.badge.note}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>

              {/* Advisor reinforcement + CTAs after reveal */}
              <div
                className={`${
                  contentReady
                    ? "mt-7 translate-y-0 opacity-100 sm:mt-8"
                    : "mt-0 max-h-0 translate-y-2 overflow-hidden opacity-0"
                }`}
                style={detailTransition}
                aria-hidden={!contentReady}
              >
                <div className="mx-auto flex max-w-2xl items-start gap-3 rounded-[12px] border border-border bg-offwhite/80 px-4 py-4 sm:px-5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-charcoal text-gold">
                    <UserRound className="h-5 w-5" strokeWidth={1.5} aria-hidden />
                  </span>
                  <p className="text-[14px] leading-relaxed text-secondary sm:text-[15px]">
                    The lowest price isn&apos;t always the right option. A
                    Premium broker helps you understand the difference.
                  </p>
                </div>

                <div className="mt-6 flex flex-col items-center gap-3 sm:mt-7 sm:flex-row sm:justify-center sm:gap-4">
                  <Link
                    href={BROKER_HREF}
                    className="btn-primary btn-primary-gradient group inline-flex h-12 w-full min-w-[44px] items-center justify-center rounded-md px-6 text-sm font-medium text-charcoal sm:w-auto sm:min-w-[200px]"
                  >
                    Talk to a Broker
                    <span
                      aria-hidden
                      className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href={QUOTE_HREF}
                    className="btn-secondary inline-flex h-12 w-full min-w-[44px] items-center justify-center rounded-md border border-charcoal/70 bg-transparent px-6 text-sm font-medium text-charcoal hover:border-gold-dark hover:text-gold-dark sm:w-auto sm:min-w-[180px]"
                  >
                    Get a Quote
                    <span aria-hidden className="ml-1.5">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3 border-t border-border/80 pt-6 sm:mt-8 sm:pt-7">
              {!brokerAdded ? (
                <button
                  type="button"
                  aria-controls={`${baseId}-demo`}
                  aria-expanded={false}
                  onClick={addBroker}
                  className="btn-primary btn-primary-gradient interactive-press inline-flex h-14 min-w-[44px] items-center justify-center rounded-md px-8 text-[15px] font-semibold text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal sm:min-w-[280px] sm:px-10"
                >
                  + Add a Premium Broker
                </button>
              ) : (
                <button
                  type="button"
                  aria-controls={`${baseId}-demo`}
                  aria-expanded={true}
                  onClick={resetComparison}
                  className="inline-flex h-12 min-w-[44px] items-center justify-center rounded-md border border-charcoal/25 bg-transparent px-6 text-sm font-medium text-charcoal transition-colors hover:border-gold-dark hover:text-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:min-w-[220px]"
                >
                  Compare again
                </button>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
