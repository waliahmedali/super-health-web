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
        <div className="relative h-56 overflow-hidden">
          <img
            src="/assets/login-hero.png"
            alt="Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25" />
          <img
            src="/assets/logo.png"
            alt="Standard Therapeutics"
            className="absolute left-4 top-4 h-10 w-10 object-contain"
          />
        </div>

        <form
          onSubmit={onSubmit}
          className="-mt-6 rounded-t-[28px] bg-[#f4f5f7] px-6 pb-10 pt-8"
        >
          <h1 className="text-[36px] font-semibold leading-none tracking-[-0.02em] text-ink">
            Welcome back
          </h1>

          <p className="mt-3 text-[20px] leading-none text-muted">Don&apos;t have an account?</p>
          <p className="mt-1 text-[20px] leading-none">
            <Link href="/signup" className="text-accent">
              Create an account
            </Link>
          </p>

          <label className="mt-7 block text-[18px] text-ink">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="mt-2 h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 text-lg outline-none ring-accent/50 focus:ring-2"
          />

          <label className="mt-4 block text-[18px] text-ink">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            className="mt-2 h-14 w-full rounded-2xl border border-gray-200 bg-white px-4 text-lg outline-none ring-accent/50 focus:ring-2"
          />

          {error ? <p className="mt-3 text-base text-red-600">{error}</p> : null}

          <button
            disabled={loading}
            className="mt-5 h-14 w-full rounded-2xl bg-[#05142c] text-2xl font-medium text-white disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="mt-4 text-[16px] text-muted">Forgot your login details?</p>
          <p className="mt-1 text-[16px]">
            <a href="#" className="text-accent">
              Reset password
            </a>
          </p>
          <p className="mt-1 text-[16px]">
            <a href="#" className="text-accent">
              Sign in with magic link.
            </a>
          </p>

          <div className="mt-7 flex gap-5 text-sm text-muted">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>

          <p className="mt-6 text-[16px] text-muted">
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
