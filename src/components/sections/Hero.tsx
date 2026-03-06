"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { TerminalText } from "@/components/ui/TerminalText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Image from "next/image";

export function Hero() {
  const t = useTranslations("hero");
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 500], [0, 50]);
  const photoScale = useTransform(scrollY, [0, 500], [1, 1.05]);

  const terminalLines = [
    t("loading"),
    t("role"),
    `> ${t("headline").substring(0, 20)}...`,
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full bg-dark overflow-hidden flex items-end pb-20 md:pb-32 px-6 md:px-20">
      {/* Parallax Grid Background */}
      <motion.div
        style={{
          y: gridY,
          backgroundImage: `linear-gradient(rgba(255,107,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
      />

      {/* Integrated Photo */}
      <motion.div
        className="absolute right-0 bottom-0 h-[85vh] w-auto z-0 select-none pointer-events-none hidden md:block"
        initial={{ filter: "grayscale(100%) brightness(0.7)", opacity: 0 }}
        animate={{ filter: "grayscale(20%) brightness(0.9)", opacity: 1 }}
        transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
        style={{ scale: photoScale }}>
        <div className="relative h-full w-full">
          <Image
            src="/me.jpg"
            alt="Manu de Quevedo"
            width={800}
            height={1200}
            className="h-full w-auto object-contain"
            priority
          />
          {/* Gradients to blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent w-1/3" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent h-1/4" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-8">
          <TerminalText
            lines={terminalLines}
            onComplete={() => setShowContent(true)}
          />
        </div>

        {showContent && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}>
            {/* Headline */}
            <h1 className="font-display text-4xl md:text-7xl font-bold leading-tight mb-6">
              {t("headline")
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block mr-[0.2em]"
                    variants={{
                      hidden: { y: 60, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          damping: 20,
                          stiffness: 100,
                        },
                      },
                    }}>
                    {word.includes("descubrimientos") ? (
                      <span className="text-brand">{word}</span>
                    ) : (
                      word
                    )}
                  </motion.span>
                ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-secondary text-sm md:text-base tracking-[0.1em] uppercase mb-10 flex flex-wrap gap-x-3 gap-y-2 items-center font-body">
              {t("sub")
                .split(" · ")
                .map((item, i) => (
                  <span key={i} className="flex items-center gap-3">
                    {item}
                    {i < t("sub").split(" · ").length - 1 && (
                      <span className="text-brand text-xs">·</span>
                    )}
                  </span>
                ))}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <MagneticButton>
                <button className="bg-brand text-dark px-8 py-4 rounded-sm font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-shadow">
                  {t("cta_primary")}
                </button>
              </MagneticButton>
              <MagneticButton>
                <button className="text-secondary hover:text-primary text-sm font-medium flex items-center gap-2 group transition-colors">
                  {t("cta_secondary")}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span className="text-[10px] uppercase tracking-widest text-tertiary rotate-90 origin-bottom-left whitespace-nowrap mb-6">
          {t("scroll")}
        </span>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-brand to-transparent"
        />
      </motion.div>
    </section>
  );
}
