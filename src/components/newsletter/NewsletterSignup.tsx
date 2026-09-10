"use client";

import { useId, useRef, useState } from "react";

/**
 * Newsletter signup UI.
 *
 * Backend required for live subscriptions:
 * - NEWSLETTER_PROVIDER (e.g. mailchimp, resend-audience) — not yet implemented
 * - Provider-specific API keys and list/audience ID
 *
 * Until configured, submissions show a clear message rather than faking success.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "unconfigured">(
    "idle",
  );
  const honeypotId = useId();
  const submittingRef = useRef(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus("pending");

    // No backend wired yet — fail clearly per requirements
    window.setTimeout(() => {
      setStatus("unconfigured");
      submittingRef.current = false;
    }, 400);
  };

  return (
    <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          id={honeypotId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
          aria-hidden
        />
        <div>
          <label htmlFor="newsletter-email" className="block text-sm font-medium text-charcoal">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-md border border-border bg-offwhite px-3 py-2.5 text-[15px] text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
        </div>
        <button
          type="submit"
          disabled={status === "pending"}
          className="btn-primary inline-flex h-11 w-full items-center justify-center rounded-md bg-gold text-sm font-medium text-charcoal disabled:opacity-60 sm:w-auto sm:px-6"
        >
          {status === "pending" ? "Submitting…" : "Subscribe"}
        </button>
      </form>

      {status === "unconfigured" ? (
        <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
          Newsletter signup is not yet connected to a mailing provider on this
          environment. To subscribe now, email{" "}
          <a href="mailto:info@premiumib.com" className="font-medium underline">
            info@premiumib.com
          </a>{" "}
          and ask to be added to our client updates list.
        </p>
      ) : null}

      <p className="mt-4 text-xs leading-relaxed text-secondary">
        Required configuration: mailing provider API credentials and audience/list
        ID (e.g. Mailchimp, Resend Audiences, or similar). No subscriber counts
        or delivery frequency are guaranteed until a provider is configured.
      </p>
    </div>
  );
}
