import { ArrowRight, Crown, MessageCircle, Search, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreatorCard } from "../components/cards/CreatorCard";
import { DonutChart } from "../components/charts/DonutChart";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { PreviewModal } from "../components/ui/PreviewModal";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { markets, revenueData, roiData } from "../data/previewData";
import { useLivePreviewData } from "../hooks/useLivePreviewData";
import { useProductState } from "../state/productState";
import { toSlug } from "../utils/slug";

export function CreatorPage() {
  const { creators } = useLivePreviewData();
  const { followedCreators, followCreator, joinCreatorCommunity } = useProductState();
  const navigate = useNavigate();
  const lead = creators[0];
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);

  return (
    <AppShell>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_.9fr]">
        <div>
          <div className="glass mb-6 flex max-w-md items-center gap-3 rounded-xl px-4 py-3 text-slate-400"><Search className="h-5 w-5" />Search creators, topics, markets...</div>
          <h1 className="text-4xl font-black md:text-5xl">Creator <span className="text-gradient">Arena</span></h1>
          <p className="mt-3 text-2xl font-bold text-gradient md:text-3xl">Follow The Smartest Minds</p>
          <p className="mt-3 text-lg text-slate-300">Insights today, profits tomorrow.</p>
        </div>
        <GlassCard className="soft-grid relative min-h-48 overflow-hidden p-6">
          <div className="ml-auto h-44 max-w-md rounded-full bg-neon/20 blur-2xl" />
          <Mascot variant="creator" className="absolute bottom-0 right-8 w-52" />
        </GlassCard>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">{["All", "Top", "Following", "BTC", "ETH", "SOL", "AI", "Meme", "RWA", "GameFi", "DeFi"].map((tab, i) => <button key={tab} onClick={() => setModal({ title: `${tab} Creators`, description: "Creator filters help you explore ranked insights, communities, and market specialists." })} className={`interactive-glow rounded-lg border border-white/10 px-5 py-2 ${i === 0 ? "bg-neon" : "bg-white/5"}`}>{tab}</button>)}</div>

      <GlassCard className="mt-5 p-5">
        <div className="mb-4 flex justify-between"><h2 className="text-xl font-semibold">Featured Creators</h2><button onClick={() => setModal({ title: "All Creators", description: "This would open the complete creator leaderboard with simulated rankings and ROI." })} className="text-purple-300">View All</button></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{creators.map((creator, i) => <div key={creator.name} className="relative"><CreatorCard creator={creator} rank={i + 1} onClick={() => navigate(`/creator/${toSlug(creator.name)}`)} />{followedCreators.includes(creator.name) && <span className="absolute right-3 top-3 rounded-full bg-neon/25 px-2 py-1 text-xs text-purple-100">Following</span>}</div>)}</div>
      </GlassCard>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_.9fr]">
        <GlassCard className="p-6">
          <div className="grid gap-6 sm:grid-cols-[170px_1fr]">
            <img src={lead.avatar} alt="" className="h-40 w-40 rounded-full bg-neon/20 ring-4 ring-neon" />
            <div><h2 className="text-3xl font-bold">{lead.name}</h2><div className="mt-2"><span className="rounded-full bg-white/10 px-3 py-1">Lv.{lead.level}</span> <span className="rounded-full bg-neon/20 px-3 py-1 text-purple-200">Legend</span></div><p className="mt-5 max-w-xl leading-7 text-slate-300">10+ years in crypto. Focus on global macro trends and on-chain data. Building high-conviction predictions with disciplined risk management.</p></div>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-4">{["24,850 NS Total Earnings", "1,248 Predictions", `${lead.winRate} Win Rate`, "12.3K Community"].map((item) => <GlassCard key={item} className="interactive-glow p-4 text-center font-semibold">{item}</GlassCard>)}</div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button onClick={() => followCreator(lead.name)} className="interactive-glow rounded-xl bg-neon/20 py-3 font-semibold">{followedCreators.includes(lead.name) ? "Following" : "Follow Creator"}</button>
            <button onClick={() => joinCreatorCommunity(lead.name)} className="interactive-glow rounded-xl border border-white/10 bg-white/5 py-3 font-semibold">Join Community</button>
          </div>
          <div className="mt-6 grid gap-3">
            {markets.slice(0, 4).map((market) => <button key={market.symbol} onClick={() => setModal({ title: `${market.symbol} Creator Call`, description: `${market.pair} creator insight with confidence, timing, and community response. This action does not initiate external financial activity.` })} className="interactive-glow flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left"><div><b>{market.pair}</b><p className="text-sm text-slate-400">Will {market.symbol} price go UP in the next 4 hours?</p></div><div className="text-right"><div className="font-bold text-mint">UP</div><span className="rounded-full bg-mint/10 px-3 py-1 text-xs text-mint">Won</span></div></button>)}
          </div>
        </GlassCard>
        <div className="grid gap-5">
          <GlassCard className="p-6"><h2 className="text-xl font-semibold">Creator Earnings</h2><div className="grid items-center sm:grid-cols-2"><DonutChart data={revenueData} /><div>{revenueData.map((item) => <div key={item.name} className="mb-3 flex justify-between text-sm"><span style={{ color: item.fill }}>{item.name}</span><b>{item.value}%</b></div>)}</div></div><button onClick={() => setModal({ title: "Creator Earnings Analytics", description: "Revenue analytics are simulated across prediction revenue, project campaigns, community rewards, and advertising." })} className="interactive-glow mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-neon/15 py-3">View Earnings Analytics <ArrowRight className="h-4 w-4" /></button></GlassCard>
          <GlassCard className="p-6"><h2 className="text-xl font-semibold">Creator Growth Path</h2><div className="mt-5 flex justify-between">{["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Legend"].map((lvl, i) => <div key={lvl} className="text-center text-xs"><Crown className={`mx-auto ${i >= 4 ? "text-neon" : "text-slate-500"}`} />{lvl}</div>)}</div><div className="mt-5 h-2 rounded-full bg-white/10"><span className="block h-full w-[72%] rounded-full bg-neon" /></div></GlassCard>
          <GlassCard className="p-6"><h2 className="text-xl font-semibold">Top Supporters</h2>{["Web3Legend", "MoonWalker", "DeFiMax", "ChainHunter", "TradeGuru"].map((name, i) => <button key={name} onClick={() => joinCreatorCommunity(lead.name)} className="flex w-full justify-between border-t border-white/10 py-3 text-left"><span className="flex items-center gap-2"><Users className="h-4 w-4 text-neon" />{name}</span><b>{2450 - i * 390} NS</b></button>)}</GlassCard>
        </div>
      </section>

      <GlassCard className="mt-5 p-6"><h2 className="text-xl font-semibold">Community <span className="ml-3 text-sm text-slate-400">12.3K Members · 532 Online</span></h2><div className="mt-4 grid gap-3 md:grid-cols-3">{["Great analysis on BTC macro trend.", "Your ETH call was spot on!", "Can you share more about SOL prediction model?"].map((text) => <GlassCard key={text} className="interactive-glow p-4"><MessageCircle className="mb-3 text-cyan" />{text}</GlassCard>)}</div></GlassCard>
      <GlassCard className="mt-5 flex flex-wrap items-center justify-between gap-5 p-8"><div><h2 className="text-3xl font-bold">Become a Creator</h2><p className="mt-2 text-slate-300">Share insights. Build influence. Earn rewards.</p></div><button onClick={() => setModal({ title: "Become a Creator", description: "Creator onboarding introduces publishing, community, and campaign paths. No payment or wallet action is initiated." })} className="purple-button rounded-xl px-8 py-4 font-semibold">Start Your Journey</button><MiniLine data={roiData} color="#8b5cf6" /></GlassCard>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-neon/20 bg-neon/10 p-4 text-sm text-slate-200">Creator data reflects NEXNS market intelligence and ecosystem activity.</div>
      </PreviewModal>
    </AppShell>
  );
}
