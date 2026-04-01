import Link from "next/link";
import MembershipView from "@/components/membership/MembershipView";
import AppBottomNav from "@/components/navigation/AppBottomNav";

export default function MembershipPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            Standard Therapeutics
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Membership</h1>
        </div>
        <Link
          href="/app"
          className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-ink"
        >
          Back to app
        </Link>
      </div>

      <MembershipView />
      <AppBottomNav />
    </main>
  );
}
