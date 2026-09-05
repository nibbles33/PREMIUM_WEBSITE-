"use client";

import { useId, useRef, useState } from "react";

type JobApplicationFormProps = {
  position: string;
  jobTitle?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function JobApplicationForm({
  position,
  jobTitle,
}: JobApplicationFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [resume, setResume] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);
  const honeypotId = useId();
  const submittingRef = useRef(false);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current) return;
    submittingRef.current = true;
    setStatus("submitting");
    setError(null);

    const fd = new FormData(e.currentTarget);
    if (resume) fd.set("resume", resume);

    try {
      const res = await fetch("/api/job-apply", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setError(
          data.error ??
            "We couldn't submit your application. Please try again or email info@premiumib.com.",
        );
        return;
      }
      setStatus("success");
      setForm(INITIAL);
      setResume(null);
    } catch {
      setStatus("error");
      setError(
        "Network error. Your information was not saved. Please try again or call 226-782-6000.",
      );
    } finally {
      submittingRef.current = false;
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-gold/40 bg-gold/10 p-6 text-center">
        <p className="text-lg font-medium text-charcoal">
          Application received
        </p>
        <p className="mt-2 text-[15px] text-secondary">
          Thank you for your interest
          {jobTitle ? ` in the ${jobTitle} role` : ""}. Our team will review
          your application and contact you if there is a fit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <input
        id={honeypotId}
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <input type="hidden" name="position" value={position} />

      <div>
        <label htmlFor="job-name" className="block text-sm font-medium text-charcoal">
          Full name <span className="text-gold-dark">*</span>
        </label>
        <input
          id="job-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-[15px] text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="job-email" className="block text-sm font-medium text-charcoal">
            Email <span className="text-gold-dark">*</span>
          </label>
          <input
            id="job-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-[15px] text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
        </div>
        <div>
          <label htmlFor="job-phone" className="block text-sm font-medium text-charcoal">
            Phone <span className="text-gold-dark">*</span>
          </label>
          <input
            id="job-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-[15px] text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
          />
        </div>
      </div>

      <div>
        <label htmlFor="job-message" className="block text-sm font-medium text-charcoal">
          Cover letter / message
        </label>
        <textarea
          id="job-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2.5 text-[15px] text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        />
      </div>

      <div>
        <label htmlFor="job-resume" className="block text-sm font-medium text-charcoal">
          Resume <span className="text-gold-dark">*</span>
        </label>
        <input
          id="job-resume"
          name="resume"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={(e) => setResume(e.target.files?.[0] ?? null)}
          className="mt-1.5 block w-full text-sm text-secondary file:mr-4 file:rounded-md file:border-0 file:bg-gold/20 file:px-4 file:py-2 file:text-sm file:font-medium file:text-charcoal"
        />
        <p className="mt-1.5 text-xs text-secondary">
          PDF or Word document. Maximum 5 MB.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary inline-flex h-12 w-full items-center justify-center rounded-md bg-gold text-sm font-medium text-charcoal disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status === "submitting" ? "Submitting…" : "Submit application"}
      </button>

      <p className="text-xs leading-relaxed text-secondary">
        By submitting, you consent to Premium Insurance Brokers storing your
        application for recruitment purposes. We do not share applicant
        information with analytics platforms.
      </p>
    </form>
  );
}
