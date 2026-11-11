"use client";

import { useLocale, useTranslations } from "next-intl";
import { FadeIn } from "./FadeIn";
import { ContactButton } from "./ContactButton";

const EMAIL = "manu@noctra.studio";

// ContactSection closes the page and is the target of every "Contact" call to action.
export function ContactSection() {
  const t = useTranslations("landing");
  const locale = useLocale();

  return (
    <section
      id="contact"
      className="flex flex-col items-center gap-10 px-5 pb-16 pt-10 text-center sm:px-8 md:px-10 md:pb-20">
      <FadeIn>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          {t("contact.title")}
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p
          className="mx-auto max-w-[560px] font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}>
          {t("contact.text")}
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <ContactButton label={EMAIL} href={`mailto:${EMAIL}`} />
      </FadeIn>
      <FadeIn delay={0.3}>
        <div className="flex gap-8 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:text-base">
          <a
            href="https://linkedin.com/in/manuelmatus"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity duration-200 hover:opacity-70">
            {t("contact.linkedin")}
          </a>
          <a
            href={`/api/cv?locale=${locale}`}
            className="transition-opacity duration-200 hover:opacity-70">
            {t("contact.cv")}
          </a>
        </div>
      </FadeIn>
    </section>
  );
}
