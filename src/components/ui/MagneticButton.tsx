"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  distance?: number;
}

// MagneticButton adds subtle pointer-driven drift to highlighted calls to action.
export function MagneticButton({
  children,
  className = "",
  onClick,
  distance = 60,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 15, stiffness: 150 });
  const springY = useSpring(y, { damping: 15, stiffness: 150 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (dist < distance) {
        x.set(deltaX * 0.4);
        y.set(deltaY * 0.4);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [distance, x, y]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={className}
      onClick={onClick}>
      {children}
    </motion.div>
  );
}
