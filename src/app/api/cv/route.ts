import { NextRequest } from "next/server";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import { experience, projects, skills } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Locale = "en" | "es";

const COPY = {
  en: {
    role: "Frontend Engineer & UI Architect",
    summaryTitle: "Summary",
    summary:
      "Frontend Engineer focused on high-performance digital products, intentional interfaces, and production-grade UX details.",
    skillsTitle: "Skills",
    experienceTitle: "Experience",
    projectsTitle: "Selected Projects",
    contactTitle: "Contact",
    present: "Present",
  },
  es: {
    role: "Frontend Engineer & Arquitecto UI",
    summaryTitle: "Resumen",
    summary:
      "Frontend Engineer enfocado en productos digitales de alto rendimiento, interfaces intencionales y detalles de UX de nivel producción.",
    skillsTitle: "Habilidades",
    experienceTitle: "Experiencia",
    projectsTitle: "Proyectos Seleccionados",
    contactTitle: "Contacto",
    present: "Actualidad",
  },
} as const;

function getLocale(request: NextRequest): Locale {
  const localeParam = request.nextUrl.searchParams.get("locale");
  return localeParam === "es" ? "es" : "en";
}

function wrapText(
  text: string,
  font: PDFFont,
  size: number,
  maxWidth: number,
): string[] {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    const candidateWidth = font.widthOfTextAtSize(candidate, size);

    if (candidateWidth <= maxWidth) {
      current = candidate;
      return;
    }

    if (current) lines.push(current);
    current = word;
  });

  if (current) lines.push(current);
  return lines.length ? lines : [text];
}

function normalizePeriod(period: string, locale: Locale) {
  return locale === "es"
    ? period.replace("Present", COPY.es.present)
    : period.replace("Actualidad", COPY.en.present);
}

export async function GET(request: NextRequest) {
  const locale = getLocale(request);
  const content = COPY[locale];
  const email = "contact@manudequevedo.com";
  const site = "manudequevedo.com";
  const location = "Queretaro, MX";

  const pdf = await PDFDocument.create();
  const fontRegular = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const PAGE_WIDTH = 595.28; // A4
  const PAGE_HEIGHT = 841.89;
  const MARGIN_X = 48;
  const MARGIN_TOP = 52;
  const MARGIN_BOTTOM = 42;
  const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_X * 2;
  const BODY_SIZE = 10.5;
  const META_SIZE = 9;
  const LINE = 14;
  const SECTION_GAP = 10;

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN_TOP;

  const ensureSpace = (needed: number) => {
    if (y - needed > MARGIN_BOTTOM) return;
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN_TOP;
  };

  const drawLine = (
    text: string,
    options?: {
      size?: number;
      bold?: boolean;
      color?: [number, number, number];
      indent?: number;
      lineHeight?: number;
    },
  ) => {
    const size = options?.size ?? BODY_SIZE;
    const indent = options?.indent ?? 0;
    const lineHeight = options?.lineHeight ?? LINE;
    ensureSpace(lineHeight);

    page.drawText(text, {
      x: MARGIN_X + indent,
      y,
      size,
      font: options?.bold ? fontBold : fontRegular,
      color: rgb(...(options?.color ?? [0.92, 0.92, 0.92])),
    });

    y -= lineHeight;
  };

  const drawParagraph = (text: string, options?: { size?: number; indent?: number }) => {
    const size = options?.size ?? BODY_SIZE;
    const indent = options?.indent ?? 0;
    const maxWidth = CONTENT_WIDTH - indent;
    const lines = wrapText(text, fontRegular, size, maxWidth);

    lines.forEach((line) => {
      drawLine(line, { size, indent });
    });
  };

  const drawSectionTitle = (text: string) => {
    y -= 4;
    drawLine(text, {
      size: 12,
      bold: true,
      color: [0.99, 0.42, 0],
      lineHeight: 18,
    });
    y -= 2;
  };

  drawLine("Manu de Quevedo", {
    size: 24,
    bold: true,
    color: [0.99, 0.99, 0.99],
    lineHeight: 28,
  });
  drawLine(content.role, { size: 12, color: [0.72, 0.72, 0.72], lineHeight: 18 });
  drawLine(`${email}  |  ${site}  |  ${location}`, {
    size: META_SIZE,
    color: [0.64, 0.64, 0.64],
    lineHeight: 14,
  });

  y -= SECTION_GAP;
  drawSectionTitle(content.summaryTitle);
  drawParagraph(content.summary);

  y -= SECTION_GAP;
  drawSectionTitle(content.skillsTitle);
  Object.entries(skills).forEach(([category, items]) => {
    const label = category.charAt(0).toUpperCase() + category.slice(1);
    const itemNames = items.map((item) => item.name).join(", ");
    drawLine(label, { bold: true, size: BODY_SIZE });
    drawParagraph(itemNames, { indent: 8, size: BODY_SIZE - 0.4 });
    y -= 2;
  });

  y -= SECTION_GAP;
  drawSectionTitle(content.experienceTitle);
  experience.forEach((item) => {
    drawLine(`${item.company} | ${item.role}`, {
      bold: true,
      size: 11,
      color: [0.93, 0.93, 0.93],
      lineHeight: 16,
    });
    drawLine(`${normalizePeriod(item.period, locale)} | ${item.location}`, {
      size: META_SIZE,
      color: [0.62, 0.62, 0.62],
      lineHeight: 13,
    });
    drawParagraph(item.description, { size: BODY_SIZE - 0.2, indent: 8 });
    const tagsLine = item.tags.join(" · ");
    drawLine(tagsLine, { size: 8.8, indent: 8, color: [0.72, 0.72, 0.72], lineHeight: 12 });
    y -= 5;
  });

  y -= SECTION_GAP;
  drawSectionTitle(content.projectsTitle);
  projects.slice(0, 4).forEach((project) => {
    drawLine(`${project.title} (${project.year})`, {
      bold: true,
      size: 10.5,
      color: [0.93, 0.93, 0.93],
      lineHeight: 14,
    });
    drawParagraph(project.description, { indent: 8, size: 9.7 });
    drawLine(project.tags.join(" · "), {
      size: 8.6,
      indent: 8,
      color: [0.68, 0.68, 0.68],
      lineHeight: 12,
    });
    y -= 4;
  });

  y -= SECTION_GAP;
  drawSectionTitle(content.contactTitle);
  drawLine(`Email: ${email}`, { size: BODY_SIZE, lineHeight: 13 });
  drawLine(`Website: ${site}`, { size: BODY_SIZE, lineHeight: 13 });
  drawLine("LinkedIn: linkedin.com/in/manuelmatus", { size: BODY_SIZE, lineHeight: 13 });

  const pages = pdf.getPages();
  pages.forEach((pdfPage: PDFPage, index) => {
    pdfPage.drawText(`${index + 1}/${pages.length}`, {
      x: PAGE_WIDTH - MARGIN_X - 24,
      y: 18,
      size: 9,
      font: fontRegular,
      color: rgb(0.55, 0.55, 0.55),
    });
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
      "Content-Disposition": `attachment; filename=\"${filename}\"`,
      "Cache-Control": "no-store",
    },
  });
}
