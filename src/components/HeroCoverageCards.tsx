"use client";

import {
  Building2,
  Car,
  Home,
  Truck,
  type LucideIcon,
} from "lucide-react";
import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type CoverageCard = {
  id: string;
  label: string;
  descriptor: string;
  icon: LucideIcon;
  featured?: boolean;
};

const cards: CoverageCard[] = [
  {
    id: "auto",
    label: "Auto",
    descriptor: "Cars, trucks & more",
    icon: Car,
  },
  {
    id: "home",
    label: "Home",
    descriptor: "House, condo & contents",
    icon: Home,
  },
  {
    id: "business",
    label: "Business",
    descriptor: "Shops, offices & trades",
    icon: Building2,
  },
  {
    id: "commercial",
    label: "Commercial",
    descriptor: "Fleets, property & liability",
    icon: Truck,
    featured: true,
  },
];

/** Parallax capped low — ambient depth, not a toy effect */
const PARALLAX_CAP = 4;

type LayoutSlot = {
  x: number;
  y: number;
  left: string;
  top: string;
  rotate: number;
  width: string;
  shadow: string;
  hoverShadow: string;
  scale: number;
};

const desktopSlots: LayoutSlot[] = [
  {
    x: 0.45,
    y: 0.35,
    left: "2%",
    top: "6%",
    rotate: -2.5,
    width: "44%",
    shadow: "0 4px 18px rgba(32,39,40,0.07)",
    hoverShadow: "0 10px 28px rgba(32,39,40,0.12)",
    scale: 0.96,
  },
  {
    x: -0.35,
    y: 0.5,
    left: "52%",
    top: "2%",
    rotate: 2,
    width: "42%",
    shadow: "0 3px 14px rgba(32,39,40,0.06)",
    hoverShadow: "0 8px 24px rgba(32,39,40,0.1)",
    scale: 0.94,
  },
  {
    x: 0.4,
    y: -0.3,
    left: "0%",
    top: "54%",
    rotate: 1.25,
    width: "43%",
    shadow: "0 4px 16px rgba(32,39,40,0.07)",
    hoverShadow: "0 10px 26px rgba(32,39,40,0.11)",
    scale: 0.95,
  },
  {
    x: -0.5,
    y: -0.4,
    left: "36%",
    top: "40%",
    rotate: -1,
    width: "52%",
    shadow: "0 10px 32px rgba(32,39,40,0.16)",
    hoverShadow: "0 16px 40px rgba(32,39,40,0.22)",
    scale: 1.08,
  },
];

export default function HeroCoverageCards() {
  const reduceMotion = usePrefersReducedMotion();
  const stackRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      if (event.pointerType !== "mouse") return;
      const el = stackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      setOffset({
        x: Math.max(-PARALLAX_CAP, Math.min(PARALLAX_CAP, nx * PARALLAX_CAP * 2)),
        y: Math.max(-PARALLAX_CAP, Math.min(PARALLAX_CAP, ny * PARALLAX_CAP * 2)),
      });
    },
    [reduceMotion],
  );

  const onPointerLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setHoveredId(null);
  }, []);

  return (
    <>
      {/* Desktop / tablet: layered artwork stack — not interactive navigation */}
      <div
        ref={stackRef}
        className="relative mx-auto hidden h-[360px] w-full max-w-[440px] md:block lg:h-[400px] lg:max-w-[480px]"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        aria-hidden="true"
      >
        {/* Ambient gold glow behind the stack */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, #D0AD26 0%, transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        {cards.map((card, index) => {
          const Icon = card.icon;
          const slot = desktopSlots[index];
          const tx = reduceMotion ? 0 : offset.x * slot.x;
          const ty = reduceMotion ? 0 : offset.y * slot.y;
          const isHovered = hoveredId === card.id;
          const liftY = !reduceMotion && isHovered ? -5 : 0;
          const floatClass =
            !reduceMotion && card.featured ? "motion-safe-float" : "";

          return (
            <div
              key={card.id}
              className={`absolute pointer-events-auto transition-[transform,box-shadow] duration-[220ms] ease-out ${floatClass}`}
              style={{
                left: slot.left,
                top: slot.top,
                width: slot.width,
                zIndex: card.featured ? 5 : index + 1,
                transform: `translate3d(${tx}px, ${ty + liftY}px, 0) rotate(${slot.rotate}deg) scale(${
                  isHovered ? slot.scale * 1.02 : slot.scale
                })`,
                boxShadow: isHovered ? slot.hoverShadow : slot.shadow,
              }}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <CardSurface card={card} Icon={Icon} />
            </div>
          );
        })}
      </div>

      {/* Mobile: deliberate 2×2 composition — not a shrunken desktop stack */}
      <div className="relative md:hidden" aria-hidden="true">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, #D0AD26 0%, transparent 65%)",
          }}
        />
        <ul className="grid grid-cols-2 gap-2.5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <li key={card.id} className={card.featured ? "col-span-1" : ""}>
                <CardSurface card={card} Icon={Icon} mobile />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function CardSurface({
  card,
  Icon,
  mobile = false,
}: {
  card: CoverageCard;
  Icon: LucideIcon;
  mobile?: boolean;
}) {
  const featured = Boolean(card.featured);

  return (
    <div
      className={`flex flex-col font-sans ${
        mobile ? "min-h-[124px] p-4" : "min-h-[132px] p-5 lg:min-h-[148px] lg:p-6"
      } ${
        featured
          ? "border border-charcoal bg-charcoal text-white"
          : "border border-border bg-white text-charcoal"
      } ${mobile && featured ? "shadow-[0_8px_24px_rgba(32,39,40,0.14)]" : ""} ${
        mobile && !featured ? "shadow-[0_2px_10px_rgba(32,39,40,0.05)]" : ""
      }`}
    >
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full ${
          featured
            ? "bg-[color-mix(in_srgb,#D0AD26_22%,transparent)]"
            : "bg-[color-mix(in_srgb,#D0AD26_14%,#FAFAF8)]"
        }`}
      >
        <Icon
          className={`h-[18px] w-[18px] ${featured ? "text-gold" : "text-gold-dark"}`}
          strokeWidth={1.5}
          aria-hidden
        />
      </span>
      <div className={mobile ? "mt-4" : "mt-5"}>
        <p className="text-[15px] font-medium leading-tight tracking-tight">
          {card.label}
        </p>
        <p
          className={`mt-1 text-[12px] leading-snug ${
            featured ? "text-white/65" : "text-secondary"
          }`}
        >
          {card.descriptor}
        </p>
      </div>
    </div>
  );
}
