import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import BiomarkerTable from "@/components/your-data/BiomarkerTable";
import AppBottomNav from "@/components/navigation/AppBottomNav";

export default async function YourDataPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let rows: any[] = [];
  let error: any = null;
  if (user) {
    const res = await supabase
      .from("biomarker_results")
      .select("id, marker_name, marker_category, value_text, unit, status, measured_at")
      .eq("user_id", user.id)
      .order("measured_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });
    rows = res.data ?? [];
    error = res.error;
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10 pb-24">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Your Data
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Biomarkers</h1>
      </div>

      <section className="mb-5 grid gap-2.5 sm:gap-3">
        <a
          href="/app/uploads"
          className="rounded-[18px] border border-gray-200 bg-white p-4 shadow-soft transition active:scale-[0.99]"
        >
          <p className="text-lg">📤</p>
          <p className="mt-2 text-base font-semibold text-ink">Upload Lab Report</p>
          <p className="text-sm text-muted">PDF or image of your bloodwork</p>
        </a>
        <a
          href="/app/action-plan"
          className="rounded-[18px] border border-gray-200 bg-white p-4 shadow-soft transition active:scale-[0.99]"
        >
          <p className="text-lg">📋</p>
          <p className="mt-2 text-base font-semibold text-ink">Action Plan</p>
          <p className="text-sm text-muted">Your personalized plan after the call</p>
        </a>
      </section>

      <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="overflow-hidden rounded-2xl shadow-soft">
          <img
            src="/assets/article-thyroid.png"
            alt="Thyroid insight"
            className="h-44 w-full object-cover"
          />
          <div className="bg-slate-950 p-4 text-white">
            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-300">
              Blood Panel
            </p>
            <p className="mt-1 text-base font-semibold">
              Restore thyroid function to boost energy & metabolism
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl shadow-soft">
          <img
            src="/assets/article-insulin-sensitivity.png"
            alt="Metabolic insight"
            className="h-44 w-full object-cover"
          />
          <div className="bg-slate-950 p-4 text-white">
            <p className="text-[11px] uppercase tracking-[0.12em] text-slate-300">
              Metabolic Health
            </p>
            <p className="mt-1 text-base font-semibold">
              Improve insulin sensitivity
            </p>
          </div>
        </div>
      </section>

      <section className="mb-5">
        <Link
          href="/app/membership"
          className="block overflow-hidden rounded-2xl shadow-soft transition active:scale-[0.99]"
        >
          <img
            src="/assets/your-data-membership-cta.png"
            alt="Join membership"
            className="h-auto w-full object-cover"
          />
        </Link>
        <Link
          href="/app/membership"
          className="mt-3 block rounded-[12px] bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-soft"
        >
          Join today
        </Link>
      </section>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          Failed to load biomarkers. Check Supabase schema/RLS setup.
        </div>
      ) : (
        <BiomarkerTable rows={rows ?? []} />
      )}
      <AppBottomNav />
    </main>
  );
}
