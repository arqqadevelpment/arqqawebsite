-- Phase 1: single-admin auth table.
-- Run this once in the Supabase SQL Editor (Dashboard -> SQL Editor -> New query -> paste -> Run).

create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- A logged-in user can only ever read their own admin row (used by middleware/UI
-- to check "am I an admin"). Inserts/updates/deletes are done via the service_role
-- key from a one-off script, not through the app, so no write policy is needed yet.
create policy "admins can read own row"
  on public.admins
  for select
  to authenticated
  using (auth.uid() = user_id);
