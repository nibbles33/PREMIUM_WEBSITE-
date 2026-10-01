import { NextResponse } from "next/server";
import {
  createStaffResumeAccessUrl,
  deletePrivateResume,
  isBlobUploadConfigured,
  uploadPrivateResume,
} from "@/lib/jobs/blob";
import { sendJobApplicationNotification } from "@/lib/jobs/notify";
import {
  checkAndRecordJobApplyRateLimit,
  markJobApplicationEmailSent,
  saveJobApplication,
} from "@/lib/jobs/saveApplication";
import {
  isJobHoneypotTriggered,
  validateJobApplicationFields,
  validateResumeFile,
} from "@/lib/jobs/validate";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid form submission." },
      { status: 400 },
    );
  }

  if (isJobHoneypotTriggered(formData.get("website"))) {
    console.warn("[job-apply] Honeypot triggered — discarding submission.");
    return NextResponse.json({ ok: true });
  }

  const validated = validateJobApplicationFields({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    position: formData.get("position"),
    message: formData.get("message"),
  });

  if (!validated.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: validated.error,
        fieldErrors: validated.fieldErrors,
      },
      { status: 400 },
    );
  }

  const resumeEntry = formData.get("resume");
  const resumeFile =
    resumeEntry instanceof File && resumeEntry.size > 0 ? resumeEntry : null;
  const resumeCheck = validateResumeFile(resumeFile);
  if (!resumeCheck.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: resumeCheck.error,
        fieldErrors: { [resumeCheck.field]: resumeCheck.error },
      },
      { status: 400 },
    );
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Applications are temporarily unavailable. Please email info@premiumib.com with your resume.",
      },
      { status: 503 },
    );
  }

  if (!isBlobUploadConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Resume upload is not configured on this environment. Please email your resume to info@premiumib.com and include the position you are applying for.",
      },
      { status: 503 },
    );
  }

  const ip = clientIp(request);

  try {
    const rate = await checkAndRecordJobApplyRateLimit(ip);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: `Too many applications from this connection. Please try again in about ${rate.retryAfterMinutes} minutes, or email info@premiumib.com.`,
        },
        { status: 429 },
      );
    }
  } catch (err) {
    console.error("[job-apply] Rate-limit check failed", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Applications are temporarily unavailable. Please email info@premiumib.com.",
      },
      { status: 503 },
    );
  }

  let resumeUrl: string;
  let resumePathname: string;
  try {
    const uploaded = await uploadPrivateResume(
      validated.data.position,
      resumeFile!,
    );
    resumeUrl = uploaded.url;
    resumePathname = uploaded.pathname;
  } catch (err) {
    console.error("[job-apply] Resume upload failed", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't upload your resume. Please try again or email info@premiumib.com directly.",
      },
      { status: 500 },
    );
  }

  let applicationId: string;
  try {
    const saved = await saveJobApplication({
      ...validated.data,
      // Private Blob URL/reference — not anonymously accessible.
      resumeUrl,
    });
    applicationId = saved.id;
  } catch (err) {
    console.error("[job-apply] Failed to save application", err);
    try {
      await deletePrivateResume(resumeUrl);
    } catch (cleanupErr) {
      console.error(
        "[job-apply] Failed to clean up orphaned private resume after DB error",
        cleanupErr,
      );
    }
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your application. Please try again or email info@premiumib.com.",
      },
      { status: 500 },
    );
  }

  let staffResumeUrl: string | null = null;
  let staffResumeExpiresAt: string | null = null;
  try {
    const staffAccess = await createStaffResumeAccessUrl(resumePathname);
    if (staffAccess) {
      staffResumeUrl = staffAccess.url;
      staffResumeExpiresAt = staffAccess.expiresAt.toISOString();
    } else {
      console.warn(
        "[job-apply] Staff resume access URL unavailable — email will include private pathname only",
        { applicationId, resumePathname },
      );
    }
  } catch (err) {
    console.error("[job-apply] Staff resume access URL error", {
      applicationId,
      err,
    });
  }

  try {
    const emailed = await sendJobApplicationNotification(
      validated.data,
      applicationId,
      {
        resumePathname,
        staffResumeUrl,
        staffResumeExpiresAt,
      },
    );
    if (emailed) {
      try {
        await markJobApplicationEmailSent(applicationId);
      } catch (err) {
        console.error("[job-apply] emailSent flag update failed", {
          applicationId,
          err,
        });
      }
    }
  } catch (err) {
    console.error("[job-apply] Notification threw — application saved", {
      applicationId,
      err,
    });
  }

  return NextResponse.json({ ok: true, id: applicationId });
}
