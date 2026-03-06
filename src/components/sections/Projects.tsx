"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/lib/data";
import Image from "next/image";

export function Projects() {
  const t = useTranslations("projects");
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-20 md:py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionLabel label={t("label")} />
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-20">
          {t("headline")}
        </h2>

        <div className="flex flex-col gap-[10vh] md:gap-0">
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
    </section>
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
      <div
        className="relative h-[40vh] md:h-full bg-dark-3 overflow-hidden group border-b md:border-b-0 md:border-r border-white/5"
        data-cursor="project">
        <Image
          src={`/placeholder-image.png`} // Should use project-specific screenshots in production
          alt={project.title}
          fill
          className="object-cover opacity-40 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700"
        />

        {/* Status Badge */}
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-dark/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <div
            className={`w-1.5 h-1.5 rounded-full ${project.status === "live" ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`}
          />
          <span className="text-[10px] uppercase tracking-widest font-bold">
            {project.status === "live" ? t("live") : t("wip")}
          </span>
        </div>
      </div>

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
