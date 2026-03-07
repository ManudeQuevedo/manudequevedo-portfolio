"use client";

import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/ui/PageTransition";
import { CaseStudyModalProvider } from "@/components/providers/CaseStudyModalProvider";
import { useEffect } from "react";
import { initConsoleEasterEgg } from "@/lib/console-easter-egg";
import { usePathname } from "@/i18n/routing";
import { getLenisInstance } from "@/lib/lenis";

// Providers is the client-side infrastructure stack for smooth scroll, page transitions, cursor, and modal state.
export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initConsoleEasterEgg();
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const jumpToTop = () => {
      const lenis = getLenisInstance();

      if (lenis) {
        (lenis as any).scrollTo(0, { immediate: true, force: true });
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    jumpToTop();
    const rafA = window.requestAnimationFrame(jumpToTop);
    const rafB = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(jumpToTop);
    });

    return () => {
      window.cancelAnimationFrame(rafA);
      window.cancelAnimationFrame(rafB);
    };
  }, [pathname]);

  return (
    <SmoothScroll>
      <PageTransition>
        <CaseStudyModalProvider>
          <CustomCursor />
          {children}
        </CaseStudyModalProvider>
      </PageTransition>
    </SmoothScroll>
  );
}
