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
    <main className="min-h-screen bg-[#f4f5f7]">
      <div className="mx-auto w-full max-w-md">
        <div className="relative h-64 overflow-hidden">
          <img
            src="/assets/membership-help.png"
            alt="Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
          <img
            src="/assets/logo.png"
            alt="Standard Therapeutics"
            className="absolute left-5 top-5 h-12 w-12 object-contain"
          />
          <p className="absolute bottom-5 left-5 text-xl font-semibold leading-5 text-white">
            Standard
            <br />
            Therapeutics
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="-mt-6 rounded-t-[28px] bg-[#f4f5f7] px-6 pb-10 pt-8"
        >
          <h1 className="text-[46px] font-semibold leading-none tracking-[-0.02em] text-ink">
            Welcome back
          </h1>

          <p className="mt-4 text-[30px] leading-none text-muted">Don&apos;t have an account?</p>
          <p className="mt-1 text-[30px] leading-none">
            <Link href="/signup" className="text-accent">
              Create an account
            </Link>
          </p>

          <label className="mt-8 block text-[24px] text-ink">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="mt-2 h-16 w-full rounded-2xl border border-gray-200 bg-white px-4 text-2xl outline-none ring-accent/50 focus:ring-2"
          />

          <label className="mt-5 block text-[24px] text-ink">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="mt-2 h-16 w-full rounded-2xl border border-gray-200 bg-white px-4 text-2xl outline-none ring-accent/50 focus:ring-2"
          />

          {error ? <p className="mt-3 text-base text-red-600">{error}</p> : null}

          <button
            disabled={loading}
            className="mt-6 h-16 w-full rounded-2xl bg-[#05142c] text-3xl font-medium text-white disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="mt-5 text-[26px] text-muted">Forgot your login details?</p>
          <p className="mt-1 text-[26px]">
            <a href="#" className="text-accent">
              Reset password
            </a>
          </p>
          <p className="mt-1 text-[26px]">
            <a href="#" className="text-accent">
              Sign in with magic link.
            </a>
          </p>

          <div className="mt-8 flex gap-6 text-xl text-muted">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>

          <p className="mt-8 text-[22px] text-muted">
            New here?{" "}
            <Link href="/signup" className="text-accent">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
