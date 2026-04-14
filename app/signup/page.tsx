"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Check if email confirmation is required
    // When confirmation is needed, data.session will be null
    if (data.user && !data.session) {
      // Email confirmation required — create profile anyway (it'll be ready when they confirm)
      await supabase.from("user_profiles").upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        plan: "free",
      }, { onConflict: "id" });

      setConfirmationSent(true);
      setLoading(false);
      return;
    }

    // No confirmation needed — user is logged in immediately
    if (data.user) {
      const { error: profileError } = await supabase.from("user_profiles").upsert({
        id: data.user.id,
        email,
        full_name: fullName,
        plan: "free",
      }, { onConflict: "id" });

      if (profileError) {
        setError("Account created but profile setup failed. Please log in and try again.");
        setLoading(false);
        return;
      }
    }

    window.location.href = "/dashboard";
  };

  // Email confirmation sent — show check-your-email screen
  if (confirmationSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--cream)" }}>
        <div className="w-full max-w-sm text-center">
          <Link href="/" className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            NicheKit
          </Link>

          <div className="mt-8 p-6 rounded-2xl" style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}>
            <span className="text-3xl block mb-4">📬</span>
            <h2 className="text-lg mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              Check your email
            </h2>
            <p className="text-sm mb-4" style={{ color: "var(--ink-light)" }}>
              We sent a confirmation link to <strong style={{ color: "var(--ink)" }}>{email}</strong>.
              Click the link to activate your account.
            </p>
            <p className="text-xs" style={{ color: "var(--ink-muted)" }}>
              Didn&rsquo;t get it? Check your spam folder, or{" "}
              <button
                onClick={() => setConfirmationSent(false)}
                className="underline"
                style={{ color: "var(--terracotta)" }}
              >
                try again with a different email
              </button>.
            </p>
          </div>

          <p className="text-sm mt-6" style={{ color: "var(--ink-muted)" }}>
            Already confirmed?{" "}
            <Link href="/login" className="font-medium" style={{ color: "var(--terracotta)" }}>Log in</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--cream)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            NicheKit
          </Link>
          <p className="text-sm mt-2" style={{ color: "var(--ink-muted)" }}>Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink-light)" }}>Full name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm transition"
              style={{ background: "var(--warm-white)", border: "1.5px solid var(--border)", color: "var(--ink)" }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink-light)" }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm transition"
              style={{ background: "var(--warm-white)", border: "1.5px solid var(--border)", color: "var(--ink)" }}
              placeholder="you@business.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink-light)" }}>Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-sm transition"
              style={{ background: "var(--warm-white)", border: "1.5px solid var(--border)", color: "var(--ink)" }}
              placeholder="6+ characters"
            />
          </div>

          {error && (
            <p className="text-sm p-3 rounded-lg" style={{ background: "var(--sand)", color: "var(--terracotta)" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
            style={{ background: "var(--terracotta)", color: "white" }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-center mt-6" style={{ color: "var(--ink-muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-medium" style={{ color: "var(--terracotta)" }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
