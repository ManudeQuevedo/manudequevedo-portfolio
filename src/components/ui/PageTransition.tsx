"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "@/i18n/routing";
import { MQLogo } from "./MQLogo";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative min-h-screen">
        {/* Entrance Wipe Overlay */}
        <motion.div
          className="fixed inset-0 bg-dark z-[10000] flex items-center justify-center pointer-events-none"
          initial={{ y: "100%" }}
          animate={{
            y: ["100%", "0%", "-100%"],
            transition: {
              duration: 2.4, // Slowed down from 1.2s
              times: [0, 0.4, 1],
              ease: [0.76, 0, 0.24, 1],
            },
          }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              transition: {
                duration: 1.8, // Slowed down from 1s
                times: [0, 0.5, 1],
                delay: 0.2,
              },
            }}>
            <MQLogo variant="white" size={140} className="animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.8, delay: 1.2 }, // Adjusted for slower wipe
          }}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
