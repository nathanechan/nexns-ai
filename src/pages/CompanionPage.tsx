import {
  Bot,
  BrainCircuit,
  Database,
  Globe2,
  MessageCircle,
  PanelRight,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { PreviewModal } from "../components/ui/PreviewModal";
import { useProductState } from "../state/productState";

const answerBook: Record<string, string> = {
  "what is nexns?": "NEXNS is Global Prediction Growth Infrastructure that connects prediction activity, creator influence, project campaigns, rewards, and AI companion guidance into one continuous growth loop.",
  "how do i grow in nexns?": "You grow by making predictions, following creators, joining project campaigns, completing daily tasks, and training your NEX companion. Each action can improve EXP, NS rewards, bond, streaks, and ecosystem reputation.",
  "what should i do next?": "Your next best action is to make one prediction, follow one high-performing creator, claim a daily task, and train NEX. That sequence creates visible progress across market activity, rewards, and companion growth.",
  "how does nex help me?": "NEX acts as your growth guide. It explains markets, tracks your journey, recommends next actions, connects creator and project signals, and helps you return to the most valuable product surface.",
  "why is nexns different?": "Most prediction products stop at markets. NEXNS combines prediction infrastructure, creator distribution, project growth, rewards, and AI companion retention into one coordinated ecosystem.",
  "how do projects grow here?": "Projects grow by launching campaigns, attracting creators, activating prediction markets, distributing community tasks, and measuring adoption through signal volume and participation.",
  "how do creators earn?": "Creators earn by publishing insight, growing followers, leading communities, supporting project campaigns, and building influence through prediction performance and engagement.",
  "why will users return every day?": "Daily markets, creator alerts, tasks, streaks, reward claims, and companion progression create recurring reasons to return. NEX turns product actions into a habit loop.",
  "why will creators stay?": "Creators stay because NEXNS turns insight into measurable influence, audience growth, campaign opportunities, and recurring ecosystem reward paths.",
  "why will projects pay?": "Projects pay when NEXNS converts launch attention into prediction volume, creator distribution, task completion, and measurable community activation.",
  "how does nexns create network effects?": "Users create prediction signals. Creators amplify those signals. Projects fund campaigns. Rewards drive retention. Communities add trust. NEX guides users back into the loop.",
  "how does ai companion improve retention?": "The companion makes progress personal. It remembers actions, explains next steps, reacts to rewards, and links prediction, creator, project, task, and pet growth into one guided experience.",
};

const starterQuestions = [
  "What should I do next?",
  "How do I grow in NEXNS?",
  "How does NEX help me?",
  "What is NEXNS?",
];

const aiControlSections = [
  {
    title: "NEX Intelligence",
    icon: BrainCircuit,
    items: ["Growth guidance", "Market explanation", "Creator insight summary", "Project campaign context"],
  },
  {
    title: "Conversation",
    icon: MessageCircle,
    items: ["Guided chat mode", "Concise responses", "Investor explanations", "Product action prompts"],
  },
  {
    title: "Memory & Data",
    icon: Database,
    items: ["Local chat history", "Activity context", "Prediction records", "Growth progress signals"],
  },
  {
    title: "Companion Growth",
    icon: Sparkles,
    items: ["Bond reactions", "Mood changes", "Energy reminders", "Evolution progress"],
  },
  {
    title: "Safety",
    icon: ShieldCheck,
    items: ["No real AI API", "No wallet action", "No payment", "No blockchain transaction"],
  },
  {
    title: "Product Links",
    icon: Globe2,
    items: ["AI World", "My Growth Journey", "Companion Home", "More product settings"],
  },
] satisfies { title: string; icon: LucideIcon; items: string[] }[];

const fallbackAnswer = "I am still learning this part of NEXNS. For now, I can help explain predictions, creators, projects, growth, rewards, and your NEX companion.";

function normalizeQuestion(value: string) {
  return value.trim().toLowerCase();
}

export function CompanionPage() {
  const [input, setInput] = useState("");
  const [controlOpen, setControlOpen] = useState(false);
  const { companionMessages, sendCompanionMessage } = useProductState();
  const growthRelatedWords = useMemo(() => ["grow", "growth", "return", "creator", "project", "network", "retention", "next", "earn"], []);

  function submitQuestion(question: string, keepInput = false) {
    const clean = question.trim();
    if (!clean) return;
    const key = normalizeQuestion(clean);
    const answer = answerBook[key] ?? fallbackAnswer;
    const growthRelated = growthRelatedWords.some((word) => key.includes(word));
    sendCompanionMessage(clean, answer, growthRelated);
    if (!keepInput) setInput("");
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(input);
  }

  return (
    <AppShell>
      <section className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/58 shadow-[0_0_60px_rgba(124,58,237,0.12)] backdrop-blur-xl">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 md:px-7">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-neon/20 text-cyan">
              <Bot className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-xl font-black">NEX Chat</h1>
              <p className="text-sm text-slate-400">Ask about markets, creators, projects, rewards, and growth.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setControlOpen(true)}
            className="interactive-glow flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200"
          >
            <Settings className="h-4 w-4 text-cyan" />
            AI Control
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-6 md:px-10">
          {companionMessages.length === 0 ? (
            <div className="mx-auto flex min-h-[540px] max-w-3xl flex-col items-center justify-center text-center">
              <Mascot variant="thinking" className="w-32 md:w-44" />
              <h2 className="mt-6 text-4xl font-black leading-tight md:text-5xl">Ask NEX anything.</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                NEX is the AI growth companion inside NEXNS, helping you understand signals, progress, rewards, creators, projects, and your next best action.
              </p>
              <div className="mt-8 grid w-full gap-3 md:grid-cols-2">
                {starterQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => submitQuestion(question, true)}
                    className="interactive-glow rounded-2xl border border-white/10 bg-white/5 p-4 text-center text-sm font-semibold text-slate-100"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              <ChatBubble role="nex" text="Welcome back. I can guide your next product action, explain the NEXNS growth loop, and connect your predictions, creators, projects, rewards, and NEX companion progress." />
              {companionMessages.map((message) => (
                <ChatBubble key={message.id} role={message.role} text={message.text} />
              ))}
            </div>
          )}
        </div>

        <footer className="border-t border-white/10 bg-slate-950/72 px-5 py-4 md:px-10">
          <form onSubmit={onSubmit} className="mx-auto flex max-w-4xl items-end gap-3 rounded-[24px] border border-white/10 bg-white/[0.055] p-2">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={1}
              placeholder="Ask NEX..."
              className="max-h-32 min-h-12 min-w-0 flex-1 resize-none bg-transparent px-4 py-3 leading-6 text-white outline-none placeholder:text-slate-500"
              aria-label="Ask NEX"
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submitQuestion(input);
                }
              }}
            />
            <button type="submit" className="purple-button interactive-glow grid h-12 w-12 place-items-center rounded-2xl">
              <Send className="h-5 w-5" />
            </button>
          </form>
        </footer>
      </section>

      <PreviewModal open={controlOpen} title="NEX AI Control" description="All NEXNS AI settings, companion surfaces, memory controls, and AI product links are organized here." onClose={() => setControlOpen(false)}>
        <div className="grid gap-4 md:grid-cols-2">
          {aiControlSections.map((section) => {
            const Icon = section.icon;
            return (
              <GlassCard key={section.title} className="p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-neon/20 text-cyan">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-black">{section.title}</h3>
                </div>
                <div className="mt-4 grid gap-2">
                  {section.items.map((item) => (
                    <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
                      {item}
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <ControlLink to="/pet/world" icon={Globe2} label="AI World" />
          <ControlLink to="/my" icon={PanelRight} label="Growth" />
          <ControlLink to="/pet" icon={Sparkles} label="Companion" />
          <ControlLink to="/more" icon={Wand2} label="More" />
        </div>
      </PreviewModal>
    </AppShell>
  );
}

function ChatBubble({ role, text }: { role: "user" | "nex"; text: string }) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neon/20 text-cyan">
          <Bot className="h-5 w-5" />
        </span>
      )}
      <div className={`${isUser ? "max-w-[78%] rounded-[24px] bg-neon px-5 py-4 text-white" : "max-w-[84%] px-1 py-2 text-slate-100"} leading-8`}>
        {text}
      </div>
    </div>
  );
}

function ControlLink({ to, icon: Icon, label }: { to: string; icon: LucideIcon; label: string }) {
  return (
    <Link to={to} className="interactive-glow flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100">
      <Icon className="h-4 w-4 text-cyan" />
      {label}
    </Link>
  );
}
