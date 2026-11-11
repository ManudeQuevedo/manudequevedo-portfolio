"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "./FadeIn";
import { AnimatedText } from "./AnimatedText";
import { ContactButton } from "./ContactButton";

const DECOR = [
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    size: "w-[120px] sm:w-[160px] md:w-[210px]",
    position: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%]",
    delay: 0.1,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    size: "w-[100px] sm:w-[140px] md:w-[180px]",
    position: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]",
    delay: 0.25,
    x: -80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    size: "w-[120px] sm:w-[160px] md:w-[210px]",
    position: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%]",
    delay: 0.15,
    x: 80,
  },
  {
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    size: "w-[130px] sm:w-[170px] md:w-[220px]",
    position: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]",
    delay: 0.3,
    x: 80,
  },
];

// AboutSection pairs the manifesto with a scroll-revealed paragraph and floating decorative objects.
export function AboutSection() {
  const t = useTranslations("landing");

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10">
      {DECOR.map((item) => (
        <div key={item.src} className={`pointer-events-none absolute ${item.position} ${item.size}`}>
          <FadeIn delay={item.delay} x={item.x} y={0} duration={0.9}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt="" loading="lazy" draggable={false} className="h-auto w-full" />
          </FadeIn>
        </div>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading text-center font-black uppercase leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
            {t("about.title")}
          </h2>
        </FadeIn>
        <AnimatedText
          text={t("about.text")}
          className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]"
          style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}
        />
      </div>

      <div className="relative z-10">
        <ContactButton label={t("contactButton")} />
      </div>
    </section>
  );
}
