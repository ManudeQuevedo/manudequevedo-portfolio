"use client";

import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { memo, useEffect, useRef } from "react";
import { MARQUEE_ROW_ONE, MARQUEE_ROW_TWO } from "@/lib/landing";

// Each row repeats its own set so it stays full-width while sliding.
const REPEATS = 4;

// RowImages is memoized so scrolling only changes the parent transform, never the image list.
const RowImages = memo(function RowImages({ images }: { images: string[] }) {
  return (
    <>
      {Array.from({ length: REPEATS }, () => images).flat().map((src, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          loading="lazy"
          draggable={false}
          className="h-[270px] w-[420px] max-w-none shrink-0 rounded-2xl object-cover object-top"
        />
      ))}
    </>
  );
});

// MarqueeSection renders two rows of previews that slide in opposite directions as the page scrolls.
// Motion values update the transforms directly, so scrolling never re-renders React.
export function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const xOne = useMotionValue(-200);
  const xTwo = useMotionValue(200);

  useEffect(() => {
    if (reduceMotion) return;

    const update = () => {
      const node = ref.current;
      if (!node) return;
      const top = node.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - top + window.innerHeight) * 0.3;
      xOne.set(offset - 200);
      xTwo.set(-(offset - 200));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [reduceMotion, xOne, xTwo]);

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <motion.div className="flex gap-3" style={{ x: xOne, willChange: "transform", marginLeft: "-3000px" }}>
        <RowImages images={MARQUEE_ROW_ONE} />
      </motion.div>
      <motion.div className="flex gap-3" style={{ x: xTwo, willChange: "transform", marginLeft: "-3000px" }}>
        <RowImages images={MARQUEE_ROW_TWO} />
      </motion.div>
    </section>
  );
}
