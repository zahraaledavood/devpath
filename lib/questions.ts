import { Question, Stack, Difficulty, QuestionCategory } from "@/types";
import reactQuestions from "@/content/questions/react.json";

const allQuestions: Question[] = [...(reactQuestions as Question[])];
// بعداً اضافه کن: ...angularQuestions, ...typescriptQuestions

export function getAllQuestions(): Question[] {
  return allQuestions;
}

export function filterQuestions(params: {
  stack?: Stack | "all";
  difficulty?: Difficulty | "all";
  category?: QuestionCategory | "all";
  search?: string;
}): Question[] {
  return allQuestions.filter((q) => {
    if (params.stack && params.stack !== "all" && q.stack !== params.stack) return false;
    if (params.difficulty && params.difficulty !== "all" && q.difficulty !== params.difficulty) return false;
    if (params.category && params.category !== "all" && q.category !== params.category) return false;
    if (params.search) {
      const s = params.search.toLowerCase();
      if (!q.title.toLowerCase().includes(s) && !q.tags.join(" ").includes(s)) return false;
    }
    return true;
  });
}

// Saved questions — localStorage
export function getSavedQuestions(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem("jobpath_saved_questions");
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

export function toggleSavedQuestion(id: string): Set<string> {
  const saved = getSavedQuestions();
  saved.has(id) ? saved.delete(id) : saved.add(id);
  localStorage.setItem("jobpath_saved_questions", JSON.stringify([...saved]));
  return saved;
}