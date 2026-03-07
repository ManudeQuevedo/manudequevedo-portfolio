"use client";

import { useCallback, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MQLogo } from "@/components/ui/MQLogo";

export function Footer() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const [isDownloadingCv, setIsDownloadingCv] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCvDownload = useCallback(async () => {
    if (isDownloadingCv) return;
    setIsDownloadingCv(true);

    try {
      const response = await fetch(`/api/cv?locale=${locale}`);
      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");

      downloadLink.href = objectUrl;
      downloadLink.download = `Manu-de-Quevedo-CV-${locale}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.location.href = `/api/cv?locale=${locale}`;
    } finally {
      setIsDownloadingCv(false);
    }
  }, [isDownloadingCv, locale]);

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
          type="button"
          onClick={handleCvDownload}
          disabled={isDownloadingCv}
          className="border border-brand/50 text-brand px-6 py-2 rounded-sm text-xs font-bold hover:bg-brand hover:text-dark transition-all duration-300 uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed"
          data-cursor="hover">
          {isDownloadingCv ? "Generating..." : t("resume")}
        </button>

        <button
          type="button"
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
