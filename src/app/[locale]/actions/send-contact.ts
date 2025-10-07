"use server";

import { ContactSchema } from "@/lib/validation/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendContact(fd: FormData) {
  try {
    // Honeypot
    if ((fd.get("website") as string)?.length) {
      return { ok: true }; // ignorar silenciosamente
    }

    const payload = {
      purpose: fd.get("purpose"),
      summary: fd.get("summary"),
      fullName: fd.get("fullName"),
      email: fd.get("email"),
      org: fd.get("org"),
      phone: fd.get("phone"),
      message: fd.get("message"),
      captcha: fd.get("h-captcha-response"),
    };

    // Validación Zod
    const parsed = ContactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!fieldErrors[k]) fieldErrors[k] = i.message;
      });
      return { ok: false, error: "validation", fieldErrors };
    }

    // Verificación hCaptcha (server-side)
    const captchaRes = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY!,
        response: String(payload.captcha),
      }),
      // importantísimo en server actions para evitar caché
      cache: "no-store",
    }).then((r) => r.json());

    if (!captchaRes.success) {
      return {
        ok: false,
        error: "captcha",
        fieldErrors: { captcha: "Captcha verification failed" },
      };
    }

    const data = parsed.data;

    // Envía correo con Resend
    await resend.emails.send({
      from: process.env.RESEND_FROM || "portfolio@resend.dev",
      to: process.env.CONTACT_TO?.split(",") || ["contact@manudequevedo.com"],
      subject: `New inquiry: ${data.purpose} — ${data.fullName}`,
      replyTo: data.email,
      text: [
        `Purpose: ${data.purpose}`,
        `Summary: ${data.summary}`,
        `Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Org: ${data.org || "-"}`,
        `Phone: ${data.phone || "-"}`,
        "",
        data.message,
      ].join("\n"),
    });

    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "server" };
  }
}