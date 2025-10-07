// src/lib/fonts.ts
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // enlaza con Tailwind 'font-sans'
  display: "swap",
});