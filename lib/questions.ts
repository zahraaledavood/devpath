import { createClient } from "@supabase/supabase-js";
import { Question, Stack, Difficulty, QuestionCategory } from "@/types";

// ── Supabase client ──────────────────────────────────────────────────────────
// If you already have a client set up (e.g. lib/supabase.ts used for auth),
// import that one instead of creating a new instance here:
//   import { supabase } from "@/lib/supabase";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


// ── Row → Question mapper ───────────────────────────────────────────────────
// Supabase returns snake_case columns; our app uses camelCase in `Question`.

type QuestionRow = {
  id: string;
  stack: string;
  category: string;
  difficulty: string;
  title: string;
  answer: string;
  tags: string[];
  follow_ups: string[];
};

function mapRow(row: QuestionRow): Question {
  return {
    id: row.id,
    stack: row.stack as Stack,
    category: row.category as QuestionCategory,
    difficulty: row.difficulty as Difficulty,
    title: row.title,
    answer: row.answer,
    tags: row.tags ?? [],
    followUps: row.follow_ups ?? [],
  };
}


// ── Fetch all questions ─────────────────────────────────────────────────────

export async function getAllQuestions(): Promise<Question[]> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch questions:", error.message);
    return [];
  }
  return (data as QuestionRow[]).map(mapRow);
}

// ── Filtered fetch (server-side filtering via Supabase query) ──────────────

export async function filterQuestions(params: {
  stack?: Stack | "all";
  difficulty?: Difficulty | "all";
  category?: QuestionCategory | "all";
  search?: string;
}): Promise<Question[]> {
  let query = supabase.from("questions").select("*");

  if (params.stack && params.stack !== "all") {
    query = query.eq("stack", params.stack);
  }
  if (params.difficulty && params.difficulty !== "all") {
    query = query.eq("difficulty", params.difficulty);
  }
  if (params.category && params.category !== "all") {
    query = query.eq("category", params.category);
  }
  if (params.search) {
    // matches title (case-insensitive) OR any tag containing the search term
    query = query.or(
      `title.ilike.%${params.search}%,tags.cs.{${params.search}}`
    );
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to filter questions:", error.message);
    return [];
  }
  return (data as QuestionRow[]).map(mapRow);
}

// ── Saved questions — still localStorage (per-device bookmarks) ────────────

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