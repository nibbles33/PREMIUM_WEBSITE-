import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import QuoteCarrierStrip from "@/components/quote/QuoteCarrierStrip";
import QuoteCategoryPickerFallback from "@/components/quote/QuoteCategoryPickerFallback";
import QuoteDeskHero from "@/components/quote/QuoteDeskHero";
import QuoteFlowClient from "@/components/quote/QuoteFlowClient";
import QuoteTrustRail from "@/components/quote/QuoteTrustRail";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Get a Quote | Premium Insurance Brokers",
  description:
    "Answer a few quick questions and a licensed Premium Insurance Brokers broker will follow up with options for you.",
  path: "/get-a-quote/",
});

/**
 * Force request-time rendering so useSearchParams Suspense shows a single
 * SSR fallback (one H1, in the hero) instead of statically embedding
 * fallback + client UI.
 */
export const dynamic = "force-dynamic";

export default function GetAQuotePage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col bg-[#F6F1E6]">
        <QuoteDeskHero />
        <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-6 xl:max-w-7xl">
          <Suspense fallback={<QuoteCategoryPickerFallback />}>
            <QuoteFlowClient trust={<QuoteTrustRail />} />
          </Suspense>
        </div>
        <QuoteCarrierStrip />
      </main>
    </>
  );
}
