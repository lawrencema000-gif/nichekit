"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--cream)" }}>
      <div className="max-w-sm text-center">
        <h1 className="text-3xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          Something went wrong
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--ink-muted)" }}>
          {error.message || "An unexpected error occurred. We've been notified."}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 rounded-full text-sm font-medium transition hover:opacity-90"
            style={{ background: "var(--terracotta)", color: "white" }}
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full text-sm font-medium"
            style={{ border: "1.5px solid var(--border)", color: "var(--ink-light)" }}
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
