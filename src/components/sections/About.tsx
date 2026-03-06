"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Image from "next/image";

export function About() {
  const t = useTranslations("about");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const domains = t.raw("domains") as string[];

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen py-20 md:py-32 px-6 md:px-20 max-w-7xl mx-auto flex flex-col gap-24">
      <div className="grid md:grid-cols-[40%_60%] gap-16 md:gap-24">
        {/* Left Column - Identity Cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          <SectionLabel label={t("label")} />

          <div className="grid grid-cols-2 gap-4 mt-12">
            {["years", "projects", "domains", "agency"].map((key, i) => {
              const item = t.raw(`identity.${key}`);
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="bg-[#0A0A0A] border border-[#111] rounded-sm p-6 hover:border-brand/20 transition-all duration-300 group flex flex-col justify-between">
                  <h4 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                    {item.number}
                  </h4>
                  <div>
                    <p className="font-body text-[10px] md:text-[11px] uppercase tracking-wider text-[#555] mb-2 font-semibold">
                      {item.label}
                    </p>
                    <p className="font-body text-xs md:text-sm text-brand/80 group-hover:text-brand transition-colors">
                      {item.context}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right Column - Philosophy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center">
          <div className="relative mb-16 self-start md:self-auto">
            <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-sm overflow-hidden group">
              <Image
                src="/me.jpg"
                alt="Profile"
                fill
                className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000"
              />
              {/* Noise Layer */}
              <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay noise-overlay" />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -inset-3 border border-brand/20 -z-10 translate-x-3 translate-y-3" />
          </div>

          <div className="max-w-lg">
            <h3 className="font-body text-2xl md:text-3xl font-medium leading-[1.6] mb-8 text-primary">
              {t("headline")
                .split("último 10%")
                .map((part, i) => (
                  <span key={i}>
                    {part}
                    {i === 0 && (
                      <span className="relative inline-block text-brand">
                        último 10%
                        <motion.span
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          transition={{ duration: 1, delay: 1 }}
                          className="absolute bottom-1 left-0 w-full h-[2px] bg-brand origin-left"
                        />
                      </span>
                    )}
                  </span>
                ))}
            </h3>
            <p className="text-secondary text-base md:text-lg leading-relaxed">
              {t("body")}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Principles - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 mt-8 md:mt-16">
        {(t.raw("principles") as any[]).map((principle, index) => (
          <div
            key={index}
            className="flex flex-col sm:px-8 first:pl-0 last:pr-0 sm:border-r border-[#111] last:border-0 border-b pb-8 sm:border-b-0 sm:pb-0">
            <span className="font-display text-5xl md:text-6xl text-[#1A1A1A] font-bold select-none mb-6">
              {principle.number}
            </span>
            <h5 className="font-display text-lg md:text-xl text-white font-medium mb-4">
              {principle.title}
            </h5>
            <p className="font-body text-sm md:text-base text-[#666] leading-relaxed max-w-[280px]">
              {principle.body}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
