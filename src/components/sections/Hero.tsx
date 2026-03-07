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
        className="absolute right-0 top-0 bottom-0 w-[42%] z-0 select-none hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          delay: isSkipped ? 0 : 2,
          ease: "easeOut",
        }}
        style={{
          scale: photoScale,
          perspective: 1000,
          mixBlendMode: "luminosity",
          filter: "grayscale(40%) contrast(1.05) brightness(0.85)",
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
              className="h-full w-full object-cover object-[65%_8%]"
              priority
            />
          </motion.div>

          {/* Izquierdo — más ancho para separar texto de foto */}
          <div className="absolute inset-y-0 left-0 w-[52%] bg-gradient-to-r from-dark via-dark/70 to-transparent pointer-events-none z-10" />

          {/* Superior — el que faltaba, elimina el borde duro de la cabeza */}
          <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-dark via-dark/60 to-transparent pointer-events-none z-10" />

          {/* Inferior */}
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-dark via-dark/60 to-transparent pointer-events-none z-10" />

          {/* Derecho — cierra el borde del lado derecho */}
          <div className="absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-dark/60 to-transparent pointer-events-none z-10" />

          {/* Brand warmth — conecta la foto con #FF6B00 */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background:
                "radial-gradient(ellipse at 70% 40%, rgba(255,107,0,0.07) 0%, transparent 65%)",
            }}
          />
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
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 md:right-10 z-[60] text-[9px] md:text-[10px] uppercase tracking-widest text-secondary hover:text-white transition-colors duration-300 font-mono">
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
                    {word.toLowerCase().includes("friction") ||
                    word.toLowerCase().includes("fricción") ? (
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
              <MagneticButton distance={40}>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group relative flex items-center gap-4 px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm text-sm md:text-base font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 overflow-hidden"
                  data-cursor="hover">
                  <span className="relative z-10">{t("cta_secondary")}</span>
                  <div className="absolute inset-0 bg-brand/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
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
        className="absolute bottom-8 left-20 flex flex-col items-center gap-3">
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
