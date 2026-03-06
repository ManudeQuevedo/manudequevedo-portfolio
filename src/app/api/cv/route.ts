// src/app/api/cv/route.ts
import { NextRequest } from "next/server";
import { getMessages } from "next-intl/server";
import { experience, projects, skills as SKILLS_NEW } from "@/lib/data";

type AnyObj = Record<string, any>;
const F = <T,>(v: T | undefined, fb: T) => v ?? fb;

export async function GET(_req: NextRequest) {
  // Fuerza siempre EN
  const locale: "en" = "en";

  // Mensajes (ingles) para tomar textos que ya se muestran en la página
  const messages = (await getMessages({ locale })) as AnyObj;
  const M = (messages?.resume ?? {}) as AnyObj;

  // Root (merge i18n + estático)
  const name = F<string>(M.name, "Manu de Quevedo");
  const description = F<string>(M.description, "Frontend Engineer & UI Architect");
  const summary = F<string>(M.summary, "Frontend Engineer specialized in high-performance digital experiences.");
  const siteUrl = "https://manudequevedo.com";

  // Work (merge por company)
  const workMerged = experience.map((w: any) => ({
    company: w.company,
    title: w.role,
    location: w.location,
    start: w.period.split(' — ')[0],
    end: w.period.split(' — ')[1],
    description: w.description,
  }));

  // Education (mock or empty for now as it's not in lib/data)
  const educationMerged: any[] = [];

  // Skills
  const skills = Object.values(SKILLS_NEW).flat();

  // Projects
  const projectsMerged = projects.map((p: any) => ({
    title: p.title,
    dates: p.year,
    description: p.description,
    tech: p.tags,
    links: [p.link].filter(Boolean),
  }));

  // Contact
  const email = "contact@manudequevedo.com";

  // Texto plano del CV (siempre en inglés)
  const lines: string[] = [];

  lines.push(`${name}`);
  lines.push(`${description}`);
  if (siteUrl) lines.push(siteUrl);
  lines.push("");

  if (summary.trim()) {
    lines.push("Summary");
    lines.push(summary);
    lines.push("");
  }

  if (skills.length) {
    lines.push("Skills");
    lines.push(skills.join(", "));
    lines.push("");
  }

  if (workMerged.length) {
    lines.push("Work Experience");
    workMerged.forEach((w) => {
      lines.push(`- ${w.company} — ${w.title}`);
      const right = [w.start, w.end].filter(Boolean).join(" — ");
      const loc = w.location ? ` (${w.location})` : "";
      if (right || loc) lines.push(`  ${right}${loc}`);
      if (w.description) lines.push(`  ${w.description}`);
      lines.push("");
    });
  }

  if (projectsMerged.length) {
    lines.push("Projects");
    projectsMerged.forEach((p) => {
      lines.push(`- ${p.title} — ${p.dates}`);
      if (p.description) lines.push(`  ${p.description}`);
      if (p.tech?.length) lines.push(`  Tech: ${p.tech.join(", ")}`);
      lines.push("");
    });
  }

  lines.push("Contact");
  lines.push(`Email: ${email}`);

  const body = lines.join("\n").trim() + "\n";
  const filename = `${name.replace(/\s+/g, "-")}-CV-en.txt`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}