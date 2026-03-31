import Link from "next/link";

export default function ActionPlanPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-8">
      <section className="rounded-[28px] border border-white/70 bg-card/95 p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Action Plan
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink">
          Your personalized plan
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Review your latest functional health recommendations and download the
          full PDF anytime.
        </p>
      </section>

      <section className="mt-5 overflow-hidden rounded-[24px] shadow-soft">
        <img
          src="/assets/action-plan-preview.png"
          alt="Action plan preview"
          className="h-[260px] w-full object-cover sm:h-[320px]"
        />
      </section>

      <section className="mt-5 grid gap-3 sm:grid-cols-2">
        <a
          href="/assets/action-plan.pdf"
          target="_blank"
          rel="noreferrer"
          className="rounded-[14px] bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Open PDF
        </a>
        <a
          href="/assets/action-plan.pdf"
          download
          className="rounded-[14px] border border-gray-200 bg-white px-4 py-3 text-center text-sm font-semibold text-ink"
        >
          Download PDF
        </a>
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
