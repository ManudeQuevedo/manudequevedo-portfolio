import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Manu de Quevedo | Portfolio",
  description: "Developer Portfolio",
};

export default async function LocaleLayout({ children, params }: any) {
  const locale = (params?.locale as "es" | "en") ?? "en";
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <Navbar />
    </NextIntlClientProvider>
  );
}
