// Static assets and project metadata for the landing page redesign.

// Marquee rows: small 840px thumbnails of the project screenshots (tiles render at 420px), mixed across projects.
export const MARQUEE_ROW_ONE = [
  "/projects/marquee/bridge-hero.webp",
  "/projects/marquee/woodax-hero.webp",
  "/projects/marquee/cnc-hero.webp",
  "/projects/marquee/noctra-hero.webp",
  "/projects/marquee/woodax-recent.webp",
  "/projects/marquee/cnc-machine.webp",
];

export const MARQUEE_ROW_TWO = [
  "/projects/marquee/bridge-services.webp",
  "/projects/marquee/noctra-ops.webp",
  "/projects/marquee/woodax-gallery.webp",
  "/projects/marquee/cnc-materials.webp",
  "/projects/marquee/bridge-calculator.webp",
  "/projects/marquee/noctra-thesis.webp",
];

export interface LandingImage {
  src: string;
  position?: string;
}

export interface LandingProject {
  slug: string;
  name: string;
  category: "client" | "own" | "product";
  // [left top, left bottom, right tall]
  images: [LandingImage, LandingImage, LandingImage];
  link: string | null;
}

export const LANDING_PROJECTS: LandingProject[] = [
  {
    slug: "bridge-capital",
    name: "Bridge Capital",
    category: "client",
    images: [
      { src: "/projects/marquee/bridge-calculator.webp", position: "center" },
      { src: "/projects/marquee/bridge-services.webp", position: "center" },
      { src: "/projects/marquee/bridge-hero.webp", position: "center" },
    ],
    link: "https://bridgecapital.mx",
  },
  {
    slug: "woodax-design",
    name: "Woodax Design",
    category: "client",
    images: [
      { src: "/projects/marquee/woodax-recent.webp", position: "center" },
      { src: "/projects/marquee/woodax-gallery.webp", position: "center" },
      { src: "/projects/marquee/woodax-hero.webp", position: "center" },
    ],
    link: "https://woodax.design",
  },
  {
    slug: "cnc-woodax",
    name: "CNC by Woodax Design",
    category: "product",
    images: [
      { src: "/projects/marquee/cnc-machine.webp", position: "center" },
      { src: "/projects/marquee/cnc-materials.webp", position: "center" },
      { src: "/projects/marquee/cnc-hero.webp", position: "center" },
    ],
    link: "https://cnc.woodax.design",
  },
  {
    slug: "noctra-studio",
    name: "Noctra Studio",
    category: "own",
    images: [
      { src: "/projects/marquee/noctra-ops.webp", position: "center" },
      { src: "/projects/marquee/noctra-thesis.webp", position: "center" },
      { src: "/projects/marquee/noctra-hero.webp", position: "center" },
    ],
    link: "https://noctra.studio",
  },
];
