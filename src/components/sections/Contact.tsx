"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlitchText } from "@/components/ui/GlitchText";
import { MagneticButton } from "@/components/ui/MagneticButton";

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
              .map((part, i) => (
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
              <GlitchText
                text={email}
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

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-8">
            <div className="flex items-center gap-4 text-secondary group">
              <div className="w-10 h-10 rounded-sm border border-white/5 flex items-center justify-center group-hover:border-brand/30 group-hover:text-brand transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-tertiary">
                  {t("email_label")}
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-sm md:text-base hover:text-brand transition-colors">
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-secondary">
              <div className="w-10 h-10 rounded-sm border border-white/5 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-tertiary">
                  Location
                </span>
                <span className="text-sm md:text-base">{t("location")}</span>
              </div>
            </div>
          </div>

          <div className="social-links flex flex-wrap gap-x-8 gap-y-4 mt-8">
            {[
              { name: "GitHub", href: "https://github.com/ManudeQuevedo" },
              { name: "LinkedIn", href: "#" },
              { name: "CV ↓", href: "#" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group flex items-center gap-2 text-tertiary hover:text-primary transition-colors font-body text-sm"
                data-cursor="hover">
                <span className="group-hover:-translate-x-1 transition-transform">
                  [
                </span>
                {link.name}
                <span className="group-hover:translate-x-1 transition-transform">
                  ]
                </span>
              </a>
            ))}
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
