import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://manudequevedo.com";

// generateMetadata builds the per-locale SEO and link-preview (Open Graph / X card) tags.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) return {};

  const t = await getTranslations({ locale, namespace: "landing.meta" });
  const title = t("title");
  const description = t("description");
  const url = `${SITE_URL}/${locale}`;
  const image = {
    url: `${SITE_URL}/og/og-${locale}.png`,
    width: 1200,
    height: 630,
    alt: t("ogAlt"),
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { es: `${SITE_URL}/es`, en: `${SITE_URL}/en` },
    },
    openGraph: {
      type: "website",
      siteName: "Manu de Quevedo",
      title,
      description,
      url,
      locale: locale === "es" ? "es_MX" : "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}

// LocaleLayout wires translations for every localized page; page chrome lives in each route.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="antialiased font-body bg-dark text-primary" style={{ backgroundColor: "#0C0C0C" }}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
