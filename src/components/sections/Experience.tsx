"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { experience } from "@/lib/data";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface ExperienceCopy {
  company?: string;
  role?: string;
  employmentType?: string;
  period?: string;
  location?: string;
  description?: string;
  highlight?: string;
  details?: string[];
  tags?: string[];
}

export function Experience() {
  const t = useTranslations("experience");
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {},
  );

  const localizedItems = useMemo(() => {
    try {
      return t.raw("items") as Record<string, ExperienceCopy>;
    } catch {
      return {};
    }
  }, [t]);

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
        <p className="text-secondary text-base md:text-lg max-w-3xl mb-16 md:mb-32 leading-relaxed">
          {t("intro")}
        </p>

        <div className="relative">
          {/* Timeline Path */}
          <div className="absolute left-3 md:left-8 top-0 bottom-0 w-[1px] bg-white/5" />

          {/* Progress Fill */}
          <motion.div
            style={{ scaleY: progressHeight }}
            className="absolute left-3 md:left-8 top-0 bottom-0 w-[2px] bg-brand origin-top"
          />

          <div className="space-y-20 md:space-y-32">
            {experience.map((item, i) => (
              (() => {
                const copy = localizedItems[String(item.id)] || {};
                const company = copy.company || item.company;
                const role = copy.role || item.role;
                const employmentType = copy.employmentType || item.employmentType;
                const period = copy.period || item.period;
                const location = copy.location || item.location;
                const description = copy.description || item.description;
                const highlight = copy.highlight || item.highlight;
                const details = copy.details || item.details || [];
                const tags = copy.tags || item.tags;
                const hasExpandableContent = details.length > 0;
                const isExpanded = Boolean(expandedItems[item.id]);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative pl-10 md:pl-20">
                    {/* Pulse Dot */}
                    <div
                      className={`absolute ${item.isFounder ? "left-[-5px] md:left-[1px] top-2" : "left-[-2px] md:left-[5px] top-2"}`}>
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
                          {company}
                        </h3>
                        {item.isFounder && (
                          <span className="px-2 py-0.5 rounded-sm bg-brand/10 text-brand text-[10px] uppercase tracking-wider font-bold border border-brand/20">
                            {t("founder")}
                          </span>
                        )}
                      </div>
                      <p className="text-brand font-medium text-sm md:text-base">
                        {role}
                        {employmentType ? ` · ${employmentType}` : ""}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-tertiary text-xs md:text-sm my-2">
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
                          {period}
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
                          {location}
                        </span>
                      </div>

                      <p className="text-secondary text-sm md:text-base leading-relaxed max-w-2xl mt-2">
                        {description}
                      </p>

                      {hasExpandableContent ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedItems((prev) => ({
                                ...prev,
                                [item.id]: !prev[item.id],
                              }))
                            }
                            className="mt-3 inline-flex w-fit items-center gap-2 text-xs font-mono text-brand border border-brand/25 bg-brand/5 hover:bg-brand/10 rounded-full px-3 py-1.5 transition-colors"
                            aria-expanded={isExpanded}
                            aria-controls={`experience-details-${item.id}`}>
                            <span>{isExpanded ? t("show_less") : t("show_more")}</span>
                            <span>{isExpanded ? "−" : "+"}</span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                id={`experience-details-${item.id}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25, ease: "easeOut" }}
                                className="overflow-hidden">
                                {highlight && (
                                  <div className="flex gap-3 items-start mt-4">
                                    <span className="text-brand font-display font-medium text-lg leading-none mt-0.5">
                                      "
                                    </span>
                                    <p className="text-[#888] italic text-sm md:text-[15px] leading-relaxed max-w-2xl">
                                      {highlight}
                                    </p>
                                  </div>
                                )}

                                <ul className="mt-4 space-y-2.5 max-w-3xl">
                                  {details.map((detail) => (
                                    <li
                                      key={detail}
                                      className="flex items-start gap-2.5 text-secondary text-sm md:text-[15px] leading-relaxed">
                                      <span className="text-brand text-xs mt-[0.38rem]">
                                        ●
                                      </span>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        highlight && (
                          <div className="flex gap-3 items-start mt-3">
                            <span className="text-brand font-display font-medium text-lg leading-none mt-0.5">
                              "
                            </span>
                            <p className="text-[#888] italic text-sm md:text-[15px] leading-relaxed max-w-2xl">
                              {highlight}
                            </p>
                          </div>
                        )
                      )}

                      {item.metricKey && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-brand border border-brand/20 bg-brand/5 rounded-full px-3 py-1 mt-2">
                          <span>↑</span>
                          <span>{t(`metrics.${item.metricKey}`)}</span>
                        </span>
                      )}

                      <div className="flex flex-wrap gap-2 mt-6">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/5 border border-white/5 rounded-sm text-[10px] md:text-xs text-tertiary hover:text-brand hover:border-brand/30 transition-all duration-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })()
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
