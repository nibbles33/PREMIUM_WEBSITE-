"use client";

import { useId, useState } from "react";
import QuoteOptionButton from "@/components/quote/QuoteOptionButton";
import {
  claimScenarios,
  type ClaimScenarioId,
} from "@/data/claimsContent";

export default function ClaimsScenarioCards() {
  const [selected, setSelected] = useState<ClaimScenarioId | null>(null);
  const guidanceId = useId();

  const active = claimScenarios.find((scenario) => scenario.id === selected);

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {claimScenarios.map((scenario) => {
          const buttonId = `${guidanceId}-${scenario.id}`;
          return (
            <QuoteOptionButton
              key={scenario.id}
              id={buttonId}
              label={scenario.title}
              selected={selected === scenario.id}
              onSelect={() =>
                setSelected((current) =>
                  current === scenario.id ? null : scenario.id,
                )
              }
            />
          );
        })}
      </div>
      {active ? (
        <div
          id={guidanceId}
          className="mt-6 rounded-xl border border-border bg-offwhite/80 p-5 sm:p-6"
          role="region"
          aria-live="polite"
          aria-label={`Guidance for ${active.title}`}
        >
          <h3 className="text-lg font-medium text-charcoal">{active.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-secondary">
            {active.summary}
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-[14px] leading-relaxed text-charcoal sm:text-[15px]">
            {active.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      ) : (
        <p className="mt-4 text-sm text-secondary">
          Select a situation above for first-step guidance. This is general
          information only — always follow your insurer&apos;s instructions and
          local emergency services when safety is at risk.
        </p>
      )}
    </div>
  );
}
