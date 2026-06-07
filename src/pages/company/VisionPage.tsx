import type { ReactNode } from "react";
import { ArrowRight, Brain, Compass, Globe2, Network, Orbit, Sparkles, Target, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { WebsiteHeader } from "../../components/website/WebsiteHeader";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

const eras = [
  ["Information Networks", "Knowledge became accessible."],
  ["Communication Networks", "People became connected."],
  ["Financial Networks", "Value became programmable."],
  ["Intelligence Networks", "Reasoning became machine-assisted."],
  ["Prediction Networks", "Signals become coordinated action."],
];

const beliefPoints = [
  "Signals are transparent.",
  "Participation is rewarded.",
  "Intelligence is coordinated.",
  "Value is aligned.",
  "Growth is shared.",
];

function SectionShell({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-white/10 py-24 last:border-b-0">
      <div className="mb-10 max-w-[900px]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{label}</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ThesisCard({ icon: Icon, title, copy }: { icon: typeof Compass; title: string; copy: string }) {
  return (
    <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
      <Icon className="h-8 w-8 text-cyan-200" />
      <h3 className="mt-6 text-2xl font-black tracking-tight text-white">{title}</h3>
      <p className="mt-4 text-base leading-8 text-white/76">{copy}</p>
    </div>
  );
}

export function VisionPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <WebsiteHeader />

      <main className="overflow-hidden">
        <section className="relative px-5 pb-20 pt-32 sm:px-8 lg:px-14 lg:pb-28 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(0,240,255,0.10),transparent_30%),radial-gradient(circle_at_18%_72%,rgba(138,43,226,0.13),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-[1240px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <img src={nexLogoWhite} alt="NEXNS" className="h-5 w-auto" draggable={false} />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/72">Company Vision</span>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">Vision</p>
                <h1 className="mt-5 text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
                  Vision
                </h1>
                <p className="mt-7 max-w-[760px] text-3xl font-black leading-tight text-white sm:text-5xl">
                  The Future of Prediction Economies
                </p>
                <p className="mt-7 max-w-[780px] text-xl leading-9 text-white/78">
                  NEXNS is Global Prediction Growth Infrastructure for the next era of intelligence, coordination, AI
                  participation, and economic networks.
                </p>
              </div>

              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="grid gap-4">
                  {["Intelligence", "Coordination", "Prediction", "AI", "Economic Networks"].map((item) => (
                    <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/24 p-5">
                      <p className="text-lg font-black text-white">{item}</p>
                      <ArrowRight className="h-5 w-5 text-cyan-200/70" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-[1120px]">
            <SectionShell id="next-economic-era" label="01" title="The Next Economic Era">
              <div className="grid gap-4 lg:grid-cols-5">
                {eras.map(([title, copy], index) => (
                  <div key={title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-5 text-lg font-black text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/72">{copy}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-[860px] text-xl leading-9 text-white/84">
                Human civilization has evolved through information networks, communication networks, financial networks,
                and intelligence networks. The next stage will be prediction networks.
              </p>
            </SectionShell>

            <SectionShell id="prediction-as-infrastructure" label="02" title="Prediction as Infrastructure">
              <div className="grid gap-5 lg:grid-cols-3">
                <ThesisCard
                  icon={Target}
                  title="Not Gambling"
                  copy="Prediction becomes infrastructure when it organizes intent, uncertainty, and expectation into useful network signals."
                />
                <ThesisCard
                  icon={Network}
                  title="Coordination"
                  copy="Prediction helps societies allocate attention, resources, and action before outcomes become visible."
                />
                <ThesisCard
                  icon={Compass}
                  title="Action"
                  copy="The value of prediction is not the forecast alone. The value is what coordinated networks do with the signal."
                />
              </div>
            </SectionShell>

            <SectionShell id="collective-intelligence" label="03" title="Collective Intelligence">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Users className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    The most valuable intelligence will not come from individuals. It will emerge from networks.
                  </p>
                </div>
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/86">
                  <p>
                    Prediction networks allow many participants to express expectations, test assumptions, identify
                    emerging signals, and coordinate around shared insight.
                  </p>
                  <p>NEXNS is designed to organize collective intelligence into a usable growth infrastructure.</p>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="ai-companions" label="04" title="AI Companions">
              <div className="rounded-[34px] border border-cyan-300/16 bg-cyan-300/[0.035] p-7 sm:p-9">
                <Brain className="h-8 w-8 text-cyan-200" />
                <div className="mt-6 grid gap-5 lg:grid-cols-3">
                  {[
                    ["Interpret Signals", "AI companions help users understand market activity, community behavior, and prediction signals."],
                    ["Coordinate Activity", "AI guidance supports participation, progression, rewards, and long-term engagement."],
                    ["Contribute to Networks", "AI-assisted participation helps users become more consistent contributors to economic networks."],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-2xl border border-white/10 bg-black/24 p-5">
                      <h3 className="text-lg font-black text-white">{title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/72">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionShell>

            <SectionShell id="prediction-economy" label="05" title="The Prediction Economy">
              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 sm:p-9">
                <Orbit className="h-8 w-8 text-violet-100" />
                <div className="mt-8 grid gap-4 md:grid-cols-5">
                  {["Markets", "Creators", "Projects", "Communities", "AI Systems"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/24 p-5 text-center">
                      <p className="text-base font-black text-white">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-8 max-w-[900px] text-xl leading-9 text-white/84">
                  Markets, creators, projects, communities, and AI systems will become connected through
                  prediction-driven coordination.
                </p>
              </div>
            </SectionShell>

            <SectionShell id="global-coordination-layer" label="06" title="Global Coordination Layer">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Globe2 className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    The future requires infrastructure capable of organizing billions of decisions and signals.
                  </p>
                </div>
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/86">
                  <p>
                    As economic activity becomes more networked, coordination will require systems that can identify
                    signals, route attention, support collective action, and align value across participants.
                  </p>
                  <p>NEXNS aims to become that global coordination layer for prediction-driven growth.</p>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="future-we-believe-in" label="07" title="The Future We Believe In">
              <div className="rounded-[34px] border border-violet-300/18 bg-violet-300/[0.055] p-7 sm:p-10">
                <Sparkles className="h-8 w-8 text-violet-100" />
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {beliefPoints.map((point) => (
                    <div key={point} className="rounded-2xl border border-white/10 bg-black/24 p-5">
                      <p className="text-lg font-black leading-7 text-white">{point}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-8 max-w-[860px] text-xl leading-9 text-white/84">
                  NEXNS is built for a future where intelligence is coordinated, participation is meaningful, and
                  growth is aligned across the network.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/#platform" className="nex-primary-button">
                    Explore Platform
                  </Link>
                  <Link to="/app" className="nex-secondary-button">
                    Launch App
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
