export interface PreStocksToken {
  name: string;
  symbol: string;
  external_url: string;
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
  };
}

export interface CompanyQuote {
  config: CompanyConfig;
  tesseraMarkValuation: number;
  tesseraMarkPrice: number | null;
  prestocksMarkValuation: number;
  prestocksTokenPrice: number | null;
  prestocksMarkPrice: number | null;
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
  return {
    config,
    tesseraMarkValuation,
    tesseraMarkPrice: tessera?.markPrice ?? config.fallback.tesseraMarkPrice ?? null,
    prestocksMarkValuation,
    prestocksTokenPrice: prestocks?.tokenPrice ?? config.fallback.prestocksTokenPrice ?? null,
    prestocksMarkPrice: prestocks?.markPrice ?? config.fallback.prestocksMarkPrice ?? null,
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
