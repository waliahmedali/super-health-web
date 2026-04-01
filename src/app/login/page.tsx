"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
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
      const signInPromise = supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Sign-in timed out. Please try again.")), 15000);
      });
      const { data, error } = await Promise.race([signInPromise, timeoutPromise]);

      if (error) {
        if (error.message.toLowerCase().includes("email not confirmed")) {
          setError("Please verify your email first, then try logging in.");
        } else {
          setError(error.message);
        }
        return;
      }

      if (!data.session) {
        setError("Login succeeded but no session was created. Please try again.");
        return;
      }

      // Force full navigation so server-side auth state/cookies are guaranteed fresh.
      window.location.assign("/app");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in right now. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#e8eaed]">
      <div className="mx-auto w-full max-w-[380px]">
        <div className="relative h-44 overflow-hidden sm:h-48">
          <img
            src="/assets/login-hero.png"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <p className="absolute left-5 top-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white drop-shadow-sm">
            Standard Therapeutics
          </p>
        </div>

        <div className="relative z-10 -mt-7">
          <form
            onSubmit={onSubmit}
            className="rounded-t-[36px] bg-white px-5 pb-8 pt-6 shadow-[0_-8px_30px_rgba(15,23,42,0.08)]"
          >
            <h1 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-ink">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-muted">Don&apos;t have an account?</p>
            <p className="mt-0.5 text-sm">
              <Link href="/signup" className="font-medium text-accent">
                Create an account
              </Link>
            </p>

            <label className="mt-5 block text-xs font-medium text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-[15px] outline-none ring-accent/40 focus:ring-2"
            />

            <label className="mt-3 block text-xs font-medium text-muted">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="mt-1.5 h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-[15px] outline-none ring-accent/40 focus:ring-2"
            />

            {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}

            <button
              disabled={loading}
              className="mt-4 h-11 w-full rounded-xl bg-[#05142c] text-[15px] font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <p className="mt-3 text-xs text-muted">Forgot your login details?</p>
            <p className="mt-0.5 text-xs">
              <a href="#" className="text-accent">
                Reset password
              </a>
            </p>
            <p className="mt-0.5 text-xs">
              <a href="#" className="text-accent">
                Sign in with magic link.
              </a>
            </p>

            <div className="mt-5 flex gap-4 text-[11px] text-muted">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>

            <p className="mt-4 text-xs text-muted">
              New here?{" "}
              <Link href="/signup" className="font-medium text-accent">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
