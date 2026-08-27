import type {
  QuoteAnswers,
  QuoteStepDef,
  QuoteUrlParams,
  SkipIf,
} from "./types";

function matchesSkip(
  rule: SkipIf,
  answers: QuoteAnswers,
  params: QuoteUrlParams,
): boolean {
  if ("paramIn" in rule) {
    const raw =
      answers[rule.paramIn.key] ??
      (params as Record<string, string | null | undefined>)[rule.paramIn.key] ??
      "";
    return rule.paramIn.values.includes(String(raw));
  }
  if ("paramPresent" in rule) {
    const fromParam = (params as Record<string, string | null | undefined>)[
      rule.paramPresent
    ];
    // Only URL params — not answers — so answering a step does not remove it
    // from the visible list (which would shift indices and skip questions).
    return Boolean(fromParam && String(fromParam).length > 0);
  }
  if ("answerIn" in rule) {
    const value = answers[rule.answerIn.key];
    return Boolean(value && rule.answerIn.values.includes(value));
  }
  if ("answerNotIn" in rule) {
    const value = answers[rule.answerNotIn.key];
    if (!value) return true;
    return !rule.answerNotIn.values.includes(value);
  }
  return false;
}

export function shouldSkipStep(
  step: QuoteStepDef,
  answers: QuoteAnswers,
  params: QuoteUrlParams,
): boolean {
  if (!step.skipIf) return false;
  const rules = Array.isArray(step.skipIf) ? step.skipIf : [step.skipIf];
  return rules.some((rule) => matchesSkip(rule, answers, params));
}

export function getVisibleSteps(
  steps: QuoteStepDef[],
  answers: QuoteAnswers,
  params: QuoteUrlParams,
): QuoteStepDef[] {
  return steps.filter((step) => !shouldSkipStep(step, answers, params));
}

/** Seed answers from URL query params that match step paramKeys / known keys. */
export function seedAnswersFromParams(
  steps: QuoteStepDef[],
  params: QuoteUrlParams,
): QuoteAnswers {
  const seeded: QuoteAnswers = {};

  // Always retain vehicleType when present (motorcycle/boat routing)
  if (params.vehicleType) {
    seeded.vehicleType = params.vehicleType;
  }

  for (const step of steps) {
    if (!step.paramKey) continue;
    const value = (params as Record<string, string | null | undefined>)[
      step.paramKey
    ];
    if (value) {
      seeded[step.id] = value;
      if (step.paramKey !== step.id) {
        seeded[step.paramKey] = value;
      }
    }
  }

  // Direct param keys that mirror answer ids even when step is skipped
  const directKeys = [
    "homeType",
    "businessType",
    "size",
    "vehicleBodyType",
  ] as const;
  for (const key of directKeys) {
    const value = params[key];
    if (value && !seeded[key]) {
      seeded[key] = value;
    }
  }

  return seeded;
}

export function firstUnansweredIndex(
  visible: QuoteStepDef[],
  answers: QuoteAnswers,
): number {
  const idx = visible.findIndex((step) => {
    if (!step.mandatory && step.type === "freetext") {
      // Optional freetext never blocks start position if empty —
      // still count as "unanswered" only when prior mandatory are done
      // and we land on it as next. Treat empty optional as unanswered.
      return !answers[step.id];
    }
    const value = answers[step.id];
    return !value || value.trim() === "";
  });
  return idx === -1 ? Math.max(visible.length - 1, 0) : idx;
}

export function sessionStorageKey(category: string): string {
  return `quote-flow-${category}`;
}

export function isStepAnswered(
  step: QuoteStepDef,
  answers: QuoteAnswers,
): boolean {
  const value = answers[step.id];
  if (step.mandatory) {
    return Boolean(value && value.trim().length > 0);
  }
  // Optional steps are "complete enough" to advance even when empty
  return true;
}
