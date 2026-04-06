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
    <main className="min-h-[100dvh] bg-[#f7f8fa]">
      <div className="mx-auto w-full max-w-3xl px-5 pb-12 pt-7 sm:px-8 sm:pt-9">
        <form onSubmit={onSubmit} className="w-full">
          <h1 className="text-[34px] font-semibold leading-[0.98] tracking-[-0.03em] text-ink sm:text-[40px]">
            Standard Therapeutics
          </h1>

          <p className="mt-4 inline-flex w-fit rounded-lg bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            Standard Therapeutics membership
          </p>

          <h2 className="mt-4 text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[32px]">
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
                <p className="text-[18px] font-semibold leading-tight text-ink sm:text-[20px]">
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

          <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.02em] text-ink">
            Create your account
          </h3>

          <label className="mt-4 block text-xs font-medium text-muted">Name</label>
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
    </main>
  );
}
