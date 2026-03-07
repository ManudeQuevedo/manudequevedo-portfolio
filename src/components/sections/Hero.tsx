"use client";

import {
  AnimatePresence,
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

function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    type Column = {
      x: number;
      y: number;
      speed: number;
      glyph: "0" | "1";
      refreshBias: number;
    };

    const backgroundColor = "rgba(8, 8, 8, 0.24)";
    const glyphColor = "rgba(249, 115, 22, 0.7)";
    const fontSize = 13;
    const columnWidth = 14;
    let columns: Column[] = [];
    let width = 0;
    let height = 0;
    let rafId = 0;
    let lastTime = 0;

    const resetColumns = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      if (!parent) return;

      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.font = `${fontSize}px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace`;
      context.textBaseline = "top";
      context.clearRect(0, 0, width, height);

      const columnCount = Math.ceil(width / columnWidth);
      columns = Array.from({ length: columnCount }, (_, index) => ({
        x: index * columnWidth,
        y: Math.random() * height - height,
        speed: 0.55 + Math.random() * 1.15,
        glyph: Math.random() > 0.5 ? "1" : "0",
        refreshBias: 0.015 + Math.random() * 0.045,
      }));
    };

    const render = (time: number) => {
      rafId = window.requestAnimationFrame(render);
      if (!lastTime) {
        lastTime = time;
      }
      const delta = Math.min((time - lastTime) / 16.67, 3);
      lastTime = time;

      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, width, height);

      context.fillStyle = glyphColor;
      columns.forEach((column) => {
        column.y += column.speed * delta;
        if (Math.random() < column.refreshBias) {
          column.glyph = Math.random() > 0.5 ? "1" : "0";
        }

        if (column.y > height + fontSize) {
          column.y = -fontSize - Math.random() * height * 0.35;
          column.speed = 0.55 + Math.random() * 1.15;
          column.refreshBias = 0.015 + Math.random() * 0.045;
          column.glyph = Math.random() > 0.5 ? "1" : "0";
        }

        context.fillText(column.glyph, column.x, column.y);
      });
    };

    resetColumns();
    rafId = window.requestAnimationFrame(render);

    const observer = new ResizeObserver(() => {
      resetColumns();
    });
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    const onResize = () => resetColumns();
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-[0.16]"
    />
  );
}

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
  const headlineWords = useMemo(() => t("headline").split(" "), [t]);
  const headlineDividerIndex = useMemo(
    () => headlineWords.findIndex((word) => word === "—" || word === "-"),
    [headlineWords],
  );

  const [isSkipped, setIsSkipped] = useState(false);

  const handleTerminalComplete = useCallback(() => {
    // Pause dramatically after terminal completes
    setTimeout(() => {
      setShowContent(true);
    }, 600);
  }, []);

  const skipAnimation = () => {
    setIsSkipped(true);
    setShowContent(true);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full bg-dark overflow-hidden flex flex-col justify-end pb-20 md:pb-32 pt-20 md:pt-32">
      <BinaryRain />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,8,8,0) 60%, rgba(8,8,8,0.72) 84%, rgba(8,8,8,1) 100%)",
        }}
      />

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
          mixBlendMode: "normal",
          filter: "grayscale(20%) contrast(1.04) brightness(1)",
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
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 16%, black 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 16%, black 100%)",
            }}>
            <Image
              src="/me-no-bg.png"
              alt="Manu de Quevedo"
              width={800}
              height={1200}
              className="h-full w-full object-cover object-[65%_8%] drop-shadow-[0_0_14px_rgba(8,8,8,0.9)]"
              priority
            />
          </motion.div>

          {/* Superior — el que faltaba, elimina el borde duro de la cabeza */}
          <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-dark/70 via-dark/35 to-transparent pointer-events-none z-10" />

          {/* Inferior */}
          <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-dark/70 via-dark/35 to-transparent pointer-events-none z-10" />

          {/* Derecho — cierra el borde del lado derecho */}
          <div className="absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-dark/35 to-transparent pointer-events-none z-10" />

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
      <motion.div
        layout
        transition={{
          layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        }}
        className="relative z-10 layout-container">
        <motion.div
          layout
          transition={{
            layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          }}
          className="mb-12 overflow-hidden">
          <TerminalText
            lines={terminalLines}
            onComplete={handleTerminalComplete}
            skip={isSkipped}
          />
        </motion.div>

        {/* Mobile Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative md:hidden -mx-4 sm:-mx-6 mb-8 h-[42vh] max-h-[45vh] overflow-hidden">
          <Image
            src="/me-no-bg.png"
            alt="Manu de Quevedo"
            width={800}
            height={1200}
            className="h-full w-full object-cover object-top"
            priority
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(8,8,8,0) 58%, rgba(8,8,8,0.62) 82%, rgba(8,8,8,1) 100%)",
            }}
          />
        </motion.div>

        {!showContent && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={skipAnimation}
            className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 md:right-10 z-[60] inline-flex min-h-11 items-center justify-center px-3 text-[9px] md:text-[10px] uppercase tracking-widest text-secondary hover:text-white transition-colors duration-300 font-mono">
            {t("skip_intro")}
          </motion.button>
        )}

        <AnimatePresence initial={false} mode="wait">
          {showContent && (
            <motion.div
              layout
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
              transition={{
                layout: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              }}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.12, delayChildren: 0.25 },
                },
              }}>
            {/* Headline */}
            <h1
              className="font-display text-[clamp(2rem,9.2vw,2.85rem)] md:text-7xl font-bold leading-[1.05] mb-12 max-w-[90vw] md:max-w-4xl"
              aria-label={t("headline")}>
              {headlineWords.map((word, i) => (
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
                    {headlineDividerIndex !== -1 && i > headlineDividerIndex ? (
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
                  className="group relative flex min-h-11 items-center gap-4 px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm rounded-sm text-sm md:text-base font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30 overflow-hidden"
                  data-cursor="hover">
                  <span className="relative z-10">{t("cta_secondary")}</span>
                  <div className="absolute inset-0 bg-brand/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </button>
              </MagneticButton>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </section>
  );
}
