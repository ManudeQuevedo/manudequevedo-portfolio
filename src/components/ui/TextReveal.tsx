"use client";

import { motion, Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
}: TextRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`inline-flex flex-wrap ${className}`}
      aria-hidden="true">
      {words.map((word, index) => (
        <span
          key={index}
          className="overflow-hidden inline-block mr-[0.25em] pb-1">
          <motion.span variants={child} className="inline-block">
            {word}
          </motion.span>
          <span className="sr-only">&nbsp;</span>
        </span>
      ))}
    </motion.span>
  );
}
