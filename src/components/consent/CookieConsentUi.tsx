"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useConsent } from "./ConsentProvider";

function PreferencesPanel({
  onClose,
}: {
  onClose: () => void;
}) {
  const { record, savePreferences, acceptAll } = useConsent();
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [analytics, setAnalytics] = useState(record?.analytics ?? false);
  const [experience, setExperience] = useState(record?.experience ?? false);

  useEffect(() => {
    setAnalytics(record?.analytics ?? false);
    setExperience(record?.experience ?? false);
  }, [record]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const node = dialogRef.current;
    node?.querySelector<HTMLElement>("button, input")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="pib-consent-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="pib-consent-dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-gold-dark">
              Privacy choices
            </p>
            <h2
              id={titleId}
              className="mt-2 text-[1.35rem] font-medium tracking-[-0.02em] text-charcoal"
            >
              Cookie preferences
            </h2>
          </div>
          <button
            type="button"
            className="pib-consent-icon-btn"
            aria-label="Close cookie preferences"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <p className="mt-3 text-[14px] leading-relaxed text-secondary">
          Necessary storage keeps the site working. Analytics and experience
          tools are optional and only run when you allow them.
        </p>

        <ul className="mt-6 space-y-3">
          <li className="pib-consent-category">
            <div>
              <p className="text-[15px] font-medium text-charcoal">Necessary</p>
              <p className="mt-1 text-[13px] leading-relaxed text-secondary">
                Required for core site functions, including preserving an
                in-progress Quote draft in your browser.
              </p>
            </div>
            <span className="pib-consent-always">Always on</span>
          </li>

          <li className="pib-consent-category">
            <div>
              <p className="text-[15px] font-medium text-charcoal">Analytics</p>
              <p className="mt-1 text-[13px] leading-relaxed text-secondary">
                Google Analytics (via Google Tag Manager) helps us understand
                aggregate site usage. We do not intentionally send form PII.
              </p>
            </div>
            <label className="pib-consent-switch">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span className="sr-only">Enable analytics cookies</span>
            </label>
          </li>

          <li className="pib-consent-category">
            <div>
              <p className="text-[15px] font-medium text-charcoal">Experience</p>
              <p className="mt-1 text-[13px] leading-relaxed text-secondary">
                Microsoft Clarity helps us improve layout and usability. Form
                fields are masked; resumes and application details are not
                intended for capture.
              </p>
            </div>
            <label className="pib-consent-switch">
              <input
                type="checkbox"
                checked={experience}
                onChange={(e) => setExperience(e.target.checked)}
              />
              <span className="sr-only">Enable experience analytics</span>
            </label>
          </li>
        </ul>

        <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="pib-consent-btn-secondary"
            onClick={() => savePreferences({ analytics, experience })}
          >
            Save preferences
          </button>
          <button
            type="button"
            className="pib-consent-btn-primary"
            onClick={acceptAll}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

function Banner() {
  const { acceptAll, rejectNonEssential, openPreferences } = useConsent();

  return (
    <div
      className="pib-consent-banner"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="pib-consent-banner-inner">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
            Cookies &amp; privacy
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-white/80 sm:text-[15px]">
            We use necessary storage to run the site. Optional analytics and
            experience tools help us improve Premium — only if you allow them.{" "}
            <a
              href="/privacy-policy/"
              className="text-gold underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[280px] sm:flex-row sm:flex-wrap sm:justify-end">
          <button
            type="button"
            className="pib-consent-btn-ghost"
            onClick={openPreferences}
          >
            Preferences
          </button>
          <button
            type="button"
            className="pib-consent-btn-secondary-dark"
            onClick={rejectNonEssential}
          >
            Reject non-essential
          </button>
          <button
            type="button"
            className="pib-consent-btn-primary"
            onClick={acceptAll}
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CookieConsentUi() {
  const { uiMode, closeUi } = useConsent();

  if (uiMode === "hidden") return null;
  if (uiMode === "preferences") {
    return <PreferencesPanel onClose={closeUi} />;
  }
  return <Banner />;
}
