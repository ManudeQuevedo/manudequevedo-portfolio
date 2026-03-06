"use client";

import {
  motion,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

type CursorState = "default" | "hover" | "project" | "image" | "email";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isDesktop, setIsDesktop] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");

  // Smooth movement for the outer ring
  const ringX = useSpring(useMotionValue(0), { damping: 30, stiffness: 300 });
  const ringY = useSpring(useMotionValue(0), { damping: 30, stiffness: 300 });

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const updateDesktopState = () => {
      const enabled = media.matches;
      setIsDesktop(enabled);
      document.body.classList.toggle("has-custom-cursor", enabled);
    };

    updateDesktopState();
    media.addEventListener("change", updateDesktopState);
    return () => {
      media.removeEventListener("change", updateDesktopState);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  useEffect(() => {
    let size = 40;
    if (cursorState === "hover") size = 60;
    if (cursorState === "project") size = 80;
    if (cursorState === "image") size = 70;
    if (cursorState === "email") size = 64;

    ringX.set(x - size / 2);
    ringY.set(y - size / 2);
  }, [x, y, cursorState, ringX, ringY]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const emailEl = target.closest(
        'a[href^="mailto"], [data-cursor="email"]',
      );
      if (emailEl) return setCursorState("email");

      const projectEl = target.closest(
        '#projects .group, [data-cursor="project"]',
      );
      if (projectEl) return setCursorState("project");

      const imgEl = target.closest('img, [role="img"], [data-cursor="image"]');
      if (imgEl) return setCursorState("image");

      const hoverEl = target.closest(
        'a, button, [role="button"], [data-cursor="hover"], .interactive',
      );
      if (hoverEl) return setCursorState("hover");

      setCursorState("default");
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

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
          opacity: cursorState === "default" ? 1 : 0,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="border border-white/20 rounded-full fixed top-0 left-0 flex items-center justify-center overflow-hidden"
        style={{ x: ringX, y: ringY }}
        animate={{
          width:
            cursorState === "project"
              ? 80
              : cursorState === "image"
                ? 70
                : cursorState === "email"
                  ? 64
                  : cursorState === "hover"
                    ? 60
                    : 40,
          height:
            cursorState === "project"
              ? 80
              : cursorState === "image"
                ? 70
                : cursorState === "email"
                  ? 64
                  : cursorState === "hover"
                    ? 60
                    : 40,
          backgroundColor:
            cursorState === "project"
              ? "rgba(255, 107, 0, 0.2)"
              : cursorState === "hover"
                ? "rgba(255, 107, 0, 0.1)"
                : "rgba(255, 255, 255, 0)",
          borderColor:
            cursorState !== "default" ? "#FF6B00" : "rgba(255, 255, 255, 0.2)",
        }}>
        <AnimatePresence mode="wait">
          {cursorState === "hover" && (
            <motion.span
              key="hover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[8px] uppercase tracking-widest font-mono text-brand font-bold">
              IR →
            </motion.span>
          )}
          {cursorState === "project" && (
            <motion.span
              key="project"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[10px] font-mono text-brand font-bold uppercase tracking-wider">
              VER
            </motion.span>
          )}
          {cursorState === "image" && (
            <motion.span
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-base text-brand leading-none flex items-center justify-center mt-[-2px]">
              ◎
            </motion.span>
          )}
          {cursorState === "email" && (
            <motion.span
              key="email"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[14px] text-brand uppercase font-mono mt-[-2px]">
              ✉
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
