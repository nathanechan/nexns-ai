import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  CircleDollarSign,
  Crown,
  MessageCircle,
  Play,
  Rocket,
  Trophy,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import nexLogoWhite from "../assets/logo/nex-logo-white.png";
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
import bnbChainLogo from "../assets/Technology Ecosystem/bnbchain.svg";
import chainlinkLogo from "../assets/Technology Ecosystem/chainlink.svg";
import cloudflareLogo from "../assets/Technology Ecosystem/cloudflare.svg";
import ethereumLogo from "../assets/Technology Ecosystem/ethereum.svg";
import googleLogo from "../assets/Technology Ecosystem/google.svg";
import googleAuthenticatorLogo from "../assets/Technology Ecosystem/googleauthenticator.svg";
import nvidiaLogo from "../assets/Technology Ecosystem/nvidia.svg";
import openAiGymLogo from "../assets/Technology Ecosystem/openaigym.svg";
import solanaLogo from "../assets/Technology Ecosystem/solana.svg";
import ameliaHart from "../assets/team/amelia-hart.png";
import danielRoss from "../assets/team/daniel-ross.png";
import ethanCole from "../assets/team/ethan-cole.png";
import leoWalker from "../assets/team/leo-walker.png";
import marcusLin from "../assets/team/marcus-lin.png";
import oliviaBrooks from "../assets/team/olivia-brooks.png";
import sophiaGrant from "../assets/team/sophia-grant.png";
import victoriaReed from "../assets/team/victoria-reed.png";

const nav = [
  { label: "Home", href: "#home" },
  { label: "Why NEXNS", href: "#why-nexns" },
  { label: "Ecosystem", href: "#growth-engine" },
  { label: "AI Companion", href: "#ai-companion" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Community", href: "#community" },
  { label: "Investors", href: "/investor" },
  { label: "Launch App", href: "/app" },
];

const heroStats = [
  { value: "$0.0248", label: "NEX Price" },
  { value: "$1.28M", label: "24h Volume" },
  { value: "$24.58M", label: "Market Cap" },
  { value: "1.28M+", label: "NEX Burned" },
];

const engineNodes = [
  { label: "Users", copy: "Create attention", icon: Users },
  { label: "Creators", copy: "Amplify influence", icon: Crown },
  { label: "Projects", copy: "Acquire growth", icon: Rocket },
  { label: "Rewards", copy: "Return value", icon: Trophy },
  { label: "Companions", copy: "Drive retention", icon: Bot },
  { label: "Community", copy: "Compounds trust", icon: MessageCircle },
] satisfies { label: string; copy: string; icon: LucideIcon }[];

const flywheelSteps = [
  {
    title: "Users",
    orbit: "Attention",
    flow: "Attention -> Influence",
    copy: "Users create attention through predictions, daily participation, and market signals.",
    detail: "Users generate the first layer of network value. Their predictions, actions, and tasks create attention that moves into creator distribution and ecosystem visibility.",
    icon: Users,
  },
  {
    title: "Creators",
    orbit: "Influence",
    flow: "Influence -> Adoption",
    copy: "Creators convert attention into influence, insight, and trusted distribution.",
    detail: "Creators turn attention into narratives, market insight, and community trust. Their influence helps projects and campaigns reach users with greater credibility.",
    icon: Crown,
  },
  {
    title: "Projects",
    orbit: "Activation",
    flow: "Adoption -> Revenue",
    copy: "Projects convert influence into activation, adoption, and measurable growth.",
    detail: "Projects activate creator distribution and user participation to create adoption. Campaigns, launches, and community programs convert influence into measurable growth.",
    icon: Rocket,
  },
  {
    title: "Revenue",
    orbit: "Value",
    flow: "Revenue -> Rewards",
    copy: "Ecosystem activity generates value through campaigns, services, and platform activity.",
    detail: "Revenue forms the value capture layer of NEXNS. It is created as users participate, creators distribute, and projects activate growth across the network.",
    icon: CircleDollarSign,
  },
  {
    title: "Rewards",
    orbit: "Retention",
    flow: "Rewards -> Trust",
    copy: "Value returns through rewards, progression, treasury, buyback, and ecosystem incentives.",
    detail: "Rewards return captured value to the network. User progression, creator incentives, treasury strength, and buyback mechanics reinforce long-term participation.",
    icon: Trophy,
  },
  {
    title: "Community",
    orbit: "Trust",
    flow: "Trust -> Growth -> Attention",
    copy: "Community compounds trust, retention, and renewed attention.",
    detail: "Community turns returned value into trust. Trust strengthens retention, expands the network, and brings new attention back into the user layer.",
    icon: MessageCircle,
  },
] satisfies { title: string; orbit: string; flow: string; copy: string; detail: string; icon: LucideIcon }[];

const flywheelReasons = [
  "More Users",
  "More Content",
  "More Projects",
  "More Revenue",
  "More Rewards",
  "More Community",
  "More Users",
];

const orbitLabels = ["Attention", "Influence", "Activation", "Value", "Retention", "Trust"] satisfies string[];

const flowLabels = ["Attention", "Influence", "Adoption", "Revenue", "Rewards", "Trust", "Growth"] satisfies string[];

const flywheelMetrics = [
  ["Signal Volume", "12,458"],
  ["Active Users", "82,360"],
  ["Creator Network", "15,287"],
  ["Projects Launched", "46"],
  ["Value Captured", "$2.48M"],
  ["Ecosystem Value", "$18.6M"],
] satisfies [string, string][];

const tokenSummary = [
  {
    title: "NEX",
    subtitle: "Value Layer",
    copy: "Access, governance, staking, project entry, creator growth, and long-term value alignment.",
    icon: "logo",
  },
  {
    title: "NS",
    subtitle: "Participation Layer",
    copy: "Tasks, rewards, user progress, retention, community activity, and ecosystem fuel.",
    icon: "logo",
  },
  {
    title: "Value Capture",
    subtitle: "Network Alignment",
    copy: "Protocol revenue supports buyback, burn, DAO treasury, ecosystem reinvestment, and long-term network strength.",
    icon: "value",
  },
];

const tokenFlow = ["Users participate", "Activity creates value", "Protocol revenue", "Buyback & burn", "DAO treasury", "Ecosystem growth"];

const roadmap = [
  {
    year: "2026",
    title: "AI Companion Foundation",
    objectives: ["Launch AI Companion", "Launch Prediction Layer", "Deploy NEX / NS Framework", "Build Early Community"],
    milestones: ["50,000 Users", "100 Creators", "20 Projects"],
    outcome: "Establish the foundation of the NEXNS ecosystem.",
  },
  {
    year: "2027",
    title: "Creator Economy Expansion",
    objectives: ["Creator Economy Infrastructure", "Influence Distribution Systems", "Community Growth Programs"],
    milestones: ["500 Creators", "500,000 Users", "100 Communities"],
    outcome: "Transform creators into growth multipliers.",
  },
  {
    year: "2028",
    title: "Project Growth Infrastructure",
    objectives: ["Project Launch Systems", "Growth Campaign Engine", "Prediction-Based Activation"],
    milestones: ["1,000 Projects", "2,000 Creators", "1 Million Users"],
    outcome: "Build the decentralized growth infrastructure for projects.",
  },
  {
    year: "2029+",
    title: "Global Network Layer",
    objectives: ["Cross-Chain Expansion", "Open Ecosystem Protocol", "Global Community Governance"],
    milestones: ["Multi-Million User Network", "Global Expansion", "Open Participation Economy"],
    outcome: "Become the operating layer for prediction-driven growth.",
  },
];

const coreTeam = [
  {
    name: "Ethan Cole",
    role: "Founder & CEO",
    image: ethanCole,
    responsibility: "Leads long-term vision, strategic direction, fundraising, and ecosystem expansion.",
    strategicFocus: "Defining the global prediction growth network and aligning product, capital, and ecosystem strategy.",
  },
  {
    name: "Sophia Grant",
    role: "Chief Product Officer",
    image: sophiaGrant,
    responsibility: "Designs product architecture, user experience, and ecosystem progression systems.",
    strategicFocus: "Building the product architecture that transforms participation into sustainable growth.",
  },
  {
    name: "Marcus Lin",
    role: "Head of Growth",
    image: marcusLin,
    responsibility: "Builds user acquisition, creator activation, and growth loops.",
    strategicFocus: "Designing growth systems that convert attention into measurable ecosystem expansion.",
  },
  {
    name: "Olivia Brooks",
    role: "AI Systems Architect",
    image: oliviaBrooks,
    responsibility: "Develops AI Companion intelligence, personalization, and adaptive engagement systems.",
    strategicFocus: "Creating adaptive AI companions that guide participation, retention, and long-term user progression.",
  },
  {
    name: "Daniel Ross",
    role: "Blockchain Infrastructure Lead",
    image: danielRoss,
    responsibility: "Builds protocol architecture, token systems, and Web3 infrastructure.",
    strategicFocus: "Building scalable blockchain infrastructure for prediction, settlement, and ecosystem value capture.",
  },
  {
    name: "Amelia Hart",
    role: "Strategic Partnerships Lead",
    image: ameliaHart,
    responsibility: "Expands ecosystem partnerships across creators, projects, and infrastructure providers.",
    strategicFocus: "Connecting NEXNS with strategic partners across AI, Web3, infrastructure, and creator networks.",
  },
  {
    name: "Leo Walker",
    role: "Community Ecosystem Lead",
    image: leoWalker,
    responsibility: "Builds community programs, ambassador networks, and participation systems.",
    strategicFocus: "Building a self-reinforcing global community network around NEXNS.",
  },
  {
    name: "Victoria Reed",
    role: "Global Operations Lead",
    image: victoriaReed,
    responsibility: "Coordinates ecosystem deployment, operations, and international expansion.",
    strategicFocus: "Scaling operational systems for global ecosystem deployment and institutional readiness.",
  },
];

const technologyPartners = [
  { name: "OpenAI Gym", category: "AI", icon: openAiGymLogo, href: "https://openai.com/" },
  { name: "NVIDIA", category: "AI", icon: nvidiaLogo, href: "https://www.nvidia.com/" },
  { name: "Google", category: "Infrastructure", icon: googleLogo, href: "https://cloud.google.com/" },
  { name: "Google Authenticator", category: "Security", icon: googleAuthenticatorLogo, href: "https://support.google.com/accounts/answer/1066447" },
  { name: "Cloudflare", category: "Infrastructure", icon: cloudflareLogo, href: "https://www.cloudflare.com/" },
  { name: "Ethereum", category: "Blockchain", icon: ethereumLogo, href: "https://ethereum.org/" },
  { name: "BNB Chain", category: "Blockchain", icon: bnbChainLogo, href: "https://www.bnbchain.org/" },
  { name: "Solana", category: "Blockchain", icon: solanaLogo, href: "https://solana.com/" },
  { name: "Chainlink", category: "Blockchain", icon: chainlinkLogo, href: "https://chain.link/" },
];

const communityChannels = [
  { label: "X", metric: "32.1K", icon: xIcon, href: "https://x.com/" },
  { label: "Telegram", metric: "15.8K", icon: telegramIcon, href: "https://telegram.org/" },
  { label: "Discord", metric: "24.5K", icon: discordIcon, href: "https://discord.com/" },
  { label: "GitHub", metric: "2.8K", icon: githubIcon, href: "https://github.com/" },
  { label: "YouTube", metric: "6.2K", icon: youtubeIcon, href: "https://youtube.com/" },
  { label: "Medium", metric: "4.6K", icon: mediumIcon, href: "https://medium.com/" },
  { label: "CoinMarketCap", metric: "Tracking", icon: coinMarketCapIcon, href: "https://coinmarketcap.com/" },
  { label: "Reddit", metric: "Community", icon: redditIcon, href: "https://reddit.com/" },
  { label: "Instagram", metric: "Social", icon: instagramIcon, href: "https://instagram.com/" },
  { label: "TikTok", metric: "Social", icon: tiktokIcon, href: "https://tiktok.com/" },
];

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Prediction Market", href: "/prediction" },
      { label: "Creator Arena", href: "/creator" },
      { label: "Project Launchpad", href: "/projects" },
      { label: "AI Companion", href: "/companion" },
      { label: "Dashboard", href: "/app" },
    ],
  },
  {
    title: "Ecosystem",
    links: [
      { label: "Growth Flywheel", href: "#growth-engine" },
      { label: "Technology Ecosystem", href: "#technology-ecosystem" },
      { label: "Community", href: "#community" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Investor Deck", href: "/presentation" },
      { label: "Investor One Pager", href: "/investor/one-page" },
      { label: "Whitepaper", href: "#" },
      { label: "FAQ", href: "/investor" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Documentation", href: "#" },
      { label: "GitHub", href: "https://github.com/", external: true },
      { label: "Smart Contracts", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About NEXNS", href: "#why-nexns" },
      { label: "Core Team", href: "#core-team" },
      { label: "Vision", href: "#home" },
      { label: "Partners", href: "#technology-ecosystem" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Risk Disclosure", href: "#" },
      { label: "Disclaimer", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "X", href: "https://x.com/", external: true },
      { label: "Telegram", href: "https://telegram.org/", external: true },
      { label: "Discord", href: "https://discord.com/", external: true },
      { label: "GitHub", href: "https://github.com/", external: true },
      { label: "YouTube", href: "https://youtube.com/", external: true },
      { label: "Medium", href: "https://medium.com/", external: true },
    ],
  },
];

export function LandingPage() {
  const [activeFlywheel, setActiveFlywheel] = useState(0);
  const activeStep = flywheelSteps[activeFlywheel];

  return (
    <div className="min-h-screen overflow-hidden bg-space-radial px-4 py-5 sm:px-5">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[10%] h-[520px] w-[520px] rounded-full bg-neon/10 blur-[90px]" />
        <div className="absolute right-[-10%] top-[38%] h-[480px] w-[480px] rounded-full bg-cyan/10 blur-[100px]" />
        <div className="absolute bottom-[12%] left-[20%] h-[360px] w-[720px] -rotate-12 rounded-full bg-blue/10 blur-[90px]" />
        <div className="light-beam absolute -left-24 top-24 h-20 w-[70vw]" />
        <div className="light-beam absolute right-0 top-[560px] h-24 w-[60vw]" />
        {Array.from({ length: 18 }).map((_, index) => (
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
        <WebsiteLogo />
        <nav className="hidden items-center gap-7 text-sm font-semibold lg:flex">
          {nav.map((item, index) => (
            <NavLink key={item.label} item={item} isActive={index === 0} />
          ))}
        </nav>
        <Link to="/app" className="purple-button interactive-glow flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold lg:hidden">
          Launch App <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl">
        <section id="home" className="website-section relative grid min-h-[650px] items-center gap-8 overflow-hidden py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div className="z-10" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 className="website-hero-title font-black leading-none">NEXNS</h1>
            <div className="website-hero-subtitle mt-4 max-w-2xl font-black leading-tight text-gradient">The AI-Powered Growth Network</div>
            <p className="website-kicker mt-6 max-w-xl font-black leading-tight text-white">Where Attention Becomes Growth</p>
            <p className="website-body mt-5 max-w-xl font-semibold text-slate-200">
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
                  <div className="nex-metric text-2xl md:text-3xl">{stat.value}</div>
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
            <FloatingMetric className="left-2 top-28" label="Growth Signals" value="24.58M+" />
            <FloatingMetric className="right-4 top-44" label="Creator Network" value="15.28K+" />
            <FloatingMetric className="bottom-14 left-12" label="Project Growth" value="468+" />
          </div>
        </section>

        <section id="ai-companion" className="website-section py-12">
          <ScenePanel scene="companion">
            <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[320px] overflow-hidden rounded-[30px] border border-cyan/20 bg-gradient-to-br from-neon/14 via-black/20 to-cyan/8">
                <div className="absolute inset-x-12 bottom-12 h-20 rounded-[50%] border border-cyan/25 bg-cyan/8 blur-sm" />
                <div className="absolute left-8 top-8 scene-chip px-4 py-3 text-sm font-black text-cyan">Personal AI Guide</div>
                <div className="absolute right-8 top-20 scene-chip px-4 py-3 text-sm font-black text-purple-200">Digital Identity</div>
                <Mascot variant="guiding" className="relative z-10 mx-auto mt-10 w-60 opacity-90" />
              </div>
              <div>
                <h2 className="website-section-title nex-title">NEX is the user growth companion inside NEXNS.</h2>
                <p className="website-section-copy mt-5 max-w-2xl text-slate-300">
                  NEX is not a decorative character. It connects prediction, creators, projects, rewards, identity, and pet progression into one guided growth experience.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {["Guides next actions", "Tracks progress", "Connects rewards", "Builds identity"].map((item) => (
                    <div key={item} className="scene-chip p-4 text-sm font-black text-slate-100">
                      {item}
                    </div>
                  ))}
                </div>
                <Link to="/companion" className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-cyan/30 bg-cyan/10 px-6 py-4 text-sm font-black text-cyan interactive-glow">
                  Meet NEX <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </ScenePanel>
        </section>

        <section id="growth-engine" className="website-section py-12">
          <div className="scene-shell relative overflow-hidden p-6 md:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_42%,rgba(139,92,246,0.3),transparent_34%),radial-gradient(circle_at_76%_58%,rgba(34,211,238,0.16),transparent_38%)]" />
            <div className="relative grid items-center gap-8 xl:grid-cols-[minmax(220px,0.9fr)_minmax(720px,3.2fr)_minmax(220px,0.9fr)]">
              <div className="relative z-20">
                <h2 className="website-section-title nex-title">NEXNS Value Network</h2>
                <p className="website-section-copy mt-5 text-slate-300">
                  Attention Creates Influence. Influence Creates Growth. Growth Creates Value. Value Returns To The Network.
                </p>
                <div className="mt-7 rounded-3xl border border-cyan/20 bg-cyan/10 p-5 shadow-cyan">
                  <h3 className="website-card-title nex-title">Why it matters</h3>
                  <p className="website-card-copy mt-3 text-slate-300">
                    NEXNS is designed as a self-reinforcing value network. Users create attention, creators amplify it, projects convert it into growth, and captured value returns through NEX.
                  </p>
                </div>
                <div className="mt-5 rounded-3xl border border-white/10 bg-black/35 p-5">
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan">{activeStep.flow}</div>
                  <div className="mt-2 text-xl font-black text-white">{activeStep.title}</div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{activeStep.detail}</p>
                </div>
              </div>

              <div className="value-flow-stage relative mx-auto min-h-[760px] w-full max-w-[760px] lg:min-h-[700px]">
                <div className="value-flow-aura absolute left-1/2 top-[46%] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
                <div className="value-flow-ring absolute left-1/2 top-[46%] h-[530px] w-[530px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
                <div className="value-flow-path is-active absolute left-1/2 top-[46%] h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
                <div className="absolute left-1/2 top-[46%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/20 bg-black/25 shadow-hero" />
                <div className="absolute left-1/2 top-[46%] h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan/10 blur-2xl" />

                <svg className="value-network-svg absolute left-1/2 top-[46%] z-10 h-[530px] w-[530px] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 640 640" aria-hidden="true">
                  <defs>
                    <marker id="valueArrow" markerHeight="10" markerWidth="10" orient="auto" refX="8" refY="5">
                      <path d="M0,0 L10,5 L0,10 Z" fill="rgba(34,211,238,0.75)" />
                    </marker>
                  </defs>
                  {[
                    "M320 72 A248 248 0 0 1 535 196",
                    "M535 196 A248 248 0 0 1 535 444",
                    "M535 444 A248 248 0 0 1 320 568",
                    "M320 568 A248 248 0 0 1 105 444",
                    "M105 444 A248 248 0 0 1 105 196",
                    "M105 196 A248 248 0 0 1 320 72",
                  ].map((path, index) => (
                    <path
                      key={path}
                      d={path}
                      className={`value-network-arc ${activeFlywheel === index ? "is-active" : ""}`}
                      markerEnd="url(#valueArrow)"
                    />
                  ))}
                  {[
                    "M320 72 C185 205 185 432 320 568",
                    "M535 196 C472 342 440 515 320 568",
                    "M535 444 C470 518 410 560 320 568",
                    "M320 568 L320 405",
                  ].map((path, index) => (
                    <path key={path} d={path} className={`value-capture-line ${activeFlywheel === index || (index === 3 && activeFlywheel === 3) ? "is-active" : ""}`} />
                  ))}
                </svg>

                <div className="value-particle-layer absolute left-1/2 top-[46%] z-10 h-[530px] w-[530px] -translate-x-1/2 -translate-y-1/2 rounded-full">
                  {flywheelSteps.map((step, index) => (
                    <span
                      key={`${step.title}-particle`}
                      className="value-flow-particle"
                      style={
                        {
                          "--particle-rotate": `${index * 60}deg`,
                          "--particle-delay": `${index * -1.2}s`,
                        } as CSSProperties
                      }
                    />
                  ))}
                </div>

                <div className="value-flow-labels absolute left-1/2 top-[46%] z-20 h-0 w-0">
                  {flowLabels.map((label, index) => (
                    <ValueFlowLabel key={label} label={label} index={index} active={activeFlywheel === Math.min(index, flywheelSteps.length - 1)} />
                  ))}
                </div>

                <div className="value-orbit-labels absolute left-1/2 top-[46%] z-20 h-0 w-0">
                  {orbitLabels.map((label, index) => (
                    <ValueOrbitLabel key={label} label={label} index={index} active={activeFlywheel === index} />
                  ))}
                </div>

                <div className="value-flow-orbit absolute left-1/2 top-[46%] z-30 h-0 w-0">
                  {flywheelSteps.map((step, index) => (
                    <ValueFlowNode
                      key={step.title}
                      index={index}
                      step={step}
                      active={activeFlywheel === index}
                      onHover={() => setActiveFlywheel(index)}
                      onClick={() => setActiveFlywheel(index)}
                    />
                  ))}
                </div>

                <div className="relative z-20 mx-auto mt-4 grid w-80 place-items-center text-center lg:absolute lg:left-1/2 lg:top-[46%] lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2">
                  <div className="grid h-44 w-44 place-items-center rounded-full border border-cyan/50 bg-black/60 p-8 shadow-cyan backdrop-blur-xl">
                    <img src={nexLogoWhite} alt="NEXNS" className="h-full w-full object-contain" draggable={false} />
                  </div>
                  <div className="mt-5 rounded-3xl border border-cyan/35 bg-black/68 px-6 py-5 shadow-cyan backdrop-blur-xl">
                    <div className="text-4xl font-black text-white">NEX Token</div>
                    <div className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-cyan">The Value Convergence Layer</div>
                    <div className="mt-3 text-sm font-semibold leading-6 text-slate-300">All ecosystem value converges into NEX and returns through rewards, treasury, and long-term network strength.</div>
                  </div>
                </div>
              </div>

              <div className="relative z-20">
                <GlassCard className="p-6">
                  <h3 className="website-card-title nex-title">Why The Network Works</h3>
                  <div className="mt-5 grid gap-2">
                    {flywheelReasons.map((item, index) => (
                      <div key={`${item}-${index}`}>
                        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-black text-slate-200">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cyan/25 bg-cyan/10 text-xs text-cyan">{index + 1}</span>
                          <span>{item}</span>
                        </div>
                        {index < flywheelReasons.length - 1 ? <ArrowDown className="mx-auto my-1 h-4 w-4 text-cyan/60" /> : null}
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-400">
                    The loop compounds because each cycle returns more participation, distribution, value, and trust back into NEXNS.
                  </p>
                </GlassCard>
              </div>
            </div>
            <div className="relative mt-8 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {flywheelMetrics.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
                  <div className="nex-metric text-2xl">{value}</div>
                  <div className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-slate-400">{label}</div>
                </div>
              ))}
            </div>
            <div className="relative mt-6 rounded-2xl border border-cyan/20 bg-cyan/10 px-5 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-cyan">
              Value Created Together. Value Returns Together. Growth Forever.
            </div>
          </div>
        </section>

        <section id="tokenomics" className="website-section py-12">
          <GlassCard className="relative overflow-hidden p-7 md:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(139,92,246,0.2),transparent_34%),radial-gradient(circle_at_82%_62%,rgba(34,211,238,0.16),transparent_34%)]" />
            <div className="relative grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <h2 className="website-section-title nex-title">Token Economy Summary</h2>
                <p className="website-section-copy mt-5 max-w-2xl text-slate-300">
                  NEXNS uses a dual-layer economy: NEX captures long-term network value, while NS powers daily participation, rewards, and ecosystem activity.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {tokenSummary.map((item) => (
                  <GlassCard key={item.title} className="interactive-glow p-5">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan/25 bg-cyan/10 p-2 shadow-cyan">
                      {item.icon === "value" ? <CircleDollarSign className="h-6 w-6 text-cyan" /> : <img src={nexLogoWhite} alt="NEXNS" className="h-full w-full object-contain" draggable={false} />}
                    </div>
                    <h3 className="mt-5 text-3xl font-black text-gradient">{item.title}</h3>
                    <p className="mt-1 text-sm font-black text-slate-200">{item.subtitle}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-400">{item.copy}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
            <div className="relative mt-7 grid gap-3 md:grid-cols-6">
              {tokenFlow.map((item, index) => (
                <div key={item} className="relative rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="text-xs font-black text-cyan">0{index + 1}</div>
                  <div className="mt-1 text-lg font-black text-white">{item}</div>
                  {index < tokenFlow.length - 1 ? <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-cyan/60 md:block" /> : null}
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="roadmap" className="website-section py-12">
          <GlassCard className="p-7 md:p-9">
            <SectionHeader title="Strategic Roadmap" copy="A phased expansion toward the Global Prediction Growth Network." />
            <div className="mt-8 grid gap-5 lg:grid-cols-4">
              {roadmap.map((phase, index) => (
                <GlassCard key={phase.title} className="interactive-glow p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="nex-icon h-11 w-11 text-sm font-black">{index + 1}</div>
                    <div className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs font-black text-cyan">{phase.year}</div>
                  </div>
                  <h3 className="website-card-title mt-5 nex-title">{phase.title}</h3>
                  <RoadmapList title="Objectives" items={phase.objectives} />
                  <RoadmapList title="Milestones" items={phase.milestones} />
                  <div className="mt-5 rounded-2xl border border-neon/20 bg-neon/10 p-4">
                    <div className="text-xs font-black uppercase tracking-[0.16em] text-purple-200">Expected Outcome</div>
                    <p className="website-card-copy mt-2 text-slate-200">{phase.outcome}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="core-team" className="website-section py-12">
          <ScenePanel scene="team">
            <SectionHeader title="Core Team" copy="An international execution team built around product, intelligence, growth, infrastructure, partnerships, community, and operations." />
            <div className="relative mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {coreTeam.map((member) => (
                <CoreTeamCard key={member.name} {...member} />
              ))}
            </div>
          </ScenePanel>
        </section>

        <section id="technology-ecosystem" className="website-section py-12">
          <GlassCard className="relative overflow-hidden p-7 md:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_82%_70%,rgba(139,92,246,0.18),transparent_34%)]" />
            <div className="relative mx-auto max-w-4xl text-center">
              <h2 className="website-section-title nex-title">Technology Ecosystem</h2>
              <p className="website-section-copy mx-auto mt-5 max-w-3xl text-slate-300">
                NEXNS is designed around compatible AI, cloud, security, and Web3 infrastructure shaping the next era of internet growth.
              </p>
            </div>
            <div className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {technologyPartners.map((partner) => (
                <a key={partner.name} href={partner.href} target="_blank" rel="noreferrer" title={`${partner.name} - ${partner.category}`} className="ecosystem-logo-card interactive-glow group relative flex min-h-28 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-cyan/40 hover:bg-cyan/10">
                  <img src={partner.icon} alt={`${partner.name} logo`} className="max-h-12 max-w-[180px] object-contain opacity-60 grayscale transition duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0" draggable={false} />
                  <span className="pointer-events-none absolute inset-x-4 bottom-4 translate-y-2 rounded-2xl border border-white/10 bg-black/55 px-3 py-2 text-center text-xs font-black text-slate-200 opacity-0 backdrop-blur-xl transition group-hover:translate-y-0 group-hover:opacity-100">
                    {partner.name} · {partner.category}
                  </span>
                </a>
              ))}
            </div>
          </GlassCard>
        </section>

        <section id="community" className="website-section community-section py-12">
          <ScenePanel scene="community">
            <div className="relative grid items-center gap-10 xl:grid-cols-[0.82fr_1.18fr]">
              <div className="relative z-20">
                <h2 className="website-section-title nex-title">Join the global NEXNS community.</h2>
                <p className="website-section-copy mt-5 max-w-2xl text-slate-300">
                  NEXNS grows through creators, builders, communities, and market participants moving through the same intelligent growth loop.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <a href="#footer" className="purple-button interactive-glow rounded-2xl px-6 py-4 text-sm font-black">
                    Join Community
                  </a>
                  <Link to="/investor" className="interactive-glow rounded-2xl border border-white/15 bg-white/5 px-6 py-4 text-sm font-black">
                    Investor Center
                  </Link>
                </div>
              </div>
              <div className="community-constellation relative z-20 min-h-[360px]">
                <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20 bg-cyan/10 blur-sm" />
                <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon/25 bg-neon/10" />
                <div className="absolute left-1/2 top-1/2 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
                <div className="absolute left-1/2 top-1/2 h-full w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-neon/30 to-transparent" />
                <div className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {communityChannels.map((channel) => (
                    <a key={channel.label} href={channel.href} target="_blank" rel="noreferrer" title={channel.label} className="community-node scene-chip interactive-glow flex items-center gap-4 p-5">
                      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/8 p-3">
                        <img src={channel.icon} alt={`${channel.label} icon`} className="h-full w-full object-contain" draggable={false} />
                      </span>
                      <span>
                        <span className="block nex-title text-lg">{channel.label}</span>
                        <span className="mt-1 block text-sm font-bold text-mint">{channel.metric}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScenePanel>
        </section>

        <section className="website-section final-cta-section py-12">
          <div className="relative overflow-hidden rounded-[36px] border border-neon/30 bg-gradient-to-br from-neon/24 via-blue/18 to-cyan/12 p-8 shadow-hero md:p-12">
            <div className="absolute bottom-0 right-8 hidden w-64 opacity-70 lg:block">
              <Mascot variant="master" />
            </div>
            <div className="relative z-20 max-w-3xl">
              <h2 className="website-section-title nex-title">Ready to Join the NEXNS Network?</h2>
              <p className="website-section-copy mt-5 max-w-2xl text-slate-200">
                Join the next generation of AI-native prediction growth infrastructure.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/app" className="purple-button interactive-glow rounded-2xl px-7 py-4 text-base font-black">
                  Launch App
                </Link>
                <Link to="/investor" className="interactive-glow rounded-2xl border border-white/15 bg-white/5 px-7 py-4 text-base font-black">
                  Investor Center
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer id="footer" className="border-t border-white/10 py-10 text-slate-400">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_2.8fr]">
            <div>
              <WebsiteLogo compact />
              <p className="mt-4 max-w-sm text-sm leading-6">NEXNS turns prediction attention into creator influence, project growth, and companion-driven retention.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
              {footerColumns.map((column) => (
                <FooterColumn key={column.title} {...column} />
              ))}
            </div>
          </div>
          <div className="mt-8 text-sm">(c) 2026 NEXNS. All rights reserved.</div>
        </footer>
      </main>
    </div>
  );
}

function NavLink({ item, isActive }: { item: (typeof nav)[number]; isActive: boolean }) {
  const className =
    item.label === "Launch App"
      ? "purple-button interactive-glow rounded-xl px-4 py-3 text-sm font-semibold"
      : `pb-2 ${isActive ? "border-b-2 border-neon text-white" : "text-slate-300 hover:text-white"}`;

  if (item.href.startsWith("/")) {
    return (
      <Link className={className} to={item.href}>
        {item.label}
      </Link>
    );
  }

  return (
    <a className={className} href={item.href}>
      {item.label}
    </a>
  );
}

function SectionHeader({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="website-section-title nex-title">{title}</h2>
      <p className="website-section-copy mt-4 text-slate-300">{copy}</p>
    </div>
  );
}

function WebsiteLogo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <img src={nexLogoWhite} alt="NEXNS logo" className={compact ? "h-8 w-auto object-contain" : "h-10 w-auto object-contain"} draggable={false} />
      <span className={compact ? "text-xl font-black tracking-wide text-white" : "text-2xl font-black tracking-wide text-white"}>NEXNS</span>
    </span>
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
    <div className="flywheel-node scene-node interactive-glow flex items-center gap-4 p-4">
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

function ValueOrbitLabel({ label, index, active }: { label: string; index: number; active: boolean }) {
  const angle = index * 60 - 90;
  const labelStyle = {
    "--angle": `${angle}deg`,
    "--counter-angle": `${-angle}deg`,
    "--orbit-radius": "198px",
  } as CSSProperties;

  return (
    <div className="value-orbit-label-shell" style={labelStyle}>
      <span className={`value-orbit-label ${active ? "is-active" : ""}`}>{label}</span>
    </div>
  );
}

function ValueFlowLabel({ label, index, active }: { label: string; index: number; active: boolean }) {
  const angle = index * 51 - 65;
  const labelStyle = {
    "--angle": `${angle}deg`,
    "--counter-angle": `${-angle}deg`,
    "--orbit-radius": "300px",
    "--label-delay": `${index * -1.1}s`,
  } as CSSProperties;

  return (
    <div className="value-flow-label-shell" style={labelStyle}>
      <span className={`value-flow-label ${active ? "is-active" : ""}`}>{label}</span>
    </div>
  );
}

function ValueFlowNode({
  step,
  index,
  active,
  onHover,
  onClick,
}: {
  step: (typeof flywheelSteps)[number];
  index: number;
  active: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  const Icon = step.icon;
  const angle = index * 60 - 90;
  const nodeStyle = {
    "--angle": `${angle}deg`,
    "--counter-angle": `${-angle}deg`,
    "--orbit-radius": "245px",
    "--orbit-delay": `${index * -8.5}s`,
  } as CSSProperties;

  return (
    <div className="value-flow-node-shell" style={nodeStyle}>
      <button
        type="button"
        onMouseEnter={onHover}
        onClick={onClick}
        className={`value-flow-node rounded-3xl border p-4 text-left transition ${
          active ? "is-active border-cyan/60 bg-cyan/12 shadow-cyan" : "border-white/10 bg-black/48 hover:border-neon/45 hover:bg-neon/10"
        }`}
      >
        <span className="flex items-start gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan/25 bg-cyan/10 text-sm font-black text-cyan">
            {index + 1}
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-2 text-base font-black text-white">
              <Icon className="h-4 w-4 shrink-0 text-cyan" />
              {step.title}
            </span>
            <span className="mt-2 block text-xs font-black uppercase tracking-[0.14em] text-cyan">{step.orbit}</span>
          </span>
        </span>
      </button>
    </div>
  );
}

function RoadmapList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan">{title}</div>
      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan shadow-cyan" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScenePanel({ scene, children }: { scene: "companion" | "community" | "team"; children: ReactNode }) {
  const sceneClass = {
    companion: "from-neon/18 via-blue/10 to-black/20",
    community: "from-cyan/10 via-neon/10 to-black/20",
    team: "from-neon/10 via-blue/10 to-black/20",
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

function CoreTeamCard({
  name,
  role,
  image,
  responsibility,
  strategicFocus,
}: {
  name: string;
  role: string;
  image: string;
  responsibility: string;
  strategicFocus: string;
}) {
  return (
    <details className="group scene-chip interactive-glow h-full overflow-hidden p-5">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center gap-4">
          <img src={image} alt={name} className="h-20 w-20 rounded-2xl border border-cyan/25 object-cover shadow-cyan" draggable={false} />
          <div>
            <h3 className="nex-title text-xl">{name}</h3>
            <p className="mt-1 text-sm font-bold text-purple-200">{role}</p>
          </div>
        </div>
        <p className="website-card-copy mt-4 text-slate-400">{responsibility}</p>
        <div className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-cyan group-open:hidden">View focus</div>
      </summary>
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-slate-300">
        <b className="text-white">Responsibility:</b> {responsibility}
      </div>
      <div className="mt-3 rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm leading-6 text-slate-200">
        <b className="text-cyan">Strategic Focus:</b> {strategicFocus}
      </div>
    </details>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm">
        {links.map((link) =>
          link.external ? (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-white">
              {link.label}
            </a>
          ) : link.href.startsWith("/") ? (
            <Link key={link.label} to={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ) : (
            <a key={link.label} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ),
        )}
      </div>
    </div>
  );
}
