"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CompanyQuote } from "@/lib/api";
import { venueUrl } from "@/lib/api";
import { formatMoney, formatSpread, formatValuation } from "@/lib/format";

const CAVEAT =
  "Not arbitrage. One token is SPV exposure, one is loan participation, with different legal claims and exit terms. Read the gap as a pricing signal, not free money.";

export function Planner({ quote }: { quote: CompanyQuote }) {
  const [amount, setAmount] = useState("1000");
  const [venue, setVenue] = useState<"tessera" | "prestocks">("tessera");

  const parsed = Number(amount.replace(/[^0-9.]/g, ""));
  const amt = Number.isFinite(parsed) && parsed > 0 ? parsed : 1000;

  const plan = useMemo(() => {
    const low = quote.tesseraMarkValuation;
    const high = quote.prestocksMarkValuation;
    const entryValuation = venue === "tessera" ? low : high;
    const otherValuation = venue === "tessera" ? high : low;
    const lowerEntryPct = Math.max(0, ((high - low) / high) * 100);
    const ratioToMatch = low > 0 ? high / low : 1;
    const exitValuation = amt * ratioToMatch;
    return { entryValuation, otherValuation, lowerEntryPct, ratioToMatch, exitValuation };
  }, [quote, venue, amt]);

  const venueName = venue === "tessera" ? "Tessera" : "PreStocks";
  const otherName = venue === "tessera" ? "PreStocks" : "Tessera";

  return (
    <div className="p-[26px]">
      <div className="mb-4 flex flex-col gap-[7px]">
        <label htmlFor="amt" className="text-[12.5px] font-medium text-ink-secondary">
          Amount
        </label>
        <input
          id="amt"
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-[10px] border-[1.5px] border-ink bg-surface p-[11px_12px] font-[family-name:var(--font-mono-plex)] text-[15px] text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        />
      </div>
      <div className="mb-4 flex flex-col gap-[7px]">
        <label htmlFor="venue" className="text-[12.5px] font-medium text-ink-secondary">
          Venue to enter
        </label>
        <select
          id="venue"
          value={venue}
          onChange={(e) => setVenue(e.target.value as "tessera" | "prestocks")}
          className="w-full rounded-[10px] border-[1.5px] border-ink bg-surface p-[11px_12px] font-[family-name:var(--font-mono-plex)] text-[15px] text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        >
          <option value="tessera">Tessera, lower mark</option>
          <option value="prestocks">PreStocks, higher mark</option>
        </select>
      </div>
      <p className="mb-4 mt-1 font-[family-name:var(--font-syne)] text-[19px] font-bold leading-[1.25] tracking-[-0.01em]">
        Entering on <b className="hl">{venueName}</b> buys {quote.config.name} at a {Math.round(plan.lowerEntryPct)} percent lower company value than {otherName} marks it.
      </p>
      <div className="mb-4 grid grid-cols-2 gap-[1.5px] overflow-hidden rounded-[10px] border-[1.5px] border-ink bg-ink">
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            {venueName} entry
          </div>
          <div className="tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold">
            {formatValuation(plan.entryValuation)}
          </div>
        </div>
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            {otherName} entry
          </div>
          <div className="tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold">
            {formatValuation(plan.otherValuation)}
          </div>
        </div>
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            Ratio to match
          </div>
          <div className="tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold">
            {plan.ratioToMatch.toFixed(2)}x
          </div>
        </div>
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            Hypothetical exit ({formatMoney(amt)} in)
          </div>
          <div className="tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold">
            {formatValuation(plan.exitValuation)}
          </div>
        </div>
      </div>
      <Link
        href={venueUrl(quote, venue)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-[9px] rounded-[14px] border-[1.5px] border-ink bg-ink px-6 py-[15px] text-[15px] font-bold text-white transition-colors duration-150 hover:bg-[#23282F] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
      >
        Open on {venueName}
      </Link>
      <p className="mb-0 ml-0 mt-4 border-l-4 border-accent-fill pl-[14px] text-[13px] leading-[1.6] text-ink-secondary">
        {CAVEAT} Spread reads {formatSpread(quote.spreadPct)} on the mark valuation.
      </p>
    </div>
  );
}
