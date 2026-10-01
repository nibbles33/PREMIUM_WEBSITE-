"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { applyConsentMode, ensureGtagStub } from "@/lib/consent/consent-mode";
import {
  readConsentCookie,
  writeConsentCookie,
} from "@/lib/consent/storage";
import {
  createConsentRecord,
  type ConsentRecord,
} from "@/lib/consent/types";
import { setAnalyticsConsentGranted } from "@/lib/analytics/track";
import { loadGoogleTagManager } from "@/lib/analytics/gtm";
import {
  grantClarityConsent,
  loadClarity,
  revokeClarityConsent,
} from "@/lib/analytics/clarity";

type ConsentUiMode = "banner" | "preferences" | "hidden";

type ConsentContextValue = {
  record: ConsentRecord | null;
  uiMode: ConsentUiMode;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: {
    analytics: boolean;
    experience: boolean;
  }) => void;
  openPreferences: () => void;
  closeUi: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function applyVendors(record: ConsentRecord) {
  ensureGtagStub();
  applyConsentMode(record.analytics);
  setAnalyticsConsentGranted(record.analytics);
  // GTM may load with denied consent (Consent Mode); tags wait for grant.
  loadGoogleTagManager();
  if (record.experience) {
    loadClarity();
    grantClarityConsent();
  } else {
    revokeClarityConsent();
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [uiMode, setUiMode] = useState<ConsentUiMode>("hidden");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureGtagStub();
    const decision = readConsentCookie();
    if (decision.kind === "set") {
      setRecord(decision.record);
      applyVendors(decision.record);
      setUiMode("hidden");
    } else {
      setAnalyticsConsentGranted(false);
      applyConsentMode(false);
      // Load GTM with denied Consent Mode so tags remain gated.
      loadGoogleTagManager();
      setUiMode("banner");
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const onOpen = () => setUiMode("preferences");
    window.addEventListener("pib:open-cookie-preferences", onOpen);
    return () =>
      window.removeEventListener("pib:open-cookie-preferences", onOpen);
  }, []);

  const persist = useCallback((next: ConsentRecord) => {
    writeConsentCookie(next);
    setRecord(next);
    applyVendors(next);
    setUiMode("hidden");
  }, []);

  const acceptAll = useCallback(() => {
    persist(createConsentRecord({ analytics: true, experience: true }));
  }, [persist]);

  const rejectNonEssential = useCallback(() => {
    persist(createConsentRecord({ analytics: false, experience: false }));
  }, [persist]);

  const savePreferences = useCallback(
    (prefs: { analytics: boolean; experience: boolean }) => {
      persist(createConsentRecord(prefs));
    },
    [persist],
  );

  const openPreferences = useCallback(() => setUiMode("preferences"), []);
  const closeUi = useCallback(() => {
    // Closing without a choice keeps banner if unset; otherwise hide.
    setUiMode((mode) => {
      if (mode === "preferences" && !record) return "banner";
      return "hidden";
    });
  }, [record]);

  const value = useMemo(
    () => ({
      record,
      uiMode: ready ? uiMode : "hidden",
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closeUi,
    }),
    [
      record,
      uiMode,
      ready,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closeUi,
    ],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error("useConsent must be used within ConsentProvider");
  }
  return ctx;
}
