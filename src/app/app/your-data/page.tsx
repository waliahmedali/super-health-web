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
    <main className="mx-auto w-full max-w-6xl px-4 py-6 pb-24 sm:px-6 sm:py-8">
      <div className="mb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Your Data</h1>
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
