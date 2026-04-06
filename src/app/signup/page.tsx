"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const supabase = createClient();
      const signUpPromise = supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Sign-up timed out. Please try again.")), 15000);
      });
      const { data, error } = await Promise.race([signUpPromise, timeoutPromise]);
      if (error) {
        setError(error.message);
        return;
      }

      // If email confirmation is enabled, Supabase often returns no session here.
      if (!data.session) {
        window.location.assign("/login");
        return;
      }

      // Force full navigation so auth cookies/session are guaranteed fresh.
      window.location.assign("/app");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create account right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[100dvh] flex-col bg-[#e8eaed]">
      <div className="flex w-full flex-1 flex-col">
        <div className="relative h-[25vh] min-h-[150px] max-h-[220px] w-full shrink-0 overflow-hidden sm:h-[24vh] sm:max-h-[260px]">
          <img
            src="/assets/login-hero.png?v=20260406-1"
            alt="Standard Therapeutics — Your baseline is your blueprint"
            className="h-full w-full object-cover object-left-top"
          />
        </div>

        <div className="relative z-10 -mt-9 flex min-h-0 flex-1 flex-col sm:-mt-10">
          <form
            onSubmit={onSubmit}
            className="flex min-h-0 flex-1 flex-col rounded-t-[36px] bg-white px-6 pb-10 pt-6 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] sm:px-8"
          >
            <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-ink">
              Create your account
            </h1>

            <p className="mt-3 inline-flex w-fit rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              Standard Therapeutics membership
            </p>

            <h2 className="mt-4 text-[38px] font-semibold leading-[1.03] tracking-[-0.03em] text-ink">
              A health check like never before
            </h2>
            <p className="mt-2 text-[18px] leading-7 text-muted">
              Sign up to test 100+ biomarkers yearly, visualize health records and get a
              personalized plan that actually works.
            </p>

            <div className="mt-4 flex items-center gap-3 text-sm text-muted">
              <div className="flex -space-x-2">
                <img
                  src="/assets/profile.png"
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/assets/profile.png"
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="/assets/profile.png"
                  alt=""
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              </div>
              <span>Trusted by thousands of members.</span>
            </div>

            <div className="mt-5 rounded-2xl border border-gray-200 bg-[#fafafa] p-3">
              <div className="flex items-start gap-3">
                <img
                  src="/assets/upload-lab-icon.png"
                  alt=""
                  className="h-10 w-10 rounded-lg border border-gray-200 bg-white object-contain p-1"
                />
                <div className="min-w-0">
                  <p className="text-[22px] font-semibold leading-tight text-ink">
                    Standard Therapeutics Membership{" "}
                    <span className="whitespace-nowrap">$199/yr</span>
                  </p>
                  <p className="mt-1 text-sm leading-5 text-muted">
                    100+ biomarkers, results tracked over time, and 24/7 access to your
                    care team.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-accent">
                Login
              </Link>
            </p>

            <label className="mt-6 block text-xs font-medium text-muted">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-[15px] outline-none ring-accent/40 focus:ring-2"
            />

            <label className="mt-3 block text-xs font-medium text-muted">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="Your email"
              className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-[15px] outline-none ring-accent/40 focus:ring-2"
            />

            <label className="mt-3 block text-xs font-medium text-muted">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Your password"
              className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-[15px] outline-none ring-accent/40 focus:ring-2"
            />

            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

            <button
              disabled={loading}
              className="mt-5 h-11 w-full rounded-xl bg-[#05142c] text-[15px] font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
