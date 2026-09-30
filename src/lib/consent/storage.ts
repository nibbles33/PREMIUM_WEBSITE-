import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_SECONDS,
  CONSENT_VERSION,
  type ConsentDecision,
  type ConsentRecord,
} from "./types";

function parseRecord(raw: string): ConsentRecord | null {
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      parsed.version !== CONSENT_VERSION ||
      typeof parsed.timestamp !== "string" ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.experience !== "boolean"
    ) {
      return null;
    }
    return {
      version: CONSENT_VERSION,
      necessary: true as const,
      analytics: parsed.analytics,
      experience: parsed.experience,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
}

export function readConsentCookie(): ConsentDecision {
  if (typeof document === "undefined") return { kind: "unset" };
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!match) return { kind: "unset" };
  const value = decodeURIComponent(match.slice(CONSENT_COOKIE_NAME.length + 1));
  const record = parseRecord(value);
  if (!record) return { kind: "unset" };
  return { kind: "set", record };
}

export function writeConsentCookie(record: ConsentRecord): void {
  if (typeof document === "undefined") return;
  const payload = encodeURIComponent(JSON.stringify(record));
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";
  document.cookie = `${CONSENT_COOKIE_NAME}=${payload}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
}

export function openCookiePreferencesEvent(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("pib:open-cookie-preferences"));
}
