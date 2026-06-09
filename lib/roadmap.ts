import { Roadmap, Stack, Level } from "@/types";
import react from "@/content/roadmaps/react.json";
import angular from "@/content/roadmaps/angular.json";

const roadmaps: Roadmap[] = [
  react as unknown as Roadmap,
  angular as unknown as Roadmap,
];

export function getAllRoadmaps(): Roadmap[] {
  return roadmaps;
}

export function getRoadmap(stack: Stack): Roadmap | undefined {
  return roadmaps.find((r) => r.stack === stack);
}

function progressKey(stack: Stack, level: Level): string {
  return `devpath_progress_${stack}-${level}`;
}

export function getProgress(stack: Stack, level: Level): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(progressKey(stack, level));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function toggleNode(stack: Stack, level: Level, nodeId: string): Set<string> {
  const progress = getProgress(stack, level);
  if (progress.has(nodeId)) {
    progress.delete(nodeId);
  } else {
    progress.add(nodeId);
  }
  localStorage.setItem(progressKey(stack, level), JSON.stringify([...progress]));
  return progress;
}

export function getProgressPercent(stack: Stack, level: Level, totalNodes: number): number {
  const done = getProgress(stack, level);
  return totalNodes === 0 ? 0 : Math.round((done.size / totalNodes) * 100);
}