// src/components/sections/WorkExperience.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { COMPANY_META } from "@/data/companyMeta";

export type Job = {
  /** RECOMENDADO: id estable que exista en COMPANY_META */
  id?: string;
  company: string;
  title: string;
  href?: string;
  location?: string;
  start?: string;
  end?: string;
  description?: string;
  /** Fallback absoluto/relativo a /public si no hay meta por id */
  logoUrl?: string;
};

export default function WorkExperience({
  items,
  heading = "Work Experience",
}: {
  items: Job[];
  heading?: string;
}) {
  return (
    <section id="work" className="space-y-5">
      <h2 className="text-xl font-semibold">{heading}</h2>
      <div className="space-y-1">
        {items.map((job, idx) => (
          <WorkItem
            key={(job.id ?? job.company) + (job.start ?? idx)}
            job={job}
          />
        ))}
      </div>
    </section>
  );
}

function WorkItem({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);

  // Resuelve src del logo con prioridad:
  // 1) COMPANY_META[job.id]?.logoUrl
  // 2) job.logoUrl
  // 3) /placeholder.svg
  const initialSrc = useMemo(() => {
    const metaSrc = job.id ? COMPANY_META[job.id]?.logoUrl : undefined;
    return (
      (metaSrc && metaSrc.trim().length ? metaSrc : undefined) ??
      (job.logoUrl && job.logoUrl.trim().length ? job.logoUrl : undefined) ??
      "/placeholder.svg"
    );
  }, [job]);

  const [src, setSrc] = useState(initialSrc);
  const [imgErr, setImgErr] = useState(false);

  return (
    <div className="rounded-lg">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg px-2 py-2 hover:bg-accent/50 transition">
        <div className="h-10 w-10 rounded-full border border-border overflow-hidden bg-background flex items-center justify-center shrink-0">
          <Image
            src={src}
            alt={job.company}
            width={40}
            height={40}
            className="object-contain"
            onError={() => {
              if (!imgErr) {
                setImgErr(true);
                setSrc("/placeholder.svg"); // asegúrate de tenerlo en /public
              }
            }}
          />
        </div>

        <div className="min-w-0 text-left">
          <div className="font-medium">
            {job.href ? (
              <a
                href={job.href}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
                onClick={(e) => e.stopPropagation()}>
                {job.company}
              </a>
            ) : (
              job.company
            )}
          </div>
          <div className="text-sm text-foreground/80">{job.title}</div>
        </div>

        <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
          <div>
            {job.start} — {job.end}
          </div>
          {job.location ? <div className="mt-1">{job.location}</div> : null}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden">
            <div className="pl-[3.75rem] pr-2 pb-3 pt-1 text-sm text-muted-foreground leading-7 whitespace-pre-line">
              {job.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
