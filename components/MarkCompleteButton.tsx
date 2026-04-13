"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-browser";

export default function MarkCompleteButton({
  courseSlug,
  moduleSlug,
  initialCompleted,
}: {
  courseSlug: string;
  moduleSlug: string;
  initialCompleted: boolean;
}) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleToggle = async () => {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("Not signed in");
      setLoading(false);
      return;
    }

    const newState = !completed;

    const { error: upsertError } = await supabase.from("course_progress").upsert(
      {
        user_id: user.id,
        course_slug: courseSlug,
        module_slug: moduleSlug,
        completed: newState,
        completed_at: newState ? new Date().toISOString() : null,
      },
      { onConflict: "user_id,course_slug,module_slug" }
    );

    if (upsertError) {
      setError("Failed to save. Try again.");
      setLoading(false);
      return;
    }

    setCompleted(newState);
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        disabled={loading}
        className="text-sm px-5 py-2.5 rounded-full font-medium transition hover:opacity-90 disabled:opacity-60"
        style={
          completed
            ? { background: "var(--sage)", color: "white" }
            : { background: "var(--cream)", color: "var(--ink)", border: "1.5px solid var(--border)" }
        }
      >
        {loading ? "Saving..." : completed ? "Completed ✓" : "Mark as complete"}
      </button>
      {error && (
        <p className="text-xs mt-2" style={{ color: "var(--terracotta)" }}>{error}</p>
      )}
    </div>
  );
}
