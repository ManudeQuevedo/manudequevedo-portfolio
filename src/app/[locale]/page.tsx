import { HeroSection } from "@/components/landing/HeroSection";
import { MarqueeSection } from "@/components/landing/MarqueeSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ExperienceSection } from "@/components/landing/ExperienceSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { ContactSection } from "@/components/landing/ContactSection";

// HomePage composes the 3D-creator-style landing: hero, marquee, about, experience, services, projects and contact.
export default function HomePage() {
  return (
    <main
      className="landing-root w-full"
      style={{ overflowX: "clip", backgroundColor: "#0C0C0C" }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ExperienceSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
