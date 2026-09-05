"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PilotButtonVariant = "primary" | "secondary" | "discover";

type BaseProps = {
  variant?: PilotButtonVariant;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
};

type LinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & {
    href: string;
  };

type ButtonProps = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className"> & {
    href?: undefined;
  };

export type PremiumPilotButtonProps = LinkProps | ButtonProps;

const variantClass: Record<PilotButtonVariant, string> = {
  primary: "pilot-btn-primary",
  secondary: "pilot-btn-secondary",
  discover: "pilot-btn-discover",
};

export default function PremiumPilotButton({
  variant = "primary",
  children,
  className = "",
  showArrow = variant === "primary",
  ...rest
}: PremiumPilotButtonProps) {
  const classes = `${variantClass[variant]} ${className}`.trim();

  const content = (
    <>
      {children}
      {showArrow && variant === "primary" ? (
        <span aria-hidden className="pilot-btn-arrow">
          →
        </span>
      ) : null}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as LinkProps;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    );
  }

  const buttonRest = rest as ButtonProps;
  return (
    <button type="button" className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
