import { ArrowLeft, ArrowRight, BarChart3, Coins, LucideIcon, Rocket, Sparkles, Star, Users, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { MiniLine } from "../charts/MiniLine";
import { GlassCard } from "../ui/GlassCard";
import { Mascot } from "../ui/Mascot";
import { roiData } from "../../data/previewData";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

export const investorMetrics = [
  { label: "Users", value: "82,360", delta: "+42.7%", icon: Users },
  { label: "Predictions", value: "12.45M", delta: "+38.6%", icon: BarChart3 },
  { label: "Creators", value: "15,287", delta: "+35.3%", icon: Star },
  { label: "Projects", value: "468", delta: "+28.9%", icon: Rocket },
  { label: "Ecosystem TVL", value: "$24.8M", delta: "+45.3%", icon: Coins },
];

export const investorPages = [
  { title: "Why NEXNS", path: "/investor/why-nexns", copy: "Understand the market, users, problem, growth model, and differentiation.", icon: Sparkles },
  { title: "Growth Journey", path: "/investor/growth-journey", copy: "From joining NEXNS to leadership and ecosystem influence.", icon: Rocket },
  { title: "Growth Flywheel", path: "/investor/flywheel", copy: "The compounding loop that turns predictions into ecosystem growth.", icon: Zap },
  { title: "Value Flow", path: "/investor/value-flow", copy: "How users, creators, projects, NEX, and the ecosystem exchange value.", icon: Coins },
  { title: "Ecosystem Map", path: "/investor/ecosystem", copy: "The full PredictionFi, creator, pet, community, and technology map.", icon: Users },
  { title: "Investor One Pager", path: "/investor/one-page", copy: "A complete investor summary of the NEXNS growth thesis.", icon: BarChart3 },
];

export function InvestorShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="min-h-screen bg-space-radial px-4 py-5 text-white sm:px-6">
      <header className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4">
        <div className="inline-flex flex-col">
          <img src={nexLogoWhite} alt="NEXNS" className="h-12 w-auto object-contain" draggable={false} />
        </div>
        <nav className="flex flex-wrap gap-3 text-sm">
          <Link className="interactive-glow rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-200" to="/app">App</Link>
          <Link className="interactive-glow rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-200" to="/investor">Investor Center</Link>
          <Link className="interactive-glow rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-200" to="/presentation">Presentation</Link>
          <Link className="purple-button interactive-glow rounded-xl px-4 py-2 font-semibold" to="/investor/one-page">One Pager</Link>
        </nav>
      </header>
      <main className="mx-auto mt-8 max-w-[1500px]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="nex-title text-4xl md:text-6xl">{title}</h1>
            {subtitle && <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-300">{subtitle}</p>}
          </div>
          <Link to="/investor" className="interactive-glow flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
            <ArrowLeft className="h-5 w-5" /> Investor Center
          </Link>
        </div>
        {children}
      </main>
    </div>
  );
}

export function InvestorMetricStrip() {
  return (
    <GlassCard className="grid gap-3 p-4 md:grid-cols-5">
      {investorMetrics.map((metric) => (
        <div key={metric.label} className="flex items-center gap-4 border-white/10 px-2 md:border-r last:md:border-r-0">
          <span className="nex-icon h-12 w-12"><metric.icon className="h-6 w-6" /></span>
          <div>
            <div className="nex-label text-slate-400">{metric.label}</div>
            <div className="nex-metric text-2xl">{metric.value}</div>
            <div className="text-xs text-mint">{metric.delta}</div>
          </div>
        </div>
      ))}
    </GlassCard>
  );
}

export function InvestorNavCard({ page }: { page: (typeof investorPages)[number] }) {
  const Icon = page.icon;
  return (
    <Link to={page.path} className="block h-full">
      <GlassCard className="interactive-glow h-full p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="nex-icon h-12 w-12"><Icon className="h-6 w-6" /></span>
          <ArrowRight className="h-5 w-5 text-purple-300" />
        </div>
        <h2 className="nex-title mt-5 text-2xl">{page.title}</h2>
        <p className="mt-3 leading-7 text-slate-300">{page.copy}</p>
      </GlassCard>
    </Link>
  );
}

export function NeonNode({ title, copy, icon: Icon, index }: { title: string; copy: string; icon: LucideIcon | string; index?: number }) {
  const IconComponent = typeof Icon === "string" ? Sparkles : Icon;

  return (
    <GlassCard className="interactive-glow p-5">
      <div className="flex items-center gap-4">
        <span className="nex-icon h-12 w-12">{index ? <b>{index}</b> : <IconComponent className="h-6 w-6" />}</span>
        <div>
          <h3 className="nex-title text-lg">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-300">{copy}</p>
        </div>
      </div>
    </GlassCard>
  );
}

export function MascotCenter({ label = "NEXNS" }: { label?: string }) {
  return (
    <div className="relative mx-auto grid min-h-[420px] place-items-center">
      <div className="absolute h-[360px] w-[360px] rounded-full bg-neon/20 blur-3xl" />
      <div className="absolute bottom-16 h-24 w-[420px] rounded-[50%] border border-neon/50 nex-platform" />
      <Mascot variant="investor" className="relative z-10 w-[min(430px,80vw)]" />
      <div className="absolute bottom-10 z-20 rounded-xl border border-neon/50 bg-slate-950/80 px-6 py-2 text-xl font-black shadow-glow">{label}</div>
    </div>
  );
}

export function MiniMetricCard({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon | string }) {
  const IconComponent = typeof Icon === "string" ? Sparkles : Icon;

  return (
    <GlassCard className="interactive-glow p-5">
      <span className="nex-icon mb-3 h-12 w-12"><IconComponent className="h-7 w-7" /></span>
      <div className="text-sm text-slate-400">{label}</div>
      <div className="nex-metric mt-1 text-3xl">{value}</div>
      <MiniLine data={roiData} color="#8b5cf6" height={54} />
    </GlassCard>
  );
}

export type ProofNode = {
  title: string;
  copy: string;
  metric: string;
  assumption: string;
  relationship: string;
  icon: LucideIcon;
};

export function ExpandableProofNode({ node, active, onClick, index }: { node: ProofNode; active: boolean; onClick: () => void; index?: number }) {
  const Icon = node.icon;

  return (
    <button type="button" onClick={onClick} className="h-full text-left">
      <GlassCard className={`interactive-glow h-full p-5 transition ${active ? "border-neon/70 bg-neon/15 shadow-glow" : ""}`}>
        <div className="flex items-start gap-4">
          <span className="nex-icon h-12 w-12 shrink-0">{index ? <b>{index}</b> : <Icon className="h-6 w-6" />}</span>
          <div>
            <h3 className="nex-title text-lg">{node.title}</h3>
            <p className="mt-1 text-sm leading-6 text-slate-300">{node.copy}</p>
          </div>
        </div>
        {active && (
          <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 text-sm">
            <div className="rounded-xl bg-white/5 p-3"><b className="text-cyan">Supporting Metric</b><p className="mt-1 text-slate-300">{node.metric}</p></div>
            <div className="rounded-xl bg-white/5 p-3"><b className="text-purple-200">Core Assumption</b><p className="mt-1 text-slate-300">{node.assumption}</p></div>
            <div className="rounded-xl bg-white/5 p-3"><b className="text-mint">Ecosystem Relationship</b><p className="mt-1 text-slate-300">{node.relationship}</p></div>
          </div>
        )}
      </GlassCard>
    </button>
  );
}
