"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useSyncExternalStore, type RefObject } from "react";
import { useTranslations } from "next-intl";
import { FadeIn } from "./FadeIn";
import { LiveProjectButton } from "./LiveProjectButton";
import { LANDING_PROJECTS, type LandingProject } from "@/lib/landing";

// Card radius, and image radius: smaller on phones so small images don't turn into pills.
const CARD_RADIUS = "rounded-[28px] sm:rounded-[50px] md:rounded-[60px]";
const IMG_RADIUS = "rounded-2xl sm:rounded-[32px] md:rounded-[40px] lg:rounded-[60px]";

// How the stacking "shrink" is driven:
//  - "css": CSS scroll-driven animations (compositor, in sync with scrolling). No JS scroll work.
//  - "js":  Framer Motion, only for pointer devices without CSS support (desktop scroll is in sync).
//  - "off": no shrink (touch devices without CSS support, or reduced motion).
type ScaleMode = "css" | "js" | "off";

function getScaleMode(): ScaleMode {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "off";
  if (CSS.supports("animation-timeline", "view()")) return "css";
  return window.matchMedia("(pointer: coarse)").matches ? "off" : "js";
}

const noopSubscribe = () => () => {};

// JsProgress is mounted only in "js" mode, so no scroll listener exists otherwise.
function JsProgress({
  target,
  progress,
}: {
  target: RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
}) {
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (value) => progress.set(value));
  return null;
}

function ProjectCard({
  project,
  index,
  total,
  progress,
  mode,
}: {
  project: LandingProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
  mode: ScaleMode;
}) {
  const t = useTranslations("landing");
  const from = index / total;
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [from, 1], [1, targetScale]);
  const number = String(index + 1).padStart(2, "0");
  const [small, smallBottom, main] = project.images;

  return (
    <div className="sticky top-24 min-h-[85vh] md:top-32">
      <motion.article
        // --stack-from / --stack-target feed the CSS scroll-driven animation (see globals.css).
        style={
          {
            top: `${index * 28}px`,
            background: "#0C0C0C",
            "--stack-from": `${from * 100}%`,
            "--stack-target": targetScale,
            ...(mode === "js" ? { scale } : null),
          } as React.CSSProperties
        }
        className={`project-card relative flex origin-top flex-col gap-4 border-2 border-[#D7E2EA] p-4 sm:gap-6 sm:p-6 md:p-8 ${CARD_RADIUS}`}>
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

        {/*
          Phones and small tablets: the main image on top, the two small ones side by side, all 16:10
          (the screenshots' own ratio) so nothing is cropped.
          From md: two columns, small images stacked on the left and the main one on the right.
        */}
        <div className="flex flex-col gap-3 sm:gap-4 md:flex-row">
          <div className="md:order-2 md:w-[60%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={main.src}
              alt={project.name}
              loading="lazy"
              decoding="async"
              width={1280}
              height={800}
              className={`aspect-[16/10] w-full object-cover md:aspect-auto md:h-full md:min-h-[clamp(300px,40vw,590px)] ${IMG_RADIUS}`}
              style={{ objectPosition: main.position }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:order-1 md:flex md:w-[40%] md:flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={small.src}
              alt=""
              loading="lazy"
              decoding="async"
              width={840}
              height={525}
              className={`aspect-[16/10] w-full object-cover md:aspect-auto md:h-[clamp(130px,16vw,230px)] ${IMG_RADIUS}`}
              style={{ objectPosition: small.position }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={smallBottom.src}
              alt=""
              loading="lazy"
              decoding="async"
              width={840}
              height={525}
              className={`aspect-[16/10] w-full object-cover md:aspect-auto md:h-[clamp(160px,22vw,340px)] ${IMG_RADIUS}`}
              style={{ objectPosition: smallBottom.position }}
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
  const progress = useMotionValue(0);
  const mode = useSyncExternalStore<ScaleMode>(noopSubscribe, getScaleMode, () => "css");

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

      <div ref={container} className="project-stack mx-auto max-w-7xl">
        {mode === "js" ? <JsProgress target={container} progress={progress} /> : null}
        {LANDING_PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            total={LANDING_PROJECTS.length}
            progress={progress}
            mode={mode}
          />
        ))}
      </div>
    </section>
  );
}
