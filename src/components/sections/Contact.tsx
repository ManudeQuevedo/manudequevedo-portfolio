// src/components/sections/Contact.tsx
"use client";

import {
  useActionState,
  useEffect,
  useState,
  useRef,
  useTransition,
} from "react";
import Script from "next/script";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { sendContact } from "@/app/[locale]/actions/send-contact";
import { Mail, MapPin, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

/* --- hCaptcha typing (simple) --- */
declare global {
  interface Window {
    hcaptcha?: {
      render: (
        container: HTMLElement | string,
        opts: Record<string, any>
      ) => number;
      execute: (widgetId?: number) => void;
      reset: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
    };
  }
}

type ContactState = {
  ok: boolean;
  error?: "validation" | "captcha" | "server";
  fieldErrors?: Record<string, string | { code?: string; message?: string }>;
};

export default function ContactSection({
  email = "contact@manudequevedo.com",
  address = "Querétaro, MX",
}: {
  email?: string;
  address?: string;
}) {
  const t = useTranslations("sections.contact");
  const locale = useLocale();

  // Fallback de traducción sin lanzar MISSING_MESSAGE
  const tf = (id: string, fallback: string) =>
    t(id as any, { defaultMessage: fallback });

  // Mapea errores del backend a textos legibles (por código o por mensaje)
  function localizeFieldError(
    field: string,
    raw?: string | { code?: string; message?: string }
  ) {
    if (!raw) return undefined;
    const isEs = locale.startsWith("es");

    const code = typeof raw === "object" ? raw.code : undefined;
    const msg = typeof raw === "object" ? raw.message : raw;

    switch (code) {
      case "invalid_option":
        if (field === "purpose")
          return isEs
            ? "Selecciona un propósito válido."
            : "Please select a valid purpose.";
        if (field === "summary")
          return isEs
            ? "Selecciona una opción válida."
            : "Please select a valid option.";
        return isEs ? "Opción inválida." : "Invalid option.";
      case "required":
        return isEs ? "Campo obligatorio." : "Required field.";
      case "too_short":
        return isEs ? "Demasiado corto." : "Too short.";
      case "too_long":
        return isEs ? "Demasiado largo." : "Too long.";
      case "invalid_email":
        return isEs ? "Email inválido." : "Invalid email.";
      case "captcha_failed":
        return isEs
          ? "Error al verificar el captcha."
          : "Captcha verification failed.";
      case "spam_detected":
        return isEs
          ? "Mensaje bloqueado por seguridad."
          : "Message blocked for security.";
      default:
        break;
    }

    if (msg) {
      if (/invalid option/i.test(msg)) {
        if (field === "purpose")
          return isEs
            ? "Selecciona un propósito válido."
            : "Please select a valid purpose.";
        if (field === "summary")
          return isEs
            ? "Selecciona una opción válida."
            : "Please select a valid option.";
      }
      if (/too short/i.test(msg))
        return isEs ? "Demasiado corto." : "Too short.";
      if (/invalid email/i.test(msg))
        return isEs ? "Email inválido." : "Invalid email.";
      if (/tell me a little more/i.test(msg))
        return isEs ? "Cuéntame un poco más." : "Tell me a little more.";
    }
    return msg;
  }

  const [state, formAction] = useActionState<ContactState, FormData>(
    async (_state, payload) => {
      const result = await sendContact(payload);
      let error: "validation" | "captcha" | "server" | undefined = undefined;
      if (result.error) {
        if (
          result.error === "validation" ||
          result.error === "captcha" ||
          result.error === "server"
        ) {
          error = result.error;
        } else {
          error = "server";
        }
      }
      return { ok: result.ok, error, fieldErrors: result.fieldErrors };
    },
    { ok: false }
  );

  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [captchaReady, setCaptchaReady] = useState(false);
  const [_, startTransition] = useTransition();

  // Estado controlado para selects
  const [purpose, setPurpose] = useState<string>("");
  const [summary, setSummary] = useState<string>("");

  // Errores de cliente
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const captchaPlaceholderRef = useRef<HTMLDivElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);
  const captchaWidgetIdRef = useRef<number | null>(null);

  const HCAPTCHA_ENABLED = !!process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  const smoothScrollIntoView = (
    el: Element | null,
    block: ScrollLogicalPosition = "center"
  ) => {
    if (!el) return;
    try {
      el.scrollIntoView({ behavior: "smooth", block });
    } catch {
      (el as HTMLElement).scrollIntoView();
    }
  };

  // Marca enviado OK
  useEffect(() => {
    if (state?.ok) {
      setSubmitting(false);
      setSent(true);
      // limpia el formulario y selects SOLO en éxito
      formRef.current?.reset();
      setPurpose("");
      setSummary("");
    }
  }, [state?.ok]);

  // Deep-link #contact
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#contact") {
      smoothScrollIntoView(sectionRef.current, "start");
    }
  }, []);

  // Scroll al éxito
  useEffect(() => {
    if (sent) smoothScrollIntoView(successRef.current, "center");
  }, [sent]);

  // Scroll a primer campo inválido (server)
  useEffect(() => {
    if (state?.error === "validation" && state.fieldErrors && formRef.current) {
      const order = [
        "purpose",
        "summary",
        "fullName",
        "email",
        "org",
        "phone",
        "message",
      ];
      const firstInvalid = order.find((n) => state.fieldErrors?.[n]);
      const el = firstInvalid
        ? (formRef.current.querySelector(
            `[name="${firstInvalid}"]`
          ) as HTMLElement | null)
        : null;
      if (el) {
        smoothScrollIntoView(el, "center");
        setTimeout(() => el.focus?.(), 150);
      }
      setSubmitting(false);
    }
  }, [state?.error, state?.fieldErrors]);

  // Renderizar hCaptcha invisible cuando el script esté listo
  useEffect(() => {
    if (!HCAPTCHA_ENABLED) return; // en dev/local sin key: no inicializamos
    let cancelled = false;

    const tryInit = () => {
      if (cancelled) return;
      if (!captchaPlaceholderRef.current) return;
      if (captchaWidgetIdRef.current !== null) return;

      if (typeof window !== "undefined" && window.hcaptcha) {
        const sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!;
        captchaWidgetIdRef.current = window.hcaptcha.render(
          captchaPlaceholderRef.current,
          {
            sitekey,
            size: "invisible",
            callback: () => {
              const fd = buildFormData();

              if (process.env.NODE_ENV !== "production") {
                const debug: Record<string, any> = {};
                for (const [k, v] of fd.entries()) debug[k] = v;
                console.log("[Contact] Payload (from captcha):", debug);
              }

              setSubmitting(true);
              startTransition(() => {
                formAction(fd);
              });
            },
            "error-callback": () => {
              setSubmitting(false);
              smoothScrollIntoView(sectionRef.current, "start");
            },
          }
        );
        setCaptchaReady(true);
      } else {
        setTimeout(tryInit, 150);
      }
    };

    tryInit();
    return () => {
      cancelled = true;
    };
  }, [formAction, startTransition, HCAPTCHA_ENABLED]);

  // Reset captcha si falla o al enviar OK
  useEffect(() => {
    const id = captchaWidgetIdRef.current ?? undefined;
    if (!window.hcaptcha || id === undefined) return;
    if (state?.error === "captcha") {
      window.hcaptcha.reset(id);
      setSubmitting(false);
    }
    if (sent) {
      window.hcaptcha.reset(id);
    }
  }, [state?.error, sent]);

  // Si hay error general (no captcha) deja de mostrar "Enviando…"
  useEffect(() => {
    if (state?.error && state.error !== "captcha") {
      setSubmitting(false);
    }
  }, [state?.error]);

  // Validación rápida en cliente
  const validateClient = () => {
    const errs: Record<string, string> = {};

    // selects
    if (!purpose)
      errs.purpose = tf(
        "err.purpose_required",
        locale === "es"
          ? "Selecciona un propósito."
          : "Please select a purpose."
      );
    if (!summary)
      errs.summary = tf(
        "err.summary_required",
        locale === "es" ? "Selecciona un resumen." : "Please select a summary."
      );

    // text inputs
    const fullName =
      (
        formRef.current?.elements.namedItem(
          "fullName"
        ) as HTMLInputElement | null
      )?.value?.trim() || "";
    const email =
      (
        formRef.current?.elements.namedItem("email") as HTMLInputElement | null
      )?.value?.trim() || "";
    const message =
      (
        formRef.current?.elements.namedItem(
          "message"
        ) as HTMLTextAreaElement | null
      )?.value?.trim() || "";

    if (fullName.length < 2)
      errs.fullName = tf(
        "err.fullname_short",
        locale === "es" ? "Demasiado corto." : "Too short."
      );

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = tf(
        "err.email_invalid",
        locale === "es" ? "Email inválido." : "Invalid email."
      );

    if (message.length < 20)
      errs.message = tf(
        "err.message_more",
        locale === "es" ? "Cuéntame un poco más." : "Tell me a little more."
      );

    setClientErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (formData: FormData) => {
    setSent(false);

    // Sincroniza selects y locale
    if (!formData.get("locale")) formData.set("locale", locale);

    // Validación cliente
    if (!validateClient()) {
      const first = document.querySelector('[data-client-error="true"]');
      if (first) smoothScrollIntoView(first as HTMLElement, "center");
      return;
    }

    const hasToken = !!formData.get("h-captcha-response");
    const wid = captchaWidgetIdRef.current;

    // Si captcha no está habilitado/listo (dev/local), envía directo
    if (!HCAPTCHA_ENABLED || !window.hcaptcha || !captchaReady) {
      setSubmitting(true);
      const fd = buildFormData();
      if (process.env.NODE_ENV !== "production") {
        const debug: Record<string, any> = {};
        for (const [k, v] of fd.entries()) debug[k] = v;
        console.log("[Contact] Payload (no captcha):", debug);
      }
      startTransition(() => {
        formAction(fd);
      });
      return;
    }

    // Ejecuta reto invisible si aún no hay token
    if (!hasToken && wid !== null) {
      setSubmitting(true);
      window.hcaptcha.execute(wid);
      return;
    }

    // Con token → envía
    setSubmitting(true);
    const fd = buildFormData();
    if (process.env.NODE_ENV !== "production") {
      const debug: Record<string, any> = {};
      for (const [k, v] of fd.entries()) debug[k] = v;
      console.log("[Contact] Payload (onSubmit):", debug);
    }
    startTransition(() => {
      formAction(fd);
    });
  };

  const buildFormData = () => {
    const form = formRef.current;
    const fd = new FormData(form ?? undefined);

    // Lee SIEMPRE del DOM (evita estado stale del callback del captcha)
    const p =
      (form?.elements.namedItem("purpose") as HTMLSelectElement | null)
        ?.value || "";
    const s =
      (form?.elements.namedItem("summary") as HTMLSelectElement | null)
        ?.value || "";

    fd.set("purpose", p);
    fd.set("summary", s);
    fd.set("locale", locale);
    return fd;
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 md:py-24 space-y-10 scroll-mt-24">
      {/* Carga del script hCaptcha (no uses <head> en layouts) */}
      {HCAPTCHA_ENABLED && (
        <Script
          src="https://js.hcaptcha.com/1/api.js"
          strategy="afterInteractive"
        />
      )}

      {/* Encabezado */}
      <div className="text-center space-y-4">
        <div className="inline-flex rounded-full bg-foreground text-background text-xs font-semibold px-3 py-1">
          {t("badge")}
        </div>
        <h2 className="font-black text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
          {t("title")}
        </h2>
      </div>

      {/* Banda de info superior */}
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
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(new FormData(e.currentTarget));
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        noValidate>
        <input type="hidden" name="locale" value={locale} />

        <Select
          name="purpose"
          label={t("purpose")}
          required
          error={
            clientErrors.purpose ||
            localizeFieldError("purpose", state?.fieldErrors?.purpose)
          }
          value={purpose}
          onChange={(v) => {
            setPurpose(v);
            if (clientErrors.purpose)
              setClientErrors((e) => ({ ...e, purpose: "" }));
          }}
          options={[
            { value: "project", label: t("opt_project") },
            { value: "nonprofit", label: t("opt_nonprofit") },
            { value: "collab", label: t("opt_collab") },
            { value: "other", label: t("opt_other") },
          ]}
        />

        <Select
          name="summary"
          label={t("summary")}
          required
          error={
            clientErrors.summary ||
            localizeFieldError("summary", state?.fieldErrors?.summary)
          }
          value={summary}
          onChange={(v) => {
            setSummary(v);
            if (clientErrors.summary)
              setClientErrors((e) => ({ ...e, summary: "" }));
          }}
          options={[
            { value: "branding", label: t("sum_branding") },
            { value: "website", label: t("sum_website") },
            { value: "audit", label: t("sum_audit") },
            { value: "advice", label: t("sum_advice") },
          ]}
        />

        {/* Fila: Nombre completo | Email */}
        <Text
          name="fullName"
          label={t("full_name")}
          placeholder={t("ph_name")}
          required
          error={
            clientErrors.fullName ||
            localizeFieldError("fullName", state?.fieldErrors?.fullName)
          }
        />
        <Text
          type="email"
          name="email"
          label="Email"
          placeholder="you@email.com"
          autoComplete="email"
          required
          error={
            clientErrors.email ||
            localizeFieldError("email", state?.fieldErrors?.email)
          }
        />

        {/* Fila: Organización | Teléfono */}
        <Text
          name="org"
          label={t("org")}
          placeholder={t("ph_org")}
          error={localizeFieldError("org", state?.fieldErrors?.org)}
        />
        <Text
          type="tel"
          name="phone"
          label={t("phone")}
          placeholder={t("ph_phone") || "+52 ..."}
          autoComplete="tel"
          inputMode="tel"
          error={localizeFieldError("phone", state?.fieldErrors?.phone)}
        />

        {/* Mensaje (ancho completo) */}
        <div className="md:col-span-2">
          <TextArea
            name="message"
            label={t("message")}
            placeholder={t("ph_message")}
            required
            error={
              clientErrors.message ||
              localizeFieldError("message", state?.fieldErrors?.message)
            }
          />
        </div>

        {/* Honeypot (anti-spam) */}
        <input type="text" name="website" className="hidden" tabIndex={-1} />

        {/* Placeholder para hCaptcha invisible (no ocupa espacio) */}
        <div
          id="hcaptcha-invisible"
          ref={captchaPlaceholderRef}
          className="hidden"
        />

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className={cn(
              "inline-flex items-center rounded-xl px-6 py-3 font-semibold",
              "bg-foreground text-background hover:opacity-90 transition disabled:opacity-60"
            )}
            disabled={sent || submitting}
            aria-disabled={sent || submitting}>
            {sent
              ? t("sent")
              : submitting
              ? tf("submitting", locale === "es" ? "Enviando…" : "Sending…")
              : t("submit")}
          </button>
        </div>

        {/* Errores generales */}
        {state?.error === "server" && (
          <p className="md:col-span-2 text-sm text-red-500">
            {tf(
              "err.server",
              locale === "es"
                ? "Error del servidor. Intenta de nuevo."
                : "Server error. Please try again."
            )}
          </p>
        )}
        {state?.error === "validation" && !state?.fieldErrors && (
          <p className="md:col-span-2 text-sm text-red-500">
            {tf(
              "err.validation",
              locale === "es"
                ? "Revisa los campos."
                : "Please review the fields."
            )}
          </p>
        )}

        {/* Éxito */}
        {sent && (
          <motion.div
            key="success"
            ref={successRef}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="md:col-span-2 rounded-xl border border-emerald-400/60 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-50 dark:border-emerald-500/50 p-4 flex items-center gap-3">
            <CheckCircle2 className="size-5 shrink-0" />
            <div className="text-sm">
              <div className="font-semibold">
                {tf(
                  "ok_title",
                  locale === "es" ? "¡Mensaje enviado!" : "Message sent!"
                )}
              </div>
              <div>
                {tf(
                  "ok_body",
                  locale === "es"
                    ? "¡Gracias! Te contactaré en breve."
                    : "Thanks! I’ll get back to you shortly."
                )}
              </div>
            </div>
          </motion.div>
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
          title={value}>
          <div className="mb-3 inline-flex size-12 items-center justify-center rounded-full border bg-card/70">
            {icon}
          </div>
          <p className="font-medium text-sm sm:text-base md:text-lg tracking-tight max-w-[360px] truncate">
            {value}
          </p>
        </div>
      </TooltipTrigger>
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
      {error ? (
        <p className="mt-1 text-xs text-red-500" data-client-error={true}>
          {error}
        </p>
      ) : null}
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
  value,
  onChange,
}: {
  name: string;
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <FieldShell label={label} error={error}>
      <select
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full rounded-xl border bg-background px-3 py-2 outline-none ring-0",
          error
            ? "border-red-400 focus:border-red-500"
            : "focus:border-foreground/60"
        )}>
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
