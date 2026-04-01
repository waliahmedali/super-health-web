import AppBottomNav from "@/components/navigation/AppBottomNav";

export default function ChatPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-24 sm:px-6 sm:py-8">
      <section className="rounded-[28px] border border-white/70 bg-card/95 p-5 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Chat
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-ink">
          Chat 👋
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Message your functional health coach and ask follow-up questions about
          your action plan, biomarkers, and next steps.
        </p>
      </section>

      <section className="mt-5 rounded-[24px] border border-gray-200 bg-white p-5 shadow-soft">
        <p className="text-sm text-muted">
          Chat thread preview coming next. For now, this screen keeps parity with
          your Expo navigation structure.
        </p>
      </section>

      <AppBottomNav />
    </main>
  );
}
