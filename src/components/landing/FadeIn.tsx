"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Motion wrappers are created once at module level (motion.create) for each supported element type.
const components = {
  div: motion.create("div"),
  section: motion.create("section"),
  h1: motion.create("h1"),
  h2: motion.create("h2"),
  p: motion.create("p"),
  span: motion.create("span"),
};

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: keyof typeof components;
  className?: string;
}

// FadeIn reveals its children once they approach the viewport, with a configurable offset.
export function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = "div",
  className,
}: FadeInProps) {
  const Component = components[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      {children}
    </Component>
  );
}
