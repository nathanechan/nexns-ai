import type { ReactNode } from "react";
import {
  ArrowDown,
  BadgeCheck,
  Brain,
  CircleDollarSign,
  Compass,
  GitBranch,
  Landmark,
  Layers3,
  Network,
  Quote,
  Repeat2,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { WebsiteHeader } from "../../components/website/WebsiteHeader";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";
import {
  constitutionPrinciples,
  finalVision,
  governanceFramework,
  monetaryFramework,
  nexFinalHero,
  predictionInfrastructure,
  predictionValueChain,
  strategicThesis,
  treasuryFramework,
  valueAccrualFramework,
} from "./nexEconomicContent";

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
      <div className="mb-10 max-w-[860px]">
        <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{eyebrow}</p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function FlowPath({ steps }: { steps: string[] }) {
  return (
    <div className="rounded-[32px] border border-cyan-300/16 bg-cyan-300/[0.035] p-5 sm:p-7">
      <div className="grid gap-3 md:grid-cols-[repeat(7,minmax(0,1fr))]">
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

function HighlightQuote({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[34px] border border-violet-300/18 bg-violet-300/[0.055] p-7 sm:p-9">
      <Quote className="h-8 w-8 text-violet-100" />
      <p className="mt-5 max-w-[820px] text-2xl font-black leading-10 text-white">{children}</p>
    </div>
  );
}

function FrameworkGrid({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
          <BadgeCheck className="h-6 w-6 text-cyan-200" />
          <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
          <p className="mt-3 text-base leading-8 text-white/72">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export function NexValueLayerPage() {
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
                Economic Architecture
              </span>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">
                  {nexFinalHero.sourceTitle}
                </p>
                <h1 className="mt-5 text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
                  {nexFinalHero.title}
                </h1>
                <p className="mt-7 max-w-[760px] text-3xl font-black leading-tight text-white sm:text-5xl">
                  {nexFinalHero.subtitle}
                </p>
                <p className="mt-7 max-w-[760px] text-xl leading-9 text-white/72">
                  NEX provides the formal economic architecture for Global Prediction Growth Infrastructure, shifting
                  the paradigm from speculative guessing to productive infrastructure.
                </p>
              </div>

              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    ["Economic Layer", "Formal architecture for prediction networks."],
                    ["Coordination Asset", "A shared economic language for intelligence coordination."],
                    ["Prediction Standard", "A coordination-based standard for reducing uncertainty."],
                    ["Network Stewardship", "Governance, treasury, and constitutional alignment."],
                  ].map(([title, copy]) => (
                    <div key={title} className="rounded-[28px] border border-white/10 bg-black/28 p-6">
                      <p className="text-lg font-black text-white">{title}</p>
                      <p className="mt-3 text-sm leading-7 text-white/66">{copy}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-[1120px]">
            <SectionShell id="what-is-nex" eyebrow="01" title="What is NEX">
              <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Compass className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    NEX is strategically architected as a coordination asset, not a speculative instrument.
                  </p>
                </div>
                <div className="space-y-5 text-[17px] leading-[1.85] text-white/82">
                  <p>{strategicThesis.body}</p>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="why-prediction-economies-need-nex" eyebrow="02" title="Why Prediction Economies Need NEX">
              <div className="space-y-8">
                <div className="max-w-[840px] space-y-5 text-[17px] leading-[1.85] text-white/82">
                  <p>{predictionInfrastructure.introduction}</p>
                  <p>{predictionInfrastructure.close}</p>
                </div>
                <FrameworkGrid items={predictionInfrastructure.items} />
              </div>
            </SectionShell>

            <SectionShell id="nex-economic-layer" eyebrow="03" title="NEX Economic Layer">
              <div className="space-y-8">
                <HighlightQuote>NEX is the Economic Layer of a Global Prediction Growth Infrastructure.</HighlightQuote>
                <div className="max-w-[840px] space-y-5 text-[17px] leading-[1.85] text-white/82">
                  <p>{monetaryFramework.body}</p>
                  <p>{monetaryFramework.predictionStandard}</p>
                </div>
              </div>
            </SectionShell>

            <SectionShell id="coordination-framework" eyebrow="04" title="Coordination Framework">
              <div className="space-y-8">
                <HighlightQuote>NEX exists to coordinate value creation.</HighlightQuote>
                <FlowPath steps={predictionValueChain.steps} />
                <FrameworkGrid items={predictionValueChain.transitions} />
              </div>
            </SectionShell>

            <SectionShell id="monetary-framework" eyebrow="05" title="Monetary Framework">
              <div className="space-y-8">
                <div className="max-w-[840px] space-y-5 text-[17px] leading-[1.85] text-white/82">
                  <p>{monetaryFramework.title}</p>
                  <p>{predictionValueChain.close}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {monetaryFramework.evolution.map((item) => (
                    <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                      <CircleDollarSign className="h-6 w-6 text-cyan-200" />
                      <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                      <p className="mt-3 text-base leading-8 text-white/72">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionShell>

            <SectionShell id="value-accrual-framework" eyebrow="06" title="Value Accrual Framework">
              <div className="space-y-8">
                <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
                  <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                    <Repeat2 className="h-8 w-8 text-violet-100" />
                    <p className="mt-5 text-xl font-black leading-9 text-white">
                      Value Creation &gt; Value Capture
                    </p>
                  </div>
                  <div className="space-y-5 text-[17px] leading-[1.85] text-white/82">
                    <p>{valueAccrualFramework.body}</p>
                    <p>{valueAccrualFramework.flywheel}</p>
                  </div>
                </div>
                <FrameworkGrid items={valueAccrualFramework.stages} />
              </div>
            </SectionShell>

            <SectionShell id="governance-framework" eyebrow="07" title="Governance Framework">
              <div className="space-y-8">
                <div className="max-w-[840px] space-y-5 text-[17px] leading-[1.85] text-white/82">
                  <p>{governanceFramework.body}</p>
                  <p>{governanceFramework.pyramidIntro}</p>
                </div>
                <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7">
                  <div className="flex items-center gap-3">
                    <Scale className="h-7 w-7 text-cyan-200" />
                    <h3 className="text-xl font-black text-white">{governanceFramework.pyramidTitle}</h3>
                  </div>
                  <div className="mt-7 grid gap-3">
                    {governanceFramework.pyramid.map((layer, index) => (
                      <div key={layer.title} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/24 p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                            Layer {String(index + 1).padStart(2, "0")}
                          </p>
                          <h4 className="mt-2 text-lg font-black text-white">{layer.title}</h4>
                        </div>
                        <p className="max-w-xl text-sm leading-7 text-white/70">{layer.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <FrameworkGrid items={governanceFramework.principles} />
              </div>
            </SectionShell>

            <SectionShell id="treasury-framework" eyebrow="08" title="Treasury Framework">
              <div className="rounded-[34px] border border-violet-300/18 bg-violet-300/[0.055] p-7 sm:p-9">
                <Landmark className="h-8 w-8 text-violet-100" />
                <h3 className="mt-5 text-2xl font-black text-white">The Stewardship Layer</h3>
                <p className="mt-5 max-w-[840px] text-[17px] leading-[1.85] text-white/82">{treasuryFramework.body}</p>
              </div>
            </SectionShell>

            <SectionShell id="network-constitution" eyebrow="09" title="Network Constitution">
              <div className="space-y-8">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <ShieldCheck className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    The following articles represent the non-negotiable legal and economic principles of the NEX network.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {constitutionPrinciples.map((principle) => (
                    <div key={principle.title} className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
                      <Layers3 className="h-6 w-6 text-cyan-200" />
                      <h3 className="mt-5 text-lg font-black text-white">{principle.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/72">{principle.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SectionShell>

            <SectionShell id="future-prediction-economies" eyebrow="10" title="The Future of Prediction Economies">
              <div className="rounded-[34px] border border-cyan-300/16 bg-cyan-300/[0.04] p-7 sm:p-10">
                <Brain className="h-8 w-8 text-cyan-200" />
                <p className="mt-6 max-w-[860px] text-2xl font-black leading-10 text-white">{finalVision}</p>
              </div>
            </SectionShell>
          </div>
        </section>
      </main>
    </div>
  );
}
