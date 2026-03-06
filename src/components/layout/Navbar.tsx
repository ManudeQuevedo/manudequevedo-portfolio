"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { MQLogo } from "@/components/ui/MQLogo";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [isDownloadingCv, setIsDownloadingCv] = useState(false);
  const lastScrollY = useRef(0);

  const navLinks = useMemo(
    () => [
      { name: t("about"), href: "#about" },
      { name: t("experience"), href: "#experience" },
      { name: t("projects"), href: "#projects" },
      { name: t("skills"), href: "#skills" },
      { name: t("contact"), href: "#contact" },
    ],
    [t],
  );

  const scrollToSection = useCallback((targetId: string) => {
    const id = targetId.replace("#", "");
    const section = document.getElementById(id);
    if (!section) return false;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    return true;
  }, []);

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

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 32);

        if (!isMobileMenuOpen) {
          if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }

        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const ids = ["hero", ...navLinks.map((link) => link.href.replace("#", ""))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0.2 },
    );

    ids.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [pathname, navLinks]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible || isMobileMenuOpen ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-colors duration-300 h-16 flex items-center",
        isScrolled
          ? "bg-dark/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent",
      )}>
      <div className="layout-container flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="group" data-cursor="hover">
          <MQLogo
            variant="color"
            size={32}
            className="group-hover:drop-shadow-[0_0_8px_rgba(255,107,0,0.5)] transition-all duration-300"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  if (pathname === "/") {
                    scrollToSection(link.href);
                    return;
                  }
                  window.location.href = `/${locale}${link.href}`;
                }}
                className={cn(
                  "text-sm transition-all duration-300 ease-in-out relative py-2 px-4 hover:bg-white/5 rounded-sm",
                  isActive
                    ? "text-brand font-medium"
                    : "text-secondary hover:text-primary",
                )}
                data-cursor="hover">
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right CTA / Language Switch */}
        <div className="hidden md:flex items-center gap-6">
          <LocaleSwitcher />
          <button
            type="button"
            onClick={handleCvDownload}
            disabled={isDownloadingCv}
            className="border border-brand/50 text-brand px-6 py-2 rounded-sm text-xs font-bold hover:bg-brand hover:text-dark transition-all duration-300 uppercase tracking-wider"
            data-cursor="hover">
            {isDownloadingCv ? "Generating..." : t("resume")}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-cursor="hover">
          <motion.span
            animate={
              isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }
            }
            className="w-6 h-0.5 bg-primary rounded-full origin-center"
          />
          <motion.span
            animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-4 h-0.5 bg-primary rounded-full self-end"
          />
          <motion.span
            animate={
              isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }
            }
            className="w-6 h-0.5 bg-primary rounded-full origin-center"
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-dark z-[101] flex flex-col items-center justify-center gap-8 md:hidden pt-[max(env(safe-area-inset-top),1rem)] pb-[max(env(safe-area-inset-bottom),1rem)]">
            {navLinks.map((link, i) => {
              return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}>
                <button
                  type="button"
                  onClick={() => {
                    if (pathname === "/") {
                      scrollToSection(link.href);
                    } else {
                      window.location.href = `/${locale}${link.href}`;
                    }
                    setIsMobileMenuOpen(false);
                  }}
                  className="font-display text-4xl font-bold hover:text-brand transition-colors flex items-center gap-4 text-primary">
                  <span className="text-white/10 text-xl font-mono">
                    0{i + 1}
                  </span>
                  {link.name}
                </button>
              </motion.div>
              );
            })}
            <motion.div
              className="mt-12 flex items-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}>
              <LocaleSwitcher />
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  void handleCvDownload();
                }}
                className="bg-brand text-dark px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                {isDownloadingCv ? "Generating..." : t("resume")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
