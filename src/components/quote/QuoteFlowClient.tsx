"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import QuoteCategoryPicker from "@/components/quote/QuoteCategoryPicker";
import QuoteFlowEngine from "@/components/quote/QuoteFlowEngine";
import QuoteLineSwitcher from "@/components/quote/QuoteLineSwitcher";
import {
  CATEGORY_FROM_TYPE,
  TYPE_FROM_CATEGORY,
  type QuoteCategory,
  type QuoteUrlParams,
} from "@/lib/quote/types";

function parseParams(searchParams: URLSearchParams): {
  category: QuoteCategory | null;
  urlParams: QuoteUrlParams;
} {
  const type = searchParams.get("type");
  const urlParams: QuoteUrlParams = {
    type,
    businessType: searchParams.get("businessType"),
    vehicleType: searchParams.get("vehicleType"),
    homeType: searchParams.get("homeType"),
    size: searchParams.get("size"),
    vehicleBodyType: searchParams.get("vehicleBodyType"),
  };
  const category = type ? (CATEGORY_FROM_TYPE[type] ?? null) : null;
  return { category, urlParams };
}

type QuoteFlowClientProps = {
  trust: ReactNode;
};

export default function QuoteFlowClient({ trust }: QuoteFlowClientProps) {
  const searchParams = useSearchParams();
  const parsed = useMemo(() => parseParams(searchParams), [searchParams]);
  const [picked, setPicked] = useState<QuoteCategory | null>(null);

  const category = picked ?? parsed.category;

  const onPick = useCallback((cat: QuoteCategory) => {
    setPicked(cat);
    const type = TYPE_FROM_CATEGORY[cat];
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    if (cat !== "home") url.searchParams.delete("homeType");
    if (cat !== "business") {
      url.searchParams.delete("businessType");
      url.searchParams.delete("size");
    }
    if (cat !== "auto") {
      url.searchParams.delete("vehicleType");
      url.searchParams.delete("vehicleBodyType");
    }
    window.history.replaceState({}, "", url.toString());
  }, []);

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] lg:gap-8">
      <div className="order-1 min-w-0 lg:order-2">
        {category ? (
          <>
            <QuoteLineSwitcher category={category} onSelect={onPick} />
            <QuoteFlowEngine
              key={category}
              category={category}
              urlParams={parsed.urlParams}
            />
          </>
        ) : (
          <div
            className="rounded-[18px] border border-border bg-white p-4 pib-clarity-mask sm:p-5"
            data-clarity-mask="true"
          >
            <QuoteCategoryPicker onSelect={onPick} />
          </div>
        )}
      </div>
      <div className="order-2 lg:order-1">{trust}</div>
    </div>
  );
}
