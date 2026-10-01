import { getClarityId } from "./config";

const CLARITY_ATTR = "data-pib-clarity";

let clarityInjected = false;

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

/**
 * Load Microsoft Clarity only after Experience consent.
 * Applies conservative masking for forms / sensitive UI.
 */
export function loadClarity(): void {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  if (clarityInjected) return;
  if (document.querySelector(`script[${CLARITY_ATTR}]`)) {
    clarityInjected = true;
    return;
  }

  const projectId = getClarityId();
  if (!projectId) return;

  (function (c: Window, l: Document, a: string, r: string, i: string) {
    const w = c as Window & { [key: string]: unknown };
    w[a] =
      w[a] ||
      function (...args: unknown[]) {
        ((w[a] as { q?: unknown[] }).q = (w[a] as { q?: unknown[] }).q || []).push(
          args,
        );
      };
    const t = l.createElement(r) as HTMLScriptElement;
    t.async = true;
    t.src = `https://www.clarity.ms/tag/${i}`;
    t.setAttribute(CLARITY_ATTR, i);
    const y = l.getElementsByTagName(r)[0];
    y?.parentNode?.insertBefore(t, y);
  })(window, document, "clarity", "script", projectId);

  clarityInjected = true;

  // Conservative project-level masking via Clarity API when available.
  try {
    window.clarity?.("set", "pib_mask_policy", "strict");
    // Mask all inputs and textareas by default once Clarity is ready.
    const applyMask = () => {
      document
        .querySelectorAll(
          "input, textarea, select, [data-clarity-mask], .pib-clarity-mask, form",
        )
        .forEach((el) => {
          el.setAttribute("data-clarity-mask", "true");
        });
      document
        .querySelectorAll(
          "[data-clarity-unmask='true'], .pib-clarity-unmask",
        )
        .forEach((el) => {
          el.setAttribute("data-clarity-unmask", "true");
        });
    };
    applyMask();
    // Re-apply on DOM mutations for SPA navigations (light observer).
    const observer = new MutationObserver(() => applyMask());
    observer.observe(document.body, { childList: true, subtree: true });
  } catch {
    /* ignore */
  }
}

/**
 * Ask Clarity to stop collecting when Experience consent is revoked.
 * Full script unload is not reliably supported; use consent API.
 */
export function revokeClarityConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.clarity?.("consent", false);
    window.clarity?.("stop");
  } catch {
    /* ignore */
  }
}

export function grantClarityConsent(): void {
  if (typeof window === "undefined") return;
  try {
    window.clarity?.("consent");
  } catch {
    /* ignore */
  }
}
