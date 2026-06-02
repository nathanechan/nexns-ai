import { Bot, BrainCircuit, Compass, Gift, Rocket, ShieldCheck, Target, Users, Zap } from "lucide-react";
import { DonutChart } from "../../components/charts/DonutChart";
import { InvestorMetricStrip, InvestorShell, MascotCenter, MiniMetricCard, NeonNode } from "../../components/investor/InvestorShared";
import { GlassCard } from "../../components/ui/GlassCard";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

const tokenAllocation = [
  { name: "Ecosystem Rewards", value: 30, fill: "#8b5cf6", description: "Rewards users, creators, and communities that create recurring participation." },
  { name: "DAO Treasury", value: 20, fill: "#22d3ee", description: "Supports governance, long-term operations, ecosystem grants, and strategic reserves." },
  { name: "Team", value: 15, fill: "#2563eb", description: "Aligns builders with long-term product, infrastructure, and ecosystem execution." },
  { name: "Investors", value: 10, fill: "#d946ef", description: "Supports capital partners participating in long-term platform growth." },
  { name: "Liquidity", value: 10, fill: "#20f29b", description: "Supports market depth and sustainable ecosystem accessibility." },
  { name: "Creator Fund", value: 5, fill: "#fbbf24", description: "Funds creator activation, content distribution, and ecosystem education programs." },
  { name: "Advisors & Partners", value: 5, fill: "#60a5fa", description: "Reserved for strategic advisors and ecosystem relationships." },
  { name: "Foundation Reserve", value: 5, fill: "#a78bfa", description: "Provides flexibility for future network expansion and foundation-level initiatives." },
];

const nexUtility = ["Governance", "Access", "Staking", "Buyback Value Capture", "Creator Growth", "Project Entry"];
const nsUtility = ["Participation", "User Retention", "Failure Recovery", "Tasks", "Growth Progress", "Ecosystem Fuel"];

export function InvestorOnePagePage() {
  return (
    <InvestorShell title="Investor One Pager" subtitle="One ecosystem, infinite growth. The future is predicted, created, and owned together.">
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
      <section className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <GlassCard className="p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex items-center gap-4">
              <img src={nexLogoWhite} alt="NEXNS" className="h-11 w-auto object-contain" draggable={false} />
              <div>
                <h2 className="mt-1 text-3xl font-black">Total Supply: 1,000,000,000 NEX</h2>
              </div>
            </div>
            <div className="rounded-2xl border border-cyan/25 bg-cyan/10 px-4 py-3 text-sm font-black text-cyan">Investor One Pager</div>
          </div>
          <div className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
            <div>
              <DonutChart data={tokenAllocation} />
            </div>
            <div className="grid gap-2">
              {tokenAllocation.map((item) => (
                <TokenAllocationRow key={item.name} item={item} />
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <TokenUtilityCard title="NEX Utility" items={nexUtility} />
            <TokenUtilityCard title="NS Utility" items={nsUtility} />
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold">Roadmap</h2>
          {["AI Companion Foundation", "Creator Network Expansion", "Project Growth Infrastructure", "Intelligent Ecosystem Layer"].map((item, index) => <div key={item} className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3"><b className="mr-2 text-cyan">Phase {index + 1}</b>{item}</div>)}
        </GlassCard>
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

function TokenAllocationRow({ item }: { item: (typeof tokenAllocation)[number] }) {
  return (
    <div title={item.description} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <div className="absolute bottom-0 left-0 top-0 opacity-25 transition group-hover:opacity-45" style={{ width: `${item.value}%`, backgroundColor: item.fill }} />
      <div className="relative flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 font-bold"><i className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />{item.name}</span>
        <b className="text-cyan">{item.value}%</b>
      </div>
      <p className="relative mt-2 hidden text-sm leading-6 text-slate-300 group-hover:block">{item.description}</p>
    </div>
  );
}

function TokenUtilityCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan/25 bg-cyan/10 p-1.5">
          <img src={nexLogoWhite} alt="NEXNS" className="h-full w-full object-contain" draggable={false} />
        </span>
        <h3 className="text-xl font-black">{title}</h3>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-slate-200">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
