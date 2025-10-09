// src/i18n/routing.ts
import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "es",
  localePrefix: "always", // 👈 prefijo SIEMPRE
  pathnames: {
    "/": "/",
    "/blog": "/blog"
  }
});

export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;