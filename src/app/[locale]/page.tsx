import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { AgencyCta } from "@/components/sections/AgencyCta";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <main className="w-full relative overflow-x-clip md:overflow-visible">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <AgencyCta />
      <Skills />
      <Contact />
    </main>
  );
}
