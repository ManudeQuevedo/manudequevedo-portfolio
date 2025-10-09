// src/components/sections/CommunityImpact.tsx
"use client";

import { Link } from "@/i18n/navigation";
import SectionHeader from "./SectionHeader";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function CommunityImpactSection({
  email = "contact@manudequevedo.com",
  className,
}: {
  email?: string;
  className?: string;
}) {
  const t = useTranslations();

  const badge = t("sections.community.badge");
  const title = t("sections.community.title");
  const description = t("sections.community.description"); // tamaño igual al subheading de héroe
  const motto = t("sections.community.motto");
  const cta = t("sections.community.cta");
  const note = t("sections.community.note");
  const subject = t("sections.community.mailto_subject");

  return (
    <section className={className}>
      <SectionHeader
        badge={badge}
        title={title}
        subtitle={description}
        className="space-y-6"
      />

      {/* frase/motto con énfasis pero sin subir tipografía global */}
      <blockquote className="mx-auto max-w-3xl italic font-semibold text-base md:text-lg text-foreground/90 text-center">
        “{motto}”
      </blockquote>

      <div className="mt-6 flex items-center justify-center gap-3">
        <a
          href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2 text-sm font-semibold hover:opacity-90 transition">
          {cta}
        </a>

        <Badge
          variant="secondary"
          className="rounded-full text-xs px-3 py-1 border">
          {t("sections.community.badge_alt")}
        </Badge>
      </div>

      {note ? (
        <p className="mt-6 text-center text-xs text-muted-foreground">{note}</p>
      ) : null}
    </section>
  );
}
