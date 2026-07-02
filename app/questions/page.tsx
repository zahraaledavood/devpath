"use client";

import { useState, useMemo, useEffect } from "react";
import { Question, QuestionCategory, Stack, Difficulty } from "@/types";
import { getAllQuestions, getSavedQuestions } from "@/lib/questions";
import QuestionCard from "@/components/questions/QuestionCard";
import { Search, X, BookmarkCheck, ChevronDown, Loader2 } from "lucide-react";
import BackButton from "@/components/backButton/backButton";

const difficultyLabels: Record<Difficulty, string> = {
  easy: "جونیور",
  medium: "میدلول",
  hard: "سینیور",
};

const difficultyColor: Record<Difficulty, string> = {
  easy: "text-accent-green bg-accent-green/10 border-accent-green/20",
  medium: "text-accent-yellow bg-accent-yellow/10 border-accent-yellow/20",
  hard: "text-accent-pink bg-accent-pink/10 border-accent-pink/20",
};

const categoryLabels: Record<QuestionCategory, string> = {
  core: "Core",
  hooks: "Hooks",
  performance: "Performance",
  typescript: "TypeScript",
  css: "CSS",
  architecture: "Architecture",
  behavioral: "رفتاری",
};

function SidebarSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors"
      >
        {title}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="mt-3 space-y-1">{children}</div>}
    </div>
  );
}

function SidebarItem({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all
        ${active
          ? "bg-accent-blue/10 text-accent-blue font-medium"
          : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
        }`}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className={`text-xs ${active ? "text-accent-blue/70" : "text-gray-600"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${difficultyColor[difficulty]}`}
    >
      {difficultyLabels[difficulty]}
    </span>
  );
}

function Chip({ children, onRemove }: { children: React.ReactNode; onRemove: () => void }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/10 px-2.5 py-1 text-xs text-accent-blue">
      {children}
      <button onClick={onRemove} className="hover:text-white transition-colors">
        <X size={10} />
      </button>
    </span>
  );
}

// MAIN FUNCTION

export default function QuestionsPage() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [stack, setStack] = useState<Stack | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const [category, setCategory] = useState<QuestionCategory | "all">("all");
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getAllQuestions()
      .then((data) => {
        if (!cancelled) setAllQuestions(data);
      })
      .catch(() => {
        if (!cancelled) setError("خطا در دریافت سوالات. دوباره تلاش کن.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setSavedIds(getSavedQuestions());
    const onStorage = () => setSavedIds(getSavedQuestions());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const availableStacks = useMemo(
    () => Array.from(new Set(allQuestions.map((q) => q.stack))) as Stack[],
    [allQuestions]
  );

  const stackCounts = useMemo(
    () =>
      Object.fromEntries(
        availableStacks.map((s) => [s, allQuestions.filter((q) => q.stack === s).length])
      ),
    [allQuestions, availableStacks]
  );

  const categoryCounts = useMemo(
    () =>
      Object.fromEntries(
        (Object.keys(categoryLabels) as QuestionCategory[]).map((c) => [
          c,
          allQuestions.filter((q) => q.category === c).length,
        ])
      ),
    [allQuestions]
  );

  const difficultyCounts = useMemo(
    () => ({
      easy: allQuestions.filter((q) => q.difficulty === "easy").length,
      medium: allQuestions.filter((q) => q.difficulty === "medium").length,
      hard: allQuestions.filter((q) => q.difficulty === "hard").length,
    }),
    [allQuestions]
  );

  const filtered = useMemo(() => {
    return allQuestions.filter((q) => {
      if (stack !== "all" && q.stack !== stack) return false;
      if (difficulty !== "all" && q.difficulty !== difficulty) return false;
      if (category !== "all" && q.category !== category) return false;
      if (showSavedOnly && !savedIds.has(q.id)) return false;
      if (search) {
        const s = search.toLowerCase();
        const inTitle = q.title.toLowerCase().includes(s);
        const inTags = q.tags.join(" ").toLowerCase().includes(s);
        if (!inTitle && !inTags) return false;
      }
      return true;
    });
  }, [allQuestions, stack, difficulty, category, search, showSavedOnly, savedIds]);

  const clearFilters = () => {
    setStack("all");
    setDifficulty("all");
    setCategory("all");
    setSearch("");
    setShowSavedOnly(false);
  };

  const hasActiveFilters =
    stack !== "all" || difficulty !== "all" || category !== "all" || search !== "" || showSavedOnly;

  return (
    <div className="min-h-screen bg-bg-main" dir="rtl">
      <div className="mx-auto flex max-w-6xl gap-0 px-4 py-10 md:px-8">

        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">فیلترها</h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-xs text-gray-600 hover:text-accent-pink transition-colors"
                >
                  <X size={11} />
                  پاک کن
                </button>
              )}
            </div>

            <div className="mb-2">
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-all
                  ${showSavedOnly
                    ? "bg-accent-yellow/10 text-accent-yellow font-medium"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <BookmarkCheck size={13} />
                  ذخیره‌شده‌ها
                </span>
                <span className={`text-xs ${showSavedOnly ? "text-accent-yellow/70" : "text-gray-600"}`}>
                  {savedIds.size}
                </span>
              </button>
            </div>

            <SidebarSection title="استک">
              <SidebarItem
                active={stack === "all"}
                onClick={() => setStack("all")}
                count={allQuestions.length}
              >
                همه
              </SidebarItem>
              {availableStacks.map((s) => (
                <SidebarItem
                  key={s}
                  active={stack === s}
                  onClick={() => setStack(s)}
                  count={stackCounts[s]}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </SidebarItem>
              ))}
            </SidebarSection>

            <SidebarSection title="سطح">
              <SidebarItem active={difficulty === "all"} onClick={() => setDifficulty("all")}>
                همه سطح‌ها
              </SidebarItem>
              {(["easy", "medium", "hard"] as Difficulty[]).map((d) => (
                <SidebarItem
                  key={d}
                  active={difficulty === d}
                  onClick={() => setDifficulty(d)}
                  count={difficultyCounts[d]}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        d === "easy" ? "bg-accent-green" : d === "medium" ? "bg-accent-yellow" : "bg-accent-pink"
                      }`}
                    />
                    {difficultyLabels[d]}
                  </span>
                </SidebarItem>
              ))}
            </SidebarSection>

            <SidebarSection title="موضوع">
              <SidebarItem active={category === "all"} onClick={() => setCategory("all")}>
                همه موضوعات
              </SidebarItem>
              {(Object.keys(categoryLabels) as QuestionCategory[]).map((c) => (
                <SidebarItem
                  key={c}
                  active={category === c}
                  onClick={() => setCategory(c)}
                  count={categoryCounts[c]}
                >
                  {categoryLabels[c]}
                </SidebarItem>
              ))}
            </SidebarSection>
          </div>
        </aside>


        <main className="min-w-0 flex-1 md:pr-8">

          <div className="mb-6 flex justify-between items-baseline">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-accent-blue">
                بانک سوالات
              </p>
              <h1 className="text-2xl font-bold text-white">سوالات مصاحبه فنی</h1>
              <p className="mt-1 text-sm text-gray-500">
                {loading ? "در حال بارگذاری..." : `${allQuestions.length} سوال از مصاحبه‌های واقعی`}
              </p>
            </div>
            <div>
              <BackButton />
            </div>
          </div>

          <div className="relative mb-5">
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="جستجو در سوالات..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-bg-card py-2.5 pr-9 pl-4 text-sm text-white placeholder-gray-600 outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/20 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="mb-4 flex flex-wrap gap-2">
              {stack !== "all" && (
                <Chip onRemove={() => setStack("all")}>
                  {stack.charAt(0).toUpperCase() + stack.slice(1)}
                </Chip>
              )}
              {difficulty !== "all" && (
                <Chip onRemove={() => setDifficulty("all")}>{difficultyLabels[difficulty]}</Chip>
              )}
              {category !== "all" && (
                <Chip onRemove={() => setCategory("all")}>{categoryLabels[category]}</Chip>
              )}
              {showSavedOnly && <Chip onRemove={() => setShowSavedOnly(false)}>ذخیره‌شده‌ها</Chip>}
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={22} className="animate-spin text-accent-blue" />
              <p className="mt-3 text-sm text-gray-500">در حال دریافت سوالات از سرور...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center rounded-xl border border-accent-pink/20 bg-accent-pink/5 py-16 text-center">
              <p className="text-sm text-accent-pink">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              <p className="mb-3 text-xs text-gray-600">
                <span className="font-semibold text-gray-400">{filtered.length}</span> سوال
              </p>

              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
                  <p className="text-2xl">🔍</p>
                  <p className="mt-3 text-sm font-semibold text-gray-400">سوالی پیدا نشد</p>
                  <p className="mt-1 text-xs text-gray-600">فیلترها رو تغییر بده</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 rounded-lg border border-border px-4 py-2 text-xs text-gray-400 hover:border-gray-500 hover:text-white transition-colors"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((q) => (
                    <QuestionCard key={q.id} question={q} />
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}