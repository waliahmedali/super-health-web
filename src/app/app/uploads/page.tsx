import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import UploadCenter from "@/components/uploads/UploadCenter";

export default async function UploadsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let rows: any[] = [];
  if (user) {
    const res = await supabase
      .from("upload_records")
      .select("id, file_name, file_path, mime_type, size_bytes, uploaded_at")
      .eq("user_id", user.id)
      .order("uploaded_at", { ascending: false });
    rows = res.data ?? [];
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Your Data
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Uploads</h1>
        </div>
        <Link
          href="/app"
          className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-ink"
        >
          Back to app
        </Link>
      </div>

      <UploadCenter initialRows={(rows ?? []) as any} />
    </main>
  );
}
