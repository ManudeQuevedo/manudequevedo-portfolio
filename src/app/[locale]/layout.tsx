// app/[locale]/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/navbar";
import Script from "next/script";

export const metadata = {
  title: "Manu de Quevedo | Portfolio",
  description: "Developer Portfolio",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "en" | "es" = rawLocale === "es" ? "es" : "en";

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Script
        src="https://js.hcaptcha.com/1/api.js"
        strategy="afterInteractive"
      />
      {children}
      <Navbar />
    </NextIntlClientProvider>
  );
}
