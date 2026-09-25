"use client";

import { useEffect, useRef, useState } from "react";

export function ShareGap({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function share() {
    let done = false;
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ text });
        done = true;
      } catch {
        done = false;
      }
    }
    if (!done && typeof navigator.clipboard?.writeText === "function") {
      try {
        await navigator.clipboard.writeText(text);
        done = true;
      } catch {
        done = false;
      }
    }
    if (!done) {
      window.prompt("Copy this summary", text);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2500);
  }

  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center justify-center rounded-[14px] border-[1.5px] border-ink bg-transparent px-4 py-[9px] text-[13px] font-bold text-ink transition-colors duration-150 hover:bg-surface focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
      >
        Share this gap
      </button>
      <span aria-live="polite" className="font-[family-name:var(--font-mono-plex)] text-[11px] text-accent-ink">
        {copied ? "Copied" : ""}
      </span>
    </span>
  );
}
