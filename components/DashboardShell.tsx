"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Home", icon: "◻", ariaLabel: "Dashboard home" },
  { href: "/dashboard/courses", label: "Courses", icon: "◈", ariaLabel: "Browse courses" },
  { href: "/dashboard/templates", label: "Templates", icon: "◇", ariaLabel: "Download templates" },
  { href: "/dashboard/consultation", label: "Consultation", icon: "◎", ariaLabel: "Book consultation" },
  { href: "/dashboard/billing", label: "Billing", icon: "◆", ariaLabel: "Manage billing" },
];

function NavItems({ pathname, plan, onClick }: { pathname: string; plan: string; onClick?: () => void }) {
  return (
    <>
      {NAV_ITEMS.map((item) => {
        const isActive = item.href === "/dashboard"
          ? pathname === "/dashboard"
          : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            aria-label={item.ariaLabel}
            aria-current={isActive ? "page" : undefined}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition"
            style={{
              background: isActive ? "var(--warm-white)" : "transparent",
              color: isActive ? "var(--ink)" : "var(--ink-muted)",
              fontWeight: isActive ? 500 : 400,
              border: isActive ? "1px solid var(--border)" : "1px solid transparent",
            }}
          >
            <span className="text-xs" aria-hidden="true">{item.icon}</span>
            {item.label}
            {item.label === "Consultation" && plan !== "pro" && (
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded" style={{ background: "var(--sand)", color: "var(--ink-muted)" }}>Pro</span>
            )}
          </Link>
        );
      })}
    </>
  );
}

export default function DashboardShell({
  children,
  user,
  plan,
}: {
  children: React.ReactNode;
  user: { id: string; email: string };
  plan: string;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Top nav */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background: "rgba(245,240,235,0.9)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1 p-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className="block w-5 h-0.5 transition-transform"
                style={{
                  background: "var(--ink)",
                  transform: mobileMenuOpen ? "rotate(45deg) translate(2px, 3px)" : "none",
                }}
              />
              <span
                className="block w-5 h-0.5 transition-opacity"
                style={{
                  background: "var(--ink)",
                  opacity: mobileMenuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-0.5 transition-transform"
                style={{
                  background: "var(--ink)",
                  transform: mobileMenuOpen ? "rotate(-45deg) translate(2px, -3px)" : "none",
                }}
              />
            </button>

            <Link href="/dashboard" className="text-lg" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
              NicheKit
            </Link>
            <span
              className="text-xs font-medium px-2.5 py-0.5 rounded-full"
              style={{
                background: plan === "free" ? "var(--sand)" : plan === "pro" ? "var(--terracotta)" : "var(--sage-light)",
                color: plan === "free" ? "var(--ink-muted)" : plan === "pro" ? "white" : "var(--sage)",
              }}
            >
              {planLabel}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs hidden sm:block" style={{ color: "var(--ink-muted)" }}>{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded-full transition hover:opacity-80"
              style={{ border: "1px solid var(--border)", color: "var(--ink-light)" }}
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-6 py-4 space-y-1"
          style={{ background: "var(--warm-white)", borderBottom: "1px solid var(--border)" }}
        >
          <NavItems pathname={pathname} plan={plan} onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-6 flex gap-8">
        {/* Desktop sidebar */}
        <nav className="hidden md:block w-48 shrink-0" aria-label="Dashboard navigation">
          <div className="sticky top-20 space-y-1">
            <NavItems pathname={pathname} plan={plan} />
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
