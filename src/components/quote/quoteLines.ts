import type { QuoteCategory } from "@/lib/quote/types";

export const COMMERCIAL_LINES: { id: QuoteCategory; label: string }[] = [
  { id: "business", label: "Business" },
  { id: "commercialAuto", label: "Commercial vehicles" },
  { id: "farm", label: "Farm" },
];

export function lineGroup(
  category: QuoteCategory,
): "auto" | "home" | "commercial" {
  if (category === "auto" || category === "home") return category;
  return "commercial";
}
