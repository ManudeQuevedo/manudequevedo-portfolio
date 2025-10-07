// src/components/sections/NonProfits.tsx
"use client";

import { Link } from "@/i18n/navigation";
import SectionHeader from "./SectionHeader";

export default function NonProfitsInvite({
  badge,
  heading,
  message,
  motto,
  ctaLabel,
  ctaHref,
  domainNote,
}: {
  badge: string; // ← “Community Impact”
  heading: string;
  message: string;
  motto: string;
  ctaLabel: string;
  ctaHref: string;
  domainNote?: string;
}) {
  return (
    <section className="py-12 md:py-16 space-y-8 text-center">
      {/* Encabezado unificado (píldora negra + título + subtítulo) */}
      <SectionHeader badge={badge} title={heading} subtitle={message} />

      {/* Motto destacado */}
      <blockquote className="mx-auto max-w-3xl text-lg md:text-2xl font-semibold text-foreground/90 italic">
        “{motto}”
      </blockquote>

      {/* CTA con badge “Community Impact” */}
      <div className="pt-2">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          {ctaLabel}
          <span className="text-xs font-medium bg-background text-primary rounded-full px-2 py-0.5 shadow-sm">
            {/* Se fuerza el texto solicitado */}
            Community Impact
          </span>
        </Link>
      </div>

      {/* Nota */}
      {domainNote ? (
        <p className="text-xs text-muted-foreground">{domainNote}</p>
      ) : null}
    </section>
  );
}
