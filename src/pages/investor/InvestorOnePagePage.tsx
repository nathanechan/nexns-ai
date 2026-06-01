import { Bot, BrainCircuit, Coins, Compass, Gift, Rocket, ShieldCheck, Target, Users, Zap } from "lucide-react";
import { DonutChart } from "../../components/charts/DonutChart";
import { InvestorMetricStrip, InvestorShell, MascotCenter, MiniMetricCard, NeonNode } from "../../components/investor/InvestorShared";
import { GlassCard } from "../../components/ui/GlassCard";
import { revenueData } from "../../data/previewData";

export function InvestorOnePagePage() {
  return (
    <InvestorShell title="Investor One Page" subtitle="One ecosystem, infinite growth. The future is predicted, created, and owned together.">
      <InvestorMetricStrip />
      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_430px_1fr]">
        <GlassCard className="p-6">
          <h2 className="text-2xl font-black">Our Ecosystem Pillars</h2>
          <div className="mt-5 grid gap-3">
            {[
              ["Prediction", "Predict. Learn. Earn.", Target],
              ["Creator", "Create. Share. Influence.", Users],
              ["Project", "Build. Launch. Impact.", Rocket],
              ["Pet Companions", "Evolve. Play. Grow.", Bot],
              ["Community", "Connect. Collaborate. Belong.", Compass],
              ["Growth", "Level up. Earn rewards.", Gift],
            ].map(([title, copy, Icon]) => <NeonNode key={String(title)} title={String(title)} copy={String(copy)} icon={Icon} />)}
          </div>
        </GlassCard>
        <GlassCard className="nex-stage p-5 text-center">
          <h2 className="text-3xl font-black text-gradient">One Ecosystem. Infinite Growth.</h2>
          <MascotCenter label="NEXNS" />
        </GlassCard>
        <div className="grid gap-5">
          <GlassCard className="p-6"><h2 className="text-xl font-bold">The Growth Flywheel</h2>{["Users predict", "Attention created", "Creators grow", "Projects launch", "Revenue generated", "Ecosystem expands"].map((item, index) => <div key={item} className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3"><b className="mr-3 text-neon">{index + 1}</b>{item}</div>)}</GlassCard>
          <GlassCard className="p-6"><h2 className="text-xl font-bold">Value Flow</h2>{["Users", "Creators", "Projects", "NEX Token", "Ecosystem"].map((item) => <div key={item} className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">{item}</div>)}</GlassCard>
        </div>
      </section>
      <section className="mt-6 grid gap-5 xl:grid-cols-3">
        <GlassCard className="p-6"><h2 className="text-xl font-bold">NEX Token Utility</h2>{["Access & membership", "Staking & rewards", "Payments & fees", "Governance", "Ecosystem fuel"].map((item) => <div key={item} className="mt-3 rounded-xl bg-white/5 p-3"><Coins className="mr-2 inline text-neon" />{item}</div>)}</GlassCard>
        <GlassCard className="p-6"><h2 className="text-xl font-bold">Tokenomics Preview</h2><DonutChart data={revenueData} /></GlassCard>
        <GlassCard className="p-6"><h2 className="text-xl font-bold">Roadmap</h2>{["Foundation", "Growth", "Expansion", "Dominance"].map((item, index) => <div key={item} className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3"><b className="mr-2 text-cyan">Phase {index + 1}</b>{item}</div>)}</GlassCard>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-5">
        {[
          ["Market Opportunity", "$100B+", BrainCircuit],
          ["PredictionFi First", "AI powered", Target],
          ["Creator Economy", "Influence", Users],
          ["Project Launchpad", "Impact", Rocket],
          ["Sustainable Growth", "Flywheel", Zap],
        ].map(([label, value, Icon]) => <MiniMetricCard key={String(label)} label={String(label)} value={String(value)} icon={Icon} />)}
      </section>
      <GlassCard className="mt-6 p-8 text-center">
        <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-cyan" />
        <h2 className="text-3xl font-black">Our Vision</h2>
        <p className="mx-auto mt-3 max-w-3xl text-lg leading-8 text-slate-300">A world where everyone can predict, create, launch, play, and grow together. NEXNS is not just a platform. It is a movement.</p>
      </GlassCard>
    </InvestorShell>
  );
}
