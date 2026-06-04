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
  { title: "Predictive Signals", copy: "Prediction activity produces structured demand data and market intent.", icon: Network },
  { title: "Creator Engagement", copy: "Creators convert signal data into distribution, analysis, and audience participation.", icon: Sparkles },
  { title: "Project Cycles", copy: "Projects use creator-led engagement to initiate campaigns, tasks, and launch activity.", icon: Users },
  { title: "Network Value", copy: "Project activity and platform usage create auditable value events for the protocol.", icon: BarChart3 },
  { title: "Treasury Alignment", copy: "Captured value supports treasury reserves, rewards, and NEX economic alignment.", icon: CircleDollarSign },
  { title: "Retention Loop", copy: "Rewards, reputation, and AI guidance return participants to the next prediction cycle.", icon: Orbit },
] satisfies { title: string; copy: string; icon: LucideIcon }[];

const roadmap = [
  {
    period: "2026 Q3 - Q4",
    title: "High-Performance Infrastructure",
    objective: "Extreme speed and liquidity initialization",
    items: [
      "Deploy core Solana prediction contracts with Anchor, using parallel execution to support real-time settlement.",
      "Integrate the 25/200 mechanism and optimize risk hedging around Solana transaction confirmation behavior.",
      "Connect deeply with Pyth Network price feeds for fast, accurate, and verifiable market resolution.",
      "Run Devnet and Mainnet stress tests with high-frequency simulated prediction activity.",
    ],
  },
  {
    period: "2027 Q1",
    title: "Liquidity Engine & Ecosystem Incentives",
    objective: "Build deep market liquidity across Solana prediction markets",
    items: [
      "Launch CLMM-based Liquidity Vaults to improve capital efficiency and reduce participant slippage.",
      "Activate liquidity incentives and yield farming to attract market makers and professional liquidity providers.",
      "Introduce the Nexns governance dashboard for market categories, risk parameters, and distribution voting.",
      "Support SPL tokens as collateral and connect with leading Solana derivatives for cross-asset coordination.",
    ],
  },
  {
    period: "2027 Q2 - Q3",
    title: "Product Depth & Ecosystem Composability",
    objective: "Establish the protocol moat through tooling, integrations, and security",
    items: [
      "Release an advanced prediction dashboard with real-time charts, open-position monitoring, and hedge controls.",
      "Open the prediction SDK so third-party DApps can embed Nexns prediction functionality into their own UI.",
      "Complete institutional-grade security audits to improve confidence for professional and institutional users.",
      "Support cross-chain liquidity inflow through protocols such as Wormhole while remaining Solana-native.",
    ],
  },
  {
    period: "2027 Q4",
    title: "Protocol Commercialization & Global Growth",
    objective: "Become the liquidity hub for prediction markets on Solana",
    items: [
      "Build prediction index assets and automated strategy products from Nexns market data.",
      "Host Nexns developer hackathons to incubate derivatives, hedge tools, and prediction analytics platforms.",
      "Activate protocol buyback and burn mechanics using market fees to align protocol value with holders.",
      "Expand the Nexns model into insurance, DePIN asset protection, and real-world event prediction.",
    ],
  },
] satisfies { period: string; title: string; objective: string; items: string[] }[];

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

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Growth Flywheel", href: "#network" },
      { label: "Network Architecture", href: "#architecture" },
      { label: "Prediction Market", href: "/prediction" },
      { label: "Creator Arena", href: "/creator" },
      { label: "Project Hub", href: "/projects" },
      { label: "NEX Companion", href: "/companion" },
    ],
  },
  {
    title: "Economy",
    links: [
      { label: "Value Layer", href: "#ecosystem" },
      { label: "NEX Token", href: "#ecosystem" },
      { label: "NS Points", href: "#ecosystem" },
      { label: "Buyback & Burn", href: "#ecosystem" },
      { label: "DAO Treasury", href: "#governance" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Investor Center", href: "/investor" },
      { label: "Investor Presentation", href: "/presentation" },
      { label: "Investor One Pager", href: "/investor/one-page" },
      { label: "Protocol Metrics", href: "#ecosystem" },
      { label: "Technology Ecosystem", href: "#insights" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About NEXNS", href: "#home" },
      { label: "Vision", href: "#home" },
      { label: "Core Team", href: "#governance" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Partners", href: "#insights" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "X", href: "https://x.com/nexns", external: true },
      { label: "Discord", href: "https://discord.gg/nexns", external: true },
      { label: "GitHub", href: "https://github.com/nexns", external: true },
      { label: "Telegram", href: "https://t.me/nexns", external: true },
      { label: "YouTube", href: "https://youtube.com/@nexns", external: true },
      { label: "Reddit", href: "https://reddit.com/r/nexns", external: true },
      { label: "CoinMarketCap", href: "https://coinmarketcap.com", external: true },
      { label: "Instagram", href: "https://instagram.com/nexns", external: true },
      { label: "TikTok", href: "https://tiktok.com/@nexns", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/investor" },
      { label: "Privacy Policy", href: "/investor" },
      { label: "Risk Disclosure", href: "/investor" },
      { label: "Compliance", href: "/investor/one-page" },
    ],
  },
];

export function LandingPage() {
  const [companionOpen, setCompanionOpen] = useState(false);
  const [focusPillar, setFocusPillar] = useState<(typeof ecosystemPillars)[number] | null>(null);

  return (
    <div className="nex-website min-h-screen bg-black text-white">
      <WebsiteHeader />
      <main className="snap-y snap-mandatory">
        <section id="home" className="relative flex min-h-screen w-full snap-start items-center justify-center overflow-hidden pb-10 pt-24 sm:pt-20 lg:h-screen lg:pb-0">
          <KineticNeuralMeshBackground />
          <motion.div
            className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-[1440px] grid-cols-1 items-center px-6 md:px-16 lg:h-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-4xl">
              <h1 className="max-w-5xl text-[3.25rem] font-black leading-[0.92] tracking-[-0.045em] text-white sm:text-6xl md:text-8xl">
                The Unified Growth Network for AI Evolution.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-[1.75] tracking-[0.02em] text-white/82 sm:mt-8 sm:text-lg">
                Converging predictive signals, creator influence, and project retention into a sovereign, auditable protocol environment.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
                <a href="#network" className="nex-primary-button">
                  Explore Network <ArrowRight className="h-4 w-4" />
                </a>
                <Link to="/app" className="nex-secondary-button">
                  Launch App
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        <NarrativeSection
          id="network"
          title="Growth Flywheel"
          description="Predictive signals, creator influence, project activation, and treasury-backed rewards reinforce one continuous network cycle."
        >
          <InteractiveFlywheel />
        </NarrativeSection>

        <NarrativeSection
          id="architecture"
          title="Network Architecture"
          description="NEXNS connects prediction markets, creator distribution, project campaigns, AI companions, and reward systems into one coordinated protocol layer."
        >
          <EcosystemMap onFocus={setFocusPillar} />
        </NarrativeSection>

        <NarrativeSection
          id="ecosystem"
          title="Value & Tokenomics"
          description="NEX captures long-term network value while NS supports daily participation, user progress, and ecosystem activity."
        >
          <Suspense fallback={<DashboardSkeleton />}>
            <FinancialDashboard />
          </Suspense>
        </NarrativeSection>

        <NarrativeSection
          id="roadmap"
          title="Evolution Roadmap"
          description="A disciplined progression from prediction signal infrastructure to creator growth, project activation, and global network governance."
        >
          <RoadmapTimeline />
        </NarrativeSection>

        <NarrativeSection
          id="governance"
          title="Governance & Leadership"
          description="Core contributors align product systems, AI intelligence, decentralized finance engineering, partnerships, and network operations."
        >
          <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="nex-panel p-7">
              <ShieldCheck className="h-9 w-9 text-violet-300" />
              <h3 className="mt-6 text-2xl font-black">Institutional Narrative</h3>
              <p className="mt-5 leading-[1.7] text-white/78">
                Governance is structured around treasury discipline, security review, contribution accountability, and transparent incentive design.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {leadership.map((member) => (
                <div key={member.name} className="nex-panel p-5">
                  <div className="flex items-center gap-4">
                  <img src={member.image} alt={member.name} className="h-16 w-16 rounded-2xl object-cover opacity-85 grayscale" draggable={false} loading="lazy" decoding="async" />
                  <div>
                    <h3 className="font-black">{member.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/68">{member.role}</p>
                  </div>
                  </div>
                  <p className="mt-4 text-sm leading-[1.65] text-white/74">{member.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </NarrativeSection>

        <NarrativeSection
          id="insights"
          title="Partnership & Trust"
          description="Infrastructure references across AI, cloud, security, and Web3 interoperability support the NEXNS network environment."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noreferrer"
                title={partner.name}
                aria-label={`Open ${partner.name} website`}
                className="nex-panel flex min-h-32 items-center justify-center p-7 transition duration-300 hover:border-violet-300/45 hover:shadow-[0_0_28px_rgba(109,40,217,0.22)]"
              >
                <img
                  src={partner.icon}
                  alt={`${partner.name} logo`}
                  className="max-h-12 max-w-[170px] object-contain opacity-70 grayscale invert transition duration-300 hover:scale-[1.04] hover:opacity-100"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ))}
          </div>
        </NarrativeSection>

        <NarrativeSection
          id="community"
          title="Community & Institutional Portal"
          description="Access points for builders, capital partners, community operators, and institutional network participants."
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="nex-panel p-8">
              <Globe2 className="h-10 w-10 text-violet-300" />
              <h3 className="mt-6 text-3xl font-black">Institutional Portal</h3>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/investor" className="nex-primary-button">Investor Center</Link>
                <Link to="/presentation" className="nex-secondary-button">Presentation Mode</Link>
              </div>
            </div>
            <div className="nex-panel grid content-center gap-5 p-8">
              {[
                ["Network", "Active"],
                ["Governance", "Online"],
                ["Institutional Access", "Open"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 border-b border-violet-500/20 pb-4">
                  <span className="block text-sm uppercase tracking-[0.18em] text-white/66">{label}</span>
                  <strong className="font-mono text-xl text-white">{value}</strong>
                </div>
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

  return (
    <div className="nex-panel overflow-hidden p-7" onMouseLeave={() => setActive(0)}>
      <div className="relative mx-auto hidden aspect-square w-full max-w-[620px] sm:block">
        <div className="absolute inset-12 rounded-full border border-violet-500/20" />
        <div className="absolute inset-24 rounded-full border border-violet-500/10" />
        <div className="flywheel-control-path absolute inset-[58px] rounded-full" />
        <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-violet-500/30 bg-black shadow-[0_0_48px_rgba(109,40,217,0.26)]">
          <span className="text-center text-sm font-black uppercase tracking-[0.2em] text-white">NEXNS<br /><span className="text-violet-300">CORE</span></span>
        </div>

        {flywheel.map((node, index) => {
          const Icon = node.icon;
          const angle = (index / flywheel.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 38;
          const y = 50 + Math.sin(angle) * 38;
          const isActive = active === index;

          return (
            <button
              key={node.title}
              type="button"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className={`absolute w-36 -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-4 text-left transition duration-300 ease-in-out ${
                isActive ? "border-violet-400/70 bg-violet-500/12 shadow-[0_0_28px_rgba(109,40,217,0.35)]" : "border-violet-500/20 bg-white/[0.02]"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <Icon className={`h-5 w-5 transition ${isActive ? "text-white" : "text-violet-300"}`} />
              <span className="mt-3 block text-sm font-black">{node.title}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-3 sm:hidden">
        {flywheel.map((node, index) => {
          const Icon = node.icon;
          const isActive = active === index;

          return (
            <button
              key={node.title}
              type="button"
              onClick={() => setActive(index)}
              className={`rounded-2xl border p-4 text-left transition duration-300 ease-in-out ${
                isActive ? "border-violet-400/70 bg-violet-500/12 shadow-[0_0_22px_rgba(109,40,217,0.28)]" : "border-violet-500/20 bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-violet-300"}`} />
                <span className="text-sm font-black">{node.title}</span>
              </div>
            </button>
          );
        })}
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
    <div className="nex-panel relative overflow-hidden p-7">
      <div>
        <div className="relative min-h-[620px] overflow-hidden rounded-[28px] border border-violet-500/20 bg-black/20">
          <canvas ref={canvasRef} className="ecosystem-canvas absolute inset-0 h-full w-full" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 z-20 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-300/35 bg-black/92 text-center shadow-[0_0_70px_rgba(0,240,255,0.16)]">
            <div>
              <div className="px-5 text-base font-black leading-tight tracking-[0.08em] text-white">NEXNS: The Center of Value Creation and Growth.</div>
            </div>
          </div>

          {ecosystemPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            const angle = (index / ecosystemPillars.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 34;
            const y = 50 + Math.sin(angle) * 34;

            return (
              <button
                key={pillar.title}
                type="button"
                onClick={() => onFocus(pillar)}
                className="ecosystem-node absolute z-30 w-[min(220px,48vw)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-violet-500/25 bg-black/82 p-4 text-left backdrop-blur-md transition duration-300 hover:border-cyan-300/45 hover:shadow-[0_0_32px_rgba(0,240,255,0.16)]"
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
          </div>
        ) : null}
      </motion.aside>
    </div>
  );
}

function RoadmapTimeline() {
  return (
    <div className="nex-panel overflow-hidden p-7">
      <div className="relative grid gap-7 lg:grid-cols-4">
        <div className="absolute left-0 top-8 hidden h-px w-full bg-violet-500/15 lg:block" />
        {roadmap.map((item, index) => (
          <motion.div
            key={item.period}
            initial={{ opacity: 0.35, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.65 }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: "easeInOut" }}
            className="relative"
          >
            <div className="relative z-10 flex min-h-16 w-fit min-w-28 items-center justify-center rounded-full border border-violet-400/50 bg-black px-5 text-center text-xs font-black leading-tight text-violet-100 shadow-[0_0_24px_rgba(109,40,217,0.28)]">
              {item.period}
            </div>
            <h3 className="mt-7 text-2xl font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm font-semibold leading-[1.7] text-white/78">{item.objective}</p>
            <div className="mt-5 grid gap-3">
              {item.items.map((task) => (
                <div key={task} className="rounded-2xl border border-violet-500/20 bg-white/[0.025] p-4 text-sm leading-[1.7] text-white/82">
                  {task}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
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
    const className = "text-[10px] uppercase tracking-[0.16em] text-[#666666] transition hover:text-white";

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
    <footer className="border-t border-violet-500/20 px-6 py-12 md:px-12 xl:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[24%_76%]">
          <div className="min-w-0">
            <a href="#home" className="inline-flex items-center gap-3" aria-label="NEXNS home">
              <img src={nexLogoWhite} alt="" className="h-8 w-auto object-contain" draggable={false} loading="lazy" decoding="async" />
              <span className="text-xl font-black tracking-[0.18em] text-white">NEXNS</span>
            </a>
            <p className="mt-5 max-w-[320px] text-sm leading-[1.7] tracking-[0.02em] text-white/72">
              The unified growth network for predictive signals, creator influence, project retention, and protocol value alignment.
            </p>
          </div>

          <div className="min-w-0">
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xs font-black tracking-[0.08em] text-white">{column.title}</h3>
                  <div className="mt-5 grid gap-3">
                    {column.links.map(renderFooterLink)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
