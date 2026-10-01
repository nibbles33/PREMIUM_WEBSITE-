"use client";

import { Suspense, type ReactNode } from "react";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import CookieConsentUi from "@/components/consent/CookieConsentUi";
import AnalyticsRoot from "@/components/analytics/AnalyticsRoot";

export default function AnalyticsProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ConsentProvider>
      {children}
      <Suspense fallback={null}>
        <AnalyticsRoot />
      </Suspense>
      <CookieConsentUi />
    </ConsentProvider>
  );
}
