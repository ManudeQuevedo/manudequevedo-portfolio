"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Mail } from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";

export function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const [copied, setCopied] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  const words =
    locale === "es"
      ? ["recordar", "construir", "lanzar", "escalar"]
      : ["remember", "build", "launch", "scale"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  const email = "contact@manudequevedo.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SectionContainer
      id="contact"
      className="min-h-[80vh] flex flex-col justify-center overflow-hidden">
      <SectionLabel label={t("label")} />

      <div className="relative z-10 flex flex-col gap-20 md:gap-32 pointer-events-none">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-7xl font-bold leading-tight max-w-3xl pointer-events-auto">
          {t("headline").replace(/\.$/, "")}
          <span className="text-brand whitespace-nowrap ml-2">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="inline-block">
                .{words[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h2>

        <div className="email-hero mt-12 pointer-events-auto">
          <button
            onClick={handleCopy}
            className="group relative cursor-pointer text-left"
            data-cursor="hover">
            <ScrambleText
              text={email}
              duration={300}
              className="font-display text-2xl md:text-6xl font-bold text-tertiary group-hover:text-primary transition-colors"
            />
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-10 left-0 text-brand font-mono text-xs">
                ¡Copiado! ✓
              </motion.span>
            )}
          </button>
        </div>

        {/* Contact Actions & Subtext */}
        <div className="flex flex-col gap-12 mt-12 pointer-events-auto">
          {/* Subtext and Availability */}
          <div className="flex flex-col gap-4">
            <p className="text-[#555] text-base max-w-2xl leading-relaxed">
              {t("subtext")}
            </p>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[#666] text-sm font-medium">
                {t("availability")}
              </span>
            </div>
          </div>

          {/* Direct Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12">
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center sm:justify-start gap-3 px-8 py-4 bg-brand text-dark font-semibold text-sm rounded-sm hover:bg-[#FF8C00] transition-colors duration-200">
              <Mail size={18} strokeWidth={2.5} />
              {t("email_cta")}
            </a>

            <a
              href="https://linkedin.com/in/manuelmatus"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center sm:justify-start gap-3 px-8 py-4 border border-white/10 text-secondary text-sm rounded-sm hover:border-white/30 hover:text-white transition-all duration-200">
              {t("linkedin_cta")}
            </a>

            {/* <a
              href="/resume.pdf"
              download="Manu_de_Quevedo_CV.pdf"
              className="flex items-center justify-center sm:justify-start gap-3 px-8 py-4 border border-white/10 text-secondary text-sm rounded-sm hover:border-white/30 hover:text-white transition-all duration-200">
              {t("cv_cta")}
            </a> */}
          </div>
        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute bottom-[-100px] inset-x-0 z-0 flex justify-center">
        <h3
          className="relative font-display text-[300px] md:text-[500px] font-black uppercase flex select-none pointer-events-auto leading-none"
          onMouseLeave={() => setHoveredLetter(null)}>
          <AnimatePresence>
            {hoveredLetter !== null && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[25%] right-[20%] font-mono text-xs text-tertiary whitespace-nowrap bg-dark/60 px-4 py-2 border border-white/5 rounded-full backdrop-blur-md pointer-events-none z-10">
                ↑ volver al inicio
              </motion.div>
            )}
          </AnimatePresence>
          {"Manu".split("").map((letter, index) => {
            const isActive = hoveredLetter === index;
            const isAdjacent =
              hoveredLetter !== null && Math.abs(hoveredLetter - index) === 1;

            return (
              <motion.span
                key={index}
                onMouseEnter={() => setHoveredLetter(index)}
                animate={{
                  color: isActive ? "#ff6b00" : "#ffffff",
                  opacity: isActive ? 0.15 : isAdjacent ? 0.05 : 0.01,
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="inline-block transition-colors pointer-events-auto">
                {letter}
              </motion.span>
            );
          })}
        </h3>
      </div>
    </SectionContainer>
  );
}
