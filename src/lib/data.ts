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
}

export const experience = [
  {
    id: 1,
    company: "Tata Consultancy Services",
    role: "UI Developer",
    period: "Apr 2023 — Present",
    location: "Remote",
    description: "Building scalable UI systems for enterprise clients with React, TypeScript and accessibility standards.",
    tags: ["React", "TypeScript", "A11y", "Design Systems"]
  },
  {
    id: 2,
    company: "Concentrix (ProKarma)",
    role: "Software Engineer / ServiceNow Dev",
    period: "Sep 2019 — Apr 2023",
    location: "Remote",
    description: "Full-stack development and ITSM platform customization. Led frontend migration to React.",
    tags: ["ServiceNow", "React", "JavaScript", "ITSM"]
  },
  {
    id: 3,
    company: "Quiubas Mobile (acq. by Twilio)",
    role: "Software Engineer",
    period: "Apr 2019 — Aug 2019",
    location: "Remote",
    description: "Frontend development for SMS/messaging SaaS platform acquired by Twilio.",
    tags: ["JavaScript", "Node.js", "APIs"]
  },
  {
    id: 4,
    company: "Linio México",
    role: "Software Engineer",
    period: "Jan 2019 — Apr 2019",
    location: "México",
    description: "E-commerce frontend development for one of Latin America's largest marketplaces.",
    tags: ["React", "E-commerce", "Performance"]
  }
]

export const projects: Project[] = [
  {
    id: 1,
    title: "Bridge Capital",
    description: "Localized portfolio (ES/EN) with animated dock, projects grid, and A11y-friendly UI.",
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
    title: "Noctra Studio",
    description: "Agency focused on performant frontends and brand systems for startups and non-profits.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Design Systems"],
    link: null,
    github: "#",
    status: "live",
    year: "2025",
    category: "web",
    position: [5, 2, -5]
  },
  {
    id: 3,
    title: "Woodax Design",
    description: "Brand site and product showcase with fast, minimal UI and CMS integration.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "next-intl", "UI/UX"],
    link: null,
    github: null,
    status: "wip",
    year: "2025",
    category: "mobile",
    position: [-5, -2, -10]
  },
  {
    id: 4,
    title: "Dyma Group",
    description: "Corporate website revamp focused on performance, accessibility, and multilingual content.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "UI/UX"],
    link: null,
    github: null,
    status: "wip",
    year: "2025",
    category: "ai",
    position: [2, -5, -15]
  }
]

export const skills = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript ES6+", "TailwindCSS", "Framer Motion", "GSAP", "Figma", "A11y", "Performance Optimization"],
  cloud: ["AWS (basic)", "Kubernetes (basic)", "Cloudflare Workers", "Serverless (Lambda)", "CDN (CloudFront)", "Docker"],
  security: ["OWASP Top 10", "XSS", "CSRF", "Content Security Policy", "Penetration Testing Basics"],
  ai: ["Prompt Engineering", "LLM API Integration", "Claude API", "OpenAI API", "AI Workflow Automation"],
  tools: ["Git", "GitHub", "VS Code", "Cursor", "Vercel", "Supabase", "PostgreSQL", "MongoDB"]
}
