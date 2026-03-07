"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { skills } from "@/lib/data";
import { SectionContainer } from "@/components/layout/SectionContainer";

type SkillCategory = keyof typeof skills;
type LevelKey = "expert" | "proficient" | "familiar";

interface SkillItem {
  name: string;
  icon: string;
  level: "Expert" | "Proficient" | "Familiar";
  description: string;
  category: string;
  categoryKey: SkillCategory;
  levelKey: LevelKey;
}

const skillIconSlugs: Record<string, string> = {
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  TailwindCSS: "tailwindcss",
  "Framer Motion": "framer",
  GSAP: "greensock",
  "JavaScript ES6+": "javascript",
  Figma: "figma",
  A11y: "w3c",
  "Performance Optimization": "lighthouse",
  AWS: "amazonwebservices",
  "Cloudflare Workers": "cloudflareworkers",
  Docker: "docker",
  "Serverless (Lambda)": "awslambda",
  "Kubernetes (basic)": "kubernetes",
  "CDN (CloudFront)": "amazoncloudfront",
  "OWASP Top 10": "owasp",
  "Content Security Policy": "letsencrypt",
  XSS: "snyk",
  CSRF: "securityscorecard",
  "Penetration Testing Basics": "kalilinux",
  "Prompt Engineering": "openai",
  GCP: "googlecloud",
  "AI Workflow Automation": "n8n",
  Git: "git",
  "VS Code": "visualstudiocode",
  Vercel: "vercel",
  Supabase: "supabase",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
};

const localSkillIcons: Record<string, string> = {
  A11y: "/icons/skills/a11y.svg",
  AWS: "/icons/skills/aws.svg",
  "Serverless (Lambda)": "/icons/skills/aws-lambda.svg",
  "CDN (CloudFront)": "/icons/skills/cloudfront.svg",
  "Prompt Engineering": "/icons/skills/prompt-engineering.svg",
  GCP: "/icons/skills/gcp.svg",
  "VS Code": "/icons/skills/visual-studio-code.svg",
  "Next.js": "/icons/skills/nextjs.svg",
  "Cloudflare Workers": "/icons/skills/cloudflare.svg",
  "OWASP Top 10": "/icons/skills/owasp.svg",
};

const skillCategories = Object.keys(skills) as SkillCategory[];

function getSimpleIconUrl(skillName: string) {
  const localIcon = localSkillIcons[skillName];
  if (localIcon) {
    return localIcon;
  }
  const slug = skillIconSlugs[skillName] ?? "codefactor";
  return `https://cdn.simpleicons.org/${slug}/FAFAFA`;
}

function mapSkillLevel(level: string | null): LevelKey {
  if (level === "expert") return "expert";
  if (level === "proficient") return "proficient";
  return "familiar";
}

function formatFallbackLetters(name: string) {
  return (
    name
      .split(/[.\s/()+-]+/)
      .filter(Boolean)
      .map((chunk) => chunk[0])
      .join("")
      .slice(0, 3)
      .toUpperCase() || "SK"
  );
}

function SkillIcon({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const fallbackLetters = formatFallbackLetters(name);

  return (
    <div className="h-12 w-12 rounded-md border border-white/5 bg-dark/70 flex items-center justify-center overflow-hidden">
      {!failed ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-7 w-7 object-contain transition-transform duration-200 ease-out group-hover:scale-[1.15] group-focus-visible:scale-[1.15]"
        />
      ) : (
        <span className="text-[11px] font-mono font-semibold tracking-wider text-secondary transition-transform duration-200 ease-out group-hover:scale-[1.15] group-focus-visible:scale-[1.15]">
          {fallbackLetters}
        </span>
      )}
    </div>
  );
}

function getLevelTone(level: LevelKey) {
  if (level === "expert") {
    return { dot: "bg-brand", text: "text-brand" };
  }
  if (level === "proficient") {
    return { dot: "bg-primary", text: "text-primary" };
  }
  return { dot: "bg-tertiary", text: "text-secondary" };
}

export function Skills() {
  const t = useTranslations("skills");
  const [activeCategory, setActiveCategory] = useState<"all" | SkillCategory>(
    "all",
  );

  const levelLabels = useMemo(
    () => ({
      expert: t("levels.expert"),
      proficient: t("levels.proficient"),
      familiar: t("levels.familiar"),
    }),
    [t],
  );

  const skillItems = useMemo(() => {
    const items: SkillItem[] = [];
    skillCategories.forEach((categoryKey) => {
      skills[categoryKey].forEach((skill) => {
        const levelKey = mapSkillLevel(skill.level);
        const level =
          levelKey === "expert"
            ? "Expert"
            : levelKey === "proficient"
              ? "Proficient"
              : "Familiar";

        items.push({
          name: skill.name,
          icon: getSimpleIconUrl(skill.name),
          level,
          description: skill.context ?? t("fallback_context"),
          category: t(`categories.${categoryKey}`),
          categoryKey,
          levelKey,
        });
      });
    });
    return items;
  }, [t]);

  const filteredSkills =
    activeCategory === "all"
      ? skillItems
      : skillItems.filter((skill) => skill.categoryKey === activeCategory);

  return (
    <SectionContainer
      id="skills"
      className="py-20 md:py-32 bg-dark-2 border-y border-white/5">
      <SectionLabel label={t("label")} />
      <h2
        className="font-display text-4xl md:text-6xl font-bold mb-12 md:mb-20 max-w-2xl"
        aria-label={t("headline")}>
        <TextReveal text={t("headline")} delay={0.2} />
      </h2>

      <div className="mb-10 flex flex-wrap items-center gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 text-[11px] md:text-xs uppercase tracking-[0.16em] font-semibold rounded-full border transition-all duration-200 ${
            activeCategory === "all"
              ? "bg-brand text-dark border-brand"
              : "border-white/10 text-secondary bg-white/[0.02] hover:border-brand/40 hover:text-white"
          }`}>
          {t("all")}
        </button>
        {skillCategories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-[11px] md:text-xs uppercase tracking-[0.16em] font-semibold rounded-full border transition-all duration-200 ${
              activeCategory === category
                ? "bg-brand text-dark border-brand"
                : "border-white/10 text-secondary bg-white/[0.02] hover:border-brand/40 hover:text-white"
            }`}>
            {t(`categories.${category}`)}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => {
            const levelTone = getLevelTone(skill.levelKey);

            return (
              <motion.button
                type="button"
                layout
                key={`${skill.categoryKey}-${skill.name}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                  ease: "easeOut",
                }}
                className="group relative flex flex-col items-center justify-center min-h-[108px] px-2 py-4 rounded-lg border border-white/5 bg-dark/70 hover:border-brand/35 hover:bg-dark-3/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand/60 transition-colors duration-200">
                <div className="pointer-events-none absolute left-1/2 top-0 z-20 w-52 -translate-x-1/2 -translate-y-[115%] rounded-md border border-[color:var(--border-muted)] bg-[var(--bg-3)] px-3 py-2.5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.35)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-200">
                  <div className="font-display text-sm font-semibold text-primary leading-tight">
                    {skill.name}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${levelTone.dot}`} />
                    <span
                      className={`text-[10px] uppercase tracking-[0.14em] font-mono ${levelTone.text}`}>
                      {levelLabels[skill.levelKey]}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-secondary leading-snug">
                    {skill.description}
                  </p>
                </div>

                <SkillIcon name={skill.name} src={skill.icon} />
                <span className="mt-2 text-[10px] md:text-[11px] text-secondary text-center leading-tight px-1">
                  {skill.name}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-20 text-center text-sm text-tertiary italic font-body">
        {t("footnote")}
      </motion.p>
    </SectionContainer>
  );
}
