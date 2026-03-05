// ─── Personal ────────────────────────────────────────────────────────────────
export interface Personal {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  description: string;
  email: string;
  linkedin: string;
  github: string;
  resume: string;
  avatar: string;
  googleAnalytics: string;
  siteUrl: string;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export interface Hero {
  greeting: string;
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
}

// ─── About ────────────────────────────────────────────────────────────────────
export interface Stat {
  value: string;
  label: string;
}

export interface About {
  heading: string;
  bio: string[];
  stats: Stat[];
}

// ─── Experience ───────────────────────────────────────────────────────────────
export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image?: string;
  accent: string;
}

// ─── Skills ───────────────────────────────────────────────────────────────────
export interface SkillItem {
  name: string;
  icon?: string; // react-icons key, fallback to name initials
}

export interface SkillGroup {
  category: string;
  icon: string;
  color: string;
  skills: string[];
}

// ─── Education ────────────────────────────────────────────────────────────────
export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  location: string;
  detail: string;
  accent: string;
}

// ─── Writing / Blog ───────────────────────────────────────────────────────────
export interface BlogPost {
  title: string;
  summary: string;
  date: string;
  url: string;
  thumbnail: string;
  readTime: string;
  tags: string[];
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export interface Contact {
  heading: string;
  subtext: string;
}

// ─── Root config ─────────────────────────────────────────────────────────────
export interface PortfolioConfig {
  personal: Personal;
  hero: Hero;
  nav: NavLink[];
  about: About;
  experience: ExperienceEntry[];
  projects: Project[];
  skills: SkillGroup[];
  education: EducationEntry[];
  writing: BlogPost[];
  contact: Contact;
}
