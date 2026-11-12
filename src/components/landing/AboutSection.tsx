"use client";

import { useTranslations } from "next-intl";
import { FadeIn } from "./FadeIn";
import { AnimatedText } from "./AnimatedText";
import { ContactButton } from "./ContactButton";
import { Cube, Float, Pyramid, Sphere, Torus } from "./DecorShapes";

const DECOR = [
  { Shape: Sphere, size: "w-[120px] sm:w-[160px] md:w-[210px]", position: "top-[4%] left-[1%] sm:left-[2%] md:left-[4%]", delay: 0.1, x: -80, duration: 6 },
  { Shape: Pyramid, size: "w-[100px] sm:w-[140px] md:w-[180px]", position: "bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]", delay: 0.25, x: -80, duration: 7 },
  { Shape: Torus, size: "w-[120px] sm:w-[160px] md:w-[210px]", position: "top-[4%] right-[1%] sm:right-[2%] md:right-[4%]", delay: 0.15, x: 80, duration: 8 },
  { Shape: Cube, size: "w-[130px] sm:w-[170px] md:w-[220px]", position: "bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]", delay: 0.3, x: 80, duration: 6.5 },
];

// AboutSection pairs the manifesto with a scroll-revealed paragraph and floating decorative objects.
export function AboutSection() {
  const t = useTranslations("landing");

  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center gap-16 px-5 py-20 sm:gap-20 sm:px-8 md:gap-24 md:px-10">
      {DECOR.map(({ Shape, size, position, delay, x, duration }, index) => (
        <div key={index} className={`pointer-events-none absolute ${position} ${size}`}>
          <FadeIn delay={delay} x={x} y={0} duration={0.9}>
            <Float duration={duration}>
              <Shape />
            </Float>
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
