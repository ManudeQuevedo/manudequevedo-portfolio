// src/lib/build-resume-payload.ts
import type { ResumePayload, ResumeWork, ResumeEdu } from "@/lib/generate-resume";

type AnyMsg = Record<string, any>;

function pick<T extends object, K extends keyof T>(obj: T | undefined, keys: K[]): Partial<T> {
  const out: Partial<T> = {};
  if (!obj) return out;
  for (const k of keys) {
    if (obj[k] != null) out[k] = obj[k];
  }
  return out;
}

export function buildResumePayloadFromMessages(
  messages: AnyMsg,
  dataStatic: AnyMsg,           // tu DATA (para email, url, location)
  skillsStatic?: { groups?: { items: string[] }[] } // tu SKILLS (para items)
): ResumePayload {
  const r = messages?.resume ?? {};
  const sections = messages?.sections ?? {};

  // Perfil
  const profile = {
    name: r?.name || dataStatic?.name || "Manu",
    headline: r?.description || "",
    email: dataStatic?.contact?.email || "",
    url: dataStatic?.url || "",
    location: dataStatic?.location || "",
  };

  // Summary
  const summary: string = r?.summary || "";

  // Skills: tomamos los items desde tu SKILLS estático y los aplanamos
  let skills: string[] = [];
  const groups = skillsStatic?.groups ?? [];
  for (const g of groups) {
    for (const item of g.items || []) {
      if (!skills.includes(item)) skills.push(item);
    }
  }

  // Work (desde i18n)
  const work: ResumeWork[] = Array.isArray(r?.work)
    ? r.work.map((w: any) =>
        ({
          company: w.company,
          title: w.title,
          location: w.location,
          start: w.start,
          end: w.end,
          description: w.description,
        } satisfies ResumeWork)
      )
    : [];

  // Education (desde i18n)
  const education: ResumeEdu[] = Array.isArray(r?.education)
    ? r.education.map((e: any) =>
        ({
          school: e.school,
          degree: e.degree,
          start: e.start,
          end: e.end,
        } satisfies ResumeEdu)
      )
    : [];

  return {
    profile,
    summary,
    skills,
    work,
    education,
  };
}