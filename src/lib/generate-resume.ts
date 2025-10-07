// src/lib/generate-resume.ts
// ¡IMPORTANTE! Este módulo debe usarse desde componentes Client (usa "use client" en quien lo llame)
import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from "pdf-lib";

/* =========================
   Tipos
========================= */
export type ResumeWork = {
  company: string;
  title: string;
  location?: string;
  start?: string;
  end?: string;
  description?: string;
};

export type ResumeEdu = {
  school: string;
  degree?: string;
  start?: string;
  end?: string;
};

export type ResumePayload = {
  profile: {
    name: string;
    headline?: string;
    email?: string;
    url?: string;
    location?: string;
  };
  summary?: string;
  skills?: string[];
  work?: ResumeWork[];
  education?: ResumeEdu[];
};

type Fonts = {
  regular: PDFFont;
  bold: PDFFont;
};

/* =========================
   Constantes de layout/estilo
========================= */
const MARGIN_X = 48;
const MARGIN_Y = 56;
const PAGE_W = 612;
const PAGE_H = 792;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

const COLOR_TEXT = rgb(0.08, 0.08, 0.08);
const COLOR_META = rgb(0.35, 0.35, 0.35);
const COLOR_HR = rgb(0.88, 0.88, 0.88);

/* =========================
   Helpers de dibujo
========================= */
function addPage(pdf: PDFDocument): PDFPage {
  return pdf.addPage([PAGE_W, PAGE_H]);
}

function ensureSpace(pdf: PDFDocument, page: PDFPage, cursorY: number, needed = 100) {
  if (cursorY < MARGIN_Y + needed) {
    const newPage = addPage(pdf);
    return { page: newPage, y: PAGE_H - MARGIN_Y };
  }
  return { page, y: cursorY };
}

/** Wrap básico (si quieres trocear palabras larguísimas, avísame y te paso la versión avanzada) */
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = (text || "").replace(/\r/g, "").split(/\s+/);
  const lines: string[] = [];
  let line = "";

  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    const width = font.widthOfTextAtSize(test, size);
    if (width <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      line = w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawParagraph(
  pdf: PDFDocument,
  page: PDFPage,
  fonts: Fonts,
  text: string,
  cursorY: number,
  size = 11,
  leading = 1.35
) {
  const lines = wrapText(text, fonts.regular, size, CONTENT_W);
  let y = cursorY;
  let p = page;

  for (const ln of lines) {
    ({ page: p, y } = ensureSpace(pdf, p, y, size * leading * 2));
    p.drawText(ln, { x: MARGIN_X, y, size, font: fonts.regular, color: COLOR_TEXT });
    y -= size * leading;
  }
  return { page: p, y };
}

function drawHeading(page: PDFPage, fonts: Fonts, text: string, y: number): number {
  page.drawText(text, { x: MARGIN_X, y, size: 14, font: fonts.bold, color: rgb(0, 0, 0) });
  return y - 16;
}

function drawMetaLine(page: PDFPage, fonts: Fonts, y: number, text: string): number {
  page.drawText(text, { x: MARGIN_X, y, size: 10.5, font: fonts.regular, color: COLOR_META });
  return y - 14;
}

function hr(page: PDFPage, y: number): number {
  page.drawLine({
    start: { x: MARGIN_X, y },
    end: { x: PAGE_W - MARGIN_X, y },
    thickness: 1,
    color: COLOR_HR,
  });
  return y - 12;
}

/* =========================
   Secciones
========================= */
function drawWorkItem(
  pdf: PDFDocument,
  page: PDFPage,
  fonts: Fonts,
  y: number,
  w: ResumeWork
) {
  let p = page;
  ({ page: p, y } = ensureSpace(pdf, p, y, 100));

  const roleCompany = [w.title, w.company].filter(Boolean).join(" @ ");
  p.drawText(roleCompany, { x: MARGIN_X, y, size: 12, font: fonts.bold });
  y -= 14;

  const meta = [w.location, [w.start, w.end].filter(Boolean).join(" — ")].filter(Boolean).join("   •   ");
  if (meta) {
    y = drawMetaLine(p, fonts, y, meta);
  }

  if (w.description) {
    ({ page: p, y } = drawParagraph(pdf, p, fonts, w.description, y, 11));
    y -= 6;
  }

  return { page: p, y };
}

function drawEducationItem(
  pdf: PDFDocument,
  page: PDFPage,
  fonts: Fonts,
  y: number,
  e: ResumeEdu
) {
  let p = page;
  ({ page: p, y } = ensureSpace(pdf, p, y, 80));

  p.drawText(e.school, { x: MARGIN_X, y, size: 12, font: fonts.bold });
  y -= 14;

  const meta = [e.degree, [e.start, e.end].filter(Boolean).join(" — ")].filter(Boolean).join("   •   ");
  if (meta) {
    y = drawMetaLine(p, fonts, y, meta);
  }

  return { page: p, y: y - 4 };
}

/* =========================
   Export principal (cliente)
========================= */
export async function generateResumeFromData(payload: ResumePayload, filename = "Resume.pdf") {
  const pdf = await PDFDocument.create();
  let page = addPage(pdf);
  let y = PAGE_H - MARGIN_Y;

  const fonts: Fonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
  };

  // Header
  page.drawText(payload.profile.name || "Your Name", { x: MARGIN_X, y, size: 24, font: fonts.bold });
  y -= 28;

  if (payload.profile.headline) {
    ({ page, y } = drawParagraph(pdf, page, fonts, payload.profile.headline, y, 11.5, 1.3));
    y -= 6;
  }

  const contactBits = [payload.profile.email, payload.profile.url, payload.profile.location].filter(Boolean) as string[];
  if (contactBits.length) {
    ({ page, y } = drawParagraph(pdf, page, fonts, contactBits.join("  •  "), y, 10.5, 1.25));
  }
  y = hr(page, y - 6);

  // Summary
  if (payload.summary) {
    y = drawHeading(page, fonts, "Summary", y);
    ({ page, y } = drawParagraph(pdf, page, fonts, payload.summary, y, 11.5));
    y -= 6;
  }

  // Skills
  if (payload.skills?.length) {
    y = drawHeading(page, fonts, "Skills", y);
    ({ page, y } = drawParagraph(pdf, page, fonts, payload.skills.join(" • "), y, 11));
    y -= 6;
  }

  // Experience
  if (payload.work?.length) {
    y = drawHeading(page, fonts, "Experience", y);
    y -= 2;
    for (const w of payload.work) {
      ({ page, y } = drawWorkItem(pdf, page, fonts, y, w));
    }
  }

  // Education
  if (payload.education?.length) {
    y = drawHeading(page, fonts, "Education", y);
    y -= 2;
    for (const e of payload.education) {
      ({ page, y } = drawEducationItem(pdf, page, fonts, y, e));
    }
  }

  // Guardar y descargar
  const bytes = await pdf.save(); // Uint8Array
  const ab = toArrayBuffer(bytes);
  const blob = new Blob([ab], { type: "application/pdf" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* =========================
   Util: Uint8Array -> ArrayBuffer limpio
========================= */
function toArrayBuffer(u8: Uint8Array): ArrayBuffer {
  // Evita problemas con views parciales sobre el mismo buffer
  const buf = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
  // Ensure the result is an ArrayBuffer, not SharedArrayBuffer
  return buf instanceof ArrayBuffer ? buf : new ArrayBuffer(u8.byteLength);
}