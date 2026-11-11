"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Gradient defs shared by the shapes; palette matches the ContactButton gradient.
function Defs() {
  return (
    <defs>
      <linearGradient id="d-purple" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#D58BFF" />
        <stop offset="55%" stopColor="#7621B0" />
        <stop offset="100%" stopColor="#18011F" />
      </linearGradient>
      <linearGradient id="d-magenta" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF7BF0" />
        <stop offset="50%" stopColor="#B600A8" />
        <stop offset="100%" stopColor="#2A0230" />
      </linearGradient>
      <linearGradient id="d-orange" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFB070" />
        <stop offset="55%" stopColor="#BE4C00" />
        <stop offset="100%" stopColor="#3A1500" />
      </linearGradient>
      <linearGradient id="d-steel" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E8F0F5" />
        <stop offset="55%" stopColor="#646973" />
        <stop offset="100%" stopColor="#15171B" />
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
  return (
    <motion.div
      animate={{ y: [0, -14, 0], rotate: [-rotate, rotate, -rotate] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}
