import { BrainCircuit, Compass, Network, PawPrint } from "lucide-react";
import { InvestorMetricStrip, InvestorNavCard, InvestorShell, MascotCenter, investorPages } from "../../components/investor/InvestorShared";
import { GlassCard } from "../../components/ui/GlassCard";

export function InvestorCenterPage() {
  return (
    <InvestorShell title="Investor Center" subtitle="NEXNS is Global Prediction Growth Infrastructure: a self-reinforcing ecosystem where prediction signals, creator influence, project activation, AI companions, and community participation compound into durable growth.">
      <InvestorMetricStrip />
      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_460px]">
        <GlassCard className="p-7">
          <h2 className="text-3xl font-black">NEXNS Positioning</h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">NEXNS turns market attention into a growth engine. Users predict, creators distribute insight, projects launch campaigns, AI companions increase retention, and rewards return value to the community.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              ["Prediction Infrastructure", "Prediction activity becomes structured signal, attention, and coordination.", Compass],
              ["Creator Economy", "Creators convert insight into community growth.", BrainCircuit],
              ["AI Companion", "NEX companions turn actions into progression.", PawPrint],
              ["Growth Infrastructure", "Projects, users, creators, and communities reinforce one another.", Network],
            ].map(([title, copy, Icon]) => (
              <GlassCard key={String(title)} className="interactive-glow p-5">
                <Icon className="mb-3 h-8 w-8 text-cyan" />
                <h3 className="text-xl font-bold">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{String(copy)}</p>
              </GlassCard>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="nex-stage overflow-hidden p-5"><MascotCenter label="Investor NEX" /></GlassCard>
      </section>
      <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {investorPages.map((page) => <InvestorNavCard key={page.path} page={page} />)}
      </section>
    </InvestorShell>
  );
}
