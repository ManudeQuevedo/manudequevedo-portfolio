"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// LocaleSwitcher swaps the active locale while preserving the current route context.
export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale || isPending) return;

    // Preserve scroll position
    const scrollY = window.scrollY;

    startTransition(() => {
      // next-intl's router.replace handles client-side navigation
      router.replace(pathname, {
        locale: newLocale as any,
      });

      // Restore scroll position after a short delay to ensure DOM has updated
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: "auto" });
      });
    });
  };

  return (
    <div className="flex items-center gap-2 text-[10px] font-bold tracking-tighter text-secondary">
      <button
        onClick={() => switchLocale("es")}
        disabled={isPending}
        className={cn(
          "inline-flex min-h-11 min-w-11 md:min-h-0 md:min-w-0 items-center justify-center px-2 md:px-0 hover:text-primary transition-colors duration-200 uppercase",
          currentLocale === "es" ? "text-brand" : "text-secondary",
        )}>
        ES
      </button>
      <span className="opacity-20 text-[8px]">/</span>
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={cn(
          "inline-flex min-h-11 min-w-11 md:min-h-0 md:min-w-0 items-center justify-center px-2 md:px-0 hover:text-primary transition-colors duration-200 uppercase",
          currentLocale === "en" ? "text-brand" : "text-secondary",
        )}>
        EN
      </button>
    </div>
  );
}
