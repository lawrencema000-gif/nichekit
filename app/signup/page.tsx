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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("user_profiles").insert({
        id: data.user.id,
        email,
        full_name: fullName,
        plan: "free",
      });

      if (profileError) {
        // Profile failed but auth succeeded — retry once
        const { error: retryError } = await supabase.from("user_profiles").insert({
          id: data.user.id,
          email,
          full_name: fullName,
          plan: "free",
        });
        if (retryError) {
          setError("Account created but profile setup failed. Please log in and try again, or contact support.");
          setLoading(false);
          return;
        }
      }
    }

    window.location.href = "/dashboard";
  };

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
