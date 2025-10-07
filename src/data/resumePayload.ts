// src/data/resumePayload.ts
import { ResumePayload } from "@/lib/generate-resume";

export const RESUME_DATA: ResumePayload = {
  profile: {
    name: "Manuel Matus",
    headline: "Frontend Developer | UI Engineer | Problem Solver",
    email: "contact@manudequevedo.com",
    url: "https://manudequevedo.com",
    location: "Querétaro, México",
  },
  summary:
    "Frontend Developer con experiencia en React, Next.js y TypeScript. Enfocado en crear interfaces elegantes y optimizadas, con atención al detalle y mentalidad de crecimiento continuo.",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "GSAP",
    "Node.js",
    "UI/UX Design",
  ],
  work: [
    {
      company: "Tata Consultancy Services",
      title: "UI Developer",
      location: "Remoto",
      start: "Abril 2023",
      end: "Actualidad",
      description:
        "Implementación de contenido estático en Adobe Experience Manager (AEM). Creación y mantenimiento de componentes reutilizables, optimización de flujos UI y colaboración con equipos globales.",
    },
    {
      company: "Concentrix (ProKarma)",
      title: "Software Engineer / ServiceNow Developer",
      location: "Remoto",
      start: "Septiembre 2019",
      end: "Abril 2023",
      description:
        "Desarrollo de aplicaciones internas con Angular, Node.js y ServiceNow. Automatización ITSM, integración de APIs y optimización de flujos empresariales.",
    },
  ],
  education: [
    {
      school: "Southern New Hampshire University",
      degree: "B.S. in Computer Science",
      start: "2023",
      end: "En curso",
    },
  ],
};