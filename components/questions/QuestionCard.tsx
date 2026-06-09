"use client";

import { Question } from "@/types";
import { useState, useEffect } from "react";
import { toggleSavedQuestion, getSavedQuestions } from "@/lib/questions";
import { ChevronDown, Bookmark, BookmarkCheck, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

// npm install react-markdown

const difficultyLabel = { easy: "آسون", medium: "متوسط", hard: "سخت" };
const difficultyColor = {
  easy: "text-accent-green bg-accent-green/10",
  medium: "text-accent-yellow bg-accent-yellow/10",
  hard: "text-accent-pink bg-accent-pink/10",
};
const categoryLabel: Record<string, string> = {
  core: "Core", hooks: "Hooks", performance: "Performance",
  typescript: "TypeScript", css: "CSS", architecture: "Architecture", behavioral: "رفتاری",
};

export default function QuestionCard({ question }: { question: Question }) {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkSavedStatus = () => {
      const savedQuestions = getSavedQuestions();
      setSaved(savedQuestions.has(question.id));
    };
    checkSavedStatus();
  }, [question.id]);

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = toggleSavedQuestion(question.id);
    setSaved(next.has(question.id));
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(question.answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border transition-all duration-200 ${open ? "border-accent-blue/40" : "border-border hover:border-gray-600"} bg-bg-card`}>
      {/* Header row */}
      <div
        className="flex cursor-pointer items-center gap-3 px-5 py-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold leading-6">{question.title}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${difficultyColor[question.difficulty]}`}>
              {difficultyLabel[question.difficulty]}
            </span>
            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-gray-500">
              {categoryLabel[question.category] ?? question.category}
            </span>
            {question.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="text-xs text-gray-600">#{tag}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleSave} className="text-gray-600 hover:text-accent-yellow transition-colors">
            {saved ? <BookmarkCheck size={16} className="text-accent-yellow" /> : <Bookmark size={16} />}
          </button>
          <ChevronDown
            size={16}
            className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Answer */}
      {open && (
        <div className="border-t border-border px-5 py-4">
          <div className="prose prose-invert prose-sm max-w-none leading-7 text-gray-300">
            <ReactMarkdown>{question.answer}</ReactMarkdown>
          </div>

          {/* Follow-ups */}
          {question.followUps && question.followUps.length > 0 && (
            <div className="mt-4 rounded-lg border border-accent-yellow/20 bg-accent-yellow/5 p-3">
              <p className="mb-2 text-xs font-semibold text-accent-yellow">ممکنه بپرسن:</p>
              <ul className="space-y-1">
                {question.followUps.map((fu, i) => (
                  <li key={i} className="text-xs text-gray-400">• {fu}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Copy button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-xs text-gray-400 hover:border-gray-500 hover:text-white transition-colors"
            >
              {copied ? <Check size={12} className="text-accent-green" /> : <Copy size={12} />}
              {copied ? "کپی شد!" : "کپی جواب"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}