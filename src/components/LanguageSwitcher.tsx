// src/components/LanguageSwitcher.tsx
"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, locales } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

type Locale = (typeof locales)[number];

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathnameRaw = usePathname(); // Tipado a tus pathnames
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  // Reduce el pathname a las rutas internas que registraste en routing.pathnames
  const pathKey = (pathnameRaw === "/blog" ? "/blog" : "/") as "/" | "/blog";

  // Convierte el querystring en objeto (QueryParams) - SIN concatenar a mano
  const buildQuery = (): Record<string, string> => {
    const q: Record<string, string> = {};
    searchParams?.forEach((v, k) => (q[k] = v));
    return q;
  };

  const handleChange = (nextStr: string) => {
    const next = nextStr as Locale;
    const queryObj = buildQuery();

    startTransition(async () => {
      //    Pasa { locale: next, forcePrefix: true } y deja que next-intl lo arme.
      await router.replace(
        { pathname: pathKey, query: queryObj } as Parameters<
          typeof router.replace
        >[0],
        { locale: next }
      );

      // Fuerza rehidratación del layout con el nuevo locale
      router.refresh();
    });
  };

  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => handleChange(e.target.value)}
      className="bg-transparent text-sm outline-none cursor-pointer disabled:opacity-60"
      disabled={pending}
      aria-busy={pending}>
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  );
}
