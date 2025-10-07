// src/components/sections/SectionHeader.tsx
"use client";

import { cn } from "@/lib/utils";

export default function SectionHeader({
  badge,
  title,
  subtitle,
  className,
}: {
  badge?: string;
  title: string;
  subtitle?: string | React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-center space-y-4", className)}>
      {badge ? (
        <div className="inline-flex rounded-full bg-foreground text-background text-[10px] md:text-xs font-semibold px-3 py-1">
          {badge}
        </div>
      ) : null}

      {/* Heading: mismo “ritmo” que el H1 de “Hola, soy Manu” */}
      <h2 className="font-black tracking-tight text-3xl md:text-5xl leading-[0.95]">
        {title}
      </h2>

      {/* Subheading: mismo tamaño que el del héroe */}
      {subtitle ? (
        <p className="mx-auto max-w-3xl text-base md:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
