"use client";

import Link from "next/link";
import { AlertTriangle, Check } from "lucide-react";
import {
  useCallback,
  useId,
  useState,
  type CSSProperties,
} from "react";
import RevealOnScroll from "@/components/RevealOnScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const BROKER_HREF = "/talk-to-a-broker/";
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const SWAP_MS = 280;

const PROVIDERS = [
  { name: "Provider A", price: "$1,842/yr" },
  { name: "Provider B", price: "$1,917/yr" },
  { name: "Provider C", price: "$2,041/yr" },
] as const;

const BROKER_ADDS = [
  { label: "Sewer Backup Coverage", kind: "benefit" as const },
  { label: "Claim Forgiveness", kind: "benefit" as const },
  { label: "Rental Vehicle Coverage", kind: "benefit" as const },
  { label: "Better Liability Limits", kind: "benefit" as const },
  { label: "Higher Deductible", kind: "tradeoff" as const },
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

export default function Differentiator() {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const [brokerAdded, setBrokerAdded] = useState(false);
  const [panelVisible, setPanelVisible] = useState(true);
  const [displayBrokerAdded, setDisplayBrokerAdded] = useState(false);

  const swapTo = useCallback(
    (next: boolean) => {
      if (next === displayBrokerAdded && panelVisible) return;

      if (reduceMotion) {
        setBrokerAdded(next);
        setDisplayBrokerAdded(next);
        setPanelVisible(true);
        return;
      }

      setBrokerAdded(next);
      setPanelVisible(false);
      window.setTimeout(() => {
        setDisplayBrokerAdded(next);
        setPanelVisible(true);
      }, SWAP_MS * 0.45);
    },
    [displayBrokerAdded, panelVisible, reduceMotion],
  );

  const panelTransition: CSSProperties = reduceMotion
    ? { transition: "none" }
    : {
        transition: `opacity ${SWAP_MS}ms ease-out, transform ${SWAP_MS}ms ${SPRING}`,
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
              Comparison sites show you prices. Toggle a broker into the mix —
              and see what actually changes beyond the number.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mx-auto mt-12 max-w-3xl sm:mt-14 lg:mt-16">
          <div
            className="rounded-[18px] border border-border bg-white p-5 shadow-[0_16px_40px_rgba(32,39,40,0.08)] sm:p-7 lg:p-8"
          >
            <ComplianceLabel className="text-center" />

            <div
              id={`${baseId}-demo`}
              aria-live="polite"
              className="mt-5 sm:mt-6"
            >
              <div
                className={
                  panelVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-2 opacity-0"
                }
                style={panelTransition}
              >
                {!displayBrokerAdded ? (
                  <div>
                    <p className="sr-only">
                      Comparison site results, illustrative prices only
                    </p>
                    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
                      {PROVIDERS.map((provider) => (
                        <li
                          key={provider.name}
                          className="rounded-md border border-[#d8d8d8] bg-[#f7f7f7] px-4 py-4 text-left sm:px-3 sm:py-5 sm:text-center"
                          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                        >
                          <p className="text-[13px] font-normal text-[#555555]">
                            {provider.name}
                          </p>
                          <p className="mt-2 text-[22px] font-bold tabular-nums tracking-tight text-[#222222] sm:text-[24px]">
                            {provider.price}
                          </p>
                          <p className="mt-2 text-[11px] text-[#888888]">
                            View details →
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div>
                    <p className="sr-only">
                      What a Premium broker adds beyond price comparison
                    </p>
                    <ul className="mx-auto max-w-md space-y-3">
                      {BROKER_ADDS.map((item) => (
                        <li
                          key={item.label}
                          className="flex items-start gap-3 rounded-lg border border-border bg-offwhite/80 px-4 py-3"
                        >
                          {item.kind === "benefit" ? (
                            <span
                              className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-charcoal"
                              aria-hidden
                            >
                              <Check
                                className="h-3.5 w-3.5"
                                strokeWidth={2.5}
                              />
                            </span>
                          ) : (
                            <span
                              className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F3EDE3] text-[#8A6A3A] ring-1 ring-[#D4C4A8]"
                              aria-label="Trade-off"
                            >
                              <AlertTriangle
                                className="h-3.5 w-3.5"
                                strokeWidth={2}
                                aria-hidden
                              />
                            </span>
                          )}
                          <span
                            className={`text-[14px] font-medium leading-snug sm:text-[15px] ${
                              item.kind === "tradeoff"
                                ? "text-secondary"
                                : "text-charcoal"
                            }`}
                          >
                            {item.label}
                            {item.kind === "tradeoff" ? (
                              <span className="sr-only"> (trade-off)</span>
                            ) : null}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 text-center text-[15px] font-medium text-charcoal sm:mt-7 sm:text-base">
                      The lowest price isn&apos;t always the best option.
                    </p>

                    <div className="mt-5 flex justify-center sm:mt-6">
                      <Link
                        href={BROKER_HREF}
                        className="btn-secondary inline-flex h-12 w-full min-w-[44px] items-center justify-center rounded-md border border-charcoal/70 bg-transparent px-6 text-sm font-medium text-charcoal hover:border-gold-dark hover:text-gold-dark sm:w-auto sm:min-w-[200px]"
                      >
                        Talk to a Broker
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-7 flex flex-col items-center gap-3 border-t border-border/80 pt-6 sm:mt-8 sm:pt-7">
              <button
                type="button"
                aria-pressed={brokerAdded}
                aria-controls={`${baseId}-demo`}
                onClick={() => swapTo(!brokerAdded)}
                className={`inline-flex h-12 min-w-[44px] items-center justify-center rounded-md px-6 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal sm:min-w-[240px] ${
                  brokerAdded
                    ? "border border-charcoal/25 bg-transparent text-charcoal hover:border-gold-dark hover:text-gold-dark"
                    : "btn-primary btn-primary-gradient text-charcoal"
                }`}
              >
                {brokerAdded
                  ? "Compare prices again"
                  : "Add a Premium broker →"}
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
