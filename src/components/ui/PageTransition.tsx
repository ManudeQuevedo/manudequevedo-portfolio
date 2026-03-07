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
                duration: 3,
                times: [0, 0.54, 1],
                ease: [0.22, 1, 0.36, 1],
              },
            }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.92, 1, 0.985],
                transition: {
                  duration: 2.3,
                  times: [0, 0.58, 1],
                  delay: 0.25,
                  ease: "easeInOut",
                },
              }}>
              <MQLogo variant="white" size={120} />
            </motion.div>
          </motion.div>
        )}

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.75, delay: showIntro ? 0.8 : 0 },
          }}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
