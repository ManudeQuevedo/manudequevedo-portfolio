// i18n.ts  (si lo mueves a src/, cambia rutas de import a ../messages/...)
import {getRequestConfig} from 'next-intl/server';

const SUPPORTED_LOCALES = ['es', 'en'] as const;
const DEFAULT_LOCALE = 'es';

export default getRequestConfig(async ({locale}) => {
  const current =
    (locale && SUPPORTED_LOCALES.includes(locale as any) ? locale : DEFAULT_LOCALE) as (typeof SUPPORTED_LOCALES)[number];

  return {
    locale: current,
    messages: (await import(`../../messages/${current}.json`)).default
  };
});