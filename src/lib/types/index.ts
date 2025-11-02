// Core type definitions for the portfolio website

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  phone?: string;
  location: string;
  socialLinks: SocialLink[];
  headshot: ImageAsset;
}

export interface SocialLink {
  platform: 'linkedin' | 'github' | 'twitter' | 'website';
  url: string;
  label: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  problem: string;
  action: string;
  result: string;
  metrics: Metric[];
  technologies: string[];
  role: string;
  duration: string;
  images: ImageAsset[];
  links: ProjectLink[];
  featured: boolean;
}

export interface Metric {
  label: string;
  value: string;
  type: 'percentage' | 'absolute' | 'currency';
}

export interface ProjectLink {
  type: 'demo' | 'github' | 'case-study';
  url: string;
  label: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyLogo: ImageAsset;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationYear: number;
  gpa?: string;
  honors?: string[];
  image: ImageAsset;
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  category: string;
  image: ImageAsset;
  metrics?: Metric[];
}

// Component prop interfaces
export interface NavigationProps {
  currentPath: string;
}

export interface ProjectCardProps {
  title: string;
  summary: string;
  metrics: string[];
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
}

export interface ExpandableSectionProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// SEO and metadata types
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  openGraph: OpenGraphData;
  twitter: TwitterCardData;
  canonical: string;
}

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  url: string;
  type: string;
}

export interface TwitterCardData {
  card: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  image: string;
}