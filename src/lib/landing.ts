// Static assets and project metadata for the landing page redesign.

// Own screenshots shown in the scrolling marquee (Bridge Capital, Woodax, Noctra Studio, this portfolio).
export const MARQUEE_IMAGES = [
  "/bridgecapital.png",
  "/woodax-design.png",
  "/noctra-studio.png",
  "/manudequevedo.png",
];

export interface LandingImage {
  src: string;
  position?: string;
}

export interface LandingProject {
  slug: string;
  name: string;
  category: "client" | "own";
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
      { src: "/bridgecapital.png", position: "top" },
      { src: "/bridgecapital.png", position: "bottom" },
      { src: "/bridgecapital.png", position: "center" },
    ],
    link: null,
  },
  {
    slug: "woodax-design",
    name: "Woodax Design",
    category: "client",
    images: [
      { src: "/projects/woodax-footer.webp", position: "center" },
      { src: "/projects/woodax-gallery.webp", position: "bottom" },
      { src: "/projects/woodax-gallery.webp", position: "center" },
    ],
    link: null,
  },
  {
    slug: "noctra-studio",
    name: "Noctra Studio",
    category: "own",
    images: [
      { src: "/projects/noctra-ops.webp", position: "center" },
      { src: "/projects/noctra-footer.webp", position: "center" },
      { src: "/projects/noctra-hero.webp", position: "center" },
    ],
    link: "https://noctra.studio",
  },
];
