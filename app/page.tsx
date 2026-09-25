import Link from "next/link";
import { getBoard } from "@/lib/api";
import { formatSpread, formatValuation } from "@/lib/format";
import { IsoScene } from "@/components/iso-scene";
import { jupiterUrl } from "@/lib/solana";

export const dynamic = "force-dynamic";

export default async function BoardPage() {
  const quotes = await getBoard();
  const spacex = quotes.find((q) => q.config.slug === "spacex") ?? quotes[0];

  return (
    <>
      <section className="grid items-end gap-[30px] pb-7 pt-[52px] max-[900px]:grid-cols-1 max-[900px]:items-start max-[900px]:gap-2">
        <div className="pb-[6px] max-[900px]:pb-0">
          <p className="m-0 font-[family-name:var(--font-mono-plex)] text-[12px] tracking-[0.04em] text-ink-tertiary">
            CROSS-VENUE VALUATION DESK
          </p>
          <h1 className="mb-0 mt-5 font-[family-name:var(--font-syne)] text-[clamp(38px,6vw,70px)] font-extrabold leading-[0.96] tracking-[-0.02em]">
            One company. <span className="hl hl-wipe">Two prices.</span>
          </h1>
          <p className="mb-0 mt-5 max-w-[44ch] text-[16px] leading-[1.6] text-ink-secondary">
            PreFair reads both token venues and lifts every figure to the same basis, the implied value of the whole company. Then it shows you the gap and what it means for an amount you enter.
          </p>
          <div className="mt-[26px] flex flex-wrap items-center gap-[14px]">
            <Link
              href="/#board"
              className="inline-flex items-center gap-[9px] rounded-[14px] border-[1.5px] border-ink bg-ink px-6 py-[15px] text-[15px] font-bold text-white transition-colors duration-150 hover:bg-[#23282F] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
            >
              See the board
            </Link>
            <Link
              href="/#method"
              className="inline-flex items-center gap-[9px] rounded-[14px] border-[1.5px] border-ink bg-transparent px-6 py-[15px] text-[15px] font-bold text-ink transition-colors duration-150 hover:bg-surface focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
            >
              How it reads
            </Link>
          </div>
        </div>
        <div>
          <IsoScene
            company={spacex.config.name}
            lowValue={formatValuation(spacex.tesseraMarkValuation)}
            highValue={formatValuation(spacex.prestocksMarkValuation)}
          />
        </div>
      </section>

      <section aria-labelledby="split-h" className="py-[44px]">
        <p id="split-h" className="mb-[10px] mt-0 font-[family-name:var(--font-mono-plex)] text-[11px] uppercase tracking-[0.08em] text-ink-tertiary">
          Route 1, the board
        </p>
        <h2 className="mb-[10px] mt-0 font-[family-name:var(--font-syne)] text-[clamp(24px,3.4vw,34px)] font-bold leading-[1.04] tracking-[-0.015em]">
          The widest gaps right now
        </h2>
        <p className="m-0 max-w-[62ch] text-[15px] leading-[1.6] text-ink-secondary">
          Ranked by how far apart the two effective entry valuations sit, as a share of the lower one.{" "}
          {!quotes.every((q) => q.live) && "One or more venues did not respond, so some rows carry the last verified figures."}
        </p>
        <div className="mt-7">
          {quotes.map((q) => (
            <Link
              key={q.config.slug}
              href={`/company/${q.config.slug}`}
              className="grid grid-cols-[1fr_auto_auto] items-baseline gap-[22px] border-t-[1.5px] border-ink px-1 py-6 first:border-t-0 transition-colors duration-150 hover:bg-surface max-[640px]:grid-cols-[1fr_auto] max-[640px]:gap-[10px]"
            >
              <span className="font-[family-name:var(--font-syne)] text-[clamp(20px,2.6vw,28px)] font-bold text-ink">
                {q.config.name}
                <small className="mt-1 block font-[family-name:var(--font-mono-plex)] text-[11px] font-normal tracking-[0.02em] text-ink-tertiary">
                  {q.config.prestocksSymbol} / {q.config.tesseraId.toUpperCase()}
                </small>
              </span>
              <span className="hidden min-w-[150px] text-right font-[family-name:var(--font-mono-plex)] text-[13px] text-ink-secondary max-[640px]:hidden">
                Tessera <b className="text-ink">{formatValuation(q.tesseraEffective)}</b> · PreStocks <b className="text-ink">{formatValuation(q.prestocksEffective)}</b>
              </span>
              <span className="text-right font-[family-name:var(--font-mono-plex)] text-[clamp(22px,3vw,34px)] font-semibold text-accent-ink">
                {formatSpread(q.effectiveSpreadPct)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section id="board" aria-labelledby="board-h" className="py-[44px]">
        <p id="board-h" className="mb-[10px] mt-0 font-[family-name:var(--font-mono-plex)] text-[11px] uppercase tracking-[0.08em] text-ink-tertiary">
          Route 1, the board
        </p>
        <h2 className="m-0 font-[family-name:var(--font-syne)] text-[clamp(24px,3.4vw,34px)] font-bold leading-[1.04] tracking-[-0.015em]">
          Every company, both venues
        </h2>
        <div className="mt-6 border-t-[3px] border-ink">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse">
              <thead>
                <tr>
                  <th scope="col" className="border-b-[1.5px] border-ink px-4 py-3 text-left font-[family-name:var(--font-mono-plex)] text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-tertiary">
                    Company
                  </th>
                  <th scope="col" className="border-b-[1.5px] border-ink px-4 py-3 text-right font-[family-name:var(--font-mono-plex)] text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-tertiary">
                    Tessera effective
                  </th>
                  <th scope="col" className="border-b-[1.5px] border-ink px-4 py-3 text-right font-[family-name:var(--font-mono-plex)] text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-tertiary">
                    PreStocks effective
                  </th>
                  <th scope="col" className="border-b-[1.5px] border-ink px-4 py-3 text-right font-[family-name:var(--font-mono-plex)] text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-tertiary">
                    Effective gap
                  </th>
                  <th scope="col" className="border-b-[1.5px] border-ink px-4 py-3 text-right font-[family-name:var(--font-mono-plex)] text-[11px] font-semibold uppercase tracking-[0.05em] text-ink-tertiary">
                    Solana
                  </th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q.config.slug} className="transition-colors duration-150 hover:bg-surface">
                    <td className="border-b border-line px-4 py-4 text-left">
                      <Link href={`/company/${q.config.slug}`} className="text-[15.5px] font-bold text-ink">
                        {q.config.name}
                        <span className="ml-2 font-[family-name:var(--font-mono-plex)] text-[11px] font-normal text-ink-tertiary">
                          {q.config.prestocksSymbol} / {q.config.tesseraId.toUpperCase()}
                        </span>
                      </Link>
                    </td>
                    <td className="tnum border-b border-line px-4 py-4 text-right font-[family-name:var(--font-mono-plex)] text-[14px] text-ink-secondary">
                      {formatValuation(q.tesseraEffective)}
                    </td>
                    <td className="tnum border-b border-line px-4 py-4 text-right font-[family-name:var(--font-mono-plex)] text-[14px] text-ink">
                      {formatValuation(q.prestocksEffective)}
                    </td>
                    <td className="tnum border-b border-line px-4 py-4 text-right font-[family-name:var(--font-mono-plex)] text-[14px] font-semibold text-accent-ink">
                      {formatSpread(q.effectiveSpreadPct)}
                    </td>
                    <td className="border-b border-line px-4 py-4 text-right font-[family-name:var(--font-mono-plex)] text-[11px]">
                      {q.prestocksMint ? (
                        <a
                          href={jupiterUrl(q.prestocksMint)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-tertiary transition-colors hover:text-ink"
                        >
                          {q.prestocksMint.slice(0, 4)}...{q.prestocksMint.slice(-4)}
                        </a>
                      ) : (
                        <span className="text-ink-tertiary">n/a</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="mb-0 mt-4 max-w-[70ch] text-[13.5px] leading-[1.6] text-ink-secondary">
          Effective entry uses PreStocks impliedValuation (the executable market price) and Tessera markValuation. Both are the venue&apos;s own stated company value at the price you can actually transact. The Solana column links the PreStocks mint to Jupiter.
        </p>
      </section>

      <section id="method" aria-labelledby="method-h" className="py-[44px] pt-2">
        <p id="method-h" className="mb-[10px] mt-0 font-[family-name:var(--font-mono-plex)] text-[11px] uppercase tracking-[0.08em] text-ink-tertiary">
          Method and limits
        </p>
        <p className="m-0 max-w-[74ch] text-[15px] leading-[1.6] text-ink-secondary">
          PreFair compares the same field on both venues. PreStocks publishes a market price, a mark price, and a mark valuation. Tessera publishes only its own mark, so each figure is labeled for what it is. The effective entry is the company value at the price you can actually transact: impliedValuation on PreStocks, markValuation on Tessera. Prices move and both venues can re-mark, so every figure carries its read time and the gap is a snapshot. PreFair holds no funds and connects no wallet. It reads public data and points you at the venue to act.
        </p>
      </section>
    </>
  );
}
