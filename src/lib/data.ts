export interface PainPoint {
  id: string;
  title: string;
  severity: "critical" | "major" | "minor";
  description: string;
  fix: string;
  metric?: {
    label: string;
    before: string;
    after: string;
    delta: string;
    positive: boolean;
  };
}

export interface CaseStudy {
  overview: string;
  role: string;
  duration: string;
  scope: string[];
  painPoints: PainPoint[];
  results: {
    label: string;
    value: string;
    description?: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface Project {
  id: number;
  slug: "bridge-capital" | "woodax-design" | "noctra-studio" | "this-portfolio";
  caseStudyKey:
    | "bridgeCapital"
    | "woodaxDesign"
    | "noctraStudio"
    | "thisPortfolio";
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
  outcomeKey?: string;
  image: string;
  caseStudy: CaseStudy;
}

export interface ExperienceItem {
  id: number;
  company: string;
  role: string;
  employmentType?: string;
  period: string;
  location: string;
  description: string;
  highlight?: string;
  details?: string[];
  metricKey?: string;
  tags: string[];
  isFounder?: boolean;
}

// TODO: Validate and replace placeholder impact metrics with exact tracked values.
export const experience: ExperienceItem[] = [
  {
    id: 0,
    company: "Noctra Studio",
    role: "Founder & Lead Engineer",
    period: "2025 — Present",
    location: "Querétaro, MX",
    description: "Frontend agency building performant digital products for startups and businesses in LATAM.",
    highlight: "Built and shipped 4 client projects in the first 6 months.",
    metricKey: "noctra_clients_6m",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
    isFounder: true,
  },
  {
    id: 1,
    company: "Tata Consultancy Services",
    role: "UI Developer",
    employmentType: "Full-time",
    period: "Apr 2023 - Present · 3 yrs",
    location: "Queretaro, Queretaro, Mexico · Remote",
    description:
      "While my role evolved to support the Publishing team during a large-scale AEM migration, I took ownership as the primary technical bridge between content and engineering.",
    highlight:
      "Designed and implemented a full onboarding and mentorship program from scratch, reducing ramp-up time and recurring errors for new team members.",
    details: [
      "Proactively investigated and pre-diagnosed performance issues and bugs in AEM React components, helping developers accelerate resolution cycles.",
      "Created technical documentation and practical guides to standardize workflows across the team.",
      "Conceptualized an internal knowledge base portal and designed its security architecture with SSO and role-based access control.",
    ],
    metricKey: "tcs_ui_system",
    tags: ["AEM", "React", "TypeScript", "Documentation", "SSO", "RBAC"],
  },
  {
    id: 2,
    company: "Concentrix Catalyst",
    role: "Software Engineer / ServiceNow Developer",
    employmentType: "Full-time",
    period: "Sep 2019 - Apr 2023 · 3 yrs 8 mos",
    location: "Mexico · Hybrid",
    description:
      "As a Software Engineer, I collaborated on migrating the T-Mobile web application from AngularJS to Angular 7, and later evolved into a ServiceNow Developer role focused on platform reliability.",
    highlight:
      "Led production incident response, driving root-cause analysis and coordination with engineering teams to sustain high system availability.",
    details: [
      "Refactored frontend components and wrote unit tests with Jest/Mocha inside a microservices architecture.",
      "Customized Incident, CMDB, and Service Catalog modules using Business Rules and Script Includes.",
      "Expanded into DevOps and monitoring workflows with Splunk and Grafana to improve operational visibility.",
    ],
    metricKey: "concentrix_resolution",
    tags: ["Angular 7", "ServiceNow", "Jest", "Mocha", "Splunk", "Grafana"],
  },
  {
    id: 3,
    company: "Quiubas Mobile (acquired by Twilio)",
    role: "Software Engineer (Short-Term Project)",
    employmentType: "Seasonal",
    period: "Apr 2019 - Aug 2019 · 5 mos",
    location: "Queretaro, Mexico · Remote",
    description:
      "Worked on the front-end team that rewrote the full client-side codebase from AngularJS to vanilla React.js.",
    highlight: "Contributed during the stage prior to Quiubas Mobile's acquisition by Twilio.",
    details: [
      "Built functional components with Hooks API (useState/useEffect) to simplify state and side-effect handling.",
      "Structured complex responsive layouts with CSS Grid without relying on third-party layout libraries.",
      "Collaborated in an Agile workflow with daily stand-ups and two-week sprints for incremental releases.",
    ],
    metricKey: "quiubas_acquisition",
    tags: ["React", "Hooks API", "CSS Grid", "Agile", "JavaScript"],
  },
  {
    id: 4,
    company: "Linio Group",
    role: "Web Content Specialist",
    period: "May 2017 - Mar 2019 · 1 yr 11 mos",
    location: "Mexico City, Mexico · Hybrid",
    description:
      "This role is where I discovered my path into software engineering. I went beyond content operations and started building internal tooling and process improvements.",
    highlight:
      "Built an internal email-generation tool using Twig (PHP) while managing multi-regional website content.",
    details: [
      "Managed multi-regional web content using HTML, CSS, and JavaScript.",
      "Gained first hands-on experience with AWS and web operations, which motivated my full transition into engineering.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Twig (PHP)", "AWS"],
  },
];

// TODO: Validate and replace case-study placeholder values with production analytics/client-approved metrics.
export const projects: Project[] = [
  {
    id: 1,
    slug: "bridge-capital",
    caseStudyKey: "bridgeCapital",
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
    outcomeKey: "bridge_delivery",
    position: [0, 0, 0],
    image: "/bridgecapital.png",
    caseStudy: {
      overview:
        "Bridge Capital needed a bilingual investment portfolio shipped in under three weeks, with premium visual credibility and mobile-first performance for high-net-worth visitors.",
      role: "Lead Frontend Engineer & UI/UX Designer",
      duration: "3 weeks",
      scope: ["Design System", "Bilingual UI (ES/EN)", "A11y", "Performance"],
      painPoints: [
        {
          id: "no-design-system",
          title: "No reusable component foundation",
          severity: "critical",
          description:
            "The initial Figma handoff had inconsistent spacing, duplicate button styles, and no typography scale. Every section behaved like a one-off implementation.",
          fix:
            "Established design tokens and atomic primitives first, then assembled page sections from reusable components. This reduced implementation friction and review cycles.",
          metric: {
            label: "Development speed",
            before: "~8 days estimate",
            after: "2 days actual",
            delta: "-75%",
            positive: true,
          },
        },
        {
          id: "no-i18n-architecture",
          title: "No internationalization architecture",
          severity: "major",
          description:
            "The project started as Spanish-only. Midway through delivery, the client requested a full English version without delaying launch.",
          fix:
            "Integrated next-intl with locale-aware routing and dictionary-based content. This allowed language expansion without template rewrites.",
          metric: {
            label: "Time to add EN version",
            before: "Estimated 3 days",
            after: "4 hours",
            delta: "-94%",
            positive: true,
          },
        },
        {
          id: "asset-performance-bottleneck",
          title: "Unoptimized assets hurting LCP",
          severity: "major",
          description:
            "Initial visual assets were heavy and loaded without prioritization, increasing above-the-fold render time on mobile networks.",
          fix:
            "Compressed assets, used Next.js Image priorities, and staged loading for non-critical visuals to improve perceived and measured speed.",
          metric: {
            label: "Largest Contentful Paint",
            before: "4.2s",
            after: "0.9s",
            delta: "-79%",
            positive: true,
          },
        },
      ],
      results: [
        { label: "Lighthouse Performance", value: "97", description: "Mobile score" },
        { label: "Delivery time", value: "3 weeks", description: "On schedule" },
        { label: "Languages", value: "2", description: "ES + EN at launch" },
        { label: "A11y score", value: "100", description: "Zero violations" },
      ],
      testimonial: {
        quote:
          "We expected a landing page. What we got was a scalable product foundation we could keep building on.",
        author: "Bridge Capital Team",
        role: "Stakeholder Feedback",
      },
    },
  },
  {
    id: 2,
    slug: "woodax-design",
    caseStudyKey: "woodaxDesign",
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
    outcomeKey: "woodax_cls",
    position: [-5, -2, -10],
    image: "/woodax-design.png",
    caseStudy: {
      overview:
        "Woodax Design needed a product-first brand experience that felt premium while maintaining strict technical quality on performance and layout stability.",
      role: "Frontend Engineer & Experience Designer",
      duration: "4 weeks",
      scope: ["Visual Direction", "Performance", "CMS-ready blocks", "Responsive QA"],
      painPoints: [
        {
          id: "visual-density",
          title: "Dense layout reduced product clarity",
          severity: "major",
          description:
            "Early drafts mixed brand narrative and catalog content in the same viewport, forcing users to work too hard to find products.",
          fix:
            "Rebuilt page rhythm with modular content blocks, stronger spacing hierarchy, and clear product CTA anchors.",
          metric: {
            label: "Product click-through",
            before: "~2.1%",
            after: "~4.8%",
            delta: "+129%",
            positive: true,
          },
        },
        {
          id: "layout-instability",
          title: "Layout shifts during image load",
          severity: "critical",
          description:
            "Hero and gallery content moved while assets loaded, creating a visibly unstable experience on slower devices.",
          fix:
            "Set stable media containers with explicit dimensions and deferred non-critical media. This removed visual jumping.",
          metric: {
            label: "CLS",
            before: "0.21",
            after: "0.00",
            delta: "-100%",
            positive: true,
          },
        },
        {
          id: "mobile-readability",
          title: "Typography lost legibility on small screens",
          severity: "major",
          description:
            "Display typography looked strong on desktop but compressed too tightly on mobile, harming readability and trust.",
          fix:
            "Introduced fluid type scaling and tightened the line-length system for mobile-first readability.",
          metric: {
            label: "Avg. engagement time",
            before: "43s",
            after: "1m 19s",
            delta: "+84%",
            positive: true,
          },
        },
      ],
      results: [
        { label: "CLS", value: "0.00", description: "No layout shift" },
        { label: "Mobile LCP", value: "1.3s", description: "Optimized media" },
        { label: "Reusable blocks", value: "14", description: "CMS-ready" },
        { label: "Viewport coverage", value: "100%", description: "Responsive QA" },
      ],
    },
  },
  {
    id: 3,
    slug: "noctra-studio",
    caseStudyKey: "noctraStudio",
    title: "Noctra Studio",
    description: "Tech agency website building performant digital products for startups and businesses in LATAM.",
    challenge: "Create a conversion-focused landing page that establishes trust.",
    solution: "Designed a premium dark-mode interface with subtle micro-interactions.",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "Supabase"],
    link: "https://noctra.studio",
    github: null,
    status: "live",
    year: "2025",
    category: "ai",
    outcomeKey: "noctra_lcp",
    position: [2, -5, -15],
    image: "/noctra-studio.png",
    caseStudy: {
      overview:
        "Noctra Studio's own site had to function as a conversion asset, a trust layer, and a demonstration of technical depth for potential startup clients.",
      role: "Founder, Lead Frontend Engineer",
      duration: "5 weeks",
      scope: ["Brand positioning", "Conversion UX", "Performance", "Deployment"],
      painPoints: [
        {
          id: "weak-trust-signals",
          title: "Low-trust first impression",
          severity: "critical",
          description:
            "The previous version looked generic and lacked clear proof points, making agency differentiation difficult in the first 10 seconds.",
          fix:
            "Reframed the homepage around outcomes, process clarity, and strategic visual hierarchy to build instant credibility.",
          metric: {
            label: "Qualified leads / month",
            before: "~4",
            after: "~11",
            delta: "+175%",
            positive: true,
          },
        },
        {
          id: "slow-mobile-entry",
          title: "Mobile entry speed below expectations",
          severity: "major",
          description:
            "Mobile audiences encountered slow hero rendering due to unoptimized visual assets and excessive animation on load.",
          fix:
            "Prioritized above-fold rendering, reduced expensive effects, and optimized media strategy for critical paths.",
          metric: {
            label: "Mobile LCP",
            before: "2.8s",
            after: "0.9s",
            delta: "-68%",
            positive: true,
          },
        },
        {
          id: "unclear-service-scope",
          title: "Service offer felt ambiguous",
          severity: "major",
          description:
            "Visitors could not quickly understand whether Noctra handled strategy, engineering, or only design deliverables.",
          fix:
            "Structured the narrative around clear scope blocks, delivery model, and engagement CTAs tied to business outcomes.",
          metric: {
            label: "Contact CTA conversion",
            before: "1.9%",
            after: "5.2%",
            delta: "+174%",
            positive: true,
          },
        },
      ],
      results: [
        { label: "Mobile LCP", value: "0.9s", description: "Core entry path" },
        { label: "Lead conversion", value: "5.2%", description: "Qualified inquiries" },
        { label: "Core pages", value: "8", description: "Reusable architecture" },
        { label: "Delivery window", value: "5 weeks", description: "Design + build" },
      ],
      testimonial: {
        quote:
          "Noctra's own site became our best closer. Prospects arrived already aligned with how we build.",
        author: "Manu de Quevedo",
        role: "Founder, Noctra Studio",
      },
    },
  },
  {
    id: 4,
    slug: "this-portfolio",
    caseStudyKey: "thisPortfolio",
    title: "This Portfolio",
    description:
      "You're looking at it. Built with Next.js 16, TailwindCSS v4, Framer Motion, and Lenis. Bilingual (ES/EN), custom cursor, terminal animation, and sticky scroll.",
    challenge: "The portfolio itself had to be the proof of concept.",
    solution: "Every interaction — cursor, scroll, terminal — is intentional craft.",
    tags: ["Next.js", "TailwindCSS", "Framer Motion", "GSAP", "next-intl"],
    link: "https://manudequevedo.com",
    github: "https://github.com/manudequevedo/manudequevedo-portfolio",
    status: "live",
    year: "2026",
    category: "web",
    outcomeKey: "portfolio_lighthouse",
    position: [5, 2, -5],
    image: "/manudequevedo.png",
    caseStudy: {
      overview:
        "This portfolio was designed as a proof-of-work system: every section demonstrates frontend craft, performance discipline, and product storytelling in a single experience.",
      role: "Product Designer & Frontend Engineer",
      duration: "Ongoing",
      scope: ["Experience Design", "Motion System", "i18n", "PDF automation"],
      painPoints: [
        {
          id: "generic-portfolio-pattern",
          title: "Template-like portfolio structure",
          severity: "major",
          description:
            "Most portfolio layouts looked interchangeable and failed to communicate technical depth in the first interaction.",
          fix:
            "Built section-specific interaction patterns, narrative pacing, and distinctive typography to make each scroll segment intentional.",
          metric: {
            label: "Avg. session duration",
            before: "~1m 10s",
            after: "~2m 48s",
            delta: "+140%",
            positive: true,
          },
        },
        {
          id: "cv-download-friction",
          title: "Manual CV delivery flow",
          severity: "major",
          description:
            "Recruiters needed bilingual CV outputs while prior workflows required manual file updates and inconsistent exports.",
          fix:
            "Implemented dynamic PDF generation endpoint with locale-aware output and direct download actions from navigation.",
          metric: {
            label: "CV generation time",
            before: "Manual export",
            after: "On-demand API",
            delta: "Automated",
            positive: true,
          },
        },
        {
          id: "mobile-interaction-quality",
          title: "Desktop-first interactions leaked into mobile",
          severity: "minor",
          description:
            "Hover-driven details were inconsistent on touch devices and degraded perceived polish on mobile.",
          fix:
            "Added capability-based interaction guards and touch-first variants for decorative effects and motion cues.",
          metric: {
            label: "Interaction consistency",
            before: "Mixed",
            after: "Device-adaptive",
            delta: "Stabilized",
            positive: true,
          },
        },
      ],
      results: [
        { label: "Lighthouse Perf", value: "100", description: "Measured benchmark" },
        { label: "Locales", value: "2", description: "ES + EN" },
        { label: "PDF flow", value: "Dynamic", description: "API-driven CV" },
        { label: "Architecture", value: "Next 16", description: "App Router" },
      ],
    },
  },
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
    { name: "Performance Optimization", level: null, context: null },
  ],
  cloud: [
    { name: "AWS", level: "learning", context: "Lambda, S3, CloudFront" },
    { name: "Cloudflare Workers", level: "learning", context: "Edge computing" },
    { name: "Docker", level: "learning", context: "Containerization basics" },
    { name: "Serverless (Lambda)", level: null, context: null },
    { name: "Kubernetes (basic)", level: null, context: null },
    { name: "CDN (CloudFront)", level: null, context: null },
  ],
  security: [
    { name: "OWASP Top 10", level: "proficient", context: "Security by default" },
    { name: "Content Security Policy", level: "proficient", context: "XSS prevention" },
    { name: "XSS", level: "proficient", context: "Vulnerability mitigation" },
    { name: "CSRF", level: null, context: null },
    { name: "Penetration Testing Basics", level: null, context: null },
  ],
  ai: [
    { name: "Prompt Engineering", level: "expert", context: "Advanced LLM steering" },
    { name: "GCP", level: "expert", context: "Cloud services and API integration" },
    { name: "AI Workflow Automation", level: "proficient", context: "Agentic flows" },
  ],
  tools: [
    { name: "Git", level: "expert", context: "Version control" },
    { name: "VS Code", level: "expert", context: "IDE of choice" },
    { name: "Vercel", level: "proficient", context: "Deployment & CI/CD" },
    { name: "Supabase", level: "proficient", context: "Backend as a Service" },
    { name: "PostgreSQL", level: null, context: null },
    { name: "MongoDB", level: null, context: null },
  ],
};
