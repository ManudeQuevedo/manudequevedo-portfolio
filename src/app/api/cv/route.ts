// src/app/api/cv/route.ts
import { NextRequest } from "next/server";
import { getMessages } from "next-intl/server";
import { DATA as STATIC } from "@/data/resume";

type AnyObj = Record<string, any>;
const F = <T,>(v: T | undefined, fb: T) => v ?? fb;

export async function GET(_req: NextRequest) {
  // Fuerza siempre EN
  const locale: "en" = "en";

  // Mensajes (ingles) para tomar textos que ya se muestran en la página
  const messages = (await getMessages({ locale })) as AnyObj;
  const M = (messages?.resume ?? {}) as AnyObj;

  // Root (merge i18n + estático)
  const name = F<string>(M.name, STATIC.name);
  const description = F<string>(M.description, STATIC.description);
  const summary = F<string>(M.summary, STATIC.summary);
  const siteUrl = F<string>(STATIC.url, "");

  // Work (merge por company)
  const workFromMsg: AnyObj = M.work ?? {};
  const workList = Object.values(workFromMsg) as Array<{
    company: string;
    href?: string;
    location?: string;
    title?: string;
    start?: string;
    end?: string;
    description?: string;
  }>;
  const workMerged = workList.map((w) => {
    const st = ((STATIC.work as unknown) as AnyObj[]).find((x) => x.company === w.company);
    return {
      company: w.company,
      title: w.title ?? st?.title ?? "",
      location: w.location ?? st?.location ?? "",
      start: w.start ?? st?.start ?? "",
      end: w.end ?? st?.end ?? "",
      description: w.description ?? st?.description ?? "",
    };
  });

  // Education (merge por school)
  const eduFromMsg: AnyObj = M.education ?? {};
  const eduList = Object.values(eduFromMsg) as Array<{
    school: string;
    degree?: string;
    start?: string;
    end?: string;
  }>;
  const educationMerged = eduList.map((e) => {
    const st = Array.from(STATIC.education).find((x) => x.school === e.school);
    return {
      school: e.school,
      degree: e.degree ?? st?.degree ?? "",
      start: e.start ?? st?.start ?? "",
      end: e.end ?? st?.end ?? "",
    };
  });

  // Skills
  const skills = (M.skills as string[] | undefined) ?? STATIC.skills ?? [];

  // Projects (merge por título)
  const projectsMsg: AnyObj = M.projects ?? {};
  const projectsStatic: AnyObj[] = STATIC.projects as unknown as AnyObj[];
  const projectsMerged = projectsStatic.map((p) => {
    const byTitle =
      Object.values(projectsMsg).find((m: any) => m?.title === p.title) ?? {};
    return {
      title: byTitle.title ?? p.title ?? "",
      dates: byTitle.dates ?? p.dates ?? "",
      description: byTitle.description ?? p.description ?? "",
      tech: (byTitle.technologies as string[] | undefined) ?? p.technologies ?? [],
      links: p.links ?? [],
    };
  });

  // Contact
  const email = STATIC.contact?.email ?? "contact@manudequevedo.com";
  const tel = STATIC.contact?.tel ?? "";

  // Texto plano del CV (siempre en inglés)
  const lines: string[] = [];

  lines.push(`${name}`);
  lines.push(`${description}`);
  if (siteUrl) lines.push(siteUrl);
  lines.push("");

  const summaryPlain = summary.replace(/<[^>]*>/g, "");
  if (summaryPlain.trim()) {
    lines.push("Summary");
    lines.push(summaryPlain);
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
      if (w.description) lines.push(`  ${w.description.replace(/\s+/g, " ").trim()}`);
      lines.push("");
    });
  }

  if (educationMerged.length) {
    lines.push("Education");
    educationMerged.forEach((e) => {
      lines.push(`- ${e.school}${e.degree ? ` — ${e.degree}` : ""}`);
      const right = [e.start, e.end].filter(Boolean).join(" — ");
      if (right) lines.push(`  ${right}`);
      lines.push("");
    });
  }

  if (projectsMerged.length) {
    lines.push("Projects");
    projectsMerged.forEach((p) => {
      lines.push(`- ${p.title}${p.dates ? ` — ${p.dates}` : ""}`);
      if (p.description)
        lines.push(`  ${p.description.replace(/\s+/g, " ").trim()}`);
      if (p.tech?.length) lines.push(`  Tech: ${p.tech.join(", ")}`);
      lines.push("");
    });
  }

  if (email || tel) {
    lines.push("Contact");
    if (email) lines.push(`Email: ${email}`);
    if (tel) lines.push(`Tel: ${tel}`);
    lines.push("");
  }

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