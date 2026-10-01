"use client";

import { useEffect, useRef, useState } from "react";

type CountUpStatProps = {
  /** Final integer value to count toward (e.g. 2700). */
  value: number;
  /** Suffix shown after the formatted number (e.g. "+"). */
  suffix?: string;
  /** Optional accessible label describing the metric. */
  ariaLabel?: string;
  className?: string;
  /** Duration in ms. Default 1800 for a clearly visible count. */
  durationMs?: number;
};

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("en-CA");
}

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/**
 * Viewport-triggered count-up for authority metrics.
 *
 * - Starts at 0 (not the final value).
 * - Begins ONLY when the metric is meaningfully inside the viewport
 *   (center band via rootMargin) — not merely mounted below the hero.
 * - Runs once; does not restart on scroll away/back.
 * - prefers-reduced-motion → final value immediately.
 */
export default function CountUpStat({
  value,
  suffix = "",
  ariaLabel,
  className,
  durationMs = 1800,
}: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const completedRef = useRef(false);
  const startedRef = useRef(false);
  // Always start at 0 so the section does not show finished totals before trigger.
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || completedRef.current) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setDisplay(value);
      completedRef.current = true;
      startedRef.current = true;
      return;
    }

    let frame = 0;

    const run = () => {
      if (startedRef.current || completedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      setDisplay(0);

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        setDisplay(value * easeOutCubic(t));
        if (t < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setDisplay(value);
          completedRef.current = true;
        }
      };
      frame = requestAnimationFrame(tick);
    };

    // Shrink the root so the strip must enter the central band of the viewport.
    // Prevents firing while the user is still reading the hero and only a sliver
    // of the authority strip peeks below the fold.
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.some(
          (e) => e.isIntersecting && e.intersectionRatio >= 0.45,
        );
        if (!hit) return;
        run();
        observer.disconnect();
      },
      {
        threshold: [0.45, 0.6, 0.75],
        rootMargin: "-18% 0px -18% 0px",
      },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  const finalText = `${formatNumber(value)}${suffix}`;
  const text = `${formatNumber(display)}${suffix}`;

  return (
    <span
      ref={ref}
      className={className}
      aria-label={ariaLabel ?? finalText}
    >
      {/* Invisible final-width spacer prevents layout shift as digits grow. */}
      <span className="relative inline-block tabular-nums">
        <span className="invisible" aria-hidden="true">
          {finalText}
        </span>
        <span
          className="absolute inset-0 inline-flex items-baseline"
          aria-hidden="true"
        >
          {text}
        </span>
      </span>
    </span>
  );
}
