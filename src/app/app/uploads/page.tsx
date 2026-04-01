import Link from "next/link";
import UploadCenter from "@/components/uploads/UploadCenter";
import AppBottomNav from "@/components/navigation/AppBottomNav";

export default async function UploadsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10 pb-24">
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

      <UploadCenter initialRows={[]} />
      <AppBottomNav />
    </main>
  );
}
