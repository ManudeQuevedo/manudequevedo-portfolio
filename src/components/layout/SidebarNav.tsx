"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  "hero",
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
];

const sectionLabels = [
  "Hero",
  "Manifiesto",
  "Trayectoria",
  "Proyectos",
  "Arsenal",
  "Contacto",
];

const formatNumber = (num: number) => String(num).padStart(2, "0");

// SidebarNav mirrors scroll progress so desktop and mobile users always have orientation cues.
export function SidebarNav() {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);
  const progressScale =
    sections.length > 1 ? activeSection / (sections.length - 1) : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="fixed top-1/2 z-50 hidden -translate-y-1/2 xl:flex flex-col gap-6 mix-blend-difference pointer-events-auto"
        style={{
          right: "clamp(12px, calc((100vw - var(--layout-max-width)) / 2 - 38px), 64px)",
        }}>
        <div className="absolute top-3 bottom-3 left-[calc(50%-14px)] w-[1px] bg-white/10 -z-10" />
        <motion.div
          className="absolute top-3 bottom-3 left-[calc(50%-14px)] w-[1px] bg-brand -z-10 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: progressScale }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {sections.map((id, index) => (
          <div
            key={id}
            className="relative flex items-center justify-center group"
            onMouseEnter={() => setHoveredSection(index)}
            onMouseLeave={() => setHoveredSection(null)}>
            <AnimatePresence>
              {hoveredSection === index && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-4 bg-dark/90 backdrop-blur-sm text-xs font-mono px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                  {sectionLabels[index]}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => {
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`w-11 h-11 flex items-center justify-center text-[10px] font-mono transition-all duration-300 rounded-full ${
                activeSection === index
                  ? "text-brand scale-125 font-bold bg-brand/10"
                  : "text-white/20 hover:text-white/80 hover:scale-110 hover:bg-white/5"
              }`}
              data-cursor="hover"
              aria-label={`Scroll to ${id}`}>
              {formatNumber(index + 1)}
            </button>
          </div>
        ))}
      </div>

      <div
        className="fixed right-[max(8px,env(safe-area-inset-right))] top-24 bottom-[max(18px,env(safe-area-inset-bottom))] z-40 w-[2px] md:hidden pointer-events-none"
        aria-hidden="true">
        <div className="h-full w-full rounded-full bg-white/12 overflow-hidden">
          <motion.div
            className="w-full h-full bg-brand origin-top"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: progressScale }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        </div>
      </div>
    </>
  );
}
