import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import DashboardShell from "@/components/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Self-healing: create profile if missing
  if (!profile || profileError) {
    await supabase.from("user_profiles").upsert({
      id: user.id,
      email: user.email || "",
      full_name: user.user_metadata?.full_name || "",
      plan: "free",
    }, { onConflict: "id" });

    redirect("/dashboard/onboarding");
  }

  // Redirect to onboarding if not completed (skip if already on onboarding page)
  const headerList = await headers();
  const pathname = headerList.get("x-next-url") || headerList.get("x-invoke-path") || "";
  const isOnboardingPage = pathname.includes("/onboarding");

  if (!profile.onboarded && !isOnboardingPage) {
    redirect("/dashboard/onboarding");
  }

  // Skip shell on onboarding page for a clean fullscreen experience
  if (isOnboardingPage) {
    return <>{children}</>;
  }

  return (
    <DashboardShell
      user={{ id: user.id, email: user.email || "" }}
      plan={profile.plan || "free"}
    >
      {children}
    </DashboardShell>
  );
}
