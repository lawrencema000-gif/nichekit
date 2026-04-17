import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your NicheKit account to access courses, templates, and your dashboard.",
  alternates: { canonical: "/login" },
  robots: { index: true, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
