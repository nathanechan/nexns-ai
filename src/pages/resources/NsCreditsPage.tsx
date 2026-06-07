import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BadgeCheck, CircleDot, Repeat2, Route, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { WebsiteHeader } from "../../components/website/WebsiteHeader";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

const participationFlow = ["Join", "Predict", "Contribute", "Earn Credits", "Unlock Utility", "Strengthen Growth"];

const contributionLayers = [
  {
    title: "Prediction Activity",
    copy: "Users contribute market expectations, directional conviction, and signal activity across prediction environments.",
  },
  {
    title: "Creator Distribution",
    copy: "Creators transform signals into explanations, narratives, community attention, and repeat participation.",
  },
  {
    title: "Project Support",
    copy: "Projects activate campaigns, invite communities, and create new participation surfaces inside the network.",
  },
  {
    title: "Community Operations",
    copy: "Communities support retention, moderation, discovery, education, and contribution pathways.",
  },
];

const utilityItems = [
  "Daily participation",
  "Growth tasks",
  "Reward eligibility",
  "Failure recovery",
  "Progression systems",
  "Companion activity",
  "Community contribution",
  "Campaign access",
];

const relationshipRows = [
  ["NEX", "Economic Layer", "Captures long-term network value.", "Coordinates ownership."],
  ["NS", "Participation Layer", "Creates day-to-day network activity.", "Coordinates contribution."],
];

function FlowPath({ steps }: { steps: string[] }) {
  return (
    <div className="rounded-[32px] border border-cyan-300/16 bg-cyan-300/[0.035] p-5 sm:p-7">
      <div className="grid gap-3 md:grid-cols-[repeat(6,minmax(0,1fr))]">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 md:block">
            <div className="rounded-2xl border border-white/10 bg-black/34 px-4 py-5 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm font-black leading-5 text-white">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowDown className="h-5 w-5 shrink-0 text-cyan-200/70 md:mx-auto md:my-3 md:rotate-[-90deg]" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

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
      <div className="mb-10 max-w-[780px]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{eyebrow}</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export function NsCreditsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <WebsiteHeader />

      <main className="overflow-hidden">
        <section className="relative px-5 pb-20 pt-32 sm:px-8 lg:px-14 lg:pb-28 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(0,240,255,0.10),transparent_30%),radial-gradient(circle_at_16%_70%,rgba(138,43,226,0.12),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-[1240px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <img src={nexLogoWhite} alt="NEXNS" className="h-5 w-auto" draggable={false} />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/72">
                Participation Framework
              </span>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">NS Credits</p>
                <h1 className="mt-5 text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
                  NS Credits
                </h1>
                <p className="mt-7 max-w-[760px] text-3xl font-black leading-tight text-white sm:text-5xl">
                  The Participation Layer of a Global Prediction Growth Infrastructure
                </p>
                <p className="mt-7 max-w-[760px] text-xl leading-9 text-white/72">
                  NS is not a token, governance asset, or investment asset. NS powers day-to-day activity across NEXNS:
                  participation, contribution, rewards, progression, recovery, and network engagement.
                </p>
              </div>

              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  {relationshipRows.map(([name, layer, functionText, role]) => (
                    <div key={name} className="rounded-[28px] border border-white/10 bg-black/28 p-6">
                      <p className="text-4xl font-black text-white">{name}</p>
                      <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-cyan-200">{layer}</p>
                      <p className="mt-5 text-base leading-7 text-white/72">{functionText}</p>
                      <p className="mt-3 text-base leading-7 text-white/72">{role}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-[1120px]">
            <SectionShell id="what-is-ns" eyebrow="01" title="What is NS">
              <div className="max-w-[840px] space-y-5 text-[17px] leading-[1.85] text-white/82">
                <p>
                  NS is the participation credit layer of Global Prediction Growth Infrastructure. It is designed to
                  measure, activate, and reinforce useful participation across prediction activity, creator engagement,
                  project campaigns, and community contribution.
                </p>
                <p>
                  NEX captures long-term network value. NS powers daily network activity. The two layers serve different
                  purposes and should not be understood as interchangeable.
                </p>
              </div>
            </SectionShell>

            <SectionShell id="why-participation-matters" eyebrow="02" title="Why Participation Matters">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Users className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-8 text-white">
                    Prediction networks become stronger when participation becomes repeatable, measurable, and useful.
                  </p>
                </div>
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/82">
                  <p>
                    Every prediction, contribution, creator signal, community action, and project interaction can create
                    activity inside the network. NS exists to coordinate this activity without presenting participation as
                    ownership or speculation.
                  </p>
                  <p>
                    A participation layer helps users return, learn, recover from failed actions, build reputation, and
                    continue contributing to the growth of the network.
                  </p>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="participation-model" eyebrow="03" title="NS Participation Model">
              <FlowPath steps={participationFlow} />
            </SectionShell>

            <SectionShell id="contribution-framework" eyebrow="04" title="Contribution Framework">
              <div className="grid gap-4 sm:grid-cols-2">
                {contributionLayers.map((item) => (
                  <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                    <CircleDot className="h-6 w-6 text-cyan-200" />
                    <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                    <p className="mt-3 text-base leading-8 text-white/72">{item.copy}</p>
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell id="growth-rewards" eyebrow="05" title="Growth Rewards">
              <div className="rounded-[34px] border border-violet-300/18 bg-violet-300/[0.055] p-7 sm:p-9">
                <Repeat2 className="h-8 w-8 text-violet-100" />
                <p className="mt-5 max-w-[820px] text-xl font-black leading-9 text-white">
                  NS rewards contribution by reinforcing activity, progress, and return behavior. It is designed to make
                  network participation more legible, not to represent investment value.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {["Activity", "Progress", "Retention", "Contribution", "Recovery", "Access"].map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-black/24 px-4 py-4 text-sm font-black text-white">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </SectionShell>

            <SectionShell id="utility-framework" eyebrow="06" title="Utility Framework">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {utilityItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                    <BadgeCheck className="h-5 w-5 text-cyan-200" />
                    <p className="mt-4 text-sm font-black leading-5 text-white">{item}</p>
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell id="nex-and-ns" eyebrow="07" title="Relationship Between NEX and NS">
              <div className="grid gap-5 lg:grid-cols-2">
                {relationshipRows.map(([name, layer, functionText, role]) => (
                  <div key={name} className="rounded-[32px] border border-white/10 bg-white/[0.035] p-7">
                    <ShieldCheck className="h-7 w-7 text-cyan-200" />
                    <p className="mt-5 text-5xl font-black text-white">{name}</p>
                    <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-cyan-200">{layer}</p>
                    <p className="mt-6 text-lg leading-8 text-white/76">{functionText}</p>
                    <p className="mt-3 text-lg leading-8 text-white/76">{role}</p>
                  </div>
                ))}
              </div>
            </SectionShell>

            <SectionShell id="future-participation-economy" eyebrow="08" title="Future Participation Economy">
              <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Route className="h-8 w-8 text-violet-100" />
                  <p className="mt-5 text-xl font-black leading-8 text-white">
                    A prediction network needs both long-term economic alignment and everyday participation flow.
                  </p>
                </div>
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/82">
                  <p>
                    As prediction networks expand, participation becomes a foundational resource. Users will not only
                    consume markets; they will contribute signals, support creators, activate projects, join communities,
                    train companions, and strengthen network intelligence.
                  </p>
                  <p>
                    NS exists for that future participation economy. It coordinates contribution, while NEX coordinates
                    long-term value.
                  </p>
                  <div className="pt-4">
                    <Link to="/resources/nex" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-bold text-white transition-colors hover:border-cyan-300/30 hover:bg-cyan-300/[0.08]">
                      Read NEX Economic Architecture <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </SectionShell>
          </div>
        </section>
      </main>
    </div>
  );
}
