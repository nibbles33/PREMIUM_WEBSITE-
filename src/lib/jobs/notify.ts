import { Resend } from "resend";
import { getResendFrom } from "@/lib/email/resendConfig";
import type { ValidatedJobApplication } from "./validate";
import { getJobBySlug } from "@/data/jobs";

const DEFAULT_NOTIFY_TO = "info@premiumib.com";

export type JobApplicationResumeNotifyInfo = {
  /** Private Blob pathname (server reference; not a public URL). */
  resumePathname: string;
  /** Short-lived authenticated staff GET URL, if issuance succeeded. */
  staffResumeUrl: string | null;
  /** ISO expiry for staffResumeUrl when present. */
  staffResumeExpiresAt: string | null;
};

export async function sendJobApplicationNotification(
  application: ValidatedJobApplication,
  applicationId: string,
  resume: JobApplicationResumeNotifyInfo | null,
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

  const resumeLines: string[] = [];
  if (!resume) {
    resumeLines.push("Resume: not attached");
  } else if (resume.staffResumeUrl) {
    resumeLines.push(
      "Resume access (private, time-limited staff link — do not forward publicly):",
      resume.staffResumeUrl,
    );
    if (resume.staffResumeExpiresAt) {
      resumeLines.push(`Link expires: ${resume.staffResumeExpiresAt}`);
    }
    resumeLines.push(`Private Blob pathname: ${resume.resumePathname}`);
  } else {
    resumeLines.push(
      "Resume: stored privately in Vercel Blob (no public URL).",
      `Private Blob pathname: ${resume.resumePathname}`,
      "Retrieve via Vercel Blob dashboard (premium-website-blob) or re-issue a signed GET from the server using this pathname.",
    );
  }

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
    ...resumeLines,
    "",
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: getResendFrom("PremiumIB Careers"),
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
