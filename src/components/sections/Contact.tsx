// src/components/sections/Contact.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { sendContact } from "@/app/[locale]/actions/send-contact";
import { Mail, MapPin } from "lucide-react";
import Script from "next/script";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type ContactState = {
  ok: boolean;
  error?: "validation" | "captcha" | "server";
  fieldErrors?: Record<string, string>;
};

export default function ContactSection({
  email = "contact@manudequevedo.com",
  address = "Querétaro, MX",
}: {
  email?: string;
  address?: string;
}) {
  const t = useTranslations("sections.contact");
  const [state, formAction] = useActionState<ContactState, FormData>(
    async (_state, payload) => {
      const result = await sendContact(payload);
      // Map error string to allowed union type
      let error: "validation" | "captcha" | "server" | undefined = undefined;
      if (result.error) {
        if (
          result.error === "validation" ||
          result.error === "captcha" ||
          result.error === "server"
        ) {
          error = result.error;
        } else {
          error = "server"; // fallback for unexpected error strings
        }
      }
      return {
        ok: result.ok,
        error,
        fieldErrors: result.fieldErrors,
      };
    },
    { ok: false }
  );
  const [sent, setSent] = useState(false);

  // marca como enviado cuando la action responde ok
  useEffect(() => {
    if (state?.ok) setSent(true);
  }, [state?.ok]);

  return (
    <section className="py-16 md:py-24 space-y-10">
      {/* Script del widget (solo en esta página) */}
      <Script
        src="https://hcaptcha.com/1/api.js"
        strategy="afterInteractive"
        defer
      />

      {/* Encabezado */}
      <div className="text-center space-y-4">
        <div className="inline-flex rounded-full bg-foreground text-background text-xs font-semibold px-3 py-1">
          {t("badge")}
        </div>
        <h2 className="font-black text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
          {t("title")}
        </h2>
      </div>

      {/* Banda de info superior — totalmente responsive */}
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-6 rounded-2xl bg-card/50 p-6"
        )}>
        <TooltipProvider delayDuration={150}>
          <InfoItem icon={<Mail className="size-5" />} value={email} />
          <InfoItem icon={<MapPin className="size-5" />} value={address} />
        </TooltipProvider>
      </div>

      {/* Formulario */}
      <form
        action={formAction}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        noValidate>
        <Select
          name="purpose"
          label={t("purpose")}
          required
          error={state?.fieldErrors?.purpose}
          options={[
            { value: "project", label: t("opt_project") },
            { value: "collab", label: t("opt_collab") },
            { value: "other", label: t("opt_other") },
          ]}
        />

        <Select
          name="summary"
          label={t("summary")}
          required
          error={state?.fieldErrors?.summary}
          options={[
            { value: "branding", label: t("sum_branding") },
            { value: "website", label: t("sum_website") },
            { value: "audit", label: t("sum_audit") },
            { value: "advice", label: t("sum_advice") },
          ]}
        />

        <Text
          name="fullName"
          label={t("full_name")}
          placeholder={t("ph_name")}
          required
          error={state?.fieldErrors?.fullName}
        />
        <Text
          type="email"
          name="email"
          label="Email"
          placeholder="you@email.com"
          required
          error={state?.fieldErrors?.email}
        />
        <Text
          name="org"
          label={t("org")}
          placeholder={t("ph_org")}
          error={state?.fieldErrors?.org}
        />
        <Text
          name="phone"
          label={t("phone")}
          placeholder="+52 ..."
          error={state?.fieldErrors?.phone}
        />

        <div className="md:col-span-2">
          <TextArea
            name="message"
            label={t("message")}
            placeholder={t("ph_message")}
            required
            error={state?.fieldErrors?.message}
          />
        </div>

        {/* Honeypot (anti-spam) */}
        <input type="text" name="website" className="hidden" tabIndex={-1} />

        {/* hCaptcha widget + error */}
        <div className="md:col-span-2 flex flex-col items-center gap-2">
          <div
            className="h-captcha"
            data-sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          />
          {state?.error === "captcha" && (
            <p className="text-sm text-red-500">
              {t("err.captcha", { default: "Captcha verification failed." })}
            </p>
          )}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className={cn(
              "inline-flex items-center rounded-xl px-6 py-3 font-semibold",
              "bg-foreground text-background hover:opacity-90 transition disabled:opacity-60"
            )}
            disabled={sent}
            aria-disabled={sent}>
            {sent ? t("sent") : t("submit")}
          </button>
        </div>

        {/* Errores generales */}
        {state?.error === "server" && (
          <p className="md:col-span-2 text-sm text-red-500">
            {t("err.server", { default: "Server error. Please try again." })}
          </p>
        )}
        {state?.error === "validation" && !state?.fieldErrors && (
          <p className="md:col-span-2 text-sm text-red-500">
            {t("err.validation", { default: "Please review the fields." })}
          </p>
        )}

        {/* Éxito */}
        {sent && (
          <p className="md:col-span-2 text-sm text-green-600">{t("ok")}</p>
        )}
      </form>
    </section>
  );
}

/* ---------- Subcomponentes ---------- */

function InfoItem({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "h-full rounded-xl border bg-background",
            "p-5 md:p-6 flex flex-col items-center justify-center text-center",
            "hover:bg-accent/10 transition"
          )}
          // fallback nativo por si el portal del tooltip no aparece
          title={value}>
          <div className="mb-3 inline-flex size-12 items-center justify-center rounded-full border bg-card/70">
            {icon}
          </div>

          {/*
           */}
          <p className="font-medium text-sm sm:text-base md:text-lg tracking-tight max-w-[220px] sm:max-w-[280px] md:max-w-[360px] truncate">
            {value}
          </p>
        </div>
      </TooltipTrigger>

      {/* Tooltip con el contenido completo */}
      <TooltipContent
        side="top"
        sideOffset={8}
        align="center"
        className="max-w-[92vw] break-words">
        {value}
      </TooltipContent>
    </Tooltip>
  );
}

function FieldShell({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </label>
  );
}

function Text(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
  }
) {
  const { label, className, error, ...rest } = props;
  return (
    <FieldShell label={label} error={error}>
      <input
        {...rest}
        className={cn(
          "w-full rounded-xl border bg-background px-3 py-2 outline-none ring-0",
          error
            ? "border-red-400 focus:border-red-500"
            : "focus:border-foreground/60",
          className
        )}
      />
    </FieldShell>
  );
}

function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
  }
) {
  const { label, className, error, ...rest } = props;
  return (
    <FieldShell label={label} error={error}>
      <textarea
        {...rest}
        rows={6}
        className={cn(
          "w-full rounded-xl border bg-background px-3 py-2 outline-none ring-0",
          error
            ? "border-red-400 focus:border-red-500"
            : "focus:border-foreground/60",
          className
        )}
      />
    </FieldShell>
  );
}

function Select({
  name,
  label,
  options,
  required,
  error,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  options: { value: string; label: string }[];
}) {
  return (
    <FieldShell label={label} error={error}>
      <select
        name={name}
        required={required}
        className={cn(
          "w-full rounded-xl border bg-background px-3 py-2 outline-none ring-0",
          error
            ? "border-red-400 focus:border-red-500"
            : "focus:border-foreground/60"
        )}
        defaultValue="">
        <option value="" disabled>
          —
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
