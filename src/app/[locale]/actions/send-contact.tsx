// src/actions/send-contact.ts
"use server";

import { ContactSchema } from "@/lib/validation/contact";
import { Resend } from "resend";
import ContactMessageEmail from "@/emails/ContactMessageEmail";
import { getLocale } from "next-intl/server";

type Locale = "en" | "es";
const isLocale = (v: unknown): v is Locale => v === "en" || v === "es";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendContact(fd: FormData) {
  try {
    // Honeypot: si está lleno, ignoramos silenciosamente
    if ((fd.get("website") as string)?.length) {
      return { ok: true };
    }

    // Idioma del formulario o del request; default "en"
    const formLocale = String(fd.get("locale") || "");
    const reqLocale = await getLocale().catch(() => "en");
    const locale: Locale = isLocale(formLocale)
      ? formLocale
      : isLocale(reqLocale)
      ? (reqLocale as Locale)
      : "en";

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
        response: String(payload.captcha || ""),
      }),
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

    // Subject y fallback de texto según idioma
    const subject =
      locale === "es"
        ? `Nueva consulta: ${data.purpose} — ${data.fullName}`
        : `New inquiry: ${data.purpose} — ${data.fullName}`;

    const textFallback =
      locale === "es"
        ? [
            `Motivo: ${data.purpose}`,
            `Resumen: ${data.summary}`,
            `Nombre: ${data.fullName}`,
            `Correo: ${data.email}`,
            `Organización: ${data.org || "-"}`,
            `Teléfono: ${data.phone || "-"}`,
            "",
            data.message,
          ].join("\n")
        : [
            `Purpose: ${data.purpose}`,
            `Summary: ${data.summary}`,
            `Name: ${data.fullName}`,
            `Email: ${data.email}`,
            `Organization: ${data.org || "-"}`,
            `Phone: ${data.phone || "-"}`,
            "",
            data.message,
          ].join("\n");

    // Componente React para el email (EN/ES)
    const emailComponent = (
      <ContactMessageEmail
        purpose={String(data.purpose || "")}
        summary={String(data.summary || "")}
        fullName={String(data.fullName || "")}
        email={String(data.email || "")}
        org={String(data.org || "")}
        phone={String(data.phone || "")}
        message={String(data.message || "")}
        siteUrl={
          process.env.NEXT_PUBLIC_SITE_URL || "https://www.manudequevedo.com"
        }
        locale={locale}
      />
    );

    await resend.emails.send({
      from: process.env.RESEND_FROM || "portfolio@resend.dev",
      to: process.env.CONTACT_TO?.split(",") || ["contact@manudequevedo.com"],
      subject,
      replyTo: String(data.email || ""),
      react: emailComponent,
      text: textFallback, // fallback para clientes que no renderizan HTML
    });

    return { ok: true };
  } catch {
    // Respuesta limpia (sin logs)
    return { ok: false, error: "server" };
  }
}
