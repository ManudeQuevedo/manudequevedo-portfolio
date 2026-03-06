"use client";

import { useEffect, useState } from "react";

const sections = [
  "hero",
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
];

const formatNumber = (num: number) => String(num).padStart(2, "0");

export function SidebarNav() {
  const [activeSection, setActiveSection] = useState(0);

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
      { threshold: 0.3 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-6 mix-blend-difference pointer-events-auto">
      {sections.map((id, index) => (
        <button
          key={id}
          onClick={() => {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`text-[10px] md:text-xs font-mono font-bold transition-all duration-300 flex items-center justify-end ${
            activeSection === index
              ? "text-brand scale-110"
              : "text-white/20 hover:text-white/80 hover:scale-105"
          }`}
          aria-label={`Scroll to ${id}`}>
          {formatNumber(index + 1)}
        </button>
      ))}
    </div>
  );
}
