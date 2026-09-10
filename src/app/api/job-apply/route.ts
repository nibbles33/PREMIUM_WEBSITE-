import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
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

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) {
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
  try {
    const safeName = resumeFile!.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const blob = await put(
      `careers/${validated.data.position}/${Date.now()}-${safeName}`,
      resumeFile!,
      {
        access: "public",
        token: blobToken,
        contentType: resumeFile!.type,
      },
    );
    resumeUrl = blob.url;
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
      resumeUrl,
    });
    applicationId = saved.id;
  } catch (err) {
    console.error("[job-apply] Failed to save application", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your application. Please try again or email info@premiumib.com.",
      },
      { status: 500 },
    );
  }

  try {
    const emailed = await sendJobApplicationNotification(
      validated.data,
      applicationId,
      resumeUrl,
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
