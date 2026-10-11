"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  AgricultureNavDropdown,
  BusinessNavDropdown,
  CascadingNavDropdown,
  MobileCascadingNavSection,
  PersonalNavDropdown,
} from "@/components/nav/NavDropdowns";
import { agricultureNavCategories } from "@/data/nav-agriculture";
import { businessNavCategories } from "@/data/nav-business";
import { personalNavGroups } from "@/data/nav-personal";
import { resourcesNavGroups } from "@/data/nav-resources";
import { navItems } from "@/data/nav";
import { contextualQuoteHrefFromPathname } from "@/lib/quote/contextualQuoteHref";
import { BROKERAGE_PHONE_DISPLAY } from "@/lib/seo/structured-data";

const BROKER_HREF = "/contact/?intent=broker";
const PHONE_HREF = "tel:+12267826000";

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
        className="h-[34px] w-auto max-w-[92px] object-contain object-left min-[380px]:h-[40px] min-[380px]:max-w-[130px] sm:h-[47px] sm:max-w-none lg:h-[52px]"
      />
    </Link>
  );
}

function DesktopNavItem({
  kind,
  label,
  href,
  onNavigate,
}: {
  kind: (typeof navItems)[number]["kind"];
  label: string;
  href: string;
  onNavigate?: () => void;
}) {
  switch (kind) {
    case "personal":
      return <PersonalNavDropdown onNavigate={onNavigate} />;
    case "business":
      return <BusinessNavDropdown onNavigate={onNavigate} />;
    case "agriculture":
      return <AgricultureNavDropdown onNavigate={onNavigate} />;
    case "resources":
      return (
        <CascadingNavDropdown
          label={label}
          menu="resources"
          categories={resourcesNavGroups.map((g) => ({
            id: g.id,
            title: g.title,
            links: g.links,
          }))}
          hubHref={href}
          hubLabel="Explore Resources →"
          onNavigate={onNavigate}
        />
      );
    default:
      return (
        <Link
          href={href}
          className="nav-link-animated shrink-0 whitespace-nowrap text-[13px] font-medium text-charcoal hover:text-gold-dark xl:text-sm"
          onClick={onNavigate}
        >
          {label}
        </Link>
      );
  }
}

export default function Header() {
  const pathname = usePathname();
  const quoteHref = contextualQuoteHrefFromPathname(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

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
      <header className="sticky top-0 z-50">
        <div
          className="border-b border-white/5"
          style={{ backgroundColor: "#15191a" }}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5 sm:gap-4 sm:px-6 lg:px-8 xl:max-w-7xl">
            <p className="shrink-0 text-[10px] font-normal tracking-wide text-[#8a8f8e] sm:text-[11px]">
              A Division of Oracle RMS
            </p>
            <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-0.5 text-[10px] font-medium text-[#D0AD26] sm:gap-x-4 sm:text-[11px]">
              <a
                href={PHONE_HREF}
                data-track-location="header"
                className="transition-colors hover:text-[#E4C558]"
              >
                {BROKERAGE_PHONE_DISPLAY}
              </a>
              <span className="text-[#D0AD26]/40" aria-hidden>
                |
              </span>
              <span className="text-right">
                3063 Dougall Ave, Windsor, ON N9E 1S3
              </span>
            </div>
          </div>
        </div>

        <div
          className="border-b border-border"
          style={{ backgroundColor: "#FAFAF8", borderBottomColor: "#E5E3DC" }}
        >
          <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-3 min-[380px]:gap-3 min-[380px]:px-4 sm:gap-4 sm:px-6 lg:h-[4.5rem] lg:gap-5 lg:px-8 xl:max-w-7xl xl:gap-8">
            <LogoMark className="relative z-10 min-w-0 shrink" />

            <nav
              className="ml-2 hidden min-w-0 flex-1 items-center justify-center gap-3 lg:flex xl:ml-4 xl:gap-5"
              aria-label="Primary"
            >
              {navItems.map((item) => (
                <DesktopNavItem
                  key={item.label}
                  kind={item.kind}
                  label={item.label}
                  href={item.href}
                />
              ))}
            </nav>

            <div className="ml-auto hidden shrink-0 items-center gap-4 lg:flex xl:gap-5">
              <Link
                href={BROKER_HREF}
                className="nav-link-animated whitespace-nowrap text-[13px] font-medium text-gold-dark hover:text-charcoal xl:text-sm"
              >
                Talk to a Broker
              </Link>
              <Link
                href={quoteHref}
                data-track-location="header"
                className="btn-primary group inline-flex h-10 items-center justify-center rounded-md bg-gold px-4 text-sm font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark xl:px-5"
              >
                Get a Quote
                <span
                  aria-hidden
                  className="ml-1.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                >
                  →
                </span>
              </Link>
            </div>

            <div className="ml-auto flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-2 lg:hidden">
              <a
                href={PHONE_HREF}
                data-track-location="header"
                aria-label={`Call Premium Insurance Brokers at ${BROKERAGE_PHONE_DISPLAY}`}
                className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1 rounded-md border border-charcoal/15 bg-white px-2 text-xs font-medium text-charcoal transition-colors hover:border-gold/50 hover:bg-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold min-[380px]:px-2.5 sm:px-3 sm:text-[13px]"
              >
                <Phone className="h-4 w-4 shrink-0 text-gold-dark" aria-hidden />
                <span className="max-[379px]:sr-only">Call</span>
              </a>
              <Link
                href={quoteHref}
                data-track-location="header"
                className="btn-primary inline-flex min-h-11 min-w-0 items-center justify-center whitespace-nowrap rounded-md bg-gold px-2 text-[11px] font-medium text-charcoal min-[380px]:px-2.5 min-[380px]:text-xs sm:px-3"
              >
                Get a Quote →
              </Link>
              <button
                type="button"
                className="interactive-press inline-flex h-11 w-11 shrink-0 items-center justify-center text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
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
            <nav className="flex flex-1 flex-col" aria-label="Mobile">
              <MobileCascadingNavSection
                title="Personal"
                categories={personalNavGroups.map((g) => ({
                  id: g.id,
                  title: g.title,
                  links: g.links,
                }))}
                onNavigate={closeMenu}
                showQuoteCta
                quoteHref={quoteHref}
                hubHref="/personal/"
                hubLabel="View personal insurance hub →"
              />
              <MobileCascadingNavSection
                title="Business"
                categories={businessNavCategories.map((c) => ({
                  id: c.id,
                  title: c.title,
                  links: c.links,
                  role: c.role,
                }))}
                onNavigate={closeMenu}
                showQuoteCta
                quoteHref={quoteHref}
                hubHref="/commercial-insurance/"
                hubLabel="View commercial insurance hub →"
              />
              <MobileCascadingNavSection
                title="Agriculture"
                categories={agricultureNavCategories.map((c) => ({
                  id: c.id,
                  title: c.title,
                  links: c.links,
                  role: c.role,
                }))}
                onNavigate={closeMenu}
                showQuoteCta
                quoteHref={quoteHref}
                hubHref="/agriculture/"
                hubLabel="Explore Agriculture →"
              />
              <MobileCascadingNavSection
                title="Resources"
                categories={resourcesNavGroups.map((g) => ({
                  id: g.id,
                  title: g.title,
                  links: g.links,
                }))}
                onNavigate={closeMenu}
                hubHref="/resources/"
                hubLabel="Explore Resources →"
              />
              <Link
                href="/about/"
                className="flex min-h-14 items-center border-b border-border py-4 text-lg font-medium text-charcoal"
                onClick={closeMenu}
              >
                About
              </Link>
            </nav>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={PHONE_HREF}
                data-track-location="header"
                aria-label={`Call Premium Insurance Brokers at ${BROKERAGE_PHONE_DISPLAY}`}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-charcoal/15 bg-white text-sm font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                onClick={closeMenu}
              >
                <Phone className="h-4 w-4 text-gold-dark" aria-hidden />
                Call {BROKERAGE_PHONE_DISPLAY}
              </a>
              <Link
                href={BROKER_HREF}
                className="btn-secondary inline-flex h-12 items-center justify-center rounded-md border border-border text-sm font-medium text-gold-dark"
                onClick={closeMenu}
              >
                Talk to a Broker
              </Link>
              <Link
                href={quoteHref}
                data-track-location="header"
                className="btn-primary inline-flex h-12 items-center justify-center rounded-md bg-gold text-sm font-medium text-charcoal"
                onClick={closeMenu}
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
