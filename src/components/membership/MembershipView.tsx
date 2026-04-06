"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Plan = "monthly" | "annual";

const faqs = [
  {
    q: "What should I expect during a blood draw?",
    a: "A standard venous blood draw by a trained phlebotomist. Most appointments take 10 to 15 minutes.",
  },
  {
    q: "How do I prepare for my blood draw?",
    a: "Follow fasting instructions if provided, stay hydrated, and avoid intense exercise beforehand.",
  },
  {
    q: "How soon do results appear in the app?",
    a: "Timelines depend on panel type and lab throughput. Most core markers arrive within a few business days.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. You can manage or cancel from your account settings based on your billing cycle terms.",
  },
];

export default function MembershipView() {
  const [plan, setPlan] = useState<Plan>("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [membershipImageLoaded, setMembershipImageLoaded] = useState(false);

  const price = useMemo(() => (plan === "monthly" ? "$16" : "$199"), [plan]);
  const suffix = useMemo(() => (plan === "monthly" ? "/month" : "/year"), [plan]);

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-white/70 bg-card/95 p-6 shadow-soft backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Membership
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          Standard Therapeutics Member
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          One membership for testing, coaching, and personalized action plans.
        </p>

        <div className="mt-5 inline-flex rounded-full bg-gray-100 p-1">
          <button
            onClick={() => setPlan("monthly")}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              plan === "monthly" ? "bg-white text-ink shadow-sm" : "text-muted"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setPlan("annual")}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              plan === "annual" ? "bg-white text-ink shadow-sm" : "text-muted"
            }`}
          >
            Annual · 2 months free
          </button>
        </div>

        <div className="mt-5">
          <p className="text-4xl font-semibold tracking-tight">{price}</p>
          <p className="mt-1 text-sm text-muted">{suffix}</p>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
          {!membershipImageLoaded ? (
            <div className="h-[220px] w-full animate-pulse bg-gray-200 sm:h-[250px]" />
          ) : null}
          <Image
            src="/assets/membership-preview.png"
            alt="Membership card preview"
            width={1400}
            height={900}
            priority
            fetchPriority="high"
            sizes="(max-width: 640px) 100vw, 640px"
            onLoad={() => setMembershipImageLoaded(true)}
            className={`h-[220px] w-full object-cover transition-opacity duration-300 sm:h-[250px] ${
              membershipImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        <ul className="mt-6 space-y-3 text-sm text-ink">
          {[
            "100+ biomarkers annually in one collection",
            "Personalized action plan that evolves with you",
            "Biological age and pace-of-aging tracking",
            "Functional health coach support",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 text-accent">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <button className="mt-6 w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-sm">
          Become a member
        </button>
      </div>

      <div className="rounded-3xl border border-white/70 bg-card/95 p-6 shadow-soft backdrop-blur">
        <h3 className="text-lg font-semibold tracking-tight">Frequently Asked Questions</h3>
        <div className="mt-4 divide-y divide-gray-100">
          {faqs.map((f, idx) => {
            const open = openFaq === idx;
            return (
              <div key={f.q} className="py-3">
                <button
                  onClick={() => setOpenFaq(open ? null : idx)}
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <span className="text-sm font-semibold">{f.q}</span>
                  <span className="text-xl text-muted">{open ? "−" : "+"}</span>
                </button>
                {open ? <p className="mt-2 text-sm leading-6 text-muted">{f.a}</p> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-white/70 bg-card/95 p-6 text-center shadow-soft backdrop-blur">
        <p className="text-xl font-semibold tracking-tight">
          Your all in one health membership.
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          The only health membership you need to become the healthiest version of yourself.
        </p>
      </div>
    </section>
  );
}
