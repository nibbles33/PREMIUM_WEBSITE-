"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type MiniatureSlot =
  | "car"
  | "suv"
  | "motorcycle"
  | "home"
  | "condo"
  | "cottage"
  | "boat"
  | "wedding"
  | "valuable"
  | "semi-truck"
  | "dump-truck"
  | "contractor"
  | "warehouse"
  | "restaurant"
  | "food-truck"
  | "retail"
  | "manufacturing"
  | "tractor"
  | "greenhouse"
  | "office"
  | "rental"
  | "cargo";

type MiniatureObjectProps = {
  slot: MiniatureSlot;
  label?: string;
  href?: string;
  width?: number;
  className?: string;
  decorative?: boolean;
};

const PLACEHOLDER_SRC: Partial<Record<MiniatureSlot, string>> = {
  car: "/images/miniatures/car-placeholder.svg",
};

function PlaceholderShape({ slot }: { slot: MiniatureSlot }) {
  const src = PLACEHOLDER_SRC[slot] ?? PLACEHOLDER_SRC.car!;
  return (
    <Image
      src={src}
      alt=""
      width={120}
      height={48}
      className="h-auto w-full"
      aria-hidden
    />
  );
}

export default function MiniatureObject({
  slot,
  label,
  href,
  width = 100,
  className = "",
  decorative = false,
}: MiniatureObjectProps) {
  const inner: ReactNode = (
    <span
      className={`pilot-miniature-slot ${className}`}
      style={{ width: `${width}px` }}
      aria-hidden={decorative || !label ? true : undefined}
    >
      <PlaceholderShape slot={slot} />
      {label && !decorative ? (
        <span className="pilot-yep-label sr-only">{label}</span>
      ) : null}
    </span>
  );

  if (href && !decorative) {
    return (
      <Link
        href={href}
        className={`pilot-yep-object inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
        aria-label={label ?? slot}
      >
        {inner}
        {label ? (
          <span
            className="pilot-yep-label mt-1 block text-center text-[11px] font-medium text-charcoal"
            aria-hidden
          >
            {label}
          </span>
        ) : null}
      </Link>
    );
  }

  return inner;
}
