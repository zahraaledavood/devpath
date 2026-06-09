"use client";

import { Roadmap, RoadmapNode } from "@/types";
import { useCallback, useMemo, useState } from "react";
import { getProgress, toggleNode } from "@/lib/roadmap";
import { ChevronDown, CheckCircle2, Circle, ExternalLink } from "lucide-react";

const IMPORTANCE_LABEL: Record<string, string> = {
  must: "ضروری",
  should: "مهم",
  nice: "اختیاری",
};

const IMPORTANCE_COLOR: Record<string, string> = {
  must: "text-accent-pink bg-accent-pink/10 border border-accent-pink/30",
  should: "text-accent-yellow bg-accent-yellow/10 border border-accent-yellow/30",
  nice: "text-gray-500 bg-gray-500/10 border border-gray-700",
};

const RESOURCE_ICON: Record<string, string> = {
  doc: "📄",
  video: "🎬",
  article: "📝",
  course: "🎓",
};

const LEVEL_LABEL: Record<string, string> = {
  junior: "جونیور",
  mid: "میدلول",
  senior: "سینیور",
};

export default function RoadmapDetail({ roadmap }: { roadmap: Roadmap }) {
  const [activeLevel, setActiveLevel] = useState(roadmap.levels[0].level);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState<Record<string, Set<string>>>(() => {
    const init: Record<string, Set<string>> = {};
    roadmap.levels.forEach((l) => {
      init[l.level] = getProgress(roadmap.stack, l.level);
    });
    return init;
  });

  const currentLevel = roadmap.levels.find((l) => l.level === activeLevel)!;

  const handleToggleDone = useCallback((nodeId: string) => {
    const updated = toggleNode(roadmap.stack, activeLevel, nodeId);
    setProgress((prev) => ({ ...prev, [activeLevel]: new Set(updated) }));
  }, [roadmap.stack, activeLevel]);

  const handleToggleExpand = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const { totalNodes, doneCount, percent } = useMemo(() => {
    const total = currentLevel.phases.flatMap((p) => p.nodes).length;
    const done = progress[activeLevel]?.size ?? 0;
    return {
      totalNodes: total,
      doneCount: done,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
    };
  }, [progress, activeLevel, currentLevel]);

  return (
    <div dir="rtl" className="min-h-screen bg-bg-primary text-white">

      {/* Header */}
      <div className="border-b border-border bg-bg-secondary">
        <div className="mx-auto max-w-4xl px-6 py-10">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-accent-blue/30 bg-accent-blue/10 px-3 py-1 text-xs font-medium text-accent-blue">
              {roadmap.stack}
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-gray-400">
              {currentLevel.estimateWeeks} هفته
            </span>
          </div>

          <h1 className="mb-2 text-2xl font-extrabold">{roadmap.title}</h1>
          <p className="mb-6 text-sm leading-7 text-gray-400">{roadmap.description}</p>

          {/* Level tabs */}
          <div className="mb-6 flex gap-2">
            {roadmap.levels.map((l) => (
              <button
                key={l.level}
                onClick={() => setActiveLevel(l.level)}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  activeLevel === l.level
                    ? "bg-accent-blue text-white"
                    : "border border-border text-gray-400 hover:border-accent-blue hover:text-accent-blue"
                }`}
              >
                {LEVEL_LABEL[l.level]}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">{percent}٪</span>
            <span className="text-sm font-bold text-accent-blue">{doneCount} / {totalNodes}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-accent-blue transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">
        {currentLevel.phases.map((phase, phaseIdx) => {
          const phaseDone = phase.nodes.filter((n) => progress[activeLevel]?.has(n.id)).length;
          return (
            <div key={phase.id}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-blue/10 text-sm font-bold text-accent-blue">
                  {phaseIdx + 1}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold">{phase.title}</h2>
                  <p className="mt-0.5 text-xs text-gray-500">{phase.description}</p>
                </div>
                <span className="text-xs text-gray-500">{phaseDone}/{phase.nodes.length}</span>
              </div>

              <div className="me-11 space-y-2">
                {phase.nodes.map((node) => (
                  <NodeRow
                    key={node.id}
                    node={node}
                    done={progress[activeLevel]?.has(node.id) ?? false}
                    expanded={expanded.has(node.id)}
                    onToggleDone={handleToggleDone}
                    onToggleExpand={handleToggleExpand}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {percent === 100 && (
          <div className="rounded-2xl border border-accent-green/30 bg-accent-green/10 py-6 text-center">
            <p className="text-lg font-bold text-accent-green">این سطح کامل شد! 🎉</p>
            <p className="mt-1 text-sm text-gray-400">برو سراغ سطح بعدی یا بانک سوالات!</p>
          </div>
        )}
      </div>
    </div>
  );
}

// NodeRow
interface NodeRowProps {
  node: RoadmapNode;
  done: boolean;
  expanded: boolean;
  onToggleDone: (id: string) => void;
  onToggleExpand: (id: string) => void;
}

function NodeRow({ node, done, expanded, onToggleDone, onToggleExpand }: NodeRowProps) {
  const hasDetail = !!node.description || node.resources.length > 0 || node.tags.length > 0;

  return (
    <div className={`rounded-xl border transition-colors duration-200 ${
      done ? "border-accent-green/30 bg-accent-green/5"
      : expanded ? "border-accent-blue/35 bg-bg-card"
      : "border-border bg-bg-card hover:border-gray-600"
    }`}>
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => onToggleDone(node.id)}
          className="transition-transform active:scale-90"
          aria-label={done ? "علامت‌گذاری نشده" : "تکمیل شد"}
        >
          {done
            ? <CheckCircle2 size={20} className="text-accent-green" />
            : <Circle size={20} className="text-gray-600 hover:text-gray-400 transition-colors" />
          }
        </button>

        <span
          onClick={() => hasDetail && onToggleExpand(node.id)}
          className={`flex-1 cursor-pointer select-none text-sm font-medium transition-colors ${
            done ? "text-gray-500 line-through" : "hover:text-white"
          }`}
        >
          {node.title}
        </span>

        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${IMPORTANCE_COLOR[node.importance] ?? ""}`}>
          {IMPORTANCE_LABEL[node.importance]}
        </span>

        {hasDetail && (
          <button onClick={() => onToggleExpand(node.id)} className="text-gray-600 hover:text-gray-300">
            <ChevronDown size={16} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {expanded && hasDetail && (
        <div className="space-y-3 border-t border-border px-4 py-3">
          {node.description && (
            <p className="text-sm leading-7 text-gray-400">{node.description}</p>
          )}
          {node.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {node.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-bg-secondary px-2.5 py-0.5 text-xs text-gray-500">
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {node.resources.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-gray-500">منابع یادگیری:</p>
              {node.resources.map((res, i) => (
                <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-accent-blue hover:underline">
                  <ExternalLink size={12} />
                  <span>{res.title}</span>
                  <span>{RESOURCE_ICON[res.type] ?? "🔗"}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}