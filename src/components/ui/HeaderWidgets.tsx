import { Bell, Coins, Gem } from "lucide-react";
import { useState } from "react";
import { user } from "../../data/previewData";
import { useProductState } from "../../state/productState";
import { ActivityFeed } from "./ActivityFeed";
import { GlassCard } from "./GlassCard";

export function HeaderWidgets() {
  const [open, setOpen] = useState(false);
  const { activities, nsBalance, predictions, pet } = useProductState();
  const pending = predictions.filter((prediction) => prediction.status === "pending").length;

  return (
    <div className="relative flex flex-wrap items-center justify-end gap-2 sm:gap-3">
      <GlassCard className="flex items-center gap-3 px-3 py-2 text-xs sm:gap-4 sm:px-4 sm:py-3 sm:text-sm">
        <span className="flex items-center gap-2"><Gem className="h-4 w-4 text-neon" /> NS {nsBalance.toLocaleString()}</span>
        <span className="hidden h-5 w-px bg-white/10 sm:block" />
        <span className="hidden items-center gap-2 sm:flex"><Coins className="h-4 w-4 text-amber-300" /> NEX {user.nex}</span>
      </GlassCard>
      <button onClick={() => setOpen((value) => !value)} className="interactive-glow relative rounded-xl border border-neon/20 bg-white/5 p-2.5 sm:p-3">
        <Bell className="h-5 w-5 text-slate-300" />
        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-neon text-xs">{Math.min(9, activities.length + pending)}</span>
      </button>
      <GlassCard className="flex items-center gap-2 px-2 py-2 sm:gap-3 sm:px-3">
        <img src={user.avatar} alt="" className="h-9 w-9 rounded-full bg-neon/20 ring-2 ring-neon/40 sm:h-11 sm:w-11" />
        <div className="hidden min-w-24 sm:block">
          <div className="flex items-center gap-2 font-semibold">{user.name}<span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-xs text-amber-300">VIP {user.vip}</span></div>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-300">Pet {pet.mood}<span className="h-1.5 w-16 rounded-full bg-white/10"><span className="block h-full rounded-full bg-neon" style={{ width: `${pet.exp}%` }} /></span></div>
        </div>
      </GlassCard>
      {open && <div className="absolute right-0 top-full z-50 mt-3 w-[min(380px,calc(100vw-2rem))]"><ActivityFeed /></div>}
    </div>
  );
}
