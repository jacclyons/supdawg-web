import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";

const TO_EMAIL = "supdawgcrafts@gmail.com";
const FROM_EMAIL = "SUPDAWG Contact <onboarding@resend.dev>";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(200),
  subject: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(1, "Message is required").max(5000),
  // Honeypot — bots fill hidden fields; humans don't.
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

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, subject, message } = parsed.data;
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: subject ? `[SUPDAWG] ${subject}` : `[SUPDAWG] New message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<div style="font-family: system-ui, sans-serif; line-height: 1.5;">
      <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
      ${subject ? `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>`,
  });

  if (error) {
    return NextResponse.json({ error: "Couldn't send. Try again in a sec." }, { status: 502 });
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
