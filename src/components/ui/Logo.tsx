export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="leading-none">
      <div className="text-3xl font-black tracking-[0.08em]">
        NE<span className="text-gradient">X</span>NS
      </div>
      {!compact && <div className="mt-1 text-xs font-semibold leading-4 text-slate-300">The PredictionFi<br />Growth Network</div>}
    </div>
  );
}
