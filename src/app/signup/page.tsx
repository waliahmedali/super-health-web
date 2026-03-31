"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    // If email confirmation is enabled, Supabase often returns no session here.
    if (!data.session) {
      setSuccess(
        "Account created. Please verify your email, then log in.",
      );
      router.push("/login");
      router.refresh();
      return;
    }

    setSuccess("Account created. Redirecting to your app...");
    router.push("/app");
    router.refresh();
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
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.01em]">Create your account</h1>
        <p className="mt-2 text-sm text-muted">
          Create your Standard Therapeutics account.
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
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none ring-accent focus:ring-2"
        />

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        {success ? <p className="mt-3 text-sm text-green-700">{success}</p> : null}

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="mt-4 text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
