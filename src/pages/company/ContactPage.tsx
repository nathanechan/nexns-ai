import {
  ArrowRight,
  Building2,
  FlaskConical,
  Globe2,
  Handshake,
  Landmark,
  Mail,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { WebsiteHeader } from "../../components/website/WebsiteHeader";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";
import xIcon from "../../assets/Community/x.svg";
import telegramIcon from "../../assets/Community/telegram.svg";
import discordIcon from "../../assets/Community/discord.svg";
import githubIcon from "../../assets/Community/github.svg";
import youtubeIcon from "../../assets/Community/youtube.svg";
import mediumIcon from "../../assets/Community/medium.svg";

const partnershipExamples = [
  "AI Infrastructure",
  "Cloud Infrastructure",
  "Data Networks",
  "Developer Ecosystems",
  "Research Organizations",
];

const investorTopics = ["Investment Thesis", "Platform Architecture", "Network Economics", "Growth Strategy"];

const mediaTopics = ["Interviews", "Research Collaboration", "Press Inquiries", "Industry Commentary"];

const communityChannels = [
  { label: "X", icon: xIcon, href: "https://x.com/nexns" },
  { label: "Telegram", icon: telegramIcon, href: "https://t.me/nexns" },
  { label: "Discord", icon: discordIcon, href: "https://discord.gg/nexns" },
  { label: "GitHub", icon: githubIcon, href: "https://github.com/nexns" },
  { label: "YouTube", icon: youtubeIcon, href: "https://youtube.com/@nexns" },
  { label: "Medium", icon: mediumIcon, href: "https://medium.com/@nexns" },
];

const contactMethods = [
  ["Email", "contact@nexns.network", "General ecosystem inquiries and institutional communication."],
  ["Business", "business@nexns.network", "Strategic partnerships, infrastructure relationships, and long-term alliances."],
  ["Community", "community@nexns.network", "Creators, contributors, ambassadors, operators, and community participation."],
  ["Support", "support@nexns.network", "Website, product access, account, and platform experience questions."],
];

function SectionHeader({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="mb-10 max-w-[860px]">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{label}</p>
      <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-white/76">{description}</p>
    </div>
  );
}

function TopicPill({ label }: { label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/24 px-5 py-4">
      <p className="text-sm font-black text-white">{label}</p>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <WebsiteHeader />

      <main className="overflow-hidden">
        <section className="relative px-5 pb-20 pt-32 sm:px-8 lg:px-14 lg:pb-28 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_16%,rgba(0,240,255,0.10),transparent_30%),radial-gradient(circle_at_16%_72%,rgba(138,43,226,0.12),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-[1240px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <img src={nexLogoWhite} alt="NEXNS" className="h-5 w-auto" draggable={false} />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/72">Institutional Gateway</span>
            </div>

            <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">Contact</p>
                <h1 className="mt-5 text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
                  Contact
                </h1>
                <p className="mt-7 max-w-[760px] text-3xl font-black leading-tight text-white sm:text-5xl">
                  Connect With The NEXNS Network
                </p>
                <p className="mt-7 max-w-[820px] text-xl leading-9 text-white/78">
                  NEXNS welcomes conversations with builders, researchers, investors, creators, ecosystem partners,
                  contributors, and communities interested in the future of prediction economies.
                </p>
              </div>

              <div className="rounded-[34px] border border-white/10 bg-white/[0.035] p-7 shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <Network className="h-8 w-8 text-cyan-200" />
                <h2 className="mt-6 text-2xl font-black text-white">Let's Build the Future Together</h2>
                <p className="mt-4 text-base leading-8 text-white/76">
                  Prediction economies require builders, researchers, creators, communities, operators, and long-term
                  contributors. NEXNS is building Global Prediction Growth Infrastructure and welcomes meaningful
                  collaboration.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link to="/#community" className="nex-primary-button">
                    Join Community
                  </Link>
                  <Link to="/app" className="nex-secondary-button">
                    Launch App
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-[1180px]">
            <section className="border-b border-white/10 py-24">
              <SectionHeader
                label="01"
                title="Strategic Partnerships"
                description="For infrastructure providers, ecosystem integrations, technology collaborations, research initiatives, and long-term strategic alliances."
              />
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Handshake className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    NEXNS partners around infrastructure, coordination, research, and durable ecosystem development.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {partnershipExamples.map((item) => (
                    <TopicPill key={item} label={item} />
                  ))}
                </div>
              </div>
            </section>

            <section className="border-b border-white/10 py-24">
              <SectionHeader
                label="02"
                title="Investor Relations"
                description="For institutional investors, venture funds, family offices, strategic investors, and long-term ecosystem supporters."
              />
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <Landmark className="h-8 w-8 text-violet-100" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    Investor conversations focus on platform architecture, network economics, and long-term growth
                    infrastructure.
                  </p>
                  <Link
                    to="/investor"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white/70 transition hover:text-white"
                  >
                    Investor Center <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {investorTopics.map((item) => (
                    <TopicPill key={item} label={item} />
                  ))}
                </div>
              </div>
            </section>

            <section className="border-b border-white/10 py-24">
              <SectionHeader
                label="03"
                title="Media & Research"
                description="For journalists, podcast hosts, researchers, analysts, publications, conferences, and ecosystem reports."
              />
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
                  <FlaskConical className="h-8 w-8 text-cyan-200" />
                  <p className="mt-5 text-xl font-black leading-9 text-white">
                    NEXNS supports serious research and institutional discussion around prediction economies and
                    collective intelligence.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mediaTopics.map((item) => (
                    <TopicPill key={item} label={item} />
                  ))}
                </div>
              </div>
            </section>

            <section className="border-b border-white/10 py-24">
              <SectionHeader
                label="04"
                title="Community & Contributors"
                description="Join the global network of creators, contributors, operators, builders, and ecosystem participants."
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {communityChannels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 rounded-[26px] border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.055]"
                  >
                    <img src={channel.icon} alt="" className="h-7 w-7 object-contain invert" draggable={false} />
                    <span className="text-lg font-black text-white">{channel.label}</span>
                  </a>
                ))}
              </div>
            </section>

            <section className="border-b border-white/10 py-24">
              <SectionHeader
                label="05"
                title="General Inquiries"
                description="For all other questions, collaboration requests, and ecosystem inquiries."
              />
              <div className="grid gap-4 md:grid-cols-2">
                {contactMethods.map(([type, address, description]) => (
                  <a
                    key={type}
                    href={`mailto:${address}`}
                    className="rounded-[28px] border border-white/10 bg-white/[0.035] p-6 transition hover:border-violet-300/30 hover:bg-violet-300/[0.05]"
                  >
                    <Mail className="h-6 w-6 text-cyan-200" />
                    <h3 className="mt-5 text-xl font-black text-white">{type}</h3>
                    <p className="mt-2 text-sm font-bold text-cyan-100">{address}</p>
                    <p className="mt-4 text-sm leading-7 text-white/70">{description}</p>
                  </a>
                ))}
              </div>
            </section>

            <section className="py-24">
              <div className="rounded-[34px] border border-violet-300/18 bg-violet-300/[0.055] p-7 sm:p-10">
                <Globe2 className="h-8 w-8 text-violet-100" />
                <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                  A Global Participation Network
                </h2>
                <p className="mt-6 max-w-[900px] text-xl leading-9 text-white/78">
                  NEXNS is designed as Global Prediction Growth Infrastructure connecting participants across markets,
                  communities, technologies, and ecosystems.
                </p>
                <div className="mt-8 rounded-[26px] border border-white/10 bg-black/26 p-6">
                  <ShieldCheck className="h-6 w-6 text-cyan-200" />
                  <p className="mt-4 text-2xl font-black leading-10 text-white">
                    “The future of prediction economies will be built through collaboration.”
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
