"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Article = {
  title: string;
  subtitle: string;
  body: string;
  image: string;
};

function ArcGauge({ value, label }: { value: number; label: string }) {
  const fill = `conic-gradient(from 180deg, #ffffff ${value}%, rgba(255,255,255,0.28) ${value}% 100%)`;
  return (
    <div className="relative flex h-20 w-40 items-end justify-center overflow-hidden">
      <div className="absolute left-0 top-0 h-40 w-40 rounded-full" style={{ background: fill }} />
      <div className="absolute left-2 top-2 h-36 w-36 rounded-full bg-transparent" />
      <div className="absolute bottom-0 h-16 w-32 rounded-t-full bg-black/10" />
      <p className="relative z-10 text-xs font-semibold text-white">{label}</p>
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const points = useMemo(() => {
    const w = 84;
    const h = 28;
    return values
      .map((v, i) => `${(i / (values.length - 1)) * w},${h - v * h}`)
      .join(" ");
  }, [values]);

  return (
    <svg width="84" height="28" viewBox="0 0 84 28" className="text-accent">
      <polyline fill="none" stroke="currentColor" strokeWidth="2" points={points} />
    </svg>
  );
}

function trendFor(name: string) {
  switch (name) {
    case "LDL Cholesterol":
      return [0.62, 0.58, 0.55, 0.52, 0.5];
    case "Vitamin D (25-OH)":
      return [0.32, 0.26, 0.22, 0.27, 0.33];
    case "Total Cholesterol":
      return [0.55, 0.56, 0.54, 0.52, 0.53];
    case "Heart Rate Variability (HRV)":
      return [0.42, 0.6, 0.48, 0.66, 0.56];
    case "Pace of Aging":
      return [0.58, 0.6, 0.62, 0.64, 0.66];
    case "Biological Age":
      return [0.52, 0.5, 0.49, 0.47, 0.46];
    case "Ferritin":
      return [0.58, 0.5, 0.44, 0.5, 0.57];
    case "Free Testosterone":
      return [0.46, 0.5, 0.43, 0.55, 0.6];
    default:
      return [0.4, 0.48, 0.44, 0.52, 0.5];
  }
}

export default function HomeDashboardView({
  userEmail,
}: {
  userEmail?: string;
}) {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      title: "Could a sleeping mask dramatically improve your chances of sleep?",
      subtitle: "Exploring the new mind-eye connection and how it impacts rest.",
      body: "There is growing evidence that darkness cues in the eyes help synchronize your circadian rhythm and recovery.",
      image: "/assets/article-sleep-mask.png",
    },
    {
      title: "The Semiotics of Heartburn",
      subtitle: "Why coffee and low pH can change how your esophagus feels.",
      body: "Heartburn is a signal, not just a symptom. This article explores reflux patterns and triggers.",
      image: "/assets/article-heartburn.png",
    },
    {
      title: "The Anti Inflammatory Diet",
      subtitle: "Evidence-based eating to prevent and reduce inflammation.",
      body: "A practical framework for anti-inflammatory nutrition with whole-food swaps you can sustain.",
      image: "/assets/article-anti-inflammatory.png",
    },
    {
      title: "Integrative Medicine: An Approach of The Future",
      subtitle: "Why tomorrow's integrative medicine will just be called good medicine.",
      body: "The future of care combines rigorous diagnostics with lifestyle and behavior medicine.",
      image: "/assets/article-integrative-medicine.png",
    },
    {
      title: "Peptide Power",
      subtitle: "Peptides are exploding in popularity - but are they safe and effective?",
      body: "A primer on what the evidence says and where caution is still needed.",
      image: "/assets/article-peptide-power.png",
    },
    {
      title: "Coenzyme Q10",
      subtitle: "A closer look at this powerhouse quinone and where it shows up.",
      body: "CoQ10 supports mitochondrial energy production and oxidative balance.",
      image: "/assets/article-coenzyme-q10.png",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6 rounded-3xl border border-white/70 bg-card/95 p-5 shadow-soft backdrop-blur sm:mb-8">
        <img
          src="/assets/logo.png"
          alt="Standard Therapeutics"
          className="mb-3 h-12 w-12 object-contain"
        />
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Standard Therapeutics</h1>
        <p className="mt-1 text-sm text-muted">Your home to functional health</p>
        <p className="mt-2 text-sm text-muted">
          {userEmail
            ? `Welcome back, ${userEmail}.`
            : "Guest preview mode is active. Explore the app-style experience in your browser."}
        </p>
      </header>

      <section>
        <p className="mb-3 text-sm font-semibold text-muted">Biomarker Dashboard</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-[#E46A2D] p-5 text-white shadow-soft">
            <p className="text-sm text-white/80">Biological Age</p>
            <p className="mt-1 text-5xl font-bold leading-none">23.6</p>
            <p className="mt-2 text-sm text-white/85">2.4 years younger than your chronological age</p>
          </div>
          <div className="rounded-2xl bg-[#14161C] p-5 text-white shadow-soft">
            <p className="text-sm text-white/80">Blood Biomarkers</p>
            <p className="mt-1 text-5xl font-bold leading-none">60</p>
            <p className="mt-2 text-sm text-white/85">1 Pending · 3 Out of range</p>
          </div>
        </div>
      </section>

      <section className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
        <div className="min-w-[280px] snap-start rounded-2xl bg-blue-700 p-4 text-white shadow-soft">
          <p className="text-sm font-semibold">Standard Therapeutics</p>
          <p className="mt-1 text-xs text-blue-100">Your performance is decent. Stay on track.</p>
          <div className="mt-2 flex justify-end">
            <ArcGauge value={71} label="71 / 100" />
          </div>
        </div>
        <div className="min-w-[280px] snap-start rounded-2xl bg-emerald-800 p-4 text-white shadow-soft">
          <p className="text-sm font-semibold">Physical Age</p>
          <p className="mt-1 text-xs text-emerald-100">In relation to your current age.</p>
          <div className="mt-2 flex justify-end">
            <ArcGauge value={72} label="72%" />
          </div>
        </div>
        <div className="min-w-[220px] snap-start rounded-2xl bg-slate-950 p-4 text-white shadow-soft">
          <p className="text-sm font-semibold">VO2 Max</p>
          <p className="mt-3 text-3xl font-bold">45</p>
          <p className="text-xs text-white/70">ml/kg/min</p>
        </div>
      </section>

      <section className="mt-5 rounded-3xl bg-slate-950 p-5 text-white shadow-soft">
        <p className="text-sm font-semibold">Walking + Running Distance</p>
        <p className="mt-1 text-xs text-slate-400">Linked to Apple Health on your iPhone.</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-400">Average distance</p>
            <p className="text-3xl font-bold text-orange-400">5.6 km</p>
          </div>
          <div className="rounded-full bg-orange-500 px-4 py-2 text-center">
            <p className="text-base font-bold">7,280</p>
            <p className="text-[11px] text-orange-50">steps today</p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="grid grid-cols-[1.6fr_1fr_.8fr_1fr] border-b border-gray-200 pb-2 text-xs text-muted">
          <p>Name</p>
          <p>Status</p>
          <p>Value</p>
          <p>Trend</p>
        </div>
        {[
          ["Biological Age", "Standard Therapeutics", "Optimal", "23.63 yrs"],
          ["Pace of Aging", "Standard Therapeutics", "Optimal", "91%"],
          ["LDL Cholesterol", "Blood Test", "Optimal", "90 mg/dL"],
          ["Total Cholesterol", "Blood Test", "Optimal", "168 mg/dL"],
          ["Vitamin D (25-OH)", "Blood Test", "Out of range", "28 ng/mL"],
          ["Ferritin", "Blood Test", "In range", "62 ng/mL"],
          ["Free Testosterone", "Blood Test", "In range", "14.2 ng/dL"],
          ["Heart Rate Variability (HRV)", "Wearable", "In range", "58 ms"],
        ].map(([name, source, status, value]) => (
          <Link
            href="/app/your-data"
            key={name}
            className="grid grid-cols-[1.6fr_1fr_.8fr_1fr] items-center border-b border-gray-100 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-ink">{name}</p>
              <p className="text-xs text-muted">{source}</p>
            </div>
            <div>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">
                {status}
              </span>
            </div>
            <p className="text-xs text-ink">{value}</p>
            <Sparkline values={trendFor(name)} />
          </Link>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-ink">Next steps</h2>
        <div className="grid gap-3">
          <Link href="/app/uploads" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-soft">
            <p className="text-lg">📤</p>
            <p className="mt-2 text-base font-semibold text-ink">Upload Lab Report</p>
            <p className="text-sm text-muted">PDF or image of your bloodwork</p>
          </Link>
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-soft">
            <p className="text-lg">📅</p>
            <p className="mt-2 text-base font-semibold text-ink">Book Consultation</p>
            <p className="text-sm text-muted">Talk with a functional health coach</p>
          </div>
          <Link href="/app/membership" className="rounded-2xl border border-gray-200 bg-white p-4 shadow-soft">
            <p className="text-lg">📋</p>
            <p className="mt-2 text-base font-semibold text-ink">Action Plan</p>
            <p className="text-sm text-muted">Your personalized plan after the call</p>
          </Link>
        </div>

        <div className="mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
          {[
            "/assets/action-carousel-1.png",
            "/assets/action-carousel-2.png",
            "/assets/action-carousel-insert.png",
            "/assets/action-carousel-4.png",
            "/assets/action-carousel-last.png",
          ].map((img, idx) => (
            <Link
              key={img}
              href={idx === 4 ? "/app/membership" : "#"}
              className="min-w-[310px] snap-start overflow-hidden rounded-2xl shadow-soft"
            >
              <img src={img} alt={`Action carousel ${idx + 1}`} className="h-[220px] w-full object-cover" />
            </Link>
          ))}
        </div>

        <div className="mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
          <Link
            href="/app/membership"
            className="min-w-[260px] snap-start overflow-hidden rounded-2xl shadow-soft"
          >
            <img src="/assets/action-plan-preview.png" alt="Action plan preview" className="h-[180px] w-full object-cover" />
          </Link>
          <Link
            href="/app/membership"
            className="min-w-[260px] snap-start overflow-hidden rounded-2xl shadow-soft"
          >
            <img src="/assets/biomarker-cards.png" alt="Biomarker cards" className="h-[180px] w-full object-cover" />
          </Link>
        </div>

        <Link
          href="/app/membership"
          className="mt-2 block rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Join today
        </Link>
      </section>

      <section className="mt-7">
        <h2 className="mb-3 text-lg font-semibold tracking-tight text-ink">Articles</h2>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
          {articles.map((a) => (
            <button
              key={a.title}
              onClick={() => setActiveArticle(a)}
              className="min-w-[260px] snap-start overflow-hidden rounded-2xl bg-slate-950 text-left shadow-soft"
            >
              <img src={a.image} alt={a.title} className="h-36 w-full object-cover" />
              <p className="px-4 pt-3 text-sm font-semibold text-white">{a.title}</p>
              <p className="px-4 pb-4 pt-2 text-xs text-slate-300">{a.subtitle}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="relative overflow-hidden text-center text-white">
          <img src="/assets/article-ad-card.png" alt="Advertisement" className="h-[290px] w-full object-cover" />
          <p className="absolute inset-x-0 top-4 text-xs font-bold tracking-[0.18em]">ADVERTISEMENT</p>
        </div>
      </section>

      <section className="bg-white px-1 py-6">
        <h3 className="text-3xl font-extrabold text-ink">Need help deciding?</h3>
        <img src="/assets/membership-help.png" alt="Membership help" className="mt-3 h-56 w-full object-cover" />
        <p className="mt-2 text-center text-sm font-semibold text-black">
          Speak to our functional health coaches in a way that&apos;s convenient to you.
        </p>
        <Link href="/app" className="mt-3 block text-center text-3xl text-blue-600">
          💬
        </Link>
      </section>

      <footer className="pb-8 pt-4 text-center">
        <p className="text-xl font-bold text-ink">Your all in one health membership.</p>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted">
          The only health membership you need to become the healthiest version of yourself.
        </p>
      </footer>

      {activeArticle ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950">
          <button
            onClick={() => setActiveArticle(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xl text-white"
          >
            ✕
          </button>
          <img src={activeArticle.image} alt={activeArticle.title} className="h-72 w-full object-cover" />
          <div className="p-5">
            <h3 className="text-3xl font-extrabold text-white">{activeArticle.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{activeArticle.body}</p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
