import { Bot, BrainCircuit, Gift, Network, Rocket, ShieldCheck, Target, Users } from "lucide-react";
import { useState } from "react";
import { ExpandableProofNode, InvestorMetricStrip, InvestorShell, MascotCenter, ProofNode } from "../../components/investor/InvestorShared";
import { GlassCard } from "../../components/ui/GlassCard";

const pillars: ProofNode[] = [
  { title: "Prediction", copy: "AI predictions, market insights, learn and earn.", metric: "12.45M predictions create intent data and recurring engagement.", assumption: "Prediction is the highest-frequency behavior in the network.", relationship: "Prediction data powers creator content, project campaigns, and reward distribution.", icon: Target },
  { title: "Creator Economy", copy: "Content creation, live streaming, audience building, revenue.", metric: "15,287 creators expand distribution and trust.", assumption: "Creators are the human interface for market education and conversion.", relationship: "Creators turn attention into users, project backing, and community retention.", icon: Users },
  { title: "Project Launchpad", copy: "Incubation, campaign launch, community support.", metric: "468 projects create market narratives and campaign budgets.", assumption: "Projects need measurable attention and engaged communities.", relationship: "Projects bring campaign revenue and new prediction categories into the ecosystem.", icon: Rocket },
  { title: "Pet Companions", copy: "AI companions, pet evolution, care and train.", metric: "26,540 companions convert utility into emotional retention.", assumption: "A companion layer makes progress visible and personal.", relationship: "Pet progression links predictions, tasks, rewards, and daily return behavior.", icon: Bot },
  { title: "Community", copy: "Social connections, groups, events, reputation.", metric: "2,856 active communities create durable network density.", assumption: "Social belonging increases action frequency and lowers churn.", relationship: "Communities connect users to creators, projects, campaigns, and status.", icon: Network },
  { title: "Growth & Rewards", copy: "EXP, achievements, leaderboards, exclusive rewards.", metric: "$8.6M value distributed through preview rewards.", assumption: "Progression and rewards reinforce productive ecosystem actions.", relationship: "Rewards route value back to users while increasing prediction and task activity.", icon: Gift },
  { title: "Technology Layer", copy: "AI, blockchain security, smart contracts, scalable infrastructure.", metric: "128,560 preview transactions and scalable event tracking.", assumption: "Infrastructure must support frequent low-friction user actions.", relationship: "The technology layer enables prediction, identity, rewards, and future settlement paths.", icon: BrainCircuit },
];

export function InvestorEcosystemPage() {
  const [active, setActive] = useState(0);
  const selected = pillars[active];

  return (
    <InvestorShell title="Ecosystem Map" subtitle="One ecosystem, infinite growth: the layers that make NEXNS a self-sustaining network.">
      <section className="grid gap-6 xl:grid-cols-[1fr_420px_1fr]">
        <div className="grid gap-4">{pillars.slice(0, 3).map((node, index) => <ExpandableProofNode key={node.title} node={node} active={active === index} onClick={() => setActive(index)} />)}</div>
        <GlassCard className="nex-stage p-5 text-center">
          <MascotCenter label="Center of Value" />
          <h2 className="text-2xl font-black text-gradient">NEXNS</h2>
          <p className="mt-2 text-slate-300">The center of value creation and growth.</p>
          <GlassCard className="mt-5 border-neon/40 bg-neon/10 p-4 text-left">
            <h3 className="text-xl font-bold">{selected.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{selected.relationship}</p>
          </GlassCard>
        </GlassCard>
        <div className="grid gap-4">{pillars.slice(3).map((node, offset) => <ExpandableProofNode key={node.title} node={node} active={active === offset + 3} onClick={() => setActive(offset + 3)} />)}</div>
      </section>
      <GlassCard className="mt-6 p-6">
        <h2 className="mb-4 text-center text-xl font-bold uppercase tracking-[0.18em] text-neon">Ecosystem Principles</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {["User-centric", "Value driven", "Open & inclusive", "Sustainable growth"].map((item) => <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center"><ShieldCheck className="mx-auto mb-2 text-cyan" />{item}</div>)}
        </div>
      </GlassCard>
      <div className="mt-6"><InvestorMetricStrip /></div>
    </InvestorShell>
  );
}
