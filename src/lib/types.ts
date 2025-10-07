// src/lib/types.ts
export interface SocialMap {
  [key: string]: string;
}
export interface LinkItem { title?: string; type?: string; href: string; }
export interface ProjectItem {
  title: string;
  href: string;
  dates: string;
  active: boolean;
  description: string;
  technologies: string[];
  links: LinkItem[];
  image: string;
  video: string;
}
export interface WorkItem {
  company: string;
  href: string;
  location: string;
  title: string;
  logoUrl: string;
  start: string;
  end: string;
  description: string;
}
export interface EducationItem {
  school: string;
  href: string;
  degree: string;
  logoUrl: string;
  start: string;
  end: string;
}

export interface ResumeMessages {
  name: string;
  initials: string;
  url: string;
  location: string;
  locationLink: string;
  description: string;
  summary: string;
  skills: string[];

  navbar: {
    home: string;
    blog: string;
  };

  contact: {
    email: string;
    tel: string;
    social: SocialMap; // keys: GitHub, LinkedIn, X, Youtube, email
  };

  work: Record<string, WorkItem>;
  education: Record<string, EducationItem>;
  projects: Record<string, ProjectItem>;
  hackathons: Record<
    string,
    {
      title: string;
      dates: string;
      location: string;
      description: string;
      image: string;
      win?: string;
      mlh?: string;
      links: LinkItem[];
    }
  >;
}