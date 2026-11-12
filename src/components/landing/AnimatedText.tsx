"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";

function Character({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

// AnimatedText reveals a paragraph character by character as the user scrolls through it.
export function AnimatedText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  // Split by word so line breaks only happen between words, then by character inside each word.
  const words = text.split(" ");
  const total = text.length;
  const starts = words.reduce<number[]>((acc, word, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + words[i - 1].length + 1);
    return acc;
  }, []);

  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, wordIndex) => {
        const wordStart = starts[wordIndex];
        return (
          <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap" aria-hidden="true">
            {word.split("").map((char, charIndex) => (
              <Character
                key={charIndex}
                char={char}
                index={wordStart + charIndex}
                total={total}
                progress={scrollYProgress}
              />
            ))}
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </p>
  );
}
