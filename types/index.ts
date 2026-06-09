export type Stack = "react" | "angular" | "vue";
export type Level = "junior" | "mid" | "senior";
export type Importance = "must" | "should" | "nice";
export type Difficulty = "easy" | "medium" | "hard";

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

