import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import QuoteFlowClient from "@/components/quote/QuoteFlowClient";

export const metadata: Metadata = {
  title: "Get a Quote | PremiumIB",
  description:
    "Answer a few quick questions and a licensed Premium Insurance Brokers broker will follow up with options for you.",
};

export default function GetAQuotePage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col border-b border-border bg-offwhite">
        <div className="mx-auto w-full max-w-xl flex-1 px-4 py-10 sm:max-w-2xl sm:px-6 sm:py-14 lg:px-8">
          <Suspense
            fallback={
              <div className="rounded-[18px] border border-border bg-white/95 p-8 text-center text-secondary">
                Loading…
              </div>
            }
          >
            <QuoteFlowClient />
          </Suspense>
        </div>
      </main>
    </>
  );
}
