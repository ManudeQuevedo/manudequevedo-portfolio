// src/components/LanguageSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale() as "es" | "en";
  const pathname = usePathname() || "/";

  const other = locale === "es" ? "en" : "es";

  return (
    <Link
      href={pathname}
      locale={other}
      // evita saltos a top
      scroll={false}
      className="text-sm underline underline-offset-4 cursor-pointer"
      aria-label={`Switch to ${other.toUpperCase()}`}
      prefetch={false}>
      {other.toUpperCase()}
    </Link>
  );
}
