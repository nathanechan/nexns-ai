import { Crown, Rocket, Share2, Shield, Sparkles, Target } from "lucide-react";
import { InvestorMetricStrip, InvestorShell, MiniMetricCard, NeonNode } from "../../components/investor/InvestorShared";

const steps = [
  ["Join NEXNS", "Enter the future and claim a companion.", Sparkles],
  ["Predict", "Make AI-powered predictions and learn.", Target],
  ["Create", "Share insights and build influence.", Share2],
  ["Support Projects", "Back campaigns and discover innovation.", Shield],
  ["Community", "Collaborate, connect, and build reputation.", Rocket],
  ["Leader", "Lead the ecosystem and shape the future.", Crown],
];

export function InvestorGrowthJourneyPage() {
  return (
    <InvestorShell title="Growth Journey" subtitle="From prediction to leadership: every action builds the future of NEXNS.">
      <div className="grid gap-5 xl:grid-cols-6">
        {steps.map(([title, copy, Icon], index) => <NeonNode key={String(title)} title={String(title)} copy={String(copy)} icon={Icon} index={index + 1} />)}
      </div>
      <section className="mt-8">
        <div className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-neon">Your Growth Overview</div>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
          {[
            ["Predictions", "12,458", Target],
            ["EXP Earned", "248,750", Sparkles],
            ["Followers", "82,360", Share2],
            ["Projects Supported", "46", Rocket],
            ["Achievements", "128", Crown],
            ["Current Level", "Lv.36", Shield],
          ].map(([label, value, Icon]) => <MiniMetricCard key={String(label)} label={String(label)} value={String(value)} icon={Icon} />)}
        </div>
      </section>
      <div className="mt-6"><InvestorMetricStrip /></div>
    </InvestorShell>
  );
}
