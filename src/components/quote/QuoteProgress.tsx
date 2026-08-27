"use client";

type QuoteProgressProps = {
  total: number;
  current: number;
  label?: string;
};

export default function QuoteProgress({
  total,
  current,
  label,
}: QuoteProgressProps) {
  const safeTotal = Math.max(total, 1);
  const pct = Math.round(((current + 1) / safeTotal) * 100);

  return (
    <div className="w-full" aria-hidden={false}>
      <div className="mb-2 flex items-center justify-between gap-3 text-[11px] font-medium uppercase tracking-[0.12em] text-secondary">
        <span>{label ?? "Your quote"}</span>
        <span>
          Step {Math.min(current + 1, safeTotal)} of {safeTotal}
        </span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Quote progress"
      >
        <div
          className="h-full rounded-full bg-gold transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {Array.from({ length: safeTotal }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${
              i <= current ? "bg-gold" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
