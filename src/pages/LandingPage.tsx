import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CircleDollarSign,
  Crown,
  Github,
  Globe2,
  Linkedin,
  MessageCircle,
  Network,
  Play,
  RadioTower,
  Rocket,
  Send,
  Sparkles,
  Target,
  Trophy,
  Users,
  Youtube,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MiniLine } from "../components/charts/MiniLine";
import { GlassCard } from "../components/ui/GlassCard";
import { Logo } from "../components/ui/Logo";
import { Mascot } from "../components/ui/Mascot";
import { useLivePreviewData } from "../hooks/useLivePreviewData";

const nav = [
  { label: "Home", href: "#home" },
  { label: "Engine", href: "#growth-engine" },
  { label: "Product", href: "#how-it-works" },
  { label: "Investors", href: "/investor" },
  { label: "Community", href: "#community" },
  { label: "Roadmap", href: "#roadmap" },
];

const heroStats = [
  { value: 1.28, suffix: "M+", label: "Users" },
  { value: 24.58, suffix: "M+", label: "Predictions" },
  { value: 15.28, suffix: "K+", label: "Creators" },
  { value: 468, suffix: "+", label: "Projects" },
];

const workFlow = [
  { label: "Users", copy: "Create attention", icon: Users },
  { label: "Predictions", copy: "Reveal demand", icon: Target },
  { label: "Creators", copy: "Build influence", icon: Crown },
  { label: "Projects", copy: "Activate growth", icon: Rocket },
  { label: "NEX Companion", copy: "Retains progress", icon: Bot },
  { label: "Growth Loop", copy: "Compounds value", icon: Network },
] satisfies { label: string; copy: string; icon: LucideIcon }[];

const engineNodes = [
  { label: "Users", copy: "Create attention", icon: Users },
  { label: "Creators", copy: "Amplify influence", icon: Crown },
  { label: "Projects", copy: "Acquire growth", icon: Rocket },
  { label: "Rewards", copy: "Return value", icon: Trophy },
  { label: "Companions", copy: "Drive retention", icon: Bot },
  { label: "Community", copy: "Compounds trust", icon: MessageCircle },
] satisfies { label: string; copy: string; icon: LucideIcon }[];

const ecosystemStatements = [
  ["Users", "create attention."],
  ["Creators", "amplify influence."],
  ["Projects", "acquire growth."],
  ["NEX", "drives retention."],
] satisfies [string, string][];

const narratives = [
  {
    id: "users-return",
    label: "Why Users Return",
    title: "Every visit creates progress.",
    copy: "Users come back because predictions are not isolated bets. They create EXP, rewards, pet growth, status, and visible activity across the ecosystem.",
    proof: ["Predictions", "Rewards", "NEX Companion"],
    icon: Target,
    metric: "+42%",
    metricLabel: "return loop lift",
    scene: "prediction",
    character: "Prediction NEX",
    characterVariant: "prediction",
  },
  {
    id: "creators-stay",
    label: "Why Creators Stay",
    title: "Influence becomes an asset.",
    copy: "Creators stay because NEXNS turns insight into audience, reputation, community leadership, campaign access, and long-term earning potential.",
    proof: ["Followers", "Communities", "Campaigns"],
    icon: Crown,
    metric: "15.2K",
    metricLabel: "active creators",
    scene: "creator",
    character: "Creator NEX",
    characterVariant: "creator",
  },
  {
    id: "projects-pay",
    label: "Why Projects Pay",
    title: "Projects buy measurable growth.",
    copy: "Projects pay because NEXNS connects prediction attention, creator distribution, community activation, and growth analytics in one measurable system.",
    proof: ["Attention", "Distribution", "Analytics"],
    icon: Rocket,
    metric: "468",
    metricLabel: "project launches",
    scene: "project",
    character: "Project NEX",
    characterVariant: "project",
  },
] satisfies {
  id: string;
  label: string;
  title: string;
  copy: string;
  proof: string[];
  icon: LucideIcon;
  metric: string;
  metricLabel: string;
  scene: "prediction" | "creator" | "project";
  character: string;
  characterVariant: "prediction" | "creator" | "project";
}[];

const investorLinks = [
  { label: "Growth Journey", href: "/investor/growth-journey", icon: Trophy },
  { label: "Flywheel", href: "/investor/flywheel", icon: Network },
  { label: "Value Flow", href: "/investor/value-flow", icon: CircleDollarSign },
  { label: "Ecosystem", href: "/investor/ecosystem", icon: Sparkles },
  { label: "Investor One Page", href: "/investor/one-page", icon: BarChart3 },
];

const communityChannels = [
  { label: "X", metric: "32.1K", icon: Globe2 },
  { label: "Telegram", metric: "15.8K", icon: Send },
  { label: "Discord", metric: "24.5K", icon: MessageCircle },
  { label: "LinkedIn", metric: "8.4K", icon: Linkedin },
  { label: "GitHub", metric: "2.8K", icon: Github },
  { label: "YouTube", metric: "6.2K", icon: Youtube },
];

const roadmap = [
  ["Q1", "AI Companion"],
  ["Q2", "Creator Economy Expansion"],
  ["Q3", "Project Growth Network"],
  ["Q4", "Mobile Ecosystem Expansion"],
] satisfies [string, string][];

const visionCards = [
  { title: "Founder & Vision", character: "Leader", copy: "Defines the ecosystem thesis and long-term growth network strategy.", icon: Crown },
  { title: "Product & Experience", character: "Guiding", copy: "Shapes the user journey across prediction, rewards, and progression.", icon: Sparkles },
  { title: "Growth & Community", character: "Community", copy: "Connects creators, project campaigns, and ecosystem participation.", icon: Users },
  { title: "AI & Intelligence", character: "Thinking", copy: "Powers guidance, next actions, retention, and companion intelligence.", icon: BrainCircuit },
] satisfies { title: string; character: string; copy: string; icon: LucideIcon }[];

const faqs = [
  ["What is NEXNS?", "NEXNS is an AI-powered growth network where users predict, creators influence, projects grow, and NEX companions retain participation."],
  ["Who uses NEXNS?", "Users, creators, project teams, and communities use NEXNS to turn attention into measurable growth."],
  ["Why do users return?", "Daily predictions, rewards, activity, and companion progression give users visible reasons to come back."],
  ["Why do creators and projects participate?", "Creators gain influence and earning paths. Projects gain attention, distribution, activation, and analytics."],
  ["How does the ecosystem grow?", "Each action creates more signals, content, community, rewards, and project value, reinforcing the next loop."],
] satisfies [string, string][];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const formatted = value >= 100 ? Math.round(value).toLocaleString("en-US") : value.toFixed(2);
  return (
    <div className="nex-metric text-2xl md:text-3xl">
      {formatted}
      {suffix}
    </div>
  );
}

export function LandingPage() {
  const { markets, creators, projects, btc } = useLivePreviewData();

  return (
    <div className="min-h-screen overflow-hidden bg-space-radial px-4 py-5 sm:px-5">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[10%] h-[520px] w-[520px] rounded-full bg-neon/10 blur-[90px]" />
        <div className="absolute right-[-10%] top-[38%] h-[480px] w-[480px] rounded-full bg-cyan/10 blur-[100px]" />
        <div className="absolute bottom-[12%] left-[20%] h-[360px] w-[720px] -rotate-12 rounded-full bg-blue/10 blur-[90px]" />
        <div className="light-beam absolute -left-24 top-24 h-20 w-[70vw]" />
        <div className="light-beam absolute right-0 top-[560px] h-24 w-[60vw]" />
        <div className="light-beam absolute left-1/4 top-[1280px] h-16 w-[55vw] opacity-40" />
        {Array.from({ length: 22 }).map((_, index) => (
          <span
            key={index}
            className="particle absolute h-1.5 w-1.5 rounded-full bg-cyan shadow-cyan"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${10 + ((index * 53) % 80)}%`,
              animationDelay: `${index * 0.22}s`,
            }}
          />
        ))}
      </div>

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {nav.map((item, index) =>
            item.href.startsWith("/") ? (
              <Link key={item.label} className="pb-2 text-slate-300 hover:text-white" to={item.href}>
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                className={`pb-2 ${index === 0 ? "border-b-2 border-neon text-white" : "text-slate-300 hover:text-white"}`}
                href={item.href}
              >
                {item.label}
              </a>
            ),
          )}
        </nav>
        <Link to="/app" className="purple-button interactive-glow flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:px-5">
          Open Product <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl">
        <section id="home" className="relative grid min-h-[650px] items-center gap-8 overflow-hidden py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div className="z-10" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="nex-label">PredictionFi x Creator Economy x AI Companion</div>
            <h1 className="mt-4 text-6xl font-black leading-none md:text-8xl">NEXNS</h1>
            <div className="mt-4 max-w-2xl text-4xl font-black leading-tight text-gradient md:text-6xl">The AI-Powered Growth Network</div>
            <p className="mt-6 max-w-xl text-2xl font-black leading-tight text-white md:text-3xl">Where Attention Becomes Growth</p>
            <p className="mt-5 max-w-xl text-xl font-semibold leading-9 text-slate-200">
              Users Predict. Creators Influence. Projects Grow. Powered by NEX.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#growth-engine" className="purple-button interactive-glow flex items-center gap-2 rounded-xl px-7 py-4 font-semibold">
                Explore Ecosystem <ArrowDown className="h-5 w-5" />
              </a>
              <Link to="/presentation" className="interactive-glow flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-semibold">
                <Play className="h-5 w-5" /> Start Presentation
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <GlassCard key={stat.label} className="interactive-glow p-4">
                  <Counter value={stat.value} suffix={stat.suffix} />
                  <div className="mt-1 text-sm font-semibold text-slate-400">{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          <div className="relative min-h-[500px] overflow-hidden rounded-[32px] soft-grid">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_38%,rgba(139,92,246,0.22),transparent_34%),radial-gradient(circle_at_78%_60%,rgba(34,211,238,0.16),transparent_30%)]" />
            <div className="absolute left-6 right-6 top-20 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
            <div className="absolute bottom-28 left-10 h-px w-2/3 -rotate-6 bg-gradient-to-r from-transparent via-neon/45 to-transparent" />
            <div className="absolute inset-x-6 bottom-10 h-28 rounded-[50%] border border-cyan/60 bg-neon/10 blur-sm shadow-cyan" />
            <motion.div animate={{ y: [0, -18, 0], rotate: [0, -1.2, 0, 1.2, 0] }} transition={{ duration: 5.5, repeat: Infinity }}>
              <Mascot variant="master" className="relative z-10 mx-auto w-[min(620px,96vw)]" />
            </motion.div>
            <FloatingMetric className="left-2 top-28" label="BTC Signal" value={`${btc.up}% UP`} />
            <FloatingMetric className="right-4 top-44" label="Creator ROI" value={creators[0].roi} />
            <FloatingMetric className="bottom-14 left-12" label="Project Growth" value={projects[0].growth} />
          </div>
        </section>

        <section id="what-is-nexns" className="py-8">
          <GlassCard className="relative overflow-hidden p-7 md:p-9">
            <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-neon/20 to-transparent lg:block" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="nex-label">What Is NEXNS</div>
                <h2 className="mt-3 nex-title text-3xl md:text-5xl">A growth network that turns participation into compounding ecosystem value.</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {ecosystemStatements.map(([actor, copy]) => (
                  <div key={actor} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="nex-label text-[10px]">{actor}</div>
                    <div className="mt-2 text-xl font-black text-white">{copy}</div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </section>

        <section id="growth-engine" className="py-12">
          <SectionHeader
            label="NEX Growth Engine"
            title="One engine. Continuous growth."
            copy="Users, creators, projects, rewards, companions, and community reinforce one another."
          />
          <div className="scene-shell relative mt-8 overflow-hidden p-6 md:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.28),transparent_34%),radial-gradient(circle_at_50%_60%,rgba(34,211,238,0.14),transparent_38%)]" />
            <div className="absolute inset-x-12 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />
            <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/10" />
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/15" />
            <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_420px_1fr]">
              <div className="grid gap-4">
                {engineNodes.slice(0, 3).map((node) => (
                  <EngineNode key={node.label} {...node} />
                ))}
              </div>
              <div className="relative mx-auto grid h-[420px] w-[min(420px,88vw)] place-items-center rounded-full border border-neon/30 bg-black/25 shadow-hero">
                <div className="flywheel-spin absolute inset-4 rounded-full border border-dashed border-cyan/40" />
                <div className="flywheel-spin absolute inset-20 rounded-full border border-dashed border-neon/30 [animation-duration:28s]" />
                <div className="absolute inset-12 rounded-full border border-neon/20 bg-neon/10" />
                <div className="absolute inset-24 rounded-full bg-cyan/10 blur-2xl" />
                {engineNodes.map((node, index) => (
                  <OrbitNode key={node.label} label={node.label} index={index} icon={node.icon} />
                ))}
                <Mascot variant="master" className="relative z-10 w-72" />
                <div className="absolute bottom-8 rounded-full border border-cyan/40 bg-black/45 px-5 py-2 text-sm font-black text-cyan shadow-cyan backdrop-blur-xl">NEXNS</div>
              </div>
              <div className="grid gap-4">
                {engineNodes.slice(3).map((node) => (
                  <EngineNode key={node.label} {...node} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12">
          <SectionHeader label="How NEXNS Works" title="From users to growth loop in one motion." copy="The core product flow is intentionally simple and repeatable." />
          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            {workFlow.map((item, index) => (
              <FlowStep key={item.label} index={index + 1} {...item} />
            ))}
          </div>
        </section>

        {narratives.map((item, index) => (
          <NarrativeSection key={item.id} reverse={index % 2 === 1} {...item} />
        ))}

        <section id="live-ecosystem" className="py-12">
          <SectionHeader label="Live Ecosystem" title="A concise view of the network in motion." copy="Existing simulated market, creator, project, and companion signals show how NEXNS feels active from the first screen." />
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <GlassCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="nex-title text-xl">Prediction Signals</h3>
                <Link to="/prediction" className="text-sm font-semibold text-purple-300 hover:text-white">
                  Open Prediction <ArrowRight className="inline h-4 w-4" />
                </Link>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {markets.slice(0, 3).map((market) => (
                  <GlassCard key={market.symbol} className="interactive-glow p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{market.symbol}</span>
                      <span className="text-sm font-semibold text-mint">{market.change}</span>
                    </div>
                    <div className="mt-3 nex-metric text-2xl">${market.price}</div>
                    <MiniLine data={market.data} color={market.color} />
                    <div className="mt-3 flex justify-between text-xs text-slate-400">
                      <span>{market.users}</span>
                      <span>{market.pool}</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </GlassCard>
            <div className="grid gap-4">
              <SignalCard title="Creator Signal" value={`${creators[0].name} ${creators[0].roi}`} href="/creator" />
              <SignalCard title="Project Signal" value={`${projects[0].name} ${projects[0].growth}`} href="/projects" />
              <SignalCard title="Companion Signal" value="NEX mood: Inspired" href="/companion" />
            </div>
          </div>
        </section>

        <section id="investor-snapshot" className="py-12">
          <SectionHeader label="Investor Snapshot" title="Explore the proof behind the growth mechanics." copy="Five investor views explain the journey, flywheel, value flow, ecosystem map, and one-page summary." />
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            {investorLinks.map((item) => (
              <Link key={item.label} to={item.href}>
                <GlassCard className="interactive-glow h-full p-5">
                  <div className="nex-icon">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 nex-title text-lg">{item.label}</h3>
                </GlassCard>
              </Link>
            ))}
          </div>
        </section>

        <section id="community" className="py-12">
          <ScenePanel scene="community">
            <SectionHeader label="Community & Social Proof" title="A participation universe around the product." copy="Social channels show how NEXNS expands beyond product usage into community presence and ecosystem momentum." />
            <div className="relative mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
              {communityChannels.map((channel) => (
                <div key={channel.label} className="scene-chip interactive-glow p-5 text-center">
                  <div className="mx-auto nex-icon">
                    <channel.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 nex-title text-lg">{channel.label}</div>
                  <div className="mt-2 text-sm font-bold text-mint">{channel.metric}</div>
                </div>
              ))}
            </div>
          </ScenePanel>
        </section>

        <section id="roadmap" className="py-12">
          <GlassCard className="p-7 md:p-9">
            <SectionHeader label="Roadmap" title="Focused expansion across the product loop." copy="Each phase strengthens the same system: companion retention, creator distribution, project activation, and mobile participation." />
            <div className="mt-8 grid gap-4 lg:grid-cols-4">
              {roadmap.map(([quarter, title]) => (
                <GlassCard key={quarter} className="interactive-glow p-5">
                  <div className="nex-icon text-base font-black">{quarter}</div>
                  <h3 className="mt-5 nex-title text-xl">{title}</h3>
                </GlassCard>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="team-vision" className="py-12">
          <ScenePanel scene="vision">
            <SectionHeader label="Team / Vision" title="The minds behind the ecosystem." copy="Capability-led execution, represented through the NEX character system rather than individual profiles." />
            <div className="relative mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {visionCards.map((card) => (
                <VisionCard key={card.title} {...card} />
              ))}
            </div>
          </ScenePanel>
        </section>

        <section id="faq" className="py-12">
          <SectionHeader label="FAQ" title="Five fast answers for first-time investors." copy="A concise close that reinforces the product story without adding more modules." />
          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {faqs.map(([question, answer]) => (
              <GlassCard key={question} className="p-5">
                <h3 className="nex-title text-lg">{question}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{answer}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 text-slate-400">
          <div className="grid gap-8 md:grid-cols-[1.4fr_repeat(4,1fr)]">
            <div>
              <Logo compact />
              <p className="mt-4 max-w-sm text-sm leading-6">NEXNS turns prediction attention into creator influence, project growth, and companion-driven retention.</p>
            </div>
            <FooterColumn title="Product" links={["Home", "Prediction", "Creator", "Projects"]} />
            <FooterColumn title="Investor" links={["Investor Center", "Presentation", "One Page", "Value Flow"]} />
            <FooterColumn title="Community" links={["X", "Telegram", "Discord", "LinkedIn"]} />
            <FooterColumn title="Resources" links={["Docs", "FAQ", "Roadmap", "Contact"]} />
          </div>
          <div className="mt-8 text-sm">(c) 2026 NEXNS. All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
}

function SectionHeader({ label, title, copy }: { label: string; title: string; copy: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="nex-label">{label}</div>
      <h2 className="mt-3 nex-title text-3xl md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">{copy}</p>
    </div>
  );
}

function FloatingMetric({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.5, repeat: Infinity }}
      className={`absolute z-20 hidden rounded-2xl border border-white/15 bg-white/10 px-5 py-4 shadow-glow backdrop-blur-xl sm:block ${className}`}
    >
      <div className="nex-label text-[10px]">{label}</div>
      <div className="mt-1 nex-metric text-xl">{value}</div>
    </motion.div>
  );
}

function EngineNode({ label, copy, icon: Icon }: { label: string; copy: string; icon: LucideIcon }) {
  return (
    <div className="scene-node interactive-glow flex items-center gap-4 p-4">
      <div className="nex-icon shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="nex-title text-lg">{label}</div>
        <div className="text-sm text-slate-400">{copy}</div>
      </div>
    </div>
  );
}

function OrbitNode({ label, index, icon: Icon }: { label: string; index: number; icon: LucideIcon }) {
  const positions = [
    "left-1/2 top-2 -translate-x-1/2",
    "right-4 top-20",
    "right-7 bottom-24",
    "left-1/2 bottom-3 -translate-x-1/2",
    "left-7 bottom-24",
    "left-4 top-20",
  ];

  return (
    <div className={`absolute z-20 hidden rounded-2xl border border-white/10 bg-black/35 px-3 py-2 shadow-glow backdrop-blur-xl sm:block ${positions[index]}`}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-cyan" />
        <span className="text-xs font-black text-white">{label}</span>
      </div>
    </div>
  );
}

function FlowStep({ index, label, copy, icon: Icon }: { index: number; label: string; copy: string; icon: LucideIcon }) {
  return (
    <GlassCard className="interactive-glow p-5 text-center">
      <div className="mx-auto nex-icon">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-xs font-black text-cyan">0{index}</div>
      <h3 className="mt-2 nex-title text-lg">{label}</h3>
      <p className="mt-2 text-sm text-slate-400">{copy}</p>
    </GlassCard>
  );
}

function NarrativeSection({
  id,
  label,
  title,
  copy,
  proof,
  icon: Icon,
  metric,
  metricLabel,
  scene,
  character,
  characterVariant,
  reverse,
}: {
  id: string;
  label: string;
  title: string;
  copy: string;
  proof: string[];
  icon: LucideIcon;
  metric: string;
  metricLabel: string;
  scene: "prediction" | "creator" | "project";
  character: string;
  characterVariant: "prediction" | "creator" | "project";
  reverse: boolean;
}) {
  return (
    <section id={id} className="py-10">
      <ScenePanel scene={scene}>
        <div className={`relative grid items-center gap-8 lg:grid-cols-[1fr_0.85fr] ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <div className="nex-label">{label}</div>
            <h2 className="mt-3 nex-title text-3xl md:text-5xl">{title}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{copy}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              {proof.map((item) => (
                <span key={item} className="rounded-full border border-neon/25 bg-neon/10 px-4 py-2 text-sm font-bold text-purple-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-80 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-neon/20 via-white/5 to-cyan/10 p-6">
            <div className="absolute left-6 right-6 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan/35 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 h-20 rounded-[50%] border border-cyan/30 bg-cyan/10 blur-sm" />
            <div className="absolute right-5 top-5 nex-icon">
              <Icon className="h-5 w-5" />
            </div>
            <Mascot variant={characterVariant} className="relative z-10 mx-auto mt-2 w-52 opacity-95" />
            <div className="absolute left-5 top-5 rounded-full border border-neon/30 bg-black/35 px-3 py-1 text-xs font-black text-purple-200 backdrop-blur-xl">{character}</div>
            <div className="relative z-10 mt-2 text-center">
              <div className="nex-metric text-4xl">{metric}</div>
              <div className="mt-1 text-sm font-semibold text-slate-300">{metricLabel}</div>
            </div>
          </div>
        </div>
      </ScenePanel>
    </section>
  );
}

function ScenePanel({ scene, children }: { scene: "prediction" | "creator" | "project" | "community" | "vision"; children: ReactNode }) {
  const sceneClass = {
    prediction: "from-cyan/10 via-neon/10 to-black/20",
    creator: "from-neon/18 via-magenta/10 to-black/20",
    project: "from-blue/10 via-cyan/10 to-black/20",
    community: "from-cyan/10 via-neon/10 to-black/20",
    vision: "from-neon/10 via-blue/10 to-black/20",
  }[scene];

  return (
    <div className={`scene-shell relative overflow-hidden bg-gradient-to-br ${sceneClass} p-7 md:p-9`}>
      <div className="absolute inset-0 opacity-70 soft-grid" />
      <div className="absolute inset-x-8 top-10 h-px bg-gradient-to-r from-transparent via-cyan/25 to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-40 w-[72%] -translate-x-1/2 rounded-[50%] border border-cyan/20 bg-neon/10 blur-sm" />
      <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-cyan/10 blur-2xl" />
      <div className="absolute left-10 bottom-12 h-28 w-28 rounded-full bg-neon/10 blur-2xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function SignalCard({ title, value, href }: { title: string; value: string; href: string }) {
  return (
    <Link to={href}>
      <GlassCard className="interactive-glow p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="nex-label">{title}</div>
            <div className="mt-2 nex-metric text-2xl">{value}</div>
          </div>
          <ArrowRight className="h-5 w-5 text-purple-300" />
        </div>
      </GlassCard>
    </Link>
  );
}

function VisionCard({ title, character, copy, icon: Icon }: { title: string; character: string; copy: string; icon: LucideIcon }) {
  const variant = character.toLowerCase() as "leader" | "guiding" | "community" | "thinking";

  return (
    <div className="scene-chip interactive-glow h-full overflow-hidden p-5">
      <div className="relative h-40 rounded-2xl border border-white/10 bg-gradient-to-br from-neon/25 via-black/20 to-cyan/10">
        <Mascot variant={variant} className="absolute left-1/2 top-2 w-36 -translate-x-1/2" />
        <div className="absolute bottom-3 left-3 rounded-full border border-cyan/30 bg-black/35 px-3 py-1 text-xs font-black text-cyan">{character}</div>
      </div>
      <div className="mt-5 nex-icon">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 nex-title text-xl">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm">
        {links.map((link) => (
          <span key={link}>{link}</span>
        ))}
      </div>
    </div>
  );
}
