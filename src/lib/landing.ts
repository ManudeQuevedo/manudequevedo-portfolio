// Static assets and project metadata for the landing page redesign.

// Marquee rows: curated project screenshots, mixed across projects so neighbours differ.
export const MARQUEE_ROW_ONE = [
  "/projects/bridge-hero.webp",
  "/projects/woodax-hero.webp",
  "/projects/cnc-hero.webp",
  "/projects/noctra-hero.webp",
  "/projects/woodax-recent.webp",
  "/projects/cnc-machine.webp",
];

export const MARQUEE_ROW_TWO = [
  "/projects/bridge-services.webp",
  "/projects/noctra-ops.webp",
  "/projects/woodax-gallery.webp",
  "/projects/cnc-materials.webp",
  "/projects/bridge-calculator.webp",
  "/projects/noctra-thesis.webp",
];

export interface LandingImage {
  src: string;
  position?: string;
}

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
      { src: "/projects/bridge-calculator.webp", position: "center" },
      { src: "/projects/bridge-services.webp", position: "center" },
      { src: "/projects/bridge-hero.webp", position: "center" },
    ],
    link: null,
  },
  {
    slug: "woodax-design",
    name: "Woodax Design",
    category: "client",
    images: [
      { src: "/projects/woodax-recent.webp", position: "center" },
      { src: "/projects/woodax-gallery.webp", position: "center" },
      { src: "/projects/woodax-hero.webp", position: "center" },
    ],
    link: "https://woodax.design",
  },
  {
    slug: "cnc-woodax",
    name: "CNC by Woodax Design",
    category: "product",
    images: [
      { src: "/projects/cnc-machine.webp", position: "center" },
      { src: "/projects/cnc-materials.webp", position: "center" },
      { src: "/projects/cnc-hero.webp", position: "center" },
    ],
    link: "https://cnc.woodax.design",
  },
  {
    slug: "noctra-studio",
    name: "Noctra Studio",
    category: "own",
    images: [
      { src: "/projects/noctra-ops.webp", position: "center" },
      { src: "/projects/noctra-thesis.webp", position: "center" },
      { src: "/projects/noctra-hero.webp", position: "center" },
    ],
    link: "https://noctra.studio",
  },
];
