"use client";

import { useState } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
}

// ScrambleText reveals copy through a short terminal-like scramble on hover.
export function ScrambleText({
  text,
  className = "",
  duration = 400,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$*&";

  const scramble = () => {
    let start = Date.now();

    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);

      // Reveal correct characters from left to right based on progress
      const revealCount = Math.floor(progress * text.length);

      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < revealCount) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  return (
    <span className={className} onMouseEnter={scramble}>
      {displayText}
    </span>
  );
}
