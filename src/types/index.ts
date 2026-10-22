export type ProjectStatus = "in_progress" | "completed" | "archived";

export type TechnologyCategory =
  | "language"
  | "frontend"
  | "backend"
  | "database"
  | "api"
  | "devops"
  | "testing"
  | "security"
  | "tool"
  | "other";

export type ContactStatus = "new" | "read" | "replied" | "spam";

export type PostStatus = "draft" | "published" | "archived";

export interface Technology {
  id: number;
  name: string;
  category: TechnologyCategory;
  group?: string;
  description?: string;
  iconUrl?: string;
  documentationUrl?: string;
  badge?: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  role?: string;
  architectureDetails?: string[];
  keyAchievements?: string[];
  coverImage: string;
  liveUrl?: string;
  repoUrl?: string;
  status: ProjectStatus;
  isFeatured: boolean;
  sortOrder: number;
  startDate?: string;
  endDate?: string;
  year?: string;
  technologies: string[];
}

export interface ContactMessage {
  id?: number;
  projectId?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: ContactStatus;
  ipHash?: string;
  createdAt?: string;
}

export interface BlogPost {
  id: number;
  projectId?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  status: PostStatus;
  publishedAt?: string;
  createdAt?: string;
}

export interface CapabilityItem {
  number: string;
  title: string;
  description: string;
  skills: string[];
}

export interface ProcessStepItem {
  step: string;
  title: string;
  description: string;
}

export interface PrincipleItem {
  title: string;
  quote: string;
  description: string;
}
