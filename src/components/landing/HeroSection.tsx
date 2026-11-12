"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "./FadeIn";
import { Magnet } from "./Magnet";
import { ContactButton } from "./ContactButton";

// HeroSection is the full-viewport opener: nav, oversized gradient heading, tagline and magnetic portrait.
export function HeroSection() {
  const t = useTranslations("landing");
  const links = [
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.experience"), href: "#experience" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <section
      className="relative flex h-screen flex-col"
      style={{ overflowX: "clip" }}>
      <FadeIn delay={0} y={-20}>
        <nav
          aria-label="Principal"
          className="flex justify-between px-6 pt-6 md:px-10 md:pt-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-wide text-[#D7E2EA] transition-opacity sm:text-sm sm:tracking-wider duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]">
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="overflow-hidden">
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[14vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[15vw] md:-mt-5 md:text-[16vw] lg:text-[17.5vw]">
            {t("hero.heading")}
          </h1>
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[160px] font-light uppercase [text-shadow:0_1px_10px_rgba(0,0,0,0.9)] leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1.5rem)" }}>
            {t("hero.tagline")}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton label={t("contactButton")} />
        </FadeIn>
      </div>

      <div className="pointer-events-none absolute bottom-[112px] left-1/2 z-10 w-[100vw] max-w-[440px] -translate-x-1/2 [mask-image:linear-gradient(to_bottom,black_82%,transparent)] sm:bottom-0 sm:[mask-image:none] sm:w-[calc(66vh*0.866)] sm:max-w-none md:w-[calc(76vh*0.866)]">
        <FadeIn delay={0.6} y={30}>
          <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/me-cartoon.png"
              alt="Manu de Quevedo"
              className="block h-auto w-full select-none"
              draggable={false}
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
