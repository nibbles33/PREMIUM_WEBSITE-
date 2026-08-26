"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-[14px] border border-border bg-white p-6 sm:p-8"
        role="status"
      >
        <p className="text-[15px] font-medium text-charcoal sm:text-base">
          Thanks — your message is ready to send.
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-secondary sm:text-[15px]">
          This demo form isn&apos;t connected to a mailbox yet. Please email{" "}
          <a
            href="mailto:info@premiumib.com"
            className="font-medium text-gold-dark underline-offset-4 hover:underline"
          >
            info@premiumib.com
          </a>{" "}
          or call{" "}
          <a
            href="tel:+12267826000"
            className="font-medium text-gold-dark underline-offset-4 hover:underline"
          >
            226-782-6000
          </a>{" "}
          and we&apos;ll help you directly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-medium text-charcoal underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Reset form
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[14px] border border-border bg-white p-6 shadow-[0_10px_28px_rgba(32,39,40,0.06)] sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-[13px] font-medium text-charcoal">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            className="mt-1.5 w-full rounded-md border border-border bg-offwhite px-3 py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="text-[13px] font-medium text-charcoal">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="mt-1.5 w-full rounded-md border border-border bg-offwhite px-3 py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="text-[13px] font-medium text-charcoal">Phone</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className="mt-1.5 w-full rounded-md border border-border bg-offwhite px-3 py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-gold"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[13px] font-medium text-charcoal">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            className="mt-1.5 w-full resize-y rounded-md border border-border bg-offwhite px-3 py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-gold"
          />
        </label>
      </div>
      <button
        type="submit"
        className="btn-primary btn-primary-gradient mt-6 inline-flex h-12 min-w-[44px] items-center justify-center rounded-md px-6 text-sm font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
      >
        Send message
      </button>
    </form>
  );
}
