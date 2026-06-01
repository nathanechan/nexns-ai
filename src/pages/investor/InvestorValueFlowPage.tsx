import { Coins, Gift, Heart, Lock, Rocket, Users } from "lucide-react";
import { useState } from "react";
import { ExpandableProofNode, InvestorShell, MascotCenter, MiniMetricCard, ProofNode } from "../../components/investor/InvestorShared";
import { GlassCard } from "../../components/ui/GlassCard";

const valueNodes: ProofNode[] = [
  { title: "Users", copy: "Predict, learn, earn, level up.", metric: "82,360 user accounts drive prediction volume and task completion.", assumption: "Users return when market participation also advances identity and rewards.", relationship: "User activity creates fees, creator demand, project traction, and pet progression.", icon: Users },
  { title: "Prediction Fees", copy: "Platform fees from prediction activity.", metric: "$24.8M value locked and 128,560 preview transactions.", assumption: "High-frequency, low-friction predictions can support recurring fee capture.", relationship: "Fees fund rewards, growth pools, creator economics, and NEX utility.", icon: Coins },
  { title: "Creators", copy: "Create content, build influence, grow together.", metric: "15,287 creators turn insights into distribution and retention.", assumption: "Trust-based creator communities reduce CAC and increase action frequency.", relationship: "Creator revenue motivates better analysis, bringing users back to predictions.", icon: Users },
  { title: "Projects", copy: "Build, launch, and create impact.", metric: "468 projects create campaign demand and new market narratives.", assumption: "Projects spend when campaigns produce measurable attention and community growth.", relationship: "Projects fund campaigns that feed creators, users, rewards, and NEX demand.", icon: Rocket },
  { title: "NEX Token", copy: "The value convergence layer.", metric: "1B NEX supply preview with utility across access, rewards, and governance.", assumption: "Token utility is strongest when tied to repeated product actions.", relationship: "NEX links fees, access, staking, rewards, companion growth, and ecosystem funding.", icon: Lock },
  { title: "Ecosystem", copy: "Value returns through rewards and opportunities.", metric: "$8.6M value distributed and +142% ecosystem growth preview.", assumption: "Returning value to participants compounds retention and contribution quality.", relationship: "Rewards bring users back, which restarts the value creation cycle.", icon: Gift },
];

export function InvestorValueFlowPage() {
  const [active, setActive] = useState(4);

  return (
    <InvestorShell title="NEXNS Value Flow" subtitle="Where value is created, where value returns, and how the ecosystem compounds.">
      <section className="grid gap-6 xl:grid-cols-[320px_1fr_320px]">
        <div className="grid gap-5">
          {valueNodes.slice(0, 2).map((node, index) => <ExpandableProofNode key={node.title} node={node} active={active === index} onClick={() => setActive(index)} />)}
        </div>
        <GlassCard className="nex-stage p-6">
          <MascotCenter label="NEX Token" />
          <GlassCard className="mb-4 border-neon/40 bg-neon/10 p-4">
            <h2 className="text-xl font-bold">{valueNodes[active].title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{valueNodes[active].relationship}</p>
          </GlassCard>
          <div className="grid gap-3 md:grid-cols-2">
            <ExpandableProofNode node={valueNodes[4]} active={active === 4} onClick={() => setActive(4)} />
            <ExpandableProofNode node={valueNodes[5]} active={active === 5} onClick={() => setActive(5)} />
            <ExpandableProofNode node={{ title: "Pet Evolution", copy: "Enhance AI companions.", metric: "26,540 pet companions create long-term retention surfaces.", assumption: "Companion progression makes financial activity feel personal and continuous.", relationship: "Pet growth converts user activity into identity, return intent, and reward demand.", icon: Heart }} active={false} onClick={() => setActive(5)} />
            <ExpandableProofNode node={{ title: "Growth Fund", copy: "Invest in future opportunities.", metric: "Campaign and fee flows are reinvested into acquisition and rewards.", assumption: "Growth capital should reinforce the same loop that created it.", relationship: "Funded rewards and campaigns attract users, creators, and projects back into the cycle.", icon: Rocket }} active={false} onClick={() => setActive(5)} />
          </div>
        </GlassCard>
        <div className="grid gap-5">
          {valueNodes.slice(2, 6).filter((node) => node.title !== "NEX Token").map((node) => {
            const index = valueNodes.findIndex((item) => item.title === node.title);
            return <ExpandableProofNode key={node.title} node={node} active={active === index} onClick={() => setActive(index)} />;
          })}
        </div>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {[
          ["TVL", "$24.8M", Lock],
          ["Daily Transactions", "128,560", Coins],
          ["Value Distributed", "$8.6M", Gift],
          ["Ecosystem Growth", "+142%", Rocket],
          ["Communities", "2,856", Users],
          ["NEX Burned", "1.28M", Coins],
        ].map(([label, value, Icon]) => <MiniMetricCard key={String(label)} label={String(label)} value={String(value)} icon={Icon} />)}
      </section>
    </InvestorShell>
  );
}
