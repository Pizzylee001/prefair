export function Footer() {
  return (
    <footer className="mt-5 border-t-[3px] border-ink pb-[46px] pt-[30px]">
      <div className="mb-5 max-w-[22ch] font-[family-name:var(--font-syne)] text-[clamp(22px,3vw,32px)] font-bold leading-[1.1] tracking-[-0.015em]">
        The gap is the product. Not advice.
      </div>
      <p className="max-w-[76ch] text-[12.5px] leading-[1.6] text-ink-tertiary">
        PreFair provides economic data, not investment advice. Tokenized private-company exposure is speculative, may be illiquid, and can lose all value. Nothing here is a recommendation to buy, sell, or hold.
      </p>
      <p className="mt-[18px] font-[family-name:var(--font-mono-plex)] text-[11px] tracking-[0.02em] text-ink-tertiary">
        PREFAIR / LIVE DATA / SOURCES: PRESTOCKS API, TESSERA PUBLIC API
      </p>
    </footer>
  );
}
