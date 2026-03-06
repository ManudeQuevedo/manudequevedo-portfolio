"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { MQLogo } from "@/components/ui/MQLogo";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navLinks = [
    { name: t("about"), href: "#about" },
    { name: t("experience"), href: "#experience" },
    { name: t("projects"), href: "#projects" },
    { name: t("skills"), href: "#skills" },
    { name: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-colors duration-300 h-16 flex items-center px-6 md:px-12",
        isScrolled
          ? "bg-dark/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent",
      )}>
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
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
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors duration-200 relative py-1",
                  isActive ? "text-brand" : "text-secondary hover:text-primary",
                )}
                data-cursor="hover">
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right CTA / Language Switch */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-bold tracking-tighter text-secondary">
            <Link
              href="/"
              locale="es"
              className={cn(
                pathname.includes("/es") ? "text-brand" : "hover:text-primary",
              )}>
              ES
            </Link>
            <span className="opacity-20">/</span>
            <Link
              href="/"
              locale="en"
              className={cn(
                pathname.includes("/en") ? "text-brand" : "hover:text-primary",
              )}>
              EN
            </Link>
          </div>
          <Link
            href="/resume.pdf"
            className="border border-brand/50 text-brand px-4 py-1.5 rounded-sm text-xs font-medium hover:bg-brand hover:text-dark transition-all duration-300"
            data-cursor="hover">
            {t("resume")}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
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
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-dark z-[101] flex flex-col items-center justify-center gap-8 md:hidden">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-4xl font-bold hover:text-brand transition-colors">
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
