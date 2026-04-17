import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — AI E-Commerce Guides for Australians",
  description: "Practical guides on building and scaling online stores in Australia. AI tools, Shopify alternatives, payment processing, and customer acquisition tactics that actually work.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "NicheKit Blog — AI E-Commerce Guides for Australians",
    description: "Unconventional guides on building online stores with AI. No fluff, just what works for Aussie businesses.",
    url: "/blog",
  },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen" style={{ background: "var(--warm-white)" }}>
      {/* Nav */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(253,251,247,0.85)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-lg tracking-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            NicheKit
          </Link>
          <div className="hidden sm:flex items-center gap-8 text-sm" style={{ color: "var(--ink-light)" }}>
            <Link href="/#courses" className="hover:text-[var(--ink)] transition">Courses</Link>
            <Link href="/blog" className="hover:text-[var(--ink)] transition" style={{ color: "var(--ink)" }}>Blog</Link>
            <Link href="/pricing" className="hover:text-[var(--ink)] transition">Pricing</Link>
            <Link href="/login" className="hover:text-[var(--ink)] transition">Log in</Link>
          </div>
          <Link
            href="/signup"
            className="text-sm font-medium px-5 py-2 rounded-full transition hover:opacity-90"
            style={{ background: "var(--ink)", color: "var(--warm-white)" }}
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="px-6 py-16" style={{ background: "var(--cream)" }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: "var(--terracotta)" }}>
            The Blog
          </p>
          <h1 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Practical guides for Australian e-commerce.
          </h1>
          <p className="text-lg max-w-2xl" style={{ color: "var(--ink-light)" }}>
            AI tools, Shopify alternatives, payment processing, marketing tactics — everything we wish we knew when starting out.
          </p>
        </div>
      </header>

      {/* Posts */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <p style={{ color: "var(--ink-muted)" }}>No posts yet. Check back soon.</p>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block hover-lift rounded-2xl p-8"
                  style={{ background: "var(--warm-white)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                      style={{ background: "var(--sage-light)", color: "var(--sage)" }}
                    >
                      {post.tag}
                    </span>
                    <span className="text-xs" style={{ color: "var(--ink-muted)" }}>
                      {formatDate(post.date)} &middot; {post.readTime} read
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                    {post.title}
                  </h2>
                  <p className="text-base leading-relaxed mb-4" style={{ color: "var(--ink-light)" }}>
                    {post.description}
                  </p>
                  <span className="text-sm font-medium" style={{ color: "var(--terracotta)" }}>
                    Read the article &rarr;
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="noise-bg py-16 px-6 text-center" style={{ background: "var(--ink)" }}>
        <h2 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: "var(--font-display)", color: "var(--warm-white)" }}>
          Tired of reading? Start building.
        </h2>
        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--sand)" }}>
          Get instant access to 5 AI e-commerce courses. Free tier, no credit card.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center px-8 py-3 rounded-full text-sm font-medium transition hover:opacity-90"
          style={{ background: "var(--terracotta)", color: "white" }}
        >
          Start free &rarr;
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6" style={{ background: "var(--warm-white)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" style={{ color: "var(--ink-muted)" }}>
          <span style={{ fontFamily: "var(--font-display)", color: "var(--ink-light)" }}>NicheKit</span>
          <div className="flex items-center gap-6">
            <Link href="/pricing" className="hover:text-[var(--ink)] transition">Pricing</Link>
            <Link href="/blog" className="hover:text-[var(--ink)] transition">Blog</Link>
            <Link href="/terms" className="hover:text-[var(--ink)] transition">Terms</Link>
            <Link href="/privacy" className="hover:text-[var(--ink)] transition">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
