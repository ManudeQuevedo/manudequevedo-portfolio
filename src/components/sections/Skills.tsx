"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { skills } from "@/lib/data";
import { SectionContainer } from "@/components/layout/SectionContainer";

interface Skill {
  name: string;
  level: string | null;
  context: string | null;
}

const CategoryIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "frontend":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      );
    case "cloud":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      );
    case "security":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      );
    case "ai":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      );
    case "tools":
      return (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export function Skills() {
  const t = useTranslations("skills");
  const [activeTab, setActiveTab] = useState("frontend");

  const categories = Object.entries(skills);

  return (
    <SectionContainer
      id="skills"
      className="py-20 md:py-32 bg-dark-2 border-y border-white/5">
      <SectionLabel label={t("label")} />
      <h2
        className="font-display text-4xl md:text-6xl font-bold mb-12 md:mb-32 max-w-2xl"
        aria-label={t("headline")}>
        <TextReveal text={t("headline")} delay={0.2} />
      </h2>

      <div className="flex flex-col md:flex-row border border-white/5 bg-dark rounded-xl md:rounded-2xl overflow-hidden min-h-[500px]">
        {/* Left Panel: Tabs */}
        <div className="w-full md:w-[40%] grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col border-b md:border-b-0 md:border-r border-white/5 bg-dark-3/50">
          {categories.map(([category, items]) => {
            const isActive = activeTab === category;
            return (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`flex items-center gap-4 px-5 sm:px-6 md:px-8 py-4 md:py-5 transition-all duration-300 text-left relative ${
                  isActive
                    ? "bg-dark-2 text-primary border-l-2 md:border-l-4 border-l-brand"
                    : "text-tertiary hover:text-secondary border-l-2 md:border-l-4 border-transparent hover:bg-white/5"
                }`}>
                <div className={isActive ? "text-brand" : "text-tertiary"}>
                  <CategoryIcon name={category} />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-display text-sm font-bold tracking-[0.15em] uppercase">
                    {t(`categories.${category}`)}
                  </h4>
                  <span className="text-[10px] font-mono tracking-widest uppercase mt-0.5 opacity-60">
                    {items.length} Skills
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Panel: Tab Content */}
        <div className="w-full md:w-[60%] p-6 md:p-12 relative overflow-hidden bg-dark">
          <AnimatePresence mode="wait">
            {categories.map(
              ([category, items]) =>
                activeTab === category && (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="h-full flex flex-col">
                    <h3 className="font-display text-2xl md:text-3xl font-bold mb-12 text-primary uppercase tracking-wide">
                      {t(`categories.${category}`)}
                    </h3>

                    <ul className="space-y-6 flex-1">
                      {items
                        .filter((s) => (s as any).level)
                        .map((skill, i) => (
                          <li key={skill.name} className="flex flex-col gap-2">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-sm md:text-base font-medium text-secondary">
                                {skill.name}
                              </span>
                              <span
                                className={`text-[10px] md:text-xs uppercase tracking-wider font-bold ${
                                  skill.level === "expert"
                                    ? "text-brand"
                                    : skill.level === "proficient"
                                      ? "text-brand/70"
                                      : "text-tertiary"
                                }`}>
                                {skill.level}
                              </span>
                            </div>

                            {skill.context && (
                              <span className="text-xs text-tertiary/80 leading-snug">
                                {skill.context}
                              </span>
                            )}

                            {/* Progress Bar Container */}
                            <div className="h-[2px] bg-white/5 w-full mt-1 overflow-hidden relative rounded-full">
                              {/* The animated fill */}
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{
                                  width:
                                    skill.level === "expert"
                                      ? "100%"
                                      : skill.level === "proficient"
                                        ? "70%"
                                        : "40%",
                                }}
                                transition={{
                                  duration: 0.6,
                                  delay: i * 0.05,
                                  ease: "easeOut",
                                }}
                                className={`absolute top-0 left-0 h-full origin-left rounded-full ${
                                  skill.level === "expert"
                                    ? "bg-brand"
                                    : skill.level === "proficient"
                                      ? "bg-brand/80"
                                      : "bg-tertiary/50"
                                }`}
                              />
                            </div>
                          </li>
                        ))}
                    </ul>

                    {/* Secondary Skills Tags */}
                    {items.filter((s) => !(s as any).level).length > 0 && (
                      <div className="mt-8 pt-6 border-t border-white/5">
                        <div className="flex flex-wrap gap-2">
                          {items
                            .filter((s) => !(s as any).level)
                            .map((skill) => (
                              <span
                                key={skill.name}
                                className="text-[10px] font-mono text-tertiary px-3 py-1.5 bg-white/5 border border-white/5 rounded-full cursor-default">
                                {skill.name}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-24 text-center text-sm text-tertiary italic font-body">
        {t("categories.tools") === "Tools"
          ? "(Open to learning new technologies and adapting quickly to change.)"
          : "(Abierto a aprender nuevas tecnologías y adaptarme rápidamente al cambio.)"}
      </motion.p>
    </SectionContainer>
  );
}
