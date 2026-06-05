import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CheckCircle2,
  Clock,
  Coins,
  Copy,
  Flame,
  Gift,
  HelpCircle,
  History,
  Lock,
  Search,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
  Wallet,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { PreviewModal } from "../components/ui/PreviewModal";
import { useLivePreviewData } from "../hooks/useLivePreviewData";
import { useProductState } from "../state/productState";

const categories = ["Mainstream", "Hot", "New", "AI", "Meme", "DeFi", "Project Tokens"];
const frames = ["5M", "15M", "30M", "1H", "4H", "24H"];
const paperBalance = 1_000_000_000;

const extraMarkets = [
  { symbol: "JUP", pair: "JUP / USDT", price: "1.1842", change: "+5.62%", up: 64, down: 36, pool: "$824K", users: "9.8K", color: "#22d3ee", chain: "Solana", address: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN" },
  { symbol: "RAY", pair: "RAY / USDT", price: "3.8241", change: "+3.14%", up: 57, down: 43, pool: "$612K", users: "7.1K", color: "#a855f7", chain: "Solana", address: "4k3Dyjzvzp8eNZWUXrHEFQ7WQvN7JFh7LzLzrz4q3DkF" },
  { symbol: "BONK", pair: "BONK / USDT", price: "0.000031", change: "+9.48%", up: 69, down: 31, pool: "$1.14M", users: "18.2K", color: "#f97316", chain: "Solana", address: "DezXAZ8z7PnrnRJjz3jRbVwUyj3SFeEsmRLN8rXkB263" },
  { symbol: "PYTH", pair: "PYTH / USDT", price: "0.4218", change: "+2.86%", up: 55, down: 45, pool: "$442K", users: "5.9K", color: "#06b6d4", chain: "Solana", address: "HZ1JovNiVvGrGNiiYvEozEVgS5wVr1r5xJzQx4wK7LrN" },
];

const marketIdentity: Record<string, { chain: string; address: string; verified: boolean; source: string }> = {
  BTC: { chain: "NEXNS Index", address: "BTC-INDEX-NEXNS-PERPETUAL", verified: true, source: "Aggregated BTC market index" },
  ETH: { chain: "Ethereum", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", verified: true, source: "WETH reference market" },
  SOL: { chain: "Solana", address: "So11111111111111111111111111111111111111112", verified: true, source: "Native SOL reference market" },
  BNB: { chain: "BNB Chain", address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52", verified: true, source: "BNB reference market" },
  NEX: { chain: "Solana", address: "NEXnS9zQ6WcL3u9mXq7Rk8Pv4hA2sNEXNS9kL2", verified: true, source: "NEXNS platform asset" },
};

const shortAddress = (address: string) => (address.length > 20 ? `${address.slice(0, 8)}...${address.slice(-8)}` : address);

export function PredictionPage() {
  const [params] = useSearchParams();
  const [active, setActive] = useState(params.get("market") ?? "BTC");
  const [category, setCategory] = useState("Mainstream");
  const [query, setQuery] = useState("");
  const [amount, setAmount] = useState(1_000);
  const [selectedDirection, setSelectedDirection] = useState<"UP" | "DOWN">((params.get("side") as "UP" | "DOWN") ?? "UP");
  const [timeframe, setTimeframe] = useState(params.get("time") ?? "1H");
  const [modal, setModal] = useState<{ title: string; description: string; predictionId?: string } | null>(null);
  const { markets } = useLivePreviewData();
  const { createPrediction, settlePrediction, predictions, rewards, seasonPoints, pet } = useProductState();

  const fullMarkets = useMemo(() => {
    const series = markets[0]?.data ?? [];
    const baseMarkets = markets.map((item) => ({
      ...item,
      ...(marketIdentity[item.symbol] ?? { chain: "Solana", address: "Unverified token address", verified: false, source: "Community submitted market" }),
    }));
    const projectMarkets = extraMarkets.map((item) => ({
      ...item,
      verified: true,
      source: "Project token market",
      data: series.map((point, index) => ({ ...point, value: point.value + index * 2 })),
    }));
    return [...baseMarkets, ...projectMarkets];
  }, [markets]);

  const filteredMarkets = fullMarkets.filter((market) => {
    const matchesSearch = market.symbol.toLowerCase().includes(query.toLowerCase()) || market.pair.toLowerCase().includes(query.toLowerCase());
    if (!matchesSearch) return false;
    if (category === "Mainstream") return ["BTC", "ETH", "SOL", "BNB", "NEX"].includes(market.symbol);
    if (category === "Hot") return market.up >= 58;
    if (category === "New") return ["JUP", "RAY", "BONK", "PYTH"].includes(market.symbol);
    if (category === "Project Tokens") return ["NEX", "JUP", "RAY", "PYTH"].includes(market.symbol);
    return true;
  });

  const market = useMemo(() => fullMarkets.find((item) => item.symbol === active) ?? fullMarkets[0], [active, fullMarkets]);
  const odds = selectedDirection === "UP" ? 1.72 : 2.25;
  const rewardPreview = Math.round(amount * odds);
  const committed = predictions.reduce((sum, prediction) => sum + prediction.amount, 0);
  const availableBalance = paperBalance - committed;
  const poolNumber = Number(market.pool.replace(/[$MK]/g, ""));

  const placeOrder = (direction: "UP" | "DOWN") => {
    setSelectedDirection(direction);
    const prediction = createPrediction({ market: market.symbol, direction, amount, odds: direction === "UP" ? 1.72 : 2.25 });
    setModal({
      title: `${direction} Paper Prediction Created`,
      description: `${market.symbol} ${direction} order recorded in the paper trading account. Potential reward: ${prediction.rewardPreview.toLocaleString()} USDT equivalent.`,
      predictionId: prediction.id,
    });
  };

  return (
    <AppShell>
      <section className="grid gap-5 2xl:grid-cols-[300px_1fr_360px]">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-black">Markets</h1>
            <button onClick={() => setModal({ title: "How Prediction Trading Works", description: "Select a market, choose a timeframe, enter paper trading amount, then predict UP or DOWN. This is a simulated trading environment with no wallet action or real transaction." })} className="interactive-glow rounded-xl border border-white/10 bg-white/5 p-2">
              <HelpCircle className="h-5 w-5 text-neon" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-2">
            <Search className="h-4 w-4 text-slate-500" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search BTC, SOL, NEX..." className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto">
            {categories.map((item) => (
              <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold ${category === item ? "bg-neon/30 text-white" : "bg-white/5 text-slate-300"}`}>
                {item}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            {filteredMarkets.map((item) => (
              <button key={item.symbol} onClick={() => setActive(item.symbol)} className={`interactive-glow rounded-2xl border p-3 text-left ${active === item.symbol ? "border-neon bg-neon/15 shadow-glow" : "border-white/10 bg-white/5"}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <b>{item.pair}</b>
                    <div className="mt-1 text-xs text-slate-400">{item.users} traders · {item.pool}</div>
                    <div className="mt-1 font-mono text-[11px] text-cyan/80">{item.chain} · {shortAddress(item.address)}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${item.price}</div>
                    <div className="text-xs text-mint">{item.change}</div>
                  </div>
                </div>
                <div className="mt-3 flex h-1.5 overflow-hidden rounded-full bg-danger/30">
                  <span className="bg-mint" style={{ width: `${item.up}%` }} />
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        <div className="grid gap-5">
          <GlassCard className="overflow-hidden p-0">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-black">{market.pair}</h2>
                  <span className="rounded-full bg-mint/15 px-3 py-1 text-sm font-bold text-mint">{market.change}</span>
                  <span className="rounded-full bg-cyan/12 px-3 py-1 text-xs font-semibold text-cyan">Paper Trading</span>
                  {market.verified && <span className="inline-flex items-center gap-1 rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint"><CheckCircle2 className="h-3.5 w-3.5" />Verified Identity</span>}
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-400">
                  <span>Price <b className="text-white">${market.price}</b></span>
                  <span>24H Volume <b className="text-white">$28.41B</b></span>
                  <span>Participants <b className="text-white">{market.users}</b></span>
                  <span>Contract <b className="font-mono text-white">{shortAddress(market.address)}</b></span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {frames.map((frame) => (
                  <button key={frame} onClick={() => setTimeframe(frame)} className={`rounded-xl px-4 py-2 text-sm font-semibold ${timeframe === frame ? "bg-neon/35 text-white" : "bg-white/5 text-slate-300"}`}>
                    {frame}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-0 xl:grid-cols-[1fr_250px]">
              <div className="p-5">
                <div className="rounded-[26px] border border-white/10 bg-slate-950/60 p-4">
                  <MiniLine data={market.data} color={market.color} height={320} />
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  {[
                    ["24H High", "68,845.12", TrendingUp],
                    ["24H Low", "66,712.45", TrendingUp],
                    ["Prize Pool", market.pool, Trophy],
                    ["Settlement", "00:45:32", Clock],
                  ].map(([label, value, Icon]) => (
                    <GlassCard key={label as string} className="p-4">
                      <Icon className="mb-3 h-5 w-5 text-cyan" />
                      <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{label as string}</div>
                      <div className="mt-2 text-xl font-black">{value as string}</div>
                    </GlassCard>
                  ))}
                </div>
              </div>
              <div className="border-t border-white/10 p-5 xl:border-l xl:border-t-0">
                <h3 className="text-xl font-black">Market Sentiment</h3>
                <div className="mt-6 grid gap-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm"><span className="text-mint">UP {market.up}%</span><span className="text-danger">DOWN {market.down}%</span></div>
                    <div className="flex h-4 overflow-hidden rounded-full bg-danger/30">
                      <span className="bg-mint" style={{ width: `${market.up}%` }} />
                    </div>
                  </div>
                  <GlassCard className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Token Identity</div>
                        <div className="mt-2 font-semibold">{market.chain}</div>
                      </div>
                      <button onClick={() => setModal({ title: `${market.symbol} Contract Identity`, description: `${market.pair} is identified by ${market.chain} address: ${market.address}. NEXNS displays contract identity because decentralized markets can contain multiple projects with the same ticker or name.` })} className="interactive-glow rounded-lg border border-white/10 bg-white/5 p-2">
                        <Copy className="h-4 w-4 text-cyan" />
                      </button>
                    </div>
                    <div className="mt-3 break-all rounded-xl border border-white/10 bg-slate-950/70 p-3 font-mono text-xs text-cyan">{market.address}</div>
                    <p className="mt-3 text-xs leading-5 text-slate-400">{market.source}. Address-based identity prevents confusion between same-name community tokens.</p>
                  </GlassCard>
                  <GlassCard className="p-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Order Flow</div>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                      <div className="rounded-xl bg-mint/10 p-3 text-mint"><b>5,042</b><br />UP Locked</div>
                      <div className="rounded-xl bg-danger/10 p-3 text-danger"><b>3,679</b><br />DOWN Locked</div>
                    </div>
                  </GlassCard>
                  <button onClick={() => setModal({ title: "Market Analytics", description: "Professional analytics can include sentiment flow, creator signal impact, pool depth, settlement state, and token campaign reward overlays." })} className="interactive-glow flex items-center justify-center gap-2 rounded-xl bg-neon/20 py-3 font-semibold">
                    <BarChart3 className="h-5 w-5" /> Analytics
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-black"><History className="mr-2 inline h-5 w-5 text-cyan" />Paper Orders & Rewards</h2>
              <button onClick={() => predictions[0] ? settlePrediction(predictions[0].id, true) : setModal({ title: "No Claimable Orders", description: "Create a paper prediction first, then settle it to preview reward claiming." })} className="interactive-glow rounded-xl border border-mint/25 bg-mint/10 px-4 py-2 text-sm font-semibold text-mint">
                Claim Latest Reward
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  <tr>
                    <th className="py-3">Market</th>
                    <th>Side</th>
                    <th>Amount</th>
                    <th>Odds</th>
                    <th>Status</th>
                    <th>Reward</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.length ? predictions.slice(0, 6).map((prediction) => (
                    <tr key={prediction.id} className="border-t border-white/10">
                      <td className="py-4 font-semibold">{prediction.market} / USDT</td>
                      <td className={prediction.direction === "UP" ? "text-mint" : "text-danger"}>{prediction.direction}</td>
                      <td>{prediction.amount.toLocaleString()} USDT</td>
                      <td>{prediction.odds}x</td>
                      <td><span className="rounded-full bg-white/10 px-2 py-1 text-xs">{prediction.status}</span></td>
                      <td className="text-mint">{prediction.rewardPreview.toLocaleString()} USDT</td>
                      <td>
                        <button onClick={() => settlePrediction(prediction.id, true)} className="rounded-lg bg-neon/20 px-3 py-2 text-xs font-semibold">Settle Win</button>
                      </td>
                    </tr>
                  )) : (
                    <tr className="border-t border-white/10">
                      <td colSpan={7} className="py-6 text-center text-slate-400">No paper orders yet. Choose UP or DOWN to create the first prediction.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        <aside className="grid h-fit gap-5">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black">Paper Account</h2>
              <span className="rounded-full bg-mint/15 px-3 py-1 text-xs font-semibold text-mint">Simulated</span>
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Available Balance</div>
              <div className="mt-2 text-3xl font-black">{availableBalance.toLocaleString()} USDT</div>
              <div className="mt-2 text-sm text-slate-400">Starting paper balance: {paperBalance.toLocaleString()} USDT</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <GlassCard className="p-3"><Coins className="mx-auto mb-2 h-5 w-5 text-amber-300" />Committed<br /><b>{committed.toLocaleString()}</b></GlassCard>
              <GlassCard className="p-3"><Gift className="mx-auto mb-2 h-5 w-5 text-neon" />Rewards<br /><b>{rewards.length}</b></GlassCard>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-xl font-black">Prediction Order</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Will {market.symbol} close UP or DOWN after {timeframe}?</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button onClick={() => setSelectedDirection("UP")} className={`interactive-glow rounded-2xl border p-5 text-center ${selectedDirection === "UP" ? "border-mint bg-mint/15 shadow-cyan" : "border-white/10 bg-white/5"}`}>
                <ArrowUp className="mx-auto h-10 w-10 text-mint" />
                <div className="mt-2 text-2xl font-black text-mint">UP</div>
                <div className="text-sm text-slate-300">1.72x</div>
              </button>
              <button onClick={() => setSelectedDirection("DOWN")} className={`interactive-glow rounded-2xl border p-5 text-center ${selectedDirection === "DOWN" ? "border-danger bg-danger/15 shadow-glow" : "border-white/10 bg-white/5"}`}>
                <ArrowDown className="mx-auto h-10 w-10 text-danger" />
                <div className="mt-2 text-2xl font-black text-danger">DOWN</div>
                <div className="text-sm text-slate-300">2.25x</div>
              </button>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm text-slate-300"><span>Amount</span><span>USDT</span></div>
              <input value={amount} onChange={(event) => setAmount(Number(event.target.value) || 0)} className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-4 text-xl font-black outline-none focus:border-neon/50" />
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[100, 1_000, 10_000, 100_000].map((value) => (
                  <button key={value} onClick={() => setAmount(value)} className={`rounded-xl border border-white/10 py-2 text-sm ${amount === value ? "bg-neon/35" : "bg-white/5"}`}>
                    {value >= 1000 ? `${value / 1000}K` : value}
                  </button>
                ))}
              </div>
            </div>
            <GlassCard className="mt-5 p-4">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Reward Preview</div>
              <div className="mt-2 text-3xl font-black text-mint">{rewardPreview.toLocaleString()} USDT</div>
              <div className="mt-1 text-sm text-slate-400">Odds {odds}x · {selectedDirection} prediction</div>
            </GlassCard>
            <button onClick={() => placeOrder(selectedDirection)} className={`mt-5 w-full rounded-xl py-5 text-xl font-semibold ${selectedDirection === "UP" ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-gradient-to-r from-rose-500 to-pink-700"}`}>
              Confirm {selectedDirection} Prediction
            </button>
          </GlassCard>

          <GlassCard className="p-5">
            <h2 className="text-xl font-black">Professional Tools</h2>
            <div className="mt-4 grid gap-2">
              {[
                ["Risk Rules", ShieldCheck],
                ["Pool Depth", Lock],
                ["Reward Center", Trophy],
                ["Creator Signals", Star],
              ].map(([label, Icon]) => (
                <button key={label as string} onClick={() => setModal({ title: label as string, description: "Open a professional prediction trading tool panel for simulated market analysis and account workflow." })} className="interactive-glow flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-left">
                  <span className="flex items-center gap-3"><Icon className="h-4 w-4 text-cyan" />{label as string}</span>
                  <CheckCircle2 className="h-4 w-4 text-mint" />
                </button>
              ))}
            </div>
          </GlassCard>
        </aside>
      </section>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-neon/20 bg-neon/10 p-4 text-sm text-slate-200">
          This is a simulated prediction trading environment. No wallet, payment, token transfer, or blockchain transaction is initiated.
        </div>
        {modal?.predictionId && (
          <button onClick={() => { settlePrediction(modal.predictionId!, true); setModal({ title: "Paper Reward Claimed", description: "Order settled as a win. Reward, EXP, activity feed, and NEX companion progress updated." }); }} className="purple-button mt-4 w-full rounded-xl py-3 font-semibold">
            Claim Paper Reward
          </button>
        )}
      </PreviewModal>
    </AppShell>
  );
}
