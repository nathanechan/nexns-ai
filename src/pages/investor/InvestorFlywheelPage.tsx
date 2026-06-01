import { BarChart3, Coins, Eye, Rocket, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { ExpandableProofNode, InvestorShell, MascotCenter, MiniMetricCard, ProofNode } from "../../components/investor/InvestorShared";
import { GlassCard } from "../../components/ui/GlassCard";

const flywheel: ProofNode[] = [
  { title: "Users Predict", copy: "Users make predictions on AI-powered markets.", metric: "12.45M predictions create repeat behavioral data across market categories.", assumption: "Simple prediction loops convert passive market attention into active participation.", relationship: "More user actions improve market depth, creator signals, and project campaign targeting.", icon: Users },
  { title: "Attention Created", copy: "Insights, leaderboards, and activity attract attention.", metric: "82,360 active users and rising feed activity form the discovery layer.", assumption: "Visible outcomes, streaks, and social proof make markets shareable.", relationship: "Attention routes users toward creators and projects that can retain them.", icon: Eye },
  { title: "Creators Grow", copy: "Creators build audiences and distribute insight.", metric: "15,287 creators monetize prediction insight and community trust.", assumption: "Creators lower onboarding friction by explaining opportunities and market theses.", relationship: "Creator influence brings users into markets and projects into campaign demand.", icon: Sparkles },
  { title: "Projects Launch", copy: "Projects launch campaigns and raise attention.", metric: "468 project launches create new prediction markets and task surfaces.", assumption: "Projects need sustained attention, not one-off launch spikes.", relationship: "Project campaigns fund creator activity and unlock rewards for users.", icon: Rocket },
  { title: "Revenue Generated", copy: "Fees and campaign revenue fund growth.", metric: "$2.48M platform revenue preview across predictions and campaigns.", assumption: "Small fees plus campaign budgets scale with network participation.", relationship: "Revenue returns through rewards, growth funds, and NEX utility sinks.", icon: Coins },
  { title: "Ecosystem Expands", copy: "More rewards bring more users and creators.", metric: "$18.6M ecosystem value preview compounds through reinvestment.", assumption: "Reinvestment keeps acquisition, retention, and creator incentives aligned.", relationship: "Expansion restarts the flywheel with higher liquidity and stronger social proof.", icon: BarChart3 },
];

export function InvestorFlywheelPage() {
  const [active, setActive] = useState(0);
  const selected = flywheel[active];

  return (
    <InvestorShell title="NEXNS Flywheel" subtitle="The growth engine of NEXNS: predict, create, launch, grow, repeat.">
      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <GlassCard className="nex-stage relative overflow-hidden p-6">
          <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-neon/40 flywheel-spin" />
          <div className="relative z-10 grid gap-4 md:grid-cols-3">
            {flywheel.map((node, index) => <ExpandableProofNode key={node.title} node={node} active={active === index} onClick={() => setActive(index)} index={index + 1} />)}
          </div>
          <MascotCenter label="Flywheel NEX" />
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="text-2xl font-bold">Proof Focus</h2>
          <p className="mt-3 text-slate-300">Click any flywheel node to inspect the operating assumption behind the growth loop.</p>
          <div className="mt-5 grid gap-4">
            <div className="rounded-xl border border-neon/30 bg-neon/10 p-4"><b>{selected.title}</b><p className="mt-2 text-sm text-slate-300">{selected.relationship}</p></div>
            {["More participation brings more data", "More attention attracts creators", "More creators bring content", "More projects bring value", "More revenue funds rewards", "More growth expands the ecosystem"].map((item, index) => <button key={item} onClick={() => setActive(index)} className={`rounded-xl border border-white/10 p-4 text-left ${active === index ? "bg-neon/20 text-white" : "bg-white/5"}`}>{item}</button>)}
          </div>
        </GlassCard>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {[
          ["Predictions", "12,458", BarChart3],
          ["Active Users", "82,360", Users],
          ["Creators", "15,287", Sparkles],
          ["Projects Launched", "46", Rocket],
          ["Platform Revenue", "$2.48M", Coins],
          ["Ecosystem Value", "$18.6M", BarChart3],
        ].map(([label, value, Icon]) => <MiniMetricCard key={String(label)} label={String(label)} value={String(value)} icon={Icon} />)}
      </section>
    </InvestorShell>
  );
}
