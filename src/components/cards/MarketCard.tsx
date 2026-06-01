import { Users, Wallet } from "lucide-react";
import { Market } from "../../data/previewData";
import { MiniLine } from "../charts/MiniLine";
import { GlassCard } from "../ui/GlassCard";

export function MarketCard({ market, onClick }: { market: Market; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="block h-full w-full text-left">
      <GlassCard className="interactive-glow h-full p-4">
      <div className="flex items-center gap-3">
        <span className="nex-icon h-10 w-10 text-lg font-black" style={{ color: market.color }}>{market.symbol[0]}</span>
        <div className="font-semibold">{market.pair}</div>
      </div>
      <div className="nex-metric mt-4 text-2xl">${market.price}</div>
      <div className="text-mint">{market.change}</div>
      <MiniLine data={market.data} color={market.color} />
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-mint">UP {market.up}%</span>
        <span className="text-danger">DOWN {market.down}%</span>
      </div>
      <div className="mt-4 flex justify-between border-t border-white/10 pt-3 text-sm text-slate-300">
        <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {market.users}</span>
        <span className="flex items-center gap-1"><Wallet className="h-4 w-4" /> {market.pool}</span>
      </div>
      </GlassCard>
    </button>
  );
}
