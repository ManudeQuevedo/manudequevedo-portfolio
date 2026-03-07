"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  label: string;
  className?: string;
}

// SectionLabel keeps section headers visually consistent across the entire landing page.
export function SectionLabel({ label, className = "" }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-6 mb-12 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: 24 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-[1px] bg-brand"
      />
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="text-[11px] font-body font-medium uppercase tracking-[0.2em] text-brand">
        {label}
      </motion.span>
    </div>
  );
}
