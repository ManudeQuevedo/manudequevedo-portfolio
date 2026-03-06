"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TextReveal } from "@/components/ui/TextReveal";
import { projects } from "@/lib/data";
import Image from "next/image";
import { SectionContainer } from "@/components/layout/SectionContainer";

export function Projects() {
  const t = useTranslations("projects");
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <SectionContainer id="projects" className="py-20 md:py-32">
      <div ref={containerRef}>
        <SectionLabel label={t("label")} />
        <h2
          className="font-display text-4xl md:text-6xl font-bold mb-32"
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

function ProjectCard({
  project,
  index,
  total,
}: {
  project: any;
  index: number;
  total: number;
}) {
  const t = useTranslations("projects");
  const cardRef = useRef<HTMLDivElement>(null);

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
      className="md:sticky md:top-[15vh] w-full min-h-[60vh] md:h-[80vh] bg-dark-2 rounded-t-2xl md:rounded-t-[32px] border-t border-white/5 overflow-hidden grid md:grid-cols-[55%_45%]">
      {/* Visual Mockup Side */}
      <motion.div
        whileHover="hover"
        initial="rest"
        className="relative h-[40vh] md:h-full bg-dark-3 overflow-hidden group border-b md:border-b-0 md:border-r border-white/5"
        data-cursor="project">
        <Image
          src={project.image}
          alt={project.title}
          fill
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
            className="text-center font-display text-xl md:text-2xl text-brand italic font-medium mb-8 max-w-sm">
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
            <span className="bg-brand text-dark font-mono text-xs px-6 py-2 rounded-full font-bold uppercase tracking-wider shadow-lg">
              VER PROYECTO →
            </span>
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
      <div className="p-8 md:p-16 flex flex-col justify-between relative">
        <div className="absolute top-8 right-8 text-8xl font-display font-black text-white/[0.03] select-none">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div>
          <span className="text-xs text-tertiary font-medium mb-2 block">
            {project.year}
          </span>
          <h3 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6">
            {project.title}
          </h3>
          <p className="text-secondary text-base leading-relaxed mb-8 max-w-sm">
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

          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.map((tag: any) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/5 border border-white/5 rounded-sm text-[10px] text-tertiary">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          {project.link && (
            <a
              href={project.link}
              className="text-primary hover:text-brand text-sm font-medium flex items-center gap-2 group transition-colors"
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
              className="text-secondary hover:text-primary text-sm font-medium transition-colors"
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
