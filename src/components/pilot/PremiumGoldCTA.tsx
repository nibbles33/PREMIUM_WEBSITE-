"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type PremiumGoldCTAProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "className"
> & {
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
};

export default function PremiumGoldCTA({
  children,
  className = "",
  showArrow = true,
  ...linkProps
}: PremiumGoldCTAProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isMobileRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => {
      isMobileRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const resetGlow = useCallback(() => {
    ref.current?.style.setProperty("--cta-glow-x", "50%");
    ref.current?.style.setProperty("--cta-glow-y", "50%");
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (reduceMotion || isMobileRef.current || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      ref.current.style.setProperty("--cta-glow-x", `${x}%`);
      ref.current.style.setProperty("--cta-glow-y", `${y}%`);
    },
    [reduceMotion],
  );

  return (
    <Link
      ref={ref}
      className={`pilot-gold-cta ${className}`.trim()}
      onPointerMove={onPointerMove}
      onPointerLeave={resetGlow}
      {...linkProps}
    >
      <span className="pilot-gold-cta-shine" aria-hidden />
      <span className="pilot-gold-cta-surface" aria-hidden />
      <span className="pilot-gold-cta-label">{children}</span>
      {showArrow ? (
        <span aria-hidden className="pilot-gold-cta-arrow">
          →
        </span>
      ) : null}
    </Link>
  );
}
