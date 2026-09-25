export function formatValuation(value: number): string {
  const t = value / 1_000_000_000_000;
  if (t >= 1) {
    return `$${t.toFixed(2).replace(/0$/, "")}T`;
  }
  const b = value / 1_000_000_000;
  if (b >= 100) return `$${Math.round(b)}B`;
  return `$${b.toFixed(1)}B`;
}

export function formatSpread(pct: number): string {
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${Math.round(pct)}%`;
}

export function formatMoney(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function formatTokenPrice(value: number): string {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
