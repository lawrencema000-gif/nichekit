"use client";

import { useState } from "react";

export default function DownloadButton({ niche }: { niche: string }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setDownloading(true);
    setError("");
    try {
      const res = await fetch(`/api/download?niche=${niche}`);
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Download failed. Please try again.");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `NicheKit-${niche}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("Download failed. Check your connection and try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full py-2.5 rounded-full text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
        style={{ background: "var(--ink)", color: "var(--warm-white)" }}
      >
        {downloading ? "Downloading..." : "Download ZIP"}
      </button>
      {error && (
        <p className="text-xs mt-2 text-center" style={{ color: "var(--terracotta)" }}>{error}</p>
      )}
    </div>
  );
}
