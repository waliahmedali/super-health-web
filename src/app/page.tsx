import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl bg-card p-8 shadow-soft">
        <p className="text-sm font-medium text-muted">Standard Therapeutics</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Production web app starter
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Auth and protected routes are ready. Connect Supabase in `.env.local`
          and start mapping your mobile features to web.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-ink"
          >
            Sign up
          </Link>
          <Link
            href="/app"
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-ink"
          >
            Go to App
          </Link>
        </div>
      </div>
    </main>
  );
}
