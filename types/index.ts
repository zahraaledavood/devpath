export type Stack = "react" | "vue" | "angular" | "node" | "python";
export type Level = "junior" | "mid" | "senior";
export type Importance = "must" | "should" | "nice";
export type Difficulty = "easy" | "medium" | "hard";
export type ResumeCategory = 'frontend' | 'backend' | 'fullstack' | 'devops';


export interface Resource {
  title: string;
  url: string;
  type: "doc" | "video" | "article" | "course";
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  importance: Importance;
  tags: string[];
  resources: Resource[];
}

export interface RoadmapPhase {
  id: string;
  title: string;
  description: string;
  nodes: RoadmapNode[];
}

export interface RoadmapLevel {
  level: Level;
  title: string;
  estimateWeeks: number;
  phases: RoadmapPhase[];
}

export interface Roadmap {
  stack: Stack;
  title: string;
  description: string;
  levels: RoadmapLevel[];
}

export interface MapItem {
  id: number;
  level: string;
  title: string;
  titleEn: string;
  desc: string;
  icon: string;
  color: string;
  glow: string;
  tags: string[];
}


export interface MapLineProps {
  lineH: number;
}

export interface MapNodeProps {
  item: MapItem;
  index: number;
  isLeft: boolean;
  active: boolean;
  onClick: (id: number) => void
}

export interface MapConnectProps {
  color: string;
  isLeft:boolean;
  visible: boolean;
  delay: number
}

export interface MapDotProps{
  color: string;
  glow: string;
  active: boolean
}

export type QuestionCategory =
  | "core"
  | "hooks"
  | "performance"
  | "typescript"
  | "css"
  | "architecture"
  | "behavioral";

export interface Question {
  id: string;
  stack: Stack;
  title: string;
  answer: string;
  difficulty: Difficulty;
  category: QuestionCategory;
  tags: string[];
  followUps?: string[];
}

export interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
  className?: string
}

export interface Resume {
  id: string;
  full_name: string;
  role_title: string;
  category: ResumeCategory;
  years_experience: number;
  stack: string[];
  view_count: number;
  file_url: string;
  created_at: string;
}

export const CATEGORY_LABELS: Record<ResumeCategory, string> = {
  frontend: 'فرانت‌اند',
  backend: 'بک‌اند',
  fullstack: 'فول‌استک',
  devops: 'دواپس',
};

export const CATEGORY_COLORS: Record<ResumeCategory, { bar: string; bg: string; text: string }> = {
  frontend: { bar: '#3b82f6', bg: 'rgba(59,130,246,0.12)', text: '#93c5fd' },
  backend: { bar: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', text: '#c4b5fd' },
  fullstack: { bar: '#06b6d4', bg: 'rgba(6,182,212,0.12)', text: '#67e8f9' },
  devops: { bar: '#22c55e', bg: 'rgba(34,197,94,0.12)', text: '#86efac' },
};