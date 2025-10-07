// src/app/[locale]/blog/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "framer-motion";

const TARGET = new Date("2025-11-01T00:00:00Z"); // 1 Nov 2025 (UTC)

function getTimeLeft(to: Date) {
  const now = new Date();
  const diff = Math.max(0, to.getTime() - now.getTime());

  const sec = Math.floor(diff / 1000);
  const days = Math.floor(sec / (24 * 3600));
  const hours = Math.floor((sec % (24 * 3600)) / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;

  return { days, hours, minutes, seconds, total: diff };
}

export default function BlogComingSoon() {
  const t = useTranslations("sections.blog");
  const prefersReducedMotion = useReducedMotion();

  const [left, setLeft] = useState(() => getTimeLeft(TARGET));

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft(TARGET)), 1000);
    return () => clearInterval(id);
  }, []);

  const fadeUp = useMemo(
    () => ({
      initial: {
        opacity: 0,
        y: prefersReducedMotion ? 0 : 12,
        filter: "blur(4px)",
      },
      animate: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          type: "spring" as const,
          stiffness: 120,
          damping: 16,
          mass: 0.7,
        },
      },
    }),
    [prefersReducedMotion]
  );

  const container = useMemo(
    () => ({
      initial: {},
      animate: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.08,
          delayChildren: prefersReducedMotion ? 0 : 0.05,
        },
      },
    }),
    [prefersReducedMotion]
  );

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <motion.section
      variants={container}
      initial="initial"
      animate="animate"
      className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 px-6">
      <motion.div
        variants={fadeUp}
        className="inline-flex rounded-full bg-foreground text-background text-xs font-semibold px-3 py-1">
        {t("badge")}
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="font-black text-4xl sm:text-5xl md:text-6xl tracking-tight">
        {t("title")}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="max-w-xl text-muted-foreground text-lg leading-relaxed">
        {t("description")}
      </motion.p>

      {/* Countdown */}
      <motion.div variants={fadeUp} aria-live="polite" className="mt-2">
        {left.total === 0 ? (
          <span className="text-sm md:text-base text-muted-foreground">
            {t("liveSoon")}
          </span>
        ) : (
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {[
              { value: left.days, label: t("dd") },
              { value: left.hours, label: t("hh") },
              { value: left.minutes, label: t("mm") },
              { value: left.seconds, label: t("ss") },
            ].map((b, i) => (
              <div
                key={i}
                className="min-w-[64px] sm:min-w-[72px] rounded-xl bg-card/60 px-3 py-2">
                <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums tracking-tight">
                  {pad(b.value)}
                </div>
                <div className="mt-1 text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground">
                  {b.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Pulse sutil (opcional) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{
          opacity: prefersReducedMotion ? 0 : [0.12, 0.22, 0.12],
          scale: prefersReducedMotion ? 1 : [1, 1.02, 1],
        }}
        transition={{
          duration: 3.2,
          repeat: prefersReducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="h-10 w-10 rounded-full bg-foreground/10"
      />
    </motion.section>
  );
}
