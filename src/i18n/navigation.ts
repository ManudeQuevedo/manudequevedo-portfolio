// src/i18n/navigation.ts
import {createNavigation} from "next-intl/navigation";
import {routing} from "./routing";

export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname,
} = createNavigation(routing);

// (opcional) re-export por conveniencia
export {locales, defaultLocale} from "./routing";