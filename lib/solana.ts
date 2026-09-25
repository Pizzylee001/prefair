const RPC_URL = "https://api.mainnet-beta.solana.com";
const RPC_TIMEOUT_MS = 8_000;

interface TokenSupplyResponse {
  result?: {
    value?: {
      uiAmount?: number | null;
    };
  };
}

export async function getMintSupply(mint: string): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), RPC_TIMEOUT_MS);
    const res = await fetch(RPC_URL, {
      method: "POST",
      signal: controller.signal,
      cache: "no-store",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "getTokenSupply",
        params: [mint],
      }),
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = (await res.json()) as TokenSupplyResponse;
    const amount = data.result?.value?.uiAmount;
    return typeof amount === "number" ? amount : null;
  } catch {
    return null;
  }
}

export function jupiterUrl(mint: string): string {
  return `https://jup.ag/tokens/${mint}`;
}

export function solscanUrl(mint: string): string {
  return `https://solscan.io/token/${mint}`;
}

export function shortMint(mint: string): string {
  if (mint.length <= 8) return mint;
  return `${mint.slice(0, 4)}..${mint.slice(-4)}`;
}
