import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Bot,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Compass,
  Copy,
  Crown,
  Flame,
  Gift,
  Gem,
  Image,
  KeyRound,
  Medal,
  PawPrint,
  PieChart,
  Rocket,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  UserCircle,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MiniLine } from "../components/charts/MiniLine";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { PreviewModal } from "../components/ui/PreviewModal";
import { creators, projects, rewards, roiData, tasks, user } from "../data/previewData";
import { useProductState } from "../state/productState";

type IdentityKey = "user" | "creator" | "project";

type PanelEntry = {
  title: string;
  copy: string;
  icon: LucideIcon;
  to?: string;
  status: "Live" | "Prepared" | "System";
};

const identityTabs: Array<{
  key: IdentityKey;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  metrics: Array<[string, string]>;
  capabilities: string[];
}> = [
  {
    key: "user",
    title: "User Identity",
    subtitle: "Predictions, rewards, tasks, pet growth, reputation, and daily participation.",
    icon: UserCircle,
    metrics: [
      ["Win Rate", "62.7%"],
      ["Predictions", "42"],
      ["Rewards", "8,920 NS"],
      ["Reputation", "Top 8%"],
    ],
    capabilities: ["Market participation", "Daily missions", "Reward claims", "Companion progression", "Season pass"],
  },
  {
    key: "creator",
    title: "Creator Identity",
    subtitle: "Influence, followers, creator calls, community growth, and campaign earnings.",
    icon: Users,
    metrics: [
      ["Followers", "18.4K"],
      ["Creator ROI", "+86%"],
      ["Calls", "128"],
      ["Revenue", "4,630 NS"],
    ],
    capabilities: ["Creator profile", "Prediction publishing", "Community rooms", "Campaign support", "Revenue analytics"],
  },
  {
    key: "project",
    title: "Project Operator",
    subtitle: "Campaigns, project growth, creator distribution, tasks, and community activation.",
    icon: Briefcase,
    metrics: [
      ["Campaigns", "6"],
      ["Community", "24.5K"],
      ["Growth", "+24.5%"],
      ["Volume", "$24.58M"],
    ],
    capabilities: ["Project dashboard", "Campaign setup", "Creator activation", "Task center", "Growth analytics"],
  },
];

const controlPanels: PanelEntry[] = [
  { title: "Prediction Portfolio", copy: "Open predictions, settlement status, outcomes, exposure, watchlist, and market history.", icon: Target, to: "/prediction", status: "Live" },
  { title: "Creator Studio", copy: "Creator identity, published calls, follower growth, ROI, earnings, and community tools.", icon: Users, to: "/creator", status: "Live" },
  { title: "Project Console", copy: "Project profile, growth campaigns, tasks, supported creators, analytics, and launch status.", icon: Rocket, to: "/projects", status: "Live" },
  { title: "NEX Companion", copy: "AI Pet Home, bond, mood, energy, evolution, training, rest, and NEX World access.", icon: PawPrint, to: "/pet", status: "Live" },
  { title: "Wallet & Assets", copy: "NEX, NS, reward inventory, badges, season assets, claim records, and account status.", icon: Wallet, status: "System" },
  { title: "Reputation Layer", copy: "Prediction accuracy, creator trust, project contribution, community standing, and rank.", icon: Medal, status: "Prepared" },
  { title: "Campaign Center", copy: "Project missions, creator boosts, referral tasks, reward pools, and launch participation.", icon: CalendarCheck, status: "Prepared" },
  { title: "Governance Readiness", copy: "Voting power, DAO participation, treasury signals, proposals, and protocol reputation.", icon: Crown, status: "Prepared" },
  { title: "Notifications", copy: "Prediction settlements, creator alerts, campaign deadlines, pet reminders, and rewards.", icon: Bell, status: "System" },
  { title: "Security & Identity", copy: "Account protection, session safety, role verification, access controls, and privacy.", icon: ShieldCheck, status: "System" },
  { title: "Analytics Center", copy: "EXP, NS earned, ROI, project growth, community activity, and ecosystem contribution.", icon: PieChart, status: "Prepared" },
  { title: "Settings", copy: "Profile, market preferences, AI guidance style, companion reminders, privacy, and display controls.", icon: Settings, to: "/more", status: "System" },
];

const quickActions = [
  { title: "Make Prediction", to: "/prediction", icon: Target },
  { title: "Open Chat", to: "/companion", icon: Bot },
  { title: "View Pet", to: "/pet", icon: PawPrint },
  { title: "Enter NEX World", to: "/pet/world", icon: Sparkles },
  { title: "Explore More", to: "/more", icon: Compass },
];

const shareKits = [
  {
    title: "User Invite Link",
    copy: "Invite friends into predictions, tasks, rewards, and NEX companion growth.",
    link: "nexns.xyz/invite/nex-explorer",
    poster: "Growth invite poster",
    icon: UserCircle,
  },
  {
    title: "Creator Invite Link",
    copy: "Bring followers into creator calls, private rooms, market insights, and community campaigns.",
    link: "nexns.xyz/creator/nex-explorer",
    poster: "Creator signal poster",
    icon: Users,
  },
  {
    title: "Project Promotion Link",
    copy: "Share project campaigns, task pages, creator promotion, and community activation links.",
    link: "nexns.xyz/project/nexus-ai",
    poster: "Project campaign poster",
    icon: Rocket,
  },
];

const managedProjects = [
  { name: "NEXUS AI", status: "Live Campaign", members: "86.2K", volume: "$24.58M", link: "nexns.xyz/projects/nexus-ai" },
  { name: "MetaPlay", status: "Creator Boost", members: "42.8K", volume: "$12.4M", link: "nexns.xyz/projects/metaplay" },
  { name: "GreenRWA", status: "Tasks Ready", members: "28.6K", volume: "$8.9M", link: "nexns.xyz/projects/greenrwa" },
];

export function MyPage() {
  const navigate = useNavigate();
  const {
    nsBalance,
    userExp,
    seasonPoints,
    streak,
    pet,
    claimedTasks,
    rewards: liveRewards,
    claimTask,
    petAction,
    predictions,
  } = useProductState();
  const [activeIdentity, setActiveIdentity] = useState<IdentityKey>("user");
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);
  const currentIdentity = identityTabs.find((item) => item.key === activeIdentity) ?? identityTabs[0];
  const IdentityIcon = currentIdentity.icon;

  const openPanel = (panel: PanelEntry) => {
    setModal({
      title: panel.title,
      description: `${panel.copy} This surface is part of the NEXNS personal operating layer and can expand into deeper role-specific pages as the product grows.`,
    });
  };

  return (
    <AppShell>
      <section className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="relative overflow-hidden p-6 md:p-8">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-neon/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="nex-label">NEXNS Personal Center</div>
              <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
                Identity <span className="text-gradient">Control</span> Center
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                One account can operate as a predictor, creator, project contributor, community member, and NEX companion owner. This page maps every personal data surface in the NEXNS network.
              </p>
            </div>
            <button type="button" onClick={() => navigate("/pet")} className="interactive-glow rounded-[28px] border border-neon/25 bg-white/5 p-4 text-left">
              <Mascot variant="evolution" className="mx-auto w-36 md:w-44" />
              <div className="mt-2 flex items-center justify-between gap-3 text-sm">
                <span>
                  <b>NEX Companion</b>
                  <br />
                  <span className="text-slate-300">Bond {pet.bond}/100</span>
                </span>
                <ArrowRight className="h-4 w-4 text-neon" />
              </div>
            </button>
          </div>

          <div className="relative mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["NS Balance", nsBalance.toLocaleString(), CircleDollarSign],
              ["NEX Balance", user.nex, Gem],
              ["EXP Progress", `${userExp.toLocaleString()} / ${user.nextExp.toLocaleString()}`, TrendingUp],
              ["Activity Streak", `${streak} Days`, Flame],
            ].map(([label, value, Icon]) => (
              <GlassCard key={label as string} className="interactive-glow p-4">
                <Icon className="mb-3 h-5 w-5 text-neon" />
                <div className="text-xs uppercase tracking-[0.18em] text-slate-400">{label as string}</div>
                <div className="mt-2 text-xl font-black md:text-2xl">{value as string}</div>
              </GlassCard>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-neon/18 text-neon">
              <Crown className="h-9 w-9" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Level 27 Explorer</h2>
              <p className="text-sm text-slate-300">VIP {user.vip} / Global Rank Top 8%</p>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-sm text-slate-300">
            <span>EXP</span>
            <span>
              {userExp.toLocaleString()} / {user.nextExp.toLocaleString()}
            </span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/10">
            <span className="block h-full rounded-full bg-neon" style={{ width: `${Math.min(100, (userExp / user.nextExp) * 100)}%` }} />
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
            {["+200 NS", "+1 Badge", "+1 EXP Boost"].map((item) => (
              <button key={item} type="button" onClick={() => claimTask(`Level reward ${item}`, item.includes("NS") ? item : "+10 NS")} className="interactive-glow rounded-xl bg-white/5 p-3">
                <Gift className="mx-auto mb-2 h-5 w-5 text-neon" />
                {item}
              </button>
            ))}
          </div>
          <div className="mt-5 grid gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} to={action.to} className="interactive-glow flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-cyan" />
                    {action.title}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </Link>
              );
            })}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="p-5 md:p-6">
          <div className="flex flex-wrap gap-2">
            {identityTabs.map((item) => {
              const Icon = item.icon;
              const isActive = activeIdentity === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveIdentity(item.key)}
                  className={`interactive-glow flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${isActive ? "bg-neon/25 text-white shadow-glow" : "bg-white/5 text-slate-300"}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </button>
              );
            })}
          </div>
          <div className="mt-6 grid gap-5 lg:grid-cols-[220px_1fr]">
            <div className="rounded-[24px] border border-neon/20 bg-neon/10 p-5">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-slate-950/70 text-neon">
                <IdentityIcon className="h-10 w-10" />
              </div>
              <h2 className="mt-5 text-2xl font-black">{currentIdentity.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">{currentIdentity.subtitle}</p>
            </div>
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {currentIdentity.metrics.map(([label, value]) => (
                  <GlassCard key={label} className="interactive-glow p-4">
                    <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</div>
                    <div className="mt-2 text-2xl font-black">{value}</div>
                  </GlassCard>
                ))}
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {currentIdentity.capabilities.map((item) => (
                  <button key={item} type="button" onClick={() => setModal({ title: item, description: `${item} opens a deeper NEXNS control surface for ${currentIdentity.title.toLowerCase()}.` })} className="interactive-glow flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 text-left text-sm">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-mint" />
                      {item}
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black">Live Personal Data</h2>
              <p className="mt-2 text-sm text-slate-300">Unified activity across prediction, creator, project, growth, rewards, and companion layers.</p>
            </div>
            <button onClick={() => setModal({ title: "Personal Data Map", description: "A consolidated view of all NEXNS identity surfaces connected to this account." })} className="rounded-xl bg-neon/20 px-4 py-2 text-sm font-semibold text-purple-100">
              View Map
            </button>
          </div>
          <MiniLine data={roiData} color="#22d3ee" height={190} />
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["Predictions", String(predictions.length + 42), Target],
              ["Creator Rank", "#152", Trophy],
              ["Projects Supported", "12", Rocket],
            ].map(([label, value, Icon]) => (
              <GlassCard key={label as string} className="p-4">
                <Icon className="mb-2 h-5 w-5 text-cyan" />
                <div className="text-xs text-slate-400">{label as string}</div>
                <div className="text-2xl font-black">{value as string}</div>
              </GlassCard>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black">Share & Invite Center</h2>
              <p className="mt-2 text-sm text-slate-300">Separate share surfaces for user growth, creator acquisition, and project promotion.</p>
            </div>
            <button onClick={() => setModal({ title: "Create New Invite Campaign", description: "Generate role-specific invite links, campaign pages, QR posters, and tracking dashboards for NEXNS growth." })} className="purple-button rounded-xl px-4 py-3 text-sm font-semibold">
              Create Campaign
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            {shareKits.map((kit) => {
              const Icon = kit.icon;
              return (
                <GlassCard key={kit.title} className="interactive-glow p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-neon/18 text-neon">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span>
                        <b>{kit.title}</b>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{kit.copy}</p>
                        <span className="mt-2 block rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 font-mono text-xs text-cyan">{kit.link}</span>
                      </span>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button type="button" onClick={() => setModal({ title: `Copy ${kit.title}`, description: kit.link })} className="interactive-glow rounded-xl border border-white/10 bg-white/5 p-3">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => setModal({ title: kit.poster, description: `Open a generated visual asset for ${kit.title.toLowerCase()}.` })} className="interactive-glow rounded-xl border border-white/10 bg-white/5 p-3">
                        <Image className="h-4 w-4" />
                      </button>
                      <button type="button" onClick={() => setModal({ title: `Share ${kit.title}`, description: `Share ${kit.link} across social channels, creator rooms, or project communities.` })} className="interactive-glow rounded-xl border border-white/10 bg-white/5 p-3">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black">Project Operator Workspace</h2>
              <p className="mt-2 text-sm text-slate-300">A user can create and manage multiple projects, each with its own campaign link, poster, tasks, and creator distribution.</p>
            </div>
            <Link to="/projects" className="interactive-glow rounded-xl border border-neon/25 bg-neon/10 px-4 py-3 text-sm font-semibold">
              Create Project
            </Link>
          </div>
          <div className="mt-5 grid gap-3">
            {managedProjects.map((project) => (
              <GlassCard key={project.name} className="interactive-glow p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/15 text-cyan">
                        <Briefcase className="h-5 w-5" />
                      </span>
                      <span>
                        <b>{project.name}</b>
                        <br />
                        <span className="text-xs text-mint">{project.status}</span>
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-3">
                      <span>Community {project.members}</span>
                      <span>Volume {project.volume}</span>
                      <span className="font-mono text-cyan">{project.link}</span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button onClick={() => setModal({ title: `${project.name} Dashboard`, description: "Manage campaign progress, project tasks, creators, analytics, and community growth." })} className="interactive-glow rounded-xl bg-white/5 px-4 py-2 text-sm">
                      Manage
                    </button>
                    <button onClick={() => setModal({ title: `${project.name} Share Kit`, description: `Project link: ${project.link}. Includes campaign page, QR poster, creator briefing, and social image assets.` })} className="interactive-glow rounded-xl bg-white/5 px-4 py-2 text-sm">
                      Share Kit
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black">Control Surfaces</h2>
            <p className="mt-2 text-sm text-slate-300">First-level entries for every current and prepared NEXNS personal function.</p>
          </div>
          <Link to="/more" className="interactive-glow rounded-xl border border-neon/25 bg-white/5 px-4 py-3 text-sm font-semibold">
            Open More
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {controlPanels.map((panel) => {
            const Icon = panel.icon;
            const card = (
              <GlassCard className="interactive-glow h-full p-5">
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-neon/18 text-neon">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-xs ${panel.status === "Live" ? "bg-mint/15 text-mint" : panel.status === "System" ? "bg-cyan/15 text-cyan" : "bg-white/10 text-slate-300"}`}>
                    {panel.status}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-black">{panel.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{panel.copy}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-200">
                  Open <ChevronRight className="h-4 w-4" />
                </div>
              </GlassCard>
            );

            return panel.to ? (
              <Link key={panel.title} to={panel.to} className="block">
                {card}
              </Link>
            ) : (
              <button key={panel.title} type="button" onClick={() => openPanel(panel)} className="block h-full text-left">
                {card}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-3">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Daily Tasks</h2>
            <span className="text-sm text-slate-400">Resets in 12:45:32</span>
          </div>
          {tasks.map((task) => (
            <div key={task.label} className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="flex items-center gap-3">
                <task.icon className="h-5 w-5 text-neon" />
                <span>
                  {task.label}
                  <b className="ml-2 text-mint">{task.reward}</b>
                </span>
              </span>
              <button onClick={() => claimTask(task.label, task.reward)} className="rounded-lg bg-neon/50 px-4 py-2 text-sm">
                {claimedTasks.includes(task.label) ? "Claimed" : task.progress}
              </button>
            </div>
          ))}
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Role Achievements</h2>
            <button onClick={() => setModal({ title: "Role Achievements", description: "Achievements are grouped by user, creator, project, community, and companion contribution." })} className="text-sm text-purple-300">
              View All
            </button>
          </div>
          {["First Prediction", "Creator Supporter", "Project Backer", "Community Builder", "NEX Bond Level"].map((item, index) => (
            <div key={item} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span>
                <BadgeCheck className="mr-3 inline h-5 w-5 text-amber-300" />
                {item}
              </span>
              {index < 2 ? <span className="text-mint">Completed</span> : <span className="text-slate-300">In Progress</span>}
            </div>
          ))}
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-black">Rewards & Season</h2>
            <span className="text-sm text-slate-400">SP {seasonPoints} / 1,000</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <span className="block h-full rounded-full bg-neon" style={{ width: `${Math.min(100, seasonPoints / 10)}%` }} />
          </div>
          {[...liveRewards.slice(0, 2), ...rewards.slice(0, 3)].slice(0, 5).map((reward, index) => {
            const rewardTitle = "title" in reward ? reward.title : reward.label;
            const rewardValue = "value" in reward ? reward.value : reward.detail.match(/\+\d+ NS/)?.[0] ?? "+10 NS";

            return (
              <div key={`${rewardTitle}-${index}`} className="flex items-center justify-between gap-3 border-t border-white/10 py-3">
                <span className="flex items-center gap-3">
                  <Gift className="h-5 w-5 text-neon" />
                  {rewardTitle}
                </span>
                <span className="text-mint">{rewardValue}</span>
              </div>
            );
          })}
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr_1fr]">
        <GlassCard className="p-5">
          <h2 className="text-xl font-black">Creator Snapshot</h2>
          {creators.slice(0, 3).map((creator) => (
            <Link key={creator.name} to={`/creator/${creator.name.toLowerCase()}`} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
              <span className="flex items-center gap-3">
                <img src={creator.avatar} alt="" className="h-9 w-9 rounded-full" />
                <span>
                  <b>{creator.name}</b>
                  <br />
                  <span className="text-xs text-slate-400">{creator.followers} followers</span>
                </span>
              </span>
              <span className="text-mint">{creator.roi}</span>
            </Link>
          ))}
        </GlassCard>

        <GlassCard className="p-5">
          <h2 className="text-xl font-black">Project Operator View</h2>
          {projects.slice(0, 3).map((project) => {
            const Icon = project.icon;
            return (
              <Link key={project.name} to={`/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}`} className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan/15 text-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <b>{project.name}</b>
                    <br />
                    <span className="text-xs text-slate-400">{project.category}</span>
                  </span>
                </span>
                <span className="text-mint">{project.growth}</span>
              </Link>
            );
          })}
        </GlassCard>

        <GlassCard className="border-amber-400/30 p-5">
          <KeyRound className="h-12 w-12 text-amber-300" />
          <h2 className="mt-3 text-2xl font-black text-amber-100">VIP 3 Access</h2>
          {["Higher prediction rewards", "Daily NS bonus", "Priority support", "Creator access", "Campaign visibility"].map((item) => (
            <div key={item} className="mt-3 flex items-center gap-2 text-sm text-slate-200">
              <CheckCircle2 className="h-4 w-4 text-mint" />
              {item}
            </div>
          ))}
          <button onClick={() => setModal({ title: "VIP Access", description: "VIP tiers organize future membership benefits, access levels, reward boosts, and ecosystem privileges. No payment or wallet action is initiated." })} className="interactive-glow mt-5 w-full rounded-xl bg-gradient-to-r from-amber-700 to-amber-400 py-3 font-semibold">
            View VIP Path
          </button>
        </GlassCard>
      </section>

      <GlassCard className="mt-5 grid gap-5 p-6 lg:grid-cols-[1fr_280px]">
        <div>
          <h2 className="text-2xl font-black">Next Best Actions</h2>
          <p className="mt-2 text-slate-300">NEXNS connects personal activity to market signals, creator influence, project growth, and companion progress.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Complete one prediction", Target, "/prediction"],
              ["Follow a creator", Users, "/creator"],
              ["Join a project campaign", Rocket, "/projects"],
              ["Train NEX companion", PawPrint, "/pet"],
            ].map(([label, Icon, to]) => (
              <Link key={label as string} to={to as string} className="interactive-glow rounded-2xl border border-white/10 bg-white/5 p-4">
                <Icon className="mb-3 h-6 w-6 text-neon" />
                <div className="font-semibold">{label as string}</div>
              </Link>
            ))}
          </div>
        </div>
        <GlassCard className="bg-neon/15 p-6">
          <h2 className="text-2xl font-black">Ask NEX</h2>
          <p className="mt-2 text-slate-300">Use Chat for guidance across personal growth, predictions, creators, projects, and companion progress.</p>
          <Link to="/companion" className="purple-button mt-6 inline-flex rounded-xl px-6 py-3">
            Open Chat
          </Link>
        </GlassCard>
      </GlassCard>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-slate-200">
          NEXNS personal center uses local product state only. No wallet transaction, payment, token transfer, or blockchain execution is initiated.
        </div>
      </PreviewModal>
    </AppShell>
  );
}
