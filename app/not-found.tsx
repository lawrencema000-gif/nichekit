import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--cream)" }}>
      <div className="max-w-sm text-center">
        <span className="block text-6xl font-medium mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--sand-dark)" }}>
          404
        </span>
        <h1 className="text-2xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          Page not found
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--ink-muted)" }}>
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-full text-sm font-medium transition hover:opacity-90"
            style={{ background: "var(--terracotta)", color: "white" }}
          >
            Go home
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-full text-sm font-medium"
            style={{ border: "1.5px solid var(--border)", color: "var(--ink-light)" }}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
