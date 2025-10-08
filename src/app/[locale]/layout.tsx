import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/navbar";

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // <- lo que espera Next
}) {
  const { locale: rawLocale } = await params; // <- await params
  const locale: "es" | "en" = rawLocale === "es" ? "es" : "en"; // <- normaliza

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <Navbar />
    </NextIntlClientProvider>
  );
}
