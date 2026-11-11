"use client";

import { useEffect, useRef, useState } from "react";
import { MARQUEE_IMAGES } from "@/lib/landing";

const ROW_ONE = MARQUEE_IMAGES.slice(0, 11);
const ROW_TWO = MARQUEE_IMAGES.slice(11);

function Row({ images, offset }: { images: string[]; offset: number }) {
  return (
    <div className="flex gap-3" style={{ transform: `translateX(${offset}px)`, willChange: "transform" }}>
      {[...images, ...images, ...images].map((src, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          loading="lazy"
          draggable={false}
          className="h-[270px] w-[420px] max-w-none shrink-0 rounded-2xl object-cover"
        />
      ))}
    </div>
  );
}

// MarqueeSection renders two rows of previews that slide in opposite directions as the page scrolls.
export function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const update = () => {
      const node = ref.current;
      if (!node) return;
      const top = node.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - top + window.innerHeight) * 0.3);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className="flex flex-col gap-3 overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <Row images={ROW_ONE} offset={offset - 200} />
      <Row images={ROW_TWO} offset={-(offset - 200)} />
    </section>
  );
}
