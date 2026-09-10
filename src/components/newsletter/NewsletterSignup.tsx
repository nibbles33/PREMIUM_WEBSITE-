"use client";

/**
 * Newsletter signup — backend not configured for launch.
 * Interactive submit is disabled; visitors are directed to email instead.
 */
export default function NewsletterSignup() {
  return (
    <div className="rounded-xl border border-border bg-white p-6 sm:p-8">
      <p className="text-sm font-medium text-charcoal">
        Newsletter signup coming soon
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-secondary">
        We are not accepting newsletter subscriptions on the website yet. To
        receive updates, email{" "}
        <a
          href="mailto:info@premiumib.com?subject=Newsletter%20signup%20request"
          className="font-medium text-gold-dark underline-offset-4 hover:underline"
        >
          info@premiumib.com
        </a>{" "}
        and ask to be added to our client updates list.
      </p>
      <p className="mt-4 text-xs leading-relaxed text-secondary">
        A mailing provider (e.g. Mailchimp or Resend Audiences) will be connected
        in a future update. No subscriber data is collected through this page
        until then.
      </p>
    </div>
  );
}
