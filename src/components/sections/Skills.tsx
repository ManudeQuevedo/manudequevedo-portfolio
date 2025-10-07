// src/components/sections/Skills.tsx
"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-xl bg-foreground text-background px-3 py-1 text-sm font-semibold">
      {children}
    </span>
  );
}

export default function SkillsSection({
  data,
  className,
}: {
  data: {
    headingKey?: string;
    subtitleKey?: string;
    groups: { id: string; titleKey?: string; items: string[] }[];
    footnoteKey?: string;
  };
  className?: string;
}) {
  const t = useTranslations();
  const heading = data.headingKey ? t(data.headingKey) : "Skills";
  const subtitle = data.subtitleKey ? t(data.subtitleKey) : undefined;

  return (
    <section className={cn("space-y-6", className)}>
      <div className="text-left space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          {heading}
        </h2>
        {subtitle ? <p className="text-muted-foreground">{subtitle}</p> : null}
      </div>

      <div className="space-y-6">
        {data.groups.map((group) => (
          <div key={group.id} className="space-y-3">
            <h3 className="text-base font-semibold">
              {group.titleKey ? t(group.titleKey) : group.id}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </div>
          </div>
        ))}
      </div>

      {data.footnoteKey ? (
        <p className="text-sm text-muted-foreground pt-2">
          {t(data.footnoteKey)}
        </p>
      ) : null}
    </section>
  );
}
