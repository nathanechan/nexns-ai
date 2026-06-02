import { CheckCircle2, Filter, Rocket, Search, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectCard } from "../components/cards/ProjectCard";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { PreviewModal } from "../components/ui/PreviewModal";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { tasks } from "../data/previewData";
import { useLivePreviewData } from "../hooks/useLivePreviewData";
import { useProductState } from "../state/productState";
import { toSlug } from "../utils/slug";

const categories = ["All Categories", "AI", "GameFi", "DeFi", "RWA", "Meme", "SocialFi", "Infra", "NFT", "More"];

export function ProjectPage() {
  const { projects, creators } = useLivePreviewData();
  const { watchedProjects, joinedCampaigns, watchProject, joinCampaign, claimTask, followCreator, followedCreators } = useProductState();
  const navigate = useNavigate();
  const featured = projects[0];
  const Icon = featured.icon;
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);

  return (
    <AppShell>
      <div className="grid items-center gap-6 lg:grid-cols-[1fr_.9fr]">
        <div>
          <div className="glass mb-6 flex max-w-md items-center gap-3 rounded-xl px-4 py-3 text-slate-400"><Search className="h-5 w-5" />Search projects, categories, token...</div>
          <h1 className="text-4xl font-black md:text-5xl">Project <span className="text-gradient">Hub</span></h1>
          <p className="mt-3 text-xl font-semibold">Discover Promising Projects. Accelerate Growth.</p>
          <p className="mt-3 max-w-xl text-slate-300">NEXNS connects innovative projects with a global network of predictors, creators and communities.</p>
          <div className="mt-7 flex flex-wrap gap-4"><button onClick={() => setModal({ title: "List Your Project", description: "Project onboarding introduces campaign setup, creator support, community tasks, and growth analytics. No payment or contract interaction is performed." })} className="purple-button rounded-xl px-6 py-3">List Your Project</button><button onClick={() => setModal({ title: "How It Works", description: "Projects launch prediction markets, activate creators, organize community tasks, and track growth signals." })} className="rounded-xl border border-white/10 bg-white/5 px-6 py-3">How It Works</button></div>
        </div>
        <GlassCard className="soft-grid relative min-h-60 overflow-hidden p-6">
          <Rocket className="absolute right-8 top-8 h-16 w-16 text-cyan drop-shadow-[0_0_28px_rgba(34,211,238,.8)]" />
          <Mascot variant="project" className="absolute bottom-0 left-1/2 w-64 -translate-x-1/2" />
        </GlassCard>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 md:grid-cols-5 lg:grid-cols-10">
        {categories.map((cat, i) => <button key={cat} onClick={() => setModal({ title: cat, description: "Explore projects by sector, campaign activity, creator support, and community momentum." })} className={`interactive-glow rounded-xl py-3 text-sm ${i === 0 ? "bg-neon" : "hover:bg-white/5"}`}>{cat}</button>)}
      </div>

      <GlassCard className="mt-5 p-5">
        <div className="mb-4 flex justify-between"><h2 className="text-xl font-semibold">Top Gaining Projects</h2><button onClick={() => setModal({ title: "Top Gaining Projects", description: "Open the full project leaderboard with growth movement, community momentum, and creator support." })} className="text-purple-300">View All</button></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{projects.slice(0, 5).map((project) => <div key={project.name} className="relative"><ProjectCard project={project} onClick={() => navigate(`/projects/${toSlug(project.name)}`)} />{watchedProjects.includes(project.name) && <span className="absolute right-3 top-3 rounded-full bg-mint/15 px-2 py-1 text-xs text-mint">Watching</span>}</div>)}</div>
      </GlassCard>

      <section className="mt-5 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <GlassCard className="p-5">
          <div className="mb-4 flex justify-between"><h2 className="text-xl font-semibold">Featured Projects</h2><button onClick={() => setModal({ title: "Filters", description: "Advanced filters organize projects by category, market activity, creator support, and campaign stage." })} className="rounded-lg border border-white/10 px-3 py-1 text-sm"><Filter className="mr-1 inline h-4 w-4" />Filters</button></div>
          <div className="grid gap-3">{projects.slice(0, 5).map((project) => <button key={project.name} onClick={() => navigate(`/projects/${toSlug(project.name)}`)} className="interactive-glow grid grid-cols-[1fr_auto_90px] items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left"><div className="min-w-0 font-semibold">{project.name}<div className="text-xs text-slate-400">{project.category} powered ecosystem</div></div><div><b>{project.cap}</b><div className="text-mint">{project.growth}</div></div><MiniLine data={project.data} color="#20f29b" height={42} /></button>)}</div>
          <button onClick={() => setModal({ title: "More Projects", description: "A complete project directory would open here." })} className="mt-4 w-full rounded-xl bg-neon/15 py-3">View More Projects</button>
        </GlassCard>

        <div className="grid gap-5">
          <GlassCard className="relative overflow-hidden p-7">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="flex flex-wrap gap-5"><span className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-neon to-cyan"><Icon className="h-10 w-10" /></span><div><h2 className="text-3xl font-bold">{featured.name}</h2><p className="mt-2 max-w-xl text-slate-300">AI-powered on-chain intelligence network that predicts market trends in real-time.</p></div></div>
              <button onClick={() => watchProject(featured.name)} className="purple-button h-fit rounded-lg px-8 py-3">{watchedProjects.includes(featured.name) ? "Watching" : "Follow"}</button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-4">{[featured.cap, "12.4K Predictors", featured.growth, "86.2K Community"].map((item) => <GlassCard key={item} className="interactive-glow p-4 text-center font-semibold">{item}</GlassCard>)}</div>
            <button onClick={() => joinCampaign(featured.name)} className="interactive-glow mt-4 w-full rounded-xl border border-neon/30 bg-neon/15 py-3 font-semibold">{joinedCampaigns.includes(featured.name) ? "Campaign Joined" : "Join Campaign"}</button>
          </GlassCard>
          <GlassCard className="p-5"><div className="flex justify-between"><h2 className="text-xl font-semibold">Project Growth</h2><button onClick={() => setModal({ title: "Project Analytics", description: "Analytics connect prediction volume, active participants, campaign progress, and creator distribution." })} className="text-purple-300">View Analytics</button></div><div className="mt-4 grid gap-3 md:grid-cols-4">{["Prediction Volume $24.58M", "Active Participants 28,450", "Total Predictions 156,230", "Win Rate 62.7%"].map((item, i) => <GlassCard key={item} className="interactive-glow p-4"><div className="font-semibold">{item}</div><MiniLine data={projects[i].data} color={i === 1 ? "#0ea5e9" : "#a855f7"} height={70} /></GlassCard>)}</div><div className="mt-5 grid grid-cols-2 gap-2 text-center text-sm sm:grid-cols-4">{["Launch Completed", "Growth In Progress", "Expansion Locked", "Leadership Locked"].map((s, i) => <div key={s}><CheckCircle2 className={`mx-auto ${i < 2 ? "text-mint" : "text-slate-500"}`} />{s}</div>)}</div></GlassCard>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-5"><h2 className="text-xl font-semibold">Active Campaigns</h2>{["Predict & Earn", "Invite & Grow", "Creator Boost"].map((name, i) => <button key={name} onClick={() => joinCampaign(`${featured.name} ${name}`)} className="interactive-glow mt-4 w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left"><div className="flex justify-between"><b>{name}</b><span className="text-purple-300">+{[1250, 800, 2000][i]} NS</span></div><div className="mt-3 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-neon" style={{ width: `${joinedCampaigns.includes(`${featured.name} ${name}`) ? [75, 50, 88][i] : [65, 40, 78][i]}%` }} /></div></button>)}</GlassCard>
        <GlassCard className="p-5"><h2 className="text-xl font-semibold">Top Creators Promoting</h2>{creators.map((creator) => <div key={creator.name} className="flex items-center justify-between border-t border-white/10 py-3"><span className="flex items-center gap-3"><img src={creator.avatar} className="h-10 w-10 rounded-full" alt="" />{creator.name}</span><button onClick={() => followCreator(creator.name)} className="rounded-lg bg-neon/20 px-4 py-2">{followedCreators.includes(creator.name) ? "Following" : "Follow"}</button></div>)}</GlassCard>
        <GlassCard className="p-5"><h2 className="text-xl font-semibold">Project Tasks</h2><p className="text-slate-300">Complete tasks to support growth and earn rewards.</p>{tasks.slice(0, 4).map((task) => <div key={task.label} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3"><span className="flex items-center gap-2"><task.icon className="h-5 w-5 text-cyan" />{task.label}</span><button onClick={() => claimTask(`Project: ${task.label}`, task.reward)} className="rounded-lg bg-neon px-4 py-2">Go</button></div>)}</GlassCard>
      </section>

      <GlassCard className="mt-5 flex flex-wrap items-center justify-between gap-5 p-8"><div><h2 className="text-3xl font-bold">Bring Your Project to Millions</h2><p className="mt-2 text-slate-300">List your project on NEXNS and connect with a global audience of predictors, creators and investors.</p></div><button onClick={() => joinCampaign("Project Listing Waitlist")} className="purple-button rounded-xl px-8 py-4 font-semibold">List Your Project Now</button><div className="flex flex-wrap gap-6 text-sm text-purple-200"><span><Users className="inline" /> Increase Visibility</span><span>Boost Growth</span><span>Community Power</span><span>Data & Analytics</span></div></GlassCard>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-slate-200">Project growth, campaigns, and rewards reflect NEXNS ecosystem activity.</div>
      </PreviewModal>
    </AppShell>
  );
}
