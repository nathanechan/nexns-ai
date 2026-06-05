import {
  ArrowRight,
  Bell,
  Bot,
  CandlestickChart,
  Clock,
  Flame,
  Gift,
  Radio,
  Rocket,
  Search,
  ShieldCheck,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreatorCard } from "../components/cards/CreatorCard";
import { MarketCard } from "../components/cards/MarketCard";
import { ProjectCard } from "../components/cards/ProjectCard";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { ActivityFeed } from "../components/ui/ActivityFeed";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { PreviewModal } from "../components/ui/PreviewModal";
import { roiData } from "../data/previewData";
import { useLivePreviewData } from "../hooks/useLivePreviewData";
import { useProductState } from "../state/productState";
import { toSlug } from "../utils/slug";

const marketTabs = ["Crypto", "AI", "Meme", "DeFi", "GameFi", "RWA", "Social"];
const timeframes = ["5M", "15M", "30M", "1H", "4H", "24H"];

export function HomePage() {
  const navigate = useNavigate();
  const { markets, creators, projects, btc } = useLivePreviewData();
  const { followedCreators, watchedProjects, pet, predictions, claimTask } = useProductState();
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);
  const featuredMarket = markets[0];

  const hotContracts = Array.from({ length: 20 }, (_, index) => {
    const market = markets[index % markets.length];
    return {
      ...market,
      rank: index + 1,
      volume: `$${(6.8 - index * 0.18).toFixed(2)}M`,
      trades: `${(42.6 - index * 1.1).toFixed(1)}K`,
    };
  });

  return (
    <AppShell>
      <section className="grid gap-5 2xl:grid-cols-[1.45fr_0.75fr]">
        <GlassCard className="relative overflow-hidden p-0">
          <div className="border-b border-white/10 p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="nex-label">Prediction Trading Terminal</div>
                <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
                  Trade the probability of <span className="text-gradient">crypto markets.</span>
                </h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                  NEXNS starts as a crypto prediction exchange: users predict short-term market outcomes, creators publish signals, projects activate campaigns, and NEX turns participation into growth.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link to="/prediction" className="purple-button interactive-glow inline-flex items-center gap-3 rounded-xl px-6 py-4 font-semibold">
                  Trade Prediction <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/community" className="interactive-glow inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-semibold">
                  Market Feed <Radio className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="mt-5 flex gap-2 overflow-x-auto">
              {marketTabs.map((tab, index) => (
                <button key={tab} className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold ${index === 0 ? "bg-neon/25 text-white shadow-glow" : "bg-white/5 text-slate-300 hover:text-white"}`}>
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-0 xl:grid-cols-[1fr_320px]">
            <div className="p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-400/15 text-orange-300">
                      <CandlestickChart className="h-6 w-6" />
                    </span>
                    <div>
                      <h2 className="text-3xl font-black">{featuredMarket.pair}</h2>
                      <div className="mt-1 text-sm text-slate-400">Crypto prediction market · Simulated market data</div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap items-end gap-4">
                    <span className="text-5xl font-black tracking-tight">${featuredMarket.price}</span>
                    <span className="mb-2 rounded-full bg-mint/15 px-3 py-1 text-sm font-bold text-mint">{featuredMarket.change} 24H</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {timeframes.slice(0, 6).map((time, index) => (
                    <button key={time} onClick={() => navigate(`/prediction?market=${featuredMarket.symbol}&time=${time}`)} className={`rounded-xl px-3 py-2 text-sm font-semibold ${index === 3 ? "bg-neon/30 text-white" : "bg-white/5 text-slate-300"}`}>
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[28px] border border-white/10 bg-slate-950/50 p-4">
                <MiniLine data={featuredMarket.data} color="#22d3ee" height={250} />
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {[
                  ["24H Volume", "$28.41M", TrendingUp],
                  ["Participants", `${btc.participants?.toLocaleString()}+`, Users],
                  ["Prize Pool", featuredMarket.pool, Gift],
                  ["Settlement", "00:45:32", Clock],
                ].map(([label, value, Icon]) => (
                  <GlassCard key={label as string} className="interactive-glow p-4">
                    <Icon className="mb-3 h-5 w-5 text-cyan" />
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{label as string}</div>
                    <div className="mt-2 text-xl font-black">{value as string}</div>
                  </GlassCard>
                ))}
              </div>
            </div>

            <div className="border-t border-white/10 p-5 xl:border-l xl:border-t-0">
              <h2 className="text-xl font-black">Prediction Ticket</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">Will {featuredMarket.symbol} price close UP or DOWN in the selected window?</p>
              <div className="mt-5 grid gap-3">
                <button onClick={() => navigate(`/prediction?market=${featuredMarket.symbol}&side=UP`)} className="interactive-glow rounded-[22px] border border-mint/30 bg-mint/12 p-5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3 text-3xl font-black text-mint"><TrendingUp /> UP</span>
                    <span className="text-xl font-black">{featuredMarket.up}%</span>
                  </div>
                  <div className="mt-4 text-sm text-slate-300">Odds 1.72x · Pool {featuredMarket.pool}</div>
                </button>
                <button onClick={() => navigate(`/prediction?market=${featuredMarket.symbol}&side=DOWN`)} className="interactive-glow rounded-[22px] border border-rose-400/30 bg-rose-500/12 p-5 text-left">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-3 text-3xl font-black text-rose-300"><TrendingDown /> DOWN</span>
                    <span className="text-xl font-black">{featuredMarket.down}%</span>
                  </div>
                  <div className="mt-4 text-sm text-slate-300">Odds 2.25x · Pool $1.78M</div>
                </button>
              </div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Reward Preview</div>
                <div className="mt-2 text-3xl font-black text-mint">172 NS</div>
                <div className="mt-1 text-sm text-slate-400">For a 100 NS prediction at 1.72x</div>
              </div>
            </div>
          </div>
        </GlassCard>

        <aside className="grid h-fit gap-5">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Live Market Pulse</h2>
              <span className="rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">Open</span>
            </div>
            <div className="mt-5 grid gap-3">
              {markets.slice(0, 5).map((market) => (
                <button key={market.symbol} onClick={() => navigate(`/prediction?market=${market.symbol}`)} className="interactive-glow flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
                  <span>
                    <b>{market.pair}</b>
                    <br />
                    <span className="text-xs text-slate-400">{market.users} traders · {market.pool}</span>
                  </span>
                  <span className="text-right">
                    <b className="text-mint">{market.change}</b>
                    <br />
                    <span className="text-xs text-slate-400">UP {market.up}%</span>
                  </span>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-xl font-black">Creator Signals</h2>
            <div className="mt-4 grid gap-3">
              {creators.slice(0, 4).map((creator, index) => (
                <button key={creator.name} onClick={() => navigate(`/creator/${toSlug(creator.name)}`)} className="interactive-glow flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 text-left">
                  <span className="flex items-center gap-3">
                    <img src={creator.avatar} alt="" className="h-10 w-10 rounded-full border border-neon/30" />
                    <span>
                      <b>{creator.name}</b>
                      <br />
                      <span className="text-xs text-slate-400">{index % 2 ? "ETH call live" : "BTC signal live"}</span>
                    </span>
                  </span>
                  <span className="text-mint">{creator.roi}</span>
                </button>
              ))}
            </div>
          </GlassCard>
        </aside>
      </section>

      <GlassCard className="mt-5 overflow-hidden p-0">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 p-5">
          <div>
            <h2 className="text-xl font-black"><Flame className="mr-2 inline h-5 w-5 text-orange-400" />Trending Prediction Markets</h2>
            <p className="mt-1 text-sm text-slate-300">High-volume crypto markets now. Project, creator, and real-world markets expand from the same prediction layer.</p>
          </div>
          <Link to="/prediction" className="text-sm font-semibold text-purple-300 hover:text-white">Trade All</Link>
        </div>
        <div className="relative overflow-hidden py-4">
          <div className="nex-marquee flex w-max gap-3 px-5">
            {[...hotContracts, ...hotContracts].map((market, index) => (
              <button
                key={`${market.symbol}-${index}`}
                type="button"
                onClick={() => navigate(`/prediction?market=${market.symbol}`)}
                className="interactive-glow flex w-[260px] shrink-0 items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left"
              >
                <span>
                  <span className="text-xs text-slate-400">#{market.rank} · {market.trades} trades</span>
                  <br />
                  <b>{market.pair}</b>
                  <br />
                  <span className="text-sm text-slate-400">Volume {market.volume}</span>
                </span>
                <span className="text-right">
                  <b className="text-mint">{market.change}</b>
                  <br />
                  <span className="text-xs text-slate-400">UP {market.up}%</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.45fr_0.85fr]">
        <GlassCard className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black"><TrendingUp className="mr-2 inline text-cyan" />Crypto Prediction Board</h2>
            <Link to="/prediction" className="text-purple-300 hover:text-white">View All</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {markets.slice(0, 4).map((market) => (
              <MarketCard key={market.symbol} market={market} onClick={() => navigate(`/prediction?market=${market.symbol}`)} />
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black"><Radio className="mr-2 inline text-neon" />Signal Rooms</h2>
            <Link to="/community" className="text-purple-300 hover:text-white">Open Plaza</Link>
          </div>
          <div className="grid gap-3">
            {["BTC Next Move", "ETH Volatility", "SOL Breakout", "NEX Launch Signals"].map((room, index) => (
              <button key={room} onClick={() => navigate("/community")} className="interactive-glow flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                <span>
                  <b>{room}</b>
                  <br />
                  <span className="text-xs text-slate-400">{(1.2 + index * 0.7).toFixed(1)}K online · live debate</span>
                </span>
                <ArrowRight className="h-4 w-4 text-neon" />
              </button>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
        <GlassCard className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black"><Rocket className="mr-2 inline text-neon" />Create New Market</h2>
            <Link to="/create" className="text-purple-300 hover:text-white">Create</Link>
          </div>
          <div className="grid gap-3">
            {[
              ["Crypto Market", "BTC, ETH, SOL, NEX short-window predictions", Target],
              ["Project Campaign", "Create a project market and reward tasks", Rocket],
              ["Creator Signal", "Launch a creator-led prediction room", Users],
              ["Expanded Category", "Sports, politics, RWA, events and more", ShieldCheck],
            ].map(([title, copy, Icon]) => (
              <button key={title as string} onClick={() => navigate("/create")} className="interactive-glow flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                <span className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-cyan" />
                  <span>
                    <b>{title as string}</b>
                    <br />
                    <span className="text-xs text-slate-400">{copy as string}</span>
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-neon" />
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-black"><Star className="mr-2 inline text-amber-300" />Top Market Creators</h2>
            <Link to="/creator" className="text-purple-300 hover:text-white">Creator Arena</Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {creators.map((creator, i) => (
              <div key={creator.name} className="relative">
                <CreatorCard creator={creator} rank={i + 1} onClick={() => navigate(`/creator/${toSlug(creator.name)}`)} />
                {followedCreators.includes(creator.name) && <span className="absolute right-3 top-3 rounded-full bg-neon/25 px-2 py-1 text-xs text-purple-100">Following</span>}
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.75fr_0.75fr]">
        <GlassCard className="p-5">
          <h2 className="text-xl font-black"><Zap className="mr-2 inline text-amber-300" />Trading Missions</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {["Make one crypto prediction", "Follow one market creator", "Join one signal room", "Train NEX companion"].map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => index === 0 ? navigate("/prediction") : index === 1 ? navigate("/creator") : index === 2 ? navigate("/community") : navigate("/pet")}
                className="interactive-glow flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left"
              >
                <span>{item}</span>
                <ArrowRight className="h-4 w-4 text-neon" />
              </button>
            ))}
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-xl font-black">Account Edge</h2>
          <MiniLine data={roiData} color="#a855f7" height={170} />
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-xl font-black">NEX Assistant</h2>
          <button type="button" onClick={() => navigate("/pet")} className="interactive-glow mt-4 flex w-full items-center gap-4 rounded-2xl border border-neon/25 bg-neon/10 p-4 text-left">
            <Mascot variant="thinking" className="w-20" />
            <span>
              <b>Pet Home</b>
              <br />
              <span className="text-sm text-slate-300">Energy {pet.energy}/100 · Bond {pet.bond}/100</span>
            </span>
          </button>
          <button type="button" onClick={() => claimTask("Trading Mission Reward", "+20 NS")} className="interactive-glow mt-3 w-full rounded-xl bg-white/5 py-3 font-semibold">
            Claim Trading Reward
          </button>
        </GlassCard>
      </section>

      <div className="mt-5">
        <ActivityFeed compact />
      </div>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-slate-200">
          No wallet, payment, prediction execution, or blockchain transaction is performed.
        </div>
      </PreviewModal>
    </AppShell>
  );
}
