import { ArrowLeft, BadgeCheck, Bell, Crown, Heart, MessageCircle, Share2, ShieldCheck, Sparkles, Star, Trophy, Users, Zap } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CreatorCard } from "../components/cards/CreatorCard";
import { DonutChart } from "../components/charts/DonutChart";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { markets, revenueData, roiData } from "../data/previewData";
import { useLivePreviewData } from "../hooks/useLivePreviewData";
import { useProductState } from "../state/productState";
import { fromSlug, toSlug } from "../utils/slug";

const creatorBadges = ["Prediction Master", "Top Creator", "100K+ Followers", "Season Champion", "Legend Rank", "High Accuracy", "Trend Hunter", "Community Builder"];

export function CreatorProfilePage() {
  const { creatorId } = useParams();
  const { creators } = useLivePreviewData();
  const { followedCreators, joinedCreatorCommunities, followCreator, joinCreatorCommunity, addActivity } = useProductState();
  const creator = creators.find((item) => toSlug(item.name) === creatorId) ?? creators.find((item) => item.name.toLowerCase().includes(fromSlug(creatorId))) ?? creators[0];

  return (
    <AppShell>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <Link to="/creator" className="interactive-glow flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
          <ArrowLeft className="h-5 w-5" /> Creator Arena
        </Link>
        <div className="flex gap-3">
          <button onClick={() => followCreator(creator.name)} className="interactive-glow rounded-xl border border-pink-400/40 bg-pink-500/10 px-5 py-3 font-semibold text-pink-100"><Heart className="mr-2 inline h-5 w-5" />{followedCreators.includes(creator.name) ? "Following" : "Follow"}</button>
          <button onClick={() => joinCreatorCommunity(creator.name)} className="purple-button interactive-glow rounded-xl px-5 py-3 font-semibold"><Users className="mr-2 inline h-5 w-5" />{joinedCreatorCommunities.includes(creator.name) ? "Joined" : "Join Community"}</button>
        </div>
      </div>

      <section className="grid gap-5 xl:grid-cols-[1fr_380px]">
        <GlassCard className="nex-stage relative min-h-[680px] overflow-hidden p-5 md:p-8">
          <div className="absolute left-1/2 top-8 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-neon/20 blur-3xl" />
          <div className="absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-cyan/20 bg-cyan/5" />
          <div className="absolute bottom-20 left-1/2 h-32 w-[580px] -translate-x-1/2 rounded-[50%] border border-neon/50 nex-platform" />

          <div className="relative z-10 grid min-h-[620px] gap-6 lg:grid-cols-[290px_1fr_290px]">
            <div className="flex flex-col justify-between gap-4">
              <GlassCard className="interactive-glow p-5">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Creator Overview</div>
                <img src={creator.avatar} alt="" className="mt-5 h-32 w-32 rounded-full bg-neon/20 ring-4 ring-neon shadow-glow" />
                <h2 className="mt-4 text-2xl font-bold">{creator.name}</h2>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-neon/20 px-4 py-2 text-sm text-purple-100"><BadgeCheck className="h-4 w-4" />Verified Creator</div>
              </GlassCard>
              <GlassCard className="interactive-glow p-5">
                <div className="flex items-center justify-between"><span>Followers</span><b className="text-2xl">{creator.followers}</b></div>
                <div className="mt-4 flex items-center justify-between"><span>Win Rate</span><b className="text-2xl">{creator.winRate}</b></div>
                <div className="mt-4 flex items-center justify-between"><span>ROI</span><b className="text-2xl text-mint">{creator.roi}</b></div>
              </GlassCard>
            </div>

            <div className="relative flex min-h-[610px] flex-col items-center justify-start text-center">
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan">Creator Profile</div>
              <h1 className="mt-2 text-5xl font-black md:text-7xl">{creator.name}</h1>
              <p className="mt-3 text-2xl font-semibold text-gradient">Lead. Inspire. Earn.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {["BTC Expert", "Trend Setter", "High Accuracy", "Top 1%"].map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-purple-100">{tag}</span>)}
              </div>
              <Mascot variant="creator" className="absolute bottom-12 left-1/2 z-10 w-[min(620px,95vw)] -translate-x-1/2 drop-shadow-[0_0_70px_rgba(139,92,246,.9)]" />
              <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 rounded-xl border border-neon/50 bg-slate-950/85 px-8 py-3 text-2xl font-bold shadow-glow">Creator NEX</div>
              <GlassCard className="absolute left-4 top-40 hidden max-w-48 rotate-[-4deg] p-4 text-left md:block"><Sparkles className="mb-2 text-cyan" />Live Accuracy<br /><b className="text-2xl text-mint">78.6%</b></GlassCard>
              <GlassCard className="absolute right-4 top-52 hidden max-w-48 rotate-[4deg] p-4 text-left md:block"><Users className="mb-2 text-neon" />Community<br /><b className="text-2xl">59.4K</b></GlassCard>
            </div>

            <div className="flex flex-col justify-between gap-4">
              {[
                ["Prediction Accuracy", "78.6%", ShieldCheck],
                ["Total Revenue", "245,780 NS", Trophy],
                ["Influence Score", "9,245", Star],
                ["Community Growth", "+18.9K", Users],
              ].map(([label, value, Icon], index) => (
                <GlassCard key={String(label)} className="interactive-glow p-5">
                  <div className="flex items-center justify-between gap-3"><Icon className="h-6 w-6 text-neon" /><b className="text-xl">{String(value)}</b></div>
                  <div className="mt-2 text-sm text-slate-300">{String(label)}</div>
                  <div className="mt-3 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-gradient-to-r from-neon to-cyan" style={{ width: `${82 - index * 7}%` }} /></div>
                </GlassCard>
              ))}
            </div>
          </div>
        </GlassCard>

        <div className="grid gap-5">
          <GlassCard className="p-5">
            <h2 className="text-xl font-semibold">Creator Metrics</h2>
            {[
              ["Prediction Accuracy", "78.6%", "Top 9%"],
              ["Total Revenue", "245,780 NS", "+32.5%"],
              ["Influence Score", "9,245", "Top 8%"],
              ["Community Growth", "+18.9K", "+15.3%"],
            ].map(([label, value, note], index) => (
              <div key={label} className="border-t border-white/10 py-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-300">{label}</span><b className="text-xl">{value}</b>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-gradient-to-r from-neon to-cyan" style={{ width: `${78 - index * 8}%` }} /></div>
                <div className="mt-1 text-right text-xs text-mint">{note}</div>
              </div>
            ))}
          </GlassCard>
          <GlassCard className="p-5">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[[Heart, followedCreators.includes(creator.name) ? "Following" : "Follow"], [MessageCircle, "Message"], [Share2, "Share"], [Bell, "Alerts"]].map(([Icon, label]) => <button key={String(label)} onClick={() => String(label).includes("Follow") ? followCreator(creator.name) : addActivity({ type: "creator", title: `${String(label)} ${creator.name}`, detail: "Creator action recorded in the activity feed." })} className="interactive-glow rounded-xl border border-white/10 bg-white/5 p-4"><Icon className="mx-auto mb-2 text-neon" />{String(label)}</button>)}
            </div>
          </GlassCard>
        </div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Performance Overview</h2><span className="rounded-full bg-neon/20 px-3 py-1 text-sm text-purple-100">90 Days</span></div>
          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            {["Total ROI +145.3%", "Win Rate 68.7%", "Avg. Accuracy 72.4%", "Max Drawdown -8.2%"].map((item) => <GlassCard key={item} className="p-4 font-semibold">{item}</GlassCard>)}
          </div>
          <MiniLine data={roiData} color="#d946ef" height={260} />
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold">Revenue Dashboard</h2>
          <div className="grid items-center gap-4 sm:grid-cols-2">
            <DonutChart data={revenueData} />
            <div>{revenueData.map((item) => <div key={item.name} className="mb-4 flex justify-between text-sm"><span style={{ color: item.fill }}>{item.name}</span><b>{item.value}%</b></div>)}</div>
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_380px]">
        <GlassCard className="p-5">
          <div className="mb-4 flex justify-between"><h2 className="text-xl font-semibold">Latest Predictions</h2><button className="text-purple-300">View All</button></div>
          <div className="grid gap-3">
            {markets.slice(0, 4).map((market, index) => (
              <GlassCard key={market.symbol} className="interactive-glow grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
                <span className="grid h-12 w-12 place-items-center rounded-full text-lg font-bold" style={{ backgroundColor: `${market.color}22`, color: market.color }}>{market.symbol[0]}</span>
                <div><b>{market.pair}</b><p className="text-sm text-slate-400">{index % 2 ? "DOWN" : "UP"} call · Confidence {82 - index * 5}%</p></div>
                <MiniLine data={market.data} color={index % 2 ? "#ff4e6d" : "#20f29b"} height={54} />
              </GlassCard>
            ))}
          </div>
        </GlassCard>
        <div className="grid gap-5">
          <GlassCard className="p-5">
            <h2 className="text-xl font-semibold">Achievement Badges</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {creatorBadges.map((badge, index) => <div key={badge} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center text-sm"><Star className={`mx-auto mb-2 ${index < 4 ? "text-amber-300" : "text-neon"}`} />{badge}</div>)}
            </div>
          </GlassCard>
          <GlassCard className="p-5">
            <h2 className="text-xl font-semibold">Creator Level System</h2>
            <div className="mt-4 flex justify-between text-xs">{["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Legend"].map((level, index) => <div key={level} className="text-center"><Crown className={`mx-auto ${index === 5 ? "text-neon" : "text-slate-500"}`} />{level}</div>)}</div>
            <div className="mt-5 h-2 rounded-full bg-white/10"><span className="block h-full w-[87%] rounded-full bg-gradient-to-r from-neon to-cyan" /></div>
            <p className="mt-2 text-sm text-slate-300">42,750 / 50,000 XP to Legend+</p>
          </GlassCard>
        </div>
      </section>

      <GlassCard className="mt-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-bold">Community Section</h2><span className="text-gradient text-3xl font-black">59.4K</span></div>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {["Discord 12.4K", "Telegram 8.7K", "X 32.1K", "YouTube 6.2K"].map((item) => <GlassCard key={item} className="interactive-glow p-4"><Users className="mb-3 text-cyan" />{item}<button onClick={() => joinCreatorCommunity(creator.name)} className="mt-3 w-full rounded-lg bg-neon/20 py-2">{joinedCreatorCommunities.includes(creator.name) ? "Joined" : "Join"}</button></GlassCard>)}
        </div>
      </GlassCard>
    </AppShell>
  );
}
