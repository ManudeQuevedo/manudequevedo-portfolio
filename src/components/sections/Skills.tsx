"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { skills } from "@/lib/data";

interface SkillCategoryProps {
  category: string;
  items: string[];
  icon: React.ReactNode;
  index: number;
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

function SkillCategory({ category, items, icon, index }: SkillCategoryProps) {
  const t = useTranslations("skills");

  return (
    <div className="flex flex-col gap-8 p-8 border-r border-white/5 last:border-r-0">
      <div className="flex items-center gap-4">
        <div className="text-brand">{icon}</div>
        <div className="flex flex-col">
          <span className="text-[10px] text-tertiary font-bold tracking-widest uppercase">
            {items.length} Skills
          </span>
          <h4 className="font-display text-xs font-bold tracking-[0.2em] uppercase text-primary">
            {t(`categories.${category}`)}
          </h4>
        </div>
      </div>

      <ul className="space-y-4">
        {items.map((skill, i) => (
          <motion.li
            key={skill}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 + i * 0.05 }}
            className="group flex items-center justify-between">
            <span className="text-sm text-secondary group-hover:text-primary transition-colors flex items-center gap-0">
              <span className="w-0 overflow-hidden group-hover:w-3 text-brand transition-all duration-300">
                •
              </span>
              {skill}
            </span>
            {/* Decotative Depth Bar */}
            <div className={`h-[1px] bg-white/5 w-8 relative overflow-hidden`}>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                className={`absolute inset-0 origin-left ${i < 3 ? "bg-brand" : "bg-tertiary"}`}
                style={{ width: i < 3 ? "100%" : i < 6 ? "70%" : "40%" }}
              />
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  const t = useTranslations("skills");

  return (
    <section
      id="skills"
      className="py-20 md:py-32 px-6 md:px-20 bg-dark-2 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionLabel label={t("label")} />
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-20 max-w-2xl">
          {t("headline")}
        </h2>

        <div className="grid md:grid-cols-5 border border-white/5 bg-dark">
          {Object.entries(skills).map(([category, items], i) => (
            <SkillCategory
              key={category}
              category={category}
              items={items}
              icon={<CategoryIcon name={category} />}
              index={i}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 text-center text-sm text-tertiary italic font-body">
          {t("categories.tools") === "Tools"
            ? "(Open to learning new technologies and adapting quickly to change.)"
            : "(Abierto a aprender nuevas tecnologías y adaptarme rápidamente al cambio.)"}
        </motion.p>
      </div>
    </section>
  );
}
