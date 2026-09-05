"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import PremiumGoldCTA from "@/components/pilot/PremiumGoldCTA";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import ProtectionArc from "@/components/pilot/ProtectionArc";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  AUTO_ACCENT,
  AUTO_BROKER_HREF,
  AUTO_QUOTE_HREF,
} from "@/data/pilot-auto";
import {
  getPageHeroPhotography,
  PILOT_AUTO_HERO_IMAGE,
} from "@/data/photography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function HeroCarSlot() {
  return (
    <div className="pilot-auto-car-slot" aria-hidden>
      <svg
        viewBox="0 0 80 32"
        className="pilot-auto-car-silhouette"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 22 L16 10 L36 8 L62 10 L72 18 L72 24 L8 24 Z"
          fill="currentColor"
          opacity="0.28"
        />
        <circle cx="22" cy="24" r="5" fill="currentColor" opacity="0.4" />
        <circle cx="58" cy="24" r="5" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  );
}

export default function AutoProductHero() {
  const heroPhoto = getPageHeroPhotography("auto-insurance");
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion || isMobile || !sectionRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = sectionRef.current!.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width - 0.5,
          y: (event.clientY - rect.top) / rect.height - 0.5,
        });
      });
    },
    [reduceMotion, isMobile],
  );

  const photoShiftX = reduceMotion || isMobile ? 0 : pointer.x * 10;
  const photoShiftY = reduceMotion || isMobile ? 0 : pointer.y * 6;
  const copyShiftX = reduceMotion || isMobile ? 0 : pointer.x * -4;

  return (
    <section
      ref={sectionRef}
      className="pilot-auto-hero relative overflow-hidden border-b border-border bg-[#F5F1E8]"
      aria-labelledby="pilot-auto-hero-heading"
      onPointerMove={onPointerMove}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          background: `radial-gradient(circle at 70% 40%, ${AUTO_ACCENT}, transparent 55%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <RevealOnScroll>
            <div
              className="max-w-xl"
              style={{
                transform: `translate3d(${copyShiftX}px, 0, 0)`,
              }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                Personal Insurance · Windsor-Essex
              </p>
              <h1
                id="pilot-auto-hero-heading"
                className="mt-3 text-[2.25rem] font-medium leading-[1.06] tracking-[-0.03em] text-charcoal sm:text-5xl lg:text-[3.35rem]"
              >
                Auto Insurance
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base lg:text-lg">
                Your car gets you everywhere. Let&apos;s make sure it&apos;s
                properly protected — without the runaround.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-secondary/90">
                Compare Ontario auto options through an independent broker who
                explains what you&apos;re actually buying.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PremiumGoldCTA href={AUTO_QUOTE_HREF}>
                  Get an Auto Quote
                </PremiumGoldCTA>
                <PremiumPilotButton href={AUTO_BROKER_HREF} variant="secondary">
                  Talk to a Broker
                </PremiumPilotButton>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="relative">
            <div className="pilot-auto-hero-visual relative">
              <div className="pilot-auto-hero-arc pointer-events-none">
                <ProtectionArc active breathe={!reduceMotion} />
              </div>

              {heroPhoto ? (
                <div
                  className="pilot-auto-hero-photo relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/80 shadow-[0_24px_56px_rgba(32,39,40,0.14)] sm:aspect-[16/11] lg:aspect-[5/4]"
                  style={{
                    transform: `translate3d(${photoShiftX}px, ${photoShiftY}px, 0)`,
                  }}
                >
                  <Image
                    src={heroPhoto.src}
                    alt={heroPhoto.alt}
                    fill
                    priority
                    sizes={PILOT_AUTO_HERO_IMAGE.sizes}
                    quality={PILOT_AUTO_HERO_IMAGE.quality}
                    className="object-cover object-center"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 55%, rgba(32,39,40,0.18) 100%)",
                    }}
                  />
                  <div className="pilot-road-accent opacity-90" aria-hidden />
                </div>
              ) : null}

              {!isMobile ? <HeroCarSlot /> : null}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
