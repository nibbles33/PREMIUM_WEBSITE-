import type { CSSProperties, ReactNode } from "react";

export type PilotInfiniteRailProps = {
  /** Autoplay duration in seconds (one full loop) */
  durationSeconds: number;
  /** Reduced-motion duration; defaults to 2.5× normal */
  reducedDurationSeconds?: number;
  ariaLabel: string;
  className?: string;
  trackClassName?: string;
  children: ReactNode;
};

/**
 * Shared CSS-animated horizontal rail — single DOM structure, no static fallback.
 * Direction: left → right. Reduced motion: same rail, slower duration.
 * Parent must duplicate content for seamless looping (typically 2×).
 */
export default function PilotInfiniteRail({
  durationSeconds,
  reducedDurationSeconds,
  ariaLabel,
  className = "",
  trackClassName = "",
  children,
}: PilotInfiniteRailProps) {
  const reduced =
    reducedDurationSeconds ?? Math.round(durationSeconds * 2.5 * 10) / 10;

  const style = {
    "--pilot-rail-duration": `${durationSeconds}s`,
    "--pilot-rail-duration-reduced": `${reduced}s`,
  } as CSSProperties;

  return (
    <div
      className={`pilot-infinite-rail ${className}`.trim()}
      aria-label={ariaLabel}
      style={style}
    >
      <div className={`pilot-infinite-rail-track ${trackClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}
