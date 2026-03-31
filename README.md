# Standard Therapeutics Web

Production web app scaffold built with:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase Auth

## 1) Install

```bash
npm install
```

## 2) Configure env

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 3) Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` marketing/entry page
- `/login` login page
- `/signup` signup page
- `/app` protected app shell

## Deploy

1. Push this folder to a new GitHub repo.
2. Import repo into Vercel.
3. Add the same environment variables in Vercel project settings.
4. Deploy.

## Next build steps

- Run DB setup:
  1. Execute `supabase/schema.sql` in Supabase SQL Editor.
  2. Execute `supabase/rls.sql`.
  3. Create Storage bucket `test-results` (private).
  4. Add the storage policies from comments in `supabase/rls.sql`.

- Current implemented production data features:
  - `/app/your-data` -> reads from `biomarker_results`
  - `/app/uploads` -> uploads to Storage + writes `upload_records`

- Remaining app porting roadmap:
  - Dashboard KPIs wired to DB
  - Membership + Stripe billing
  - Profile pages
  - Treatments / Symptoms / Medications (later phase)
