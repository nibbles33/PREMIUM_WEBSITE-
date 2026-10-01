import { getGtmId } from "./config";

const GTM_SCRIPT_ATTR = "data-pib-gtm";

let gtmInjected = false;

/** Load GTM once. Requires Consent Mode defaults already applied. */
export function loadGoogleTagManager(): void {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  if (gtmInjected) return;
  if (document.querySelector(`script[${GTM_SCRIPT_ATTR}]`)) {
    gtmInjected = true;
    return;
  }

  const id = getGtmId();
  if (!id.startsWith("GTM-")) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  script.setAttribute(GTM_SCRIPT_ATTR, id);
  document.head.appendChild(script);
  gtmInjected = true;
}

export function getGtmNoscriptUrl(): string {
  return `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(getGtmId())}`;
}
