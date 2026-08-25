"use client";

import Link from "next/link";
import {
  Briefcase,
  Factory,
  Hammer,
  LayoutGrid,
  Store,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const BUSINESS_ACCENT = "#5A8A73";
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const STEP_TRANSITION_MS = 280;
const AUTO_ADVANCE_MS = 350;

export type BusinessTypeId =
  | "contractor"
  | "restaurant"
  | "manufacturing"
  | "retail"
  | "professional"
  | "other";

export type BusinessSizeId = "just-me" | "2-5" | "6-20" | "20+";

type BusinessTypeOption = {
  id: BusinessTypeId;
  label: string;
  icon: LucideIcon;
};

type BusinessSizeOption = {
  id: BusinessSizeId;
  label: string;
};

export const businessTypeOptions: BusinessTypeOption[] = [
  { id: "contractor", label: "Contractor", icon: Hammer },
  { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { id: "manufacturing", label: "Manufacturing", icon: Factory },
  { id: "retail", label: "Retail", icon: Store },
  { id: "professional", label: "Professional", icon: Briefcase },
  { id: "other", label: "Other", icon: LayoutGrid },
];

export const businessSizeOptions: BusinessSizeOption[] = [
  { id: "just-me", label: "Just me" },
  { id: "2-5", label: "2–5" },
  { id: "6-20", label: "6–20" },
  { id: "20+", label: "20+" },
];

export type BusinessQuoteMeta = {
  quoteHref: string;
  quoteLabel: string;
};

function sizeLabel(id: BusinessSizeId): string {
  return businessSizeOptions.find((o) => o.id === id)?.label ?? id;
}

function buildQuoteMeta(
  typeId: BusinessTypeId,
  sizeId: BusinessSizeId,
): BusinessQuoteMeta {
  const type = businessTypeOptions.find((o) => o.id === typeId);
  const params = new URLSearchParams({
    type: "business",
    businessType: typeId,
    size: sizeId,
  });
  const quoteHref = `/get-a-quote?${params.toString()}`;
  const quoteLabel =
    typeId === "other"
      ? "Get a Business Quote"
      : `Get a Quote for Your ${type?.label ?? "Business"}`;

  return { quoteHref, quoteLabel };
}

function formatSummary(typeId: BusinessTypeId, sizeId: BusinessSizeId): string {
  const type = businessTypeOptions.find((o) => o.id === typeId)?.label ?? "Business";
  const size = sizeLabel(sizeId);
  const employees =
    sizeId === "just-me" ? "solo" : `${size} employees`;
  return `${type} · ${employees}`;
}

type HeroBusinessFlowProps = {
  onQuoteMetaChange: (meta: BusinessQuoteMeta | null) => void;
};

export default function HeroBusinessFlow({
  onQuoteMetaChange,
}: HeroBusinessFlowProps) {
  const reduceMotion = usePrefersReducedMotion();
  const baseId = useId();
  const contentRef = useRef<HTMLDivElement>(null);
  const advanceTimerRef = useRef<number | null>(null);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<BusinessTypeId | null>(null);
  const [selectedSize, setSelectedSize] = useState<BusinessSizeId | null>(null);
  const [stepVisible, setStepVisible] = useState(true);
  const [contentHeight, setContentHeight] = useState<number | undefined>(
    undefined,
  );
  const [pendingType, setPendingType] = useState<BusinessTypeId | null>(null);
  const [pendingSize, setPendingSize] = useState<BusinessSizeId | null>(null);

  const clearAdvanceTimer = useCallback(() => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  }, []);

  const measureHeight = useCallback(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  useEffect(() => {
    measureHeight();
    const observer = new ResizeObserver(measureHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    return () => observer.disconnect();
  }, [measureHeight, step, selectedType, selectedSize, stepVisible]);

  useEffect(() => {
    if (step === 3 && selectedType && selectedSize) {
      onQuoteMetaChange(buildQuoteMeta(selectedType, selectedSize));
    } else {
      onQuoteMetaChange(null);
    }
  }, [step, selectedType, selectedSize, onQuoteMetaChange]);

  useEffect(() => () => clearAdvanceTimer(), [clearAdvanceTimer]);

  const goToStep = useCallback(
    (next: 1 | 2 | 3) => {
      if (next === step) return;
      clearAdvanceTimer();

      if (reduceMotion) {
        setStep(next);
        setStepVisible(true);
        return;
      }

      setStepVisible(false);
      window.setTimeout(() => {
        setStep(next);
        setStepVisible(true);
      }, STEP_TRANSITION_MS * 0.45);
    },
    [step, reduceMotion, clearAdvanceTimer],
  );

  const handleTypeSelect = (typeId: BusinessTypeId) => {
    setSelectedType(typeId);
    setPendingType(typeId);

    clearAdvanceTimer();
    if (reduceMotion) {
      goToStep(2);
      setPendingType(null);
      return;
    }

    advanceTimerRef.current = window.setTimeout(() => {
      goToStep(2);
      setPendingType(null);
      advanceTimerRef.current = null;
    }, AUTO_ADVANCE_MS);
  };

  const handleSizeSelect = (sizeId: BusinessSizeId) => {
    setSelectedSize(sizeId);
    setPendingSize(sizeId);

    clearAdvanceTimer();
    if (reduceMotion) {
      goToStep(3);
      setPendingSize(null);
      return;
    }

    advanceTimerRef.current = window.setTimeout(() => {
      goToStep(3);
      setPendingSize(null);
      advanceTimerRef.current = null;
    }, AUTO_ADVANCE_MS);
  };

  const handleBack = () => {
    clearAdvanceTimer();
    setPendingType(null);
    setPendingSize(null);
    if (step === 3) {
      goToStep(2);
    } else if (step === 2) {
      goToStep(1);
    }
  };

  const transitionStyle: CSSProperties = reduceMotion
    ? { transition: "none" }
    : {
        transition: `opacity ${STEP_TRANSITION_MS}ms ease-out, transform ${STEP_TRANSITION_MS}ms ${SPRING}`,
      };

  const selectedButtonStyle = (selected: boolean): CSSProperties =>
    selected
      ? {
          borderColor: `color-mix(in srgb, ${BUSINESS_ACCENT} 55%, var(--brand-border))`,
          backgroundColor: `color-mix(in srgb, ${BUSINESS_ACCENT} 18%, white)`,
        }
      : {};

  const TypeIcon =
    selectedType &&
    businessTypeOptions.find((o) => o.id === selectedType)?.icon;

  const summaryQuote =
    selectedType && selectedSize
      ? buildQuoteMeta(selectedType, selectedSize)
      : null;

  return (
    <div className="hero-business-flow">
      <div className="flex items-center justify-between gap-3">
        <div
          className="flex items-center gap-2"
          aria-label={`Step ${step} of 3`}
          role="group"
        >
          {[1, 2, 3].map((dot) => (
            <span
              key={dot}
              className="h-1.5 rounded-full transition-all duration-200 ease-out"
              style={{
                width: dot === step ? "1.25rem" : "0.375rem",
                backgroundColor:
                  dot <= step
                    ? BUSINESS_ACCENT
                    : `color-mix(in srgb, ${BUSINESS_ACCENT} 22%, var(--brand-border))`,
              }}
              aria-hidden
            />
          ))}
          <span className="sr-only">{`Step ${step} of 3`}</span>
        </div>
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="hero-business-back inline-flex min-h-[44px] items-center rounded-md px-2 text-[13px] font-medium text-gold-dark transition-colors hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
          >
            ← Back
          </button>
        ) : (
          <span className="min-h-[44px]" aria-hidden />
        )}
      </div>

      <div
        className="hero-business-step-shell mt-4 overflow-hidden"
        style={{
          height: contentHeight !== undefined ? contentHeight : "auto",
          transition: reduceMotion
            ? "none"
            : `height ${STEP_TRANSITION_MS}ms ${SPRING}`,
        }}
      >
        <div
          ref={contentRef}
          className={`${
            stepVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-2 opacity-0"
          }`}
          style={transitionStyle}
          aria-live="polite"
        >
          {step === 1 ? (
            <div>
              <h3
                id={`${baseId}-step1-heading`}
                className="text-[15px] font-medium tracking-tight text-charcoal sm:text-base"
              >
                Great — what kind of business do you operate?
              </h3>
              <div
                className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5"
                role="group"
                aria-labelledby={`${baseId}-step1-heading`}
              >
                {businessTypeOptions.map((option) => {
                  const Icon = option.icon;
                  const selected =
                    pendingType === option.id || selectedType === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleTypeSelect(option.id)}
                      className="hero-business-option flex min-h-[72px] flex-col items-center justify-center gap-2 rounded-lg border border-border bg-white px-2 py-3 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark"
                      style={selectedButtonStyle(selected)}
                      aria-pressed={selected}
                    >
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md"
                        style={{
                          backgroundColor: selected
                            ? `color-mix(in srgb, ${BUSINESS_ACCENT} 24%, white)`
                            : `color-mix(in srgb, ${BUSINESS_ACCENT} 10%, white)`,
                        }}
                      >
                        <Icon
                          className="h-4 w-4"
                          style={{ color: BUSINESS_ACCENT }}
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>
                      <span className="text-[12px] font-medium leading-tight text-charcoal sm:text-[13px]">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <h3
                id={`${baseId}-step2-heading`}
                className="text-[15px] font-medium tracking-tight text-charcoal sm:text-base"
              >
                How big is the business?
              </h3>
              <div
                className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5"
                role="group"
                aria-labelledby={`${baseId}-step2-heading`}
              >
                {businessSizeOptions.map((option) => {
                  const selected =
                    pendingSize === option.id || selectedSize === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSizeSelect(option.id)}
                      className="hero-business-option flex min-h-[52px] items-center justify-center rounded-lg border border-border bg-white px-3 py-3 text-[13px] font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark sm:min-h-[56px] sm:text-sm"
                      style={selectedButtonStyle(selected)}
                      aria-pressed={selected}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {step === 3 && selectedType && selectedSize && summaryQuote ? (
            <div
              className="rounded-lg border px-4 py-4 sm:px-5 sm:py-5"
              style={{
                borderColor: `color-mix(in srgb, ${BUSINESS_ACCENT} 35%, var(--brand-border))`,
                backgroundColor: `color-mix(in srgb, ${BUSINESS_ACCENT} 10%, white)`,
              }}
            >
              <div className="flex items-start gap-3">
                {TypeIcon ? (
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${BUSINESS_ACCENT} 20%, white)`,
                    }}
                  >
                    <TypeIcon
                      className="h-5 w-5"
                      style={{ color: BUSINESS_ACCENT }}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium text-charcoal sm:text-base">
                    {formatSummary(selectedType, selectedSize)}
                  </p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-secondary">
                    A broker will follow up with options built around this.
                  </p>
                </div>
              </div>
              <Link
                href={summaryQuote.quoteHref}
                className="btn-primary btn-primary-gradient group mt-4 inline-flex h-[48px] w-full min-w-[44px] items-center justify-center rounded-md px-5 text-[14px] font-medium text-charcoal sm:text-[15px]"
              >
                {summaryQuote.quoteLabel}
                <span
                  aria-hidden
                  className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                >
                  →
                </span>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
