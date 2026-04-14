"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Complete beginner", desc: "Never sold anything online before", icon: "🌱", recommended: "zero-to-first-sale" },
  { value: "some", label: "Some experience", desc: "Tried a few things but nothing stuck yet", icon: "🌿", recommended: "build-ecommerce-with-ai" },
  { value: "experienced", label: "Running a store", desc: "Already selling but want to grow faster", icon: "🌳", recommended: "ai-seo-masterclass" },
];

const GOALS = [
  { value: "first-sale", label: "Make my first sale" },
  { value: "build-store", label: "Build a proper store" },
  { value: "grow-traffic", label: "Get more traffic & sales" },
  { value: "automate", label: "Automate my marketing" },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [experience, setExperience] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("user_profiles").update({
      onboarded: true,
      updated_at: new Date().toISOString(),
    }).eq("id", user.id);

    // Redirect to recommended course
    const rec = EXPERIENCE_LEVELS.find(e => e.value === experience);
    window.location.href = `/dashboard/courses/${rec?.recommended || "zero-to-first-sale"}`;
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-2xl mb-2" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
          Let&rsquo;s get you started
        </h1>
        <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
          Quick 2 questions so we can point you in the right direction.
        </p>
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-16 h-1 rounded-full" style={{ background: "var(--terracotta)" }} />
          <div className="w-16 h-1 rounded-full" style={{ background: step >= 2 ? "var(--terracotta)" : "var(--sand)" }} />
        </div>
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-base font-medium mb-4" style={{ color: "var(--ink)" }}>
            Where are you at with e-commerce?
          </h2>
          <div className="space-y-3">
            {EXPERIENCE_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => { setExperience(level.value); setStep(2); }}
                className="w-full text-left p-5 rounded-xl transition hover:opacity-90"
                style={{
                  background: experience === level.value ? "var(--cream)" : "var(--warm-white)",
                  border: experience === level.value ? "1.5px solid var(--terracotta)" : "1px solid var(--border)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{level.icon}</span>
                  <div>
                    <span className="text-sm font-medium block" style={{ color: "var(--ink)" }}>{level.label}</span>
                    <span className="text-xs" style={{ color: "var(--ink-muted)" }}>{level.desc}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-base font-medium mb-4" style={{ color: "var(--ink)" }}>
            What&rsquo;s your main goal right now?
          </h2>
          <div className="space-y-3 mb-8">
            {GOALS.map((g) => (
              <button
                key={g.value}
                onClick={() => setGoal(g.value)}
                className="w-full text-left p-4 rounded-xl transition"
                style={{
                  background: goal === g.value ? "var(--cream)" : "var(--warm-white)",
                  border: goal === g.value ? "1.5px solid var(--terracotta)" : "1px solid var(--border)",
                }}
              >
                <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{g.label}</span>
              </button>
            ))}
          </div>

          {goal && (
            <div className="p-5 rounded-xl mb-6" style={{ background: "var(--cream)", border: "1px solid var(--border)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "var(--terracotta)" }}>We recommend starting with:</p>
              <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                {EXPERIENCE_LEVELS.find(e => e.value === experience)?.value === "beginner"
                  ? "From Zero to First Sale in 7 Days"
                  : experience === "some"
                  ? "Build Your Own E-Commerce Store with AI"
                  : "Rank on Google Without Paying Agencies"
                }
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--ink-muted)" }}>
                Based on your experience level and goal. You can always switch courses later.
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-3 rounded-full text-sm font-medium"
              style={{ border: "1px solid var(--border)", color: "var(--ink-light)" }}
            >
              Back
            </button>
            <button
              onClick={handleComplete}
              disabled={!goal || loading}
              className="flex-1 py-3 rounded-full text-sm font-medium transition hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--terracotta)", color: "white" }}
            >
              {loading ? "Setting up..." : "Let's go →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
