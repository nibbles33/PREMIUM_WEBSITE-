"use client";

import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Fragment,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  businessNavCategories,
  type BusinessNavCategory,
} from "@/data/nav-business";
import { personalNavGroups, type NavGroup } from "@/data/nav-personal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { track } from "@/lib/analytics";

type SimpleLink = { label: string; href: string; description?: string };

type CascadingCategory = {
  id: string;
  title: string;
  links: SimpleLink[];
  role?: "industry" | "specialty_group";
};

const QUOTE_HREF = "/get-a-quote/";
const PANEL_TRANSITION_MS = 280;

function slugFromHref(href: string): string {
  return href.replace(/^\/|\/$/g, "").replace(/[/?=&]/g, "_") || "home";
}

function useCloseOnEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
}

function DropdownShell({
  id,
  labelledBy,
  children,
  wide = false,
}: {
  id: string;
  labelledBy: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      className="absolute left-1/2 top-full z-50 mt-2 flex max-h-[min(calc(100dvh-5.5rem),calc(100vh-5.5rem))] -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-border bg-white p-0 shadow-[0_16px_40px_rgba(32,39,40,0.12)]"
      style={{
        width: wide ? "min(92vw, 820px)" : "min(92vw, 560px)",
      }}
    >
      {children}
    </div>
  );
}

function NavDropdownLink({
  link,
  onNavigate,
  menu,
  categoryId,
}: {
  link: SimpleLink;
  onNavigate?: () => void;
  menu: string;
  categoryId?: string;
}) {
  const linkSlug = slugFromHref(link.href);
  return (
    <Link
      href={link.href}
      data-track="nav_link_click"
      data-track-menu={menu}
      data-track-link-slug={linkSlug}
      {...(categoryId
        ? { "data-track-category-id": categoryId }
        : {})}
      className="group flex min-h-11 items-center gap-2 rounded-md px-3 py-2 transition-[background-color,opacity] duration-200 ease-out hover:bg-offwhite focus-visible:bg-offwhite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold motion-reduce:transition-none"
      onClick={onNavigate}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-medium leading-snug text-charcoal xl:text-[13.5px]">
          {link.label}
        </span>
        {link.description ? (
          <span className="mt-0.5 block text-[12px] leading-snug text-secondary">
            {link.description}
          </span>
        ) : null}
      </span>
      <ChevronRight
        className="h-3.5 w-3.5 shrink-0 text-gold-dark opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        aria-hidden
      />
    </Link>
  );
}

function QuoteCtaLink({
  menu,
  onNavigate,
  href = QUOTE_HREF,
}: {
  menu: string;
  onNavigate?: () => void;
  href?: string;
}) {
  return (
    <Link
      href={href}
      data-track-location={`nav_${menu}`}
      data-track-menu={menu}
      className="btn-primary inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-gold px-4 text-[13px] font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-dark sm:flex-none"
      onClick={onNavigate}
    >
      Get a Quote
      <span aria-hidden className="ml-1.5">
        →
      </span>
    </Link>
  );
}

function CascadingDesktopPanel({
  categories,
  menu,
  hubHref,
  hubLabel,
  showQuoteCta,
  onNavigate,
  panelId,
  leftRailLabel,
}: {
  categories: CascadingCategory[];
  menu: string;
  hubHref?: string;
  hubLabel?: string;
  showQuoteCta?: boolean;
  onNavigate?: () => void;
  panelId: string;
  /** When set, always show this left-rail heading (e.g. Business Industries). */
  leftRailLabel?: string;
}) {
  const reduceMotion = usePrefersReducedMotion();
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const [panelVisible, setPanelVisible] = useState(true);
  const catRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const pendingIdRef = useRef<string | null>(null);
  const activeIdRef = useRef(activeId);
  /**
   * Blocks hover-select briefly after mount so a remount under a stationary
   * cursor (close/reopen) cannot auto-select a non-default category.
   */
  const hoverEnabledRef = useRef(false);
  const hoverArmTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  const productsPanelId = `${panelId}-products`;
  const active =
    categories.find((c) => c.id === activeId) ?? categories[0];

  const industries = categories.filter((c) => c.role !== "specialty_group");
  const specialty = categories.filter((c) => c.role === "specialty_group");
  const ordered = specialty.length
    ? [...industries, ...specialty]
    : categories;

  const clearTransition = useCallback(() => {
    if (transitionTimerRef.current !== null) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    pendingIdRef.current = null;
  }, []);

  useEffect(() => {
    hoverEnabledRef.current = false;
    hoverArmTimerRef.current = setTimeout(() => {
      hoverArmTimerRef.current = null;
      hoverEnabledRef.current = true;
    }, 50);
    return () => {
      clearTransition();
      if (hoverArmTimerRef.current !== null) {
        clearTimeout(hoverArmTimerRef.current);
        hoverArmTimerRef.current = null;
      }
    };
  }, [clearTransition]);

  const selectCategory = useCallback(
    (id: string, source: "hover" | "click" | "keyboard") => {
      if (!id) return;

      // Stationary cursor over a remounted panel must not auto-change category.
      if (source === "hover" && !hoverEnabledRef.current) return;

      // Re-hovering the already-visible category cancels any in-flight change.
      if (id === activeIdRef.current) {
        clearTransition();
        setPanelVisible(true);
        return;
      }

      // Ignore duplicate hover toward the same pending target.
      if (
        source === "hover" &&
        pendingIdRef.current === id &&
        transitionTimerRef.current !== null
      ) {
        return;
      }

      clearTransition();

      track("nav_category_select", {
        menu,
        category_id: id,
        surface: source === "hover" ? "nav_hover" : "nav_desktop",
      });

      // Keyboard/click and reduced-motion apply immediately so a pending hover
      // timeout can never overwrite a later intentional selection.
      if (reduceMotion || source === "keyboard" || source === "click") {
        setActiveId(id);
        setPanelVisible(true);
        return;
      }

      pendingIdRef.current = id;
      setPanelVisible(false);
      transitionTimerRef.current = setTimeout(() => {
        transitionTimerRef.current = null;
        if (pendingIdRef.current !== id) return;
        pendingIdRef.current = null;
        setActiveId(id);
        setPanelVisible(true);
      }, PANEL_TRANSITION_MS);
    },
    [clearTransition, menu, reduceMotion],
  );

  const onCategoryKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      next = (index + 1) % ordered.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      next = (index - 1 + ordered.length) % ordered.length;
    } else if (event.key === "Home") {
      event.preventDefault();
      next = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      next = ordered.length - 1;
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectCategory(ordered[index].id, "keyboard");
      return;
    } else {
      return;
    }
    catRefs.current[next]?.focus();
    selectCategory(ordered[next].id, "keyboard");
  };

  const panelStyle: CSSProperties = reduceMotion
    ? {}
    : {
        transition: `opacity ${PANEL_TRANSITION_MS}ms ease-out, transform ${PANEL_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
      };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-stretch overflow-hidden">
        <div className="nav-dropdown-panel-scroll min-h-0 overflow-y-auto overscroll-contain border-r border-border/80 bg-[#FAFAF8] p-3">
          {leftRailLabel || (industries.length && specialty.length) ? (
            <p className="px-3 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
              {leftRailLabel ?? "Industries"}
            </p>
          ) : null}
          <div
            role="tablist"
            aria-label={`${menu} categories`}
            aria-orientation="vertical"
            className="flex flex-col gap-2.5"
          >
            {ordered.map((category, index) => {
              const isSpecialty = category.role === "specialty_group";
              const isFirstSpecialty =
                isSpecialty &&
                ordered.findIndex((c) => c.role === "specialty_group") ===
                  index;
              const isActive = category.id === active?.id;
              return (
                <Fragment key={category.id}>
                  {isFirstSpecialty ? (
                    <div
                      className="my-1 border-t border-border/80 pt-2"
                      role="presentation"
                      aria-hidden
                    />
                  ) : null}
                  <button
                    ref={(el) => {
                      catRefs.current[index] = el;
                    }}
                    id={`${panelId}-cat-${category.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={productsPanelId}
                    tabIndex={isActive ? 0 : -1}
                    className={`flex w-full min-h-11 items-center justify-between rounded-md px-3 py-2 text-left text-[13px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                      isSpecialty
                        ? isActive
                          ? "bg-white text-charcoal shadow-[0_1px_0_rgba(32,39,40,0.06)] ring-1 ring-gold/40"
                          : "text-charcoal hover:bg-white/70"
                        : isActive
                          ? "bg-white text-charcoal shadow-[0_1px_0_rgba(32,39,40,0.06)] ring-1 ring-border"
                          : "text-secondary hover:bg-white/70 hover:text-charcoal"
                    }`}
                    onMouseEnter={() =>
                      selectCategory(category.id, "hover")
                    }
                    onClick={() => selectCategory(category.id, "click")}
                    onKeyDown={(e) => onCategoryKeyDown(e, index)}
                  >
                    <span className="pr-2 leading-snug">
                      {isSpecialty ? (
                        <>
                          <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
                            Also available
                          </span>
                          {category.title}
                        </>
                      ) : (
                        category.title
                      )}
                    </span>
                    <ChevronRight
                      className={`h-3.5 w-3.5 shrink-0 ${
                        isActive ? "text-gold-dark" : "text-secondary/50"
                      }`}
                      aria-hidden
                    />
                  </button>
                </Fragment>
              );
            })}
          </div>
        </div>

        <div
          id={productsPanelId}
          className="nav-dropdown-panel-scroll flex min-h-0 flex-col overflow-y-auto overscroll-contain p-3 sm:p-4"
          role="tabpanel"
          aria-labelledby={
            active ? `${panelId}-cat-${active.id}` : undefined
          }
        >
          <div
            className={`min-h-full ${
              panelVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-2 opacity-0"
            }`}
            style={panelStyle}
          >
            {active ? (
              <>
                <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark">
                  {active.title}
                </p>
                <ul className="mt-1 flex flex-col gap-2 border-t border-border/70 pt-2">
                  {active.links.map((link) => (
                    <li key={link.href + link.label}>
                      <NavDropdownLink
                        link={link}
                        menu={menu}
                        categoryId={active.id}
                        onNavigate={onNavigate}
                      />
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {(showQuoteCta || hubHref) && (
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border bg-white px-4 py-3">
          {showQuoteCta ? (
            <QuoteCtaLink menu={menu} onNavigate={onNavigate} />
          ) : (
            <span className="min-h-11" aria-hidden />
          )}
          {hubHref ? (
            <Link
              href={hubHref}
              data-track="nav_link_click"
              data-track-menu={menu}
              data-track-link-slug={slugFromHref(hubHref)}
              className="inline-flex min-h-11 items-center text-[13px] font-medium text-gold-dark hover:text-charcoal"
              onClick={onNavigate}
            >
              {hubLabel ?? "View all →"}
            </Link>
          ) : null}
        </div>
      )}
    </div>
  );
}

function useDropdownOpen(menu: string) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  /** Prevents Escape→focus from immediately reopening via onFocus. */
  const suppressFocusOpen = useRef(false);

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

  const close = useCallback(() => {
    clearCloseTimer();
    suppressFocusOpen.current = true;
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
    window.setTimeout(() => {
      suppressFocusOpen.current = false;
    }, 0);
  }, []);

  const onTriggerFocus = () => {
    if (suppressFocusOpen.current) return;
    setOpen(true);
  };

  useCloseOnEscape(open, close);

  useEffect(() => {
    if (open) track("nav_open", { menu });
  }, [open, menu]);

  return {
    open,
    setOpen,
    clearCloseTimer,
    scheduleClose,
    close,
    triggerRef,
    onTriggerFocus,
  };
}

export function CascadingNavDropdown({
  label,
  menu,
  categories,
  hubHref,
  hubLabel,
  showQuoteCta = false,
  wide = false,
  leftRailLabel,
  onNavigate,
}: {
  label: string;
  menu: string;
  categories: CascadingCategory[];
  hubHref?: string;
  hubLabel?: string;
  showQuoteCta?: boolean;
  wide?: boolean;
  leftRailLabel?: string;
  onNavigate?: () => void;
}) {
  const buttonId = useId();
  const panelId = useId();
  const {
    open,
    setOpen,
    clearCloseTimer,
    scheduleClose,
    close,
    triggerRef,
    onTriggerFocus,
  } = useDropdownOpen(menu);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={onTriggerFocus}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
      }}
    >
      <button
        ref={triggerRef}
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
        <DropdownShell id={panelId} labelledBy={buttonId} wide={wide}>
          <CascadingDesktopPanel
            categories={categories}
            menu={menu}
            hubHref={hubHref}
            hubLabel={hubLabel}
            showQuoteCta={showQuoteCta}
            onNavigate={onNavigate}
            panelId={panelId}
            leftRailLabel={leftRailLabel}
          />
        </DropdownShell>
      ) : null}
    </div>
  );
}

export function PersonalNavDropdown({ onNavigate }: { onNavigate?: () => void }) {
  const categories: CascadingCategory[] = personalNavGroups.map((g) => ({
    id: g.id,
    title: g.title,
    links: g.links,
  }));
  return (
    <CascadingNavDropdown
      label="Personal"
      menu="personal"
      categories={categories}
      hubHref="/personal/"
      hubLabel="View personal insurance hub →"
      showQuoteCta
      onNavigate={onNavigate}
    />
  );
}

export function BusinessNavDropdown({ onNavigate }: { onNavigate?: () => void }) {
  const categories: CascadingCategory[] = businessNavCategories.map((c) => ({
    id: c.id,
    title: c.title,
    links: c.links,
    role: c.role,
  }));
  return (
    <CascadingNavDropdown
      label="Business"
      menu="business"
      categories={categories}
      hubHref="/commercial-insurance/"
      hubLabel="View commercial insurance hub →"
      showQuoteCta
      wide
      leftRailLabel="Industries"
      onNavigate={onNavigate}
    />
  );
}

export function SimpleNavDropdown({
  label,
  hubHref,
  hubLabel,
  links,
  showQuoteCta = true,
  onNavigate,
}: {
  label: string;
  hubHref: string;
  hubLabel?: string;
  links: SimpleLink[];
  showQuoteCta?: boolean;
  onNavigate?: () => void;
}) {
  const buttonId = useId();
  const panelId = useId();
  const menuId = label.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "menu";
  const {
    open,
    setOpen,
    clearCloseTimer,
    scheduleClose,
    close,
    triggerRef,
    onTriggerFocus,
  } = useDropdownOpen(menuId);

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        clearCloseTimer();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={onTriggerFocus}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) close();
      }}
    >
      <button
        ref={triggerRef}
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
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="absolute left-1/2 top-full z-50 mt-2 w-[min(92vw,420px)] -translate-x-1/2 rounded-xl border border-border bg-white p-4 shadow-[0_16px_40px_rgba(32,39,40,0.12)]"
        >
          <ul className="flex flex-col gap-2">
            {links.map((link) => (
              <li key={link.href + link.label}>
                <NavDropdownLink
                  link={link}
                  menu={menuId}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
          {(showQuoteCta || hubHref) && (
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
              {showQuoteCta ? (
                <QuoteCtaLink menu={menuId} onNavigate={onNavigate} />
              ) : (
                <span className="min-h-11" aria-hidden />
              )}
              <Link
                href={hubHref}
                data-track="nav_link_click"
                data-track-menu={menuId}
                data-track-link-slug={slugFromHref(hubHref)}
                className="inline-flex min-h-11 items-center px-1 text-[13px] font-medium text-gold-dark hover:text-charcoal"
                onClick={onNavigate}
              >
                {hubLabel ?? `View all ${label.toLowerCase()} →`}
              </Link>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function MobileCascadingNavSection({
  title,
  categories,
  onNavigate,
  showQuoteCta = false,
  quoteHref = QUOTE_HREF,
  hubHref,
  hubLabel,
  leftRailLabel,
}: {
  title: string;
  categories: CascadingCategory[];
  onNavigate: () => void;
  showQuoteCta?: boolean;
  /** Contextual Get a Quote href for the current page (defaults to generic). */
  quoteHref?: string;
  hubHref?: string;
  hubLabel?: string;
  leftRailLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"categories" | "products">("categories");
  const [activeId, setActiveId] = useState<string | null>(null);
  const panelId = useId();
  const buttonId = useId();
  const menuId = title.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "menu";
  const active = categories.find((c) => c.id === activeId);

  useEffect(() => {
    if (open) track("nav_open", { menu: `mobile_${menuId}` });
  }, [open, menuId]);

  const industries = categories.filter((c) => c.role !== "specialty_group");
  const specialty = categories.filter((c) => c.role === "specialty_group");
  const ordered = specialty.length
    ? [...industries, ...specialty]
    : categories;

  const openCategory = (id: string) => {
    track("nav_category_select", {
      menu: `mobile_${menuId}`,
      category_id: id,
      surface: "nav_mobile",
    });
    setActiveId(id);
    setView("products");
  };

  const toggleOpen = () => {
    if (open) {
      setOpen(false);
      setView("categories");
      setActiveId(null);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="border-b border-border">
      <button
        id={buttonId}
        type="button"
        className="flex min-h-14 w-full items-center justify-between py-4 text-lg font-medium text-charcoal"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggleOpen}
      >
        {title}
        <ChevronDown
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="pb-4"
        >
          {view === "categories" ? (
            <div className="pl-1">
              {leftRailLabel || (industries.length && specialty.length) ? (
                <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
                  {leftRailLabel ?? "Industries"}
                </p>
              ) : null}
              <ul className="space-y-1">
                {ordered.map((category) => {
                  const isSpecialty = category.role === "specialty_group";
                  const isFirstSpecialty =
                    isSpecialty &&
                    ordered.findIndex((c) => c.role === "specialty_group") ===
                      ordered.indexOf(category);
                  return (
                    <li key={category.id}>
                      {isFirstSpecialty ? (
                        <div
                          className="mt-3 border-t border-border pt-3"
                          role="presentation"
                          aria-hidden
                        />
                      ) : null}
                      <button
                        type="button"
                        className={`flex min-h-11 w-full items-center justify-between rounded-md px-2 py-2.5 text-left text-[15px] hover:text-charcoal ${
                          isSpecialty
                            ? "font-medium text-charcoal"
                            : "text-secondary"
                        }`}
                        onClick={() => openCategory(category.id)}
                      >
                        <span>
                          {isSpecialty ? (
                            <>
                              <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
                                Also available
                              </span>
                              {category.title}
                            </>
                          ) : (
                            category.title
                          )}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                      </button>
                    </li>
                  );
                })}
              </ul>
              {(showQuoteCta || hubHref) && (
                <div className="mt-4 flex flex-col gap-2 border-t border-border px-2 pt-3">
                  {showQuoteCta ? (
                    <QuoteCtaLink
                      menu={`mobile_${menuId}`}
                      onNavigate={onNavigate}
                      href={quoteHref}
                    />
                  ) : null}
                  {hubHref ? (
                    <Link
                      href={hubHref}
                      data-track="nav_link_click"
                      data-track-menu={`mobile_${menuId}`}
                      data-track-link-slug={slugFromHref(hubHref)}
                      className="inline-flex min-h-11 items-center text-[15px] font-medium text-gold-dark"
                      onClick={onNavigate}
                    >
                      {hubLabel ?? "View all →"}
                    </Link>
                  ) : null}
                </div>
              )}
            </div>
          ) : (
            <div className="pl-1">
              <button
                type="button"
                className="mb-2 flex min-h-11 items-center gap-1.5 px-2 text-[15px] font-medium text-gold-dark"
                onClick={() => {
                  setView("categories");
                  setActiveId(null);
                }}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                Back
              </button>
              <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-dark">
                {active?.title}
              </p>
              <ul className="space-y-1">
                {active?.links.map((link) => {
                  const linkSlug = slugFromHref(link.href);
                  return (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        data-track="nav_link_click"
                        data-track-menu={`mobile_${menuId}`}
                        data-track-link-slug={linkSlug}
                        data-track-category-id={active.id}
                        className="block min-h-11 px-2 py-2.5 text-[15px] text-secondary hover:text-charcoal"
                        onClick={onNavigate}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function MobileNavSection({
  title,
  links,
  onNavigate,
  defaultOpen = false,
  showQuoteCta = false,
  quoteHref = QUOTE_HREF,
  hubHref,
  hubLabel,
}: {
  title: string;
  links: SimpleLink[];
  onNavigate: () => void;
  defaultOpen?: boolean;
  showQuoteCta?: boolean;
  quoteHref?: string;
  hubHref?: string;
  hubLabel?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const buttonId = useId();
  const menuId = title.toLowerCase().replace(/[^a-z0-9]+/g, "_") || "menu";

  useEffect(() => {
    if (open) track("nav_open", { menu: `mobile_${menuId}` });
  }, [open, menuId]);

  return (
    <div className="border-b border-border">
      <button
        id={buttonId}
        type="button"
        className="flex min-h-14 w-full items-center justify-between py-4 text-lg font-medium text-charcoal"
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
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="pb-3 pl-2"
        >
          <ul className="space-y-1">
            {links.map((link) => {
              const linkSlug = slugFromHref(link.href);
              return (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    data-track="nav_link_click"
                    data-track-menu={`mobile_${menuId}`}
                    data-track-link-slug={linkSlug}
                    className="block min-h-11 py-2.5 text-[15px] text-secondary hover:text-charcoal"
                    onClick={onNavigate}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {(showQuoteCta || hubHref) && (
            <div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
              {showQuoteCta ? (
                <QuoteCtaLink
                  menu={`mobile_${menuId}`}
                  href={quoteHref}
                  onNavigate={onNavigate}
                />
              ) : null}
              {hubHref ? (
                <Link
                  href={hubHref}
                  data-track="nav_link_click"
                  data-track-menu={`mobile_${menuId}`}
                  data-track-link-slug={slugFromHref(hubHref)}
                  className="inline-flex min-h-11 items-center px-1 text-[14px] font-medium text-gold-dark"
                  onClick={onNavigate}
                >
                  {hubLabel ?? `View all ${title.toLowerCase()} →`}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

/** @deprecated Prefer MobileCascadingNavSection — kept for transitional imports. */
export function MobileNavGroupSection({
  title,
  groups,
  onNavigate,
}: {
  title: string;
  groups: NavGroup[];
  onNavigate: () => void;
}) {
  return (
    <MobileCascadingNavSection
      title={title}
      categories={groups.map((g) => ({
        id: g.id,
        title: g.title,
        links: g.links,
      }))}
      onNavigate={onNavigate}
    />
  );
}

/** @deprecated Prefer MobileCascadingNavSection */
export function MobileNavClusterSection({
  title,
  clusters,
  onNavigate,
}: {
  title: string;
  clusters: BusinessNavCategory[];
  onNavigate: () => void;
}) {
  return (
    <MobileCascadingNavSection
      title={title}
      categories={clusters.map((c) => ({
        id: c.id,
        title: c.title,
        links: c.links,
        role: c.role,
      }))}
      onNavigate={onNavigate}
      showQuoteCta
      hubHref="/commercial-insurance/"
      hubLabel="View commercial insurance hub →"
    />
  );
}
