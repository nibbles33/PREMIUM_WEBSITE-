"use client";

import Link from "next/link";
import { Check, Minus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const BROKER_HREF = "/talk-to-a-broker/";

type RowMark = "check" | "x" | "partial";

type ComparisonRow = {
  label: string;
  apps: RowMark;
  premium: RowMark;
};

const rows: ComparisonRow[] = [
  {
    label: "Compares multiple carriers",
    apps: "partial",
    premium: "check",
  },
  {
    label: "Explains what's actually covered",
    apps: "x",
    premium: "check",
  },
  {
    label: "Licensed broker in your corner",
    apps: "x",
    premium: "check",
  },
  {
    label: "Help when you actually file a claim",
    apps: "x",
    premium: "check",
  },
];

function Mark({ type }: { type: RowMark }) {
  if (type === "check") {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gold text-charcoal"
        aria-label="Yes"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
      </span>
    );
  }

  if (type === "partial") {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-secondary ring-1 ring-border"
        aria-label="Partial"
      >
        <Minus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      </span>
    );
  }

  return (
    <span
      className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-secondary/70 ring-1 ring-border"
      aria-label="No"
    >
      <X className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
    </span>
  );
}

export default function Differentiator() {
  const reduceMotion = usePrefersReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripVisible, setStripVisible] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setStripVisible(true);
      return;
    }
    const el = stripRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStripVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduceMotion]);

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

        <RevealOnScroll className="mx-auto mt-12 max-w-3xl sm:mt-14 lg:mt-16">
          <div
            ref={stripRef}
            className="rounded-[18px] border border-border bg-white p-5 shadow-[0_16px_40px_rgba(32,39,40,0.08)] sm:p-7 lg:p-8"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_4.75rem_4.75rem] items-end gap-2 border-b border-border pb-3 sm:grid-cols-[minmax(0,1fr)_6rem_6rem] sm:gap-4">
              <span className="sr-only">Feature</span>
              <span className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-secondary sm:text-xs">
                Comparison Apps
              </span>
              <span className="text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-gold sm:text-xs">
                Premium
              </span>
            </div>

            <ul className="mt-1">
              {rows.map((row, index) => (
                <li
                  key={row.label}
                  className={`diff-row grid grid-cols-[minmax(0,1fr)_4.75rem_4.75rem] items-center gap-2 border-b border-border/70 py-3.5 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_6rem_6rem] sm:gap-4 sm:py-5 ${
                    stripVisible ? "diff-row-visible" : ""
                  } ${reduceMotion ? "diff-row-instant" : ""}`}
                  style={
                    reduceMotion
                      ? undefined
                      : { transitionDelay: `${index * 70}ms` }
                  }
                >
                  <span className="pr-2 text-[14px] font-medium leading-snug text-charcoal sm:text-base">
                    {row.label}
                  </span>
                  <span className="flex justify-center">
                    <Mark type={row.apps} />
                  </span>
                  <span className="flex justify-center">
                    <Mark type={row.premium} />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center sm:mt-9">
            <Link
              href={BROKER_HREF}
              className="btn-secondary inline-flex h-12 w-full min-w-[44px] items-center justify-center rounded-md border border-charcoal/70 bg-transparent px-6 text-sm font-medium text-charcoal hover:border-gold-dark hover:text-gold-dark sm:w-auto sm:min-w-[200px]"
            >
              Talk to a Broker
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
