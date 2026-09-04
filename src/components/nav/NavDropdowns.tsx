"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useId, useRef, useState } from "react";
import { personalNavGroups, type NavGroup } from "@/data/nav-personal";
import { businessNavClusters, type BusinessNavCluster } from "@/data/nav-business";

type SimpleLink = { label: string; href: string; description?: string };

function DropdownPanel({
  id,
  labelledBy,
  children,
  wide = false,
  scrollable = false,
}: {
  id: string;
  labelledBy: string;
  children: React.ReactNode;
  wide?: boolean;
  scrollable?: boolean;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      className={`absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-xl border border-border bg-white shadow-[0_16px_40px_rgba(32,39,40,0.12)] ${
        wide ? "w-[min(92vw,720px)]" : "w-[min(92vw,420px)]"
      } ${scrollable ? "nav-dropdown-panel-scrollable flex max-h-[min(calc(100dvh-5.5rem),calc(100vh-5.5rem))] flex-col overflow-hidden p-0" : "p-4"}`}
    >
      {scrollable ? (
        <div className="nav-dropdown-panel-scroll overflow-y-auto overscroll-contain p-4">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

function NavDropdownLink({
  link,
  onNavigate,
}: {
  link: SimpleLink;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={link.href}
      className="block rounded-md px-3 py-2 transition-colors hover:bg-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      onClick={onNavigate}
    >
      <span className="block text-[13px] font-medium text-charcoal">{link.label}</span>
      {link.description ? (
        <span className="mt-0.5 block text-[12px] leading-snug text-secondary">
          {link.description}
        </span>
      ) : null}
    </Link>
  );
}

export function PersonalNavDropdown({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        id={buttonId}
        type="button"
        className="nav-link-animated inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[13px] font-medium text-charcoal hover:text-gold-dark xl:text-sm"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Personal
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <DropdownPanel id={panelId} labelledBy={buttonId}>
          <div className="grid gap-4 sm:grid-cols-3">
            {personalNavGroups.map((group: NavGroup) => (
              <div key={group.title}>
                <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
                  {group.title}
                </p>
                <ul className="mt-2 space-y-0.5">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <NavDropdownLink link={link} onNavigate={onNavigate} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DropdownPanel>
      ) : null}
    </div>
  );
}

export function BusinessNavDropdown({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        id={buttonId}
        type="button"
        className="nav-link-animated inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[13px] font-medium text-charcoal hover:text-gold-dark xl:text-sm"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Business
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <DropdownPanel id={panelId} labelledBy={buttonId} wide scrollable>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessNavClusters.map((cluster: BusinessNavCluster) => (
              <div key={cluster.title}>
                <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
                  {cluster.title}
                </p>
                <ul className="mt-2 space-y-0.5">
                  {cluster.links.map((link) => (
                    <li key={link.href + link.label}>
                      <NavDropdownLink link={link} onNavigate={onNavigate} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-3">
            <Link
              href="/commercial-insurance/"
              className="inline-flex px-3 text-[13px] font-medium text-gold-dark hover:text-charcoal"
              onClick={onNavigate}
            >
              View commercial insurance hub →
            </Link>
          </div>
        </DropdownPanel>
      ) : null}
    </div>
  );
}

export function SimpleNavDropdown({
  label,
  hubHref,
  links,
  onNavigate,
}: {
  label: string;
  hubHref: string;
  links: SimpleLink[];
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const panelId = useId();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        id={buttonId}
        type="button"
        className="nav-link-animated inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[13px] font-medium text-charcoal hover:text-gold-dark xl:text-sm"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <DropdownPanel id={panelId} labelledBy={buttonId}>
          <ul className="space-y-0.5">
            {links.map((link) => (
              <li key={link.href + link.label}>
                <NavDropdownLink link={link} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-border pt-3">
            <Link
              href={hubHref}
              className="inline-flex px-3 text-[13px] font-medium text-gold-dark hover:text-charcoal"
              onClick={onNavigate}
            >
              View all {label.toLowerCase()} →
            </Link>
          </div>
        </DropdownPanel>
      ) : null}
    </div>
  );
}

export function MobileNavSection({
  title,
  links,
  onNavigate,
  defaultOpen = false,
}: {
  title: string;
  links: SimpleLink[];
  onNavigate: () => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-border">
      <button
        id={buttonId}
        type="button"
        className="flex w-full items-center justify-between py-4 text-lg font-medium text-charcoal"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={panelId} role="region" aria-labelledby={buttonId} className="pb-3 pl-2">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="block py-2 text-[15px] text-secondary hover:text-charcoal"
                  onClick={onNavigate}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function MobileNavGroupSection({
  title,
  groups,
  onNavigate,
}: {
  title: string;
  groups: NavGroup[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-border">
      <button
        id={buttonId}
        type="button"
        className="flex w-full items-center justify-between py-4 text-lg font-medium text-charcoal"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={panelId} role="region" aria-labelledby={buttonId} className="space-y-4 pb-4 pl-2">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
                {group.title}
              </p>
              <ul className="mt-2 space-y-1">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="block py-1.5 text-[15px] text-secondary hover:text-charcoal"
                      onClick={onNavigate}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function MobileNavClusterSection({
  title,
  clusters,
  onNavigate,
}: {
  title: string;
  clusters: BusinessNavCluster[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-border">
      <button
        id={buttonId}
        type="button"
        className="flex w-full items-center justify-between py-4 text-lg font-medium text-charcoal"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={panelId} role="region" aria-labelledby={buttonId} className="space-y-4 pb-4 pl-2">
          {clusters.map((cluster) => (
            <div key={cluster.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
                {cluster.title}
              </p>
              <ul className="mt-2 space-y-1">
                {cluster.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="block py-1.5 text-[15px] text-secondary hover:text-charcoal"
                      onClick={onNavigate}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
