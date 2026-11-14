"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useId, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { FaqItem, FaqLink } from "@/components/FaqAccordion";

/** Site paths only. Rejects protocol-relative and scheme-bearing hrefs. */
function isSafeInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//") && !href.includes(":");
}

function FaqContextualLinks({ links }: { links: readonly FaqLink[] }) {
  const safe = links.filter(
    (link) => link.label.trim().length > 0 && isSafeInternalHref(link.href),
  );
  if (safe.length === 0) return null;

  return (
    <p className="mt-3 text-[14px] leading-relaxed text-secondary sm:text-[15px]">
      {safe.map((link, index) => (
        <span key={link.href}>
          {index > 0 ? <span aria-hidden="true"> · </span> : null}
          <Link
            href={link.href}
            className="font-medium text-gold-dark underline decoration-gold/40 underline-offset-2 hover:decoration-gold-dark"
          >
            {link.label}
          </Link>
        </span>
      ))}
    </p>
  );
}

type PremiumProductFAQProps = {
  title: string;
  intro: string;
  items: FaqItem[];
};

export default function PremiumProductFAQ({
  title,
  intro,
  items,
}: PremiumProductFAQProps) {
  const baseId = useId();
  const reduceMotion = usePrefersReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="border-b border-border bg-offwhite py-12 sm:py-14 lg:py-[4.25rem]"
      aria-labelledby={`${baseId}-heading`}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-4xl lg:px-8">
        <div className="text-center">
          <h2
            id={`${baseId}-heading`}
            className="text-[1.65rem] font-medium tracking-[-0.025em] text-charcoal sm:text-[1.9rem] lg:text-[2.15rem]"
          >
            {title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-secondary">
            {intro}
          </p>
        </div>

        <ul className="mt-8 space-y-2.5 sm:mt-9 sm:space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            const hasLinks = Boolean(item.links?.length);
            // Answers with contextual links stay in the document when collapsed
            // (`hidden`) so the anchors are crawlable. Other answers keep the
            // existing mount-on-open behaviour.
            const showAnswer = isOpen || hasLinks;

            return (
              <li key={item.question}>
                <div
                  className={`pilot-auto-faq-item ${isOpen ? "is-open" : ""}`}
                >
                  <h3 className="m-0">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="pilot-auto-faq-trigger"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>{item.question}</span>
                      <span
                        className={`pilot-auto-faq-icon ${reduceMotion ? "" : "transition-transform duration-200"}`}
                        aria-hidden
                      >
                        <Plus
                          className={`h-4 w-4 ${isOpen ? "rotate-45" : ""} ${reduceMotion ? "" : "transition-transform duration-200"}`}
                          strokeWidth={2}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    hidden={!isOpen}
                    className="pilot-auto-faq-panel"
                  >
                    {showAnswer ? (
                      <>
                        <p
                          className={
                            isOpen && !reduceMotion
                              ? "pilot-auto-faq-panel-enter"
                              : ""
                          }
                        >
                          {item.answer}
                        </p>
                        {hasLinks ? (
                          <FaqContextualLinks links={item.links ?? []} />
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
