"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalTextProps {
  lines: string[];
  onComplete?: () => void;
  typingSpeed?: number;
  lineDelay?: number;
  skip?: boolean;
}

// TerminalText controls the staged typing effect used by the hero intro sequence.
export function TerminalText({
  lines,
  onComplete,
  typingSpeed = 45,
  lineDelay = 1200,
  skip = false,
}: TerminalTextProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const completedRef = useRef(false);

  useEffect(() => {
    if (skip && !completedRef.current) {
      completedRef.current = true;
      setCurrentLineIndex(lines.length - 1);
      setDisplayedText(lines[lines.length - 1]);
      setIsTyping(false);
      onComplete?.();
      return;
    }
  }, [skip, lines, onComplete]);

  useEffect(() => {
    if (skip || completedRef.current) return;

    let isMounted = true;
    const currentLine = lines[currentLineIndex];
    let charIndex = 0;
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        if (isMounted) {
          setDisplayedText(currentLine.substring(0, charIndex + 1));
          charIndex++;
        }
      } else {
        clearInterval(typingInterval);
        if (isMounted) setIsTyping(false);

        setTimeout(() => {
          if (!isMounted) return;
          if (currentLineIndex < lines.length - 1) {
            setCurrentLineIndex((prev) => prev + 1);
            setDisplayedText("");
          } else if (!completedRef.current) {
            completedRef.current = true;
            onComplete?.();
          }
        }, lineDelay);
      }
    }, typingSpeed);

    return () => {
      isMounted = false;
      clearInterval(typingInterval);
    };
  }, [currentLineIndex, lines, typingSpeed, lineDelay, onComplete, skip]);

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
              transition={{ repeat: Infinity, duration: 1.0 }}
              className="w-2 h-4 bg-primary inline-block"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
