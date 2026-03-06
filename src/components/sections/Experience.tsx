"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { experience } from "@/lib/data";
import { SectionContainer } from "@/components/layout/SectionContainer";

export function Experience() {
  const t = useTranslations("experience");
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const progressHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <SectionContainer id="experience" className="min-h-screen py-20 md:py-32">
      <div ref={containerRef}>
        <SectionLabel label={t("label")} />
        <h2
          className="font-display text-4xl md:text-6xl font-bold mb-12"
          aria-label={t("headline")}>
          <TextReveal text={t("headline")} delay={0.2} />
        </h2>
        <p className="text-secondary text-base md:text-lg max-w-3xl mb-32 leading-relaxed">
          {t("intro")}
        </p>

        <div className="relative">
          {/* Timeline Path */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[1px] bg-white/5" />

          {/* Progress Fill */}
          <motion.div
            style={{ scaleY: progressHeight }}
            className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-brand origin-top"
          />

          <div className="space-y-20 md:space-y-32">
            {experience.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-12 md:pl-20">
                {/* Pulse Dot */}
                <div
                  className={`absolute ${item.isFounder ? "left-[-15px] md:left-[1px] top-2" : "left-[-11px] md:left-[5px] top-2"}`}>
                  <div className="relative">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      className={`rounded-full z-10 relative ${item.isFounder ? "w-4 h-4 bg-brand" : "w-3 h-3 border-2 border-brand bg-dark"}`}
                    />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-brand rounded-full -z-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h3
                      className={`font-display text-xl md:text-2xl font-bold ${item.isFounder ? "text-brand" : "text-primary"}`}>
                      {item.company}
                    </h3>
                    {item.isFounder && (
                      <span className="px-2 py-0.5 rounded-sm bg-brand/10 text-brand text-[10px] uppercase tracking-wider font-bold border border-brand/20">
                        Founder
                      </span>
                    )}
                  </div>
                  <p className="text-brand font-medium text-sm md:text-base">
                    {item.role}
                  </p>

                  <div className="flex items-center gap-6 text-tertiary text-xs md:text-sm my-2">
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {item.period}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {item.location}
                    </span>
                  </div>

                  <p className="text-secondary text-sm md:text-base leading-relaxed max-w-2xl mt-2">
                    {item.description}
                  </p>

                  {item.highlight && (
                    <div className="flex gap-3 items-start mt-3">
                      <span className="text-brand font-display font-medium text-lg leading-none mt-0.5">
                        "
                      </span>
                      <p className="text-[#888] italic text-sm md:text-[15px] leading-relaxed max-w-2xl">
                        {item.highlight}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/5 border border-white/5 rounded-sm text-[10px] md:text-xs text-tertiary hover:text-brand hover:border-brand/30 transition-all duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
