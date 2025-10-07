// src/components/sections/Projects.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/project-card";
import { cn } from "@/lib/utils";

type ProjectStatus = "completed" | "in_progress";

type ProjectInput = {
  title: string;
  href?: string;
  dates: string;
  description: string;
  technologies?: string[];
  tags?: string[];
  image?: string;
  links?: { type: string; href: string }[];
  /** NUEVO: preferido */
  status?: ProjectStatus;
  /** Legacy: si existe, se infiere status cuando no hay `status` */
  active?: boolean;
};

const parent = {
  initial: {},
  enter: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function ProjectsSection({
  items = [],
  className,
}: {
  items?: ProjectInput[];
  className?: string;
}) {
  const t = useTranslations("sections");

  const label = t("projects_label");
  const heading = t("projects_title");
  const subheading = t("projects_sub");

  const normalized = (items || []).map((p) => {
    // status: usa p.status si viene; si no, infiere por p.active
    let status: ProjectStatus | undefined = p.status;
    if (!status && typeof p.active === "boolean") {
      status = p.active ? "in_progress" : "completed";
    }

    return {
      title: p.title,
      href: p.href,
      dates: p.dates,
      description: p.description,
      tags: p.tags ?? p.technologies ?? [],
      image: p.image && p.image.length ? p.image : "/placeholder-image.png",
      links: (p.links || []).map((l) => ({ type: l.type, href: l.href })),
      status, // <- se pasa al ProjectCard
    };
  });

  return (
    <section className={cn("space-y-8", className)}>
      <div className="text-center space-y-4">
        <div className="inline-flex rounded-full bg-foreground text-background text-xs font-semibold px-3 py-1">
          {label}
        </div>
        <h2 className="font-black text-4xl sm:text-5xl md:text-6xl leading-tight tracking-tight">
          {heading}
        </h2>
        <p className="mx-auto max-w-3xl text-lg md:text-xl text-muted-foreground">
          {subheading}
        </p>
      </div>

      <motion.div
        variants={parent}
        initial="initial"
        whileInView="enter"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {normalized.map((p) => (
          <ProjectCard key={`${p.title}-${p.dates}`} {...p} />
        ))}
      </motion.div>
    </section>
  );
}
