"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionContainer } from "@/components/layout/SectionContainer";

// AnimatedStatNumber counts into view for the quick identity cards in the about section.
function AnimatedStatNumber({
  value,
  className,
}: {
  value: string;
  className: string;
}) {
  const numberRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(numberRef, { once: true, amount: 0.6 });
  const numericValue = Number.parseInt(value.replace(/[^\d]/g, ""), 10);
  const prefix = value.match(/^[^\d]+/)?.[0] ?? "";
  const suffix = value.match(/[^\d]+$/)?.[0] ?? "";
  const initialValue = Number.isFinite(numericValue)
    ? `${prefix}0${suffix}`
    : value;
  const targetValue = Number.isFinite(numericValue)
    ? `${prefix}${numericValue}${suffix}`
    : value;
  const [displayValue, setDisplayValue] = useState(initialValue);

  useEffect(() => {
    if (!Number.isFinite(numericValue)) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) {
      setDisplayValue(initialValue);
      return;
    }

    const controls = animate(0, numericValue, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(`${prefix}${Math.round(latest)}${suffix}`);
      },
      onComplete: () => {
        setDisplayValue(targetValue);
      },
    });

    return () => controls.stop();
  }, [initialValue, isInView, numericValue, prefix, suffix, targetValue, value]);

  return (
    <h4 ref={numberRef} className={className}>
      {displayValue}
    </h4>
  );
}

// About introduces Manu with proof points and narrative copy that anchor the rest of the portfolio.
export function About() {
  const t = useTranslations("about");
  const revealViewport = { once: true, amount: 0.1 } as const;
  const headline = t("headline");
  const highlightedText = t("headline_highlight");
  const hasHighlightedText = headline.includes(highlightedText);
  const identityKeys = ["years", "projects", "lighthouse", "agency"] as const;

  return (
    <SectionContainer
      id="about"
      className="border-t border-[color:var(--border-muted)] bg-[var(--bg-2)]"
      containerClassName="flex flex-col gap-20 md:gap-32">
      <div className="grid md:grid-cols-[40%_60%] gap-12 md:gap-24">
        {/* Left Column - Identity Cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: "easeOut" }}>
          <SectionLabel label={t("label")} />

          <div className="mt-12 md:hidden">
            <div className="grid grid-cols-2 overflow-hidden rounded-sm border border-white/10 bg-[#0A0A0A]">
              {identityKeys.map((key, i) => {
                const item = t.raw(`identity.${key}`);
                const dividerClasses = `${i % 2 === 1 ? "border-l border-white/10" : ""} ${i > 1 ? "border-t border-white/10" : ""}`;
                const contextTone =
                  key === "lighthouse" ? "text-brand/80" : "text-white/65";
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={revealViewport}
                    transition={{
                      duration: 0.45,
                      delay: i * 0.06,
                      ease: "easeOut",
                    }}
                    className={`flex h-40 w-full flex-col justify-between px-4 py-4 ${dividerClasses}`}>
                    <AnimatedStatNumber
                      value={item.number}
                      className="font-display text-4xl font-bold leading-none text-brand"
                    />
                    <div>
                      <p className="font-body text-sm font-medium text-white">
                        {item.label}
                      </p>
                      <p
                        className={`mt-1 font-body text-[11px] leading-snug ${contextTone}`}>
                        {item.context}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 hidden md:grid md:grid-cols-2 gap-4">
            {identityKeys.map((key, i) => {
              const item = t.raw(`identity.${key}`);
              const contextTone =
                key === "lighthouse"
                  ? "text-brand"
                  : "text-brand/80 group-hover:text-brand";
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={revealViewport}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.08,
                    ease: "easeOut",
                  }}
                  className="bg-[#0A0A0A] border border-[#111] rounded-sm p-5 md:p-6 hover:border-brand/20 transition-all duration-300 group flex flex-col justify-between min-h-[180px]">
                  <AnimatedStatNumber
                    value={item.number}
                    className="font-display text-4xl md:text-5xl font-bold text-white mb-4"
                  />
                  <div>
                    <p className="font-body text-[10px] md:text-[11px] uppercase tracking-wider text-[#555] mb-2 font-semibold">
                      {item.label}
                    </p>
                    <p
                      className={`font-body text-xs md:text-sm transition-colors ${contextTone}`}>
                      {item.context}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column - Philosophy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center lg:justify-start lg:pl-12">
          <div className="max-w-[90vw] md:max-w-lg">
            <h3 className="font-body text-[clamp(1.5rem,6.8vw,2rem)] md:text-3xl font-medium leading-[1.55] md:leading-[1.6] mb-12 text-primary">
              {hasHighlightedText
                ? headline.split(highlightedText).map((part, i) => (
                    <span key={i}>
                      {part}
                      {i === 0 && (
                        <span className="relative inline-block text-brand">
                          {highlightedText}
                          <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={revealViewport}
                            transition={{
                              duration: 0.7,
                              delay: 0.35,
                              ease: "easeOut",
                            }}
                            className="absolute bottom-1 left-0 w-full h-[2px] bg-brand origin-left"
                          />
                        </span>
                      )}
                    </span>
                  ))
                : headline}
            </h3>
            <p className="text-[rgba(255,255,255,0.82)] text-base md:text-lg leading-relaxed">
              {t("body")}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Principles - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-0 mt-12 md:mt-24">
        {(t.raw("principles") as any[]).map((principle, index) => (
          <div
            key={index}
            className="flex flex-col sm:px-8 first:pl-0 last:pr-0 sm:border-r border-[#111] last:border-0 border-b pb-8 sm:border-b-0 sm:pb-0">
            <span className="font-display text-5xl md:text-6xl text-[#1A1A1A] font-bold select-none mb-6">
              {principle.number}
            </span>
            <h5 className="font-display text-lg md:text-xl text-white font-medium mb-4">
              {principle.title}
            </h5>
            <p className="font-body text-sm md:text-base text-[rgba(255,255,255,0.75)] leading-relaxed max-w-[280px]">
              {principle.body}
            </p>
          </div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
