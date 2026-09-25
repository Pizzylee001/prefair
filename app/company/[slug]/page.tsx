import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COMPANIES, getCompany } from "@/lib/api";
import { formatSpread, formatTokenPrice, formatValuation } from "@/lib/format";
import { getMintSupply, jupiterUrl, solscanUrl } from "@/lib/solana";
import { IsoScene } from "@/components/iso-scene";
import { Planner } from "@/components/planner";
import { ShareGap } from "@/components/share";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return COMPANIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = COMPANIES.find((c) => c.slug === slug);
  if (!company) notFound();
  return {
    title: company.name,
  } satisfies Metadata;
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!COMPANIES.some((c) => c.slug === slug)) notFound();
  const quote = await getCompany(slug);
  if (!quote) notFound();

  const [prestocksSupply, tesseraSupply] = await Promise.all([
    quote.prestocksMint ? getMintSupply(quote.prestocksMint) : Promise.resolve(null),
    quote.tesseraMint ? getMintSupply(quote.tesseraMint) : Promise.resolve(null),
  ]);

  const higherVenue = quote.prestocksEffective > quote.tesseraEffective ? "PreStocks" : "Tessera";
  const higherEntry = formatValuation(Math.max(quote.prestocksEffective, quote.tesseraEffective));
  const lowerEntry = formatValuation(Math.min(quote.prestocksEffective, quote.tesseraEffective));
  const higherPct = Math.round(
    Math.abs(((quote.prestocksEffective - quote.tesseraEffective) / Math.min(quote.prestocksEffective, quote.tesseraEffective)) * 100)
  );

  return (
    <section aria-labelledby="detail-h" className="py-[44px]">
      <p id="detail-h" className="mb-[10px] mt-0 font-[family-name:var(--font-mono-plex)] text-[11px] uppercase tracking-[0.08em] text-ink-tertiary">
        Route 2, company
      </p>
      <h1 className="mb-[10px] mt-0 font-[family-name:var(--font-syne)] text-[clamp(24px,3.4vw,34px)] font-bold leading-[1.04] tracking-[-0.015em]">
        One company, opened up
      </h1>
      <p className="m-0 max-w-[62ch] text-[15px] leading-[1.6] text-ink-secondary">
        Every figure shows the field it came from, so the comparison stays honest. Then the planner turns the gap into a route for your amount.{" "}
        {!quote.live && "A venue did not respond, so some figures carry the last verified values."}
      </p>

      <div className="mt-6 grid max-w-[480px] grid-cols-1 md:max-w-none md:grid-cols-2 md:gap-[30px]">
        <IsoScene
          company={quote.config.name}
          lowValue={formatValuation(quote.tesseraEffective)}
          highValue={formatValuation(quote.prestocksEffective)}
        />
      </div>

      <div className="mt-6 grid grid-cols-[1.1fr_0.9fr] overflow-hidden rounded-[14px] border-[1.5px] border-ink max-[860px]:grid-cols-1">
        <div className="p-[26px] max-[860px]:border-b-[1.5px] max-[860px]:border-ink">
          <div className="mb-[18px] flex items-baseline justify-between gap-3">
            <h2 className="m-0 font-[family-name:var(--font-syne)] text-[26px] font-extrabold tracking-[-0.01em]">
              {quote.config.name}
            </h2>
            <Link href="/" className="font-[family-name:var(--font-mono-plex)] text-[11px] text-ink-tertiary hover:text-ink">
              Back to board
            </Link>
          </div>

          <p className="mb-2 mt-0 font-[family-name:var(--font-mono-plex)] text-[11px] uppercase tracking-[0.08em] text-ink-tertiary">
            Venue disagreement
          </p>
          <NormRow venue="Tessera" field="Mark valuation" value={formatValuation(quote.tesseraMarkValuation)} />
          <NormRow venue="PreStocks" field="Mark valuation" value={formatValuation(quote.prestocksMarkValuation)} />
          <NormRow venue="Computed" field="Mark to mark spread" value={formatSpread(quote.spreadPct)} accent />

          <p className="mb-2 mt-5 font-[family-name:var(--font-mono-plex)] text-[11px] uppercase tracking-[0.08em] text-ink-tertiary">
            Effective entry cost
          </p>
          <NormRow venue="Tessera" field="Mark valuation" value={formatValuation(quote.tesseraMarkValuation)} />
          <NormRow venue="Tessera" field="Mark per T-Token" value={quote.tesseraMarkPrice != null ? formatTokenPrice(quote.tesseraMarkPrice) : null} />
          <NormRow venue="Tessera" field="Effective entry valuation" value={formatValuation(quote.tesseraEffective)} />
          <NormRow venue="PreStocks" field="Mark valuation" value={formatValuation(quote.prestocksMarkValuation)} />
          <NormRow venue="PreStocks" field="Token market price" value={quote.prestocksTokenPrice != null ? formatTokenPrice(quote.prestocksTokenPrice) : null} />
          <NormRow venue="PreStocks" field="Token mark price" value={quote.prestocksMarkPrice != null ? formatTokenPrice(quote.prestocksMarkPrice) : null} />
          <NormRow
            venue="PreStocks"
            field="Market premium over own mark"
            value={quote.prestocksMarketPremiumPct != null ? `${quote.prestocksMarketPremiumPct >= 0 ? "+" : ""}${quote.prestocksMarketPremiumPct.toFixed(1)}%` : null}
          />
          <NormRow venue="PreStocks" field="Effective entry valuation" value={formatValuation(quote.prestocksEffective)} />
          <NormRow venue="Computed" field="Effective total gap" value={formatSpread(quote.effectiveSpreadPct)} accent />

          <p className="mb-0 mt-4 text-[14px] leading-[1.6] text-ink-secondary">
            Buying on {higherVenue} means entering at about {higherEntry} in company value versus about {lowerEntry} on the other venue, a {higherPct} percent higher entry.
          </p>

          <div className="mt-6">
            <p className="mb-2 mt-0 font-[family-name:var(--font-mono-plex)] text-[11px] uppercase tracking-[0.08em] text-ink-tertiary">
              On Solana
            </p>
            <SolanaBlock
              venue="PreStocks"
              mint={quote.prestocksMint}
              supply={prestocksSupply}
            />
            <SolanaBlock
              venue="Tessera"
              mint={quote.tesseraMint}
              supply={tesseraSupply}
            />
          </div>

          <div className="mt-5">
            <ShareGap
              text={`PreFair: ${quote.config.name} is marked ${formatValuation(quote.tesseraEffective)} by Tessera and ${formatValuation(quote.prestocksEffective)} by PreStocks effective, a ${formatSpread(quote.effectiveSpreadPct)} gap. https://prefair.vercel.app/company/${quote.config.slug}`}
            />
          </div>

          <p className="mb-0 mt-3 font-[family-name:var(--font-mono-plex)] text-[10.5px] tracking-[0.02em] text-ink-tertiary">
            READ {quote.readAt.replace("T", " ").slice(0, 19)} UTC {quote.live ? "/ LIVE" : "/ LAST VERIFIED"}
          </p>
        </div>
        <div className="border-l-[1.5px] border-ink max-[860px]:border-l-0">
          <Planner quote={quote} />
        </div>
      </div>
    </section>
  );
}

function NormRow({
  venue,
  field,
  value,
  accent,
}: {
  venue: string;
  field: string;
  value: string | null;
  accent?: boolean;
}) {
  return (
    <div className="grid grid-cols-[120px_1fr_auto] items-baseline gap-[14px] border-b border-line py-3">
      <span className="font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
        {venue}
      </span>
      <span className="text-[13px] text-ink-secondary">{field}</span>
      <span className={`tnum text-right font-[family-name:var(--font-mono-plex)] text-[14px] font-semibold ${accent ? "text-accent-ink" : ""}`}>
        {value ?? "n/a"}
      </span>
    </div>
  );
}

function SolanaBlock({
  venue,
  mint,
  supply,
}: {
  venue: string;
  mint: string | null;
  supply: number | null;
}) {
  if (!mint) {
    return (
      <div className="grid grid-cols-[120px_1fr] items-baseline gap-[14px] border-b border-line py-3">
        <span className="font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
          {venue}
        </span>
        <span className="text-[13px] text-ink-secondary">mint unavailable</span>
      </div>
    );
  }
  return (
    <div className="border-b border-line py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
          {venue}
        </span>
        <span className="font-[family-name:var(--font-mono-plex)] text-[11px] text-ink-secondary">
          {supply != null
            ? `supply: ${Math.round(supply).toLocaleString("en-US")} tokens`
            : "supply unavailable"}
        </span>
      </div>
      <p className="m-0 mt-1 select-all break-all font-[family-name:var(--font-mono-plex)] text-[12px] text-ink">
        {mint}
      </p>
      <p className="m-0 mt-1 flex gap-3 font-[family-name:var(--font-mono-plex)] text-[11px]">
        <a href={jupiterUrl(mint)} target="_blank" rel="noopener noreferrer" className="text-ink-secondary transition-colors hover:text-ink">
          Swap on Jupiter
        </a>
        <a href={solscanUrl(mint)} target="_blank" rel="noopener noreferrer" className="text-ink-secondary transition-colors hover:text-ink">
          View on Solscan
        </a>
      </p>
    </div>
  );
}
