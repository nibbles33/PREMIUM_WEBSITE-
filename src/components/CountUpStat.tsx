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
  /** Duration in ms. Default ~1500. */
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
 * Runs once per mount/session; respects prefers-reduced-motion.
 * Renders final formatted value immediately on the server to avoid layout shift.
 */
export default function CountUpStat({
  value,
  suffix = "",
  ariaLabel,
  className,
  durationMs = 1500,
}: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const completedRef = useRef(false);
  const [display, setDisplay] = useState(value);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      completedRef.current = true;
      return;
    }

    const node = ref.current;
    if (!node || completedRef.current) return;

    let frame = 0;
    let started = false;

    const run = () => {
      if (started || completedRef.current) return;
      started = true;
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

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio > 0.35)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: [0.35, 0.5] },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs, reduceMotion]);

  const finalText = `${formatNumber(value)}${suffix}`;
  const text = `${formatNumber(display)}${suffix}`;

  return (
    <span
      ref={ref}
      className={className}
      aria-label={ariaLabel ?? finalText}
    >
      {/* Reserve final-width with tabular nums to avoid layout shift mid-count. */}
      <span aria-hidden="true" className="inline-block tabular-nums">
        {text}
      </span>
    </span>
  );
}
