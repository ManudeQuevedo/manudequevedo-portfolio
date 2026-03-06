export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  link: string | null;
  github: string | null;
  status: string;
  year: string;
  category: "web" | "mobile" | "ai";
  position: [number, number, number];
  challenge?: string;
  solution?: string;
}

export const experience = [
  {
    id: 0,
    company: "Noctra Studio",
    role: "Founder & Lead Engineer",
    period: "2025 — Present",
    location: "Querétaro, MX",
    description: "Frontend agency building performant digital products for startups and businesses in LATAM.",
    highlight: "Built and shipped 4 client projects in the first 6 months.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
    isFounder: true
  },
  {
    id: 1,
    company: "Tata Consultancy Services",
    role: "UI Developer",
    period: "Apr 2023 — Present",
    location: "Remote",
    description: "Building scalable UI systems for enterprise clients with React, TypeScript and accessibility standards.",
    highlight: "Led the migration of 3 legacy interfaces to a design system serving 50k+ users.",
    tags: ["React", "TypeScript", "A11y", "Design Systems"]
  },
  {
    id: 2,
    company: "Concentrix (ProKarma)",
    role: "Software Engineer / ServiceNow Dev",
    period: "Sep 2019 — Apr 2023",
    location: "Remote",
    description: "Full-stack development and ITSM platform customization.",
    highlight: "Reduced ticket resolution time 40% by rebuilding the frontend workflow from scratch.",
    tags: ["ServiceNow", "React", "JavaScript", "ITSM"]
  },
  {
    id: 3,
    company: "Quiubas Mobile",
    role: "Software Engineer",
    period: "Apr 2019 — Aug 2019",
    location: "Remote",
    description: "Frontend development for SMS/messaging SaaS platform.",
    highlight: "Part of the product team when Twilio acquired the company.",
    tags: ["JavaScript", "Node.js", "APIs"]
  },
  {
    id: 4,
    company: "Linio México",
    role: "Software Engineer",
    period: "Jan 2019 — Apr 2019",
    location: "México",
    description: "E-commerce frontend for one of Latin America's largest marketplaces.",
    highlight: "First production React codebase. Shipped in a team of 12 engineers.",
    tags: ["React", "E-commerce", "Performance"]
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Bridge Capital",
    description: "Localized portfolio (ES/EN) with animated dock, projects grid, and A11y-friendly UI.",
    challenge: "Client needed a bilingual portfolio deployable in 3 weeks.",
    solution: "Built atomic design system first, then composed pages in 2 days.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "GSAP"],
    link: "#",
    github: null,
    status: "live",
    year: "2025",
    category: "web",
    position: [0, 0, 0]
  },
  {
    id: 2,
    title: "Woodax Design",
    description: "Brand site and product showcase with fast, minimal UI and CMS integration.",
    challenge: "Deliver a premium visual experience without sacrificing load times.",
    solution: "Leveraged Next.js Image optimization and lightweight CSS animations.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "next-intl", "UI/UX"],
    link: null,
    github: null,
    status: "wip",
    year: "2025",
    category: "mobile",
    position: [-5, -2, -10]
  },
  {
    id: 3,
    title: "Dyma Group",
    description: "Corporate website revamp focused on performance, accessibility, and multilingual content.",
    challenge: "Modernize a legacy enterprise site while maintaining SEO rankings.",
    solution: "Implemented strict semantic HTML and Server Components for fast time-to-first-byte.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "UI/UX"],
    link: null,
    github: null,
    status: "wip",
    year: "2025",
    category: "ai",
    position: [2, -5, -15]
  },
  {
    id: 4,
    title: "This Portfolio",
    description: "You're looking at it. Built with Next.js 16, TailwindCSS v4, Framer Motion, and Lenis. Bilingual (ES/EN), custom cursor, terminal animation, and sticky scroll.",
    challenge: "The portfolio itself had to be the proof of concept.",
    solution: "Every interaction — cursor, scroll, terminal — is intentional craft.",
    tags: ["Next.js", "TailwindCSS", "Framer Motion", "GSAP", "next-intl"],
    link: "https://manudequevedo.com",
    github: "https://github.com/manudequevedo/manudequevedo-portfolio",
    status: "live",
    year: "2026",
    category: "web",
    position: [5, 2, -5]
  }
];

export const skills = {
  frontend: [
    { name: "React", level: "expert", context: "5+ years, production at scale" },
    { name: "Next.js", level: "expert", context: "App Router, RSC, i18n" },
    { name: "TypeScript", level: "expert", context: "Strict mode, full coverage" },
    { name: "TailwindCSS", level: "proficient", context: "Custom design systems" },
    { name: "Framer Motion", level: "proficient", context: "Complex micro-interactions" },
    { name: "GSAP", level: null, context: null },
    { name: "JavaScript ES6+", level: null, context: null },
    { name: "Figma", level: null, context: null },
    { name: "A11y", level: null, context: null },
    { name: "Performance Optimization", level: null, context: null }
  ],
  cloud: [
    { name: "AWS", level: "learning", context: "Lambda, S3, CloudFront" },
    { name: "Cloudflare Workers", level: "learning", context: "Edge computing" },
    { name: "Docker", level: "learning", context: "Containerization basics" },
    { name: "Serverless (Lambda)", level: null, context: null },
    { name: "Kubernetes (basic)", level: null, context: null },
    { name: "CDN (CloudFront)", level: null, context: null }
  ],
  security: [
    { name: "OWASP Top 10", level: "proficient", context: "Security by default" },
    { name: "Content Security Policy", level: "proficient", context: "XSS prevention" },
    { name: "XSS", level: "proficient", context: "Vulnerability mitigation" },
    { name: "CSRF", level: null, context: null },
    { name: "Penetration Testing Basics", level: null, context: null }
  ],
  ai: [
    { name: "Prompt Engineering", level: "expert", context: "Advanced LLM steering" },
    { name: "LLM API Integration", level: "expert", context: "OpenAI & Claude" },
    { name: "AI Workflow Automation", level: "proficient", context: "Agentic flows" }
  ],
  tools: [
    { name: "Git", level: "expert", context: "Version control" },
    { name: "VS Code", level: "expert", context: "IDE of choice" },
    { name: "Cursor", level: "expert", context: "AI pair programming" },
    { name: "Vercel", level: "proficient", context: "Deployment & CI/CD" },
    { name: "Supabase", level: "proficient", context: "Backend as a Service" },
    { name: "PostgreSQL", level: null, context: null },
    { name: "MongoDB", level: null, context: null }
  ]
};
