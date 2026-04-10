"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="text-base font-medium" style={{ color: "var(--sage)" }}>
          You&rsquo;re in! Check your inbox for free templates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        placeholder="you@business.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-4 py-3 rounded-full text-sm outline-none transition"
        style={{
          background: "var(--warm-white)",
          border: "1.5px solid var(--border)",
          color: "var(--ink)",
        }}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-6 py-3 rounded-full text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
        style={{ background: "var(--terracotta)", color: "white" }}
      >
        {status === "loading" ? "Sending..." : "Get free templates"}
      </button>
      {status === "error" && (
        <p className="text-xs text-center sm:text-left" style={{ color: "var(--terracotta)" }}>
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
