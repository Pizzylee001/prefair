import Link from "next/link";

export function Nav() {
  return (
    <div className="sticky top-[14px] z-30 px-[22px]">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[58px] max-w-[1116px] items-center justify-between rounded-full border-[1.5px] border-ink bg-white/85 pl-4 pr-[10px] backdrop-blur-[10px]"
      >
        <Link href="/" className="flex items-center gap-[11px] font-[family-name:var(--font-syne)] text-[17px] font-extrabold tracking-[0.02em]">
          <svg width="28" height="26" viewBox="0 0 34 30" role="img" aria-label="PreFair mark: two overlapping circles">
            <circle cx="12" cy="15" r="10" fill="none" stroke="#0B0E13" strokeWidth="3" />
            <circle cx="22" cy="15" r="10" fill="#EAB308" stroke="#0B0E13" strokeWidth="3" />
          </svg>
          PREFAIR
        </Link>
        <span className="flex items-center gap-1.5 font-[family-name:var(--font-mono-plex)] text-[12px]">
          <Link href="/#board" className="hidden rounded-full px-[13px] py-[9px] text-ink-secondary transition-colors duration-150 hover:bg-ground hover:text-ink md:inline-block">
            Board
          </Link>
          <Link href="/company/spacex" className="hidden rounded-full px-[13px] py-[9px] text-ink-secondary transition-colors duration-150 hover:bg-ground hover:text-ink md:inline-block">
            Company
          </Link>
          <Link href="/company/spacex" className="rounded-full bg-ink px-4 py-[10px] font-semibold text-white transition-colors duration-150 hover:bg-[#23282F]">
            Route an amount
          </Link>
        </span>
      </nav>
    </div>
  );
}
