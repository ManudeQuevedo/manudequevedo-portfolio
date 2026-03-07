"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCaseStudyModal } from "@/components/providers/CaseStudyModalProvider";
import type { CaseStudy, PainPoint } from "@/lib/data";
import { getLenisInstance } from "@/lib/lenis";

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
const painPointEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function getSeverityStyles(severity: PainPoint["severity"]) {
  if (severity === "critical") {
    return {
      labelClass: "text-red-400",
      borderClass: "border-l-red-400",
    };
  }

  if (severity === "major") {
    return {
      labelClass: "text-amber-400",
      borderClass: "border-l-amber-400",
    };
  }

  return {
    labelClass: "text-secondary",
    borderClass: "border-l-white/30",
  };
}

export function CaseStudyModal() {
  const { isOpen, project, closeModal, lastTriggerRef } = useCaseStudyModal();
  const projectsT = useTranslations("projects");
  const t = useTranslations("projects.modal");

  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const hadOpenedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const caseStudy = useMemo(() => {
    if (!project) return null;

    try {
      return projectsT.raw(
        `caseStudies.${project.caseStudyKey}`,
      ) as CaseStudy;
    } catch {
      return project.caseStudy;
    }
  }, [project, projectsT]);
  const liveLink = project?.link && project.link !== "#" ? project.link : null;

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const lenis = getLenisInstance();

    lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      hadOpenedRef.current = true;
      return;
    }

    if (hadOpenedRef.current && lastTriggerRef.current) {
      lastTriggerRef.current.focus();
      hadOpenedRef.current = false;
    }
  }, [isOpen, lastTriggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") return;

      const container = modalRef.current;
      if (!container) return;

      const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((node) => !node.hasAttribute("disabled"));

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const activeElement =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      if (event.shiftKey) {
        if (!activeElement || activeElement === first) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (!activeElement || activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && project && caseStudy && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={closeModal}
            aria-hidden="true"
          />

          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            data-lenis-prevent
            data-lenis-prevent-wheel
            className="fixed inset-0 z-[100] overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <div
              className="min-h-full flex items-start justify-center p-3 sm:p-4 md:p-8 lg:p-12"
              onClick={closeModal}>
              <motion.div
                ref={modalRef}
                className="relative w-full max-w-4xl bg-[var(--bg-2)] border border-[var(--border-muted)] rounded-xl md:rounded-[28px] overflow-hidden"
                initial={{ y: 32, scale: 0.97, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 16, scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(event) => event.stopPropagation()}>
                <header className="sticky top-0 z-20 bg-[var(--bg-3)] border-b border-[var(--border-muted)] px-5 sm:px-6 md:px-10 py-5 md:py-6 pr-16 md:pr-20 backdrop-blur-md">
                  <button
                    ref={closeButtonRef}
                    onClick={closeModal}
                    className="absolute top-4 md:top-5 right-4 md:right-5 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-secondary hover:text-primary transition-all duration-150"
                    aria-label={t("close_case_study")}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 1L13 13M13 1L1 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-tertiary">
                        {project.year}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.scope.map((scopeItem) => (
                          <span
                            key={scopeItem}
                            className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-mono uppercase tracking-[0.12em] text-secondary">
                            {scopeItem}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                      <div>
                        <h2
                          id="case-study-title"
                          className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary">
                          {project.title}
                        </h2>
                        <p className="mt-2 font-mono text-xs text-secondary">
                          {caseStudy.role} · {caseStudy.duration}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {liveLink && (
                          <a
                            href={liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-primary hover:text-brand transition-colors"
                            data-cursor="hover">
                            {t("live_site")} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </header>

                <section className="px-5 sm:px-6 md:px-10 py-7 md:py-8">
                  <p className="text-[10px] uppercase tracking-widest text-brand font-bold mb-3">
                    {t("overview")}
                  </p>
                  <p className="text-secondary text-sm md:text-base leading-relaxed">
                    {caseStudy.overview}
                  </p>
                </section>

                <section className="px-5 sm:px-6 md:px-10 pb-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
                    {caseStudy.results.map((result) => (
                      <div
                        key={`${result.label}-${result.value}`}
                        className="bg-[var(--bg-3)] p-3 sm:p-4 md:p-5 flex flex-col gap-1">
                        <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-none">
                          {result.value}
                        </span>
                        <span className="text-xs text-secondary mt-1">
                          {result.label}
                        </span>
                        {result.description && (
                          <span className="text-[10px] text-tertiary mt-0.5">
                            {result.description}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <section className="px-5 sm:px-6 md:px-10 pb-8 md:pb-10">
                  <p className="text-[10px] uppercase tracking-widest text-brand font-bold mb-4">
                    {t("pain_points_detected")}
                  </p>

                  <div className="space-y-4">
                    {caseStudy.painPoints.map((painPoint, index) => {
                      const severity = getSeverityStyles(painPoint.severity);

                      return (
                        <motion.article
                          key={painPoint.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.08,
                            duration: 0.4,
                            ease: painPointEase,
                          }}
                          className={`bg-[var(--bg-base)] border border-[var(--border-subtle)] border-l-[3px] ${severity.borderClass} rounded-xl p-4 sm:p-5 md:p-6`}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-xs font-mono uppercase tracking-[0.14em] ${severity.labelClass}`}>
                              ● {t(`severity.${painPoint.severity}`)}
                            </span>
                            <h3 className="text-primary font-medium text-sm sm:text-[15px] md:text-base">
                              {painPoint.title}
                            </h3>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-tertiary font-semibold mb-2">
                                {t("problem")}
                              </p>
                              <p className="text-secondary text-[13px] md:text-sm leading-relaxed">
                                {painPoint.description}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-brand font-semibold mb-2">
                                {t("fix")}
                              </p>
                              <p className="text-secondary text-[13px] md:text-sm leading-relaxed">
                                {painPoint.fix}
                              </p>
                            </div>

                            {painPoint.metric && (
                              <div className="mt-4">
                                <p className="text-[10px] uppercase tracking-widest text-tertiary mb-2">
                                  {painPoint.metric.label}
                                </p>
                                <div className="grid grid-cols-3 gap-px bg-white/5 rounded-lg overflow-hidden">
                                  <div className="bg-[var(--bg-2)] p-3 flex flex-col gap-1">
                                    <span className="text-[9px] uppercase tracking-widest text-tertiary">
                                      {t("before")}
                                    </span>
                                    <span className="font-mono text-xs sm:text-sm font-medium text-secondary">
                                      {painPoint.metric.before}
                                    </span>
                                  </div>
                                  <div className="bg-[var(--bg-2)] p-3 flex flex-col gap-1">
                                    <span className="text-[9px] uppercase tracking-widest text-tertiary">
                                      {t("after")}
                                    </span>
                                    <span className="font-mono text-xs sm:text-sm font-medium text-primary">
                                      {painPoint.metric.after}
                                    </span>
                                  </div>
                                  <div className="bg-[var(--bg-2)] p-3 flex flex-col gap-1">
                                    <span className="text-[9px] uppercase tracking-widest text-tertiary">
                                      {t("delta")}
                                    </span>
                                    <span
                                      className={`font-mono text-xs sm:text-sm font-medium ${painPoint.metric.positive ? "text-emerald-400" : "text-amber-400"}`}>
                                      {painPoint.metric.delta}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </section>

                {caseStudy.testimonial && (
                  <section className="bg-[var(--bg-3)] border-y border-[var(--border-muted)] px-5 sm:px-6 md:px-10 py-7 md:py-8">
                    <div className="border-l-4 border-brand pl-5">
                      <p className="font-display text-lg sm:text-xl md:text-2xl italic text-primary leading-relaxed">
                        &quot;{caseStudy.testimonial.quote}&quot;
                      </p>
                      <p className="font-mono text-xs text-secondary mt-4">
                        — {caseStudy.testimonial.author}, {caseStudy.testimonial.role}
                      </p>
                    </div>
                  </section>
                )}

                <footer className="bg-[var(--bg-3)] border-t border-[var(--border-muted)] px-5 sm:px-6 md:px-10 py-5 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={closeModal}
                    className="text-[11px] md:text-xs font-mono text-secondary hover:text-primary transition-colors"
                    data-cursor="hover">
                    ← {t("back")}
                  </button>

                  <div className="flex items-center gap-4">
                    {liveLink && (
                      <a
                        href={liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] md:text-xs font-mono text-primary hover:text-brand transition-colors"
                        data-cursor="hover">
                        {t("live_site")} ↗
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] md:text-xs font-mono text-secondary hover:text-primary transition-colors"
                        data-cursor="hover">
                        {t("github")} →
                      </a>
                    )}
                  </div>
                </footer>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}
