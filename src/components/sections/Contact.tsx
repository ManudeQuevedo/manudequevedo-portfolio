"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { Mail } from "lucide-react";

export function Contact() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const email = "contact@manudequevedo.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="min-h-[80vh] py-20 md:py-32 px-6 md:px-20 flex flex-col justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <SectionLabel label={t("label")} />

        <div className="flex flex-col gap-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-7xl font-bold leading-tight max-w-3xl">
            {t("headline")
              .split("recordar")
              .map((part: string, i: number) => (
                <span key={i}>
                  {part}
                  {i === 0 && <span className="text-brand">recordar</span>}
                </span>
              ))}
          </motion.h2>

          <div className="email-hero mt-8">
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
          <div className="flex flex-col gap-8 mt-4">
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
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <a
                href={`mailto:${email}`}
                className="flex items-center justify-center sm:justify-start gap-3 px-8 py-4 bg-brand text-dark font-semibold text-sm rounded-sm hover:bg-[#FF8C00] transition-colors duration-200">
                <Mail size={18} strokeWidth={2.5} />
                {t("email_cta")}
              </a>

              <a
                href="https://linkedin.com/in/manudequevedo"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center sm:justify-start gap-3 px-8 py-4 border border-white/10 text-secondary text-sm rounded-sm hover:border-white/30 hover:text-white transition-all duration-200">
                {t("linkedin_cta")}
              </a>

              <a
                href="/resume.pdf"
                download="Manu_de_Quevedo_CV.pdf"
                className="flex items-center justify-center sm:justify-start gap-3 px-8 py-4 border border-white/10 text-secondary text-sm rounded-sm hover:border-white/30 hover:text-white transition-all duration-200">
                {t("cv_cta")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Text */}
      <h3 className="absolute bottom-[-100px] right-[-50px] font-display text-[300px] md:text-[500px] font-black text-white/[0.01] select-none pointer-events-none uppercase">
        Manu
      </h3>
    </section>
  );
}
