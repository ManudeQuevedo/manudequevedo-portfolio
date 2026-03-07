"use client";

import { useState } from "react";
import Scene from "@/components/canvas/Scene";
import IntroOverlay from "@/components/ui/IntroOverlay";

// Home preserves the original cinematic canvas experiment that predates the current localized landing page.
export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="w-full h-full relative">
      <div id="canvas-container">
        {/* Pass state to Scene to trigger Warp */}
        <Scene introFinished={introFinished} />
      </div>

      {/* Cinematic Intro Overlay */}
      <IntroOverlay onComplete={() => setIntroFinished(true)} />

      {/* UI Overlay - Only show after intro (or fade in) */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none flex items-center justify-center transition-opacity duration-1000 ${
          introFinished ? "opacity-100" : "opacity-0"
        }`}>
        <div className="pointer-events-auto">
          <h1 className="text-6xl md:text-9xl font-bold text-white/10 tracking-tighter">
            THE SYNAPTIC GALAXY
          </h1>
        </div>
      </div>
    </main>
  );
}
