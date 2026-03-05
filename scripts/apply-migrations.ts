/**
 * Apply all Supabase migrations via the REST API.
 * Usage: npx tsx scripts/apply-migrations.ts
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const migrationsDir = join(__dirname, "../supabase/migrations");
const files = [
  "001_profiles.sql",
  "002_subscriptions.sql",
  "003_content.sql",
  "004_exercises.sql",
  "005_progress.sql",
  "006_notifications.sql",
  "007_rls_policies.sql",
];

async function run() {
  for (const file of files) {
    const sql = readFileSync(join(migrationsDir, file), "utf-8");
    console.log(`Applying ${file}...`);

    const { error } = await supabase.rpc("exec_sql", { sql_query: sql });

    if (error) {
      // Try via the REST SQL endpoint directly
      const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SERVICE_ROLE_KEY,
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ sql_query: sql }),
      });

      if (!response.ok) {
        console.error(`  Failed: ${error.message}`);
        console.error(`  You may need to run this SQL manually in the Supabase SQL Editor.`);
        console.error(`  File: supabase/migrations/${file}`);
      } else {
        console.log(`  OK`);
      }
    } else {
      console.log(`  OK`);
    }
  }

  console.log("\nDone! If any migrations failed, run them manually at:");
  console.log(`${SUPABASE_URL.replace(".supabase.co", "")}/project/sql`);
}

run().catch(console.error);
