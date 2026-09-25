import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-[52px]">
      <svg width="40" height="36" viewBox="0 0 34 30" role="img" aria-label="PreFair mark: two overlapping circles">
        <circle cx="12" cy="15" r="10" fill="none" stroke="#0B0E13" strokeWidth="3" />
        <circle cx="22" cy="15" r="10" fill="#EAB308" stroke="#0B0E13" strokeWidth="3" />
      </svg>
      <h1 className="mb-3 mt-5 font-[family-name:var(--font-syne)] text-[clamp(24px,3.4vw,34px)] font-bold leading-[1.04] tracking-[-0.015em]">
        That company is not on the board.
      </h1>
      <p className="m-0 max-w-[52ch] text-[15px] leading-[1.6] text-ink-secondary">
        PreFair currently reads three companies across both venues. The address you asked for does not match any of them.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex min-h-[44px] items-center gap-[9px] rounded-[14px] border-[1.5px] border-ink bg-ink px-6 py-[15px] text-[15px] font-bold text-white transition-colors duration-150 hover:bg-[#23282F] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
      >
        Back to board
      </Link>
    </section>
  );
}
