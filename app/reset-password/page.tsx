"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
    } else {
      setStatus("done");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--cream)" }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            NicheKit
          </Link>
          <p className="text-sm mt-2" style={{ color: "var(--ink-muted)" }}>Set your new password</p>
        </div>

        {status === "done" ? (
          <div className="p-6 rounded-2xl text-center" style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}>
            <p className="text-base font-medium mb-2" style={{ color: "var(--ink)" }}>Password updated</p>
            <p className="text-sm mb-4" style={{ color: "var(--ink-light)" }}>
              Your password has been reset. You can now log in.
            </p>
            <Link
              href="/login"
              className="inline-block px-5 py-2.5 rounded-full text-sm font-medium transition hover:opacity-90"
              style={{ background: "var(--terracotta)", color: "white" }}
            >
              Go to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink-light)" }}>New password</label>
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

            {status === "error" && (
              <p className="text-sm p-3 rounded-lg" style={{ background: "var(--sand)", color: "var(--terracotta)" }}>
                Something went wrong. The link may have expired — request a new one.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-full text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
              style={{ background: "var(--terracotta)", color: "white" }}
            >
              {status === "loading" ? "Updating..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
