import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANIES, getCompany } from "@/lib/api";
import { formatSpread, formatTokenPrice, formatValuation } from "@/lib/format";
import { Planner } from "@/components/planner";

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
  return {
    title: company ? `${company.name}, PreFair detail` : "PreFair",
  };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quote = await getCompany(slug);
  if (!quote) notFound();

  const rows: { venue: string; field: string; value: string | null }[] = [
    {
      venue: "Tessera",
      field: "Venue mark valuation",
      value: formatValuation(quote.tesseraMarkValuation),
    },
    {
      venue: "Tessera",
      field: "Mark per T-Token",
      value: quote.tesseraMarkPrice != null ? formatTokenPrice(quote.tesseraMarkPrice) : null,
    },
    {
      venue: "PreStocks",
      field: "Venue mark valuation",
      value: formatValuation(quote.prestocksMarkValuation),
    },
    {
      venue: "PreStocks",
      field: "Token market price",
      value: quote.prestocksTokenPrice != null ? formatTokenPrice(quote.prestocksTokenPrice) : null,
    },
    {
      venue: "PreStocks",
      field: "Token mark price",
      value: quote.prestocksMarkPrice != null ? formatTokenPrice(quote.prestocksMarkPrice) : null,
    },
  ];

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
        {!quote.live && "A venue did not respond, so some figures carry the last verified session values."}
      </p>

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
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[120px_1fr_auto] items-baseline gap-[14px] border-b border-line py-3"
            >
              <span className="font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
                {row.venue}
              </span>
              <span className="text-[13px] text-ink-secondary">{row.field}</span>
              <span className="tnum text-right font-[family-name:var(--font-mono-plex)] text-[14px] font-semibold">
                {row.value ?? "n/a"}
              </span>
            </div>
          ))}
          <div className="grid grid-cols-[120px_1fr_auto] items-baseline gap-[14px] py-3">
            <span className="font-[family-name:var(--font-mono-plex)] text-[10.5px] uppercase tracking-[0.05em] text-ink-tertiary">
              Computed
            </span>
            <span className="text-[13px] text-ink-secondary">Gap, same field both sides</span>
            <span className="tnum text-right font-[family-name:var(--font-mono-plex)] text-[14px] font-semibold text-accent-ink">
              {formatSpread(quote.spreadPct)}
            </span>
          </div>
          <p className="mb-0 mt-3 font-[family-name:var(--font-mono-plex)] text-[10.5px] tracking-[0.02em] text-ink-tertiary">
            READ {quote.readAt.replace("T", " ").slice(0, 19)} UTC {quote.live ? "/ LIVE" : "/ SESSION FALLBACK"}
          </p>
        </div>
        <div className="border-l-[1.5px] border-ink max-[860px]:border-l-0">
          <Planner quote={quote} />
        </div>
      </div>
    </section>
  );
}
