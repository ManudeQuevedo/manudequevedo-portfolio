"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
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

  // Mouse tracking for reactive grid and parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Only enable parallax on non-touch devices (md breakpoint roughly > 768px)
    if (window.innerWidth < 768) return;

    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Grid Parallax mapping
  const bgX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  // Photo Parallax mapping
  const imgX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const imgY = useTransform(smoothY, [-0.5, 0.5], [-5, 5]);
  const imgRotateY = useTransform(smoothX, [-0.5, 0.5], [-1.5, 1.5]);

  const terminalLines = useMemo(
    () => [t("loading"), t("role"), t("ready")],
    [t],
  );

  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("hero_anim_complete");
    if (hasSeenIntro) {
      setIsSkipped(true);
      setShowContent(true);
    }
  }, []);

  const handleTerminalComplete = useCallback(() => {
    // Pause dramatically after terminal completes
    setTimeout(() => {
      setShowContent(true);
      sessionStorage.setItem("hero_anim_complete", "true");
    }, 600);
  }, []);

  const skipAnimation = () => {
    setIsSkipped(true);
    setShowContent(true);
    sessionStorage.setItem("hero_anim_complete", "true");
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full bg-dark overflow-hidden flex flex-col justify-end pb-20 md:pb-32 pt-20 md:pt-32">
      {/* Parallax Grid Background */}
      <motion.div
        style={{
          y: gridY,
          x: bgX,
          // Use bgY to shift slightly on top of gridY
          marginTop: bgY,
          backgroundImage: `linear-gradient(rgba(255,107,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
      />

      <motion.div
        className="absolute right-5 md:right-12 xl:right-[calc((100vw-1280px)/2+48px)] bottom-0 top-0 w-[45%] z-0 select-none hidden md:block"
        initial={{ filter: "grayscale(100%) brightness(0.7)", opacity: 0 }}
        animate={{ filter: "grayscale(20%) brightness(0.9)", opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: isSkipped ? 0 : 2,
          ease: "easeOut",
        }}
        style={{
          scale: photoScale,
          perspective: 1000,
          mixBlendMode: "luminosity",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0%, black 25%, black 100%)",
          maskImage:
            "linear-gradient(to top, transparent 0%, black 25%, black 100%)",
        }}>
        <div className="relative h-full w-full pointer-events-none overflow-hidden">
          {/* Photo Parallax Wrapper */}
          <motion.div
            className="h-full w-full"
            style={{
              x: imgX,
              y: imgY,
              rotateY: imgRotateY,
              transformStyle: "preserve-3d",
            }}>
            <Image
              src="/me-no-bg.png"
              alt="Manu de Quevedo"
              width={800}
              height={1200}
              className="h-full w-full object-cover object-top"
              priority
            />
          </motion.div>

          {/* TOP gradient — was missing */}
          <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-dark via-dark/60 to-transparent pointer-events-none z-10" />

          {/* BOTTOM gradient */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-dark via-dark/60 to-transparent pointer-events-none z-10" />

          {/* LEFT gradient */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-dark via-dark/50 to-transparent pointer-events-none z-10" />

          {/* RIGHT gradient — was missing */}
          <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-dark/80 to-transparent pointer-events-none z-10" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 layout-container">
        <div className="mb-12 overflow-hidden">
          <TerminalText
            lines={terminalLines}
            onComplete={handleTerminalComplete}
            skip={isSkipped}
          />
        </div>

        {!showContent && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={skipAnimation}
            className="fixed bottom-10 right-10 z-[60] text-[10px] uppercase tracking-widest text-secondary hover:text-white transition-colors duration-300 font-mono">
            {t("skip_intro")}
          </motion.button>
        )}

        {showContent && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.4 },
              },
            }}>
            {/* Headline */}
            <h1
              className="font-display text-4xl md:text-7xl font-bold leading-tight mb-12 max-w-4xl"
              aria-label={t("headline")}>
              {t("headline")
                .split(" ")
                .map((word, i) => (
                  <motion.span
                    key={i}
                    aria-hidden="true"
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
                    <span className="sr-only">&nbsp;</span>
                  </motion.span>
                ))}
            </h1>

            {/* Subtitle */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.1 },
                },
              }}
              className="text-secondary text-[13px] md:text-[15px] tracking-[0.15em] uppercase mb-12 flex flex-wrap gap-x-3 gap-y-2 items-center font-body opacity-80">
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

            {/* Secondary CTA / Statement */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, delay: 0.3 },
                },
              }}
              className="flex items-center mt-12">
              <MagneticButton>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border border-white/20 bg-white/5 backdrop-blur-sm text-white px-6 py-3 rounded-sm text-sm md:text-base font-bold flex items-center gap-3 group transition-all duration-300 hover:bg-white/10 hover:border-white/40">
                  {t("cta_secondary")}
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
        transition={{ delay: isSkipped ? 0.5 : 5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <span
          className="text-[10px] uppercase tracking-widest text-tertiary whitespace-nowrap mb-6"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
          }}>
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
