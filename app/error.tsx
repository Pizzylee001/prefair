"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-[52px]" role="alert">
      <p className="m-0 font-[family-name:var(--font-mono-plex)] text-[11px] uppercase tracking-[0.08em] text-ink-tertiary">
        Read failed
      </p>
      <h1 className="mb-3 mt-4 font-[family-name:var(--font-syne)] text-[clamp(24px,3.4vw,34px)] font-bold leading-[1.04] tracking-[-0.015em]">
        The venues did not answer.
      </h1>
      <p className="m-0 max-w-[52ch] text-[15px] leading-[1.6] text-ink-secondary">
        Both venue APIs could not be read just now. This is usually transient. Try again, or return to the board.
        {error.digest ? ` Reference: ${error.digest}.` : ""}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-[14px]">
        <button
          onClick={reset}
          className="inline-flex min-h-[44px] items-center gap-[9px] rounded-[14px] border-[1.5px] border-ink bg-ink px-6 py-[15px] text-[15px] font-bold text-white transition-colors duration-150 hover:bg-[#23282F] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center gap-[9px] rounded-[14px] border-[1.5px] border-ink bg-transparent px-6 py-[15px] text-[15px] font-bold text-ink transition-colors duration-150 hover:bg-surface focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
        >
          Back to board
        </Link>
      </div>
    </section>
  );
}
