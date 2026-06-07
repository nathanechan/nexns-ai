import type { ReactNode } from "react";
import { ArrowRight, Compass, Globe2, Layers3, Network, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { WebsiteHeader } from "../../components/website/WebsiteHeader";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

const predictionFlow = ["Prediction", "Signal", "Insight", "Attention", "Influence", "Growth"];

const coordinationEvolution = [
  ["Internet Era", "Information"],
  ["Social Era", "Attention"],
  ["Creator Era", "Influence"],
  ["AI Era", "Intelligence"],
  ["Prediction Era", "Coordination"],
];

const buildLayers = [
  ["Prediction Layer", "Captures predictive activity and turns future intent into organized network signals.", Target],
  ["Creator Layer", "Distributes signals through interpretation, content, influence, and trusted attention.", Sparkles],
  ["Project Layer", "Activates demand by connecting attention with campaigns, launches, and adoption.", Layers3],
  ["Community Layer", "Reinforces participation, trust, retention, and long-term network activity.", Users],
  ["Governance Layer", "Aligns incentives, risk controls, treasury discipline, and network evolution.", ShieldCheck],
  ["NEX Economic Layer", "Coordinates network value, long-term alignment, and ecosystem reinforcement.", Network],
];

const networkFlow = [
  "Users create predictive activity",
  "Signals emerge",
  "Creators interpret signals",
  "Projects activate demand",
  "Communities reinforce participation",
  "Governance aligns incentives",
  "NEX coordinates value",
];

const principles = [
  ["Signal Before Speculation", "Prediction is treated as a source of meaningful signal, not a speculative endpoint."],
  ["Participation Before Ownership", "Network activity begins with contribution, coordination, and useful participation."],
  ["Value Creation Before Value Capture", "The ecosystem must create durable value before value can be coordinated."],
  ["Coordination Before Extraction", "NEXNS prioritizes aligned growth over short-term extraction from participants."],
  ["Network Growth Before Monetization", "The system is designed to strengthen participation, trust, and distribution first."],
  ["Long-Term Alignment Before Short-Term Incentives", "Economic design should support lasting network integrity and responsible expansion."],
];

function SectionShell({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-white/10 py-24 last:border-b-0">
      <div className="mb-10 max-w-[900px]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{eyebrow}</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function AboutNexnsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <WebsiteHeader />

      <main className="overflow-hidden">
        <section className="relative px-5 pb-20 pt-32 sm:px-8 lg:px-14 lg:pb-28 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(0,240,255,0.10),transparent_30%),radial-gradient(circle_at_16%_70%,rgba(138,43,226,0.12),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-[1240px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <img src={nexLogoWhite} alt="NEXNS" className="h-5 w-auto" draggable={false} />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/72">Company</span>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">About NEXNS</p>
                <h1 className="mt-5 text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
                  About NEXNS
                </h1>
                <p className="mt-7 max-w-[760px] text-3xl font-black leading-tight text-white sm:text-5xl">
                  Building the Infrastructure for Prediction Economies
                </p>
                <p className="mt-7 max-w-[760px] text-xl leading-9 text-white/78">
                  NEXNS transforms predictive signals into coordinated growth by connecting users, creators, projects,
                  communities, AI companions, and network value into a unified ecosystem.
                </p>
              </div>

              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="grid gap-4">
                  {[
                    "NEXNS is not a token project.",
                    "NEXNS is not a meme project.",
                    "NEXNS is not a prediction app.",
                    "NEXNS is not a social network.",
                    "NEXNS is not a creator platform.",
                    "NEXNS is a Global Prediction Growth Infrastructure.",
                  ].map((statement) => (
                    <div key={statement} className="rounded-2xl border border-white/10 bg-black/24 p-5">
                      <p className="text-lg font-black leading-7 text-white">{statement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-[1120px]">
            <SectionShell id="mission" eyebrow="01" title="Why NEXNS Exists">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Compass className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    NEXNS exists to help transform prediction into growth.
                  </p>
                </div>
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/86">
                  <p>The future economy will increasingly depend on collective intelligence.</p>
                  <p>As information becomes abundant, the challenge is no longer access to knowledge.</p>
                  <p>
                    The challenge becomes identifying meaningful signals, coordinating attention, and turning insight
                    into action.
                  </p>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="why-prediction-matters" eyebrow="02" title="Prediction Is the Earliest Signal of Change">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/86">
                  <p>Prediction reveals future intent before outcomes become visible.</p>
                  <p>
                    Every market movement, social trend, technological shift, and economic transition begins as a
                    prediction.
                  </p>
                  <p>NEXNS is designed to capture, organize, distribute, and activate those signals.</p>
                </div>
                <div className="rounded-[34px] border border-cyan-300/16 bg-cyan-300/[0.035] p-6 sm:p-8">
                  <div className="grid gap-3">
                    {predictionFlow.map((item, index) => (
                      <div key={item} className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-200/[0.08] text-xs font-black text-cyan-100">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                        <div className="flex-1 rounded-2xl border border-white/10 bg-black/24 px-5 py-4">
                          <p className="text-lg font-black text-white">{item}</p>
                        </div>
                        {index < predictionFlow.length - 1 ? (
                          <ArrowRight className="hidden h-5 w-5 text-cyan-200/70 sm:block" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="coordination-evolution" eyebrow="03" title="From Information Networks to Prediction Networks">
              <div className="grid gap-4 lg:grid-cols-5">
                {coordinationEvolution.map(([era, stage], index) => (
                  <div key={era} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-5 text-lg font-black text-white">{era}</h3>
                    <p className="mt-3 text-2xl font-black text-white">{stage}</p>
                    {index === coordinationEvolution.length - 1 ? (
                      <p className="mt-5 text-sm leading-7 text-white/72">
                        NEXNS is building the infrastructure layer for the next stage.
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell id="what-nexns-builds" eyebrow="04" title="A Multi-Layer Growth Infrastructure">
              <div className="grid gap-4 sm:grid-cols-2">
                {buildLayers.map(([title, copy, Icon]) => (
                  <div key={String(title)} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                    <Icon className="h-6 w-6 text-cyan-200" />
                    <h3 className="mt-5 text-xl font-black text-white">{String(title)}</h3>
                    <p className="mt-3 text-base leading-8 text-white/76">{String(copy)}</p>
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell id="platform-overview" eyebrow="05" title="How the Network Works">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/86">
                  <p>
                    Users create predictive activity. Signals emerge. Creators interpret signals. Projects activate
                    demand. Communities reinforce participation. Governance aligns incentives. NEX coordinates value.
                  </p>
                  <p>
                    The result is a network architecture where prediction becomes a coordination input and ecosystem
                    growth becomes the output.
                  </p>
                </div>
                <div className="rounded-[34px] border border-violet-300/16 bg-white/[0.035] p-6 sm:p-8">
                  <div className="relative">
                    <div className="absolute left-5 top-8 h-[calc(100%-64px)] w-px bg-gradient-to-b from-cyan-200 via-violet-300 to-cyan-200/20" />
                    <div className="space-y-4">
                      {networkFlow.map((item, index) => (
                        <div key={item} className="relative flex gap-5">
                          <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-200/25 bg-black text-xs font-black text-cyan-100">
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="flex-1 rounded-2xl border border-white/10 bg-black/28 px-5 py-4">
                            <p className="text-base font-black text-white">{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="core-principles" eyebrow="06" title="The Principles Behind NEXNS">
              <div className="grid gap-4 sm:grid-cols-2">
                {principles.map(([title, copy]) => (
                  <div key={title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                    <ShieldCheck className="h-6 w-6 text-cyan-200" />
                    <h3 className="mt-5 text-lg font-black text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/76">{copy}</p>
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell id="global-vision" eyebrow="07" title="Building the Future of Prediction Economies">
              <div className="rounded-[34px] border border-violet-300/18 bg-violet-300/[0.055] p-7 sm:p-9">
                <Globe2 className="h-8 w-8 text-violet-100" />
                <div className="mt-6 max-w-[900px] space-y-5 text-[17px] leading-[1.85] text-white/86">
                  <p>The future will be shaped by billions of decisions, predictions, signals, and coordinated actions.</p>
                  <p>
                    NEXNS aims to become the infrastructure that helps organize and activate that collective
                    intelligence.
                  </p>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="leadership-preview" eyebrow="08" title="Built by Contributors">
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Users className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    NEXNS is developed by researchers, builders, operators, strategists, and ecosystem participants
                    working toward a common mission.
                  </p>
                </div>
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/86">
                  <p>
                    Prediction economies require more than software. They require research, infrastructure, community
                    coordination, and long-term stewardship.
                  </p>
                  <Link
                    to="/company/leadership"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/[0.08]"
                  >
                    Explore Leadership & Contributors <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="join-future" eyebrow="09" title="The Future Is Coordinated">
              <div className="rounded-[34px] border border-cyan-300/16 bg-cyan-300/[0.04] p-7 sm:p-10">
                <Sparkles className="h-8 w-8 text-cyan-200" />
                <div className="mt-6 max-w-[880px] space-y-5 text-[17px] leading-[1.85] text-white/86">
                  <p>Prediction economies will not emerge automatically.</p>
                  <p>They must be built.</p>
                  <p>
                    NEXNS invites builders, researchers, creators, communities, and contributors to participate in
                    shaping the next generation of economic coordination.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/app" className="nex-primary-button">
                    Launch App
                  </Link>
                  <Link to="/#community" className="nex-secondary-button">
                    Join Community
                  </Link>
                  <Link to="/investor" className="nex-secondary-button">
                    Investor Center
                  </Link>
                </div>
              </div>
            </SectionShell>
          </div>
        </section>
      </main>
    </div>
  );
}
