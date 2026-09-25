export default function Loading() {
  return (
    <section className="py-[52px]" aria-busy="true" aria-live="polite">
      <p className="m-0 font-[family-name:var(--font-mono-plex)] text-[11px] uppercase tracking-[0.08em] text-ink-tertiary">
        Reading venues
      </p>
      <div className="mt-6 space-y-4">
        <div className="h-[34px] w-2/3 rounded-[10px] bg-line/60" />
        <div className="h-[18px] w-full rounded-[10px] bg-line/60" />
        <div className="h-[18px] w-5/6 rounded-[10px] bg-line/60" />
        <div className="mt-8 h-[64px] w-full rounded-[10px] bg-line/40" />
        <div className="h-[64px] w-full rounded-[10px] bg-line/40" />
        <div className="h-[64px] w-full rounded-[10px] bg-line/40" />
      </div>
    </section>
  );
}
