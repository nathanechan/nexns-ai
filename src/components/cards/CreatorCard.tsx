import { BadgeCheck } from "lucide-react";
import { Creator } from "../../data/previewData";
import { MiniLine } from "../charts/MiniLine";
import { GlassCard } from "../ui/GlassCard";

export function CreatorCard({ creator, rank, onClick }: { creator: Creator; rank: number; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="block h-full w-full text-left">
      <GlassCard className={`interactive-glow h-full p-4 ${rank === 1 ? "border-amber-400/60" : ""}`}>
      <div className="flex items-center gap-3">
        <span className="nex-icon h-8 w-8 text-sm font-bold">{rank}</span>
        <img src={creator.avatar} alt="" className="h-14 w-14 rounded-full bg-neon/20 ring-2 ring-neon/70" />
        <div>
          <div className="flex items-center gap-1 font-semibold">{creator.name}<BadgeCheck className="h-4 w-4 fill-neon text-white" /></div>
          <div className="text-sm text-slate-300">Lv.{creator.level} · {creator.followers} Followers</div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div><div className="text-xs text-slate-400">Win Rate</div><div className="nex-metric text-xl">{creator.winRate}</div></div>
        <div><div className="text-xs text-slate-400">ROI (30D)</div><div className="nex-metric text-xl text-mint">{creator.roi}</div></div>
      </div>
      <MiniLine data={creator.data} color={rank === 1 ? "#22c55e" : "#a855f7"} height={64} />
      <span className="rounded-full bg-neon/15 px-3 py-1 text-xs text-purple-200">{creator.style}</span>
      </GlassCard>
    </button>
  );
}
