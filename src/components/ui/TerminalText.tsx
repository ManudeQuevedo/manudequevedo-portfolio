"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalTextProps {
  lines: string[];
  onComplete?: () => void;
  typingSpeed?: number;
  lineDelay?: number;
}

export function TerminalText({
  lines,
  onComplete,
  typingSpeed = 40,
  lineDelay = 800,
}: TerminalTextProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentLine = lines[currentLineIndex];
    let charIndex = 0;
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setDisplayedText(currentLine.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        setTimeout(() => {
          if (currentLineIndex < lines.length - 1) {
            setCurrentLineIndex((prev) => prev + 1);
            setDisplayedText("");
          } else {
            if (onComplete) onComplete();
          }
        }, lineDelay);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, lines, typingSpeed, lineDelay, onComplete]);

  return (
    <div className="font-mono text-xs md:text-sm h-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLineIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center gap-2">
          <span
            className={
              currentLineIndex === 0 ? "text-[#00FF94]" : "text-brand"
            }>
            {displayedText}
          </span>
          {isTyping && (
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-4 bg-primary inline-block"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
