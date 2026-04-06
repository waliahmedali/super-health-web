"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppBottomNav from "@/components/navigation/AppBottomNav";

type Article = {
  title: string;
  subtitle: string;
  body: string;
  image: string;
  imagePosition?: string;
};

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
      {values.map((v, i) => {
        const x = (i / (values.length - 1)) * 84;
        const y = 28 - v * 28;
        return (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={i === values.length - 1 ? 2.5 : 1.8}
            fill="currentColor"
            opacity={i === values.length - 1 ? 1 : 0.65}
          />
        );
      })}
    </svg>
  );
}

function trendFor(name: string) {
  switch (name) {
    case "LDL Cholesterol":
      return [0.66, 0.63, 0.57, 0.61, 0.53, 0.55, 0.49];
    case "Vitamin D (25-OH)":
      return [0.26, 0.2, 0.24, 0.22, 0.31, 0.29, 0.36];
    case "Total Cholesterol":
      return [0.6, 0.58, 0.54, 0.57, 0.52, 0.49, 0.51];
    case "Heart Rate Variability (HRV)":
      return [0.41, 0.62, 0.5, 0.69, 0.53, 0.64, 0.57];
    case "Pace of Aging":
      return [0.54, 0.6, 0.58, 0.63, 0.61, 0.66, 0.65];
    case "Biological Age":
      return [0.56, 0.52, 0.49, 0.5, 0.47, 0.44, 0.46];
    case "Ferritin":
      return [0.63, 0.52, 0.45, 0.51, 0.47, 0.56, 0.61];
    case "Free Testosterone":
      return [0.43, 0.49, 0.41, 0.54, 0.5, 0.58, 0.62];
    default:
      return [0.38, 0.47, 0.42, 0.53, 0.48, 0.56, 0.5];
  }
}

export default function HomeDashboardView() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [pendingTopTab, setPendingTopTab] = useState<"Data" | "Records" | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const routeTopTab: "Data" | "Records" = pathname?.startsWith("/app/your-data")
    ? "Records"
    : "Data";
  const activeTopTab = pendingTopTab ?? routeTopTab;

  useEffect(() => {
    if (!pendingTopTab) return;
    const timer = window.setTimeout(() => {
      router.push(pendingTopTab === "Records" ? "/app/your-data" : "/app");
    }, 100);
    return () => window.clearTimeout(timer);
  }, [pendingTopTab, router]);

  useEffect(() => {
    setPendingTopTab(null);
  }, [pathname]);

  useEffect(() => {
    if (!activeArticle) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [activeArticle]);

  const articles: Article[] = [
    {
      title: "Could a sleeping mask dramatically improve your chances of sleep?",
      subtitle: "Exploring the new mind-eye connection and how it impacts rest.",
      body: "There is growing evidence that darkness cues in the eyes help synchronize your circadian rhythm and recovery.",
      image: "/assets/article-sleep-mask.png",
      imagePosition: "center 28%",
    },
    {
      title: "The Semiotics of Heartburn",
      subtitle: "Why coffee and low pH can change how your esophagus feels.",
      body: "Heartburn is a signal, not just a symptom. This article explores reflux patterns and triggers.",
      image: "/assets/article-heartburn.png",
      imagePosition: "center 38%",
    },
    {
      title: "The Anti Inflammatory Diet",
      subtitle: "Evidence-based eating to prevent and reduce inflammation.",
      body: "A practical framework for anti-inflammatory nutrition with whole-food swaps you can sustain.",
      image: "/assets/article-anti-inflammatory.png",
      imagePosition: "center 38%",
    },
    {
      title: "Integrative Medicine: An Approach of The Future",
      subtitle: "Why tomorrow's integrative medicine will just be called good medicine.",
      body: "The future of care combines rigorous diagnostics with lifestyle and behavior medicine.",
      image: "/assets/article-integrative-medicine.png",
      imagePosition: "center 36%",
    },
    {
      title: "Peptide Power",
      subtitle: "Peptides are exploding in popularity - but are they safe and effective?",
      body: "A primer on what the evidence says and where caution is still needed.",
      image: "/assets/article-peptide-power.png",
      imagePosition: "center 38%",
    },
    {
      title: "Coenzyme Q10",
      subtitle: "A closer look at this powerhouse quinone and where it shows up.",
      body: "CoQ10 supports mitochondrial energy production and oxidative balance.",
      image: "/assets/article-coenzyme-q10.png",
      imagePosition: "center 34%",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-5 pb-28 sm:px-6 sm:py-8 sm:pb-24">
      <header className="mb-5 pt-1 sm:mb-7">
        <h1 className="text-[28px] font-semibold leading-[1] tracking-[-0.03em] text-ink sm:text-[34px]">
          Standard Therapeutics
        </h1>
        <div className="mt-3 flex items-center gap-6">
          <button
            type="button"
            onClick={() => setPendingTopTab("Data")}
            className={`border-b-2 pb-1.5 text-[24px] leading-none tracking-[-0.03em] transition-all duration-150 sm:text-[28px] ${
              activeTopTab === "Data"
                ? "border-ink font-medium text-ink"
                : "border-transparent font-normal text-muted hover:text-ink"
            }`}
          >
            Data
          </button>
          <button
            type="button"
            onClick={() => setPendingTopTab("Records")}
            className={`border-b-2 pb-1.5 text-[24px] leading-none tracking-[-0.03em] transition-all duration-150 sm:text-[28px] ${
              activeTopTab === "Records"
                ? "border-ink font-medium text-ink"
                : "border-transparent font-normal text-muted hover:text-ink"
            }`}
          >
            Records
          </button>
        </div>
      </header>

      <section>
        <p className="mb-2 text-[13px] font-semibold text-muted sm:mb-3 sm:text-sm">Biomarker Dashboard</p>
        <div className="mb-2.5 flex items-center gap-4 overflow-x-auto pb-1 text-[13px] text-muted sm:mb-3">
          <button type="button" className="inline-flex shrink-0 items-center gap-1.5 text-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
            <span className="whitespace-nowrap font-medium">Summary</span>
          </button>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-muted"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-emerald-300 text-[10px] text-emerald-600">
              ✓
            </span>
            <span>Liver Health</span>
          </button>
          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-muted"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-emerald-300 text-[10px] text-emerald-600">
              ✓
            </span>
            <span>Kidney Health</span>
          </button>
        </div>
        <div className="relative overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#07245f_0%,#0a4db4_48%,#2bd2ff_100%)] p-4 text-white shadow-soft sm:p-5">
          <div className="pointer-events-none absolute inset-0 opacity-45">
            <div className="absolute -right-12 -top-14 h-52 w-52 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute left-20 top-10 h-24 w-44 rounded-full bg-sky-300/30 blur-2xl" />
          </div>
          <div className="relative z-10">
            <p className="text-[13px] font-medium text-white/90 sm:text-sm">Biological age</p>
            <p className="mt-1 text-[46px] font-semibold leading-none tracking-tight sm:text-[52px]">29.5</p>
            <p className="mt-1 text-[14px] text-white/90 sm:text-[15px]">2.5 years younger</p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[18px] border border-gray-100 bg-white p-4 shadow-soft sm:mt-5 sm:p-5">
        <p className="text-[13px] font-semibold text-ink">Biomarkers</p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          <div>
            <p className="text-[28px] font-semibold leading-none text-ink sm:text-[30px]">106</p>
            <p className="mt-1 text-[11px] text-muted sm:text-xs">Total</p>
          </div>
          <div>
            <p className="text-[28px] font-semibold leading-none text-ink sm:text-[30px]">80</p>
            <p className="mt-1 text-[11px] text-muted sm:text-xs">Optimal</p>
          </div>
          <div>
            <p className="text-[28px] font-semibold leading-none text-ink sm:text-[30px]">21</p>
            <p className="mt-1 text-[11px] text-muted sm:text-xs">In range</p>
          </div>
          <div>
            <p className="text-[28px] font-semibold leading-none text-ink sm:text-[30px]">5</p>
            <p className="mt-1 text-[11px] text-muted sm:text-xs">Out of range</p>
          </div>
        </div>
        <div className="mt-3 flex h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full bg-emerald-500" style={{ width: "75.5%" }} />
          <div className="h-full bg-yellow-400" style={{ width: "19.8%" }} />
          <div className="h-full bg-orange-500" style={{ width: "4.7%" }} />
        </div>
      </section>

      <section className="mt-5 sm:mt-6">
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
            className="grid grid-cols-[1.6fr_1fr_.8fr_1fr] items-center border-b border-gray-100 py-3.5"
          >
            <div>
              <p className="text-[13px] font-semibold text-ink sm:text-sm">{name}</p>
              <p className="text-xs text-muted">{source}</p>
            </div>
            <div>
              <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] text-emerald-700">
                {status}
              </span>
            </div>
            <p className="text-[11px] text-ink sm:text-xs">{value}</p>
            <Sparkline values={trendFor(name)} />
          </Link>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="mb-2.5 text-lg font-semibold tracking-tight text-ink sm:mb-3">Next steps</h2>
        <div className="grid gap-2.5 sm:gap-3">
          <Link
            href="/app/uploads"
            prefetch
            className="rounded-[18px] border border-gray-200 bg-white p-4 shadow-soft transition active:scale-[0.99]"
          >
            <p className="text-lg">📤</p>
            <p className="mt-2 text-base font-semibold text-ink">Upload Lab Report</p>
            <p className="text-sm text-muted">PDF or image of your bloodwork</p>
          </Link>
          <div className="rounded-[18px] border border-gray-200 bg-white p-4 shadow-soft">
            <p className="text-lg">📅</p>
            <p className="mt-2 text-base font-semibold text-ink">Book Consultation</p>
            <p className="text-sm text-muted">Talk with a functional health coach</p>
          </div>
          <Link href="/app/action-plan" className="rounded-[18px] border border-gray-200 bg-white p-4 shadow-soft">
            <p className="text-lg">📋</p>
            <p className="mt-2 text-base font-semibold text-ink">Action Plan</p>
            <p className="text-sm text-muted">Your personalized plan after the call</p>
          </Link>
        </div>

        <div className="mt-3 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 sm:mt-4 sm:gap-3">
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
              className="min-w-[296px] snap-start overflow-hidden rounded-[18px] shadow-soft sm:min-w-[310px]"
            >
              <img src={img} alt={`Action carousel ${idx + 1}`} className="h-[205px] w-full object-cover sm:h-[220px]" />
            </Link>
          ))}
        </div>

        <div className="mt-2.5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 sm:mt-3 sm:gap-3">
          <Link
            href="/app/action-plan"
            className="min-w-[248px] snap-start overflow-hidden rounded-[18px] shadow-soft sm:min-w-[260px]"
          >
            <img src="/assets/action-plan-preview.png" alt="Action plan preview" className="h-[170px] w-full object-cover sm:h-[180px]" />
          </Link>
          <Link
            href="/app/membership"
            className="min-w-[248px] snap-start overflow-hidden rounded-[18px] shadow-soft sm:min-w-[260px]"
          >
            <img src="/assets/biomarker-cards.png" alt="Biomarker cards" className="h-[170px] w-full object-cover sm:h-[180px]" />
          </Link>
        </div>

        <Link
          href="/app/membership"
          className="mt-2 block rounded-[12px] bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
        >
          Join today
        </Link>
      </section>

      <section className="mt-6 sm:mt-7">
        <h2 className="mb-2.5 text-lg font-semibold tracking-tight text-ink sm:mb-3">Articles</h2>
        <div className="flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 sm:gap-3">
          {articles.map((a) => (
            <button
              key={a.title}
              onClick={() => setActiveArticle(a)}
              className="min-w-[248px] snap-start overflow-hidden rounded-[18px] bg-white text-left dark:bg-slate-950 sm:min-w-[260px]"
            >
              <img
                src={a.image}
                alt={a.title}
                className="block h-40 w-full object-cover sm:h-44"
                style={{ objectPosition: a.imagePosition ?? "center 34%" }}
              />
              <p className="px-4 pt-3 text-sm font-semibold text-ink dark:text-white">{a.title}</p>
              <p className="px-4 pb-4 pt-2 text-xs text-muted dark:text-slate-300">{a.subtitle}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5 sm:mt-6">
        <div className="relative overflow-hidden text-center text-white">
          <img src="/assets/article-ad-card.png" alt="Advertisement" className="h-[265px] w-full object-cover sm:h-[290px]" />
          <p className="absolute inset-x-0 top-4 text-xs font-bold tracking-[0.18em]">ADVERTISEMENT</p>
        </div>
      </section>

      <section className="bg-white px-0.5 py-5 sm:py-6">
        <h3 className="text-[30px] font-extrabold tracking-tight text-ink">Need help deciding?</h3>
        <img src="/assets/membership-help.png" alt="Membership help" className="mt-2.5 h-52 w-full object-cover sm:mt-3 sm:h-56" />
        <p className="mt-2 text-center text-sm font-semibold text-black">
          Speak to our functional health coaches in a way that&apos;s convenient to you.
        </p>
        <Link href="/app" className="mt-3 block text-center text-3xl text-blue-600">
          💬
        </Link>
      </section>

      <footer className="pb-7 pt-3 text-center sm:pb-8 sm:pt-4">
        <p className="text-[22px] font-bold tracking-tight text-ink sm:text-xl">Your all in one health membership.</p>
        <p className="mx-auto mt-1.5 max-w-xl text-[13px] leading-6 text-muted sm:mt-2 sm:text-sm">
          The only health membership you need to become the healthiest version of yourself.
        </p>
      </footer>

      {activeArticle ? (
        <div className="fixed inset-0 z-[70] min-h-screen overflow-y-auto bg-white dark:bg-[#020617]">
          <div className="sticky top-0 z-10 flex items-center justify-center border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-[#020617]/95">
            <p className="max-w-[78%] truncate text-[15px] font-semibold text-ink dark:text-white">
              {activeArticle.title}
            </p>
            <button
              type="button"
              onPointerDown={() => setActiveArticle(null)}
              className="absolute right-4 inline-flex h-10 w-10 touch-manipulation items-center justify-center rounded-full bg-gray-100 text-2xl leading-none text-ink transition-transform duration-75 active:scale-95 dark:bg-slate-800 dark:text-white"
              aria-label="Close article"
            >
              ×
            </button>
          </div>
          <img src={activeArticle.image} alt={activeArticle.title} className="h-72 w-full object-cover" />
          <div className="p-5">
            <h3 className="text-3xl font-extrabold text-ink dark:text-white">{activeArticle.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted dark:text-slate-300">{activeArticle.body}</p>
          </div>
        </div>
      ) : null}

      <AppBottomNav />
    </main>
  );
}
