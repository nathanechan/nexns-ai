import { ArrowLeft, BatteryCharging, Bed, Brain, CheckCircle2, Crown, Gift, HeartPulse, Sparkles, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { roiData, tasks, user } from "../data/previewData";
import { useProductState } from "../state/productState";

export function PetPage() {
  const { pet, petAction, claimedTasks, claimTask } = useProductState();

  return (
    <AppShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black md:text-5xl">AI Pet <span className="text-gradient">Home</span></h1>
          <p className="mt-2 text-slate-300">Train, rest, evolve, and grow with your NEX companion.</p>
        </div>
        <Link to="/app" className="interactive-glow flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3">
          <ArrowLeft className="h-5 w-5" /> Back to App
        </Link>
        <Link to="/pet/world" className="purple-button interactive-glow rounded-xl px-6 py-3 font-semibold">
          Enter Pet World
        </Link>
        <Link to="/companion" className="interactive-glow rounded-xl border border-neon/30 bg-neon/10 px-6 py-3 font-semibold">
          Ask NEX
        </Link>
      </div>

      <section className="mt-6 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <GlassCard className="relative min-h-[620px] overflow-hidden p-6 md:p-8">
          <div className="absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full bg-neon/20 blur-3xl" />
          <div className="absolute inset-x-12 bottom-32 h-28 rounded-[50%] border border-cyan/40 bg-cyan/10 shadow-cyan" />
          <Link to="/companion" className="relative z-10 mx-auto block max-w-xl text-center">
            <div className="inline-flex rounded-full border border-neon/40 bg-neon/15 px-4 py-2 text-sm text-purple-100">AI Companion Space</div>
            <Mascot variant="happy" className="mx-auto mt-4 w-[min(470px,88vw)] animate-[pulse_4s_ease-in-out_infinite]" />
            <h2 className="mt-4 text-3xl font-bold">NEX Companion</h2>
            <p className="mt-2 text-slate-300">Mood: {pet.mood}</p>
          </Link>

          <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Level", `Lv.${user.level}`, Crown],
              ["Energy", `${pet.energy} / 100`, BatteryCharging],
              ["Mood", pet.mood, HeartPulse],
              ["Evolution", `${pet.evolution}%`, Sparkles],
            ].map(([label, value, Icon]) => (
              <GlassCard key={String(label)} className="interactive-glow p-4 text-center">
                <Icon className="mx-auto mb-2 h-7 w-7 text-neon" />
                <div className="text-xs text-slate-400">{String(label)}</div>
                <div className="mt-1 text-xl font-bold">{String(value)}</div>
              </GlassCard>
            ))}
          </div>
        </GlassCard>

        <div className="grid gap-5">
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold">Level and EXP</h2>
            <div className="mt-4 flex items-end justify-between"><span className="text-4xl font-black">Lv.{user.level}</span><span className="text-slate-300">Pet EXP {pet.exp} / 100</span></div>
            <div className="mt-3 h-3 rounded-full bg-white/10"><span className="block h-full rounded-full bg-gradient-to-r from-neon to-cyan" style={{ width: `${pet.exp}%` }} /></div>
            <MiniLine data={roiData} color="#22d3ee" height={120} />
          </GlassCard>

          <div className="grid gap-5 sm:grid-cols-2">
            <GlassCard className="interactive-glow p-5">
              <Brain className="h-9 w-9 text-cyan" />
              <h3 className="mt-3 text-xl font-semibold">Training Zone</h3>
              <p className="mt-2 text-sm text-slate-300">Analyze market signals to earn pet EXP and unlock evolution traits.</p>
              <button onClick={() => petAction("Training complete", "+8 pet EXP. Energy spent inside the NEX companion loop.", { exp: pet.exp + 8, energy: pet.energy - 8, mood: "Focused" })} className="purple-button mt-5 block w-full rounded-xl py-3 text-center font-semibold">Train Pet</button>
            </GlassCard>
            <GlassCard className="interactive-glow p-5">
              <Bed className="h-9 w-9 text-purple-300" />
              <h3 className="mt-3 text-xl font-semibold">Rest Zone</h3>
              <p className="mt-2 text-sm text-slate-300">Recover energy and prepare for your next simulated prediction run.</p>
              <button onClick={() => petAction("NEX rested", "+10 energy and bond improved.", { energy: pet.energy + 10, bond: pet.bond + 3, mood: "Calm" })} className="mt-5 block w-full rounded-xl border border-white/10 bg-white/5 py-3 text-center font-semibold">Rest Now</button>
            </GlassCard>
          </div>

          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold">Achievement Display</h2>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              {["First Bond", "7 Day Streak", "Market Sense"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <Trophy className="mx-auto mb-2 text-amber-300" />{item}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-5">
          <h2 className="text-xl font-semibold">Pet Tasks</h2>
          {tasks.slice(0, 4).map((task) => (
            <div key={task.label} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="flex items-center gap-3"><task.icon className="text-neon" />{task.label}</span>
              <button onClick={() => claimTask(`Pet ${task.label}`, task.reward)} className="rounded-lg bg-neon/50 px-4 py-2">{claimedTasks.includes(`Pet ${task.label}`) ? "Claimed" : "Claim"}</button>
            </div>
          ))}
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-xl font-semibold">Evolution Progress</h2>
          <div className="mt-5 grid grid-cols-5 items-center gap-2 text-center text-xs">
            {["Spark", "Scout", "Oracle", "Nexus", "Ascend"].map((stage, index) => (
              <div key={stage} className={`rounded-xl border p-3 ${index <= 2 ? "border-neon/50 bg-neon/15" : "border-white/10 bg-white/5"}`}>
                <Sparkles className="mx-auto mb-2 h-5 w-5 text-cyan" />{stage}
              </div>
            ))}
          </div>
          <div className="mt-5 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-gradient-to-r from-neon to-cyan" style={{ width: `${pet.evolution}%` }} /></div>
          <p className="mt-3 text-sm text-slate-300">Complete 3 more pet tasks to unlock the Nexus trait.</p>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-xl font-semibold">Rewards</h2>
          {["+25 Pet EXP", "+1 Energy Core", "+50 NS", "+1 Mood Badge"].map((reward) => (
            <div key={reward} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="flex items-center gap-3"><Gift className="text-neon" />{reward}</span>
              <CheckCircle2 className="text-mint" />
            </div>
          ))}
        </GlassCard>
      </section>

      <GlassCard className="mt-5 flex flex-wrap items-center justify-between gap-5 p-6">
        <div>
          <h2 className="text-2xl font-bold">Companion Growth Loop</h2>
          <p className="mt-2 text-slate-300">Predict, train, rest, and evolve with NEX as your growth companion.</p>
        </div>
        <div className="flex gap-3">
          <span className="rounded-xl bg-mint/10 px-4 py-3 text-mint"><Zap className="mr-2 inline h-5 w-5" />Pet EXP {pet.exp}</span>
          <span className="rounded-xl bg-neon/15 px-4 py-3 text-purple-100">Energy {pet.energy}</span>
        </div>
      </GlassCard>
    </AppShell>
  );
}
