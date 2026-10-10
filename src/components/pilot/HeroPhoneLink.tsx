import { BROKERAGE_PHONE_DISPLAY } from "@/lib/seo/structured-data";

const PHONE_HREF = "tel:+12267826000";

type HeroPhoneLinkProps = {
  /** Visual context for contrast styling */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Tap-to-call link for product heroes. AnalyticsRoot emits phone_click with
 * data-track-location=hero. A click is not a completed telephone call.
 */
export default function HeroPhoneLink({
  tone = "light",
  className = "",
}: HeroPhoneLinkProps) {
  const toneClass =
    tone === "dark"
      ? "text-white/85 hover:text-gold focus-visible:outline-gold"
      : "text-charcoal hover:text-gold-dark focus-visible:outline-gold";

  return (
    <a
      href={PHONE_HREF}
      data-track-location="hero"
      className={`inline-flex min-h-[44px] items-center text-[15px] font-medium underline-offset-4 transition-colors hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${toneClass} ${className}`.trim()}
      aria-label={`Call Premium Insurance Brokers at ${BROKERAGE_PHONE_DISPLAY}`}
    >
      Call {BROKERAGE_PHONE_DISPLAY}
    </a>
  );
}
