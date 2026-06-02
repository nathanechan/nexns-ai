import { Activity, Coins, Heart, Radio, Rocket, Users } from "lucide-react";
import type { ActivityEvent } from "../../state/productState";
import { useProductState } from "../../state/productState";
import { GlassCard } from "./GlassCard";

const icons = {
  prediction: Radio,
  creator: Users,
  project: Rocket,
  pet: Heart,
  reward: Coins,
  system: Activity,
};

function timeLabel(createdAt: string) {
  const seconds = Math.max(1, Math.round((Date.now() - new Date(createdAt).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.round(minutes / 60)}h ago`;
}

function ActivityRow({ event }: { event: ActivityEvent }) {
  const Icon = icons[event.type];
  return (
    <div className="flex gap-3 border-t border-white/10 py-3 first:border-t-0 first:pt-0">
      <span className="nex-icon h-9 w-9 shrink-0"><Icon className="h-5 w-5" /></span>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <b className="text-sm text-white">{event.title}</b>
          <span className="shrink-0 text-xs text-slate-500">{timeLabel(event.createdAt)}</span>
        </div>
        <p className="mt-1 text-xs leading-5 text-slate-300">{event.detail}</p>
      </div>
    </div>
  );
}

export function ActivityFeed({ compact = false }: { compact?: boolean }) {
  const { activities } = useProductState();
  const visible = compact ? activities.slice(0, 4) : activities.slice(0, 10);

  return (
    <GlassCard className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="nex-title font-semibold">Live Activity</h2>
        <span className="rounded-full bg-mint/10 px-2 py-1 text-xs text-mint">Live Network</span>
      </div>
      {visible.map((event) => <ActivityRow key={event.id} event={event} />)}
    </GlassCard>
  );
}
