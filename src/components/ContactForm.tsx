"use client";

import { useId, useRef, useState, type FormEvent } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const honeypotId = useId();
  const submittingRef = useRef(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus("submitting");
    setError(null);
    setFieldErrors({});

    const fd = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/contact-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          message: fd.get("message"),
          website: fd.get("website"),
        }),
      });

      let data: {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      } = {};
      try {
        data = await res.json();
      } catch {
        setStatus("error");
        setError("Unexpected server response. Please try again.");
        return;
      }

      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(
          data.error ??
            "We couldn't send your message. Please try again or call 226-782-6000.",
        );
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        return;
      }

      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
      setError(
        "Network error. Your message was not sent. Please try again or call 226-782-6000.",
      );
    } finally {
      submittingRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-[14px] border border-gold/40 bg-gold/10 p-6 sm:p-8"
        role="status"
      >
        <p className="text-[15px] font-medium text-charcoal sm:text-base">
          Message sent — thank you.
        </p>
        <p className="mt-2 text-[14px] leading-relaxed text-secondary sm:text-[15px]">
          A licensed broker from Premium Insurance Brokers will follow up using
          the contact details you provided. For urgent matters, call{" "}
          <a
            href="tel:+12267826000"
            className="font-medium text-gold-dark underline-offset-4 hover:underline"
          >
            226-782-6000
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-charcoal underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          Send another message
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
      <input
        id={honeypotId}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-[13px] font-medium text-charcoal">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            className="mt-1.5 w-full rounded-md border border-border bg-offwhite px-3 py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-gold"
          />
          {fieldErrors.name ? (
            <p id="contact-name-error" className="mt-1.5 text-[13px] text-red-700" role="alert">
              {fieldErrors.name}
            </p>
          ) : null}
        </label>
        <label className="block">
          <span className="text-[13px] font-medium text-charcoal">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            className="mt-1.5 w-full rounded-md border border-border bg-offwhite px-3 py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-gold"
          />
          {fieldErrors.email ? (
            <p id="contact-email-error" className="mt-1.5 text-[13px] text-red-700" role="alert">
              {fieldErrors.email}
            </p>
          ) : null}
        </label>
        <label className="block">
          <span className="text-[13px] font-medium text-charcoal">Phone</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
            className="mt-1.5 w-full rounded-md border border-border bg-offwhite px-3 py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-gold"
          />
          {fieldErrors.phone ? (
            <p id="contact-phone-error" className="mt-1.5 text-[13px] text-red-700" role="alert">
              {fieldErrors.phone}
            </p>
          ) : null}
        </label>
        <label className="block sm:col-span-2">
          <span className="text-[13px] font-medium text-charcoal">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
            className="mt-1.5 w-full resize-y rounded-md border border-border bg-offwhite px-3 py-2.5 text-[15px] text-charcoal outline-none transition-colors focus:border-gold"
          />
          {fieldErrors.message ? (
            <p id="contact-message-error" className="mt-1.5 text-[13px] text-red-700" role="alert">
              {fieldErrors.message}
            </p>
          ) : null}
        </label>
      </div>

      {error ? (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary btn-primary-gradient mt-6 inline-flex h-12 min-w-[44px] items-center justify-center rounded-md px-6 text-sm font-medium text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
