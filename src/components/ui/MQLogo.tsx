"use client";

import { motion } from "framer-motion";
import { memo } from "react";

interface MQLogoProps {
  variant?: "color" | "white" | "mono";
  size?: number;
  className?: string;
}

export const MQLogo = memo(
  ({ variant = "color", size = 32, className = "" }: MQLogoProps) => {
    const isColor = variant === "color";
    const isWhite = variant === "white";

    const fill = isWhite
      ? "#FFFFFF"
      : variant === "mono"
        ? "#333333"
        : "url(#logo-gradient)";

    // Calculate width based on original aspect ratio (1063.04 / 635.59 ≈ 1.67)
    const width = size * (1063.04 / 635.59);

    return (
      <motion.svg
        id="MQLogo"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1063.04 635.59"
        height={size}
        width={width}
        className={className}
        initial="initial"
        animate="animate">
        <defs>
          {isColor && (
            <linearGradient
              id="logo-gradient"
              x1="0"
              y1="317.8"
              x2="1063.04"
              y2="317.8"
              gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#F83D5C" />
              <stop offset="1" stopColor="#FD4B2F" />
            </linearGradient>
          )}
        </defs>

        {/* M - Left part */}
        <motion.path
          id="logo-m-left"
          d="M63.39,623.47h0c-56.62-28.31-79.57-97.16-51.26-153.78L215.27,63.39C243.58,6.77,312.43-16.18,369.06,12.13h0c56.62,28.31,79.57,97.16,51.26,153.78l-203.15,406.3c-28.31,56.62-97.16,79.57-153.78,51.26Z"
          fill={fill}
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: 0.1 },
            },
          }}
        />

        {/* M - Right part */}
        <motion.path
          id="logo-m-right"
          d="M426.37,623.47h0c-56.62-28.31-79.57-97.16-51.26-153.78L578.26,63.39c28.31-56.62,97.16-79.57,153.78-51.26h0c56.62,28.31,79.57,97.16,51.26,153.78l-203.15,406.3c-28.31,56.62-97.16,79.57-153.78,51.26Z"
          fill={fill}
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: 0.2 },
            },
          }}
        />

        {/* Q - Circle/Dot part */}
        <motion.path
          id="logo-q-circle"
          d="M1063.04,596.33v15.7c0,13.02-10.54,23.56-23.56,23.56h-135.49c-84.41,0-152.85-68.42-152.85-152.83s68.44-152.83,152.85-152.83,152.83,68.42,152.83,152.83c0,33.65-10.89,64.77-29.31,90.01h11.98c13.02,0,23.56,10.54,23.56,23.56Z"
          fill={fill}
          variants={{
            initial: { opacity: 0, scale: 0.8 },
            animate: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: 0.3 },
            },
          }}
        />
      </motion.svg>
    );
  },
);

MQLogo.displayName = "MQLogo";
