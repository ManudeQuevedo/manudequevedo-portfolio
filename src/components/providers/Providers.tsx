"use client";

import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/ui/PageTransition";
import { useEffect } from "react";
import { initConsoleEasterEgg } from "@/lib/console-easter-egg";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initConsoleEasterEgg();
  }, []);

  return (
    <SmoothScroll>
      <PageTransition>
        <CustomCursor />
        {children}
      </PageTransition>
    </SmoothScroll>
  );
}
