import type { ReactNode } from "react";
import {
  ArrowRight,
  Brain,
  CircuitBoard,
  Compass,
  Globe2,
  Landmark,
  Layers3,
  type LucideIcon,
  Network,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { WebsiteHeader } from "../../components/website/WebsiteHeader";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";
import ethanCole from "../../assets/team/ethan-cole.png";
import sophiaGrant from "../../assets/team/sophia-grant.png";
import marcusLin from "../../assets/team/marcus-lin.png";
import oliviaBrooks from "../../assets/team/olivia-brooks.png";
import danielRoss from "../../assets/team/daniel-ross.png";
import victoriaReed from "../../assets/team/victoria-reed.png";

const leadership = [
  {
    name: "Ethan Cole",
    role: "Founder",
    image: ethanCole,
    bio: "Leads the long-term mission of NEXNS and the development of prediction economies as coordination infrastructure.",
    responsibility: "Vision, strategy, ecosystem alignment",
  },
  {
    name: "Sophia Grant",
    role: "Strategy",
    image: sophiaGrant,
    bio: "Shapes the institutional narrative, market structure, and strategic direction of the NEXNS network.",
    responsibility: "Corporate strategy, network positioning",
  },
  {
    name: "Victoria Reed",
    role: "Operations",
    image: victoriaReed,
    bio: "Coordinates operational systems, execution cadence, contributor workflows, and global readiness.",
    responsibility: "Operations, execution, governance process",
  },
  {
    name: "Daniel Ross",
    role: "Technology",
    image: danielRoss,
    bio: "Guides platform infrastructure, protocol architecture, security posture, and developer ecosystem standards.",
    responsibility: "Infrastructure, protocol systems, security",
  },
  {
    name: "Marcus Lin",
    role: "Product",
    image: marcusLin,
    bio: "Translates prediction network logic into usable product systems for users, creators, projects, and communities.",
    responsibility: "Product architecture, platform experience",
  },
  {
    name: "Olivia Brooks",
    role: "Research",
    image: oliviaBrooks,
    bio: "Develops research frameworks across prediction systems, AI coordination, network economics, and governance design.",
    responsibility: "Research, economics, AI systems",
  },
];

const researchTracks: Array<[string, string]> = [
  ["Economic Design", "Coordination assets, participation credits, value accrual, and treasury logic."],
  ["Network Research", "Signal systems, network effects, contribution loops, and ecosystem scaling."],
  ["Governance Research", "Progressive decentralization, risk control, stewardship, and community participation."],
  ["Prediction Systems", "Market signal design, forecasting logic, information aggregation, and outcome coordination."],
  ["AI Systems", "Companion intelligence, retention guidance, user progression, and agent-assisted participation."],
];

const technologyTracks: Array<[string, string]> = [
  ["Platform Architecture", "Core platform systems, routing, interaction layers, and modular growth infrastructure."],
  ["AI Infrastructure", "Companion frameworks, activity guidance, recommendation systems, and retention intelligence."],
  ["Blockchain Infrastructure", "Protocol interoperability, on-chain readiness, asset standards, and settlement pathways."],
  ["Security", "Risk boundaries, safeguard design, monitoring, audit readiness, and responsible expansion."],
  ["Developer Ecosystem", "SDK direction, documentation standards, API surfaces, and future integration pathways."],
];

const ecosystemTracks: Array<[string, string]> = [
  ["Community Growth", "Participation loops, social activation, retention, and contributor onboarding."],
  ["Partnership Development", "Infrastructure relationships, ecosystem channels, and institutional collaboration readiness."],
  ["Ambassador Programs", "Regional contribution paths, local coordination, and community representation."],
  ["Regional Operations", "Market-specific execution, ecosystem education, and local network formation."],
  ["Creator Ecosystem", "Creator discovery, influence loops, campaign activation, and creator-led network growth."],
];

const contributorRegions: Array<[string, string]> = [
  ["North America", "Researchers, infrastructure builders, ecosystem strategists"],
  ["Europe", "Governance contributors, security reviewers, protocol researchers"],
  ["Asia Pacific", "Community operators, creator ecosystem leads, regional growth teams"],
  ["Middle East", "Strategic operators, institutional access, partnership development"],
  ["Latin America", "Community builders, education contributors, local network operators"],
  ["Africa", "Emerging market contributors, ecosystem educators, regional ambassadors"],
];

const advisorGroups: Array<[string, string]> = [
  ["Industry Advisors", "Prediction markets, financial infrastructure, creator economy, and market design."],
  ["Technology Advisors", "AI systems, blockchain infrastructure, security, developer tooling, and platform architecture."],
  ["Research Advisors", "Network economics, governance systems, collective intelligence, and coordination theory."],
  ["Ecosystem Advisors", "Community operations, project growth, global partnerships, and institutional adoption."],
];

function SectionShell({
  id,
  label,
  title,
  description,
  children,
}: {
  id: string;
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-white/10 py-24 last:border-b-0">
      <div className="mb-10 max-w-[860px]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{label}</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
        {description && <p className="mt-5 text-xl leading-9 text-white/72">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function CapabilityGrid({
  icon: Icon,
  items,
}: {
  icon: LucideIcon;
  items: Array<[string, string]>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(([title, copy]) => (
        <div key={title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
          <Icon className="h-6 w-6 text-cyan-200" />
          <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
          <p className="mt-3 text-base leading-8 text-white/72">{copy}</p>
        </div>
      ))}
    </div>
  );
}

export function LeadershipContributorsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <WebsiteHeader />

      <main className="overflow-hidden">
        <section className="relative px-5 pb-20 pt-32 sm:px-8 lg:px-14 lg:pb-28 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(0,240,255,0.10),transparent_30%),radial-gradient(circle_at_12%_70%,rgba(138,43,226,0.13),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-[1240px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <img src={nexLogoWhite} alt="NEXNS" className="h-5 w-auto" draggable={false} />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/72">
                Institutional Credibility
              </span>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">
                  Leadership & Contributors
                </p>
                <h1 className="mt-5 text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
                  Leadership & Contributors
                </h1>
                <p className="mt-7 max-w-[760px] text-3xl font-black leading-tight text-white sm:text-5xl">
                  Building the Future of Prediction Economies
                </p>
                <p className="mt-7 max-w-[800px] text-xl leading-9 text-white/72">
                  NEXNS is developed through the contributions of builders, researchers, operators, strategists, and
                  ecosystem participants working toward the evolution of prediction networks.
                </p>
                <Link
                  to="/company/about"
                  className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/[0.08]"
                >
                  About NEXNS <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Research", "Prediction systems and network economics"],
                    ["Execution", "Product, operations, and infrastructure"],
                    ["Governance", "Treasury, risk, and progressive decentralization"],
                    ["Ecosystem", "Community, creators, projects, contributors"],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-black/24 p-5">
                      <p className="text-lg font-black text-white">{title}</p>
                      <p className="mt-3 text-sm leading-6 text-white/66">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-[1180px]">
            <SectionShell
              id="leadership-philosophy"
              label="01"
              title="Leadership Philosophy"
              description="The strongest networks are not built by individuals. They are built by aligned contributors."
            >
              <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Network className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    Long-term success emerges through collaboration between researchers, builders, communities, and
                    ecosystem participants.
                  </p>
                </div>
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/82">
                  <p>
                    NEXNS is organized around contributor alignment rather than personality-centered leadership. The
                    network requires research capability, infrastructure discipline, operational execution, and community
                    participation working together.
                  </p>
                  <p>
                    Leadership exists to coordinate the mission, steward resources, reduce fragmentation, and maintain
                    the long-term integrity of the prediction economy.
                  </p>
                </div>
              </div>
            </SectionShell>

            <SectionShell
              id="founding-vision"
              label="02"
              title="Founding Vision"
              description="NEXNS exists to make prediction-driven coordination a global infrastructure layer."
            >
              <div className="rounded-[34px] border border-cyan-300/16 bg-cyan-300/[0.035] p-7 sm:p-9">
                <Compass className="h-8 w-8 text-cyan-200" />
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                  {[
                    ["Why NEXNS exists", "To coordinate prediction signals, creator influence, project activation, and community participation into one network."],
                    ["Why prediction economies matter", "Prediction transforms uncertainty into signals that can guide capital, attention, product direction, and collective action."],
                    ["Why collective intelligence matters", "No single participant understands the future alone. Networks become stronger when diverse expectations are coordinated."],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-black/26 p-5">
                      <h3 className="text-lg font-black text-white">{title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/70">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionShell>

            <SectionShell
              id="core-leadership"
              label="03"
              title="Core Leadership"
              description="A focused leadership system across vision, strategy, operations, technology, product, and research."
            >
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {leadership.map((person) => (
                  <article key={person.name} className="rounded-[30px] border border-white/10 bg-white/[0.035] p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={person.image}
                        alt={person.name}
                        className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
                        draggable={false}
                      />
                      <div>
                        <h3 className="text-xl font-black text-white">{person.name}</h3>
                        <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-200">{person.role}</p>
                      </div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-white/72">{person.bio}</p>
                    <div className="mt-5 rounded-2xl border border-white/8 bg-black/22 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/42">Responsibility</p>
                      <p className="mt-2 text-sm font-bold leading-6 text-white">{person.responsibility}</p>
                    </div>
                    <a
                      href="#"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/58 transition-colors hover:text-white"
                    >
                      LinkedIn <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                ))}
              </div>
            </SectionShell>

            <SectionShell
              id="research-economics"
              label="04"
              title="Research & Economics"
              description="Economic, governance, AI, and prediction-system research define the intellectual foundation of the network."
            >
              <CapabilityGrid icon={Brain} items={researchTracks} />
            </SectionShell>

            <SectionShell
              id="technology-infrastructure"
              label="05"
              title="Technology & Infrastructure"
              description="NEXNS requires platform architecture, AI infrastructure, blockchain readiness, security, and developer systems."
            >
              <CapabilityGrid icon={CircuitBoard} items={technologyTracks} />
            </SectionShell>

            <SectionShell
              id="community-ecosystem"
              label="06"
              title="Community & Ecosystem"
              description="Community participation is treated as infrastructure, not marketing."
            >
              <CapabilityGrid icon={Users} items={ecosystemTracks} />
            </SectionShell>

            <SectionShell
              id="global-contributors"
              label="07"
              title="Global Contributors"
              description="NEXNS operates through a global contributor network across research, building, operations, and community coordination."
            >
              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
                <Globe2 className="h-8 w-8 text-cyan-200" />
                <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {contributorRegions.map(([region, copy]) => (
                    <div key={region} className="rounded-2xl border border-white/10 bg-black/24 p-5">
                      <h3 className="text-lg font-black text-white">{region}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/70">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionShell>

            <SectionShell
              id="advisory-network"
              label="08"
              title="Advisory Network"
              description="Advisory support is organized by institutional capability, not celebrity visibility."
            >
              <div className="grid gap-4 md:grid-cols-2">
                {advisorGroups.map(([title, copy]) => (
                  <div key={title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                    <Landmark className="h-6 w-6 text-violet-100" />
                    <h3 className="mt-5 text-xl font-black text-white">{title}</h3>
                    <p className="mt-3 text-base leading-8 text-white/72">{copy}</p>
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell id="join-mission" label="09" title="Join the Mission">
              <div className="rounded-[34px] border border-violet-300/18 bg-violet-300/[0.055] p-7 sm:p-10">
                <Layers3 className="h-8 w-8 text-violet-100" />
                <p className="mt-6 max-w-[820px] text-2xl font-black leading-10 text-white">
                  The future of prediction economies will not be built by a single company.
                </p>
                <p className="mt-4 max-w-[820px] text-xl leading-9 text-white/72">
                  It will be built by a global network of contributors. Join NEXNS.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="mailto:contributors@nexns.network" className="nex-primary-button">
                    Become a Contributor
                  </a>
                  <Link to="/#community" className="nex-secondary-button">
                    Join Community
                  </Link>
                  <a href="mailto:contact@nexns.network" className="nex-secondary-button">
                    Contact Us
                  </a>
                </div>
              </div>
            </SectionShell>
          </div>
        </section>
      </main>
    </div>
  );
}
