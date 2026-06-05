import { ArrowRight, BadgeCheck, CalendarClock, Coins, Copy, Database, FileText, Gift, Image, Link as LinkIcon, Plus, Rocket, Settings, ShieldCheck, Target, Users, Wand2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { PreviewModal } from "../components/ui/PreviewModal";
import { useProductState } from "../state/productState";

const creationModes = [
  {
    title: "Create SOL Token Prediction",
    copy: "For a SOL ecosystem token, create a prediction project where platform users and your own community can predict market outcomes.",
    icon: Target,
    status: "Primary",
  },
  {
    title: "Project Reward Campaign",
    copy: "Add project-defined token rewards on top of NEXNS platform rules: prediction rewards, task rewards, creator boosts, and community incentives.",
    icon: Rocket,
    status: "Project",
  },
  {
    title: "Creator Launch Pack",
    copy: "Prepare creator briefings, content prompts, signal rooms, and community distribution for a campaign.",
    icon: Wand2,
    status: "Creator",
  },
];

const creationSteps = [
  ["SOL Token Profile", "Token name, ticker, mint address, project links, category, logo, and public campaign identity.", FileText],
  ["Prediction Rules", "Question, target token, timeframe, settlement source, pool display, and UP/DOWN market rules.", Target],
  ["Project Token Rewards", "Optional project-funded token rewards beyond platform rewards: prediction bonus, task bonus, and creator boost.", Gift],
  ["Community Routing", "Invite project users, creators, campaign partners, and NEXNS market participants into the same prediction page.", Users],
  ["Share Assets", "Campaign link, token prediction poster, QR card, social image, creator brief, and community copy.", Image],
  ["Review & Safety", "Risk notices, project verification, token disclaimer, moderation, and campaign approval state.", ShieldCheck],
];

const createdProjects = [
  { name: "NEXUS AI", type: "AI Prediction Network", state: "Live", link: "nexns.xyz/projects/nexus-ai", mint: "NEXnS9zQ6WcL3u9mXq7Rk8Pv4hA2sNEXNS9kL2" },
  { name: "MetaPlay", type: "GameFi Campaign", state: "Draft", link: "nexns.xyz/projects/metaplay", mint: "MEtA7xK9qWb2Lp4rP8sV6h3nYc1Dg5GameFi" },
  { name: "GreenRWA", type: "RWA Growth Market", state: "Review", link: "nexns.xyz/projects/greenrwa", mint: "RWA8mN2sL4qP7tY9vX3cB6kD1gF5Green" },
];

const defaultProjectForm = {
  projectName: "NEXUS AI",
  symbol: "NEXAI",
  mintAddress: "NEXAi9aQ6WcL3u9mXq7Rk8Pv4hA2sSoLProject9kL2",
  website: "https://nexus-ai.example",
  community: "https://t.me/nexusai",
  category: "AI",
  question: "Will NEXUS AI close above $0.025 in the next 24 hours?",
  timeframe: "24H",
  settlementSource: "Pyth + Jupiter TWAP",
  rewardToken: "NEXAI",
  rewardMint: "NEXAi9aQ6WcL3u9mXq7Rk8Pv4hA2sSoLProject9kL2",
  rewardBudget: "2,500,000",
  predictionBonus: "+35 NEXAI per valid prediction",
  creatorBoost: "5% campaign pool for top creators",
};

const shortAddress = (address: string) => (address.length > 22 ? `${address.slice(0, 9)}...${address.slice(-9)}` : address);

export function CreatePage() {
  const { addActivity } = useProductState();
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);
  const [projectForm, setProjectForm] = useState(defaultProjectForm);

  const updateProjectForm = (field: keyof typeof defaultProjectForm, value: string) => {
    setProjectForm((current) => ({ ...current, [field]: value }));
  };

  const createDraft = (title: string) => {
    addActivity({
      type: "project",
      title: `${title} draft created`,
      detail: "A local project creation record was prepared with campaign, market, creator, and share surfaces.",
    });
    setModal({
      title: `${title} Draft`,
      description: "This opens the full creation flow: profile, market rules, reward tasks, creator activation, share links, and review state.",
    });
  };

  const verifyTokenIdentity = () => {
    addActivity({
      type: "project",
      title: `${projectForm.symbol} token identity reviewed`,
      detail: `${projectForm.mintAddress} was checked inside the local project creation workspace.`,
    });
    setModal({
      title: "Token Identity Ready",
      description: `${projectForm.projectName} is now mapped to ${projectForm.symbol} by Solana mint address ${projectForm.mintAddress}. Address identity is required because decentralized ecosystems can contain projects with identical names or tickers.`,
    });
  };

  const createTokenProject = () => {
    addActivity({
      type: "project",
      title: `${projectForm.projectName} prediction project created`,
      detail: `${projectForm.symbol} market, reward budget, creator routing, and share assets were prepared in the local product state.`,
    });
    setModal({
      title: `${projectForm.projectName} Project Created`,
      description: `${projectForm.question} is ready as a ${projectForm.timeframe} Solana token prediction project with ${projectForm.rewardBudget} ${projectForm.rewardToken} project rewards configured.`,
    });
  };

  return (
    <AppShell>
      <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="relative overflow-hidden p-6 md:p-8">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-neon/20 blur-3xl" />
          <div className="relative z-10">
            <div className="nex-label">Create on NEXNS</div>
            <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Create a prediction project for your SOL token.</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Project teams can list a SOL-chain token on NEXNS as a prediction project. Their own users and NEXNS users can predict outcomes, join tasks, follow creators, and earn platform rewards plus optional project-defined token rewards.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => createDraft("Project Campaign")} className="purple-button interactive-glow inline-flex items-center gap-3 rounded-xl px-6 py-4 font-semibold">
                Create Token Project <Plus className="h-4 w-4" />
              </button>
              <button onClick={() => createDraft("Prediction Market")} className="interactive-glow inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-semibold">
                Configure Prediction <Target className="h-4 w-4" />
              </button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8">
          <Mascot variant="project" className="mx-auto w-56" />
          <h2 className="mt-4 text-2xl font-black">Project Operator Mode</h2>
          <p className="mt-3 leading-7 text-slate-300">
            After creating a token prediction project, this account keeps its user identity while unlocking project operator controls: market settings, reward rules, campaign links, task management, and creator distribution.
          </p>
          <Link to="/my" className="interactive-glow mt-5 inline-flex items-center gap-2 rounded-xl bg-neon/15 px-5 py-3 font-semibold">
            Open Personal Center <ArrowRight className="h-4 w-4" />
          </Link>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-5 md:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">SOL Token Project Builder</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                Create a token-specific prediction project using the Solana mint address as the primary identity. Tickers can repeat across decentralized markets; mint address identity keeps project markets, rewards, and campaign links unambiguous.
              </p>
            </div>
            <button onClick={verifyTokenIdentity} className="interactive-glow inline-flex items-center gap-2 rounded-xl border border-mint/25 bg-mint/10 px-4 py-3 text-sm font-semibold text-mint">
              <BadgeCheck className="h-4 w-4" /> Verify Token
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Project Name", "projectName", "NEXUS AI"],
              ["Token Symbol", "symbol", "NEXAI"],
              ["Solana Mint Address", "mintAddress", "Enter token mint address"],
              ["Project Website", "website", "https://"],
              ["Community Link", "community", "Telegram / Discord / X"],
              ["Market Category", "category", "AI / GameFi / Meme / DeFi"],
            ].map(([label, field, placeholder]) => (
              <label key={field} className="grid gap-2 text-sm font-semibold text-slate-200">
                {label}
                <input
                  value={projectForm[field as keyof typeof defaultProjectForm]}
                  onChange={(event) => updateProjectForm(field as keyof typeof defaultProjectForm, event.target.value)}
                  placeholder={placeholder}
                  className="rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 font-medium text-white outline-none transition focus:border-neon/50"
                />
              </label>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.04] p-4">
            <div className="mb-4 flex items-center gap-3">
              <Target className="h-5 w-5 text-cyan" />
              <h3 className="text-lg font-black">Prediction Market Rules</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr_1fr]">
              <label className="grid gap-2 text-sm font-semibold text-slate-200">
                Prediction Question
                <textarea
                  value={projectForm.question}
                  onChange={(event) => updateProjectForm("question", event.target.value)}
                  rows={3}
                  className="rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition focus:border-neon/50"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-200">
                Timeframe
                <select value={projectForm.timeframe} onChange={(event) => updateProjectForm("timeframe", event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition focus:border-neon/50">
                  {["5M", "15M", "1H", "4H", "24H", "7D"].map((time) => <option key={time}>{time}</option>)}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-200">
                Settlement Source
                <select value={projectForm.settlementSource} onChange={(event) => updateProjectForm("settlementSource", event.target.value)} className="rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition focus:border-neon/50">
                  {["Pyth + Jupiter TWAP", "Pyth Price Feed", "Jupiter TWAP", "NEXNS Index Review"].map((source) => <option key={source}>{source}</option>)}
                </select>
              </label>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-neon/20 bg-neon/8 p-4">
            <div className="mb-4 flex items-center gap-3">
              <Gift className="h-5 w-5 text-neon" />
              <h3 className="text-lg font-black">Project-Defined Token Rewards</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["Reward Token", "rewardToken"],
                ["Reward Token Mint", "rewardMint"],
                ["Reward Budget", "rewardBudget"],
                ["Prediction Bonus", "predictionBonus"],
                ["Creator Boost", "creatorBoost"],
              ].map(([label, field]) => (
                <label key={field} className="grid gap-2 text-sm font-semibold text-slate-200">
                  {label}
                  <input
                    value={projectForm[field as keyof typeof defaultProjectForm]}
                    onChange={(event) => updateProjectForm(field as keyof typeof defaultProjectForm, event.target.value)}
                    className="rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-white outline-none transition focus:border-neon/50"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={createTokenProject} className="purple-button interactive-glow inline-flex items-center gap-3 rounded-xl px-6 py-4 font-semibold">
              Create Prediction Project <Rocket className="h-4 w-4" />
            </button>
            <button onClick={() => setModal({ title: "Share Kit Generated", description: `${projectForm.projectName} share link, poster copy, creator briefing, community message, and QR campaign card are ready for distribution.` })} className="interactive-glow inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-6 py-4 font-semibold">
              Generate Share Kit <Image className="h-4 w-4" />
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black">Project Preview</h2>
            <span className="rounded-full bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">Draft</span>
          </div>
          <div className="mt-5 rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-neon to-cyan text-xl font-black">{projectForm.symbol.slice(0, 2).toUpperCase()}</span>
              <div>
                <h3 className="text-2xl font-black">{projectForm.projectName}</h3>
                <p className="text-sm text-slate-400">{projectForm.category} · Solana token prediction project</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Mint Address</div>
                <div className="mt-2 break-all font-mono text-sm text-cyan">{projectForm.mintAddress}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-400">Prediction</div>
                <div className="mt-2 text-sm leading-6 text-slate-200">{projectForm.question}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <CalendarClock className="mb-2 h-4 w-4 text-neon" />
                  <b>{projectForm.timeframe}</b>
                  <p className="text-xs text-slate-400">Market Window</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                  <Coins className="mb-2 h-4 w-4 text-amber-300" />
                  <b>{projectForm.rewardBudget}</b>
                  <p className="text-xs text-slate-400">{projectForm.rewardToken} Rewards</p>
                </div>
              </div>
              <div className="rounded-2xl border border-mint/20 bg-mint/10 p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-mint">Share Link</span>
                  <Copy className="h-4 w-4 text-mint" />
                </div>
                <div className="mt-2 font-mono text-xs text-mint">nexns.xyz/prediction/{projectForm.symbol.toLowerCase()}-{shortAddress(projectForm.mintAddress).toLowerCase()}</div>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {[
              ["Token identity", "Mint address required before publish", Database],
              ["Project rewards", "Optional token incentives can sit above platform rules", Gift],
              ["Creator distribution", "Invite creators to explain and amplify the market", Users],
            ].map(([title, copy, Icon]) => (
              <div key={title as string} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
                <Icon className="mt-1 h-5 w-5 text-cyan" />
                <div>
                  <b>{title as string}</b>
                  <p className="text-sm leading-6 text-slate-400">{copy as string}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-3">
        {creationModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button key={mode.title} onClick={() => createDraft(mode.title)} className="text-left">
              <GlassCard className="interactive-glow h-full p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-neon/18 text-neon">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-slate-300">{mode.status}</span>
                </div>
                <h3 className="mt-5 text-xl font-black">{mode.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{mode.copy}</p>
              </GlassCard>
            </button>
          );
        })}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.82fr]">
        <GlassCard className="p-5 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black">Creation Flow</h2>
              <p className="mt-2 text-sm text-slate-300">The full SOL token prediction project stack: token identity, prediction rules, extra project rewards, creator routing, and campaign assets.</p>
            </div>
            <button onClick={() => setModal({ title: "Creation Settings", description: "Configure market rules, project identity, creator invitations, task rewards, and visibility settings." })} className="interactive-glow rounded-xl border border-white/10 bg-white/5 p-3">
              <Settings className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {creationSteps.map(([title, copy, Icon]) => (
              <button key={title as string} onClick={() => setModal({ title: title as string, description: copy as string })} className="interactive-glow rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                <Icon className="mb-3 h-6 w-6 text-cyan" />
                <b>{title as string}</b>
                <p className="mt-2 text-sm leading-6 text-slate-300">{copy as string}</p>
              </button>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 md:p-6">
          <h2 className="text-2xl font-black">My Created Projects</h2>
          <p className="mt-2 text-sm text-slate-300">Each created token project has independent prediction links, reward rules, campaign state, creator invitations, and share assets.</p>
          <div className="mt-5 grid gap-3">
            {createdProjects.map((project) => (
              <GlassCard key={project.name} className="interactive-glow p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <b>{project.name}</b>
                    <p className="mt-1 text-sm text-slate-400">{project.type}</p>
                  </div>
                  <span className="rounded-full bg-mint/15 px-2.5 py-1 text-xs text-mint">{project.state}</span>
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 font-mono text-xs text-cyan">
                  <LinkIcon className="h-4 w-4" />
                  {project.link}
                </div>
                <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 font-mono text-xs text-slate-300">
                  <Database className="h-4 w-4 text-neon" />
                  Mint: {shortAddress(project.mint)}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => setModal({ title: `${project.name} Management`, description: "Open token prediction rules, reward budget, campaign tasks, creator distribution, and moderation controls." })} className="interactive-glow rounded-xl bg-white/5 px-3 py-2 text-sm">Manage</button>
                  <button onClick={() => setModal({ title: `${project.name} Share Assets`, description: "Open token prediction poster, QR code, campaign link, creator brief, project community copy, and social image pack." })} className="interactive-glow rounded-xl bg-white/5 px-3 py-2 text-sm">Share Assets</button>
                </div>
              </GlassCard>
            ))}
          </div>
        </GlassCard>
      </section>

      <GlassCard className="mt-5 p-5 md:p-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Prediction Window", "5M / 15M / 1H / 24H", CalendarClock],
            ["Project Rewards", "Token bonus / Task bonus", Gift],
            ["User Routing", "Project users / NEXNS users", Users],
            ["Review State", "Draft / Live / Settlement", BadgeCheck],
          ].map(([label, value, Icon]) => (
            <div key={label as string} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <Icon className="mb-3 h-5 w-5 text-neon" />
              <div className="text-xs uppercase tracking-[0.16em] text-slate-400">{label as string}</div>
              <div className="mt-2 font-black">{value as string}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-slate-200">
          Creation flows are simulated product surfaces. No wallet, payment, token reward transfer, or blockchain transaction is initiated.
        </div>
      </PreviewModal>
    </AppShell>
  );
}
