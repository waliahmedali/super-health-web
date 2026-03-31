import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const tests = [
    "Standard Blood Panel",
    "Advanced Blood Panel",
    "Gut Microbiome Analysis",
    "Continuous Glucose Monitor",
    "DEXA Scan",
    "VO2 Max Test",
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-8">
      <section className="rounded-[28px] border border-white/70 bg-card/95 p-5 shadow-soft">
        <div className="flex items-center gap-4">
          <img
            src="/assets/profile.png"
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Profile
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-ink">
              W. Ali
            </h1>
            <p className="text-sm text-muted">
              {user?.email ?? "Guest preview"}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 rounded-[24px] border border-white/70 bg-card/95 p-5 shadow-soft">
        <h2 className="text-lg font-semibold tracking-tight text-ink">
          Included tests
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {tests.map((test) => (
            <div
              key={test}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-ink"
            >
              {test}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <Link
          href="/app"
          className="inline-flex rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-ink"
        >
          Back to Home
        </Link>
      </section>
    </main>
  );
}
