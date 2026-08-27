"use client";

import { ChevronLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useQuoteFlow, type SubmitResult } from "@/hooks/useQuoteFlow";
import type { QuoteAnswers, QuoteCategory, QuoteUrlParams } from "@/lib/quote/types";
import { CATEGORY_LABELS } from "@/lib/quote/types";
import QuoteConfirmation from "./QuoteConfirmation";
import QuoteOptionButton from "./QuoteOptionButton";
import QuoteProgress from "./QuoteProgress";

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const TRANSITION_MS = 280;

type QuoteFlowEngineProps = {
  category: QuoteCategory;
  urlParams: QuoteUrlParams;
};

async function submitQuote(payload: {
  category: QuoteCategory;
  answers: QuoteAnswers;
  honeypot: string;
}): Promise<SubmitResult> {
  const res = await fetch("/api/quote-submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      category: payload.category,
      answers: payload.answers,
      name: payload.answers.name,
      phone: payload.answers.phone,
      email: payload.answers.email,
      preferredContactMethod: payload.answers.preferredContactMethod,
      website: payload.honeypot,
    }),
  });

  let data: {
    ok?: boolean;
    error?: string;
    fieldErrors?: Record<string, string>;
  } = {};
  try {
    data = await res.json();
  } catch {
    return { ok: false, error: "Unexpected server response. Please try again." };
  }

  if (!res.ok || !data.ok) {
    return {
      ok: false,
      error: data.error || "Something went wrong. Please try again.",
      fieldErrors: data.fieldErrors,
    };
  }
  return { ok: true };
}

export default function QuoteFlowEngine({
  category,
  urlParams,
}: QuoteFlowEngineProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [enter, setEnter] = useState(true);
  const flow = useQuoteFlow({
    category,
    urlParams,
    onSubmit: submitQuote,
  });

  const stepId = flow.currentStep?.id;

  // Crossfade + slight slide between steps
  useEffect(() => {
    if (!flow.initialized) return;
    setEnter(false);
    const raf = requestAnimationFrame(() => {
      setEnter(true);
    });
    return () => cancelAnimationFrame(raf);
  }, [stepId, flow.initialized]);

  const panelStyle = reduceMotion
    ? undefined
    : {
        transition: `opacity ${TRANSITION_MS}ms ease-out, transform ${TRANSITION_MS}ms ${SPRING}`,
        opacity: enter ? 1 : 0,
        transform: enter
          ? "translateX(0)"
          : flow.transitionDir === "forward"
            ? "translateX(12px)"
            : "translateX(-12px)",
      };

  const onContinue = useCallback(() => {
    if (flow.isLast) {
      void flow.submit();
    } else {
      flow.goNext();
    }
  }, [flow]);

  if (flow.completed) {
    return (
      <div className="rounded-[18px] border border-border bg-white/95 p-6 shadow-[0_12px_40px_rgba(32,39,40,0.08)] sm:p-8">
        <QuoteConfirmation />
      </div>
    );
  }

  const step = flow.currentStep;
  if (!flow.initialized || !step) {
    return (
      <div className="rounded-[18px] border border-border bg-white/95 p-8 text-center text-secondary">
        Loading…
      </div>
    );
  }

  const value = flow.answers[step.id] ?? "";
  const error = flow.fieldErrors[step.id];
  const isSelect = step.type === "select";
  const isTextLike =
    step.type === "text" ||
    step.type === "email" ||
    step.type === "tel" ||
    step.type === "freetext";

  return (
    <div className="relative rounded-[18px] border border-border bg-white/95 p-5 shadow-[0_12px_40px_rgba(32,39,40,0.08)] sm:p-8">
      <QuoteProgress
        total={flow.visibleSteps.length}
        current={flow.stepIndex}
        label={CATEGORY_LABELS[category]}
      />

      <div className="mt-8" style={panelStyle} key={step.id}>
        <h1 className="text-[1.5rem] font-medium leading-[1.15] tracking-[-0.02em] text-charcoal sm:text-[1.75rem]">
          {step.question}
        </h1>
        {!step.mandatory ? (
          <p className="mt-1.5 text-[13px] text-secondary">Optional</p>
        ) : null}

        {isSelect && step.options ? (
          <ul className="mt-6 flex flex-col gap-2.5" role="listbox" aria-label={step.question}>
            {step.options.map((option) => (
              <li key={option.id} role="none">
                <QuoteOptionButton
                  id={`opt-${step.id}-${option.id}`}
                  label={option.label}
                  selected={value === option.id}
                  onSelect={() => flow.selectOption(option.id)}
                />
              </li>
            ))}
          </ul>
        ) : null}

        {isTextLike ? (
          <div className="mt-6">
            {step.type === "freetext" ? (
              <textarea
                id={`field-${step.id}`}
                name={step.id}
                rows={4}
                value={value}
                placeholder={step.placeholder}
                autoComplete={step.autoComplete}
                onChange={(e) => flow.setAnswer(step.id, e.target.value)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-[15px] text-charcoal placeholder:text-secondary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              />
            ) : (
              <input
                id={`field-${step.id}`}
                name={step.id}
                type={
                  step.type === "email"
                    ? "email"
                    : step.type === "tel"
                      ? "tel"
                      : "text"
                }
                inputMode={step.inputMode}
                autoComplete={step.autoComplete}
                value={value}
                placeholder={step.placeholder}
                onChange={(e) => flow.setAnswer(step.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onContinue();
                  }
                }}
                className="h-12 w-full rounded-xl border border-border bg-white px-4 text-[15px] text-charcoal placeholder:text-secondary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              />
            )}
          </div>
        ) : null}

        {error ? (
          <p className="mt-3 text-[13px] text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        {/* Honeypot — hidden from users and removed from tab order */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        >
          <label htmlFor="quote-website">Website</label>
          <input
            id="quote-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={flow.honeypot}
            onChange={(e) => flow.setHoneypot(e.target.value)}
          />
        </div>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={flow.goBack}
            disabled={flow.isFirst || flow.submitting}
            className={`inline-flex h-11 min-w-[44px] items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              flow.isFirst
                ? "invisible"
                : "text-charcoal hover:text-gold-dark"
            }`}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            Back
          </button>

          {isSelect && !flow.isLast ? (
            <span className="text-[12px] text-secondary">
              Select an option to continue
            </span>
          ) : (
            <button
              type="button"
              onClick={onContinue}
              disabled={
                flow.submitting || (isSelect && flow.isLast && !value.trim())
              }
              className="btn-primary btn-primary-gradient inline-flex h-11 min-w-[120px] items-center justify-center rounded-md px-5 text-sm font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal disabled:opacity-60"
            >
              {flow.submitting
                ? "Sending…"
                : flow.isLast
                  ? "Submit"
                  : step.type === "freetext" && !value.trim()
                    ? "Skip"
                    : "Continue"}
            </button>
          )}
        </div>

        {flow.submitError ? (
          <p className="mt-4 text-[14px] text-red-700" role="alert">
            {flow.submitError}
          </p>
        ) : null}
      </div>
    </div>
  );
}
