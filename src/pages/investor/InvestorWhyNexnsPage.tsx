import { AlertTriangle, BadgeCheck, BrainCircuit, Rocket, Users } from "lucide-react";
import { InvestorMetricStrip, InvestorShell, MascotCenter, NeonNode } from "../../components/investor/InvestorShared";
import { GlassCard } from "../../components/ui/GlassCard";

export function InvestorWhyNexnsPage() {
  return (
    <InvestorShell title="Why NEXNS" subtitle="A fast investor briefing: what NEXNS is, who uses it, what problem it solves, why it grows, and why it is different.">
      <InvestorMetricStrip />
      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_460px]">
        <div className="grid gap-5">
          <NeonNode title="What is NEXNS" copy="NEXNS is Global Prediction Growth Infrastructure where users predict, creators lead attention, projects launch campaigns, and AI companions make growth persistent." icon={BadgeCheck} />
          <NeonNode title="Who are the users" copy="Retail predictors, crypto communities, creators, project teams, and AI-pet driven users who want progression, rewards, and belonging." icon={Users} />
          <NeonNode title="What problem is solved" copy="Crypto attention is fragmented, campaigns fade quickly, and prediction products often lack retention. NEXNS connects attention, distribution, and rewards in one loop." icon={AlertTriangle} />
          <NeonNode title="Why the model grows" copy="Predictions create attention. Attention grows creators. Creators activate communities. Projects bring campaigns. Rewards and AI companions bring users back." icon={Rocket} />
          <NeonNode title="Why NEXNS is different" copy="It combines prediction infrastructure, creator distribution, project growth, AI companions, and value flow instead of treating them as separate products." icon={BrainCircuit} />
        </div>
        <GlassCard className="nex-stage p-5"><MascotCenter label="Growth Thesis" /></GlassCard>
      </section>
    </InvestorShell>
  );
}
