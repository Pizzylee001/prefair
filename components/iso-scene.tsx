export function IsoScene({
  lowValue,
  highValue,
}: {
  lowValue: string;
  highValue: string;
}) {
  return (
    <div>
      <svg
        viewBox="0 0 300 360"
        role="img"
        aria-label={`Isometric chart: SpaceX marked at ${lowValue} by Tessera and ${highValue} by PreStocks, the two bars drawn to scale`}
        className="block h-auto w-full"
      >
        <g opacity="0.5">
          <line x1="150.0" y1="160.0" x2="-9.3" y2="252.0" stroke="#C7CBD0" strokeWidth="1" />
          <line x1="150.0" y1="160.0" x2="309.3" y2="252.0" stroke="#C7CBD0" strokeWidth="1" />
          <line x1="189.8" y1="183.0" x2="30.5" y2="275.0" stroke="#C7CBD0" strokeWidth="1" />
          <line x1="110.2" y1="183.0" x2="269.5" y2="275.0" stroke="#C7CBD0" strokeWidth="1" />
          <line x1="229.7" y1="206.0" x2="70.3" y2="298.0" stroke="#C7CBD0" strokeWidth="1" />
          <line x1="70.3" y1="206.0" x2="229.7" y2="298.0" stroke="#C7CBD0" strokeWidth="1" />
          <line x1="269.5" y1="229.0" x2="110.2" y2="321.0" stroke="#C7CBD0" strokeWidth="1" />
          <line x1="30.5" y1="229.0" x2="189.8" y2="321.0" stroke="#C7CBD0" strokeWidth="1" />
          <line x1="309.3" y1="252.0" x2="150.0" y2="344.0" stroke="#C7CBD0" strokeWidth="1" />
          <line x1="-9.3" y1="252.0" x2="150.0" y2="344.0" stroke="#C7CBD0" strokeWidth="1" />
        </g>
        <g className="scene-bar scene-bar-1">
          <polygon points="99.8,135.0 153.5,166.0 99.8,197.0 46.1,166.0" fill="#F5C93B" stroke="#0B0E13" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="153.5,166.0 153.5,240.0 99.8,271.0 99.8,197.0" fill="#B48606" stroke="#0B0E13" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="46.1,166.0 99.8,197.0 99.8,271.0 46.1,240.0" fill="#EAB308" stroke="#0B0E13" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
        <g className="scene-bar scene-bar-2">
          <polygon points="179.4,59.0 233.1,90.0 179.4,121.0 125.8,90.0" fill="#3A424B" stroke="#0B0E13" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="233.1,90.0 233.1,286.0 179.4,317.0 179.4,121.0" fill="#05070A" stroke="#0B0E13" strokeWidth="1.5" strokeLinejoin="round" />
          <polygon points="125.8,90.0 179.4,121.0 179.4,317.0 125.8,286.0" fill="#0B0E13" stroke="#0B0E13" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
        <text x="99.8" y="148" textAnchor="middle" fontFamily="var(--font-mono-plex), monospace" fontSize="13" fontWeight="600" fill="#0B0E13">
          {lowValue}
        </text>
        <text x="99.8" y="163" textAnchor="middle" fontFamily="var(--font-mono-plex), monospace" fontSize="10" fill="#6A7079">
          Tessera
        </text>
        <text x="179.4" y="72" textAnchor="middle" fontFamily="var(--font-mono-plex), monospace" fontSize="13" fontWeight="600" fill="#8A5A00">
          {highValue}
        </text>
        <text x="179.4" y="87" textAnchor="middle" fontFamily="var(--font-mono-plex), monospace" fontSize="10" fill="#6A7079">
          PreStocks
        </text>
      </svg>
      <p className="mt-[2px] text-center font-[family-name:var(--font-mono-plex)] text-[11px] text-ink-tertiary">
        Two marks for one company, drawn to scale
      </p>
    </div>
  );
}
