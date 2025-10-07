// src/i18n/navigation.ts
import {createNavigation} from 'next-intl/navigation';

export const locales = ['es', 'en'] as const;

export const {Link, usePathname, useRouter, redirect} = createNavigation({
  locales
});