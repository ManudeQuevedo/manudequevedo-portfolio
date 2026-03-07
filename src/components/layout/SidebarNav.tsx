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

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

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
    <div
      className="fixed right-4 md:right-6 xl:right-[calc((100vw-1280px)/4)] top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 mix-blend-difference pointer-events-auto"
      style={{ position: "fixed" }}>
      {/* Background Track */}
      <div className="absolute top-3 bottom-3 left-[calc(50%-14px)] w-[1px] bg-white/10 -z-10" />

      {/* Animated Progress Line */}
      <motion.div
        className="absolute top-3 bottom-3 left-[calc(50%-14px)] w-[1px] bg-brand -z-10 origin-top"
        initial={{ scaleY: 0 }}
        animate={{
          scaleY:
            sections.length > 1 ? activeSection / (sections.length - 1) : 0,
        }}
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
            className={`w-10 h-10 flex items-center justify-center text-[10px] md:text-xs font-mono transition-all duration-300 rounded-full ${
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
  );
}
