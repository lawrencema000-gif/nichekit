"use client";

import { useState } from "react";

export default function DownloadButton({ niche }: { niche: string }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const res = await fetch(`/api/download?niche=${niche}`);
      if (!res.ok) {
        alert("Download failed. Please try again.");
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
      alert("Download failed. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="w-full py-2.5 rounded-full text-sm font-medium transition hover:opacity-90 disabled:opacity-60"
      style={{ background: "var(--ink)", color: "var(--warm-white)" }}
    >
      {downloading ? "Downloading..." : "Download ZIP"}
    </button>
  );
}
