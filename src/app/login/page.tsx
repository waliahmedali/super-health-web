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
    <main className="flex min-h-[100dvh] flex-col bg-[#e8eaed]">
      <div className="flex w-full flex-1 flex-col">
        <div className="relative h-[48vh] min-h-[240px] max-h-[480px] w-full shrink-0 overflow-hidden sm:h-[44vh] sm:max-h-[520px]">
          <img
            src="/assets/login-hero.png"
            alt="Standard Therapeutics — Your baseline is your blueprint"
            className="h-full w-full object-cover object-[center_35%]"
          />
        </div>

        <div className="relative z-10 -mt-7 flex min-h-0 flex-1 flex-col">
          <form
            onSubmit={onSubmit}
            className="flex min-h-0 flex-1 flex-col rounded-t-[36px] bg-white px-6 pb-10 pt-6 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] sm:px-8"
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
