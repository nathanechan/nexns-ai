import { BarChart3, Flame, Heart, Image, MessageCircle, Plus, Repeat2, Search, Send, Star, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { PreviewModal } from "../components/ui/PreviewModal";
import { creators, markets, projects } from "../data/previewData";
import { useProductState } from "../state/productState";

const feedSeeds = [
  {
    author: "CryptoKing",
    tag: "BTC Signal",
    body: "BTC volume is clustering around the next prediction window. I am watching liquidity, creator sentiment, and participant acceleration.",
    stats: ["2.8K", "418", "92"],
  },
  {
    author: "NEXUS AI",
    tag: "Project Campaign",
    body: "New campaign tasks are open for prediction participation, creator coverage, and community signal distribution.",
    stats: ["4.1K", "762", "118"],
  },
  {
    author: "BellaTrader",
    tag: "ETH Market",
    body: "ETH sentiment is mixed. The next hour should be driven by creator calls and short-term prediction flow.",
    stats: ["1.9K", "301", "67"],
  },
  {
    author: "NEX Community",
    tag: "Growth Loop",
    body: "Users predict, creators amplify, projects activate, and rewards bring participants back into the loop.",
    stats: ["6.4K", "1.2K", "256"],
  },
];

export function CommunityPage() {
  const { addActivity } = useProductState();
  const [composer, setComposer] = useState("");
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);

  const publishPost = () => {
    addActivity({
      type: "system",
      title: "Community post published",
      detail: composer || "A new NEXNS community signal was shared.",
    });
    setComposer("");
  };

  return (
    <AppShell>
      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="grid gap-5">
          <GlassCard className="p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="nex-label">Community Plaza</div>
                <h1 className="mt-3 text-4xl font-black md:text-6xl">Signals, creators, projects, and market conversations.</h1>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                  Browse live prediction narratives, creator calls, project updates, campaign activity, and ecosystem discussion from one social feed.
                </p>
              </div>
              <Link to="/creator" className="purple-button rounded-xl px-5 py-3 font-semibold">Find Creators</Link>
            </div>
          </GlassCard>

          <GlassCard className="p-4 md:p-5">
            <div className="flex gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-neon/20">
                <Users className="h-5 w-5 text-neon" />
              </div>
              <div className="w-full">
                <textarea
                  value={composer}
                  onChange={(event) => setComposer(event.target.value)}
                  placeholder="Share a market signal, creator insight, project update, or community idea..."
                  className="min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-neon/50"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex gap-2 text-slate-400">
                    {[Image, BarChart3, Flame].map((Icon, index) => (
                      <button key={index} onClick={() => setModal({ title: "Composer Tool", description: "Attach market charts, campaign images, creator clips, or prediction snapshots." })} className="interactive-glow rounded-xl border border-white/10 bg-white/5 p-2">
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                  <button onClick={publishPost} className="purple-button inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold">
                    Publish <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-4">
            {feedSeeds.map((post) => (
              <GlassCard key={`${post.author}-${post.tag}`} className="interactive-glow p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <img src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${post.author}`} alt="" className="h-12 w-12 rounded-full border border-neon/30 bg-neon/10" />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <b>{post.author}</b>
                        <span className="rounded-full bg-cyan/12 px-2 py-0.5 text-xs text-cyan">{post.tag}</span>
                      </div>
                      <p className="mt-3 max-w-3xl leading-7 text-slate-200">{post.body}</p>
                    </div>
                  </div>
                  <Star className="h-5 w-5 text-slate-500" />
                </div>
                <div className="mt-4 flex flex-wrap gap-4 border-t border-white/10 pt-4 text-sm text-slate-400">
                  <button className="flex items-center gap-2 hover:text-white"><Heart className="h-4 w-4" />{post.stats[0]}</button>
                  <button className="flex items-center gap-2 hover:text-white"><MessageCircle className="h-4 w-4" />{post.stats[1]}</button>
                  <button className="flex items-center gap-2 hover:text-white"><Repeat2 className="h-4 w-4" />{post.stats[2]}</button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <aside className="grid h-fit gap-5">
          <GlassCard className="p-5">
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-cyan" />
              <input className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500" placeholder="Search creators, projects, markets" />
            </div>
          </GlassCard>
          <GlassCard className="p-5">
            <h2 className="text-xl font-black">Trending Markets</h2>
            {markets.slice(0, 4).map((market) => (
              <Link key={market.symbol} to={`/prediction?market=${market.symbol}`} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                <span>{market.pair}</span>
                <span className="text-mint">{market.change}</span>
              </Link>
            ))}
          </GlassCard>
          <GlassCard className="p-5">
            <h2 className="text-xl font-black">Creators Online</h2>
            {creators.slice(0, 4).map((creator) => (
              <Link key={creator.name} to={`/creator/${creator.name.toLowerCase()}`} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="flex items-center gap-3"><img src={creator.avatar} alt="" className="h-8 w-8 rounded-full" />{creator.name}</span>
                <span className="text-mint">{creator.roi}</span>
              </Link>
            ))}
          </GlassCard>
          <GlassCard className="p-5">
            <h2 className="text-xl font-black">Project Rooms</h2>
            {projects.slice(0, 3).map((project) => (
              <Link key={project.name} to={`/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}`} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                <span>{project.name}</span>
                <span className="text-mint">{project.growth}</span>
              </Link>
            ))}
          </GlassCard>
        </aside>
      </section>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-slate-200">
          Community publishing uses local activity state only. No wallet, payment, or blockchain transaction is initiated.
        </div>
      </PreviewModal>
    </AppShell>
  );
}
