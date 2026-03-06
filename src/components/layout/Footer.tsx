"use client";

import { useTranslations } from "next-intl";
import { MQLogo } from "@/components/ui/MQLogo";

export function Footer() {
  const t = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/5 py-20 md:py-32 bg-dark">
      <div className="layout-container flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <MQLogo variant="mono" size={20} className="opacity-20" />
          <p className="text-[11px] text-tertiary tracking-widest font-body uppercase">
            © {currentYear} Manu de Quevedo
          </p>
        </div>

        <p className="text-[11px] text-tertiary tracking-widest font-body italic">
          Designed & Built with obsession.
        </p>

        <button
          onClick={scrollToTop}
          className="text-[11px] text-tertiary hover:text-brand tracking-widest font-body uppercase flex items-center gap-2 transition-colors group"
          data-cursor="hover">
          <span className="group-hover:-translate-y-1 transition-transform duration-300">
            ↑
          </span>{" "}
          Back to top
        </button>
      </div>
    </footer>
  );
}
