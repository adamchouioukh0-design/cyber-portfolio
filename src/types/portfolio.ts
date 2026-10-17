export type SkillCategoryType = 
  | 'offensive' 
  | 'networking' 
  | 'tools' 
  | 'programming' 
  | 'defensive';

export interface Skill {
  name: string;
  category: SkillCategoryType;
  description: string;
  proficiency?: number; // 0 - 100 (Optional: only displayed if configured)
  commandExample?: string;
  tags?: string[];
  iconName?: string;
}

export interface SkillCategoryInfo {
  id: SkillCategoryType;
  title: string;
  code: string;
  badge: string;
  description: string;
  icon: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verificationUrl?: string; // Optional real verification URL
  image: string; // Path or SVG placeholder
  pdfUrl?: string; // Optional document link
  description: string;
  skills: string[];
  status: 'VERIFIED' | 'IN_PROGRESS' | 'PLANNED';
  category: 'Offensive' | 'Networking' | 'Defensive' | 'Cloud' | 'General';
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'networking' | 'offensive' | 'defensive' | 'development';
  image: string;
  shortDescription: string;
  problemAddressed: string;
  technicalImplementation: string;
  technologies: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  keyLessonsLearned: string[];
  featured?: boolean;
  attackVectors?: string[];
  mitigations?: string[];
  architectureSummary?: string;
}

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  organization: string;
  type: 'LEARNING_PATH' | 'EDUCATION' | 'PROJECT_LAB' | 'EXPERIENCE';
  description: string;
  skills: string[];
  badge?: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string | number;
  suffix?: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  initials: string;
  codename: string;
  title: string;
  subtitle: string;
  shortIntro: string;
  profileImage: string;
  cvUrl: string;
  status: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  defconLevel: number; // 1 to 5
  pgpKeyId?: string;
  bio: {
    whoIAm: string;
    cyberInterests: string[];
    learningJourney: string;
    professionalGoals: string;
  };
  stats: StatItem[];
}
