// src/components/project-card.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Markdown from "react-markdown";
import { motion, useMotionValue, useTransform } from "framer-motion";
import * as React from "react";
import { useTranslations } from "next-intl";

interface LinkItem {
  type: string;
  href: string;
}

type ProjectStatus = "completed" | "in_progress";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string; // (compat)
  links?: readonly LinkItem[];
  className?: string;
  /** NEW: estado del proyecto para badge i18n */
  status?: ProjectStatus;
}

/** Variants para reveal y hover */
const cardVariants = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 14,
      mass: 0.7,
    },
  },
};

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  links = [],
  className,
  status,
}: Props) {
  const t = useTranslations("sections.project_status");

  const ref = React.useRef<HTMLDivElement>(null);

  // Tilt sutil con el mouse (3D)
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const shadow = useTransform([rotateX, rotateY], (values: number[]) => {
    const [rx, ry] = values;
    return `0 18px 30px -12px rgba(0,0,0,${
      0.25 + Math.abs(rx) * 0.001 + Math.abs(ry) * 0.001
    })`;
  });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rX = (0.5 - py) * 6; // tilt vertical
    const rY = (px - 0.5) * 6; // tilt horizontal
    rotateX.set(rX);
    rotateY.set(rY);
  }
  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  const imgSrc = image && image.length > 0 ? image : "/placeholder-image.png";

  // Badge status (i18n + estilos)
  const statusText =
    status === "completed"
      ? t("completed")
      : status === "in_progress"
      ? t("in_progress")
      : null;

  const statusClass =
    status === "completed"
      ? "bg-emerald-500/95 text-emerald-950 ring-1 ring-emerald-600/60"
      : status === "in_progress"
      ? "bg-amber-400/95 text-amber-950 ring-1 ring-amber-500/60"
      : "";

  // Si no hay href (p.ej., in_progress), deshabilitamos navegación principal
  const Wrapper: React.ElementType = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      whileInView="enter"
      viewport={{ once: true, amount: 0.25 }}
      className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: shadow.get(),
        }}
        className={cn(
          "group will-change-transform rounded-2xl border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/75",
          "transition-all duration-300 ease-out",
          "border-border hover:border-foreground/20 hover:shadow-xl",
          "max-h-[500px] flex h-full flex-col",
          className
        )}>
        {/* Glow/border highlight on hover */}
        <div
          className="pointer-events-none absolute inset-px rounded-[calc(theme(borderRadius.2xl)-1px)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,.25), rgba(255,255,255,0))",
          }}
        />

        <Wrapper {...wrapperProps} className="block">
          {/* Imagen con zoom/parallax + badge de status */}
          <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
            {/* Status Badge */}
            {statusText && (
              <span
                className={cn(
                  "absolute left-3 top-3 z-10 rounded-full px-2.5 py-1",
                  "text-[11px] font-semibold tracking-wide",
                  "backdrop-blur supports-[backdrop-filter]:bg-opacity-90",
                  statusClass
                )}>
                {statusText}
              </span>
            )}

            <motion.div
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
              className="h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}>
              <Image
                src={imgSrc}
                alt={title}
                fill
                className="object-cover object-top"
                sizes="(min-width: 768px) 50vw, 100vw"
                priority={false}
              />
            </motion.div>
          </div>
        </Wrapper>

        {/* Contenido; Card rellena el alto restante */}
        <Card className="border-0 bg-transparent shadow-none flex h-full flex-col">
          <CardHeader className="px-4 md:px-5">
            <div className="space-y-1.5">
              <CardTitle className="mt-1 text-lg font-semibold">
                {title}
              </CardTitle>
              <time className="font-sans text-xs text-muted-foreground">
                {dates}
              </time>
              <div className="hidden font-sans text-xs underline print:visible">
                {link
                  ?.replace("https://", "")
                  .replace("www.", "")
                  .replace("/", "")}
              </div>
              <Markdown
                components={{
                  p: ({ node, ...props }) => (
                    <p
                      className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert"
                      {...props}
                    />
                  ),
                }}>
                {description}
              </Markdown>
            </div>
          </CardHeader>

          {/* Empuja el footer hacia abajo */}
          <CardContent className="mt-auto flex flex-col px-4 md:px-5">
            {tags && tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-1.5 py-0.5 text-[10px]">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="px-4 pb-4 md:px-5">
            {links && links.length > 0 && (
              <div className="flex flex-row flex-wrap items-start gap-1.5">
                {links.map((l, idx) => (
                  <Link
                    href={l.href}
                    key={idx}
                    target="_blank"
                    rel="noreferrer">
                    <Badge className="gap-2 px-2 py-1 text-[10px]">
                      {l.type}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
