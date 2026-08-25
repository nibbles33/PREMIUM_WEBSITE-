"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/data/nav";

const QUOTE_HREF = "/get-a-quote/";
const BROKER_HREF = "/talk-to-a-broker/";

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label="Premium Insurance Brokers — Home"
    >
      <Image
        src="/logo/logo-for-light-bg.png"
        alt="Premium Insurance Brokers"
        width={198}
        height={52}
        priority
        className="h-[42px] w-auto sm:h-[47px] lg:h-[52px]"
      />
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b border-border"
        style={{ backgroundColor: "#FAFAF8", borderBottomColor: "#E5E3DC" }}
      >
        {/*
          Breakpoint strategy:
          - < lg: logo + Quote + hamburger
          - lg (1024): tighter nav gaps so logo + Quote stay dominant
          - xl (1280+): more comfortable nav spacing
        */}
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:h-[4.5rem] lg:gap-5 lg:px-8 xl:max-w-7xl xl:gap-8">
          <LogoMark className="relative z-10" />

          <nav
            className="ml-2 hidden min-w-0 flex-1 items-center justify-center gap-4 lg:flex xl:ml-4 xl:gap-6"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="shrink-0 whitespace-nowrap text-[13px] font-medium text-charcoal transition-colors hover:text-gold-dark xl:text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto hidden shrink-0 items-center gap-4 lg:flex xl:gap-5">
            <Link
              href={BROKER_HREF}
              className="whitespace-nowrap text-[13px] font-medium text-gold-dark transition-colors hover:text-charcoal xl:text-sm"
            >
              Talk to a Broker
            </Link>
            <Link
              href={QUOTE_HREF}
              className="group inline-flex h-10 items-center justify-center rounded-md bg-gold px-4 text-sm font-medium text-charcoal transition-colors hover:bg-gold-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark xl:px-5"
            >
              Get a Quote
              <span
                aria-hidden
                className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:hidden">
            <Link
              href={QUOTE_HREF}
              className="inline-flex h-9 items-center justify-center rounded-md bg-gold px-3 text-xs font-medium text-charcoal transition-colors hover:bg-gold-dark"
            >
              Get a Quote →
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center text-charcoal"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 overflow-y-auto bg-offwhite lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex min-h-full flex-col px-4 pb-8 pt-20 sm:px-6">
            <nav className="flex flex-1 flex-col gap-1" aria-label="Mobile">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-border py-4 text-lg font-medium text-charcoal"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={BROKER_HREF}
                className="inline-flex h-12 items-center justify-center rounded-md border border-border text-sm font-medium text-gold-dark"
                onClick={() => setMenuOpen(false)}
              >
                Talk to a Broker
              </Link>
              <Link
                href={QUOTE_HREF}
                className="inline-flex h-12 items-center justify-center rounded-md bg-gold text-sm font-medium text-charcoal"
                onClick={() => setMenuOpen(false)}
              >
                Get a Quote →
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
