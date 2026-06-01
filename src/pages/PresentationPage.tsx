import { ArrowLeft, ArrowRight, Bot, CirclePlay, Compass, Crown, LineChart, Network, Rocket, Target, Users, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ActivityFeed } from "../components/ui/ActivityFeed";
import { GlassCard } from "../components/ui/GlassCard";
import { Logo } from "../components/ui/Logo";
import { Mascot } from "../components/ui/Mascot";
import { ToastHost } from "../components/ui/ToastHost";
import { useProductState } from "../state/productState";

const steps = [
  { title: "What is NEXNS", route: "/investor/why-nexns", icon: Compass, copy: "A PredictionFi Growth Network where users predict, creators lead attention, projects launch campaigns, and AI companions keep growth personal." },
  { title: "Home Live Platform", route: "/app", icon: LineChart, copy: "The dashboard proves NEXNS is more than a site: live predictions, creator alerts, project momentum, rewards, and pet state all move together." },
  { title: "Prediction Lifecycle", route: "/prediction", icon: Target, copy: "Users choose a market, select UP or DOWN, create a preview position, settle outcomes, and feed EXP, rewards, and companion growth." },
  { title: "Creator Economy", route: "/creator", icon: Crown, copy: "Creators convert insight into distribution. Follows, communities, prediction calls, and revenue loops make market attention repeatable." },
  { title: "Project Growth", route: "/projects", icon: Rocket, copy: "Projects activate prediction markets, creator campaigns, tasks, and communities to turn launch attention into measurable growth." },
  { title: "AI Pet World", route: "/pet/world", icon: Bot, copy: "NEX companions transform product actions into emotional retention, progression, and daily return behavior." },
  { title: "Growth Journey", route: "/my", icon: Users, copy: "The user growth center ties together EXP, NS rewards, streaks, achievements, tasks, VIP, and reward history." },
  { title: "Flywheel", route: "/investor/flywheel", icon: Zap, copy: "Users predict, attention grows, creators distribute, projects launch, revenue returns, and the ecosystem expands." },
  { title: "Value Flow", route: "/investor/value-flow", icon: Network, copy: "Value flows from users, creators, and projects into NEX utility and returns through rewards, companions, and growth funds." },
  { title: "Investor One Page", route: "/investor/one-page", icon: CirclePlay, copy: "The closing view summarizes the thesis: one ecosystem, infinite growth, with clear pillars, roadmap, utility, and opportunity." },
];

export function PresentationPage() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const { activities, predictions, pet, nsBalance } = useProductState();
  const current = steps[step];
  const Icon = current.icon;
  const progress = useMemo(() => `${((step + 1) / steps.length) * 100}%`, [step]);

  return (
    <div className="min-h-screen overflow-hidden bg-space-radial px-4 py-5 text-white sm:px-6">
      <header className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        <Logo />
        <div className="flex flex-wrap gap-3">
          <Link to="/investor" className="interactive-glow rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">Investor Center</Link>
          <Link to="/app" className="interactive-glow rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">Exit</Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto mt-8 max-w-7xl">
        {!started ? (
          <section className="grid min-h-[680px] items-center gap-8 lg:grid-cols-[1fr_.9fr]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Investor Presentation Mode</div>
              <h1 className="mt-4 text-5xl font-black leading-tight md:text-7xl">NEXNS<br /><span className="text-gradient">Product Story</span></h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">A 3-5 minute guided walkthrough of the NEXNS growth system, product loops, companion retention, and investor proof layer.</p>
              <button onClick={() => setStarted(true)} className="purple-button interactive-glow mt-8 inline-flex items-center gap-3 rounded-xl px-7 py-4 text-lg font-semibold">
                Start Presentation <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <GlassCard className="nex-stage p-6">
              <Mascot variant="master" className="mx-auto w-[min(520px,88vw)] drop-shadow-[0_0_70px_rgba(139,92,246,.8)]" />
            </GlassCard>
          </section>
        ) : (
          <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <GlassCard className="relative min-h-[640px] overflow-hidden p-6 md:p-10">
              <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-neon/20 blur-3xl" />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-sm text-purple-100">Step {step + 1} / {steps.length}</span>
                  <Link to={current.route} className="interactive-glow rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">View Product Area</Link>
                </div>
                <div className="mt-6 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-gradient-to-r from-neon to-cyan" style={{ width: progress }} /></div>
                <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_360px]">
                  <div>
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-neon/20 text-cyan"><Icon className="h-8 w-8" /></div>
                    <h1 className="mt-6 text-4xl font-black md:text-6xl">{current.title}</h1>
                    <p className="mt-5 max-w-3xl text-xl leading-9 text-slate-300">{current.copy}</p>
                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      <GlassCard className="p-4"><div className="text-xs text-slate-400">Preview Balance</div><b className="text-2xl">{nsBalance.toLocaleString()} NS</b></GlassCard>
                      <GlassCard className="p-4"><div className="text-xs text-slate-400">Predictions</div><b className="text-2xl">{predictions.length}</b></GlassCard>
                      <GlassCard className="p-4"><div className="text-xs text-slate-400">Pet Mood</div><b className="text-2xl">{pet.mood}</b></GlassCard>
                    </div>
                  </div>
                  <Mascot variant="guiding" className="mx-auto w-[min(360px,80vw)] drop-shadow-[0_0_60px_rgba(34,211,238,.55)]" />
                </div>
              </div>
            </GlassCard>

            <div className="grid gap-5">
              <ActivityFeed compact />
              <GlassCard className="p-5">
                <h2 className="font-semibold">Story Controls</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))} className="interactive-glow rounded-xl border border-white/10 bg-white/5 px-4 py-3 disabled:opacity-40"><ArrowLeft className="mr-2 inline h-4 w-4" />Previous</button>
                  <button disabled={step === steps.length - 1} onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))} className="purple-button interactive-glow rounded-xl px-4 py-3 disabled:opacity-40">Next <ArrowRight className="ml-2 inline h-4 w-4" /></button>
                </div>
                <button onClick={() => { setStarted(false); setStep(0); }} className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3">Restart Presentation</button>
              </GlassCard>
              <GlassCard className="p-5">
                <h2 className="mb-3 font-semibold">Presentation Path</h2>
                <div className="grid gap-2">
                  {steps.map((item, index) => <button key={item.title} onClick={() => setStep(index)} className={`rounded-lg px-3 py-2 text-left text-sm ${step === index ? "bg-neon/30 text-white" : "bg-white/5 text-slate-300"}`}>{index + 1}. {item.title}</button>)}
                </div>
              </GlassCard>
            </div>
          </section>
        )}
      </main>
      <ToastHost />
    </div>
  );
}
