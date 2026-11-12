"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "./FadeIn";

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlight?: string;
  tags: string[];
}

// Month abbreviations in both locales, used to read the start date out of the "period" text.
const MONTHS: Record<string, number> = {
  ene: 1, jan: 1, feb: 2, mar: 3, abr: 4, apr: 4, may: 5, jun: 6,
  jul: 7, ago: 8, aug: 8, sep: 9, oct: 10, nov: 11, dic: 12, dec: 12,
};

// startValue turns the first "Mon YYYY" (or "YYYY") in a period into a sortable number.
function startValue(period: string) {
  const match = period.match(/(?:([A-Za-zñ]{3})[a-z]*\.?\s+)?(\d{4})/);
  if (!match) return 0;
  const month = match[1] ? (MONTHS[match[1].toLowerCase()] ?? 1) : 1;
  return Number(match[2]) * 12 + month;
}

// ExperienceSection lists every job newest first, ordered by each role's start date.
export function ExperienceSection() {
  const t = useTranslations("landing");
  const te = useTranslations("experience");
  // next-intl stores the list as an object keyed "0".."5"; sort by start date, newest first.
  // The key order breaks ties so equal dates keep the original sequence.
  const raw = te.raw("items") as Record<string, ExperienceItem>;
  const items = Object.keys(raw)
    .sort(
      (a, b) =>
        startValue(raw[b].period) - startValue(raw[a].period) ||
        Number(a) - Number(b),
    )
    .map((key) => raw[key]);

  return (
    <section
      id="experience"
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-32">
      <FadeIn>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          {t("experience.title")}
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {items.map((item, index) => (
          <FadeIn key={`${item.company}-${index}`} delay={Math.min(index, 3) * 0.1}>
            <div
              className="flex items-start gap-5 py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12"
              style={{ borderTop: "1px solid rgba(215, 226, 234, 0.2)" }}>
              <span
                className="inline-block shrink-0 font-black leading-none text-[#D7E2EA]"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)", minWidth: "1.3em" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex min-w-0 flex-col gap-3 pt-1">
                <h3
                  className="font-medium uppercase text-[#D7E2EA]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                  {item.company}
                </h3>
                <p
                  className="font-medium uppercase tracking-wide text-[#D7E2EA]/80"
                  style={{ fontSize: "clamp(0.75rem, 1.3vw, 1.05rem)" }}>
                  {item.role}
                </p>
                <p
                  className="font-light uppercase tracking-wide text-[#D7E2EA]/50"
                  style={{ fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)" }}>
                  {item.period} · {item.location}
                </p>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#D7E2EA] opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>
                  {item.highlight ?? item.description}
                </p>
                <ul className="mt-1 flex flex-wrap gap-2">
                  {item.tags.slice(0, 6).map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-[11px] font-light uppercase tracking-wider text-[#D7E2EA]/80 sm:text-xs">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
        <div style={{ borderTop: "1px solid rgba(215, 226, 234, 0.2)" }} />
      </div>
    </section>
  );
}
