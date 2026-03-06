import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manu de Quevedo | Frontend Engineer & UI Architect",
  description:
    "Portfolio de Manu de Quevedo. Frontend Engineer especializado en experiencias digitales inmersivas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
