"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

export type PilotInfiniteRailProps = {
  /** Autoplay duration in seconds (one full loop) */
  durationSeconds: number;
  /** Reduced-motion duration; defaults to 2.5× normal */
  reducedDurationSeconds?: number;
  ariaLabel: string;
  className?: string;
  trackClassName?: string;
  children: ReactNode;
  /**
   * When true, animation distance equals the measured width of the first
   * child (one sequence), not 50% of the full track. Required when more than
   * two sequences are rendered for ultrawide coverage.
   */
  measureFirstChildShift?: boolean;
};

/**
 * Shared CSS-animated horizontal rail — single DOM structure, no static fallback.
 * Direction: left → right. Reduced motion: same rail, slower duration.
 *
 * Default mode: parent duplicates content 2× and animation uses -50% track width
 * (Yep rail and other legacy callers).
 *
 * measureFirstChildShift: parent may render N≥3 equal sequences; animation
 * translates exactly one sequence width for seamless looping at any viewport.
 */
export default function PilotInfiniteRail({
  durationSeconds,
  reducedDurationSeconds,
  ariaLabel,
  className = "",
  trackClassName = "",
  children,
  measureFirstChildShift = false,
}: PilotInfiniteRailProps) {
  const reduced =
    reducedDurationSeconds ?? Math.round(durationSeconds * 2.5 * 10) / 10;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measureFirstChildShift) return;
    const track = trackRef.current;
    if (!track) return;

    const updateShift = () => {
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return;
      const styles = window.getComputedStyle(track);
      const gapRaw = styles.columnGap || styles.gap || "0";
      const gap = Number.parseFloat(gapRaw) || 0;
      // One loop period = first sequence width + the flex gap after it.
      const shift = first.offsetWidth + gap;
      if (shift > 0) {
        track.style.setProperty("--pilot-rail-shift", `${shift}px`);
      }
    };

    updateShift();
    const ro = new ResizeObserver(updateShift);
    ro.observe(track);
    const first = track.firstElementChild;
    if (first) ro.observe(first);
    window.addEventListener("resize", updateShift);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateShift);
    };
  }, [measureFirstChildShift]);

  const style = {
    "--pilot-rail-duration": `${durationSeconds}s`,
    "--pilot-rail-duration-reduced": `${reduced}s`,
  } as CSSProperties;

  return (
    <div
      className={`pilot-infinite-rail ${measureFirstChildShift ? "pilot-infinite-rail--measured" : ""} ${className}`.trim()}
      aria-label={ariaLabel}
      style={style}
    >
      <div
        ref={trackRef}
        className={`pilot-infinite-rail-track ${trackClassName}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}
