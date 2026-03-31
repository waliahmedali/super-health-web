"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [debug, setDebug] = useState<{
    hasSession: boolean;
    userEmail: string | null;
    cookieNames: string[];
  } | null>(null);
  const [debugError, setDebugError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
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
  };

  const runDebug = async () => {
    try {
      setDebugError(null);
      const supabase = createClient();
      const [{ data: sessionData }, { data: userData }] = await Promise.all([
        supabase.auth.getSession(),
        supabase.auth.getUser(),
      ]);
      const cookieNames = document.cookie
        .split(";")
        .map((x) => x.trim().split("=")[0])
        .filter(Boolean);
      setDebug({
        hasSession: !!sessionData.session,
        userEmail: userData.user?.email ?? null,
        cookieNames,
      });
    } catch (e) {
      setDebugError(e instanceof Error ? e.message : "Unknown debug error");
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full rounded-[28px] border border-white/70 bg-card/95 p-8 shadow-soft backdrop-blur"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Standard Therapeutics
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Login</h1>
        <p className="mt-2 text-sm leading-6 text-muted">
          Welcome back to your health dashboard.
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

        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-semibold">Temporary auth debug</p>
            <button
              type="button"
              onClick={() => void runDebug()}
              className="rounded-md bg-white px-2 py-1 font-semibold text-amber-900"
            >
              Refresh debug
            </button>
          </div>
          {debug ? (
            <div className="space-y-1">
              <p>
                Session: <span className="font-semibold">{debug.hasSession ? "yes" : "no"}</span>
              </p>
              <p>
                User: <span className="font-semibold">{debug.userEmail ?? "-"}</span>
              </p>
              <p className="break-all">
                Cookies:{" "}
                <span className="font-semibold">
                  {debug.cookieNames.length ? debug.cookieNames.join(", ") : "(none)"}
                </span>
              </p>
            </div>
          ) : (
            <p>Tap "Refresh debug" after login attempt.</p>
          )}
          {debugError ? (
            <p className="mt-2 break-all font-semibold text-red-700">
              Debug error: {debugError}
            </p>
          ) : null}
        </div>
      </form>
    </main>
  );
}
