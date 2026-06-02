import { ArrowDown, ArrowUp, BarChart3, Clock, HelpCircle, Lock, Star, Trophy, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { PreviewModal } from "../components/ui/PreviewModal";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { useLivePreviewData } from "../hooks/useLivePreviewData";
import { useProductState } from "../state/productState";

const tabs = ["BTC", "ETH", "SOL", "BNB", "NEX", "Projects"];
const frames = ["5M", "15M", "30M", "1H", "4H", "24H"];

export function PredictionPage() {
  const [params] = useSearchParams();
  const [active, setActive] = useState(params.get("market") ?? "BTC");
  const [amount, setAmount] = useState(100);
  const [selectedDirection, setSelectedDirection] = useState<"UP" | "DOWN">("UP");
  const [modal, setModal] = useState<{ title: string; description: string; predictionId?: string } | null>(null);
  const { markets } = useLivePreviewData();
  const { createPrediction, settlePrediction, predictions, seasonPoints, pet } = useProductState();
  const market = useMemo(() => markets.find((item) => item.symbol === active) ?? markets[0], [active, markets]);
  const poolNumber = Number(market.pool.replace(/[$MK]/g, ""));

  return (
    <AppShell>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><h1 className="text-4xl font-black">Prediction</h1><p className="mt-2 text-slate-300">Where insights become profit.</p></div>
        <button onClick={() => setModal({ title: "How to Predict", description: "Choose a market, select a timeframe, then tap UP or DOWN to record a prediction signal. This does not initiate a wallet action, payment, or blockchain transaction." })} className="interactive-glow flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3"><HelpCircle className="h-5 w-5 text-neon" />How to Predict</button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {tabs.map((tab) => <button key={tab} onClick={() => setActive(tab)} className={`interactive-glow rounded-xl border px-4 py-4 text-lg font-semibold sm:px-5 sm:py-5 sm:text-xl ${active === tab ? "border-neon bg-neon/25 shadow-glow" : "border-white/10 bg-white/5"}`}>{tab}</button>)}
      </div>

      <GlassCard className="mt-5 grid gap-5 overflow-hidden p-5 lg:grid-cols-[1.4fr_.7fr] lg:p-6">
        <button type="button" onClick={() => setModal({ title: `${market.symbol} Market Detail`, description: `${market.symbol} updates with live-style price movement, sentiment ratios, participants, and prize pool activity.` })} className="relative min-h-[300px] text-left">
          <div className="relative z-10">
            <div className="text-2xl font-semibold">{market.symbol} <span className="text-slate-400">/ USDT</span></div>
            <div className="mt-4 text-4xl font-black sm:text-5xl">{market.price}</div>
            <div className="mt-2 text-xl text-mint">{market.change} (24h) rising</div>
            <MiniLine data={market.data} color="#20f29b" height={140} />
            <div className="mt-4 grid max-w-xl grid-cols-3 gap-4 text-sm"><span>24h High<br /><b>68,845.12</b></span><span>24h Low<br /><b>66,712.45</b></span><span>24h Volume<br /><b>$28.41B</b></span></div>
          </div>
          <div className="absolute bottom-0 right-4 hidden h-72 w-72 rounded-full border border-neon/40 bg-neon/10 blur-sm lg:block" />
        </button>
        <GlassCard className="p-5">
          <h2 className="text-lg font-semibold">Market Sentiment</h2>
          <div className="mt-8 flex items-center justify-around">
            <div className="text-center"><div className="text-3xl font-black text-mint">{market.up}%</div><div className="text-sm text-mint">UP</div></div>
            <div className="grid h-28 w-28 place-items-center rounded-full border-[16px] border-mint border-r-danger bg-white/5" />
            <div className="text-center"><div className="text-3xl font-black text-danger">{market.down}%</div><div className="text-sm text-danger">DOWN</div></div>
          </div>
          <div className="mt-8 border-t border-white/10 pt-5 text-slate-300">Total Participants<br /><b className="text-2xl text-white">{market.participants?.toLocaleString() ?? "24,856"}</b></div>
          <button onClick={() => setModal({ title: "Market Analytics", description: "This analytics panel previews sentiment, participants, and pool movement using simulated live data only." })} className="interactive-glow mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-neon/20 py-4"><BarChart3 />Market Analytics</button>
        </GlassCard>
      </GlassCard>

      <GlassCard className="mt-5 flex flex-wrap items-center justify-between gap-4 p-5">
        <div><div className="text-slate-300">Select Timeframe</div><div className="mt-3 flex flex-wrap gap-3">{frames.map((frame) => <button key={frame} className={`interactive-glow rounded-lg border border-white/10 px-5 py-3 sm:px-8 ${frame === "1H" ? "bg-neon/35 text-white" : "bg-white/5 text-slate-300"}`}>{frame}</button>)}</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-center"><Clock className="mx-auto mb-1 text-neon" />Settlement in<br /><b className="text-2xl">00:45:32</b></div>
      </GlassCard>

      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex flex-wrap justify-between gap-4"><h2 className="text-xl sm:text-2xl">Will <b className="text-orange-300">{market.symbol}</b> price go <b className="text-mint">UP</b> or <b className="text-danger">DOWN</b> in the next 1 hour?</h2><button onClick={() => setModal({ title: "Rules", description: "Prediction signals build progress, rewards, and companion growth inside NEXNS. No betting, payment, wallet connection, or blockchain transaction is initiated." })} className="rounded-xl border border-white/10 px-4">Rules</button></div>
        <div className="mt-7 grid items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
          <button onClick={() => setSelectedDirection("UP")} className={`interactive-glow rounded-[26px] border border-mint bg-mint/10 p-8 text-center ${selectedDirection === "UP" ? "shadow-cyan" : ""}`}><ArrowUp className="mx-auto h-16 w-16 rounded-full border border-mint p-3 text-mint" /><div className="mt-4 text-5xl font-black text-mint">UP</div><p>{market.up}% of users</p><div className="mt-5 border-t border-white/10 pt-4 text-xl">Odds 1.72x</div></button>
          <div className="text-center text-5xl font-black text-gradient lg:text-6xl">VS</div>
          <button onClick={() => setSelectedDirection("DOWN")} className={`interactive-glow rounded-[26px] border border-danger bg-danger/10 p-8 text-center ${selectedDirection === "DOWN" ? "shadow-glow" : ""}`}><ArrowDown className="mx-auto h-16 w-16 rounded-full border border-danger p-3 text-danger" /><div className="mt-4 text-5xl font-black text-danger">DOWN</div><p>{market.down}% of users</p><div className="mt-5 border-t border-white/10 pt-4 text-xl">Odds 2.25x</div></button>
        </div>
        <div className="mx-auto mt-4 max-w-xs rounded-full border border-neon/50 bg-[#17113a] px-6 py-3 text-center shadow-glow lg:-mt-3">Balance <b>1,245 NS</b></div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <GlassCard className="p-4"><div className="text-slate-300">Select Amount</div><div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">{[10, 50, 100, 500, 1000, 1245].map((value) => <button key={value} onClick={() => setAmount(value)} className={`rounded-lg border border-white/10 py-3 ${amount === value ? "bg-neon/45" : "bg-white/5"}`}>{value === 1245 ? "MAX" : value.toLocaleString()}</button>)}</div></GlassCard>
          <GlassCard className="p-4"><div className="text-amber-300">You will receive (if correct)</div><div className="mt-2 text-3xl font-black text-mint">{Math.round(amount * (selectedDirection === "UP" ? 1.72 : 2.25))} NS <span className="text-base text-danger">({selectedDirection === "UP" ? "1.72x" : "2.25x"})</span></div></GlassCard>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <button onClick={() => { const prediction = createPrediction({ market: market.symbol, direction: "UP", amount, odds: 1.72 }); setSelectedDirection("UP"); setModal({ title: "UP Prediction Created", description: `${market.symbol} UP prediction signal recorded. Potential reward: ${prediction.rewardPreview} NS.`, predictionId: prediction.id }); }} className="purple-button rounded-xl py-5 text-xl font-semibold">Confirm UP Prediction</button>
          <button onClick={() => { const prediction = createPrediction({ market: market.symbol, direction: "DOWN", amount, odds: 2.25 }); setSelectedDirection("DOWN"); setModal({ title: "DOWN Prediction Created", description: `${market.symbol} DOWN prediction signal recorded. Potential reward: ${prediction.rewardPreview} NS.`, predictionId: prediction.id }); }} className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-700 py-5 text-xl font-semibold">Confirm DOWN Prediction</button>
        </div>
      </GlassCard>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[["Total Prize Pool", `${Math.round(poolNumber * 1000).toLocaleString()} NS`, Trophy], ["Total Locked", "8,721 NS", Lock], ["UP Locked", "5,042 NS", Users], ["DOWN Locked", "3,679 NS", Star], ["My Predictions", String(predictions.length), BarChart3]].map(([label, value, Icon]) => <GlassCard key={String(label)} className="interactive-glow p-5"><Icon className="mb-3 text-neon" /><div className="text-slate-300">{String(label)}</div><div className="text-2xl font-bold">{String(value)}</div></GlassCard>)}
      </div>

      <GlassCard className="relative mt-5 overflow-hidden p-6">
        <h2 className="text-2xl font-bold">Grow With Every Prediction</h2><p className="text-slate-300">Win or lose, you grow.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-4 lg:w-2/3">{[`+12 EXP`, `Pet ${pet.mood}`, `${seasonPoints} SP`, "7 Days"].map((item) => <GlassCard key={item} className="interactive-glow p-5 text-xl font-semibold text-mint">{item}<div className="mt-3 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-neon" style={{ width: item.includes("Pet") ? `${pet.exp}%` : "50%" }} /></div></GlassCard>)}</div>
        <Mascot variant="prediction" className="absolute bottom-0 right-10 hidden w-72 md:block" />
      </GlassCard>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-neon/20 bg-neon/10 p-4 text-sm text-slate-200">
          Values shown reflect NEXNS market intelligence and product activity.
        </div>
        {modal?.predictionId && <button onClick={() => { settlePrediction(modal.predictionId!, true); setModal({ title: "Prediction Settled", description: "Prediction outcome settled. Rewards, EXP, activity feed, and pet bond updated." }); }} className="purple-button mt-4 w-full rounded-xl py-3 font-semibold">Settle as Win</button>}
      </PreviewModal>
    </AppShell>
  );
}
