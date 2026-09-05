"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import PremiumGoldCTA from "@/components/pilot/PremiumGoldCTA";
import PremiumPilotButton from "@/components/pilot/PremiumPilotButton";
import ProtectionArc from "@/components/pilot/ProtectionArc";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  getPageHeroPhotography,
  PILOT_AUTO_HERO_IMAGE,
} from "@/data/photography";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { PilotProductPageConfig } from "@/types/pilot-product";

type ProductHeroProps = {
  config: Pick<
    PilotProductPageConfig,
    | "eyebrow"
    | "headline"
    | "heroLead"
    | "heroSupporting"
    | "photographySlug"
    | "accentColor"
    | "quoteHref"
    | "quoteLabel"
    | "brokerHref"
    | "secondaryCta"
    | "slug"
  >;
};

export default function ProductHero({ config }: ProductHeroProps) {
  const heroPhoto = config.photographySlug
    ? getPageHeroPhotography(config.photographySlug)
    : null;
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
      className="pilot-product-hero relative overflow-hidden border-b border-border bg-[#F5F1E8]"
      aria-labelledby={`pilot-product-hero-${config.slug}`}
      onPointerMove={onPointerMove}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden
        style={{
          background: `radial-gradient(circle at 70% 40%, ${config.accentColor}, transparent 55%)`,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 xl:max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <RevealOnScroll>
            <div
              className="max-w-xl"
              style={{ transform: `translate3d(${copyShiftX}px, 0, 0)` }}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
                {config.eyebrow} · Windsor-Essex
              </p>
              <h1
                id={`pilot-product-hero-${config.slug}`}
                className="mt-3 text-[2.25rem] font-medium leading-[1.06] tracking-[-0.03em] text-charcoal sm:text-5xl lg:text-[3.35rem]"
              >
                {config.headline}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-secondary sm:text-base lg:text-lg">
                {config.heroLead}
              </p>
              {config.heroSupporting ? (
                <p className="mt-3 text-[14px] leading-relaxed text-secondary/90">
                  {config.heroSupporting}
                </p>
              ) : null}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PremiumGoldCTA href={config.quoteHref}>
                  {config.quoteLabel}
                </PremiumGoldCTA>
                <PremiumPilotButton
                  href={config.secondaryCta?.href ?? config.brokerHref ?? "/talk-to-a-broker/"}
                  variant="secondary"
                  showArrow={false}
                >
                  {config.secondaryCta?.label ?? "Talk to a Broker"}
                </PremiumPilotButton>
              </div>
            </div>
          </RevealOnScroll>

          {heroPhoto ? (
            <RevealOnScroll className="relative">
              <div className="pilot-product-hero-visual relative">
                <div className="pilot-product-hero-arc pointer-events-none">
                  <ProtectionArc active breathe={!reduceMotion} />
                </div>
                <div
                  className="pilot-product-hero-photo relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/80 shadow-[0_24px_56px_rgba(32,39,40,0.14)] sm:aspect-[16/11] lg:aspect-[5/4]"
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
                </div>
              </div>
            </RevealOnScroll>
          ) : null}
        </div>
      </div>
    </section>
  );
}
