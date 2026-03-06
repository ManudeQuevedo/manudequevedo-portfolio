"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { MQLogo } from "./MQLogo";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative">
        {/* Entrance Wipe Overlay */}
        <motion.div
          className="fixed inset-0 bg-dark z-[10000] flex items-center justify-center pointer-events-none"
          initial={{ y: "100%" }}
          animate={{
            y: ["100%", "0%", "-100%"],
            transition: {
              duration: 1.2,
              times: [0, 0.5, 1],
              ease: [0.76, 0, 0.24, 1],
            },
          }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              transition: { duration: 1, times: [0, 0.5, 1], delay: 0.1 },
            }}>
            <MQLogo variant="white" size={120} className="animate-pulse" />
          </motion.div>
        </motion.div>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.6 } }}>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
