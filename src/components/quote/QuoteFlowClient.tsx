"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import QuoteCategoryPicker from "@/components/quote/QuoteCategoryPicker";
import QuoteFlowEngine from "@/components/quote/QuoteFlowEngine";
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

export default function QuoteFlowClient() {
  const searchParams = useSearchParams();
  const parsed = useMemo(() => parseParams(searchParams), [searchParams]);
  const [picked, setPicked] = useState<QuoteCategory | null>(null);

  const category = picked ?? parsed.category;

  const onPick = useCallback((cat: QuoteCategory) => {
    setPicked(cat);
    const type = TYPE_FROM_CATEGORY[cat];
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    window.history.replaceState({}, "", url.toString());
  }, []);

  if (!category) {
    return (
      <div className="rounded-[18px] border border-border bg-white/95 p-5 shadow-[0_12px_40px_rgba(32,39,40,0.08)] sm:p-8">
        <QuoteCategoryPicker onSelect={onPick} />
      </div>
    );
  }

  return (
    <QuoteFlowEngine
      key={category}
      category={category}
      urlParams={parsed.urlParams}
    />
  );
}
