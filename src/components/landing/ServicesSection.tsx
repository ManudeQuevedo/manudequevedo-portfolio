"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "./FadeIn";

// ServicesSection lists what Noctra Studio offers on a white card that overlaps the dark page.
export function ServicesSection() {
  const t = useTranslations("landing");
  const items = t.raw("services.items") as { name: string; description: string }[];

  return (
    <section
      id="services"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn>
        <h2
          className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          {t("services.title")}
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {items.map((item, index) => (
          <FadeIn key={item.name} delay={index * 0.1}>
            <div
              className="flex items-start gap-5 py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12"
              style={{ borderTop: "1px solid rgba(12, 12, 12, 0.15)" }}>
              <span
                className="inline-block shrink-0 font-black leading-none text-[#0C0C0C]"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)", minWidth: "1.3em" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3 pt-1">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                  {item.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)" }}>
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
        <div style={{ borderTop: "1px solid rgba(12, 12, 12, 0.15)" }} />
      </div>
    </section>
  );
}
