import {
  Activity,
  Bell,
  BookOpen,
  Bot,
  Briefcase,
  CalendarCheck,
  ChevronRight,
  CircleDollarSign,
  Code2,
  Compass,
  Crown,
  FileText,
  Flame,
  Gem,
  Gift,
  Globe2,
  Handshake,
  HelpCircle,
  History,
  KeyRound,
  Languages,
  Layers,
  Medal,
  MessageCircle,
  MonitorCog,
  Network,
  PieChart,
  Radio,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Store,
  Ticket,
  TrendingUp,
  Trophy,
  UserCircle,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { PreviewModal } from "../components/ui/PreviewModal";
import { useProductState } from "../state/productState";

type MoreEntry = {
  title: string;
  copy: string;
  icon: LucideIcon;
  to?: string;
  status?: "Live" | "Coming Soon" | "System";
};

const personalEntries: MoreEntry[] = [
  { title: "Personal Center", copy: "Profile identity, level, balances, growth progress, rewards, VIP, and account overview.", icon: UserCircle, to: "/my", status: "Live" },
  { title: "Portfolio", copy: "A consolidated view of prediction exposure, reward assets, NEX holdings, and NS activity.", icon: PieChart, status: "Coming Soon" },
  { title: "Prediction History", copy: "Open, settled, won, lost, and watchlisted prediction records across all markets.", icon: History, status: "Coming Soon" },
  { title: "Watchlist", copy: "Pinned markets, creators, projects, alerts, and personalized NEX recommendations.", icon: Star, status: "Coming Soon" },
];

const marketEntries: MoreEntry[] = [
  { title: "Markets", copy: "Crypto, project, social, creator, and ecosystem prediction markets.", icon: TrendingUp, to: "/prediction", status: "Live" },
  { title: "Market Screener", copy: "Filter markets by volume, participants, sentiment, volatility, and creator coverage.", icon: Search, status: "Coming Soon" },
  { title: "Market Analytics", copy: "Sentiment ratios, liquidity movement, participant changes, and simulated signal depth.", icon: Activity, status: "Coming Soon" },
  { title: "Prediction Orders", copy: "Track signal submissions, settlement state, reward preview, and lifecycle status.", icon: ReceiptText, status: "Coming Soon" },
  { title: "Hot Lists", copy: "Trending markets, fast-moving projects, creator calls, and high-participation rooms.", icon: Flame, status: "Coming Soon" },
  { title: "Market Calendar", copy: "Upcoming settlement windows, launch events, campaign deadlines, and seasonal markets.", icon: CalendarCheck, status: "Coming Soon" },
];

const growthEntries: MoreEntry[] = [
  { title: "My Growth Journey", copy: "Levels, EXP, season pass, VIP benefits, rewards, and achievements.", icon: Trophy, to: "/my", status: "Live" },
  { title: "Rewards Center", copy: "Claimable rewards, history, streaks, badges, and mission payouts.", icon: Gift, to: "/my", status: "Live" },
  { title: "Daily Tasks", copy: "Check-ins, prediction missions, creator follows, campaign tasks, and progress objectives.", icon: Ticket, to: "/my", status: "Live" },
  { title: "Referral Center", copy: "Invite tracking, community growth rewards, supporter benefits, and referral progress.", icon: Handshake, status: "Coming Soon" },
  { title: "VIP Center", copy: "Membership tiers, premium benefits, reward boosts, access levels, and upgrade path.", icon: Crown, to: "/my", status: "Live" },
  { title: "Achievements", copy: "Badges, milestones, creator support records, prediction streaks, and reputation signals.", icon: Medal, to: "/my", status: "Live" },
  { title: "NEX Companion Home", copy: "Train, rest, evolve, and grow your AI companion bond.", icon: Bot, to: "/pet", status: "Live" },
  { title: "NEX World", copy: "Enter the companion world map with training, evolution, gallery, and reward zones.", icon: Sparkles, to: "/pet/world", status: "Live" },
];

const creatorProjectEntries: MoreEntry[] = [
  { title: "Creator Arena", copy: "Creator rankings, featured profiles, ROI, win rate, community influence, and earnings.", icon: Users, to: "/creator", status: "Live" },
  { title: "Creator Studio", copy: "Publishing tools, market calls, audience analytics, content calendar, and creator rewards.", icon: Radio, status: "Coming Soon" },
  { title: "Creator Communities", copy: "Supporter rooms, private calls, AMAs, creator circles, and community moderation.", icon: MessageCircle, status: "Coming Soon" },
  { title: "Project Hub", copy: "Project discovery, campaigns, categories, growth analytics, and creator promotion.", icon: Store, to: "/projects", status: "Live" },
  { title: "Launchpad", copy: "Project listing, campaign launch, task setup, creator activation, and growth milestones.", icon: Briefcase, status: "Coming Soon" },
  { title: "Campaign Board", copy: "Project missions, reward pools, launch tasks, creator boosts, and community activation.", icon: Zap, status: "Coming Soon" },
];

const ecosystemEntries: MoreEntry[] = [
  { title: "Community Plaza", copy: "Creator communities, supporter groups, social activity, and live discussion rooms.", icon: Users, status: "Coming Soon" },
  { title: "Events Hub", copy: "Seasonal prediction events, creator AMAs, launch campaigns, and ecosystem quests.", icon: CalendarCheck, status: "Coming Soon" },
  { title: "Discovery Center", copy: "Market insights, new projects, trending creators, and ecosystem opportunities.", icon: Compass, status: "Coming Soon" },
  { title: "Leaderboards", copy: "Rankings for predictors, creators, supporters, projects, and community builders.", icon: Medal, status: "Coming Soon" },
  { title: "Announcements", copy: "Protocol notices, product updates, market changes, campaign launches, and reward news.", icon: Bell, status: "Coming Soon" },
  { title: "Social Feed", copy: "Creator calls, community discussions, project updates, market commentary, and live reactions.", icon: Network, status: "Coming Soon" },
  { title: "Governance Console", copy: "Proposals, voting readiness, treasury signals, and protocol participation.", icon: Crown, status: "Coming Soon" },
  { title: "NEX Academy", copy: "Guides for prediction strategy, creator growth, project campaigns, companion progression, and safety.", icon: BookOpen, status: "Coming Soon" },
];

const accountEntries: MoreEntry[] = [
  { title: "Wallet Center", copy: "Connection status, account access, balances, and wallet safety guidance.", icon: Wallet, status: "System" },
  { title: "Asset Center", copy: "NEX, NS, rewards, season assets, companion items, and future transaction records.", icon: CircleDollarSign, status: "System" },
  { title: "Security Center", copy: "Session safety, device protection, permission review, and account controls.", icon: ShieldCheck, status: "System" },
  { title: "Identity & KYC", copy: "Profile identity, verification readiness, creator credentials, and institutional access controls.", icon: KeyRound, status: "System" },
  { title: "Notifications", copy: "Creator alerts, prediction reminders, project campaign notices, and reward updates.", icon: Bell, status: "System" },
  { title: "Language & Region", copy: "Regional settings, language preferences, time zone, market display, and local notifications.", icon: Languages, status: "System" },
  { title: "Preferences", copy: "Theme, density, default market view, AI guidance style, and product display controls.", icon: SlidersHorizontal, status: "System" },
  { title: "Support", copy: "Help center, onboarding guidance, product status, and contact paths.", icon: HelpCircle, status: "System" },
];

const developerEntries: MoreEntry[] = [
  { title: "API Access", copy: "Future developer access for prediction signals, campaign data, market status, and ecosystem metrics.", icon: Code2, status: "Coming Soon" },
  { title: "Documentation", copy: "Product docs, integration guides, data definitions, governance references, and safety policies.", icon: FileText, status: "Coming Soon" },
  { title: "Protocol Status", copy: "Service health, data availability, market uptime, campaign state, and incident notices.", icon: MonitorCog, status: "Coming Soon" },
  { title: "Institutional Desk", copy: "Investor, project, creator, and partner access paths for enterprise-grade onboarding.", icon: Globe2, status: "Coming Soon" },
];

const settingsGroups = [
  {
    title: "Account",
    items: ["Personal profile", "Wallet access", "Connected devices", "Identity verification", "Security preferences"],
  },
  {
    title: "Trading & Prediction",
    items: ["Default market", "Prediction confirmation", "Settlement reminders", "Watchlist alerts", "Risk notices"],
  },
  {
    title: "Growth",
    items: ["Reward display", "VIP benefits", "Season pass", "Achievement visibility", "Referral tracking"],
  },
  {
    title: "Companion",
    items: ["NEX mood", "Energy reminders", "Training prompts", "Evolution status", "AI response style"],
  },
  {
    title: "Data & Privacy",
    items: ["Activity feed", "Prediction history", "Community records", "Export preferences", "Privacy controls"],
  },
  {
    title: "System",
    items: ["Language", "Region", "Notification channels", "Product density", "Support access"],
  },
];

export function MorePage() {
  const [modal, setModal] = useState<{ title: string; description: string } | null>(null);
  const { activities, rewards, predictions, pet, nsBalance } = useProductState();

  const openEntry = (entry: MoreEntry) => {
    setModal({
      title: entry.title,
      description:
        entry.status === "Coming Soon"
          ? `${entry.copy} This entry is prepared for a future NEXNS product surface.`
          : entry.copy,
    });
  };

  return (
    <AppShell>
      <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <GlassCard className="relative overflow-hidden p-6 md:p-8">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-neon/20 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="nex-label">NEXNS Product OS</div>
              <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">More</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                Access the full NEXNS product universe: personal center, markets, predictions, rewards, creators, projects, companion, community, assets, and system settings.
              </p>
            </div>
            <Mascot variant="guiding" className="w-36 md:w-44" />
          </div>
          <div className="relative mt-7 grid gap-3 sm:grid-cols-4">
            {[
              ["NS Balance", nsBalance.toLocaleString(), Gem],
              ["Predictions", String(predictions.length + 24), Layers],
              ["Activity", String(activities.length), Network],
              ["Pet Mood", pet.mood, Bot],
            ].map(([label, value, Icon]) => (
              <GlassCard key={label as string} className="interactive-glow p-4">
                <Icon className="mb-3 h-5 w-5 text-neon" />
                <div className="text-xs text-slate-400">{label as string}</div>
                <div className="mt-1 text-2xl font-black">{value as string}</div>
              </GlassCard>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Settings className="h-7 w-7 text-cyan" />
            <div>
              <h2 className="text-2xl font-black">Settings</h2>
              <p className="mt-1 text-sm text-slate-300">Complete preference map for account, market, growth, companion, and system control.</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {settingsGroups.map((group) => (
              <button
                key={group.title}
                type="button"
                onClick={() => setModal({ title: `${group.title} Settings`, description: group.items.join(" · ") })}
                className="interactive-glow rounded-2xl border border-white/10 bg-white/5 p-4 text-left"
              >
                <div className="flex items-center justify-between gap-3">
                  <b>{group.title}</b>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-300">{group.items.join(" · ")}</div>
              </button>
            ))}
          </div>
        </GlassCard>
      </section>

      <MoreSection title="Personal Center" entries={personalEntries} onOpen={openEntry} />
      <MoreSection title="Markets & Predictions" entries={marketEntries} onOpen={openEntry} />
      <MoreSection title="Growth Surfaces" entries={growthEntries} onOpen={openEntry} />
      <MoreSection title="Creators & Projects" entries={creatorProjectEntries} onOpen={openEntry} />
      <MoreSection title="Ecosystem Surfaces" entries={ecosystemEntries} onOpen={openEntry} />
      <MoreSection title="Account & System" entries={accountEntries} onOpen={openEntry} />
      <MoreSection title="Developers & Institutions" entries={developerEntries} onOpen={openEntry} />

      <GlassCard className="mt-5 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black">Recent Product Activity</h2>
            <p className="mt-2 text-slate-300">A quick view of the latest actions across the NEXNS growth loop.</p>
          </div>
          <Link to="/companion" className="purple-button rounded-xl px-5 py-3 font-semibold">
            Ask NEX
          </Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[...activities.slice(0, 3), ...rewards.slice(0, 3)].slice(0, 6).map((item, index) => (
            <div key={`${item.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <MessageCircle className="mb-3 h-5 w-5 text-cyan" />
              <div className="font-semibold">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      <PreviewModal open={!!modal} title={modal?.title ?? ""} description={modal?.description} onClose={() => setModal(null)}>
        <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-sm text-slate-200">
          This product entry uses local preview state only. No wallet transaction, payment, token transfer, or blockchain execution is initiated.
        </div>
      </PreviewModal>
    </AppShell>
  );
}

function MoreSection({ title, entries, onOpen }: { title: string; entries: MoreEntry[]; onOpen: (entry: MoreEntry) => void }) {
  return (
    <section className="mt-5">
      <div className="mb-4 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-black">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {entries.map((entry) => {
          const Icon = entry.icon;
          const content = (
            <GlassCard className="interactive-glow h-full p-5">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-neon/18 text-neon">
                  <Icon className="h-6 w-6" />
                </span>
                <span className={`rounded-full px-2.5 py-1 text-xs ${entry.status === "Live" ? "bg-mint/15 text-mint" : entry.status === "System" ? "bg-cyan/15 text-cyan" : "bg-white/10 text-slate-300"}`}>
                  {entry.status ?? "Live"}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-black">{entry.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{entry.copy}</p>
              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-200">
                Open <ChevronRight className="h-4 w-4" />
              </div>
            </GlassCard>
          );

          return entry.to ? (
            <Link key={entry.title} to={entry.to} className="block">
              {content}
            </Link>
          ) : (
            <button key={entry.title} type="button" onClick={() => onOpen(entry)} className="block h-full text-left">
              {content}
            </button>
          );
        })}
      </div>
    </section>
  );
}
