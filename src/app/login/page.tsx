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
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full rounded-[28px] border border-white/70 bg-card/95 p-8 shadow-soft backdrop-blur"
      >
        <img
          src="/assets/logo.png"
          alt="Standard Therapeutics"
          className="mb-4 h-[77px] w-[77px] -ml-1 object-contain"
        />
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Standard Therapeutics
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.01em]">Welcome back</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Sign in to continue to your health dashboard.
        </p>

        <label className="mt-6 block text-sm font-medium text-ink">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
        />

        <label className="mt-4 block text-sm font-medium text-ink">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
        />

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-4 text-sm text-muted">
          New here?{" "}
          <Link href="/signup" className="font-medium text-accent">
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}
