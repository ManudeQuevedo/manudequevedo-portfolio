"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Removed AnimatePresence as it's no longer needed for this animation pattern

interface IntroOverlayProps {
  onComplete: () => void;
}

// IntroOverlay stages the cinematic greeting before the legacy 3D scene becomes interactive.
export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [text, setText] = useState("");
  const fullText = "Hello Stranger";
  const [phase, setPhase] = useState<
    "typing" | "waiting" | "text-fade-out" | "bg-fade-out" | "complete"
  >("typing");

  useEffect(() => {
    // Phase 1: Typing
    if (phase === "typing") {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setPhase("waiting");
        }
      }, 100);
      return () => clearInterval(interval);
    }

    // Phase 2: Waiting
    if (phase === "waiting") {
      const timer = setTimeout(() => {
        setPhase("text-fade-out");
      }, 1500);
      return () => clearTimeout(timer);
    }

    // Phase 3: Text Fade Out
    if (phase === "text-fade-out") {
      const timer = setTimeout(() => {
        setPhase("bg-fade-out");
        onComplete(); // Trigger camera warp start
      }, 1000); // Text takes 1s to fade
      return () => clearTimeout(timer);
    }

    // Phase 4: BG Fade Out handled by AnimatePresence/Exit or Layout
    if (phase === "bg-fade-out") {
      const timer = setTimeout(() => {
        setPhase("complete");
      }, 1500); // BG takes 1.5s to fade
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  if (phase === "complete") return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black pointer-events-auto"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "bg-fade-out" ? 0 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}>
      <motion.h1
        className="text-4xl md:text-6xl font-mono text-white tracking-widest"
        initial={{ opacity: 1 }}
        animate={{
          opacity: phase === "text-fade-out" || phase === "bg-fade-out" ? 0 : 1,
        }}
        transition={{ duration: 1.0 }}>
        {text}
        <span className="animate-pulse">_</span>
      </motion.h1>
    </motion.div>
  );
}
