import { Resend } from "resend";
import {
  getResendFrom,
  getResendFromEmail,
  isUsingResendSandboxSender,
} from "@/lib/email/resendConfig";
import type { NormalizedLead } from "./validate";
import { CATEGORY_LABELS } from "./types";

const DEFAULT_NOTIFY_TO = "info@premiumib.com";

function getQuoteNotifyTo(): string {
  return process.env.QUOTE_NOTIFY_TO?.trim() || DEFAULT_NOTIFY_TO;
}

function formatAnswers(answers: Record<string, string>): string {
  const skip = new Set([
    "name",
    "phone",
    "email",
    "preferredContactMethod",
  ]);
  const lines: string[] = [];
  for (const [key, value] of Object.entries(answers)) {
    if (skip.has(key) || !value) continue;
    lines.push(`• ${key}: ${value}`);
  }
  return lines.length ? lines.join("\n") : "• (no additional answers)";
}

/**
 * Sends broker notification via Resend. Returns true on success.
 * Missing API key → logs warning and returns false (caller must not fail the request).
 */
export async function sendLeadNotification(
  lead: NormalizedLead,
  leadId: string,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = getResendFromEmail();
  const notifyTo = getQuoteNotifyTo();

  if (!apiKey) {
    console.warn(
      "[quote-submit] RESEND_API_KEY is not set — skipping email notification. Lead was saved.",
      { leadId, category: lead.category, notifyTo, fromEmail },
    );
    return false;
  }

  if (isUsingResendSandboxSender()) {
    console.warn(
      "[quote-submit] Using Resend sandbox FROM (onboarding@resend.dev). Delivery to production inboxes is unreliable until RESEND_FROM_EMAIL is a verified domain address.",
      { leadId, fromEmail, notifyTo },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const categoryLabel = CATEGORY_LABELS[lead.category] ?? lead.category;
    const subject = `New ${categoryLabel} quote request — ${lead.name}`;
    const text = [
      `New quote lead (${categoryLabel})`,
      ``,
      `Lead ID: ${leadId}`,
      `Name: ${lead.name}`,
      `Phone: ${lead.phone}`,
      `Email: ${lead.email}`,
      `Preferred contact: ${lead.preferredContactMethod}`,
      ``,
      `Answers:`,
      formatAnswers(lead.answers),
      ``,
      `Submitted: ${new Date().toISOString()}`,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: getResendFrom("PremiumIB Quotes"),
      to: [notifyTo],
      replyTo: lead.email,
      subject,
      text,
    });

    if (error) {
      console.error("[quote-submit] Resend API error — lead remains saved", {
        leadId,
        notifyTo,
        fromEmail,
        error,
      });
      return false;
    }
    return true;
  } catch (err) {
    console.error("[quote-submit] Resend send failed — lead remains saved", {
      leadId,
      notifyTo,
      fromEmail,
      err,
    });
    return false;
  }
}
