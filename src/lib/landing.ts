// Static assets and project metadata for the landing page redesign.

// Own screenshots shown in the scrolling marquee (Bridge Capital, Woodax, Noctra Studio, this portfolio).
export const MARQUEE_IMAGES = [
  "/bridgecapital.png",
  "/woodax-design.png",
  "/noctra-studio.png",
  "/manudequevedo.png",
];

export interface LandingProject {
  slug: string;
  name: string;
  category: "client" | "own";
  image: string;
  link: string | null;
}

export const LANDING_PROJECTS: LandingProject[] = [
  {
    slug: "bridge-capital",
    name: "Bridge Capital",
    category: "client",
    image: "/bridgecapital.png",
    link: null,
  },
  {
    slug: "woodax-design",
    name: "Woodax Design",
    category: "client",
    image: "/woodax-design.png",
    link: null,
  },
  {
    slug: "noctra-studio",
    name: "Noctra Studio",
    category: "own",
    image: "/noctra-studio.png",
    link: "https://noctra.studio",
  },
];
