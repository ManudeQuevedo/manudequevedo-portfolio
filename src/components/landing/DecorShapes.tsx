"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

// Gradient defs shared by the shapes; pure white-to-black gradients (no color).
function Defs() {
  return (
    <defs>
      <linearGradient id="d-purple" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="55%" stopColor="#8A9099" />
        <stop offset="100%" stopColor="#050505" />
      </linearGradient>
      <linearGradient id="d-magenta" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E6EBEF" />
        <stop offset="55%" stopColor="#4A4E55" />
        <stop offset="100%" stopColor="#030303" />
      </linearGradient>
      <linearGradient id="d-orange" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="55%" stopColor="#A9B0B8" />
        <stop offset="100%" stopColor="#0A0A0A" />
      </linearGradient>
      <linearGradient id="d-steel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="55%" stopColor="#C4CBD2" />
        <stop offset="100%" stopColor="#2A2D32" />
      </linearGradient>
      <radialGradient id="d-gloss" cx="0.3" cy="0.25" r="0.5">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 200" className="h-auto w-full" aria-hidden="true">
      <Defs />
      {children}
    </svg>
  );
}

export function Sphere() {
  return (
    <Svg>
      <circle cx="100" cy="100" r="80" fill="url(#d-purple)" />
      <circle cx="100" cy="100" r="80" fill="url(#d-gloss)" />
    </Svg>
  );
}

export function Torus() {
  return (
    <Svg>
      <circle cx="100" cy="100" r="62" fill="none" stroke="url(#d-orange)" strokeWidth="34" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="url(#d-gloss)" strokeWidth="10" strokeDasharray="120 400" />
    </Svg>
  );
}

export function Cube() {
  return (
    <Svg>
      <polygon points="100,22 172,62 100,102 28,62" fill="url(#d-steel)" />
      <polygon points="28,62 100,102 100,182 28,142" fill="url(#d-magenta)" />
      <polygon points="172,62 100,102 100,182 172,142" fill="url(#d-purple)" />
      <polygon points="100,22 172,62 100,102 28,62" fill="url(#d-gloss)" opacity="0.6" />
    </Svg>
  );
}

export function Pyramid() {
  return (
    <Svg>
      <polygon points="100,18 176,170 100,142" fill="url(#d-orange)" />
      <polygon points="100,18 100,142 24,170" fill="url(#d-magenta)" />
      <polygon points="24,170 100,142 176,170 100,186" fill="url(#d-steel)" />
    </Svg>
  );
}

// Float adds a slow, offset bobbing + tilt so the shapes feel like floating 3D objects.
export function Float({
  children,
  duration = 6,
  rotate = 8,
}: {
  children: ReactNode;
  duration?: number;
  rotate?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div>{children}</div>;

  return (
    <motion.div
      animate={{ y: [0, -14, 0], rotate: [-rotate, rotate, -rotate] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}
