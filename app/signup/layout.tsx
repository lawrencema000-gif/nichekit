import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up free",
  description: "Create your free NicheKit account. Get instant access to Module 1, 3 sample templates, and our weekly tips. No credit card required.",
  alternates: { canonical: "/signup" },
  openGraph: {
    title: "Start free — NicheKit",
    description: "Sign up and get instant access to free course modules and templates. No credit card.",
    url: "/signup",
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
