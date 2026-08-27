"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { getCategorySteps } from "@/lib/quote/configs";
import {
  firstUnansweredIndex,
  getVisibleSteps,
  isStepAnswered,
  seedAnswersFromParams,
  sessionStorageKey,
} from "@/lib/quote/engine";
import type {
  QuoteAnswers,
  QuoteCategory,
  QuoteStepDef,
  QuoteUrlParams,
} from "@/lib/quote/types";

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

type UseQuoteFlowOptions = {
  category: QuoteCategory;
  urlParams: QuoteUrlParams;
  onSubmit: (payload: {
    category: QuoteCategory;
    answers: QuoteAnswers;
    honeypot: string;
  }) => Promise<SubmitResult>;
};

function readSession(category: QuoteCategory): QuoteAnswers | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(sessionStorageKey(category));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as QuoteAnswers;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function writeSession(category: QuoteCategory, answers: QuoteAnswers) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      sessionStorageKey(category),
      JSON.stringify(answers),
    );
  } catch {
    /* ignore quota */
  }
}

function clearSession(category: QuoteCategory) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(sessionStorageKey(category));
  } catch {
    /* ignore */
  }
}

export function useQuoteFlow({
  category,
  urlParams,
  onSubmit,
}: UseQuoteFlowOptions) {
  const allSteps = useMemo(() => getCategorySteps(category), [category]);

  const [answers, setAnswers] = useState<QuoteAnswers>(() => {
    const seeded = seedAnswersFromParams(allSteps, urlParams);
    const stored = readSession(category);
    return { ...seeded, ...(stored ?? {}) };
  });

  const [stepIndex, setStepIndex] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [transitionDir, setTransitionDir] = useState<"forward" | "back">(
    "forward",
  );
  const startedRef = useRef(false);
  const viewedStepRef = useRef<string | null>(null);

  const visibleSteps = useMemo(
    () => getVisibleSteps(allSteps, answers, urlParams),
    [allSteps, answers, urlParams],
  );

  const currentStep: QuoteStepDef | undefined = visibleSteps[stepIndex];
  const progress =
    visibleSteps.length === 0
      ? 0
      : Math.min(stepIndex + 1, visibleSteps.length) / visibleSteps.length;
  const isFirst = stepIndex <= 0;
  const isLast = stepIndex >= visibleSteps.length - 1;

  // Persist answers
  useEffect(() => {
    writeSession(category, answers);
  }, [category, answers]);

  // Initial step = first unanswered
  useEffect(() => {
    if (initialized) return;
    const start = firstUnansweredIndex(visibleSteps, answers);
    setStepIndex(start);
    setInitialized(true);

    const prefilled = Object.keys(seedAnswersFromParams(allSteps, urlParams))
      .length > 0;
    if (!startedRef.current) {
      startedRef.current = true;
      track("quote_flow_start", { category, prefilled });
    }
  }, [initialized, visibleSteps, answers, allSteps, urlParams, category]);

  // Step view analytics
  useEffect(() => {
    if (!initialized || !currentStep) return;
    if (viewedStepRef.current === currentStep.id) return;
    viewedStepRef.current = currentStep.id;
    track("quote_step_view", { category, stepId: currentStep.id });
  }, [initialized, currentStep, category]);

  // If visible steps shrink (skipIf), clamp index
  useEffect(() => {
    if (!initialized) return;
    if (stepIndex > visibleSteps.length - 1) {
      setStepIndex(Math.max(visibleSteps.length - 1, 0));
    }
  }, [visibleSteps.length, stepIndex, initialized]);

  const setAnswer = useCallback((stepId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: value }));
    setFieldErrors((prev) => {
      if (!prev[stepId]) return prev;
      const next = { ...prev };
      delete next[stepId];
      return next;
    });
    setSubmitError(null);
  }, []);

  const goBack = useCallback(() => {
    if (stepIndex <= 0 || !currentStep) return;
    setTransitionDir("back");
    track("quote_step_back", { category, stepId: currentStep.id });
    setStepIndex((i) => Math.max(0, i - 1));
  }, [stepIndex, currentStep, category]);

  const goNext = useCallback(() => {
    if (!currentStep) return;
    if (currentStep.mandatory) {
      const value = answers[currentStep.id]?.trim() ?? "";
      if (!value) {
        setFieldErrors((prev) => ({
          ...prev,
          [currentStep.id]: "This field is required.",
        }));
        return false;
      }
      if (currentStep.type === "email") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setFieldErrors((prev) => ({
            ...prev,
            [currentStep.id]: "Enter a valid email address.",
          }));
          return false;
        }
      }
      if (currentStep.type === "tel") {
        const digits = value.replace(/\D/g, "");
        if (digits.length < 10) {
          setFieldErrors((prev) => ({
            ...prev,
            [currentStep.id]: "Enter a valid phone number.",
          }));
          return false;
        }
      }
    }
    setTransitionDir("forward");
    if (!isLast) {
      setStepIndex((i) => i + 1);
      return true;
    }
    return true;
  }, [currentStep, answers, isLast]);

  const advancingRef = useRef(false);

  const selectOption = useCallback(
    (optionId: string) => {
      if (!currentStep || advancingRef.current) return;
      advancingRef.current = true;
      setAnswer(currentStep.id, optionId);
      window.setTimeout(() => {
        setTransitionDir("forward");
        setStepIndex((i) => {
          const atLast = i >= visibleSteps.length - 1;
          return atLast ? i : i + 1;
        });
        advancingRef.current = false;
      }, 180);
    },
    [currentStep, setAnswer, visibleSteps.length],
  );

  const submit = useCallback(async () => {
    if (!currentStep) return;
    // Validate current (last) step first
    const ok = goNext();
    if (ok === false) return;

    // Validate all mandatory visible steps
    const errors: Record<string, string> = {};
    for (const step of visibleSteps) {
      if (!step.mandatory) continue;
      const value = answers[step.id]?.trim() ?? "";
      if (!value) errors[step.id] = "This field is required.";
    }
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      const firstErr = visibleSteps.findIndex((s) => errors[s.id]);
      if (firstErr >= 0) setStepIndex(firstErr);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await onSubmit({
        category,
        answers,
        honeypot,
      });
      if (result.ok) {
        clearSession(category);
        const nonPii: Record<string, string> = {};
        for (const [k, v] of Object.entries(answers)) {
          if (
            k === "name" ||
            k === "phone" ||
            k === "email" ||
            k === "notes" ||
            k === "preferredContactMethod"
          ) {
            continue;
          }
          nonPii[k] = v;
        }
        track("quote_flow_complete", { category, ...nonPii });
        setCompleted(true);
      } else {
        setSubmitError(result.error);
        if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [
    currentStep,
    goNext,
    visibleSteps,
    answers,
    onSubmit,
    category,
    honeypot,
  ]);

  return {
    answers,
    setAnswer,
    visibleSteps,
    currentStep,
    stepIndex,
    progress,
    isFirst,
    isLast,
    goBack,
    goNext,
    selectOption,
    submit,
    submitting,
    submitError,
    fieldErrors,
    completed,
    honeypot,
    setHoneypot,
    transitionDir,
    initialized,
    isStepAnswered: (step: QuoteStepDef) => isStepAnswered(step, answers),
  };
}
