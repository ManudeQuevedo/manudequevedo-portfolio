// src/components/navbar.tsx
"use client";

import { Link } from "@/i18n/navigation";
import { useMessages } from "next-intl";
import { Dock, DockIcon } from "@/components/uikit/dock";
import { ModeToggle } from "@/components/mode-toggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { FileTextIcon } from "lucide-react";

import { generateResumeFromData } from "@/lib/generate-resume";
import { buildResumePayloadFromMessages } from "@/lib/build-resume-payload";

import { DATA, SKILLS } from "@/data/resume";

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

function PillTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip delayDuration={80}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={14}
        align="center"
        collisionPadding={8}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-semibold shadow-lg",
          "bg-black text-white border border-black/80"
        )}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

export default function Navbar() {
  const messages = useMessages() as any;

  const resumePayload = buildResumePayloadFromMessages(messages, DATA, {
    ...SKILLS,
    groups: SKILLS.groups.map((g) => ({ ...g, items: [...g.items] })),
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-16">
      <div className="fixed bottom-0 inset-x-0 h-24 w-full bg-gradient-to-t from-background/90 to-transparent supports-[backdrop-filter]:from-background/70" />

      <Dock
        className={cn(
          "z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 rounded-2xl",
          "bg-background/90",
          "ring-1 ring-border/70 dark:ring-white/10",
          "shadow-[0_0_0_1px_rgba(0,0,0,.03),0_6px_14px_rgba(0,0,0,.10),0_18px_30px_rgba(0,0,0,.14)]",
          "dark:shadow-[0_0_0_1px_rgba(255,255,255,.04),0_10px_22px_rgba(0,0,0,.45),0_-20px_80px_-20px_#ffffff1f_inset]"
        )}>
        {DATA.navbar.map((item) => {
          const internal = !isExternal(item.href);

          const btn = cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-12 rounded-xl",
            "border border-transparent hover:border-border/60",
            "bg-transparent hover:bg-accent/50",
            "shadow-[inset_0_1px_0_rgba(255,255,255,.04)]"
          );

          return (
            <DockIcon key={item.href}>
              <PillTooltip label={item.label}>
                {internal ? (
                  // Aquí usamos Link de next-intl, que maneja ruta interna sin recarga
                  <Link href={item.href} prefetch={false} className={btn}>
                    <item.icon className="size-4" />
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={btn}>
                    <item.icon className="size-4" />
                  </Link>
                )}
              </PillTooltip>
            </DockIcon>
          );
        })}

        <Separator orientation="vertical" className="h-8 mx-1 bg-border/60" />

        {Object.entries(DATA.contact.social)
          .filter(([, social]) => social.navbar)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <PillTooltip label={name}>
                <Link
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12 rounded-xl border border-transparent hover:border-border/60 hover:bg-accent/50 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]"
                  )}>
                  <social.icon className="size-4" />
                </Link>
              </PillTooltip>
            </DockIcon>
          ))}

        <DockIcon>
          <PillTooltip label="Download Resume">
            <button
              type="button"
              onClick={() =>
                generateResumeFromData(resumePayload, "manuel_matus_resume.pdf")
              }
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-12 rounded-xl border border-transparent hover:border-border/60 hover:bg-accent/50 shadow-[inset_0_1px_0_rgba(255,255,255,.04)]"
              )}
              aria-label="Download Resume">
              <FileTextIcon className="size-4" />
            </button>
          </PillTooltip>
        </DockIcon>

        <Separator orientation="vertical" className="h-8 mx-1 bg-border/60" />

        <DockIcon>
          <PillTooltip label="Theme">
            <span className="inline-flex">
              <ModeToggle />
            </span>
          </PillTooltip>
        </DockIcon>

        <DockIcon>
          <PillTooltip label="Language">
            <span className="inline-flex items-center justify-center px-3">
              <LanguageSwitcher />
            </span>
          </PillTooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
