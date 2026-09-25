"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CompanyQuote } from "@/lib/api";
import { venueUrl } from "@/lib/api";
import { formatUsd, formatValuation } from "@/lib/format";

const CAVEAT =
  "Not arbitrage. One token is SPV exposure, one is loan participation, with different legal claims and exit terms. Read the gap as a pricing signal, not free money.";

export function Planner({ quote }: { quote: CompanyQuote }) {
  const defaultExitB = Math.round(
    (quote.prestocksEffective + quote.tesseraEffective) / 2 / 1_000_000_000
  );
  const [amount, setAmount] = useState("1000");
  const [exitB, setExitB] = useState(String(defaultExitB));
  const [venue, setVenue] = useState<"tessera" | "prestocks">("tessera");

  const parsed = Number(amount.replace(/[^0-9.]/g, ""));
  const amt = Number.isFinite(parsed) && parsed > 0 ? parsed : 1000;
  const exitParsed = Number(exitB.replace(/[^0-9.]/g, ""));
  const assumedExit =
    (Number.isFinite(exitParsed) && exitParsed > 0 ? exitParsed : defaultExitB) *
    1_000_000_000;

  const plan = useMemo(() => {
    const tesseraMultiple =
      quote.tesseraEffective > 0 ? assumedExit / quote.tesseraEffective : 0;
    const prestocksMultiple =
      quote.prestocksEffective > 0 ? assumedExit / quote.prestocksEffective : 0;
    const tesseraPayoff = amt * tesseraMultiple;
    const prestocksPayoff = amt * prestocksMultiple;
    const lowerEntryPct =
      quote.prestocksEffective > 0
        ? Math.max(
            0,
            ((quote.prestocksEffective - quote.tesseraEffective) /
              quote.prestocksEffective) *
              100
          )
        : 0;
    return {
      tesseraMultiple,
      prestocksMultiple,
      tesseraPayoff,
      prestocksPayoff,
      lowerEntryPct,
    };
  }, [quote, assumedExit, amt]);

  const venueName = venue === "tessera" ? "Tessera" : "PreStocks";
  const entryValuation =
    venue === "tessera" ? quote.tesseraEffective : quote.prestocksEffective;
  const tesseraBetter = plan.tesseraPayoff >= plan.prestocksPayoff;

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
      <div className="mb-1 flex flex-col gap-[7px]">
        <label htmlFor="exit" className="text-[12.5px] font-medium text-ink-secondary">
          Assumed exit company valuation, in $B
        </label>
        <input
          id="exit"
          type="text"
          inputMode="decimal"
          value={exitB}
          onChange={(e) => setExitB(e.target.value)}
          className="w-full rounded-[10px] border-[1.5px] border-ink bg-surface p-[11px_12px] font-[family-name:var(--font-mono-plex)] text-[15px] text-ink focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent-ink"
        />
      </div>
      <p className="mb-4 mt-0 font-[family-name:var(--font-mono-plex)] text-[10.5px] tracking-[0.02em] text-ink-tertiary">
        Your assumption, not a forecast.
      </p>
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
          <option value="tessera">Tessera, lower entry</option>
          <option value="prestocks">PreStocks, higher entry</option>
        </select>
      </div>
      <p className="mb-4 mt-1 font-[family-name:var(--font-syne)] text-[19px] font-bold leading-[1.25] tracking-[-0.01em]">
        Entering on <b className="hl">{venueName}</b> buys {quote.config.name} at an effective entry of {formatValuation(entryValuation)} in company value.
      </p>
      <div className="mb-2 grid grid-cols-2 gap-[1.5px] overflow-hidden rounded-[10px] border-[1.5px] border-ink bg-ink">
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            Tessera entry
          </div>
          <div className="tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold">
            {formatValuation(quote.tesseraEffective)}
          </div>
        </div>
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            PreStocks entry
          </div>
          <div className="tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold">
            {formatValuation(quote.prestocksEffective)}
          </div>
        </div>
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            Tessera multiple
          </div>
          <div className="tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold">
            {plan.tesseraMultiple.toFixed(2)}x
          </div>
        </div>
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            PreStocks multiple
          </div>
          <div className="tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold">
            {plan.prestocksMultiple.toFixed(2)}x
          </div>
        </div>
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            Tessera payoff {!tesseraBetter ? "" : "/ better route"}
          </div>
          <div className={`tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold ${tesseraBetter ? "text-accent-ink" : ""}`}>
            {formatUsd(plan.tesseraPayoff)}
          </div>
        </div>
        <div className="bg-surface p-[12px_13px]">
          <div className="mb-[5px] font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
            PreStocks payoff {tesseraBetter ? "" : "/ better route"}
          </div>
          <div className={`tnum font-[family-name:var(--font-mono-plex)] text-[15px] font-semibold ${!tesseraBetter ? "text-accent-ink" : ""}`}>
            {formatUsd(plan.prestocksPayoff)}
          </div>
        </div>
      </div>
      <p className="mb-4 mt-0 text-[12px] leading-[1.6] text-ink-tertiary">
        This assumes each token tracks the company valuation proportionally, and ignores fees, liquidity, and the legal difference between the tokens.
      </p>
      <Link
        href={venueUrl(quote, venue)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-[9px] rounded-[14px] border-[1.5px] border-ink bg-ink px-6 py-[15px] text-[15px] font-bold text-white transition-colors duration-150 hover:bg-[#23282F] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-accent-ink"
      >
        Open on {venueName}
      </Link>
      <p className="mb-0 ml-0 mt-4 border-l-4 border-accent-fill pl-[14px] text-[13px] leading-[1.6] text-ink-secondary">
        {CAVEAT}
      </p>
    </div>
  );
}
