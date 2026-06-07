import { AlertTriangle, FileText, Scale, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { WebsiteHeader } from "../../components/website/WebsiteHeader";
import { WebsiteFooter } from "../../components/website/website-footer";
import nexLogoWhite from "../../assets/logo/nex-logo-white.png";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPageContent = {
  title: string;
  subtitle: string;
  sections: LegalSection[];
};

const legalPages = {
  terms: {
    title: "Terms of Service",
    subtitle: "Terms for accessing NEXNS as Global Prediction Growth Infrastructure.",
    sections: [
      {
        title: "Nature of NEXNS",
        body: [
          "NEXNS is designed as Global Prediction Growth Infrastructure for prediction networks, prediction economies, collective intelligence, network coordination, community participation, AI companions, and related ecosystem research.",
          "NEXNS is not presented as an exchange, broker, casino, gambling platform, social media platform, or generic software service.",
        ],
      },
      {
        title: "Use of Website and Materials",
        body: [
          "The website provides institutional information about NEXNS, including platform architecture, ecosystem design, NEX economic layer materials, NS participation layer materials, governance direction, and infrastructure references.",
          "Users agree to access these materials responsibly and only for lawful, informational, research, community, or ecosystem participation purposes.",
        ],
      },
      {
        title: "Platform and Network Access",
        body: [
          "Certain interfaces may provide access to prediction network experiences, community participation tools, AI companion interactions, governance-related materials, or future ecosystem functionality.",
          "Access may be changed, limited, suspended, or discontinued to protect users, infrastructure integrity, governance systems, community operations, or applicable compliance expectations.",
        ],
      },
      {
        title: "Participant Responsibility",
        body: [
          "Participants are responsible for their own accounts, wallets, credentials, devices, community activity, network interactions, and decisions made through any NEXNS-related interface.",
          "NEXNS does not control user-managed wallets, private keys, external protocols, third-party infrastructure, or public blockchain records.",
        ],
      },
      {
        title: "Prohibited Conduct",
        body: [
          "Users must not use NEXNS websites or interfaces for unlawful activity, abusive conduct, manipulation of prediction signals, unauthorized access, malicious code distribution, infrastructure interference, governance abuse, or conduct that harms network participants.",
          "NEXNS may restrict access where activity appears harmful to prediction networks, community participation, platform integrity, AI companion systems, infrastructure security, or applicable legal expectations.",
        ],
      },
      {
        title: "NEX and NS References",
        body: [
          "NEX may be described as an economic layer and NS may be described as a participation layer within NEXNS materials.",
          "References to NEX or NS are informational and do not constitute an offer, recommendation, guarantee, or promise of financial return.",
        ],
      },
      {
        title: "Intellectual Property",
        body: [
          "NEXNS names, logos, website materials, economic architecture, interface design, diagrams, written materials, and brand assets are protected by applicable intellectual property rights unless otherwise stated.",
          "No license is granted except for ordinary website viewing and permitted use of publicly available materials.",
        ],
      },
      {
        title: "Limitation of Liability",
        body: [
          "NEXNS materials are provided for general information and ecosystem transparency without warranties of uninterrupted availability, completeness, accuracy, or suitability for a particular use.",
          "To the maximum extent permitted by applicable law, NEXNS is not liable for indirect, incidental, consequential, speculative, economic, technical, governance-related, or network-participation losses arising from website or interface use.",
        ],
      },
      {
        title: "Changes to Terms",
        body: [
          "These terms may be updated as NEXNS infrastructure, governance systems, network coordination models, participation layers, or ecosystem materials evolve.",
          "Continued access after updates may constitute acceptance of the revised terms.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Privacy framework for NEXNS website access, network participation, and ecosystem interactions.",
    sections: [
      {
        title: "Information NEXNS May Process",
        body: [
          "NEXNS may process information that users voluntarily provide, including contact requests, institutional inquiries, community participation submissions, contributor interest, or other communications.",
          "Technical information may include browser type, device data, pages visited, interaction patterns, approximate region, referring pages, and security-related logs.",
        ],
      },
      {
        title: "Prediction Network and Participation Data",
        body: [
          "Where product interfaces are used, NEXNS may process interaction data related to prediction activity, participation flows, AI companion usage, community actions, or governance-facing experiences.",
          "Such data may be used to understand infrastructure performance, network coordination patterns, safety needs, and product reliability.",
        ],
      },
      {
        title: "Wallet and Public Network Data",
        body: [
          "If a user voluntarily connects a wallet or interacts with public blockchain infrastructure, related public addresses and transaction records may be visible on public networks.",
          "NEXNS does not control public blockchain data, third-party wallet software, or external protocol records.",
        ],
      },
      {
        title: "How Information Is Used",
        body: [
          "Information may be used to operate the website, respond to inquiries, improve institutional materials, maintain security, evaluate ecosystem participation, support AI companion quality, and protect infrastructure integrity.",
          "NEXNS does not intend to sell personal information as a core business model.",
        ],
      },
      {
        title: "AI Companion Interactions",
        body: [
          "AI companion interactions may involve user prompts, selected settings, activity signals, or product-context data used to provide guidance within NEXNS experiences.",
          "Users should avoid submitting sensitive personal, financial, legal, medical, or confidential information into AI-assisted interfaces.",
        ],
      },
      {
        title: "Cookies and Measurement",
        body: [
          "Cookies and similar technologies may help operate the website, remember preferences, measure traffic, improve content, and understand how users navigate institutional materials.",
          "Users can manage cookie settings through supported browser controls.",
        ],
      },
      {
        title: "Third-Party Infrastructure",
        body: [
          "NEXNS may rely on third-party infrastructure, analytics, hosting, wallet, community, media, or developer services.",
          "Third-party services may process information under their own policies and are not fully controlled by NEXNS.",
        ],
      },
      {
        title: "Data Protection and Retention",
        body: [
          "NEXNS aims to apply reasonable safeguards appropriate for website operations, network coordination, and ecosystem communications.",
          "Information may be retained as needed for operational, security, legal, compliance, research, or institutional record purposes.",
        ],
      },
      {
        title: "User Rights",
        body: [
          "Depending on applicable law, users may have rights to access, correct, delete, restrict, or object to certain uses of personal information.",
          "Requests can be directed through official NEXNS contact channels when available.",
        ],
      },
    ],
  },
  risk: {
    title: "Risk Disclosure",
    subtitle: "Risk considerations for prediction economies, network coordination, AI systems, and digital infrastructure.",
    sections: [
      {
        title: "Prediction Network Risk",
        body: [
          "Prediction activity involves uncertainty, incomplete information, changing conditions, incorrect assumptions, and outcomes that may differ from expected signals.",
          "NEXNS does not guarantee that prediction signals, network activity, community sentiment, creator interpretation, or AI-assisted analysis will be accurate or useful.",
        ],
      },
      {
        title: "Prediction Economies Are Emerging",
        body: [
          "Prediction economies, collective intelligence systems, participation layers, and network coordination models are developing fields.",
          "Design assumptions, governance models, incentive structures, and user behaviors may evolve materially over time.",
        ],
      },
      {
        title: "NEX and NS Risk",
        body: [
          "NEX may be described as an economic layer and NS as a participation layer, but descriptions do not eliminate technical, governance, market, regulatory, liquidity, operational, or adoption risks.",
          "No material on the website guarantees value, rewards, liquidity, utility, availability, governance outcomes, or future network success.",
        ],
      },
      {
        title: "Technology and Infrastructure Risk",
        body: [
          "Websites, APIs, smart contracts, wallets, AI systems, data feeds, hosting providers, community tools, and third-party infrastructure may experience failures, delays, vulnerabilities, outages, exploits, or inaccurate data.",
          "Technology risk may affect access, displayed information, product functionality, settlement processes, community participation, or governance experiences.",
        ],
      },
      {
        title: "AI Companion Risk",
        body: [
          "AI companions may generate incomplete, outdated, inaccurate, or contextually unsuitable information.",
          "AI-assisted guidance should not be treated as financial, legal, tax, governance, technical, or professional advice.",
        ],
      },
      {
        title: "Community and Governance Risk",
        body: [
          "Community participation and governance systems can involve disagreement, low participation, coordination failures, proposal risk, treasury risk, and evolving decision processes.",
          "Progressive decentralization and governance participation may develop gradually and may not function as expected.",
        ],
      },
      {
        title: "Market and Regulatory Risk",
        body: [
          "Digital infrastructure, prediction networks, community rewards, participation credits, AI systems, and economic layers may be subject to changing market conditions and evolving regulatory treatment.",
          "Availability, functionality, or access may differ by region and may change without advance notice.",
        ],
      },
      {
        title: "No Financial Advice",
        body: [
          "NEXNS website content is provided for general informational and institutional transparency purposes only.",
          "Users should consult qualified professionals before making decisions involving financial, legal, tax, technical, governance, or digital asset risk.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie Policy",
    subtitle: "Cookie and measurement practices for NEXNS infrastructure-facing website experiences.",
    sections: [
      {
        title: "What Cookies Are",
        body: [
          "Cookies are small data files that may be stored on a user's device when visiting a website.",
          "Similar technologies may include local storage, pixels, tags, analytics identifiers, or session-related browser data.",
        ],
      },
      {
        title: "How NEXNS Uses Cookies",
        body: [
          "NEXNS may use cookies to support website operation, remember preferences, improve institutional reading experiences, measure traffic, and protect website infrastructure.",
          "Cookies may also help understand how visitors navigate materials related to prediction networks, NEX, NS, governance, and ecosystem participation.",
        ],
      },
      {
        title: "Analytics and Performance",
        body: [
          "Analytics may be used to understand aggregated traffic patterns, content engagement, navigation quality, and technical performance.",
          "Measurement supports clearer infrastructure documentation, more reliable website access, and improved user experience.",
        ],
      },
      {
        title: "Preferences",
        body: [
          "Preference technologies may remember display choices, interface settings, or previously selected options.",
          "Availability of preference controls may evolve as the NEXNS website and platform interfaces mature.",
        ],
      },
      {
        title: "Third-Party Cookies",
        body: [
          "Some third-party services, including analytics, embedded media, infrastructure providers, community platforms, wallet tools, or developer services, may place cookies under their own policies.",
          "NEXNS does not control all third-party cookie practices.",
        ],
      },
      {
        title: "Managing Cookies",
        body: [
          "Users can manage, block, or delete cookies through browser settings and device controls.",
          "Restricting cookies may affect preferences, analytics accuracy, embedded content, or certain interactive features.",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    subtitle: "General disclaimers for NEXNS infrastructure materials, economic architecture, and ecosystem references.",
    sections: [
      {
        title: "General Information Only",
        body: [
          "NEXNS website materials are provided for general informational, educational, ecosystem, and institutional transparency purposes.",
          "Materials may describe prediction networks, prediction economies, collective intelligence, AI companions, governance systems, NEX economic layer concepts, NS participation layer concepts, and future infrastructure direction.",
        ],
      },
      {
        title: "Not an Exchange, Broker, or Gambling Platform",
        body: [
          "NEXNS materials should not be read as describing an exchange, broker, casino, gambling platform, or prediction betting service.",
          "NEXNS is positioned as Global Prediction Growth Infrastructure, and all materials should be interpreted in that infrastructure context.",
        ],
      },
      {
        title: "No Investment Advice",
        body: [
          "Nothing on the NEXNS website is investment advice, a recommendation, an offer to sell, or a solicitation to buy any asset or service.",
          "References to NEX, NS, network value, rewards, treasury, buyback, burn, governance, or ecosystem growth are informational and should not be treated as financial guidance.",
        ],
      },
      {
        title: "No Financial, Legal, or Tax Advice",
        body: [
          "NEXNS does not provide financial, legal, tax, accounting, regulatory, or professional advice through website content.",
          "Any decision involving legal, regulatory, financial, tax, technical, governance, or digital asset consequences should be reviewed with qualified advisors.",
        ],
      },
      {
        title: "No Guarantee of Accuracy",
        body: [
          "NEXNS aims to provide clear and useful information, but does not guarantee that all content is accurate, complete, current, uninterrupted, or error-free.",
          "Materials may be updated, removed, replaced, or revised as infrastructure design, governance systems, research, and ecosystem conditions evolve.",
        ],
      },
      {
        title: "No Guarantee of Future Results",
        body: [
          "Statements about future plans, adoption, infrastructure growth, governance development, AI companion capability, network participation, NEX, NS, or ecosystem direction are uncertain.",
          "Actual outcomes may differ materially from any expectation, roadmap, forecast, model, diagram, or forward-looking statement.",
        ],
      },
      {
        title: "External Links",
        body: [
          "The website may link to third-party websites, infrastructure providers, community channels, research resources, wallet tools, or external networks.",
          "NEXNS is not responsible for third-party content, policies, availability, security, accuracy, or operational practices.",
        ],
      },
    ],
  },
} satisfies Record<string, LegalPageContent>;

const legalNav = [
  { label: "Terms", path: "/legal/terms" },
  { label: "Privacy", path: "/legal/privacy" },
  { label: "Risk", path: "/legal/risk" },
  { label: "Cookies", path: "/legal/cookies" },
  { label: "Disclaimer", path: "/legal/disclaimer" },
];

function LegalPage({ page }: { page: LegalPageContent }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <WebsiteHeader />

      <main className="overflow-hidden">
        <section className="relative px-5 pb-16 pt-32 sm:px-8 lg:px-14 lg:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(0,240,255,0.08),transparent_30%),radial-gradient(circle_at_18%_72%,rgba(138,43,226,0.11),transparent_34%)]" />
          <div className="relative z-10 mx-auto max-w-[1180px]">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
              <img src={nexLogoWhite} alt="NEXNS" className="h-5 w-auto" draggable={false} />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/72">Legal & Compliance</span>
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">Last updated: 2026</p>
                <h1 className="mt-5 text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
                  {page.title}
                </h1>
                <p className="mt-7 max-w-[760px] text-xl leading-9 text-white/78">{page.subtitle}</p>
              </div>

              <div className="rounded-[34px] border border-amber-300/18 bg-amber-300/[0.045] p-7 shadow-[0_24px_100px_rgba(0,0,0,0.35)]">
                <AlertTriangle className="h-8 w-8 text-amber-100" />
                <h2 className="mt-5 text-xl font-black text-white">Counsel review required</h2>
                <p className="mt-4 text-base leading-8 text-white/76">
                  These NEXNS-specific legal framework templates are provided for website planning only. They are not
                  legal advice, are not jurisdiction-specific, and must be reviewed by qualified counsel before official
                  launch.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-28 sm:px-8 lg:px-14">
          <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[260px_1fr] lg:items-start">
            <aside className="lg:sticky lg:top-28">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-cyan-200" />
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-white/70">Legal Index</p>
                </div>
                <nav className="mt-5 grid gap-2">
                  {legalNav.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="rounded-2xl border border-white/8 bg-black/24 px-4 py-3 text-sm font-bold text-white/66 transition hover:border-cyan-300/25 hover:bg-cyan-300/[0.06] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            <article className="rounded-[34px] border border-white/10 bg-white/[0.03] p-6 sm:p-9">
              <div className="mb-9 flex items-start gap-4 rounded-[26px] border border-cyan-300/14 bg-cyan-300/[0.035] p-5">
                <ShieldCheck className="mt-1 h-6 w-6 shrink-0 text-cyan-200" />
                <p className="text-sm leading-7 text-white/76">
                  NEXNS provides these materials to support institutional clarity around prediction growth
                  infrastructure, network coordination, AI-assisted participation, and ecosystem transparency.
                </p>
              </div>

              <div className="grid gap-8">
                {page.sections.map((section, index) => (
                  <section key={section.title} className="border-b border-white/8 pb-8 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/40 text-xs font-black text-cyan-100">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight text-white">{section.title}</h2>
                        <div className="mt-4 space-y-4">
                          {section.body.map((paragraph) => (
                            <p key={paragraph} className="text-base leading-8 text-white/76">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-10 rounded-[26px] border border-white/10 bg-black/28 p-5">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-violet-100" />
                  <h2 className="text-lg font-black text-white">Document review status</h2>
                </div>
                <p className="mt-3 text-sm leading-7 text-white/66">
                  Draft legal framework template for NEXNS website planning. Qualified counsel review is required
                  before public launch, jurisdictional use, or operational reliance.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>

      <WebsiteFooter />
    </div>
  );
}

export function TermsOfServicePage() {
  return <LegalPage page={legalPages.terms} />;
}

export function PrivacyPolicyPage() {
  return <LegalPage page={legalPages.privacy} />;
}

export function RiskDisclosurePage() {
  return <LegalPage page={legalPages.risk} />;
}

export function CookiePolicyPage() {
  return <LegalPage page={legalPages.cookies} />;
}

export function DisclaimerPage() {
  return <LegalPage page={legalPages.disclaimer} />;
}
