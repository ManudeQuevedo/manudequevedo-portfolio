"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorState, setCursorState] = useState<
    "default" | "hover" | "project"
  >("default");

  // Smooth movement for the outer ring
  const ringX = useSpring(useMotionValue(0), { damping: 20, stiffness: 250 });
  const ringY = useSpring(useMotionValue(0), { damping: 20, stiffness: 250 });

  useEffect(() => {
    setIsDesktop(window.innerWidth > 1024);

    ringX.set(x - 20); // half of 40px
    ringY.set(y - 20);

    const handleHoverStart = () => setCursorState("hover");
    const handleHoverEnd = () => setCursorState("default");
    const handleProjectStart = () => setCursorState("project");

    const interactables = document.querySelectorAll(
      'a, button, [data-cursor="hover"]',
    );
    const projects = document.querySelectorAll('[data-cursor="project"]');

    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    projects.forEach((el) => {
      el.addEventListener("mouseenter", handleProjectStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
      projects.forEach((el) => {
        el.removeEventListener("mouseenter", handleProjectStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [x, y, ringX, ringY]);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Inner Dot */}
      <motion.div
        className="w-2 h-2 bg-brand rounded-full fixed top-0 left-0"
        animate={{
          x: x - 4,
          y: y - 4,
          scale: cursorState === "default" ? 1 : 0.5,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="border border-white/20 rounded-full fixed top-0 left-0 flex items-center justify-center overflow-hidden"
        style={{ x: ringX, y: ringY }}
        animate={{
          width:
            cursorState === "project" ? 80 : cursorState === "hover" ? 60 : 40,
          height:
            cursorState === "project" ? 80 : cursorState === "hover" ? 60 : 40,
          backgroundColor:
            cursorState === "hover"
              ? "rgba(255, 107, 0, 0.2)"
              : "rgba(255, 255, 255, 0)",
          borderColor:
            cursorState === "hover" || cursorState === "project"
              ? "#FF6B00"
              : "rgba(255, 255, 255, 0.2)",
        }}>
        {cursorState === "project" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-bold text-brand uppercase">
            Open →
          </motion.span>
        )}
        {cursorState === "hover" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[10px] font-bold text-brand uppercase">
            View
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
