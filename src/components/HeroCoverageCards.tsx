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

const PARALLAX_CAP = 6;

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
      {/* Desktop / tablet: staggered stack with restrained parallax */}
      <div
        ref={stackRef}
        className="relative mx-auto hidden h-[340px] w-full max-w-[420px] md:block lg:h-[380px] lg:max-w-[460px]"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        aria-hidden="true"
      >
        {cards.map((card, index) => {
          const Icon = card.icon;
          const factors = [
            { x: 0.55, y: 0.4, left: "0%", top: "8%", rotate: -2 },
            { x: -0.4, y: 0.55, left: "48%", top: "0%", rotate: 1.5 },
            { x: 0.45, y: -0.35, left: "4%", top: "52%", rotate: 1 },
            { x: -0.55, y: -0.45, left: "38%", top: "42%", rotate: -1 },
          ][index];

          const tx = reduceMotion ? 0 : offset.x * factors.x;
          const ty = reduceMotion ? 0 : offset.y * factors.y;
          const isHovered = hoveredId === card.id;
          const floatClass =
            !reduceMotion && card.featured
              ? "motion-safe-float"
              : "";

          return (
            <div
              key={card.id}
              className={`absolute w-[46%] transition-transform duration-200 ease-out ${floatClass}`}
              style={{
                left: factors.left,
                top: factors.top,
                zIndex: card.featured ? 4 : index + 1,
                transform: `translate3d(${tx}px, ${ty}px, 0) rotate(${factors.rotate}deg) scale(${
                  isHovered ? 1.03 : card.featured ? 1.06 : 1
                })`,
              }}
              onMouseEnter={() => setHoveredId(card.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <CardSurface card={card} Icon={Icon} />
            </div>
          );
        })}
      </div>

      {/* Mobile: horizontal snap-scroll row */}
      <div className="md:hidden">
        <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <li
                key={card.id}
                className="w-[72%] max-w-[260px] shrink-0 snap-center first:ml-0"
              >
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
      className={`flex min-h-[112px] flex-col justify-between border p-4 font-sans transition-[transform,background-color] duration-200 ease-out active:scale-[0.98] md:active:scale-100 ${
        featured
          ? `border-charcoal bg-charcoal text-white ${mobile ? "" : "shadow-[0_8px_24px_rgba(32,39,40,0.12)]"}`
          : "border-border bg-white text-charcoal"
      } ${mobile ? "min-h-[120px]" : ""}`}
    >
      <Icon
        className={`h-5 w-5 ${featured ? "text-gold" : "text-gold-dark"}`}
        strokeWidth={1.5}
        aria-hidden
      />
      <div className="mt-6">
        <p className="text-sm font-medium tracking-tight">{card.label}</p>
        <p
          className={`mt-0.5 text-xs leading-snug ${
            featured ? "text-white/70" : "text-secondary"
          }`}
        >
          {card.descriptor}
        </p>
      </div>
    </div>
  );
}
