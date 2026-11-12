"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

const LOCALES = ["es", "en"] as const;

// LanguageSwitcher is a floating pill that swaps the active locale in place, keeping the route and the scroll position.
export function LanguageSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("landing.a11y");
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
      aria-label={t("language")}
      className={`flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#D7E2EA]/30 bg-[#0C0C0C]/95 px-3 py-0 shadow-[0_4px_20px_rgba(0,0,0,0.45)] backdrop-blur-md md:px-5 md:py-2 ${className ?? ""}`}>
      {LOCALES.map((locale, index) => (
        <span key={locale} className="flex items-center gap-2">
          {index > 0 ? <span className="opacity-30">/</span> : null}
          <button
            type="button"
            onClick={() => switchLocale(locale)}
            disabled={isPending}
            aria-current={currentLocale === locale ? "true" : undefined}
            className={`uppercase transition-opacity duration-200 hover:opacity-70 ${
              currentLocale === locale ? "opacity-100 underline underline-offset-4" : "opacity-60"
            }`}>
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
