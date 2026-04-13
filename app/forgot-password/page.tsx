"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const supabase = createClient();
    const siteUrl = window.location.origin;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/reset-password`,
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--cream)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            NicheKit
          </Link>
          <p className="text-sm mt-2" style={{ color: "var(--ink-muted)" }}>Reset your password</p>
        </div>

        {status === "sent" ? (
          <div className="p-6 rounded-2xl text-center" style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}>
            <p className="text-base font-medium mb-2" style={{ color: "var(--ink)" }}>Check your email</p>
            <p className="text-sm mb-4" style={{ color: "var(--ink-light)" }}>
              We sent a password reset link to <strong>{email}</strong>. Click the link in the email to set a new password.
            </p>
            <Link href="/login" className="text-sm font-medium" style={{ color: "var(--terracotta)" }}>
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {status === "error" && (
              <p className="text-sm p-3 rounded-lg" style={{ background: "var(--sand)", color: "var(--terracotta)" }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-full text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
              style={{ background: "var(--terracotta)", color: "white" }}
            >
              {status === "loading" ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <p className="text-sm text-center mt-6" style={{ color: "var(--ink-muted)" }}>
          Remember your password?{" "}
          <Link href="/login" className="font-medium" style={{ color: "var(--terracotta)" }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
