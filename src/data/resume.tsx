// src/data/resume.ts
import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Manu",
  initials: "MQ",
  url: "https://manudequevedo.com",
  location: "Querétaro, Mexico",
  locationLink: "https://www.google.com/maps/place/Querétaro",
  description:
    "Frontend engineer and UI developer focused on clean design systems, fast user experiences, and practical product delivery.",
  summary:
    "I build interfaces and systems that are clear, fast, and measurable — always with a product mindset.",
  avatarUrl: "/me.jpg",

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],

  contact: {
    email: "contact@manudequevedo.com",
    tel: "+52 555 50 00 228",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/manudequevedo",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/manudequevedo/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:contact@manudequevedo.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      id: "tcs",
      company: "Tata Consultancy Services",
      href: "https://www.tcs.com/",
      location: "Remote",
      title: "UI Developer",
      start: "May 2023",
      end: "Present",
      description:
        "AEM & Tridion content delivery, fragments, and migration support. Cross-team collaboration to improve delivery accuracy.",
    },
    {
      id: "concentrix",
      company: "Concentrix (formerly ProKarma)",
      href: "https://www.concentrix.com/",
      location: "Remote",
      title: "Software Engineer / ServiceNow Developer",
      start: "Sept 2019",
      end: "Apr 2023",
      description:
        "Angular & Node microservices; monitoring with Grafana/Splunk; ServiceNow admin & workflows.",
    },
    {
      id: "quiubas",
      company: "Quiubas",
      href: "https://www.quiubas.com/",
      location: "Mexico City, MX",
      title: "Frontend Developer",
      start: "2018",
      end: "2019",
      description:
        "UI implementation, dashboards and messaging flows; performance and UX improvements.",
    },
    {
      id: "linio",
      company: "Linio México",
      href: "https://www.linio.com.mx/",
      location: "Mexico City, MX",
      title: "Frontend Developer",
      start: "2017",
      end: "2018",
      description:
        "E-commerce frontend features, component library usage, and conversion-focused UI changes.",
    },
  ],

  education: [
    {
      school: "Southern New Hampshire University",
      href: "https://es.snhu.edu/",
      degree: "Bachelor's in Computer Science",
      logoUrl: "/snhu.png",
      start: "2023",
      end: "2024",
    },
    {
      school: "Coursera",
      href: "https://coursera.org",
      degree: "Google Cybersecurity Specialization",
      logoUrl: "/coursera.png",
      start: "2025",
      end: "In Progress",
    },
    {
      school: "IronHack",
      href: "https://ironhack.com",
      degree: "Full Stack Web Development Bootcamp",
      logoUrl: "/ironhack.png",
      start: "2018",
      end: "2018",
    },
  ],

  // --- PROJECTS actualizados con status + id ---
  projects: [
    {
      id: "bridgecapital",
      title: "Bridge Capital",
      href: "https://bridgecapital.mx",
      dates: "May 2025 – June 2025",
      status: "completed", // <- i18n badge: Completed / Completado
      description:
        "Localized portfolio (ES/EN) with animated dock, projects grid, and A11y-friendly UI.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "GSAP", "Resend"],
      links: [{ type: "Website", href: "https://bridgecapital.mx" }],
      image: "/bridgecapital.png",
    },
    {
      id: "noctra",
      title: "Noctra Studio",
      href: "https://noctra.studio",
      dates: "2025 – Present",
      status: "in_progress", // <- i18n badge: In Progress / En desarrollo
      description:
        "Studio focused on performant frontends and brand systems for startups and non-profits.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "Design Systems"],
      links: [
        { type: "Website", href: "https://noctra.studio" },
        {
          type: "GitHub",
          href: "https://github.com/ManudeQuevedo/noctra-studio",
        },
      ],
      image: "/noctra.png",
    },
    {
      id: "woodax",
      title: "Woodax Design",
      href: "Website is coming soon!", // o provisional
      dates: "Aug. 2025 – Present",
      status: "in_progress",
      description:
        "Brand site and product showcase with fast, minimal UI and CMS integration.",
      technologies: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "next-intl",
        "UI/UX",
      ],
      links: [{ type: "Website", href: "Website is coming soon!" }],
      image: "/woodax-design.png", // coloca un placeholder en /public
    },
    {
      id: "dyma",
      title: "Dyma Group",
      href: "https://dymagroup.com.mx", // o provisional
      dates: "Sept.2025 – Present",
      status: "in_progress",
      description:
        "Corporate website revamp focused on performance, accessibility, and multilingual content.",
      technologies: ["Next.js", "TypeScript", "TailwindCSS", "UI/UX"],
      links: [{ type: "Website", href: "https://dymagroup.com.mx" }],
      image: "/dyma.png",
    },
  ],
} as const;

// SKILLS sin cambios
export const SKILLS = {
  headingKey: "sections.skills_title",
  subtitleKey: "sections.skills_sub",
  groups: [
    {
      id: "soft",
      titleKey: "sections.skills_soft",
      items: [
        "Giving and receiving feedback",
        "Creativity",
        "Teamwork",
        "Active listening",
        "Problem solving",
        "Critical thinking",
        "Ownership",
        "Adaptability",
        "A Desire to Learn",
      ],
    },
    {
      id: "frontend",
      titleKey: "sections.skills_frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "Material UI",
        "Tailwind CSS",
        "Redux",
        "Git",
        "Figma",
        "Accessibility (A11y)",
        "Performance Optimization",
        "SEO Best Practices",
        "Responsive Design",
        "Cross-Browser Compatibility",
      ],
    },
    {
      id: "backend",
      titleKey: "sections.skills_backend",
      items: ["Node.js", "Express JS", "Microservices", "REST"],
    },
    {
      id: "databases",
      titleKey: "sections.skills_db",
      items: ["PostgreSQL", "MySQL", "MongoDB", "NoSQL", "Firebase"],
    },
    {
      id: "cloud",
      titleKey: "sections.skills_cloud",
      items: [
        "AWS (basic)",
        "Service Models (IaaS, PaaS, SaaS)",
        "Scalability & Elasticity",
        "High Availability & Fault Tolerance",
        "CDN (CloudFront)",
        "Serverless (Lambda)",
        "Kubernetes (basic)",
        "Cloudflare Workers",
      ],
    },
    {
      id: "security",
      titleKey: "sections.skills_security",
      items: [
        "Monitoring",
        "Grafana",
        "Splunk",
        "ServiceNow (ITSM)",
        "Cross-Site Scripting (XSS)",
        "CSRF",
        "OWASP Top 10",
        "Content Security Policy (CSP)",
      ],
    },
  ],
  footnoteKey: "sections.skills_footnote",
} as const;
