-- Standard Therapeutics - Phase 1 RLS
-- Run this after schema.sql in Supabase SQL editor.

alter table public.profiles enable row level security;
alter table public.biomarker_results enable row level security;
alter table public.upload_records enable row level security;
alter table public.memberships enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = user_id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = user_id);

drop policy if exists "biomarkers_select_own" on public.biomarker_results;
create policy "biomarkers_select_own"
  on public.biomarker_results for select
  using (auth.uid() = user_id);

drop policy if exists "biomarkers_insert_own" on public.biomarker_results;
create policy "biomarkers_insert_own"
  on public.biomarker_results for insert
  with check (auth.uid() = user_id);

drop policy if exists "biomarkers_update_own" on public.biomarker_results;
create policy "biomarkers_update_own"
  on public.biomarker_results for update
  using (auth.uid() = user_id);

drop policy if exists "uploads_select_own" on public.upload_records;
create policy "uploads_select_own"
  on public.upload_records for select
  using (auth.uid() = user_id);

drop policy if exists "uploads_insert_own" on public.upload_records;
create policy "uploads_insert_own"
  on public.upload_records for insert
  with check (auth.uid() = user_id);

drop policy if exists "uploads_delete_own" on public.upload_records;
create policy "uploads_delete_own"
  on public.upload_records for delete
  using (auth.uid() = user_id);

drop policy if exists "memberships_select_own" on public.memberships;
create policy "memberships_select_own"
  on public.memberships for select
  using (auth.uid() = user_id);

drop policy if exists "memberships_update_own" on public.memberships;
create policy "memberships_update_own"
  on public.memberships for update
  using (auth.uid() = user_id);

-- Storage setup:
-- 1) Create bucket named "test-results" in Storage UI.
-- 2) Make it private.
-- 3) Add these policies in SQL editor:
--
-- create policy "test_results_select_own" on storage.objects
-- for select using (
--   bucket_id = 'test-results' and auth.uid()::text = (storage.foldername(name))[1]
-- );
--
-- create policy "test_results_insert_own" on storage.objects
-- for insert with check (
--   bucket_id = 'test-results' and auth.uid()::text = (storage.foldername(name))[1]
-- );
