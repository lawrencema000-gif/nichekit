import { redirect } from "next/navigation";
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

  // If profile is missing, create one on the fly (self-healing)
  if (!profile || profileError) {
    await supabase.from("user_profiles").upsert({
      id: user.id,
      email: user.email || "",
      full_name: user.user_metadata?.full_name || "",
      plan: "free",
    }, { onConflict: "id" });

    // Reload to get the fresh profile
    const { data: freshProfile } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    return (
      <DashboardShell
        user={{ id: user.id, email: user.email || "" }}
        plan={freshProfile?.plan || "free"}
      >
        {children}
      </DashboardShell>
    );
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
