import { NextRequest } from "next/server";
import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from "pdf-lib";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Locale = "en" | "es";

type ResumeContent = {
  name: string;
  role: string;
  contact: string[];
  summary: string;
  skills: Array<{ category: string; items: string[] }>;
  experience: Array<{
    company: string;
    role: string;
    period: string;
    location: string;
    bullets: string[];
  }>;
  projects: Array<{
    name: string;
    role: string;
    bullets: string[];
  }>;
  education: string[];
  achievements: string[];
  labels: {
    summary: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    achievements: string;
    poweredBy: string;
  };
};

const RESUME: Record<Locale, ResumeContent> = {
  en: {
    name: "MANUEL MATUS",
    role: "Senior Frontend Engineer | React, Next.js & TypeScript | App Modernization & Migration",
    contact: [
      "Queretaro, Mexico",
      "[+52] 55 5500 0228",
      "manuel.matusdequevedo@tcs.com",
      "linkedin.com/in/manuelmatus",
    ],
    summary:
      "Senior Frontend Engineer with 5+ years of experience specializing in large-scale application modernization and scalable UI systems. Expert in leading legacy migrations from AngularJS to React/Next.js and aligning high-fidelity design with engineering feasibility. Strong background in React, TypeScript, Next.js, AEM and ServiceNow enterprise ecosystems.",
    skills: [
      {
        category: "Frontend Core",
        items: [
          "React.js",
          "Next.js (App Router)",
          "TypeScript",
          "JavaScript (ES6+)",
          "HTML5",
          "CSS3",
        ],
      },
      {
        category: "UI & Performance",
        items: [
          "TailwindCSS",
          "GSAP",
          "Framer Motion",
          "CSS Grid",
          "Figma",
          "Web Vitals Optimization",
        ],
      },
      {
        category: "Testing & Accessibility",
        items: ["Jest", "Mocha", "Axe DevTools", "WCAG 2.1 Compliance"],
      },
      {
        category: "DevOps & Platforms",
        items: [
          "Git",
          "Vercel",
          "Splunk",
          "Grafana",
          "Jira",
          "Agile/Scrum",
          "AEM",
          "ServiceNow (CSA)",
        ],
      },
    ],
    experience: [
      {
        company: "Tata Consultancy Services (TCS)",
        role: "Senior Frontend Developer (AEM Specialist)",
        period: "Oct 2021 - Present",
        location: "Mexico / Remote",
        bullets: [
          "Spearheaded migration of critical UI components from legacy systems to Adobe Experience Manager (AEM), preserving brand consistency across global markets.",
          "Achieved 90+ Google Lighthouse scores through lazy loading, asset optimization and strict WCAG accessibility standards.",
          "Established design-to-engineering workflows between Figma and engineering, reducing UI cycle time by 35% and reducing technical debt.",
          "Built proactive Splunk and Grafana monitoring dashboards to reduce incident response time in production.",
        ],
      },
      {
        company: "Concentrix",
        role: "Software Engineer (ServiceNow & Frontend)",
        period: "Aug 2019 - Oct 2021",
        location: "Remote",
        bullets: [
          "Executed migration of high-traffic modules from AngularJS to Angular 7/9, improving maintainability and responsiveness by 40%.",
          "Architected custom business logic for Incident and CMDB modules using JavaScript Business Rules and Script Includes.",
          "Increased unit-test coverage with Jest and Mocha, helping sustain 99.9% system stability during major refactors.",
        ],
      },
      {
        company: "Quiubas Mobile (acquired by Twilio)",
        role: "Frontend Engineer (Contract / Migration Project)",
        period: "Apr 2019 - Aug 2019",
        location: "Remote",
        bullets: [
          "Rewrote the entire client-side codebase from AngularJS to Functional React.js as a core migration contributor.",
          "Implemented React Hooks and modern state patterns, reducing bundle size by 30%.",
        ],
      },
    ],
    projects: [
      {
        name: "Bridge Capital",
        role: "Lead Designer & Full Stack Developer",
        bullets: [
          "Owned full product lifecycle from high-fidelity Figma UI/UX to production implementation with design-code parity.",
          "Built a high-precision interest-rate calculator in React for real-time ROI projections.",
          "Integrated browser-side PDF generation for exporting personalized financial projections.",
          "Implemented serverless lead capture with Resend and Vercel Functions for scalable communication.",
        ],
      },
    ],
    education: [
      "ServiceNow Certified System Administrator (CSA) | ServiceNow",
      "Web Development Bootcamp | Ironhack",
      "Professional Google Cybersecurity Certificate | Google (In Progress)",
    ],
    achievements: [
      "Led complex legacy-to-modern frontend migrations in enterprise environments.",
      "Bridged design and engineering workflows to accelerate delivery by 35%.",
    ],
    labels: {
      summary: "PROFESSIONAL SUMMARY",
      skills: "TECHNICAL SKILLS",
      experience: "PROFESSIONAL EXPERIENCE",
      projects: "KEY PROJECTS & INDEPENDENT WORK",
      education: "EDUCATION & CERTIFICATIONS",
      achievements: "HIGHLIGHTS",
      poweredBy: "Powered by",
    },
  },
  es: {
    name: "MANUEL MATUS",
    role: "Senior Frontend Engineer | React, Next.js y TypeScript | Modernizacion y Migracion de Apps",
    contact: [
      "Queretaro, Mexico",
      "[+52] 55 5500 0228",
      "manuel.matusdequevedo@tcs.com",
      "linkedin.com/in/manuelmatus",
    ],
    summary:
      "Senior Frontend Engineer con mas de 5 anos de experiencia en modernizacion de aplicaciones a gran escala y construccion de interfaces escalables. Especialista en migraciones complejas de AngularJS a React/Next.js y en conectar diseno de alta fidelidad con viabilidad tecnica. Fuerte dominio de React, TypeScript y Next.js en entornos enterprise como AEM y ServiceNow.",
    skills: [
      {
        category: "Frontend Core",
        items: [
          "React.js",
          "Next.js (App Router)",
          "TypeScript",
          "JavaScript (ES6+)",
          "HTML5",
          "CSS3",
        ],
      },
      {
        category: "UI y Performance",
        items: [
          "TailwindCSS",
          "GSAP",
          "Framer Motion",
          "CSS Grid",
          "Figma",
          "Web Vitals Optimization",
        ],
      },
      {
        category: "Testing y Accesibilidad",
        items: ["Jest", "Mocha", "Axe DevTools", "WCAG 2.1 Compliance"],
      },
      {
        category: "DevOps y Plataformas",
        items: [
          "Git",
          "Vercel",
          "Splunk",
          "Grafana",
          "Jira",
          "Agile/Scrum",
          "AEM",
          "ServiceNow (CSA)",
        ],
      },
    ],
    experience: [
      {
        company: "Tata Consultancy Services (TCS)",
        role: "Senior Frontend Developer (AEM Specialist)",
        period: "Oct 2021 - Actualidad",
        location: "Mexico / Remoto",
        bullets: [
          "Lidere la migracion de componentes criticos de UI desde sistemas legacy a Adobe Experience Manager (AEM), preservando consistencia de marca en mercados globales.",
          "Logre scores 90+ en Google Lighthouse mediante lazy loading, optimizacion de assets y cumplimiento estricto de WCAG.",
          "Estructure el flujo diseno-a-ingenieria entre Figma e ingenieria, reduciendo el ciclo de desarrollo UI en 35% y bajando deuda tecnica.",
          "Construi dashboards proactivos con Splunk y Grafana para reducir tiempos de respuesta a incidentes en produccion.",
        ],
      },
      {
        company: "Concentrix",
        role: "Software Engineer (ServiceNow & Frontend)",
        period: "Aug 2019 - Oct 2021",
        location: "Remoto",
        bullets: [
          "Ejecute migracion de modulos de alto trafico de AngularJS a Angular 7/9, mejorando mantenibilidad y respuesta en 40%.",
          "Arquitecte logica de negocio para modulos de Incident y CMDB con JavaScript Business Rules y Script Includes.",
          "Incremente cobertura de pruebas con Jest y Mocha, ayudando a sostener 99.9% de estabilidad durante refactors mayores.",
        ],
      },
      {
        company: "Quiubas Mobile (adquirida por Twilio)",
        role: "Frontend Engineer (Contrato / Proyecto de Migracion)",
        period: "Apr 2019 - Aug 2019",
        location: "Remoto",
        bullets: [
          "Reescribi el codebase cliente completo de AngularJS a Functional React.js como contribuidor clave de migracion.",
          "Implemente React Hooks y patrones modernos de estado, reduciendo bundle size en 30%.",
        ],
      },
    ],
    projects: [
      {
        name: "Bridge Capital",
        role: "Lead Designer & Full Stack Developer",
        bullets: [
          "Lidere el ciclo completo del producto desde UI/UX en Figma hasta implementacion productiva con paridad diseno-codigo.",
          "Desarrolle calculadora de tasas en React para proyecciones ROI en tiempo real.",
          "Integre generacion de PDF en navegador para exportar proyecciones financieras personalizadas.",
          "Implemente captura de leads serverless con Resend y Vercel Functions.",
        ],
      },
    ],
    education: [
      "ServiceNow Certified System Administrator (CSA) | ServiceNow",
      "Web Development Bootcamp | Ironhack",
      "Professional Google Cybersecurity Certificate | Google (En progreso)",
    ],
    achievements: [
      "Lidere migraciones frontend complejas de sistemas legacy a arquitectura moderna.",
      "Conecte workflows de diseno e ingenieria para acelerar entregas en 35%.",
    ],
    labels: {
      summary: "RESUMEN PROFESIONAL",
      skills: "HABILIDADES TECNICAS",
      experience: "EXPERIENCIA PROFESIONAL",
      projects: "PROYECTOS CLAVE",
      education: "EDUCACION Y CERTIFICACIONES",
      achievements: "LOGROS DESTACADOS",
      poweredBy: "Powered by",
    },
  },
};

function getLocale(request: NextRequest): Locale {
  const localeParam = request.nextUrl.searchParams.get("locale");
  return localeParam === "es" ? "es" : "en";
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function roundedRectPath(
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  const x2 = x + width;
  const y2 = y + height;
  return [
    `M ${x + r} ${y}`,
    `L ${x2 - r} ${y}`,
    `Q ${x2} ${y} ${x2} ${y + r}`,
    `L ${x2} ${y2 - r}`,
    `Q ${x2} ${y2} ${x2 - r} ${y2}`,
    `L ${x + r} ${y2}`,
    `Q ${x} ${y2} ${x} ${y2 - r}`,
    `L ${x} ${y + r}`,
    `Q ${x} ${y} ${x + r} ${y}`,
    "Z",
  ].join(" ");
}

export async function GET(request: NextRequest) {
  const locale = getLocale(request);
  const data = RESUME[locale];

  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const PAGE_WIDTH = 595.28;
  const PAGE_HEIGHT = 841.89;
  const cardX = 34;
  const cardY = 24;
  const cardW = PAGE_WIDTH - cardX * 2;
  const cardH = PAGE_HEIGHT - 48;
  const contentX = cardX + 22;
  const contentW = cardW - 44;
  const contentTopY = cardY + cardH - 38;
  const contentBottomY = cardY + 54;

  const colors = {
    bg: rgb(0.93, 0.95, 0.98),
    card: rgb(0.985, 0.985, 0.985),
    shadow: rgb(0.8, 0.83, 0.88),
    title: rgb(0.09, 0.09, 0.09),
    text: rgb(0.2, 0.2, 0.2),
    muted: rgb(0.42, 0.44, 0.45),
    line: rgb(0.08, 0.08, 0.08),
    divider: rgb(0.83, 0.83, 0.83),
  };

  let page: PDFPage = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = contentTopY;

  const drawPageFrame = () => {
    page.drawRectangle({
      x: 0,
      y: 0,
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT,
      color: colors.bg,
    });

    const dotColor = rgb(0.79, 0.84, 0.92);
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 12; col++) {
        page.drawCircle({
          x: 8 + col * 40,
          y: PAGE_HEIGHT - 8 - row * 32,
          size: 2.3,
          color: dotColor,
        });
      }
    }

    page.drawSvgPath(roundedRectPath(cardX + 3, cardY - 3, cardW, cardH, 22), {
      color: colors.shadow,
      opacity: 0.32,
    });
    page.drawSvgPath(roundedRectPath(cardX, cardY, cardW, cardH, 22), {
      color: colors.card,
    });

    page.drawText("www.manudequevedo.com", {
      x: contentX,
      y: cardY + 18,
      size: 7.8,
      font: regular,
      color: colors.muted,
    });
    page.drawText(`${data.labels.poweredBy} manudequevedo.com`, {
      x: cardX + cardW - 130,
      y: cardY + 18,
      size: 7.8,
      font: regular,
      color: colors.muted,
    });
  };

  const newPage = () => {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = contentTopY;
    drawPageFrame();
  };

  const ensureSpace = (needed: number) => {
    if (y - needed >= contentBottomY) return;
    newPage();
    page.drawText(`${data.name} - CV`, {
      x: contentX,
      y,
      size: 10,
      font: bold,
      color: colors.muted,
    });
    y -= 16;
  };

  const drawWrapped = (
    text: string,
    options?: {
      x?: number;
      width?: number;
      size?: number;
      lineHeight?: number;
      font?: PDFFont;
      color?: keyof typeof colors;
    },
  ) => {
    const x = options?.x ?? contentX;
    const width = options?.width ?? contentW;
    const size = options?.size ?? 9.2;
    const lineHeight = options?.lineHeight ?? size + 2.2;
    const font = options?.font ?? regular;
    const color = colors[options?.color ?? "text"];
    const lines = wrapText(text, font, size, width);

    ensureSpace(lines.length * lineHeight + 2);
    for (const line of lines) {
      page.drawText(line, { x, y, size, font, color });
      y -= lineHeight;
    }
  };

  const drawSectionTitle = (title: string) => {
    ensureSpace(30);
    page.drawText(title, {
      x: contentX,
      y,
      size: 14.2,
      font: bold,
      color: colors.title,
    });
    y -= 7;
    page.drawLine({
      start: { x: contentX, y },
      end: { x: contentX + contentW, y },
      color: colors.line,
      thickness: 1.2,
    });
    y -= 13;
  };

  const drawBullet = (text: string, size = 8.8) => {
    const bulletX = contentX;
    const textX = contentX + 10;
    const width = contentW - 10;
    const lines = wrapText(text, regular, size, width);
    const lineHeight = size + 2;

    ensureSpace(lines.length * lineHeight + 2);
    lines.forEach((line, index) => {
      if (index === 0) {
        page.drawText("-", {
          x: bulletX,
          y,
          size,
          font: regular,
          color: colors.text,
        });
      }
      page.drawText(line, {
        x: textX,
        y,
        size,
        font: regular,
        color: colors.text,
      });
      y -= lineHeight;
    });
  };

  drawPageFrame();

  page.drawText(data.name, {
    x: contentX,
    y,
    size: 21.5,
    font: bold,
    color: colors.title,
  });
  y -= 21;
  page.drawText(data.role, {
    x: contentX,
    y,
    size: 9.7,
    font: bold,
    color: colors.muted,
  });
  y -= 12;

  const contactSlots = [contentX, contentX + 135, contentX + 280, contentX + 420];
  data.contact.slice(0, 4).forEach((item, index) => {
    page.drawText(item, {
      x: contactSlots[index],
      y,
      size: 8,
      font: bold,
      color: colors.text,
    });
  });
  y -= 20;

  drawSectionTitle(data.labels.summary);
  drawWrapped(data.summary, { size: 9.5, lineHeight: 11.8 });
  y -= 5;

  drawSectionTitle(data.labels.skills);
  data.skills.forEach((group) => {
    drawWrapped(`${group.category}:`, {
      size: 9.1,
      font: bold,
      color: "title",
      lineHeight: 11,
    });
    drawWrapped(group.items.join(", "), {
      size: 8.8,
      color: "text",
      lineHeight: 10.8,
    });
    y -= 2;
  });
  y -= 3;

  drawSectionTitle(data.labels.experience);
  data.experience.forEach((job, index) => {
    drawWrapped(job.role, { size: 10.5, font: bold, color: "title", lineHeight: 12.5 });
    drawWrapped(job.company, { size: 9, font: bold, color: "muted", lineHeight: 10.8 });
    drawWrapped(`${job.period}  |  ${job.location}`, {
      size: 8.2,
      color: "muted",
      lineHeight: 10.2,
    });
    job.bullets.forEach((bullet) => drawBullet(bullet, 8.7));

    if (index < data.experience.length - 1) {
      ensureSpace(12);
      page.drawLine({
        start: { x: contentX, y: y + 2 },
        end: { x: contentX + contentW, y: y + 2 },
        color: colors.divider,
        thickness: 0.8,
      });
      y -= 10;
    } else {
      y -= 5;
    }
  });

  drawSectionTitle(data.labels.projects);
  data.projects.forEach((project) => {
    drawWrapped(`${project.name} | ${project.role}`, {
      size: 10.1,
      font: bold,
      color: "title",
      lineHeight: 12,
    });
    project.bullets.forEach((bullet) => drawBullet(bullet, 8.7));
    y -= 4;
  });

  drawSectionTitle(data.labels.education);
  data.education.forEach((item) => {
    drawBullet(item, 8.8);
  });
  y -= 6;

  drawSectionTitle(data.labels.achievements);
  data.achievements.forEach((item) => {
    drawBullet(item, 8.8);
  });

  const bytes = await pdf.save();
  const filename = `Manu-de-Quevedo-CV-${locale}.pdf`;
  const body = bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength,
  ) as ArrayBuffer;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
