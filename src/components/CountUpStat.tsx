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
  /** Duration in ms. Default 3000 for a deliberate, watchable count. */
  durationMs?: number;
};

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("en-CA");
}

/**
 * Soft ease-in-out (sine). Progress stays near-linear through the middle
 * so the count does not race through the first 70–80%, then settles gently.
 */
function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

/**
 * Map eased 0–1 progress to a display integer.
 * Small targets step through every integer (0→1→…→9 / 0→…→31).
 * Large targets use rounded continuous progress for a smooth climb.
 */
function displayAtProgress(progress: number, target: number): number {
  if (progress <= 0) return 0;
  if (progress >= 1) return target;

  if (target <= 40) {
    // Step through every integer; +1 spread keeps the final digit on-screen
    // for a readable share of the timeline (not only the last frame).
    return Math.min(target, Math.floor(progress * (target + 1)));
  }

  return Math.min(target, Math.round(progress * target));
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
  durationMs = 3000,
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
        const raw = Math.min(1, (now - start) / durationMs);
        const eased = easeInOutSine(raw);
        setDisplay(displayAtProgress(eased, value));
        if (raw < 1) {
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
