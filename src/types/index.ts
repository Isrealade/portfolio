export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  tagline: string;
  description: string;
}

export interface Skills {
  cloud: string[];
  containers: string[];
  infrastructure: string[];
  cicd: string[];
  monitoring: string[];
  networking: string[];
  databases: string[];
  scripting: string[];
  tools: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string | null;
  featured: boolean;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string | null;
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  startYear: string;
  endYear: string;
}

export interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: string;
  category: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
  project: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: Skills;
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  achievements: Achievement[];
  testimonials: Testimonial[];
  education: Education;
}