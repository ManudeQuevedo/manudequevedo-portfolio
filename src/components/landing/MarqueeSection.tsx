"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import { MARQUEE_ROW_ONE, MARQUEE_ROW_TWO } from "@/lib/landing";

const TILE_W = 420;
const TILE_H = 270;
const GAP = 12;
// Tiles per row. Kept small on purpose: 10 tiles = ~4,300 CSS px, which stays under the 16,384 px
// texture limit of mobile GPUs even at 3x pixel density (the old 24-tile rows were ~10,000 px).
const TILES_PER_ROW = 10;
// One tile sits off-screen to the left so the row never shows a gap while it slides right.
const ROW_LEFT_OFFSET = -(TILE_W + GAP);

// buildRow repeats the row's images until it has TILES_PER_ROW tiles.
function buildRow(images: string[]) {
  return Array.from({ length: TILES_PER_ROW }, (_, i) => images[i % images.length]);
}

const ROW_ONE = buildRow(MARQUEE_ROW_ONE);
const ROW_TWO = buildRow(MARQUEE_ROW_TWO);

// RowImages is memoized so scrolling only changes the parent transform, never the image list.
const RowImages = memo(function RowImages({ images }: { images: string[] }) {
  return (
    <>
      {images.map((src, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          width={TILE_W}
          height={TILE_H}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="max-w-none shrink-0 rounded-2xl object-cover object-top"
          style={{ width: TILE_W, height: TILE_H }}
        />
      ))}
    </>
  );
});

// MarqueeSection renders two rows of previews that slide in opposite directions as the page scrolls.
//
// Where the browser supports CSS scroll-driven animations (see globals.css), the sliding runs on the
// compositor and this component does no scroll work at all. Otherwise:
//  - pointer devices fall back to a JS scroll handler (cheap, and in sync on desktop);
//  - touch devices get static rows, because JS scroll handlers lag behind native scrolling on iOS.
export function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const xOne = useMotionValue(-200);
  const xTwo = useMotionValue(200);

  useEffect(() => {
    if (reduceMotion) return;

    // CSS drives the animation; nothing to do in JS.
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()")) return;

    // No scroll-driven animations on a touch device: keep the rows still instead of lagging.
    if (window.matchMedia("(pointer: coarse)").matches) {
      xOne.set(-100);
      xTwo.set(100);
      return;
    }

    let top = 0;
    let frame = 0;

    const measure = () => {
      const node = ref.current;
      if (!node) return;
      top = node.getBoundingClientRect().top + window.scrollY;
    };

    const update = () => {
      frame = 0;
      const offset = (window.scrollY - top + window.innerHeight) * 0.3;
      xOne.set(offset - 200);
      xTwo.set(-(offset - 200));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Content above the marquee can change height (fonts, images), so re-measure when the page does.
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduceMotion, xOne, xTwo]);

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="marquee-section flex flex-col overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ gap: GAP }}>
      <motion.div
        className="marquee-row-a flex"
        style={{ x: xOne, gap: GAP, marginLeft: ROW_LEFT_OFFSET, willChange: "transform" }}>
        <RowImages images={ROW_ONE} />
      </motion.div>
      <motion.div
        className="marquee-row-b flex"
        style={{ x: xTwo, gap: GAP, marginLeft: ROW_LEFT_OFFSET, willChange: "transform" }}>
        <RowImages images={ROW_TWO} />
      </motion.div>
    </section>
  );
}
