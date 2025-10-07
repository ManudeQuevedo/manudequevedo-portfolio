// src/components/mode-toggle.tsx
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  // Evita hydration mismatch: no renderizar estado dependiente de tema hasta montar
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  // Mientras no haya montado, pinta un contenedor estable (sin ícono) para mantener layout
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative w-10 h-10"
        aria-label="Toggle theme"
        suppressHydrationWarning
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10"
      aria-label="Toggle theme">
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center">
            <MoonIcon className="h-4 w-4 text-foreground" />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center">
            <SunIcon className="h-4 w-4 text-foreground" />
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
