"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { FadeIn } from "./FadeIn";
import { LiveProjectButton } from "./LiveProjectButton";
import { LANDING_PROJECTS, type LandingProject } from "@/lib/landing";

const RADIUS = "rounded-[40px] sm:rounded-[50px] md:rounded-[60px]";

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: LandingProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const t = useTranslations("landing");
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="sticky top-24 h-[85vh] md:top-32">
      <motion.article
        style={{ scale, top: `${index * 28}px`, background: "#0C0C0C" }}
        className={`relative flex origin-top flex-col gap-6 border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 ${RADIUS}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-8">
            <span
              className="font-black leading-none text-[#D7E2EA]"
              style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}>
              {number}
            </span>
            <div className="flex flex-col gap-1 text-[#D7E2EA]">
              <span className="text-xs font-light uppercase tracking-widest opacity-60 sm:text-sm">
                {t(`projects.categories.${project.category}`)}
              </span>
              <h3
                className="font-medium uppercase"
                style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}>
                {project.name}
              </h3>
            </div>
          </div>
          {project.link ? (
            <LiveProjectButton label={t("projects.live")} href={project.link} />
          ) : (
            <span className="rounded-full border-2 border-[#D7E2EA]/30 px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/50 sm:px-10 sm:py-3.5 sm:text-base">
              {t("projects.soon")}
            </span>
          )}
        </div>

        <div className="flex gap-3 sm:gap-4">
          <div className="flex w-[40%] flex-col gap-3 sm:gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className={`w-full object-cover object-top ${RADIUS}`}
              style={{ height: "clamp(130px, 16vw, 230px)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt=""
              loading="lazy"
              className={`w-full object-cover object-bottom ${RADIUS}`}
              style={{ height: "clamp(160px, 22vw, 340px)" }}
            />
          </div>
          <div className="w-[60%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.name}
              loading="lazy"
              className={`h-full w-full object-cover object-center ${RADIUS}`}
              style={{ minHeight: "clamp(300px, 40vw, 590px)" }}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

// ProjectsSection stacks sticky project cards that shrink slightly as the next one slides over them.
export function ProjectsSection() {
  const t = useTranslations("landing");
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 pb-32 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <FadeIn>
        <h2
          className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>
          {t("projects.title")}
        </h2>
      </FadeIn>

      <div ref={container} className="mx-auto max-w-7xl">
        {LANDING_PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            total={LANDING_PROJECTS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
