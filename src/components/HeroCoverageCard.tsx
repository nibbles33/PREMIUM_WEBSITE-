"use client";

import {
  Building2,
  Car,
  Check,
  Home,
  Truck,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CoverageCategory = {
  id: string;
  name: string;
  icon: LucideIcon;
  bullets: string[];
};

const categories: CoverageCategory[] = [
  {
    id: "auto",
    name: "Auto Insurance",
    icon: Car,
    bullets: [
      "Liability coverage",
      "Collision & comprehensive",
      "24/7 claims support",
    ],
  },
  {
    id: "home",
    name: "Home Insurance",
    icon: Home,
    bullets: [
      "Property & contents",
      "Liability protection",
      "Water & fire damage",
    ],
  },
  {
    id: "business",
    name: "Business Insurance",
    icon: Building2,
    bullets: [
      "General liability",
      "Commercial property",
      "Business interruption",
    ],
  },
  {
    id: "commercial-auto",
    name: "Commercial Auto",
    icon: Truck,
    bullets: [
      "Fleet coverage",
      "Cargo protection",
      "Multi-vehicle discounts",
    ],
  },
];

const ROTATE_MS = 3500;
const FADE_MS = 300;

type HeroCoverageCardProps = {
  /** When true, render optional faded photo behind the card */
  showBackgroundImage?: boolean;
};

export default function HeroCoverageCard({
  showBackgroundImage = false,
}: HeroCoverageCardProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const goTo = useCallback(
    (index: number, animate: boolean) => {
      if (!animate || reduceMotion) {
        setActiveIndex(index);
        setVisible(true);
        return;
      }
      setVisible(false);
      window.setTimeout(() => {
        setActiveIndex(index);
        setVisible(true);
      }, FADE_MS);
    },
    [reduceMotion],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setVisible(false);
      window.setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % categories.length);
        setVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const category = categories[activeIndex];
  const Icon = category.icon;

  return (
    <div className="relative mx-auto flex w-full max-w-[340px] items-center justify-center sm:max-w-[380px] lg:max-w-[400px]">
      {/* Soft gold radial glow — complete design without a photo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(208,173,38,0.15) 0%, transparent 68%)",
        }}
        aria-hidden
      />

      {/*
        Optional: add hero-background.jpg to public/images/ — a licensed (e.g. Unsplash)
        photo of a modern home, vehicle, or business exterior, Windsor-Essex relevant if
        possible. Faded/subtle treatment only — the glow fallback above is a complete
        design on its own.
      */}
      {showBackgroundImage ? (
        <div
          className="pointer-events-none absolute inset-[-12%] overflow-hidden rounded-[28px] opacity-[0.15]"
          aria-hidden
        >
          <Image
            src="/images/hero-background.jpg"
            alt=""
            fill
            className="object-cover"
            style={{
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            }}
            sizes="400px"
          />
        </div>
      ) : null}

      <div
        className="relative w-full rotate-[3.5deg] rounded-[14px] bg-charcoal p-6 shadow-[0_16px_40px_rgba(32,39,40,0.22)] sm:p-7"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold sm:text-xs">
          What we cover
        </p>

        <div
          className="mt-5 transition-opacity ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transitionDuration: reduceMotion ? "0ms" : `${FADE_MS}ms`,
          }}
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[color-mix(in_srgb,#D0AD26_22%,transparent)]">
            <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} aria-hidden />
          </span>

          <h2 className="mt-4 text-xl font-medium tracking-tight text-white sm:text-2xl">
            {category.name}
          </h2>

          <ul className="mt-4 space-y-2.5">
            {category.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2.5 text-sm leading-snug text-white/80"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                  strokeWidth={2}
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 border-t border-white/10 pt-4 text-xs text-white/55">
          Matched with a licensed broker
        </p>

        <div
          className="mt-4 flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Coverage categories"
        >
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={cat.name}
              className={`h-2 rounded-full transition-[width,background-color] duration-200 ${
                index === activeIndex
                  ? "w-5 bg-gold"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => goTo(index, !reduceMotion)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
