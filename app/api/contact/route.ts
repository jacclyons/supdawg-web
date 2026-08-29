import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const TO_EMAIL = "supdawgcrafts@gmail.com";
const FROM_EMAIL = "SUPDAWG Contact <contact@supdawgcrafts.com>";

// Resend's email size cap is ~40MB; base64 encoding inflates ~33%, so cap raw bytes at 25MB total.
const MAX_TOTAL_BYTES = 25 * 1024 * 1024;
const MAX_PER_FILE_BYTES = 10 * 1024 * 1024;
const MAX_FILES = 6;
const ALLOWED_EXTENSIONS = new Set([
  "jpg", "jpeg", "png", "gif", "webp", "heic", "heif",
  "pdf", "svg", "ai", "eps",
]);

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(200),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(5000),
  // Honeypot: bots fill hidden fields, humans don't.
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email isn't set up yet. Add RESEND_API_KEY to enable the contact form." },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields = {
    name: form.get("name"),
    email: form.get("email"),
    subject: form.get("subject") ?? "",
    message: form.get("message"),
    website: form.get("website") ?? "",
  };

  const parsed = ContactSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const rawFiles = form.getAll("attachments").filter((v): v is File => v instanceof File && v.size > 0);

  if (rawFiles.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Too many files. Max ${MAX_FILES}.` },
      { status: 400 }
    );
  }

  let totalBytes = 0;
  const attachments: { filename: string; content: Buffer }[] = [];
  for (const file of rawFiles) {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json(
        { error: `File type ".${ext}" isn't allowed. Use images, PDFs, or vector files.` },
        { status: 400 }
      );
    }
    if (file.size > MAX_PER_FILE_BYTES) {
      return NextResponse.json(
        { error: `"${file.name}" is over 10MB.` },
        { status: 400 }
      );
    }
    totalBytes += file.size;
    if (totalBytes > MAX_TOTAL_BYTES) {
      return NextResponse.json(
        { error: "Attachments total over 25MB." },
        { status: 400 }
      );
    }
    const buf = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content: buf });
  }

  const { name, email, subject, message } = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: subject ? `[SUPDAWG] ${subject}` : `[SUPDAWG] New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}${attachments.length ? `\n\nAttachments: ${attachments.map((a) => a.filename).join(", ")}` : ""}`,
    html: `<div style="font-family: system-ui, sans-serif; line-height: 1.5;">
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      ${attachments.length ? `<p><strong>Attachments:</strong> ${attachments.map((a) => escapeHtml(a.filename)).join(", ")}</p>` : ""}
    </div>`,
    attachments: attachments.length ? attachments : undefined,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json(
      { error: `Couldn't send: ${error.message ?? "unknown error"}` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
