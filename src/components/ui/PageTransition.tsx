"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "@/i18n/routing";
import { MQLogo } from "./MQLogo";
import { useMemo } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const showIntro = useMemo(() => !shouldReduceMotion, [shouldReduceMotion]);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative min-h-screen">
        {/* Entrance Wipe Overlay */}
        {showIntro && !shouldReduceMotion && (
          <motion.div
            className="fixed inset-0 bg-dark z-[10000] flex items-center justify-center pointer-events-none"
            initial={{ y: "100%" }}
            animate={{
              y: ["100%", "0%", "-100%"],
              transition: {
                duration: 1.3,
                times: [0, 0.45, 1],
                ease: [0.76, 0, 0.24, 1],
              },
            }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                transition: {
                  duration: 1,
                  times: [0, 0.5, 1],
                  delay: 0.1,
                },
              }}>
              <MQLogo variant="white" size={120} className="animate-pulse" />
            </motion.div>
          </motion.div>
        )}

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.45, delay: showIntro ? 0.35 : 0 },
          }}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
