import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import QuoteCategoryPickerFallback from "@/components/quote/QuoteCategoryPickerFallback";
import QuoteFlowClient from "@/components/quote/QuoteFlowClient";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Get a Quote | Premium Insurance Brokers",
  description:
    "Answer a few quick questions and a licensed Premium Insurance Brokers broker will follow up with options for you.",
  path: "/get-a-quote/",
});

/**
 * Force request-time rendering so useSearchParams Suspense shows a single
 * SSR fallback (one H1) instead of statically embedding fallback + client UI.
 */
export const dynamic = "force-dynamic";

export default function GetAQuotePage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col border-b border-border bg-offwhite">
        <div className="mx-auto w-full max-w-xl flex-1 px-4 py-10 sm:max-w-2xl sm:px-6 sm:py-14 lg:px-8">
          <Suspense fallback={<QuoteCategoryPickerFallback />}>
            <QuoteFlowClient />
          </Suspense>
        </div>
      </main>
    </>
  );
}
