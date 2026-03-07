"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

// GlitchText adds a controlled distortion pass used for branded emphasis moments.
export function GlitchText({ text, className = "" }: GlitchTextProps) {
  return (
    <div
      className={`relative group inline-block ${className}`}
      data-text={text}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 text-brand opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 text-cyan-400 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2">
        {text}
      </span>
    </div>
  );
}
