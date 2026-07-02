/**
 * Seed script: migrates content/questions/react.json (or any stack json file)
 * into the Supabase `questions` table.
 *
 * Usage:
 *   1. npm install dotenv @supabase/supabase-js tsx --save-dev   (if not installed)
 *   2. Add to .env.local (or .env):
 *        SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   <-- NOT the anon key, this needs insert rights
 *        NEXT_PUBLIC_SUPABASE_URL=your_project_url
 *   3. Run:  npx tsx scripts/seed-questions.ts
 *
 * Why service_role key: the public anon key only has SELECT permission
 * (per the RLS policy in 001_create_questions_table.sql). Inserts need
 * the service_role key, which bypasses RLS — never expose this key in
 * client-side code, only run this script locally/server-side.
 */

import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Add every stack json file you want to migrate here:
const SOURCE_FILES = [
  { stack: "react", file: "content/questions/react.json" },
  // { stack: "vue", file: "content/questions/vue.json" },
  // { stack: "node", file: "content/questions/node.json" },
];

type RawQuestion = {
  id?: string;
  stack: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  title: string;
  answer: string;
  tags?: string[];
  followUps?: string[];
};

async function seed() {
  for (const source of SOURCE_FILES) {
    const filePath = path.join(process.cwd(), source.file);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Skipping missing file: ${source.file}`);
      continue;
    }

    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8")) as RawQuestion[];
    console.log(`📦 Found ${raw.length} questions in ${source.file}`);

    const rows = raw.map((q) => ({
      stack: q.stack ?? source.stack,
      category: q.category,
      difficulty: q.difficulty,
      title: q.title,
      answer: q.answer,
      tags: q.tags ?? [],
      follow_ups: q.followUps ?? [],
    }));

    // Insert in batches of 100 to stay safe on payload size
    const BATCH_SIZE = 100;
    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE);
      const { error, count } = await supabase
        .from("questions")
        .insert(batch, { count: "exact" });

      if (error) {
        console.error(`❌ Error inserting batch ${i / BATCH_SIZE + 1}:`, error.message);
      } else {
        console.log(`✅ Inserted batch ${i / BATCH_SIZE + 1} (${batch.length} rows)`);
      }
    }
  }

  console.log("🎉 Seed complete.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});