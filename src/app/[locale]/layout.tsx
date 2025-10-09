// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/navbar";
import Script from "next/script";

export const metadata: Metadata = {
  // Hace que /og-image.png se vuelva https://manudequevedo.com/og-image.png
  metadataBase: new URL("https://manudequevedo.com"),

  title: {
    default: "Manu de Quevedo | Frontend Developer & UI Designer",
    template: "%s | Manu de Quevedo",
  },
  description:
    "Portafolio de Manu de Quevedo — Frontend Developer y UI Designer especializado en Next.js, React, TailwindCSS y GSAP. Diseño y desarrollo de interfaces modernas, rápidas y accesibles.",
  keywords: [
    "Manu de Quevedo",
    "Frontend Developer",
    "UI Designer",
    "Web Developer",
    "Next.js",
    "React",
    "Tailwind CSS",
    "GSAP",
    "AWS",
    "JavaScript",
    "Cloud Computing",
    "API Development",
    "Cybersecurity",
    "TypeScript",
    "Desarrollador Web en México",
    "Portafolio de desarrollador",
    "Diseño web moderno",
    "Consultoría técnica",
    "Desarrollo de interfaces",
    "Experiencia de usuario",
    "Desarrollo frontend",
    "Diseño UI/UX",
    "Proyectos web",
    "Desarrollador freelance",
    "Optimización web",
    "Accesibilidad web",
    "Rendimiento web",
    "Desarrollo ágil",
  ],
  authors: [{ name: "Manu de Quevedo", url: "https://manudequevedo.com" }],
  creator: "Manu de Quevedo",
  publisher: "Manu de Quevedo",

  openGraph: {
    title: "Manu de Quevedo | Frontend Developer & UI Designer",
    description:
      "Explora los proyectos de Manu de Quevedo — desarrollo frontend, diseño UI/UX y consultoría técnica con tecnologías modernas.",
    url: "/", // con metadataBase -> https://manudequevedo.com/
    siteName: "Manu de Quevedo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portafolio de Manu de Quevedo",
      },
    ],
    locale: "es_MX",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Manu de Quevedo | Frontend Developer & UI Designer",
    description:
      "Frontend Developer y UI Designer especializado en Next.js, React y TailwindCSS. Portafolio profesional de proyectos web modernos y escalables.",
    images: ["/og-image.png"],
    creator: "@manudequevedo",
  },

  alternates: {
    canonical: "https://manudequevedo.com",
    languages: {
      en: "https://manudequevedo.com/en",
      es: "https://manudequevedo.com/es",
    },
  },

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
