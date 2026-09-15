// One-off script: creates the first dashboard admin user and marks them as an
// admin in the `admins` table. Run once, after applying supabase/migrations/0001_admins.sql:
//
//   node --env-file=.env.local scripts/seed-admin.mjs <email> <password>
//
// Uses the service_role key (server-side only, never exposed to the browser).

import { createClient } from "@supabase/supabase-js";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error("Usage: node --env-file=.env.local scripts/seed-admin.mjs <email> <password>");
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

const { data: created, error: createError } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (createError) {
  console.error("Failed to create auth user:", createError.message);
  process.exit(1);
}

const userId = created.user.id;

const { error: insertError } = await supabase
  .from("admins")
  .insert({ user_id: userId });

if (insertError) {
  console.error(
    "Auth user created, but failed to insert into admins table:",
    insertError.message,
    "\nDid you run supabase/migrations/0001_admins.sql first?",
  );
  process.exit(1);
}

console.log(`Admin created: ${email} (user_id: ${userId})`);
