"use client"

import { Roadmap } from "@/types";
import Link from "next/link";

const stackColors: Record<string, string> = {
  react: "text-accent-blue bg-accent-blue/10",
  angular: "text-accent-pink bg-accent-pink/10",
  vue: "text-accent-emerald bg-accent-emerald/10",
};

export default function RoadmapCard({ roadmap }: { roadmap: Roadmap }) {
  const totalPhases = roadmap.levels.reduce((acc, l) => acc + l.phases.length, 0);
  const totalNodes = roadmap.levels.reduce(
    (acc, l) => acc + l.phases.flatMap((p) => p.nodes).length, 0
  );

  return (
    <Link href={`/roadmap/${roadmap.stack}`} className="group block">
      <div className="h-full rounded-2xl border border-border bg-bg-card p-6 transition-all duration-200 hover:border-accent-blue hover:bg-bg-hover"
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}  
      
      >

        <div className="mb-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${stackColors[roadmap.stack] ?? "text-gray-400 bg-gray-400/10"}`}>
            {roadmap.stack}
          </span>
        </div>

        <h3 className="mb-2 text-base font-bold text-white group-hover:text-accent-blue transition-colors">
          {roadmap.title}
        </h3>
        <p className="mb-5 text-sm leading-6 text-gray-400 line-clamp-2">
          {roadmap.description}
        </p>

        <div className="mb-4 flex items-center gap-4 text-xs text-gray-500">
          <span>{roadmap.levels.length} سطح</span>
          <span>{totalPhases} فاز</span>
          <span>{totalNodes} مبحث</span>
        </div>

        <div className="flex gap-2">
          {roadmap.levels.map((l) => (
            <span key={l.level} className="rounded-full border border-border px-2 py-0.5 text-xs text-gray-400">
              {l.title}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
}