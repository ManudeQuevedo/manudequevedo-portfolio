"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/ui/SectionLabel";
import Image from "next/image";

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min(
          (currentTime - startTime) / (duration * 1000),
          1,
        );
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export function About() {
  const t = useTranslations("about");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const domains = t.raw("domains") as string[];

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen py-20 md:py-32 px-6 md:px-20 grid md:grid-cols-[40%_60%] gap-16 md:gap-24">
      {/* Left Column - Metrics */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}>
        <SectionLabel label={t("label")} />

        <div className="space-y-16">
          <div className="metric">
            <h2 className="font-display text-8xl md:text-9xl font-bold leading-none mb-2">
              <CountUp end={parseInt(t("years"))} />+
            </h2>
            <p className="text-secondary text-sm md:text-base uppercase tracking-wider">
              {t("years_label")}
            </p>
          </div>

          <div className="metric">
            <h2 className="font-display text-8xl md:text-9xl font-bold leading-none mb-2 text-brand">
              <CountUp end={parseInt(t("projects").replace("+", ""))} />+
            </h2>
            <p className="text-secondary text-sm md:text-base uppercase tracking-wider">
              {t("projects_label")}
            </p>
          </div>

          <div className="h-[1px] w-full bg-white/5 my-12" />

          <div className="domains grid grid-cols-2 gap-3">
            {domains.map((domain, i) => (
              <motion.div
                key={domain}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="border border-white/10 rounded-sm px-4 py-3 text-xs md:text-sm text-secondary hover:border-brand/50 hover:text-brand hover:bg-brand/5 transition-all duration-300 cursor-default">
                {domain}
              </motion.div>
            ))}
          </div>
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
    </section>
  );
}
