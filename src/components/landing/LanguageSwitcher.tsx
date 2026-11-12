"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const LOCALES = ["es", "en"] as const;

// LanguageSwitcher swaps the active locale in place, keeping the route and the scroll position.
export function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (locale: (typeof LOCALES)[number]) => {
    if (locale === currentLocale || isPending) return;
    const scrollY = window.scrollY;

    startTransition(() => {
      router.replace(pathname, { locale, scroll: false });
      requestAnimationFrame(() => window.scrollTo({ top: scrollY, behavior: "auto" }));
    });
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={`flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:text-lg lg:text-[1.4rem] ${className ?? ""}`}>
      {LOCALES.map((locale, index) => (
        <span key={locale} className="flex items-center gap-2">
          {index > 0 ? <span className="opacity-30">/</span> : null}
          <button
            type="button"
            onClick={() => switchLocale(locale)}
            disabled={isPending}
            aria-current={currentLocale === locale ? "true" : undefined}
            className={`uppercase transition-opacity duration-200 hover:opacity-70 ${
              currentLocale === locale ? "opacity-100 underline underline-offset-4" : "opacity-50"
            }`}>
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
