"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// AgencyCta bridges the personal portfolio with the Noctra Studio offer without breaking the scroll rhythm.
export function AgencyCta() {
  const t = useTranslations("projects.agency");

  return (
    <section
      aria-label={t("label")}
      className="bg-[var(--bg-2)] border-y border-[color:var(--border-muted)] py-10 md:py-14 overflow-x-clip md:overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="layout-container">
        <div className="grid gap-10 md:grid-cols-[1.35fr_auto] md:items-center">
          <div className="space-y-5">
            <p className="font-mono text-[11px] tracking-[0.24em] uppercase text-tertiary">
              — {t("label")}
            </p>
            <h3 className="font-display text-[clamp(1.85rem,8vw,2.35rem)] md:text-5xl font-bold text-primary leading-tight max-w-[90vw] md:max-w-none">
              {t("headline")}
            </h3>
            <div className="space-y-1 text-secondary text-sm md:text-base leading-relaxed">
              <p>{t("description_line_1")}</p>
              <p>{t("description_line_2")}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 md:justify-end">
            <a
              href="https://noctra.studio"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex w-full sm:w-auto min-h-11 md:min-h-0 items-center justify-center px-6 py-3 bg-brand text-dark text-sm font-semibold rounded-sm hover:bg-brand/90 transition-colors duration-200">
              {t("primary_cta")}
            </a>
            <a
              href="https://noctra.studio/#contact"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="inline-flex w-full sm:w-auto min-h-11 md:min-h-0 items-center justify-center px-6 py-3 border border-white/10 text-secondary text-sm font-medium rounded-sm hover:border-brand/35 hover:text-white hover:bg-brand/5 transition-all duration-200">
              {t("secondary_cta")}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
