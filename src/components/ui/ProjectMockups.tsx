"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function ProjectMockupBridge() {
  return (
    <motion.div
      className="absolute inset-0 bg-[#0A0A0A] w-full h-full flex items-center justify-center p-6 md:p-12 overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full h-full max-h-[400px] bg-dark rounded-xl border border-white/10 overflow-hidden flex flex-col shadow-2xl relative z-0">
        {/* Browser Top Bar */}
        <div className="h-8 md:h-10 bg-dark-2 border-b border-white/5 flex items-center px-4 gap-4 shrink-0">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-dark-3 w-1/2 max-w-[200px] h-5 rounded flex items-center justify-center">
              <span className="font-mono text-[9px] text-tertiary">
                bridgecapital.mx
              </span>
            </div>
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden bg-[#0e0e0e]">
          {/* Hero Simulation */}
          <motion.div
            variants={itemVariants}
            className="w-3/4 max-w-[240px] h-10 md:h-14 bg-brand rounded-sm mb-2"
          />
          <motion.div
            variants={itemVariants}
            className="w-1/2 max-w-[160px] h-3 md:h-4 bg-white/10 rounded-sm"
          />
          <motion.div
            variants={itemVariants}
            className="w-1/3 max-w-[120px] h-3 md:h-4 bg-white/5 rounded-sm"
          />

          {/* Grid Simulation */}
          <div className="grid grid-cols-3 gap-3 md:gap-4 mt-auto h-24 md:h-32">
            <motion.div
              variants={itemVariants}
              className="bg-dark-2 rounded border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-dark-2 rounded border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent" />
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-dark-2 rounded border border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProjectMockupWoodax() {
  return (
    <motion.div
      className="absolute inset-0 bg-[#f5f5f5] w-full h-full flex flex-col p-8 md:p-12 text-black overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full h-full flex flex-col relative z-0">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-12">
          <div className="font-display text-5xl md:text-6xl font-black tracking-tighter">
            W
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-1 bg-black/20 rounded-full" />
            <div className="w-8 h-1 bg-black/20 rounded-full" />
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-2 gap-4 flex-1">
          <motion.div
            variants={itemVariants}
            className="bg-black/5 rounded-xl h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black/[0.03] to-transparent" />
          </motion.div>
          <div className="flex flex-col gap-4 h-full">
            <motion.div
              variants={itemVariants}
              className="bg-black/10 rounded-xl h-[40%]"
            />
            <motion.div
              variants={itemVariants}
              className="bg-black/5 rounded-xl flex-1 relative overflow-hidden">
              <div className="absolute top-4 left-4 w-1/2 h-4 bg-black/10 rounded-sm" />
            </motion.div>
          </div>
        </div>

        {/* Subtle accent line */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-0 left-0 w-1/3 h-1.5 bg-black/80 rounded-t-full"
        />
      </motion.div>
    </motion.div>
  );
}

export function ProjectMockupDyma() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-[#0a192f] to-[#020c1b] w-full h-full overflow-hidden"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full h-full p-8 md:p-12 flex flex-col relative z-0">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="flex justify-between items-center mb-16 shrink-0">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <div className="w-5 h-5 rounded-sm bg-blue-500/60" />
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-1.5 rounded-full bg-white/10" />
            <div className="w-8 h-1.5 rounded-full bg-white/10" />
            <div className="w-8 h-1.5 rounded-full bg-white/10" />
            <div className="w-8 h-1.5 rounded-full bg-blue-500/60 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          </div>
        </motion.div>

        {/* Hero Area */}
        <div className="flex flex-col gap-5 mb-auto">
          <motion.div
            variants={itemVariants}
            className="w-4/5 h-10 md:h-12 bg-gradient-to-r from-blue-400/20 to-transparent rounded border-l-2 border-blue-500/50"
          />
          <motion.div
            variants={itemVariants}
            className="w-3/5 h-10 md:h-12 bg-gradient-to-r from-blue-400/20 to-transparent rounded border-l-2 border-blue-500/50"
          />
          <motion.div
            variants={itemVariants}
            className="w-2/5 h-3 md:h-4 bg-white/10 rounded mt-4"
          />
        </div>

        {/* Stats Section */}
        <div className="flex justify-between border-t border-white/10 pt-8 mt-12">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex flex-col gap-3">
              <div className="text-2xl md:text-4xl font-bold font-mono text-white tracking-widest">
                {i === 1 ? "99%" : i === 2 ? "2.4x" : "50k"}
              </div>
              <div className="w-12 md:w-16 h-1 bg-blue-500/40 rounded-full" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Decorative Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </motion.div>
  );
}
