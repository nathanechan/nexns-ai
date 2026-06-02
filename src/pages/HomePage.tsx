import { ArrowRight, Flame, Star, Zap } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreatorCard } from "../components/cards/CreatorCard";
import { MarketCard } from "../components/cards/MarketCard";
import { ProjectCard } from "../components/cards/ProjectCard";
import { ActivityFeed } from "../components/ui/ActivityFeed";
import { AppShell } from "../components/layout/AppShell";
import { PreviewModal } from "../components/ui/PreviewModal";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { stats } from "../data/previewData";
import { useLivePreviewData } from "../hooks/useLivePreviewData";
import { useProductState } from "../state/productState";
import { toSlug } from "../utils/slug";

export function HomePage() {
  const navigate = useNavigate();
  const { markets, creators, projects, btc } = useLivePreviewData();
  const { followedCreators, watchedProjects, pet, predictions, claimTask } = useProductState();
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);

  return (
    <AppShell>
      <section className="grid gap-5 lg:grid-cols-[1.8fr_.8fr]">
        <GlassCard className="relative min-h-[360px] overflow-hidden p-6 md:p-12">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(139,92,246,.38),transparent_58%)] md:block" />
          <div className="relative z-10 max-w-md">
            <h1 className="text-4xl font-black leading-tight md:text-5xl">Predict the future.<br /><span className="text-gradient">Grow together.</span><br /><span className="text-gradient">Earn endlessly.</span></h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">Join millions of users, creators and projects building the new era of PredictionFi.</p>
            <Link to="/prediction" className="purple-button interactive-glow mt-8 inline-flex items-center gap-3 rounded-xl px-7 py-4 font-semibold">Start Predicting <ArrowRight /></Link>
          </div>
          <Mascot variant="welcome" className="absolute bottom-0 right-2 hidden w-[300px] md:block xl:right-8 xl:w-[340px]" />
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="mb-4 text-lg font-semibold">Live Overview</h2>
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center justify-between border-t border-white/10 py-4">
              <span className="flex items-center gap-3 text-slate-300"><stat.icon className="h-5 w-5 text-neon" />{stat.label}</span>
              <strong className="text-xl">{index === 1 ? `${btc.participants?.toLocaleString()}+` : stat.value}</strong>
            </div>
          ))}
          <div className="mt-4 border-t border-white/10 pt-4 text-sm text-slate-300">
            Pending predictions <b className="text-white">{predictions.filter((prediction) => prediction.status === "pending").length}</b>
            <br />Pet mood <b className="text-purple-200">{pet.mood}</b>
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_.8fr]">
        <GlassCard className="p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold"><Flame className="mr-2 inline text-orange-400" />Hot Predictions</h2>
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
            <h2 className="text-xl font-semibold"><Flame className="mr-2 inline text-orange-400" />Hot Projects</h2>
            <Link to="/projects" className="text-purple-300 hover:text-white">View All</Link>
          </div>
          <div className="grid gap-3">{projects.slice(0, 4).map((project) => <div key={project.name} className="relative"><ProjectCard project={project} onClick={() => navigate(`/projects/${toSlug(project.name)}`)} />{watchedProjects.includes(project.name) && <span className="absolute right-3 top-3 rounded-full bg-mint/15 px-2 py-1 text-xs text-mint">Watching</span>}</div>)}</div>
        </GlassCard>
      </section>

      <GlassCard className="mt-5 p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold"><Star className="mr-2 inline text-amber-300" />Top Creators</h2>
          <Link to="/creator" className="text-purple-300 hover:text-white">View All</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {creators.map((creator, i) => (
            <div key={creator.name} className="relative">
              <CreatorCard creator={creator} rank={i + 1} onClick={() => navigate(`/creator/${toSlug(creator.name)}`)} />
              {followedCreators.includes(creator.name) && <span className="absolute right-3 top-3 rounded-full bg-neon/25 px-2 py-1 text-xs text-purple-100">Following</span>}
            </div>
          ))}
        </div>
        <button type="button" onClick={() => navigate("/creator")} className="interactive-glow mt-5 flex w-full flex-wrap items-center justify-between rounded-2xl border border-neon/30 bg-neon/10 p-5 text-left">
          <div className="flex items-center gap-4"><Mascot variant="creator" className="w-20" /><div><h3 className="text-2xl font-semibold">Become a Creator</h3><p className="text-purple-200">Share insights, build influence, earn rewards.</p></div></div>
          <span className="purple-button mt-4 rounded-xl px-7 py-4 font-semibold sm:mt-0">Start Now</span>
        </button>
      </GlassCard>

      <GlassCard className="mt-5 p-5">
        <h2 className="text-xl font-semibold"><Zap className="mr-2 inline text-amber-300" />Growth System</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {["Level 27 Explorer", "AI Pet Lv.27", "Season Points 245 / 1,000", "My Rewards"].map((item, i) => (
            <button
              key={item}
              type="button"
              onClick={() => (i === 1 ? navigate("/companion") : i === 3 ? claimTask("Home Rewards", "+20 NS") : setModal({ title: item, description: "Open growth details across rewards, levels, balances, and companion progress." }))}
              className="h-full text-left"
            >
              <GlassCard className="interactive-glow h-full p-5">
                <div className="text-lg font-semibold">{item}</div>
                <div className="mt-4 h-2 rounded-full bg-white/10"><span className={`block h-full rounded-full bg-neon ${i === 0 ? "w-2/3" : i === 1 ? "" : "w-1/2"}`} style={i === 1 ? { width: `${pet.exp}%` } : undefined} /></div>
                <div className="mt-5 w-full rounded-xl bg-white/5 py-3 text-center">View {i === 3 ? "All" : "Progress"}</div>
              </GlassCard>
            </button>
          ))}
        </div>
      </GlassCard>

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
