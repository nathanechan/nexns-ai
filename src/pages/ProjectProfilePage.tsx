import { ArrowLeft, BarChart3, CalendarDays, CheckCircle2, Globe, Radio, Rocket, ShieldCheck, Target, Users, Zap } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CreatorCard } from "../components/cards/CreatorCard";
import { DonutChart } from "../components/charts/DonutChart";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { revenueData } from "../data/previewData";
import { useLivePreviewData } from "../hooks/useLivePreviewData";
import { useProductState } from "../state/productState";
import { fromSlug, toSlug } from "../utils/slug";

export function ProjectProfilePage() {
  const { projectId } = useParams();
  const { projects, creators } = useLivePreviewData();
  const { joinedCampaigns, joinCampaign, watchProject, followCreator } = useProductState();
  const project = projects.find((item) => toSlug(item.name) === projectId) ?? projects.find((item) => item.name.toLowerCase().includes(fromSlug(projectId))) ?? projects[0];
  const Icon = project.icon;

  return (
    <AppShell>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <Link to="/projects" className="interactive-glow flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
          <ArrowLeft className="h-5 w-5" /> Project Hub
        </Link>
        <button onClick={() => joinCampaign(project.name)} className="purple-button interactive-glow rounded-xl px-6 py-3 font-semibold"><Rocket className="mr-2 inline h-5 w-5" />{joinedCampaigns.includes(project.name) ? "Campaign Joined" : "Join Campaign"}</button>
      </div>

      <section className="grid gap-5 xl:grid-cols-[360px_1fr_360px]">
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold">Project Overview</h2>
          <div className="mt-6 grid gap-5">
            {[
              ["Project Name", project.name, Icon],
              ["Category", `${project.category} & Web3 Growth`, ShieldCheck],
              ["Prediction Volume", "$24.8M", BarChart3],
              ["Community Size", "18.6K", Users],
              ["Launch Date", "May 20, 2024", CalendarDays],
            ].map(([label, value, ItemIcon]) => (
              <div key={String(label)} className="flex items-center gap-4 border-t border-white/10 pt-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-neon/15 text-neon"><ItemIcon className="h-6 w-6" /></span>
                <div><div className="text-xs text-slate-400">{String(label)}</div><div className="font-semibold">{String(value)}</div></div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="nex-stage relative min-h-[760px] overflow-hidden p-6 text-center">
          <div className="absolute left-1/2 top-16 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-neon/20 blur-3xl" />
          <div className="absolute left-1/2 top-28 h-[500px] w-[500px] -translate-x-1/2 rounded-full border border-cyan/20 bg-cyan/5" />
          <div className="absolute bottom-24 left-1/2 h-36 w-[620px] -translate-x-1/2 rounded-[50%] border border-neon/50 nex-platform" />
          <div className="relative z-10">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-neon to-cyan"><Icon className="h-11 w-11" /></div>
            <div className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-cyan">Project Profile</div>
            <h1 className="mt-2 text-5xl font-black md:text-7xl">{project.name}</h1>
            <p className="mt-3 text-slate-300">Predict the future. Shape reality. Earn together.</p>
            <div className="relative mx-auto mt-4 min-h-[520px]">
              <Mascot variant="project" className="absolute bottom-12 left-1/2 w-[min(620px,95vw)] -translate-x-1/2 drop-shadow-[0_0_70px_rgba(139,92,246,.85)]" />
              <GlassCard className="absolute left-0 top-20 hidden rotate-[-5deg] p-4 text-left md:block">
                <BarChart3 className="mb-2 text-cyan" />Prediction Volume<br /><b className="text-2xl">$24.8M</b>
              </GlassCard>
              <GlassCard className="absolute right-0 top-32 hidden rotate-[5deg] p-4 text-left md:block">
                <Users className="mb-2 text-neon" />Community<br /><b className="text-2xl">18.6K</b>
              </GlassCard>
            </div>
          <div className="mx-auto -mt-14 w-fit rounded-xl border border-neon/50 bg-slate-950/85 px-8 py-3 text-2xl font-bold shadow-glow">Project NEX</div>
          <button onClick={() => watchProject(project.name)} className="interactive-glow relative z-20 mt-5 rounded-xl border border-neon/30 bg-neon/15 px-6 py-3 font-semibold">Watch Project</button>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold">Key Metrics</h2>
          {[
            ["Prediction Accuracy", "78.3%", Target],
            ["Participants", "18.6K", Users],
            ["Creator Support", "92.4%", Zap],
            ["Growth Score", "8.7 / 10", BarChart3],
          ].map(([label, value, ItemIcon], index) => (
            <div key={String(label)} className="border-t border-white/10 py-5">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-3 text-slate-300"><ItemIcon className="h-6 w-6 text-neon" />{String(label)}</span>
                <b className="text-2xl">{String(value)}</b>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10"><span className="block h-full rounded-full bg-gradient-to-r from-neon to-cyan" style={{ width: `${78 + index * 4}%` }} /></div>
            </div>
          ))}
          <GlassCard className="mt-4 p-5"><div className="flex items-center justify-between"><span>NEX Score<br /><small className="text-slate-400">Top 10% of all projects</small></span><b className="text-5xl text-gradient">A+</b></div></GlassCard>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <GlassCard className="p-5">
          <h2 className="text-xl font-semibold">Supported Creators</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {creators.slice(0, 4).map((creator, index) => <CreatorCard key={creator.name} creator={creator} rank={index + 1} onClick={() => followCreator(creator.name)} />)}
          </div>
        </GlassCard>
        <GlassCard className="p-5 text-center">
          <h2 className="text-xl font-semibold">Campaign Progress</h2>
          <div className="mx-auto mt-5 grid h-48 w-48 place-items-center rounded-full border-[18px] border-neon border-r-cyan bg-white/5">
            <div><div className="text-5xl font-black">75%</div><div className="text-sm text-slate-300">$186,400 / $250,000</div></div>
          </div>
          <div className="mt-4 flex justify-between rounded-xl bg-white/5 px-4 py-3"><span className="text-mint"><Radio className="mr-1 inline h-4 w-4" />LIVE</span><span>24 Days Left</span></div>
        </GlassCard>
        <GlassCard className="p-5">
          <h2 className="text-xl font-semibold">Community Network</h2>
          {["Discord 12.4K Members", "Telegram 8.7K Members", "X 32.1K Followers", "Website nexfutures.io"].map((item, index) => <div key={item} className="flex items-center justify-between border-t border-white/10 py-4"><span className="flex items-center gap-3">{index === 3 ? <Globe className="text-cyan" /> : <Users className="text-neon" />}{item}</span><button onClick={() => joinCampaign(`${project.name} ${item}`)} className="rounded-lg border border-neon/40 px-4 py-2">{joinedCampaigns.includes(`${project.name} ${item}`) ? "Joined" : "Join"}</button></div>)}
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_420px]">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Analytics Dashboard</h2><button className="text-purple-300">View Analytics</button></div>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            {["Volume $24.8M", "Predictions 156.2K", "Users 18.6K", "Accuracy 78.3%"].map((item) => <GlassCard key={item} className="interactive-glow p-4 font-semibold">{item}</GlassCard>)}
          </div>
          <MiniLine data={project.data} color="#22d3ee" height={260} />
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="text-xl font-semibold">Value Capture Mix</h2>
          <DonutChart data={revenueData} />
          <div className="grid gap-2">{revenueData.map((item) => <div key={item.name} className="flex justify-between text-sm"><span style={{ color: item.fill }}>{item.name}</span><b>{item.value}%</b></div>)}</div>
        </GlassCard>
      </section>

      <GlassCard className="mt-5 grid gap-4 p-6 md:grid-cols-5">
        {["Projects Launch", "Users Participate", "Creators Amplify", "Growth Accelerates", "Value Returns"].map((item, index) => <div key={item} className="text-center"><CheckCircle2 className={`mx-auto mb-2 ${index < 3 ? "text-mint" : "text-neon"}`} />{item}</div>)}
      </GlassCard>
    </AppShell>
  );
}
