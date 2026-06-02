import { ArrowRight, CheckCircle2, Crown, Flame, Gift, Heart, Plus, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { PreviewModal } from "../components/ui/PreviewModal";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { rewards, roiData, tasks, user } from "../data/previewData";
import { useProductState } from "../state/productState";

export function MyPage() {
  const navigate = useNavigate();
  const { nsBalance, userExp, seasonPoints, streak, pet, claimedTasks, rewards: liveRewards, claimTask, petAction, predictions } = useProductState();
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);

  return (
    <AppShell>
      <h1 className="text-4xl font-black md:text-5xl">My <span className="text-gradient">Growth</span> Journey</h1>
      <p className="mt-2 text-lg text-slate-300">Predict. Contribute. Grow. Earn.</p>

      <section className="mt-5 grid gap-5 lg:grid-cols-[.9fr_.9fr_1.4fr]">
        <GlassCard className="interactive-glow p-6 md:p-7">
          <div className="flex items-center gap-5"><div className="grid h-24 w-24 place-items-center rounded-full bg-neon/20 text-neon md:h-28 md:w-28"><Crown className="h-14 w-14 md:h-16 md:w-16" /></div><div><h2 className="text-2xl font-bold md:text-3xl">Level 27<br />Explorer</h2></div></div>
          <div className="mt-7 flex justify-between text-slate-300"><span>EXP</span><span>{userExp.toLocaleString()} / {user.nextExp.toLocaleString()}</span></div>
          <div className="mt-2 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-neon" style={{ width: `${Math.min(100, (userExp / user.nextExp) * 100)}%` }} /></div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">{["+200 NS", "+1 Badge", "+1 EXP Boost"].map((item) => <div key={item} className="rounded-xl bg-white/5 p-3"><Gift className="mx-auto mb-2 text-neon" />{item}</div>)}</div>
          <button onClick={() => setModal({ title: "Growth Progress", description: "Track EXP, badges, boosts, and the next milestones in your NEXNS journey." })} className="interactive-glow mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-neon/15 py-4">View Progress <ArrowRight className="h-4 w-4" /></button>
        </GlassCard>
        <button type="button" onClick={() => navigate("/pet")} className="text-left">
          <GlassCard className="interactive-glow h-full overflow-hidden p-5">
            <h2 className="text-lg font-semibold">AI Companion<br /><span className="text-gradient text-2xl">NEX</span></h2>
            <Mascot variant="evolution" className="mx-auto w-80" />
          </GlassCard>
        </button>
        <div className="grid gap-5">
          <GlassCard className="p-5"><div className="flex justify-between"><h2 className="font-semibold">Today's Overview</h2><button onClick={() => setModal({ title: "Today's Overview", description: "Daily summary of prediction activity, win rate, and network earnings." })} className="text-purple-300">View All</button></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{[`Predictions ${predictions.length + 24}`, "Win Rate 62.7%", `Total Earnings ${liveRewards.length ? liveRewards.length * 120 : 8920} NS`].map((item) => <GlassCard key={item} className="interactive-glow p-4"><div className="text-slate-400">{item.split(" ")[0]}</div><div className="mt-2 text-2xl font-bold md:text-3xl">{item.replace(item.split(" ")[0], "")}</div><div className="text-mint">+12%</div></GlassCard>)}</div></GlassCard>
          <GlassCard className="relative overflow-hidden border-neon/60 bg-neon/20 p-7"><button onClick={() => claimTask("Balance Boost", "+10 NS")} className="absolute right-5 top-5 rounded-full bg-neon p-3"><Plus /></button><div className="text-purple-200">Total Balance</div><div className="mt-2 text-4xl font-black">{nsBalance.toLocaleString()} <span className="text-xl">NS</span></div><div className="mt-4 text-3xl font-bold">{user.nex} <span className="text-xl">NEX</span></div></GlassCard>
        </div>
      </section>

      <div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 md:grid-cols-3 xl:grid-cols-6">{["Daily Check-in +10 NS", "Prediction Bonus +20%", "Invite Friends +50 NS", `Streak Reward ${streak} Days`, "VIP Benefits Active", "Event Center Join Now"].map((item, i) => <button key={item} onClick={() => claimTask(item, i === 2 ? "+50 NS" : "+10 NS")} className="interactive-glow flex items-center gap-3 rounded-xl bg-slate-950/50 p-4 text-left"><span className="grid h-11 w-11 place-items-center rounded-xl bg-neon/20">{i === 3 ? <Flame /> : i === 4 ? <Crown /> : <Gift />}</span><span className="text-sm">{item}</span></button>)}</div>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-5"><div className="flex justify-between"><h2 className="text-xl font-semibold">Daily Tasks</h2><span className="text-sm text-slate-400">Resets in 12:45:32</span></div>{tasks.map((task) => <div key={task.label} className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3"><span className="flex items-center gap-3"><task.icon className="text-neon" />{task.label}<b className="text-mint">{task.reward}</b></span><button onClick={() => claimTask(task.label, task.reward)} className="rounded-lg bg-neon/50 px-4 py-2">{claimedTasks.includes(task.label) ? "Claimed" : task.progress}</button></div>)}</GlassCard>
        <GlassCard className="p-5"><div className="flex justify-between"><h2 className="text-xl font-semibold">Achievements</h2><button onClick={() => setModal({ title: "Achievements", description: "Achievements unlock visible badges, status, and growth milestones across your journey." })} className="text-purple-300">View All</button></div>{["First Prediction", "10 Wins", "High Accuracy", "Big Winner", "Prediction Master"].map((item, i) => <div key={item} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3"><span><Crown className="mr-3 inline text-amber-300" />{item}</span>{i < 3 ? <span className="text-mint">Completed</span> : <span className="text-slate-300">{i === 3 ? "3,420 / 5,000" : "24 / 100"}</span>}</div>)}</GlassCard>
        <GlassCard className="p-5"><div className="flex justify-between gap-3"><h2 className="text-xl font-semibold">Season 1: Rise Together</h2><span className="text-sm text-slate-400">Ends in 23d 12h</span></div><div className="mt-5 flex flex-wrap items-center gap-5"><Crown className="h-24 w-24 text-neon md:h-28 md:w-28" /><div><div className="text-2xl font-bold">Season Pass<br />Lv.15</div><div className="mt-3 h-2 w-52 rounded-full bg-white/10"><span className="block h-full rounded-full bg-neon" style={{ width: `${Math.min(100, seasonPoints / 10)}%` }} /></div></div></div><div className="mt-5 grid grid-cols-5 gap-2 text-center text-xs">{["500 NS", "1,000 NS", "NEX Pet", "2,000 NS", "Mystery Box"].map((item, i) => <button key={item} onClick={() => claimTask(`Season ${item}`, i === 2 ? "+25 NS" : item.includes("NS") ? `+${item}` : "+10 NS")} className={`rounded-xl border p-3 ${i === 2 ? "border-neon bg-neon/20" : "border-white/10 bg-white/5"}`}>{item}<CheckCircle2 className="mx-auto mt-2 h-4 w-4 text-mint" /></button>)}</div></GlassCard>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-5"><div className="flex justify-between"><h2 className="text-xl font-semibold">My Rewards</h2><button onClick={() => setModal({ title: "Rewards History", description: "A record of reward events earned through predictions, tasks, creators, and growth activity." })} className="text-purple-300">View All</button></div>{liveRewards.slice(0, 4).map((reward) => <div key={reward.id} className="flex items-center justify-between gap-3 border-t border-white/10 py-3"><span className="flex items-center gap-3"><Gift className="text-neon" />{reward.title}</span><span className="text-mint">{reward.detail.match(/\+\d+ NS/)?.[0] ?? "+10 NS"}</span><span className="text-xs text-slate-400">now</span></div>)}{rewards.map((reward) => <div key={reward.label} className="flex items-center justify-between gap-3 border-t border-white/10 py-3"><span className="flex items-center gap-3"><reward.icon className="text-neon" />{reward.label}</span><span className="text-mint">{reward.value}</span><span className="text-xs text-slate-400">{reward.time}</span></div>)}</GlassCard>
        <GlassCard className="border-amber-400/30 p-5"><Crown className="h-14 w-14 text-amber-300" /><h2 className="mt-3 text-3xl font-bold text-amber-200">VIP 3</h2>{["Higher Prediction Rewards +30%", "Daily NS Bonus +50 NS", "Exclusive VIP Tasks Access", "Priority Support Access", "Monthly Airdrop 1,000 NS"].map((item) => <div key={item} className="mt-3 flex justify-between"><span><CheckCircle2 className="mr-2 inline h-4 w-4 text-mint" />{item}</span></div>)}<button onClick={() => setModal({ title: "Upgrade to VIP 4", description: "VIP upgrades show the next membership tier and benefits. No payment, wallet action, token transfer, or subscription is initiated." })} className="interactive-glow mt-6 w-full rounded-xl bg-gradient-to-r from-amber-700 to-amber-400 py-4 font-semibold">Upgrade to VIP 4</button></GlassCard>
        <GlassCard className="p-5"><div className="flex justify-between"><h2 className="text-xl font-semibold">Growth Stats</h2><button onClick={() => setModal({ title: "Growth Analytics", description: "This opens a simulated analytics view for EXP, NS earned, predictions, and streaks." })} className="text-purple-300">View Analytics</button></div><div className="mt-4 flex gap-2">{["7D", "30D", "90D", "All"].map((tab, i) => <button key={tab} className={`rounded-lg px-4 py-2 sm:px-6 ${i === 1 ? "bg-neon/30" : "bg-white/5"}`}>{tab}</button>)}</div><MiniLine data={roiData} color="#a855f7" height={210} /><div className="grid grid-cols-3 gap-3 text-center"><b className="text-mint">+{Math.max(5480, userExp - user.exp)}<br />EXP</b><b className="text-mint">+{Math.max(2340, nsBalance - 12450)}<br />NS</b><b>+{predictions.length + 42}<br />Predictions</b></div></GlassCard>
      </section>

      <GlassCard className="mt-5 grid gap-5 p-6 lg:grid-cols-[1fr_260px]">
        <div><h2 className="text-2xl font-bold">More Ways to Grow</h2><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">{[Flame, Users, Heart, TrendingUp, Crown].map((Icon, i) => <button key={i} onClick={() => petAction(["Prediction Streak", "Community Quests", "Creator Support", "Market Maker", "Governance"][i], "NEX reacted to your growth action.", { exp: pet.exp + 3, mood: "Motivated" })} className="text-left"><GlassCard className="interactive-glow p-5 text-center"><Icon className="mx-auto mb-3 h-10 w-10 text-neon" />{["Prediction Streak", "Community Quests", "Creator Support", "Market Maker", "Governance"][i]}</GlassCard></button>)}</div></div>
        <GlassCard className="bg-neon/15 p-6"><h2 className="text-2xl font-bold">Invite Friends</h2><p className="mt-2 text-slate-300">Earn 20% from their earnings.</p><button onClick={() => setModal({ title: "Invite Friends", description: "Referral tools help users invite friends, grow communities, and track network contribution." })} className="purple-button mt-6 rounded-xl px-6 py-3">Invite Now</button></GlassCard>
      </GlassCard>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-slate-200">NEXNS records product progress without initiating payments, wallet actions, or token transfers.</div>
      </PreviewModal>
    </AppShell>
  );
}
