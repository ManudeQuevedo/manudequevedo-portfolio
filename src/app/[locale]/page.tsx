// src/app/[locale]/page.tsx
import Image from "next/image";
import { getMessages } from "next-intl/server";
import { DATA as STATIC } from "@/data/resume";
import WorkExperience from "@/components/sections/WorkExperience";
import ProjectsSection from "@/components/sections/Projects";
import ContactSection from "@/components/sections/Contact";
import CommunityImpactSection from "@/components/sections/CommunityImpact";
import { safeKey } from "@/lib/safeKey";
import SkillsSection from "@/components/sections/Skills";
import { SKILLS } from "@/data/resume";
import { COMPANY_META } from "@/data/companyMeta";

type AnyObj = Record<string, any>;
const F = <T,>(v: T | undefined, fb: T) => (v === undefined ? fb : v);

// Para socials: resolvemos iconKey textual (no pasamos funciones)
function guessIconKey(name: string) {
  const k = (name || "").toLowerCase();
  if (k.includes("github")) return "github";
  if (k.includes("linkedin")) return "linkedin";
  if (k === "x") return "x";
  if (k.includes("youtube")) return "youtube";
  if (k.includes("email") || k.includes("correo")) return "email";
  return "website";
}

export default async function Page({ params }: any) {
  const locale = (params?.locale as "es" | "en") ?? "en";
  const messages = (await getMessages({ locale })) as AnyObj;

  const M = (messages?.resume ?? {}) as AnyObj;
  const S = (messages?.sections ?? {}) as AnyObj;

  // Hero
  const name = F<string>(M.name, STATIC.name);
  const description = F<string>(M.description, STATIC.description);
  const summary = F<string>(M.summary, STATIC.summary);
  const avatarUrl = STATIC.avatarUrl || "/me.png";

  /*** WORK (merge por id/company y resolución de logo por id) ***/
  const workFromMsg: AnyObj = M.work ?? {};
  const workList = Object.values(workFromMsg) as Array<{
    id?: string;
    company: string;
    href?: string;
    location?: string;
    title?: string;
    start?: string;
    end?: string;
    description?: string;
    logoUrl?: string;
  }>;

  const workMerged = workList.map((w) => {
    // Busca en estático por id o por company
    const st = (STATIC.work as unknown as AnyObj[]).find(
      (x) => x.id === w.id || x.company === w.company
    );

    // id estable preferido (i18n → estático)
    const id: string | undefined = w.id ?? st?.id;

    // logo: meta por id → logo del estático → logo del i18n → placeholder PNG
    const resolvedLogo =
      (id && COMPANY_META[id]?.logoUrl) ??
      st?.logoUrl ??
      w.logoUrl ??
      "/company-placeholder.png";

    return {
      id,
      company: w.company,
      href: F(w.href, st?.href ?? "#"),
      location: F(w.location, st?.location ?? ""),
      title: F(w.title, st?.title ?? ""),
      start: F(w.start, st?.start ?? ""),
      end: F(w.end, st?.end ?? ""),
      description: F(w.description, st?.description ?? ""),
      logoUrl: resolvedLogo,
    };
  });

  /*** EDUCATION (merge por school) ***/
  const eduFromMsg: AnyObj = M.education ?? {};
  const educationList = Object.values(eduFromMsg) as Array<{
    school: string;
    href?: string;
    degree?: string;
    start?: string;
    end?: string;
    logoUrl?: string;
  }>;
  const educationMerged = educationList.map((e) => {
    const st = (STATIC.education as unknown as AnyObj[]).find(
      (x) => x.school === e.school
    );
    return {
      school: e.school,
      degree: F(e.degree, st?.degree ?? ""),
      href: F(e.href, st?.href ?? "#"),
      start: F(e.start, st?.start ?? ""),
      end: F(e.end, st?.end ?? ""),
      logoUrl: st?.logoUrl ?? e.logoUrl ?? "/placeholder.png",
    };
  });

  /*** PROJECTS (merge por title, usando safeKey) ***/
  const msgProjectsRaw: Record<string, any> = M?.projects ?? {};
  const msgProjects = Object.fromEntries(
    Object.entries(msgProjectsRaw).map(([k, v]) => [safeKey(k), v])
  );

  const staticProjects = (
    (STATIC.projects ?? []) as unknown as AnyObj[]
  ).slice();
  const projectsMerged = staticProjects.map((p) => {
    const key = safeKey(p.title as string);
    const ov = msgProjects[key] ?? {};

    const safeLinks = (ov.links ?? p.links ?? []).map((l: any) => ({
      type: l.type,
      href: l.href,
      label: l.label ?? l.type,
    }));

    return {
      ...p,
      title: F(ov.title, p.title),
      dates: F(ov.dates, p.dates),
      active: F(ov.active, p.active),
      description: F(ov.description, p.description),
      technologies: F(ov.technologies, p.technologies),
      links: safeLinks,
      image: p.image, // las imágenes de proyectos vienen de estático; i18n solo sobretexto
    };
  });

  /*** CONTACT (merge + socials sin icon functions) ***/
  const msgContact = M?.contact ?? {};
  const contactEmail = F<string>(msgContact.email, STATIC.contact?.email);
  const contactTel = F<string>(msgContact.tel, STATIC.contact?.tel);

  const msgSocial = msgContact.social ?? {};
  const staticSocial = STATIC.contact?.social ?? {};
  const socialKeys = Array.from(
    new Set([...Object.keys(staticSocial), ...Object.keys(msgSocial)])
  );

  return (
    <main className="space-y-8">
      {/* HERO */}
      <section className="py-2 md:py-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-6">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {S?.hi ?? "Hi, I'm"} {name} <span aria-hidden>👋</span>
            </h1>
            <p className="text-foreground/80 md:text-lg leading-7 max-w-2xl">
              {description}
            </p>
          </div>

          <div className="flex md:justify-end">
            <Image
              src={avatarUrl}
              alt={name}
              width={112}
              height={112}
              className="rounded-full border border-border bg-card"
              priority
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{S?.about ?? "About"}</h2>
        <p className="leading-7 summary max-w-2xl">
          <span dangerouslySetInnerHTML={{ __html: summary }} />
        </p>
      </section>

      {/* WORK */}
      <WorkExperience
        items={workMerged}
        heading={S?.work ?? "Work Experience"}
      />

      {/* EDUCATION */}
      <section className="space-y-5">
        <h2 className="text-xl font-semibold">{S?.education ?? "Education"}</h2>
        <div className="space-y-4">
          {educationMerged.map((e) => (
            <article
              key={e.school + e.start}
              className="grid grid-cols-[auto_1fr_auto] items-start gap-4 p-2 rounded-lg">
              <div className="h-10 w-10 rounded-full border border-border overflow-hidden bg-background flex items-center justify-center">
                <Image
                  src={e.logoUrl}
                  alt={e.school}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <div className="min-w-0">
                <div className="font-medium">
                  {e.href ? (
                    <a
                      href={e.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4">
                      {e.school}
                    </a>
                  ) : (
                    e.school
                  )}
                </div>
                {e.degree ? (
                  <div className="text-sm text-muted-foreground">
                    {e.degree}
                  </div>
                ) : null}
              </div>

              <div className="text-right text-xs text-muted-foreground whitespace-nowrap">
                {e.start} — {e.end}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <SkillsSection
        data={{
          ...SKILLS,
          groups: SKILLS.groups.map((group) => ({
            ...group,
            items: [...group.items],
          })),
        }}
        className="mt-12"
      />

      {/* PROJECTS */}
      <ProjectsSection items={projectsMerged} />

      {/* NON-PROFITS */}
      <CommunityImpactSection email="contact@manudequevedo.com" />

      {/* CONTACT */}
      <ContactSection email={contactEmail} address={contactTel} />
    </main>
  );
}
