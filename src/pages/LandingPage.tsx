import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Building2,
  CircleDollarSign,
  Database,
  Globe2,
  Network,
  Orbit,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Mascot } from "../components/ui/Mascot";
import { KineticNeuralMeshBackground } from "../components/website/KineticNeuralMeshBackground";
import { WebsiteHeader } from "../components/website/WebsiteHeader";
import nexLogoWhite from "../assets/logo/nex-logo-white.png";
import bnbChainLogo from "../assets/Technology Ecosystem/bnbchain.svg";
import chainlinkLogo from "../assets/Technology Ecosystem/chainlink.svg";
import cloudflareLogo from "../assets/Technology Ecosystem/cloudflare.svg";
import ethereumLogo from "../assets/Technology Ecosystem/ethereum.svg";
import googleLogo from "../assets/Technology Ecosystem/google.svg";
import nvidiaLogo from "../assets/Technology Ecosystem/nvidia.svg";
import openAiGymLogo from "../assets/Technology Ecosystem/openaigym.svg";
import solanaLogo from "../assets/Technology Ecosystem/solana.svg";
import coinMarketCapIcon from "../assets/Community/coinmarketcap.svg";
import discordIcon from "../assets/Community/discord.svg";
import githubIcon from "../assets/Community/github.svg";
import instagramIcon from "../assets/Community/instagram.svg";
import mediumIcon from "../assets/Community/medium.svg";
import redditIcon from "../assets/Community/reddit.svg";
import telegramIcon from "../assets/Community/telegram.svg";
import tiktokIcon from "../assets/Community/tiktok.svg";
import xIcon from "../assets/Community/x.svg";
import youtubeIcon from "../assets/Community/youtube.svg";
import ameliaHart from "../assets/team/amelia-hart.png";
import danielRoss from "../assets/team/daniel-ross.png";
import ethanCole from "../assets/team/ethan-cole.png";
import leoWalker from "../assets/team/leo-walker.png";
import oliviaBrooks from "../assets/team/olivia-brooks.png";
import sophiaGrant from "../assets/team/sophia-grant.png";

const FinancialDashboard = lazy(() =>
  import("../components/website/FinancialDashboard").then((module) => ({ default: module.FinancialDashboard })),
);

const ecosystemPillars = [
  {
    title: "Prediction Network",
    audit: "Captures predictive intent, confidence weighting, market direction, and participant signal density.",
    metric: "12.45M structured signals",
    icon: Database,
  },
  {
    title: "Creator Economy",
    audit: "Routes signal interpretation through creator distribution, reputation systems, and audience engagement.",
    metric: "15,287 creator nodes",
    icon: Sparkles,
  },
  {
    title: "Project Launchpad",
    audit: "Converts attention into campaigns, task execution, launch activity, and retention-accounted growth.",
    metric: "468 project environments",
    icon: Building2,
  },
  {
    title: "AI Companions",
    audit: "Guides user progression, task continuity, reputation context, and long-term participation loops.",
    metric: "26,540 active companions",
    icon: Brain,
  },
  {
    title: "Growth & Rewards",
    audit: "Distributes participation incentives, reputation progress, treasury-backed rewards, and network retention.",
    metric: "$8.6M value distributed",
    icon: CircleDollarSign,
  },
] satisfies { title: string; audit: string; metric: string; icon: LucideIcon }[];

const flywheel = [
  { title: "Users", copy: "Users enter markets, express intent, and create the first layer of network activity.", icon: Users },
  { title: "Predictions", copy: "Prediction activity converts intent into observable market participation.", icon: Target },
  { title: "Signals", copy: "Predictions become structured signals that reveal demand, sentiment, and opportunity.", icon: Network },
  { title: "Creators", copy: "Creators interpret signals and distribute trusted narratives to wider communities.", icon: Sparkles },
  { title: "Projects", copy: "Projects use attention and creator influence to activate campaigns and growth channels.", icon: Building2 },
  { title: "Communities", copy: "Communities compound trust, participation, and distribution around active markets.", icon: Globe2 },
  { title: "Value", copy: "Network activity produces value that can support incentives, retention, and governance.", icon: CircleDollarSign },
  { title: "More Users", copy: "Returned value attracts new participants and restarts the prediction cycle at greater scale.", icon: Orbit },
] satisfies { title: string; copy: string; icon: LucideIcon }[];

const architectureLayers = [
  {
    index: "01",
    title: "Prediction Layer",
    purpose: "Signal generation",
    sentence: "Captures forward-looking market intent and turns participation into structured signals.",
    icon: Target,
  },
  {
    index: "02",
    title: "Creator Layer",
    purpose: "Signal distribution",
    sentence: "Routes signals through trusted creators who translate market activity into attention.",
    icon: Sparkles,
  },
  {
    index: "03",
    title: "Project Layer",
    purpose: "Activation and adoption",
    sentence: "Connects attention to campaigns, launches, project demand, and measurable adoption.",
    icon: Building2,
  },
  {
    index: "04",
    title: "Community Layer",
    purpose: "Participation and retention",
    sentence: "Compounds trust, discussion, repeat activity, and user continuity around active markets.",
    icon: Globe2,
  },
  {
    index: "05",
    title: "Governance Layer",
    purpose: "Coordination and trust",
    sentence: "Aligns participation rules, treasury discipline, network parameters, and accountability.",
    icon: ShieldCheck,
  },
  {
    index: "06",
    title: "NEX Value Layer",
    purpose: "Value capture and network reinforcement",
    sentence: "Converges network activity into value alignment, incentives, and long-term reinforcement.",
    icon: CircleDollarSign,
  },
] satisfies { index: string; title: string; purpose: string; sentence: string; icon: LucideIcon }[];

const ecosystemParticipants = [
  {
    title: "Users",
    sentence: "Create prediction activity and reveal market intent.",
    contribution: "Prediction signals",
    benefit: "Rewards and reputation",
    icon: Users,
  },
  {
    title: "Creators",
    sentence: "Translate signals into trusted narratives and distribution.",
    contribution: "Influence",
    benefit: "Audience growth",
    icon: Sparkles,
  },
  {
    title: "Projects",
    sentence: "Activate attention through campaigns, launches, and adoption loops.",
    contribution: "Growth demand",
    benefit: "Community activation",
    icon: Building2,
  },
  {
    title: "Communities",
    sentence: "Compound trust, participation, and repeat network activity.",
    contribution: "Retention",
    benefit: "Shared upside",
    icon: Globe2,
  },
  {
    title: "AI Companions",
    sentence: "Guide users through progress, tasks, rewards, and long-term participation.",
    contribution: "Continuity",
    benefit: "Personalized growth",
    icon: Brain,
  },
  {
    title: "NEX Value Layer",
    sentence: "Captures and reinforces value created across the network.",
    contribution: "Value alignment",
    benefit: "Network reinforcement",
    icon: CircleDollarSign,
  },
] satisfies { title: string; sentence: string; contribution: string; benefit: string; icon: LucideIcon }[];

const trustPillars = [
  {
    title: "Network Principles",
    sentence: "Transparency, resilience, participation, and responsible growth define the operating baseline.",
    signal: "Protocol rules",
    icon: Network,
  },
  {
    title: "Treasury Discipline",
    sentence: "Resources support ecosystem rewards, development, security, partnerships, and long-term sustainability.",
    signal: "Capital allocation",
    icon: Database,
  },
  {
    title: "Risk & Security",
    sentence: "Risk parameters, monitoring, safeguards, and staged expansion protect network integrity.",
    signal: "Control systems",
    icon: ShieldCheck,
  },
  {
    title: "Community Participation",
    sentence: "Feedback, proposals, ambassadors, and contributors create structured participation channels.",
    signal: "Contribution flow",
    icon: Users,
  },
  {
    title: "Future DAO Evolution",
    sentence: "Decentralization progresses as participation, governance maturity, and accountability increase.",
    signal: "Staged transition",
    icon: Orbit,
  },
] satisfies { title: string; sentence: string; signal: string; icon: LucideIcon }[];

const roadmap = [
  {
    year: "2026",
    title: "Prediction Network",
    mission: "Establish the core signal network.",
    outcome: "Prediction activity becomes a structured source of market intent and coordination.",
    emphasis: "Signal foundation",
  },
  {
    year: "2027",
    title: "Creator Economy",
    mission: "Expand prediction activity into creator-led distribution.",
    outcome: "Creators convert signals into interpretation, audience growth, and trusted market narratives.",
    emphasis: "Influence layer",
  },
  {
    year: "2028",
    title: "Project Growth Layer",
    mission: "Turn attention into measurable project activation.",
    outcome: "Projects use prediction-driven attention to launch campaigns, activate communities, and measure adoption.",
    emphasis: "Activation layer",
  },
  {
    year: "2029",
    title: "Global Prediction Network",
    mission: "Expand across markets, communities, and ecosystems.",
    outcome: "The network supports broader categories of prediction activity and cross-community participation.",
    emphasis: "Market expansion",
  },
  {
    year: "2030",
    title: "Global Prediction Infrastructure",
    mission: "Become the infrastructure layer for prediction-driven growth.",
    outcome: "NEXNS operates as Global Prediction Growth Infrastructure where prediction signals support growth across ecosystems.",
    emphasis: "Infrastructure scale",
  },
] satisfies { year: string; title: string; mission: string; outcome: string; emphasis: string }[];

const leadership = [
  { name: "Ethan Cole", role: "Protocol Strategy", image: ethanCole, summary: "Coordinates network thesis, capital strategy, governance scope, and institutional positioning." },
  { name: "Sophia Grant", role: "Product Systems", image: sophiaGrant, summary: "Defines interaction architecture for prediction workflows, creator systems, and retention loops." },
  { name: "Olivia Brooks", role: "AI Systems", image: oliviaBrooks, summary: "Focuses on AI software orchestration, companion reasoning patterns, and adaptive user guidance." },
  { name: "Daniel Ross", role: "Decentralized Finance Engineering", image: danielRoss, summary: "Leads token mechanics, treasury logic, and protocol-level financial system design." },
  { name: "Amelia Hart", role: "Institutional Partnerships", image: ameliaHart, summary: "Builds relationships across infrastructure, ecosystem partners, and enterprise stakeholders." },
  { name: "Leo Walker", role: "Network Operations", image: leoWalker, summary: "Develops community governance operations, contributor coordination, and ecosystem support systems." },
];

const partners = [
  { name: "OpenAI Gym", icon: openAiGymLogo, href: "https://gymnasium.farama.org/" },
  { name: "NVIDIA", icon: nvidiaLogo, href: "https://www.nvidia.com/" },
  { name: "Google Cloud", icon: googleLogo, href: "https://cloud.google.com/" },
  { name: "Cloudflare", icon: cloudflareLogo, href: "https://www.cloudflare.com/" },
  { name: "Ethereum", icon: ethereumLogo, href: "https://ethereum.org/" },
  { name: "BNB Chain", icon: bnbChainLogo, href: "https://www.bnbchain.org/" },
  { name: "Solana", icon: solanaLogo, href: "https://solana.com/" },
  { name: "Chainlink", icon: chainlinkLogo, href: "https://chain.link/" },
];

const infrastructureCategories = [
  {
    title: "AI Infrastructure",
    description: "Model intelligence, accelerator systems, and AI development environments.",
    nodes: [
      { name: "OpenAI", icon: openAiGymLogo, href: "https://openai.com/" },
      { name: "Anthropic", href: "https://www.anthropic.com/" },
      { name: "Google AI", icon: googleLogo, href: "https://ai.google/" },
      { name: "NVIDIA", icon: nvidiaLogo, href: "https://www.nvidia.com/" },
    ],
  },
  {
    title: "Cloud Infrastructure",
    description: "Compute, distribution, edge security, and global service availability.",
    nodes: [
      { name: "Google Cloud", icon: googleLogo, href: "https://cloud.google.com/" },
      { name: "AWS", href: "https://aws.amazon.com/" },
      { name: "Cloudflare", icon: cloudflareLogo, href: "https://www.cloudflare.com/" },
      { name: "OVHcloud", href: "https://www.ovhcloud.com/" },
    ],
  },
  {
    title: "Blockchain Networks",
    description: "Settlement environments and open networks for digital coordination.",
    nodes: [
      { name: "Ethereum", icon: ethereumLogo, href: "https://ethereum.org/" },
      { name: "Solana", icon: solanaLogo, href: "https://solana.com/" },
      { name: "Base", href: "https://base.org/" },
      { name: "BNB Chain", icon: bnbChainLogo, href: "https://www.bnbchain.org/" },
    ],
  },
  {
    title: "Data & Oracle Layer",
    description: "External data, analytics, indexes, and verifiable signal feeds.",
    nodes: [
      { name: "Chainlink", icon: chainlinkLogo, href: "https://chain.link/" },
      { name: "The Graph", href: "https://thegraph.com/" },
      { name: "Dune", href: "https://dune.com/" },
    ],
  },
  {
    title: "Developer Ecosystem",
    description: "Tools, deployment environments, and open-source development workflows.",
    nodes: [
      { name: "GitHub", icon: githubIcon, href: "https://github.com/" },
      { name: "Vercel", href: "https://vercel.com/" },
      { name: "Open Source Stack", href: "https://opensource.org/" },
    ],
  },
  {
    title: "Community Infrastructure",
    description: "Channels where markets, creators, projects, and contributors coordinate.",
    nodes: [
      { name: "X", icon: xIcon, href: "https://x.com/" },
      { name: "Telegram", icon: telegramIcon, href: "https://telegram.org/" },
      { name: "Discord", icon: discordIcon, href: "https://discord.com/" },
      { name: "Reddit", icon: redditIcon, href: "https://www.reddit.com/" },
      { name: "YouTube", icon: youtubeIcon, href: "https://www.youtube.com/" },
    ],
  },
] satisfies {
  title: string;
  description: string;
  nodes: { name: string; icon?: string; href: string }[];
}[];

const communityChannels = [
  { name: "X", icon: xIcon, href: "https://x.com/nexns" },
  { name: "Telegram", icon: telegramIcon, href: "https://t.me/nexns" },
  { name: "Discord", icon: discordIcon, href: "https://discord.gg/nexns" },
  { name: "GitHub", icon: githubIcon, href: "https://github.com/nexns" },
  { name: "YouTube", icon: youtubeIcon, href: "https://youtube.com/@nexns" },
  { name: "Medium", icon: mediumIcon, href: "https://medium.com/@nexns" },
  { name: "CoinMarketCap", icon: coinMarketCapIcon, href: "https://coinmarketcap.com" },
  { name: "Reddit", icon: redditIcon, href: "https://reddit.com/r/nexns" },
  { name: "Instagram", icon: instagramIcon, href: "https://instagram.com/nexns" },
  { name: "TikTok", icon: tiktokIcon, href: "https://tiktok.com/@nexns" },
] satisfies { name: string; icon: string; href: string }[];

const contributionPath = ["Join", "Predict", "Create", "Support Projects", "Contribute", "Govern"];

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Platform Overview", href: "/#architecture" },
      { label: "Prediction Network", href: "/#network" },
      { label: "Creator Network", href: "/#architecture" },
      { label: "Project Growth Layer", href: "/#architecture" },
      { label: "Governance Layer", href: "/#governance" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Users", href: "/#ecosystem" },
      { label: "Creators", href: "/#ecosystem" },
      { label: "Projects", href: "/#ecosystem" },
      { label: "Communities", href: "/#community" },
      { label: "AI Companions", href: "/#ecosystem" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Whitepaper", href: "/investor" },
      { label: "Docs", href: "/#insights" },
      { label: "Blog", href: "/#community" },
      { label: "Media Kit", href: "/#insights" },
      { label: "NEX Economic Architecture", href: "/resources/nex" },
      { label: "NS Credits", href: "/resources/ns" },
    ],
  },
  {
    title: "Investor",
    links: [
      { label: "Investor Center", href: "/investor" },
      { label: "Investment Thesis", href: "/investor/why-nexns" },
      { label: "Platform Architecture", href: "/investor/ecosystem" },
      { label: "Growth Flywheel", href: "/investor/flywheel" },
      { label: "Value Flow", href: "/investor/value-flow" },
      { label: "Investor Brief", href: "/investor/one-page" },
      { label: "Contact", href: "/investor" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About NEXNS", href: "/company/about" },
      { label: "Vision", href: "/company/vision" },
      { label: "Leadership & Contributors", href: "/company/leadership" },
      { label: "Roadmap", href: "/#roadmap" },
      { label: "Community", href: "/#community" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Risk Disclosure", href: "/legal/risk" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Disclaimer", href: "/legal/disclaimer" },
    ],
  },
];

const footerSocialLinks = [
  { label: "X", href: "https://x.com/nexns", external: true },
  { label: "Telegram", href: "https://t.me/nexns", external: true },
  { label: "Discord", href: "https://discord.gg/nexns", external: true },
  { label: "GitHub", href: "https://github.com/nexns", external: true },
  { label: "YouTube", href: "https://youtube.com/@nexns", external: true },
];

export function LandingPage() {
  const [companionOpen, setCompanionOpen] = useState(false);
  const [focusPillar, setFocusPillar] = useState<(typeof ecosystemPillars)[number] | null>(null);

  return (
    <div className="nex-website min-h-screen bg-black text-white">
      <WebsiteHeader />
      <main className="snap-y snap-mandatory">
        <section id="home" className="relative flex min-h-screen w-full snap-start items-center justify-center overflow-hidden bg-black pb-10 pt-24 sm:pt-20 lg:h-screen lg:pb-0">
          <KineticNeuralMeshBackground />
          <motion.div
            className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 md:px-16 lg:h-full lg:grid-cols-[0.92fr_1.08fr]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-3xl pt-4 lg:pt-0">
              <div className="mb-5 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-cyan/15 bg-white/[0.035] px-4 py-2 text-[0.58rem] font-black uppercase tracking-[0.18em] text-cyan/90 sm:text-[0.68rem] sm:tracking-[0.24em]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
                <span className="truncate">Global Prediction Growth Infrastructure</span>
              </div>
              <h1 className="max-w-5xl text-[2.72rem] font-black leading-[0.94] tracking-[-0.045em] text-white sm:text-6xl sm:leading-[0.92] md:text-7xl xl:text-8xl">
                Prediction signals become network growth.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-[1.75] tracking-[0.02em] text-white/84 sm:mt-8 sm:text-lg">
                NEXNS converts predictive intent into creator influence, project activation, community retention, and governed network value.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
                <a href="#network" className="nex-primary-button">
                  Explore Infrastructure <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/app" className="nex-secondary-button">
                  Launch App
                </Link>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/10 pt-5 sm:gap-6">
                {[
                  ["12.45M", "Prediction Signals"],
                  ["15,287", "Creator Nodes"],
                  ["468", "Project Environments"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="font-mono text-xl font-black text-white sm:text-2xl">{value}</div>
                    <div className="mt-1 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white/46 sm:text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <HeroSignalNetwork />
          </motion.div>
        </section>

        <CategoryDefinitionSection />

        <NarrativeSection
          id="network"
          title="NEXNS Growth Flywheel"
          description="A self-reinforcing growth engine where prediction, attention, influence and value continuously strengthen the network."
        >
          <InteractiveFlywheel />
        </NarrativeSection>

        <NarrativeSection
          id="architecture"
          title="Platform Architecture"
          description="NEXNS operates as Global Prediction Growth Infrastructure where each layer converts network activity into the next form of coordination."
        >
          <PlatformArchitecture />
        </NarrativeSection>

        <NarrativeSection
          id="ecosystem"
          title="Ecosystem Map"
          description="NEXNS connects users, creators, projects, communities, AI companions, and the NEX value layer into one participation network."
        >
          <EcosystemParticipationMap />
        </NarrativeSection>

        <NarrativeSection
          id="insights"
          title="Global Infrastructure Ecosystem"
          description="NEXNS connects prediction activity with the technologies, networks, communities, and infrastructure that power the next generation of digital coordination."
        >
          <div className="nex-panel relative overflow-hidden p-5 sm:p-7 lg:p-9">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.16),transparent_28%),radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.10),transparent_32%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-black/26 p-5 sm:p-7">
                <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-55" viewBox="0 0 620 620" role="img" aria-label="NEXNS global infrastructure ecosystem map">
                  <defs>
                    <linearGradient id="infrastructureOrbit" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.12" />
                      <stop offset="48%" stopColor="#8b5cf6" stopOpacity="0.42" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.18" />
                    </linearGradient>
                    <filter id="infrastructureCoreGlow">
                      <feGaussianBlur stdDeviation="7" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <ellipse cx="310" cy="310" rx="242" ry="196" fill="none" stroke="url(#infrastructureOrbit)" strokeWidth="1.2" />
                  <ellipse cx="310" cy="310" rx="188" ry="258" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="8 12" />
                  <ellipse cx="310" cy="310" rx="118" ry="118" fill="none" stroke="rgba(34,211,238,0.16)" strokeWidth="1" />
                  {[
                    [126, 172],
                    [314, 82],
                    [495, 172],
                    [498, 448],
                    [314, 540],
                    [124, 448],
                  ].map(([x, y]) => (
                    <path key={`${x}-${y}`} d={`M310 310 L${x} ${y}`} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                  ))}
                  <circle cx="310" cy="310" r="76" fill="rgba(10,10,11,0.72)" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" filter="url(#infrastructureCoreGlow)" />
                </svg>

                <div className="relative z-10 grid gap-5">
                  <div className="pointer-events-none absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-gradient-to-b from-cyan-300/0 via-cyan-300/22 to-violet-300/0 sm:block" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {infrastructureCategories.slice(0, 2).map((category, index) => (
                    <div
                      key={category.title}
                      className="group relative min-h-[136px] overflow-hidden rounded-[26px] border border-white/10 bg-black/68 p-5 backdrop-blur-sm transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-300/7"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/35 to-violet-300/0 opacity-0 transition group-hover:opacity-100" />
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-black leading-tight text-white">{category.title}</h3>
                        <span className="font-mono text-[10px] font-black text-cyan-100/70">{String(index + 1).padStart(2, "0")}</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/70">{category.description}</p>
                      <div className="mt-4 inline-flex rounded-full border border-white/8 bg-white/[0.035] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                        {category.nodes.length} nodes
                      </div>
                    </div>
                  ))}
                  </div>

                  <div className="relative mx-auto my-1 grid h-40 w-40 place-items-center rounded-full border border-cyan-300/35 bg-black/95 text-center shadow-[0_0_70px_rgba(0,240,255,0.18),inset_0_0_32px_rgba(139,92,246,0.12)] sm:h-48 sm:w-48">
                    <div className="pointer-events-none absolute -inset-7 rounded-full border border-cyan-300/10" />
                    <div className="pointer-events-none absolute -inset-14 rounded-full border border-violet-300/10 border-dashed" />
                    <div className="px-5">
                      <div className="text-2xl font-black tracking-[0.18em] text-white">NEXNS</div>
                      <div className="mt-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/62">Network Core</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {infrastructureCategories.slice(2).map((category, index) => (
                      <div
                        key={category.title}
                        className="group relative min-h-[136px] overflow-hidden rounded-[26px] border border-white/10 bg-black/68 p-5 backdrop-blur-sm transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-300/7"
                      >
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet-300/0 via-violet-300/35 to-cyan-300/0 opacity-0 transition group-hover:opacity-100" />
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-black leading-tight text-white">{category.title}</h3>
                          <span className="font-mono text-[10px] font-black text-cyan-100/70">{String(index + 3).padStart(2, "0")}</span>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/70">{category.description}</p>
                        <div className="mt-4 inline-flex rounded-full border border-white/8 bg-white/[0.035] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/50">
                          {category.nodes.length} nodes
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="inline-flex rounded-full border border-violet-300/18 bg-violet-300/7 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-violet-100">
                  Supported Infrastructure
                </div>
                <h3 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">
                  NEXNS exists inside a broader infrastructure stack.
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/76">
                  Prediction activity depends on AI systems, cloud execution, blockchain settlement, external data,
                  developer tooling, and community coordination. NEXNS positions these layers as connected network context,
                  not sponsorship claims.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {infrastructureCategories.map((category) => (
                    <div key={category.title} className="rounded-2xl border border-white/8 bg-black/24 p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <strong className="text-sm font-black text-white">{category.title}</strong>
                        <span className="font-mono text-xs text-cyan-100/70">{category.nodes.length} nodes</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.nodes.map((node) => (
                          <a
                            key={`${category.title}-${node.name}`}
                            href={node.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${node.name}`}
                            className="group inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.035] px-3 py-2 text-xs font-semibold text-white/78 transition duration-300 hover:border-cyan-300/30 hover:bg-cyan-300/8 hover:text-white"
                          >
                            {node.icon ? (
                              <img src={node.icon} alt="" className="h-4 w-4 object-contain opacity-70 invert transition duration-300 group-hover:opacity-100" loading="lazy" decoding="async" />
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-violet-300/70 shadow-[0_0_10px_rgba(139,92,246,0.45)]" />
                            )}
                            {node.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-cyan-300/6 p-5 text-sm leading-7 text-white/78">
                  NEXNS does not operate in isolation. It participates in a global infrastructure ecosystem that enables
                  prediction, coordination, and network growth.
                </div>
              </div>
            </div>
          </div>
        </NarrativeSection>

        <NarrativeSection
          id="governance"
          title="Governance & Trust"
          description="NEXNS is designed with governance logic, treasury discipline, risk control, community participation, and staged decentralization."
        >
          <GovernanceTrust />
        </NarrativeSection>

        <NarrativeSection
          id="roadmap"
          title="Evolution Roadmap"
          description="A staged path from prediction signals to Global Prediction Growth Infrastructure."
        >
          <RoadmapTimeline />
        </NarrativeSection>

        <NarrativeSection
          id="community"
          title="Community & Global Network"
          description="NEXNS grows through users, creators, projects, ambassadors, contributors, and community operators."
        >
          <div className="nex-panel relative overflow-hidden p-5 sm:p-7 lg:p-9">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_26%_72%,rgba(139,92,246,0.13),transparent_32%)]" />
            <div className="relative grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-cyan-100">
                  <Globe2 className="h-3.5 w-3.5" />
                  Participation Layer
                </div>
                <h3 className="mt-5 max-w-xl text-3xl font-black leading-tight text-white sm:text-4xl">
                  Community is part of the network architecture.
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/78">
                  NEXNS expands when participants coordinate around prediction signals. Users contribute activity,
                  creators distribute interpretation, projects activate demand, and operators support regional growth.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {[
                    ["Participants", "Users, creators, projects"],
                    ["Operators", "Ambassadors and contributors"],
                    ["Coordination", "Signal-driven network growth"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/8 bg-black/22 p-4">
                      <span className="block text-xs uppercase tracking-[0.18em] text-white/50">{label}</span>
                      <strong className="mt-2 block text-sm font-semibold text-white">{value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
              <div className="relative min-h-[430px] overflow-hidden rounded-[32px] border border-white/10 bg-black/24 p-5 sm:p-7">
                <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.035),transparent_38%,rgba(34,211,238,0.025))]" />
                <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80" viewBox="0 0 640 430" role="img" aria-label="Global NEXNS community network">
                  <defs>
                    <linearGradient id="communityNetworkLine" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.12" />
                      <stop offset="48%" stopColor="#8b5cf6" stopOpacity="0.56" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.16" />
                    </linearGradient>
                    <filter id="communityHubGlow">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path d="M80 218 C160 88, 470 80, 560 210 C480 332, 180 344, 80 218Z" fill="none" stroke="url(#communityNetworkLine)" strokeWidth="1.4" />
                  <path d="M118 305 C230 160, 410 150, 525 306" fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="1" strokeDasharray="7 9" />
                  <path d="M120 122 C250 246, 392 246, 526 126" fill="none" stroke="rgba(139,92,246,0.24)" strokeWidth="1" strokeDasharray="8 10" />
                  {[
                    [320, 214, 64],
                    [134, 132, 13],
                    [520, 130, 13],
                    [105, 298, 11],
                    [536, 303, 11],
                    [226, 83, 9],
                    [424, 84, 9],
                    [238, 350, 9],
                    [412, 348, 9],
                  ].map(([cx, cy, r], index) => (
                    <g key={`${cx}-${cy}`}>
                      <circle cx={cx} cy={cy} r={r} fill={index === 0 ? "rgba(10,10,11,0.92)" : "rgba(10,10,11,0.82)"} stroke={index === 0 ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.16)"} strokeWidth={index === 0 ? 1.2 : 0.8} />
                      <circle cx={cx} cy={cy} r={Math.max(3, r - 5)} fill={index === 0 ? "rgba(139,92,246,0.22)" : "rgba(34,211,238,0.18)"} filter="url(#communityHubGlow)" />
                    </g>
                  ))}
                  <text x="320" y="209" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" letterSpacing="2">NEXNS</text>
                  <text x="320" y="234" textAnchor="middle" fill="rgba(255,255,255,0.58)" fontSize="10" fontWeight="700" letterSpacing="2">GLOBAL NETWORK</text>
                </svg>

                <div className="relative z-10 flex h-full min-h-[380px] flex-col justify-start">
                  <div className="ml-auto w-fit rounded-full border border-violet-300/20 bg-violet-300/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-100">
                    Regional hubs / operators / contributors
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {contributionPath.map((step, index) => (
                  <div key={step} className="relative z-10 flex items-center gap-3 rounded-2xl border border-white/8 bg-black/44 px-4 py-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/8 font-mono text-[11px] font-bold text-cyan-100">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-semibold text-white">{step}</span>
                  </div>
                ))}
              </div>
              </div>
            </div>

            <div className="relative mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {communityChannels.map((channel) => (
                <a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open NEXNS ${channel.name} channel`}
                  className="group flex items-center gap-3 rounded-2xl border border-white/8 bg-black/24 p-4 transition duration-300 hover:border-cyan-300/35 hover:bg-cyan-300/8 hover:shadow-[0_0_28px_rgba(34,211,238,0.14)]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition duration-300 group-hover:scale-105 group-hover:border-violet-300/35">
                    <img src={channel.icon} alt="" className="h-5 w-5 object-contain opacity-80 invert transition duration-300 group-hover:opacity-100" loading="lazy" decoding="async" />
                  </span>
                  <span className="text-sm font-semibold text-white">{channel.name}</span>
                </a>
              ))}
            </div>
          </div>
        </NarrativeSection>
      </main>

      <FocusAuditPanel pillar={focusPillar} onClose={() => setFocusPillar(null)} />
      <FloatingCompanion open={companionOpen} onOpen={() => setCompanionOpen(true)} onClose={() => setCompanionOpen(false)} />
      <WebsiteFooter />
    </div>
  );
}

function HeroSignalNetwork() {
  const particles = [
    [14, 18, 0],
    [28, 62, 1],
    [44, 34, 2],
    [58, 76, 3],
    [72, 22, 4],
    [86, 58, 5],
    [38, 84, 6],
    [64, 48, 7],
  ];

  return (
    <div className="hero-atmosphere-field pointer-events-none relative hidden min-h-[520px] items-center justify-center lg:flex" aria-hidden="true">
      <div className="hero-deep-space-layer absolute inset-0" />
      <div className="hero-atmospheric-light absolute inset-0" />
      <div className="hero-particle-field absolute inset-0">
        {particles.map(([x, y, index]) => (
          <span
            key={`${x}-${y}`}
            className="hero-micro-particle"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              animationDelay: `${index * 0.9}s`,
              animationDuration: `${10 + index * 1.4}s`,
            }}
          />
        ))}
      </div>
      <div className="relative h-[520px] w-full max-w-[680px] opacity-70">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="heroSignalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.08" />
              <stop offset="52%" stopColor="#7c3aed" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.12" />
            </linearGradient>
            <filter id="heroSignalGlow">
              <feGaussianBlur stdDeviation="0.9" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path className="hero-signal-path hero-signal-thread" d="M5 62 C24 38, 38 68, 54 43 S82 20, 96 48" fill="none" stroke="url(#heroSignalGradient)" strokeWidth="0.42" filter="url(#heroSignalGlow)" />
          <path className="hero-signal-path hero-signal-path-slow hero-signal-thread" d="M10 78 C30 58, 44 82, 62 62 S82 44, 92 72" fill="none" stroke="rgba(0,229,255,0.24)" strokeWidth="0.32" strokeLinecap="round" />
          <path className="hero-signal-path hero-signal-path-slow hero-signal-thread" d="M8 30 C28 20, 40 38, 55 30 S76 12, 94 24" fill="none" stroke="rgba(124,58,237,0.28)" strokeWidth="0.34" strokeLinecap="round" />
          <path className="hero-signal-path hero-signal-thread" d="M22 14 C36 42, 58 42, 76 88" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.25" strokeLinecap="round" />
          <path className="hero-signal-path hero-signal-thread" d="M18 88 C42 74, 48 28, 82 10" fill="none" stroke="rgba(0,229,255,0.13)" strokeWidth="0.24" strokeLinecap="round" />

          {particles.slice(0, 6).map(([x, y, index]) => (
            <circle
              key={`${x}-${y}-${index}`}
              className="hero-signal-node"
              cx={x}
              cy={y}
              r="0.72"
              fill={index % 2 === 0 ? "rgba(0,229,255,0.58)" : "rgba(124,58,237,0.58)"}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

function CategoryDefinitionSection() {
  const flow = [
    ["Prediction", "Forward-looking intent"],
    ["Signal", "Structured market belief"],
    ["Insight", "Interpretable demand pattern"],
    ["Coordination", "Aligned action before outcomes"],
  ];

  return (
    <motion.section
      id="category-definition"
      className="nex-reveal-section px-6 py-24 md:px-12 md:py-[120px] xl:px-16"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/15 bg-white/[0.03] px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-cyan/80">
            Why Prediction Matters
          </div>
          <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.035em] text-white md:text-6xl">
            Prediction Becomes a Coordination Layer
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.78] text-white/78 md:text-lg">
            Prediction is valuable because it captures what people expect before outcomes are known. Those expectations become signals, signals become insight, and insight helps participants coordinate earlier.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              ["Prediction matters", "It captures what participants believe before outcomes are known."],
              ["Signals reveal intent", "They convert belief into structured information that can be interpreted."],
              ["Intent creates coordination", "Shared signals help users, creators, and projects act with more context."],
            ].map(([title, copy]) => (
              <div key={title} className="border-l border-cyan/35 pl-4">
                <div className="text-sm font-black uppercase tracking-[0.14em] text-white">{title}</div>
                <p className="mt-1 text-sm leading-6 text-white/62">{copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.025] p-5 shadow-[0_0_80px_rgba(34,211,238,0.06)] md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.12),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.16),transparent_36%)]" />
          <div className="relative grid gap-3">
            {flow.map(([title, copy], index) => (
              <div key={title} className="relative grid gap-3 md:grid-cols-[160px_1fr] md:items-center">
                {index < flow.length - 1 && <span className="absolute left-5 top-12 hidden h-8 w-px bg-gradient-to-b from-cyan/55 to-violet-500/55 md:block" />}
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cyan/25 bg-black/48 font-mono text-sm font-black text-cyan">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-lg font-black text-white">{title}</span>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/28 px-4 py-3 text-sm leading-6 text-white/64 backdrop-blur-sm">
                  {copy}
                </div>
              </div>
            ))}
          </div>
          <div className="relative mt-6 rounded-2xl border border-violet-400/18 bg-violet-500/8 p-4 text-sm leading-6 text-white/72">
            Category model: prediction creates signals; signals reveal intent; intent produces insight; insight enables coordination.
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function NarrativeSection({ id, title, description, children }: { id: string; title: string; description: string; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      className="nex-reveal-section px-6 py-24 md:px-12 md:py-[120px] xl:px-16"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black leading-tight tracking-[-0.03em] md:text-6xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-[1.75] text-white/78 md:text-lg">{description}</p>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </motion.section>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1fr_0.85fr]" aria-label="Loading financial dashboard">
      {[0, 1, 2].map((item) => (
        <div key={item} className="nex-panel min-h-[330px] animate-pulse p-7">
          <div className="h-3 w-32 rounded-full bg-violet-500/20" />
          <div className="mt-5 h-9 w-44 rounded-full bg-white/10" />
          <div className="mt-10 h-44 rounded-3xl bg-violet-500/10" />
        </div>
      ))}
    </div>
  );
}

function SovereignBeamField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false, powerPreference: "high-performance" });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;
    const fragmentSource = `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;

      float beam(float y, float width) {
        return smoothstep(width, 0.0, abs(y));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float t = time * 0.045;
        float lineA = beam(uv.y - 0.28 - sin((uv.x + t) * 8.0) * 0.012, 0.006);
        float lineB = beam(uv.y - 0.54 - sin((uv.x * 1.4 - t) * 7.0) * 0.01, 0.004);
        float lineC = beam(uv.y - 0.76 - sin((uv.x * 1.8 + t) * 5.0) * 0.009, 0.003);
        float haloA = beam(uv.y - 0.28 - sin((uv.x + t) * 8.0) * 0.012, 0.04);
        float haloB = beam(uv.y - 0.54 - sin((uv.x * 1.4 - t) * 7.0) * 0.01, 0.032);
        float haloC = beam(uv.y - 0.76 - sin((uv.x * 1.8 + t) * 5.0) * 0.009, 0.026);
        float pulse = 0.45 + 0.55 * sin((uv.x * 9.0) - time * 0.32);
        vec3 cyan = vec3(0.0, 0.94, 1.0);
        vec3 purple = vec3(0.54, 0.17, 0.89);
        vec3 color = mix(purple, cyan, uv.x);
        float alpha = ((lineA * 0.16 + lineB * 0.12 + lineC * 0.08) + (haloA * 0.035 + haloB * 0.025 + haloC * 0.02)) * pulse;
        gl_FragColor = vec4(color, alpha);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (!vertexShader || !fragmentShader || !program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "resolution");
    const time = gl.getUniformLocation(program, "time");
    let frame = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform1f(time, (now - start) / 1000);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return <canvas ref={canvasRef} className="sovereign-beam-field pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80" aria-hidden="true" />;
}

function InteractiveFlywheel() {
  const [active, setActive] = useState(0);
  const participants = [
    { label: "Users", icon: Users, angle: 0 },
    { label: "Creators", icon: Sparkles, angle: 60 },
    { label: "Projects", icon: Building2, angle: 120 },
    { label: "Communities", icon: Globe2, angle: 180 },
    { label: "AI Companions", icon: Brain, angle: 240 },
    { label: "Governance", icon: ShieldCheck, angle: 300 },
  ];
  const works = [
    ["Users", "Predictions"],
    ["Predictions", "Signals"],
    ["Signals", "Creators"],
    ["Creators", "Projects"],
    ["Projects", "Communities"],
    ["Communities", "Value"],
    ["Value", "More Users"],
  ];

  return (
    <div className="nex-panel overflow-hidden p-5 md:p-7" onMouseLeave={() => setActive(0)}>
      <div className="grid gap-6 xl:grid-cols-[0.78fr_1.42fr_0.8fr] xl:items-center">
        <div className="rounded-[28px] border border-white/10 bg-black/28 p-5">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan/78">Why the engine exists</div>
          <h3 className="mt-4 text-2xl font-black leading-tight text-white">Each participant makes the next layer stronger.</h3>
          <div className="mt-5 grid gap-4 text-sm leading-6 text-white/66">
            <p>Users create predictions. Predictions create signals. Signals give creators a reason to publish, explain, and distribute market narratives.</p>
            <p>Creators bring attention to projects. Projects activate communities. Communities increase trust, retention, and participation.</p>
            <p>Value returns into the system as rewards, access, reputation, and governance context, attracting more users into the next cycle.</p>
          </div>
        </div>

        <div className="relative min-h-[700px] rounded-[34px] border border-white/10 bg-white/[0.02] p-4 shadow-[0_0_90px_rgba(34,211,238,0.06)] sm:min-h-[760px]">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.10),transparent_24%),radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.12),transparent_46%)]" />
          <div className="growth-engine-ring absolute left-1/2 top-1/2 z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[610px] sm:w-[610px]" />
          <div className="growth-engine-ring growth-engine-ring-secondary absolute left-1/2 top-1/2 z-0 h-[370px] w-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[445px] sm:w-[445px]" />
          <svg viewBox="0 0 640 640" className="pointer-events-none absolute inset-0 z-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="growthEnginePath" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.18" />
                <stop offset="45%" stopColor="#8b5cf6" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.22" />
              </linearGradient>
              <filter id="growthEngineGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path className="growth-engine-route" d="M320 84 C470 92 562 178 558 318 C554 468 464 552 320 556 C170 560 82 466 84 320 C86 174 176 92 320 84Z" fill="none" stroke="url(#growthEnginePath)" strokeWidth="5" filter="url(#growthEngineGlow)" />
            <path className="growth-engine-route growth-engine-route-slow" d="M188 188 C250 130 395 130 452 190 C510 250 508 392 452 452 C392 512 250 510 188 452 C130 394 130 250 188 188Z" fill="none" stroke="rgba(34,211,238,0.45)" strokeWidth="2" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
              const angle = (item / 8) * Math.PI * 2 - Math.PI / 2;
              const x = 320 + Math.cos(angle) * 238;
              const y = 320 + Math.sin(angle) * 238;
              return <circle key={item} className="growth-engine-particle" cx={x} cy={y} r="4" fill={item % 2 === 0 ? "#22d3ee" : "#8b5cf6"} />;
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-40 grid h-36 w-36 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan/20 bg-black/90 shadow-[0_0_70px_rgba(139,92,246,0.34)] backdrop-blur-xl sm:h-44 sm:w-44">
            <div className="text-center">
              <img src={nexLogoWhite} alt="NEXNS" className="mx-auto h-11 w-auto object-contain sm:h-14" draggable={false} />
            </div>
          </div>

          {flywheel.map((node, index) => {
            const Icon = node.icon;
            const angle = (index / flywheel.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 42;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            const isActive = active === index;

            return (
              <button
                key={node.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`growth-engine-step absolute z-30 w-[118px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-3 text-left transition duration-300 ease-in-out sm:w-36 sm:p-4 ${
                  isActive ? "border-cyan/60 bg-cyan/10 text-white shadow-[0_0_34px_rgba(34,211,238,0.2)]" : "border-white/10 bg-black/40 text-white/72 hover:border-violet-300/40 hover:bg-white/[0.05]"
                }`}
                style={{ left: `clamp(78px, ${x}%, calc(100% - 78px))`, top: `clamp(64px, ${y}%, calc(100% - 64px))` }}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-cyan" : "text-violet-300"}`} />
                  <span className="text-xs font-black uppercase tracking-[0.08em] sm:text-sm">{node.title}</span>
                </div>
              </button>
            );
          })}

          {participants.map((participant) => {
            const Icon = participant.icon;
            return (
              <div
                key={participant.label}
                className="growth-participant absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/54 px-3 py-2 text-xs font-bold text-white/62 backdrop-blur-md xl:flex"
                style={{ "--participant-angle": `${participant.angle}deg` } as Record<string, string>}
              >
                <Icon className="h-3.5 w-3.5 text-cyan/75" />
                {participant.label}
              </div>
            );
          })}
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/28 p-5">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-violet-200/80">Why it works</div>
          <div className="mt-5 grid gap-2">
            {works.map(([from, to], index) => (
              <button
                key={`${from}-${to}`}
                type="button"
                onClick={() => setActive(Math.min(index + 1, flywheel.length - 1))}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3 text-left transition hover:border-cyan/30 hover:bg-cyan/8"
              >
                <span className="text-sm font-black text-white">{from}</span>
                <ArrowRight className="h-4 w-4 text-cyan/70 transition group-hover:translate-x-1" />
                <span className="text-sm text-white/64">{to}</span>
              </button>
            ))}
          </div>
          <div className="mt-5 rounded-2xl border border-violet-400/18 bg-violet-500/8 p-4">
            <div className="text-sm font-black text-white">{flywheel[active].title}</div>
            <p className="mt-2 text-sm leading-6 text-white/64">{flywheel[active].copy}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:hidden">
        {flywheel.map((node, index) => {
          const Icon = node.icon;
          const isActive = active === index;
          return (
            <button
              key={node.title}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-2xl border p-4 text-left transition duration-300 ${
                isActive ? "border-cyan/55 bg-cyan/10" : "border-white/10 bg-white/[0.025]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isActive ? "text-cyan" : "text-violet-300"}`} />
                <span className="font-black">{node.title}</span>
              </div>
              {isActive && <p className="mt-3 text-sm leading-6 text-white/66">{node.copy}</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PlatformArchitecture() {
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <div className="nex-panel overflow-hidden p-5 md:p-7">
      <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr] xl:items-stretch">
        <div className="rounded-[28px] border border-white/10 bg-black/30 p-5 md:p-6">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan/78">How NEXNS works</div>
          <h3 className="mt-4 text-2xl font-black leading-tight text-white md:text-3xl">Six infrastructure layers. One compounding network.</h3>
          <p className="mt-5 text-sm leading-7 text-white/68">
            NEXNS is not a single product surface. It is a layered architecture that turns prediction activity into distribution, activation, retention, trust, and value reinforcement.
          </p>

          <div className="mt-7 rounded-3xl border border-violet-400/16 bg-violet-500/8 p-4">
            <div className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/48">Active Layer</div>
            <div className="mt-3 flex items-center gap-3">
              {(() => {
                const Icon = architectureLayers[activeLayer].icon;
                return <Icon className="h-6 w-6 text-cyan" />;
              })()}
              <div>
                <div className="font-black text-white">{architectureLayers[activeLayer].title}</div>
                <div className="mt-1 text-sm text-cyan/78">{architectureLayers[activeLayer].purpose}</div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/66">{architectureLayers[activeLayer].sentence}</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.02] p-4 shadow-[0_0_90px_rgba(34,211,238,0.06)] md:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12),transparent_34%),radial-gradient(circle_at_50%_100%,rgba(139,92,246,0.16),transparent_36%)]" />
          <div className="absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-gradient-to-b from-cyan/0 via-cyan/45 to-violet-400/0 md:block" />
          <div className="relative grid gap-3">
            {architectureLayers.map((layer, index) => {
              const Icon = layer.icon;
              const isActive = activeLayer === index;

              return (
                <button
                  key={layer.title}
                  type="button"
                  onMouseEnter={() => setActiveLayer(index)}
                  onFocus={() => setActiveLayer(index)}
                  onClick={() => setActiveLayer(index)}
                  className={`group relative grid gap-4 rounded-[26px] border p-4 text-left transition duration-300 md:grid-cols-[76px_1fr_210px] md:items-center md:p-5 ${
                    isActive ? "border-cyan/55 bg-cyan/10 shadow-[0_0_34px_rgba(34,211,238,0.16)]" : "border-white/10 bg-black/34 hover:border-violet-300/36 hover:bg-white/[0.045]"
                  }`}
                >
                  <div className="flex items-center gap-3 md:block">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl border transition ${isActive ? "border-cyan/55 bg-cyan/12" : "border-white/10 bg-white/[0.035]"}`}>
                      <Icon className={`h-5 w-5 ${isActive ? "text-cyan" : "text-violet-300"}`} />
                    </div>
                    <div className="font-mono text-xs font-black uppercase tracking-[0.18em] text-white/44 md:mt-3">{layer.index}</div>
                  </div>

                  <div>
                    <div className="text-lg font-black text-white md:text-xl">{layer.title}</div>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/66">{layer.sentence}</p>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-black/28 px-4 py-3 md:text-right">
                    <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/42">Purpose</div>
                    <div className="mt-1 text-sm font-black text-cyan/90">{layer.purpose}</div>
                  </div>

                  {index < architectureLayers.length - 1 && (
                    <div className="pointer-events-none absolute -bottom-3 left-10 z-10 grid h-6 w-6 place-items-center rounded-full border border-cyan/20 bg-black text-cyan shadow-[0_0_16px_rgba(34,211,238,0.18)] md:left-1/2 md:-translate-x-1/2">
                      <ArrowRight className="h-3.5 w-3.5 rotate-90" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="relative mt-5 flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-violet-400/16 bg-violet-500/8 p-4 text-center text-sm font-bold text-white/72">
            <span>Prediction signals</span>
            <ArrowRight className="h-4 w-4 text-cyan/70" />
            <span>distribution</span>
            <ArrowRight className="h-4 w-4 text-cyan/70" />
            <span>activation</span>
            <ArrowRight className="h-4 w-4 text-cyan/70" />
            <span>retention</span>
            <ArrowRight className="h-4 w-4 text-cyan/70" />
            <span>trust</span>
            <ArrowRight className="h-4 w-4 text-cyan/70" />
            <span>value reinforcement</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EcosystemParticipationMap() {
  const [active, setActive] = useState(0);

  return (
    <div className="nex-panel overflow-hidden p-5 md:p-7">
      <div className="grid gap-6 xl:grid-cols-[1.28fr_0.72fr] xl:items-stretch">
        <div className="relative min-h-[660px] overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.02] p-4 shadow-[0_0_90px_rgba(139,92,246,0.07)] sm:min-h-[720px] md:p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(34,211,238,0.13),transparent_26%),radial-gradient(circle_at_50%_52%,rgba(139,92,246,0.18),transparent_48%)]" />
          <svg viewBox="0 0 720 720" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="ecosystemConnection" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.72" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.18" />
              </linearGradient>
              <filter id="ecosystemGlow">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="360" cy="360" r="238" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <circle cx="360" cy="360" r="166" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="1" strokeDasharray="7 10" />
            {ecosystemParticipants.map((_, index) => {
              const angle = (index / ecosystemParticipants.length) * Math.PI * 2 - Math.PI / 2;
              const x = 360 + Math.cos(angle) * 248;
              const y = 360 + Math.sin(angle) * 248;
              const nextAngle = ((index + 1) / ecosystemParticipants.length) * Math.PI * 2 - Math.PI / 2;
              const nx = 360 + Math.cos(nextAngle) * 248;
              const ny = 360 + Math.sin(nextAngle) * 248;
              const isActive = active === index;

              return (
                <g key={index}>
                  <path
                    d={`M360 360 L${x} ${y}`}
                    stroke={isActive ? "rgba(34,211,238,0.76)" : "url(#ecosystemConnection)"}
                    strokeWidth={isActive ? "3" : "1.5"}
                    strokeLinecap="round"
                    filter={isActive ? "url(#ecosystemGlow)" : undefined}
                  />
                  <path
                    d={`M${x} ${y} Q360 360 ${nx} ${ny}`}
                    fill="none"
                    stroke={isActive ? "rgba(139,92,246,0.86)" : "rgba(139,92,246,0.2)"}
                    strokeWidth={isActive ? "3" : "1.2"}
                    strokeDasharray="10 12"
                    strokeLinecap="round"
                    filter={isActive ? "url(#ecosystemGlow)" : undefined}
                  />
                </g>
              );
            })}
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan/30 bg-black/86 text-center shadow-[0_0_72px_rgba(34,211,238,0.16)] backdrop-blur-xl sm:h-48 sm:w-48">
            <div>
              <img src={nexLogoWhite} alt="NEXNS" className="mx-auto h-12 w-auto object-contain sm:h-14" draggable={false} />
              <div className="mt-3 px-4 text-[0.62rem] font-black uppercase tracking-[0.18em] text-white/48">Network Core</div>
            </div>
          </div>

          {ecosystemParticipants.map((participant, index) => {
            const Icon = participant.icon;
            const angle = (index / ecosystemParticipants.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 36;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            const isActive = active === index;

            return (
              <button
                key={participant.title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                className={`absolute z-30 w-[145px] -translate-x-1/2 -translate-y-1/2 rounded-[22px] border p-3 text-left backdrop-blur-md transition duration-300 sm:w-[172px] sm:p-4 ${
                  isActive ? "border-cyan/60 bg-cyan/10 shadow-[0_0_34px_rgba(34,211,238,0.2)]" : "border-white/10 bg-black/56 hover:border-violet-300/40 hover:bg-white/[0.055]"
                }`}
                style={{ left: `clamp(96px, ${x}%, calc(100% - 96px))`, top: `clamp(84px, ${y}%, calc(100% - 84px))` }}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-cyan" : "text-violet-300"}`} />
                  <span className="text-xs font-black uppercase tracking-[0.08em] text-white sm:text-sm">{participant.title}</span>
                </div>
                <p className="mt-2 hidden text-xs leading-5 text-white/58 sm:block">{participant.sentence}</p>
              </button>
            );
          })}
        </div>

        <div className="grid gap-4">
          <div className="rounded-[28px] border border-white/10 bg-black/30 p-5">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan/78">Participation map</div>
            <h3 className="mt-4 text-2xl font-black leading-tight text-white">Every participant contributes to the network and benefits from it.</h3>
            <p className="mt-4 text-sm leading-7 text-white/66">
              NEXNS grows as participant activity becomes shared signals, shared signals become coordination, and coordination strengthens the network core.
            </p>
          </div>

          <div className="rounded-[28px] border border-violet-400/16 bg-violet-500/8 p-5">
            {(() => {
              const participant = ecosystemParticipants[active];
              const Icon = participant.icon;
              return (
                <>
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan/35 bg-cyan/10">
                      <Icon className="h-5 w-5 text-cyan" />
                    </div>
                    <div>
                      <div className="font-black text-white">{participant.title}</div>
                      <div className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-white/42">Active participant</div>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-white/68">{participant.sentence}</p>
                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-white/8 bg-black/28 p-4">
                      <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/42">Contributes</div>
                      <div className="mt-1 text-sm font-black text-cyan/90">{participant.contribution}</div>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/28 p-4">
                      <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/42">Receives</div>
                      <div className="mt-1 text-sm font-black text-violet-200">{participant.benefit}</div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>

          <div className="rounded-[28px] border border-white/10 bg-black/30 p-5">
            <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-white/66">
              <span>Contribute</span>
              <ArrowRight className="h-4 w-4 text-cyan/70" />
              <span>Connect</span>
              <ArrowRight className="h-4 w-4 text-cyan/70" />
              <span>Benefit</span>
              <ArrowRight className="h-4 w-4 text-cyan/70" />
              <span>Strengthen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GovernanceTrust() {
  const [active, setActive] = useState(0);

  return (
    <div className="nex-panel overflow-hidden p-5 md:p-7">
      <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-stretch">
        <div className="rounded-[30px] border border-white/10 bg-black/30 p-6 md:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/15 bg-white/[0.03] px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-cyan/80">
            <ShieldCheck className="h-3.5 w-3.5" />
            Governance & Trust
          </div>
          <h3 className="mt-6 max-w-xl text-3xl font-black leading-tight tracking-[-0.025em] text-white md:text-5xl">
            Built for long-term network trust.
          </h3>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/70 md:text-base">
            Trust in NEXNS is not framed as voting rhetoric. It is expressed through operating principles, treasury discipline, risk controls, participation channels, and staged decentralization.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              ["Governance logic", "Rules and contribution paths are structured before decentralization expands."],
              ["Treasury discipline", "Network resources are allocated toward sustainability, security, and ecosystem growth."],
              ["Risk controls", "Expansion is staged around safeguards, monitoring, and accountability."],
            ].map(([label, value]) => (
              <div key={label} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan shadow-[0_0_12px_rgba(34,211,238,0.75)]" />
                <div>
                  <div className="text-sm font-black text-white">{label}</div>
                  <p className="mt-1 text-sm leading-6 text-white/60">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.02] p-5 shadow-[0_0_90px_rgba(34,211,238,0.06)] md:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.11),transparent_28%),radial-gradient(circle_at_82%_88%,rgba(139,92,246,0.16),transparent_34%)]" />
          <div className="relative grid gap-3">
            {trustPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isActive = active === index;

              return (
                <button
                  key={pillar.title}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={`group relative grid gap-4 rounded-[26px] border p-4 text-left transition duration-300 md:grid-cols-[72px_1fr_190px] md:items-center md:p-5 ${
                    isActive ? "border-cyan/55 bg-cyan/10 shadow-[0_0_34px_rgba(34,211,238,0.16)]" : "border-white/10 bg-black/38 hover:border-violet-300/36 hover:bg-white/[0.045]"
                  }`}
                >
                  <div className="flex items-center gap-3 md:block">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl border transition ${isActive ? "border-cyan/55 bg-cyan/12" : "border-white/10 bg-white/[0.035]"}`}>
                      <Icon className={`h-5 w-5 ${isActive ? "text-cyan" : "text-violet-300"}`} />
                    </div>
                    <div className="font-mono text-xs font-black uppercase tracking-[0.18em] text-white/44 md:mt-3">{String(index + 1).padStart(2, "0")}</div>
                  </div>

                  <div>
                    <div className="text-lg font-black text-white md:text-xl">{pillar.title}</div>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/66">{pillar.sentence}</p>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-black/30 px-4 py-3 md:text-right">
                    <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/42">Trust signal</div>
                    <div className="mt-1 text-sm font-black text-cyan/90">{pillar.signal}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative mt-5 rounded-[26px] border border-violet-400/18 bg-violet-500/8 p-5 text-center">
            <div className="text-lg font-black tracking-[-0.01em] text-white md:text-2xl">
              Trust is not a claim. It is designed into the network.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EcosystemMap({ onFocus }: { onFocus: (pillar: (typeof ecosystemPillars)[number]) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const time = (now - start) / 1000;
      context.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      context.lineWidth = 1;

      for (let strand = 0; strand < 2; strand += 1) {
        context.beginPath();
        for (let i = 0; i <= 180; i += 1) {
          const p = i / 180;
          const x = width * (0.12 + p * 0.76);
          const wave = Math.sin(p * Math.PI * 4 + time * 0.45 + strand * Math.PI);
          const y = cy + wave * height * 0.22;
          if (i === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        const gradient = context.createLinearGradient(width * 0.1, cy, width * 0.9, cy);
        gradient.addColorStop(0, "rgba(138,43,226,0.02)");
        gradient.addColorStop(0.5, strand === 0 ? "rgba(0,240,255,0.28)" : "rgba(138,43,226,0.28)");
        gradient.addColorStop(1, "rgba(138,43,226,0.02)");
        context.strokeStyle = gradient;
        context.stroke();
      }

      ecosystemPillars.forEach((_, index) => {
        const angle = (index / ecosystemPillars.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * width * 0.34;
        const y = cy + Math.sin(angle) * height * 0.34;
        const inner = context.createLinearGradient(cx, cy, x, y);
        inner.addColorStop(0, "rgba(0,240,255,0.2)");
        inner.addColorStop(1, "rgba(138,43,226,0.04)");
        context.beginPath();
        context.moveTo(cx, cy);
        context.lineTo(x, y);
        context.strokeStyle = inner;
        context.lineWidth = 1;
        context.stroke();
      });

      frame = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
      <div className="nex-panel relative overflow-hidden p-5 sm:p-7">
        <div>
        <div className="relative min-h-[720px] overflow-hidden rounded-[28px] border border-violet-500/20 bg-black/20">
          <canvas ref={canvasRef} className="ecosystem-canvas absolute inset-0 z-0 h-full w-full opacity-60" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 z-40 grid h-52 w-52 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-300/35 bg-black/95 text-center shadow-[0_0_70px_rgba(0,240,255,0.16)]">
            <div>
              <div className="px-6 text-base font-black leading-tight tracking-[0.08em] text-white">NEXNS: The Center of Value Creation and Growth.</div>
            </div>
          </div>

          {ecosystemPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const angle = (index / ecosystemPillars.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 40;
            const y = 50 + Math.sin(angle) * 40;

            return (
              <button
                key={pillar.title}
                type="button"
                onClick={() => onFocus(pillar)}
                className="ecosystem-node absolute z-20 w-[min(190px,44vw)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-violet-500/25 bg-black/86 p-4 text-left backdrop-blur-md transition duration-300 hover:border-cyan-300/45 hover:shadow-[0_0_32px_rgba(0,240,255,0.16)]"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <Icon className="h-5 w-5 text-cyan-200" />
                <span className="mt-3 block text-sm font-black uppercase tracking-[0.12em] text-white">{pillar.title}</span>
                <span className="mt-2 block text-xs text-white/68">{pillar.metric}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FocusAuditPanel({ pillar, onClose }: { pillar: (typeof ecosystemPillars)[number] | null; onClose: () => void }) {
  const Icon = pillar?.icon;

  return (
    <div className={`fixed inset-0 z-[10000] transition ${pillar ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`} aria-hidden={!pillar}>
      <button type="button" className="absolute inset-0 bg-black/68 backdrop-blur-sm" onClick={onClose} aria-label="Close ecosystem audit panel" />
      <motion.aside
        initial={false}
        animate={{ x: pillar ? 0 : 520 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        className="absolute right-0 top-0 h-full w-[min(520px,100vw)] border-l border-violet-500/25 bg-black/96 p-7 shadow-[0_0_70px_rgba(0,0,0,0.55)]"
      >
        {pillar && Icon ? (
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-5">
              <div>
                <h3 className="text-4xl font-black leading-tight">{pillar.title}</h3>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-violet-500/25 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/78 transition hover:text-white">
                Close
              </button>
            </div>
            <div className="mt-10 grid h-20 w-20 place-items-center rounded-3xl border border-cyan-300/25 bg-cyan-300/10">
              <Icon className="h-9 w-9 text-cyan-200" />
            </div>
            <div className="mt-8 rounded-3xl border border-violet-500/20 bg-white/[0.018] p-5">
              <div className="mt-3 text-3xl font-black text-white">{pillar.metric}</div>
            </div>
            <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-cyan-300/[0.06] p-5">
              <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100">Technical Role</div>
              <p className="mt-3 text-base leading-[1.75] text-white/82">{pillar.audit}</p>
            </div>
          </div>
        ) : null}
      </motion.aside>
    </div>
  );
}

function RoadmapTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePhase = roadmap[activeIndex];

  return (
    <div className="nex-panel relative overflow-hidden p-5 sm:p-7 lg:p-9">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute left-12 top-12 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute bottom-10 right-16 h-52 w-52 rounded-full bg-violet-500/12 blur-3xl" />
      </div>

      <div className="relative grid gap-8 xl:grid-cols-[0.72fr_1.28fr] xl:items-stretch">
        <div className="rounded-[30px] border border-white/10 bg-black/30 p-6 md:p-8">
          <div className="text-xs font-black uppercase tracking-[0.2em] text-cyan/78">Roadmap thesis</div>
          <h3 className="mt-5 text-3xl font-black leading-tight tracking-[-0.025em] text-white md:text-5xl">
            From signal network to global infrastructure.
          </h3>
          <p className="mt-6 text-sm leading-7 text-white/70 md:text-base">
            NEXNS expands in staged infrastructure layers: first capturing prediction signals, then scaling distribution, activation, market reach, and long-term network utility.
          </p>
          <div className="mt-8 rounded-3xl border border-violet-400/16 bg-violet-500/8 p-5">
            <div className="font-mono text-sm font-black tracking-[0.16em] text-cyan">{activePhase.year}</div>
            <h4 className="mt-3 text-2xl font-black text-white">{activePhase.title}</h4>
            <p className="mt-3 text-sm leading-6 text-white/66">{activePhase.mission}</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.02] p-5 shadow-[0_0_90px_rgba(34,211,238,0.06)] md:p-7">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(34,211,238,0.1),transparent_30%),radial-gradient(circle_at_50%_88%,rgba(139,92,246,0.15),transparent_34%)]" />

          <div className="relative hidden lg:block">
            <svg className="pointer-events-none absolute left-0 right-0 top-12 h-32 w-full overflow-visible opacity-70" viewBox="0 0 920 140" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="strategicRoadmapPath" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.12" />
                  <stop offset="48%" stopColor="#22d3ee" stopOpacity="0.74" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.82" />
                </linearGradient>
                <filter id="strategicRoadmapGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path d="M38 86 C190 20 332 118 468 70 C612 18 720 120 882 42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <motion.path
                d="M38 86 C190 20 332 118 468 70 C612 18 720 120 882 42"
                fill="none"
                stroke="url(#strategicRoadmapPath)"
                strokeDasharray="120 820"
                strokeLinecap="round"
                strokeWidth="4"
                filter="url(#strategicRoadmapGlow)"
                animate={{ strokeDashoffset: [0, -940] }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            <div className="relative z-10 grid gap-5 xl:grid-cols-2 2xl:grid-cols-3">
            {roadmap.map((phase, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={phase.year}
                  type="button"
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative min-h-[220px] overflow-hidden rounded-[28px] border p-5 text-left transition duration-300 ${
                    isActive ? "border-cyan/55 bg-cyan/10 shadow-[0_0_34px_rgba(34,211,238,0.2)]" : "border-white/10 bg-black/62 hover:border-violet-300/38 hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/45 to-violet-300/0 opacity-0 transition group-hover:opacity-100" />
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-2xl font-black text-white">{phase.year}</span>
                    <span className={`grid h-8 w-8 place-items-center rounded-full border text-[10px] font-black ${isActive ? "border-cyan/45 bg-cyan/12 text-cyan shadow-[0_0_16px_rgba(34,211,238,0.45)]" : "border-white/10 bg-white/[0.035] text-violet-200/70"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-5 text-2xl font-black leading-tight text-white">{phase.title}</div>
                  <p className="mt-4 text-sm leading-6 text-white/68">{phase.mission}</p>
                  <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                    <div className="text-[0.62rem] font-black uppercase tracking-[0.16em] text-white/42">Outcome</div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-white/66">{phase.emphasis}</p>
                  </div>
                </button>
              );
            })}
            </div>
          </div>

          <div className="relative grid gap-4 lg:hidden">
            {roadmap.map((phase, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={phase.year}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative border-l pl-5 text-left transition ${
                    isActive ? "border-cyan" : "border-white/12"
                  }`}
                >
                  <span className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ${isActive ? "bg-cyan shadow-[0_0_14px_rgba(34,211,238,0.85)]" : "bg-violet-300/55"}`} />
                  <div className={`rounded-[24px] border p-4 ${isActive ? "border-cyan/45 bg-cyan/10" : "border-white/10 bg-black/42"}`}>
                    <div className="font-mono text-lg font-black text-white">{phase.year}</div>
                    <div className="mt-2 font-black text-white">{phase.title}</div>
                    <p className="mt-2 text-sm leading-6 text-white/64">{phase.mission}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <motion.div
            key={activePhase.year}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-6 grid gap-4 rounded-[28px] border border-white/10 bg-black/44 p-5 md:grid-cols-[0.72fr_1.28fr]"
          >
            <div>
              <div className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-white/42">Strategic phase</div>
              <div className="mt-2 font-mono text-2xl font-black text-cyan">{activePhase.year}</div>
              <h4 className="mt-2 text-2xl font-black text-white">{activePhase.title}</h4>
            </div>
            <div className="grid gap-3">
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/42">Mission</div>
                <p className="mt-2 text-sm leading-6 text-white/70">{activePhase.mission}</p>
              </div>
              <div className="rounded-2xl border border-violet-400/16 bg-violet-500/8 p-4">
                <div className="text-[0.65rem] font-black uppercase tracking-[0.18em] text-white/42">Strategic outcome</div>
                <p className="mt-2 text-sm leading-6 text-white/70">{activePhase.outcome}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SignalMap() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 520" role="img" aria-label="NEXNS network architecture map">
      <g fill="none" stroke="rgba(109,40,217,0.28)" strokeWidth="1">
        <path d="M110 260 C180 120 420 120 510 260 C420 410 190 410 110 260Z" />
        <path d="M160 260 C230 190 380 190 460 260 C380 330 230 330 160 260Z" />
        <path d="M310 90 L510 260 L310 430 L110 260Z" />
      </g>
      {[
        [310, 90],
        [510, 260],
        [310, 430],
        [110, 260],
        [310, 260],
        [410, 165],
        [210, 355],
      ].map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={index === 4 ? 32 : 12} fill="rgba(10,10,11,0.92)" stroke="rgba(109,40,217,0.46)" />
          <circle cx={cx} cy={cy} r={index === 4 ? 5 : 3} fill="rgba(167,139,250,0.95)" />
        </g>
      ))}
      <text x="310" y="268" textAnchor="middle" fill="white" fontSize="18" fontWeight="900" letterSpacing="3">
        NEX
      </text>
    </svg>
  );
}

function FloatingCompanion({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
  return (
    <>
      {open ? (
        <div className="fixed bottom-28 right-4 z-[9999] w-[min(420px,calc(100vw-2rem))] rounded-[28px] border border-violet-500/25 bg-black/92 p-5 shadow-[0_0_44px_rgba(109,40,217,0.24)] backdrop-blur-xl md:bottom-40 md:right-10">
          <div className="flex items-start justify-between gap-4">
            <button type="button" onClick={onClose} className="rounded-full border border-violet-500/20 px-3 py-1 text-xs font-black text-white/78 hover:text-white">
              Close
            </button>
          </div>
          <div className="mt-6 grid gap-3">
            {[
              ["Network Status", "Growth loops are synchronized across prediction, creator, and project layers."],
              ["Review Path", "Review the financial dashboard or enter Presentation Mode for institutional briefing."],
              ["System Function", "NEX provides navigation, retention, progress, and ecosystem context."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-violet-500/20 bg-white/[0.018] p-4">
                <div className="text-sm font-black text-white">{title}</div>
                <div className="mt-2 text-sm leading-[1.65] text-white/74">{copy}</div>
              </div>
            ))}
          </div>
          <Link to="/companion" className="nex-primary-button mt-5 w-full justify-center">
            Open Full Companion
          </Link>
        </div>
      ) : null}
      <button
        type="button"
        onClick={onOpen}
        className="companion-anchor fixed bottom-5 right-5 z-[9999] flex h-16 w-16 items-center justify-center rounded-full border border-violet-500/25 bg-black/88 backdrop-blur-md md:bottom-10 md:right-10 md:h-24 md:w-24"
        aria-label="Open NEX AI Companion"
      >
        <Mascot variant="thinking" className="w-14 md:w-20" />
      </button>
    </>
  );
}

function WebsiteFooter() {
  const renderFooterLink = (link: { label: string; href: string; external?: boolean }) => {
    const className = "text-sm font-medium text-white/58 transition hover:text-white";

    if (link.external) {
      return (
        <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={className}>
          {link.label}
        </a>
      );
    }

    if (link.href.startsWith("/")) {
      return (
        <Link key={link.label} to={link.href} className={className}>
          {link.label}
        </Link>
      );
    }

    return (
      <a key={link.label} href={link.href} className={className}>
        {link.label}
      </a>
    );
  };

  return (
    <footer className="border-t border-white/8 bg-black px-6 py-14 md:px-12 xl:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-9 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-white">{column.title}</h3>
              <div className="mt-5 grid gap-3">
                {column.links.map(renderFooterLink)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-7 border-t border-white/8 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <a href="#home" className="inline-flex items-center gap-3" aria-label="NEXNS home">
              <img src={nexLogoWhite} alt="" className="h-8 w-auto object-contain" draggable={false} loading="lazy" decoding="async" />
              <span className="text-xl font-black tracking-[0.18em] text-white">NEXNS</span>
            </a>
            <p className="mt-3 text-sm font-semibold text-white/72">Global Prediction Growth Infrastructure</p>
            <p className="mt-2 text-xs text-white/38">© 2026 NEXNS Network. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {footerSocialLinks.map(renderFooterLink)}
          </div>
        </div>
      </div>
    </footer>
  );
}
