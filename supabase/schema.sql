-- Standard Therapeutics - Phase 1 schema
-- Run this in Supabase SQL editor.

create extension if not exists pgcrypto;

-- Profile (one-to-one with auth.users)
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Biomarker history
create table if not exists public.biomarker_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  marker_name text not null,
  marker_category text,
  value_text text not null,
  unit text,
  status text check (status in ('Optimal', 'In range', 'Out of range', 'Pending')),
  measured_at date,
  source text default 'manual',
  created_at timestamptz not null default now()
);

create index if not exists biomarker_results_user_id_idx
  on public.biomarker_results(user_id, measured_at desc, created_at desc);

-- Uploaded reports / tests metadata
create table if not exists public.upload_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_path text not null,
  file_name text not null,
  mime_type text,
  size_bytes bigint,
  uploaded_at timestamptz not null default now()
);

create index if not exists upload_records_user_id_idx
  on public.upload_records(user_id, uploaded_at desc);

-- Membership state (Stripe-ready later)
create table if not exists public.memberships (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text not null default 'free',
  status text not null default 'inactive',
  renewal_at timestamptz,
  updated_at timestamptz not null default now()
);

-- Trigger to keep profile/membership rows ready at signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id) values (new.id)
  on conflict (user_id) do nothing;

  insert into public.memberships (user_id) values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
