import { Project } from "../../data/previewData";
import { MiniLine } from "../charts/MiniLine";
import { GlassCard } from "../ui/GlassCard";

export function ProjectCard({ project, onClick }: { project: Project; onClick?: () => void }) {
  const Icon = project.icon;
  return (
    <button type="button" onClick={onClick} className="block h-full w-full text-left">
      <GlassCard className="interactive-glow h-full p-4">
      <div className="flex items-center gap-3">
        <span className="nex-icon h-12 w-12"><Icon className="h-6 w-6" /></span>
        <div className="min-w-0">
          <div className="truncate font-semibold">{project.name} <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-300">{project.category}</span></div>
          <div className="text-mint">{project.growth}</div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_1.2fr] items-end gap-3">
        <div><div className="text-xs text-slate-400">Market Cap</div><div className="font-semibold">{project.cap}</div></div>
        <MiniLine data={project.data} color="#20f29b" height={54} />
      </div>
      </GlassCard>
    </button>
  );
}
