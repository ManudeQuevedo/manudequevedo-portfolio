"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { MQLogo } from "@/components/ui/MQLogo";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function MobileMenuIcon({ isOpen }: { isOpen: boolean }) {
  const spring = {
    type: "spring" as const,
    stiffness: 430,
    damping: 30,
    mass: 0.7,
  };

  return (
    <span className="relative block h-5 w-5" aria-hidden="true">
      <motion.span
        animate={
          isOpen
            ? { rotate: 45, y: 0, x: 0, width: 20 }
            : { rotate: 0, y: -6, x: 0, width: 18 }
        }
        transition={spring}
        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white origin-center"
      />
      <motion.span
        animate={
          isOpen
            ? { opacity: 0, scaleX: 0.4, x: 8 }
            : { opacity: 1, scaleX: 1, x: 4 }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-0 top-1/2 h-[2px] w-3 -translate-y-1/2 rounded-full bg-white origin-left"
      />
      <motion.span
        animate={
          isOpen
            ? { rotate: -45, y: 0, x: 0, width: 20 }
            : { rotate: 0, y: 6, x: 0, width: 14 }
        }
        transition={spring}
        className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white origin-center"
      />
    </span>
  );
}

// Navbar coordinates section tracking, mobile navigation, and CV download from the global page chrome.
export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [isDownloadingCv, setIsDownloadingCv] = useState(false);
  const [isClient, setIsClient] = useState(false);
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
    setIsClient(true);
  }, []);

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
    const previousPaddingRight = document.body.style.paddingRight;
    const isDesktopViewport = window.innerWidth >= 768;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    if (isDesktopViewport && scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
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
      initial={{ top: -100 }}
      animate={{ top: isVisible || isMobileMenuOpen ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 w-full z-[100] transition-[background-color,backdrop-filter] duration-300 h-16 flex items-center",
        isScrolled || isMobileMenuOpen
          ? "bg-dark/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.05)]"
          : "bg-transparent",
      )}>
      <div className="layout-container flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="group inline-flex min-h-11 min-w-11 md:min-h-0 md:min-w-0 items-center justify-center rounded-sm"
          data-cursor="hover">
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
                  "group relative inline-flex min-h-11 items-center justify-center rounded-sm px-4 py-2 text-sm transition-all duration-300 ease-in-out hover:bg-white/5",
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
            className="inline-flex min-h-11 items-center justify-center border border-brand/50 text-brand px-6 py-2 rounded-sm text-xs font-bold hover:bg-brand hover:text-dark transition-all duration-300 uppercase tracking-wider"
            data-cursor="hover">
            {isDownloadingCv ? "Generating..." : t("resume")}
          </button>
        </div>

        {/* Mobile Toggle Placeholder (real toggle is fixed via portal to prevent viewport jumps) */}
        <div className="md:hidden h-11 w-11" aria-hidden="true" />
      </div>

      {/* Mobile Menu Overlay */}
      {isClient
        ? createPortal(
            <>
              <button
                type="button"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-menu"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "md:hidden fixed inline-flex h-11 w-11 min-h-11 min-w-11 items-center justify-center rounded-full bg-transparent text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-dark",
                  isMobileMenuOpen ? "z-[10020]" : "z-[120]",
                  isMobileMenuOpen ? "text-brand" : "text-white hover:text-brand",
                )}
                style={{
                  right: "max(env(safe-area-inset-right), 24px)",
                  top: "max(env(safe-area-inset-top), 10px)",
                }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-cursor="hover">
                <MobileMenuIcon isOpen={isMobileMenuOpen} />
              </button>

              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div
                    id="mobile-nav-menu"
                    role="dialog"
                    aria-modal="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="fixed inset-0 z-[9999] isolate bg-black/98 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <motion.div
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 24, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="relative flex h-full w-full flex-col items-center justify-center px-5 pt-[max(env(safe-area-inset-top),16px)] pb-[max(env(safe-area-inset-bottom),16px)]"
                      onClick={(event) => event.stopPropagation()}>
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              delayChildren: 0.05,
                              staggerChildren: 0.05,
                            },
                          },
                        }}
                        className="flex flex-col items-center gap-5">
                        {navLinks.map((link, i) => {
                          const sectionId = link.href.replace("#", "");
                          const isActive = activeSection === sectionId;

                          return (
                            <motion.div
                              key={link.href}
                              variants={{
                                hidden: { opacity: 0, y: 18 },
                                visible: {
                                  opacity: 1,
                                  y: 0,
                                  transition: {
                                    duration: 0.28,
                                    ease: "easeOut",
                                  },
                                },
                              }}>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsMobileMenuOpen(false);

                                  if (pathname === "/") {
                                    scrollToSection(link.href);
                                    return;
                                  }

                                  window.location.href = `/${locale}${link.href}`;
                                }}
                                className={cn(
                                  "flex min-h-11 items-center gap-4 px-3 py-3 font-display text-[2rem] leading-none font-bold transition-colors duration-200",
                                  isActive
                                    ? "text-brand"
                                    : "text-primary hover:text-brand",
                                )}>
                                <span className="text-white/25 text-xl font-mono">
                                  0{i + 1}
                                </span>
                                {link.name}
                              </button>
                            </motion.div>
                          );
                        })}
                      </motion.div>

                      <motion.div
                        className="mt-10 flex items-center gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 0.28,
                          ease: "easeOut",
                          delay: 0.22,
                        }}>
                        <LocaleSwitcher />
                        <button
                          type="button"
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            void handleCvDownload();
                          }}
                          className="inline-flex min-h-11 items-center justify-center bg-brand text-dark px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                          {isDownloadingCv ? "Generating..." : t("resume")}
                        </button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>,
            document.body,
          )
        : null}
    </motion.nav>
  );
}
