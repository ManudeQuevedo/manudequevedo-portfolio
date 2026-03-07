"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { projects, type Project } from "@/lib/data";
import Image from "next/image";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { useCaseStudyModal } from "@/components/providers/CaseStudyModalProvider";
import { getBlurDataUrl } from "@/lib/image";

const projectCardBlur = getBlurDataUrl({
  background: "#080808",
  highlight: "#f97316",
});

// Projects renders the sticky case-study stack that powers the portfolio's
// storytelling section and hands details off to the modal provider.
export function Projects() {
  const t = useTranslations("projects");
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionContainer id="projects" className="py-20 md:py-32">
      <div ref={containerRef}>
        <SectionLabel label={t("label")} />
        <h2
          className="font-display text-[clamp(2rem,9vw,2.6rem)] md:text-6xl font-bold mb-16 md:mb-32 max-w-[90vw] md:max-w-none leading-tight"
          aria-label={t("headline")}>
          <TextReveal text={t("headline")} delay={0.2} />
        </h2>

        <div className="flex flex-col gap-20 md:gap-0">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}

// ProjectCard is the interactive unit for each case study, balancing heavy
// imagery with stable layout and lazy-loaded details.
function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const t = useTranslations("projects");
  const modalT = useTranslations("projects.modal");
  const { openModal } = useCaseStudyModal();
  const cardRef = useRef<HTMLDivElement>(null);
  const liveLink = project.link && project.link !== "#" ? project.link : null;
  const outcomeText = project.outcomeKey
    ? t(`outcomes.${project.outcomeKey}`)
    : null;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // Stack effect
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, zIndex: (index + 1) * 10 }}
      className="group md:sticky md:top-[15vh] w-full min-h-[70vh] md:h-[80vh] bg-dark-2 rounded-t-2xl md:rounded-t-[32px] border-t border-white/5 overflow-hidden grid grid-cols-1 md:grid-cols-[55%_45%]">
      {/* Visual Mockup Side */}
      <motion.div
        whileHover="hover"
        initial="rest"
        onClick={(event) => openModal(project, event.currentTarget)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(project, event.currentTarget);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={modalT("open_case_study_aria", { project: project.title })}
        className="relative h-[34vh] sm:h-[40vh] md:h-full bg-dark-3 overflow-hidden group border-b md:border-b-0 md:border-r border-white/5"
        data-cursor="project">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 55vw, 100vw"
          quality={72}
          placeholder="blur"
          blurDataURL={projectCardBlur}
          className="object-cover opacity-40 group-hover:scale-105 transition-all duration-700"
        />

        {/* Hover Overlays */}
        {/* Layer 2: Dark Overlay */}
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 0.6 },
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute inset-0 bg-dark pointer-events-none z-10"
        />

        {/* Overlays Container (Layers 3, 4, 5) */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 pointer-events-none">
          {/* Layer 3: Tech Stack */}
          <motion.div
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.25, delay: 0.1, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-[10px] text-white">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Layer 4: Key Metric / Quote */}
          <motion.p
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
            className="text-center font-display text-lg md:text-2xl text-brand italic font-medium mb-8 max-w-sm">
            &quot;{project.solution || project.challenge || project.description}
            &quot;
          </motion.p>

          {/* Layer 5: Button */}
          <motion.div
            variants={{
              rest: { opacity: 0, scale: 0.8 },
              hover: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.3, delay: 0.25, ease: "easeOut" }}>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openModal(project, event.currentTarget);
              }}
              className="bg-brand text-dark font-mono text-xs px-6 py-2 rounded-full font-bold uppercase tracking-wider shadow-lg pointer-events-auto cursor-pointer hover:bg-brand/90 active:scale-95 group-hover:shadow-[0_0_20px_var(--brand-glow)] transition-all duration-150"
              aria-label={modalT("open_case_study_aria", { project: project.title })}>
              {modalT("view_case_study")} →
            </button>
          </motion.div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-dark/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 z-30">
          <div
            className={`w-1.5 h-1.5 rounded-full ${project.status === "live" ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`}
          />
          <span className="text-[10px] uppercase tracking-widest font-bold text-white">
            {project.status === "live" ? t("live") : t("wip")}
          </span>
        </div>
      </motion.div>

      {/* Info Side */}
      <div className="p-6 sm:p-8 md:p-16 flex flex-col justify-between relative">
        <div className="absolute top-8 right-8 text-8xl font-display font-black text-white/[0.03] select-none hidden md:block">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div>
          <span className="text-xs text-tertiary font-medium mb-2 block">
            {project.year}
          </span>
          <h3 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">
            {project.title}
          </h3>
          <p className="text-secondary text-base leading-relaxed mb-8 max-w-xl">
            {project.description}
          </p>

          {(project.challenge || project.solution) && (
            <div className="flex flex-col gap-5 mb-8">
              {project.challenge && (
                <div className="flex flex-col gap-1.5 border-l-2 border-white/10 pl-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#555] font-bold">
                    Challenge
                  </span>
                  <p className="text-sm text-[#888] leading-relaxed max-w-sm">
                    {project.challenge}
                  </p>
                </div>
              )}
              {project.solution && (
                <div className="flex flex-col gap-1.5 border-l-2 border-brand/50 pl-4">
                  <span className="text-[10px] uppercase tracking-widest text-brand font-bold">
                    Solution
                  </span>
                  <p className="text-sm text-secondary leading-relaxed max-w-sm">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {outcomeText && (
            <div className="flex flex-col gap-1.5 border-l-2 border-brand/50 pl-4 mb-8">
              <span className="text-[10px] uppercase tracking-widest text-brand font-bold">
                {t("outcome_label")}
              </span>
              <p className="text-sm text-primary leading-relaxed max-w-sm">
                {outcomeText}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={(event) => openModal(project, event.currentTarget)}
            className="group/btn inline-flex min-h-11 md:min-h-0 w-full md:w-fit items-center justify-center md:justify-start gap-2 text-xs font-mono text-brand border border-brand/20 bg-brand/5 hover:bg-brand/10 hover:border-brand/40 rounded-full px-4 py-2 transition-all duration-200 cursor-pointer mb-8"
            data-cursor="hover"
            aria-label={modalT("open_case_study_aria", { project: project.title })}>
            <span>{modalT("view_case_study")}</span>
            <span className="group-hover/btn:translate-x-0.5 transition-transform duration-150">
              →
            </span>
          </button>

          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/5 rounded-sm text-[10px] text-tertiary">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-8">
          {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 md:min-h-0 items-center gap-2 rounded-md px-3 md:px-0 text-primary hover:text-brand text-sm font-medium group transition-colors"
              data-cursor="hover">
              {t("live")}
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                ↗
              </span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 md:min-h-0 items-center rounded-md px-3 md:px-0 text-secondary hover:text-primary text-sm font-medium transition-colors"
              data-cursor="hover">
              {t("github")}
            </a>
          )}
        </div>
      </div>

      {/* Subtle brand overlay on hover */}
      <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/[0.01] pointer-events-none transition-colors duration-500" />
    </motion.div>
  );
}
