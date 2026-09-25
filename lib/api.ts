export interface PreStocksToken {
  name: string;
  symbol: string;
  external_url: string;
  contract_address: string;
  markPrice: number;
  markValuation: number;
  tokenPrice: number;
  impliedValuation: number;
  supply: number;
}

export interface TesseraToken {
  id: string;
  name: string;
  symbol: string;
  code: string;
  sector: string;
  mint: string;
  markPrice: number;
  holders: number;
  markValuation: number;
}

export interface CompanyConfig {
  slug: string;
  name: string;
  prestocksSymbol: string;
  tesseraId: string;
  fallback: {
    tesseraMarkValuation: number;
    prestocksMarkValuation: number;
    tesseraMarkPrice?: number;
    prestocksTokenPrice?: number;
    prestocksMarkPrice?: number;
    prestocksMint?: string;
    tesseraMint?: string;
  };
}

export interface CompanyQuote {
  config: CompanyConfig;
  tesseraMarkValuation: number;
  tesseraMarkPrice: number | null;
  prestocksMarkValuation: number;
  prestocksTokenPrice: number | null;
  prestocksMarkPrice: number | null;
  prestocksMint: string | null;
  tesseraMint: string | null;
  prestocksEffective: number;
  tesseraEffective: number;
  prestocksMarketPremiumPct: number | null;
  effectiveSpreadPct: number;
  spreadPct: number;
  live: boolean;
  readAt: string;
}

export const COMPANIES: CompanyConfig[] = [
  {
    slug: "spacex",
    name: "SpaceX",
    prestocksSymbol: "SPACEX",
    tesseraId: "T-SpaceX",
    fallback: {
      tesseraMarkValuation: 800_000_000_000,
      prestocksMarkValuation: 1_960_000_000_000,
    },
  },
  {
    slug: "kalshi",
    name: "Kalshi",
    prestocksSymbol: "KALSHI",
    tesseraId: "T-Kalshi",
    fallback: {
      tesseraMarkValuation: 14_000_000_000,
      prestocksMarkValuation: 32_100_000_000,
    },
  },
  {
    slug: "openai",
    name: "OpenAI",
    prestocksSymbol: "OPENAI",
    tesseraId: "T-OpenAI",
    fallback: {
      tesseraMarkValuation: 950_000_000_000,
      prestocksMarkValuation: 1_270_000_000_000,
      tesseraMarkPrice: 812.79,
      prestocksTokenPrice: 1350.64,
      prestocksMarkPrice: 1023.71,
    },
  },
];

const PRESTOCKS_URL = "https://prestocks.com/api/prestocks";
const TESSERA_URL = "https://rest-api.tessera.pe/v1/public/token-details";
const FETCH_TIMEOUT_MS = 12_000;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    const res = await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      headers: { accept: "application/json" },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function computeSpread(prestocks: number, tessera: number): number {
  if (tessera <= 0) return 0;
  return ((prestocks - tessera) / tessera) * 100;
}

function marketPremium(tokenPrice: number | null | undefined, markPrice: number | null | undefined): number | null {
  if (tokenPrice == null || markPrice == null || markPrice <= 0) return null;
  return (tokenPrice / markPrice - 1) * 100;
}

function buildQuote(
  config: CompanyConfig,
  prestocks: PreStocksToken | undefined,
  tessera: TesseraToken | undefined
): CompanyQuote {
  const live = Boolean(prestocks && tessera);
  const tesseraMarkValuation =
    tessera?.markValuation ?? config.fallback.tesseraMarkValuation;
  const prestocksMarkValuation =
    prestocks?.markValuation ?? config.fallback.prestocksMarkValuation;
  const tesseraMarkPrice = tessera?.markPrice ?? config.fallback.tesseraMarkPrice ?? null;
  const prestocksTokenPrice = prestocks?.tokenPrice ?? config.fallback.prestocksTokenPrice ?? null;
  const prestocksMarkPrice = prestocks?.markPrice ?? config.fallback.prestocksMarkPrice ?? null;
  const tesseraEffective = tesseraMarkValuation;
  const prestocksEffective = prestocks
    ? prestocks.impliedValuation
    : config.fallback.prestocksMarkValuation;
  return {
    config,
    tesseraMarkValuation,
    tesseraMarkPrice,
    prestocksMarkValuation,
    prestocksTokenPrice,
    prestocksMarkPrice,
    prestocksMint: prestocks?.contract_address ?? config.fallback.prestocksMint ?? null,
    tesseraMint: tessera?.mint ?? config.fallback.tesseraMint ?? null,
    prestocksEffective,
    tesseraEffective,
    prestocksMarketPremiumPct: marketPremium(prestocksTokenPrice, prestocksMarkPrice),
    effectiveSpreadPct: computeSpread(prestocksEffective, tesseraEffective),
    spreadPct: computeSpread(prestocksMarkValuation, tesseraMarkValuation),
    live,
    readAt: new Date().toISOString(),
  };
}

export async function getBoard(): Promise<CompanyQuote[]> {
  const [prestocks, tessera] = await Promise.all([
    fetchJson<PreStocksToken[]>(PRESTOCKS_URL),
    fetchJson<TesseraToken[]>(TESSERA_URL),
  ]);
  return COMPANIES.map((config) =>
    buildQuote(
      config,
      prestocks?.find((t) => t.symbol === config.prestocksSymbol),
      tessera?.find((t) => t.id === config.tesseraId)
    )
  ).sort((a, b) => b.spreadPct - a.spreadPct);
}

export async function getCompany(slug: string): Promise<CompanyQuote | null> {
  const config = COMPANIES.find((c) => c.slug === slug);
  if (!config) return null;
  const [prestocks, tessera] = await Promise.all([
    fetchJson<PreStocksToken[]>(PRESTOCKS_URL),
    fetchJson<TesseraToken[]>(TESSERA_URL),
  ]);
  return buildQuote(
    config,
    prestocks?.find((t) => t.symbol === config.prestocksSymbol),
    tessera?.find((t) => t.id === config.tesseraId)
  );
}

export function venueUrl(quote: CompanyQuote, venue: "tessera" | "prestocks"): string {
  if (venue === "prestocks") {
    return `https://www.prestocks.com/${quote.config.prestocksSymbol.toLowerCase()}`;
  }
  return "https://tessera.pe";
}
