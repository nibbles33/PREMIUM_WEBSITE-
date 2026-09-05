import { Resend } from "resend";
import type { ValidatedJobApplication } from "./validate";
import { getJobBySlug } from "@/data/jobs";

const DEFAULT_NOTIFY_TO = "info@premiumib.com";
const NOTIFY_FROM = "PremiumIB Careers <onboarding@resend.dev>";

export async function sendJobApplicationNotification(
  application: ValidatedJobApplication,
  applicationId: string,
  resumeUrl: string | null,
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[job-apply] RESEND_API_KEY is not set — skipping email notification.",
      { applicationId },
    );
    return false;
  }

  const notifyTo = process.env.CAREERS_NOTIFY_TO ?? DEFAULT_NOTIFY_TO;
  const job = getJobBySlug(application.position);
  const subject =
    application.position === "general"
      ? "NEW GENERAL CAREER APPLICATION"
      : `NEW CAREER APPLICATION — ${job?.title ?? application.position}`;

  const text = [
    subject,
    "",
    `Application ID: ${applicationId}`,
    `Position: ${application.position}`,
    `Name: ${application.name}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    "",
    application.message ? `Message:\n${application.message}` : "Message: (none)",
    "",
    resumeUrl ? `Resume: ${resumeUrl}` : "Resume: not attached",
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: [notifyTo],
      replyTo: application.email,
      subject,
      text,
    });
    if (error) {
      console.error("[job-apply] Resend API error", { applicationId, error });
      return false;
    }
    return true;
  } catch (err) {
    console.error("[job-apply] Resend send failed", { applicationId, err });
    return false;
  }
}
