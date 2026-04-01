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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Your Data
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Biomarkers</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href="/app/uploads"
            className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm"
          >
            Upload Test Result
          </Link>
          <Link
            href="/app"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-ink"
          >
            Back to app
          </Link>
        </div>
      </div>

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
