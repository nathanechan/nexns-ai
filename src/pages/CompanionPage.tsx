import {
  Bot,
  BrainCircuit,
  Check,
  Copy,
  Database,
  Globe2,
  Loader2,
  MessageCircle,
  PanelRight,
  RefreshCw,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { PreviewModal } from "../components/ui/PreviewModal";
import { useSolanaWallet } from "../lib/wallet/SolanaWalletProvider";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type ChatMode = "Ask NEXNS" | "Market Signal" | "Create Prediction" | "Generate Content" | "Research Summary";

const chatModes: ChatMode[] = ["Ask NEXNS", "Market Signal", "Create Prediction", "Generate Content", "Research Summary"];

const emptyPrompts = [
  "What is NEXNS?",
  "Explain NEX and NS.",
  "How does Genesis work?",
  "Help me create a prediction signal.",
  "What is a Signal Creator?",
  "Write a community post about NEXNS.",
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
    items: ["NEXNS Copilot mode", "Concise responses", "Product guidance", "Research-ready explanations"],
  },
  {
    title: "Memory & Data",
    icon: Database,
    items: ["Wallet context when connected", "Current page context", "Session chat history", "Future activity signals"],
  },
  {
    title: "Companion Growth",
    icon: Sparkles,
    items: ["NEX companion guidance", "Progress prompts", "Market signal support", "Community contribution ideas"],
  },
  {
    title: "Safety",
    icon: ShieldCheck,
    items: ["No private keys", "No seed phrases", "No investment promises", "No guaranteed returns"],
  },
  {
    title: "Product Links",
    icon: Globe2,
    items: ["AI World", "My Growth Journey", "Companion Home", "More product settings"],
  },
] satisfies { title: string; icon: LucideIcon; items: string[] }[];

function createMessage(role: ChatRole, content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    role,
    content,
  };
}

export function CompanionPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ChatMode>("Ask NEXNS");
  const [controlOpen, setControlOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { connectedWallet } = useSolanaWallet();

  const apiMessages = useMemo(
    () =>
      messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    [messages],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function sendPrompt(prompt: string) {
    const clean = prompt.trim();
    if (!clean || isLoading) return;

    const userMessage = createMessage("user", clean);
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLastPrompt(clean);
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((message) => ({ role: message.role, content: message.content })),
          walletAddress: connectedWallet?.address ?? null,
          pageContext: "NEXNS product AI chat page",
          mode,
        }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof body?.error === "string" ? body.error : "AI response failed.");
      }

      const answer = typeof body?.message === "string" ? body.message : "NEXNS AI Copilot did not return a response.";
      setMessages((current) => [...current, createMessage("assistant", answer)]);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Unable to reach NEXNS AI Copilot.";
      setError(message);
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          ["AI service is not configured yet.", "AI model is not configured yet.", "AI response failed. Please try again.", "AI service timeout. Please try again."].includes(message)
            ? message
            : "AI response failed. Please try again.",
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendPrompt(input);
  }

  function retryLastPrompt() {
    if (!lastPrompt) return;
    setError("");
    void sendPrompt(lastPrompt);
  }

  return (
    <AppShell>
      <section className="mx-auto flex h-[calc(100vh-8.5rem)] min-h-[620px] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/72 shadow-[0_0_60px_rgba(124,58,237,0.12)] backdrop-blur-xl max-md:h-[calc(100vh-7.2rem)] max-md:min-h-[560px]">
        <header className="shrink-0 border-b border-white/10 px-5 py-4 md:px-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-neon/20 text-cyan">
                <Bot className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-black text-white md:text-2xl">NEXNS AI Copilot</h1>
                <p className="truncate text-sm text-slate-400">Product assistant for Global Prediction Growth Infrastructure.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={mode}
                onChange={(event) => setMode(event.target.value as ChatMode)}
                className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-bold text-slate-100 outline-none transition focus:border-cyan/40"
                aria-label="AI mode"
              >
                {chatModes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setControlOpen(true)}
                className="interactive-glow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200"
              >
                <Settings className="h-4 w-4 text-cyan" />
                AI Control
              </button>
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setError("");
                  setLastPrompt("");
                }}
                className="interactive-glow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200"
              >
                <Trash2 className="h-4 w-4 text-gold" />
                Clear
              </button>
            </div>
          </div>
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 md:px-10">
          {messages.length === 0 ? (
            <EmptyChat onSelectPrompt={(prompt) => void sendPrompt(prompt)} />
          ) : (
            <div className="mx-auto grid max-w-4xl gap-6">
              <ChatBubble
                role="assistant"
                text="I am NEXNS AI Copilot. I can help you understand NEXNS, prediction networks, Genesis, NEX, NS, wallet participation, market signals, creators, projects, and community contribution."
              />
              {messages.map((message) => (
                <ChatBubble key={message.id} role={message.role} text={message.content} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 text-sm font-bold text-cyan">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  NEXNS AI Copilot is thinking.
                </div>
              )}
            </div>
          )}
        </div>

        <footer className="shrink-0 border-t border-white/10 bg-slate-950/88 px-4 py-4 md:px-10">
          {error && (
            <div className="mx-auto mb-3 flex max-w-4xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-bold text-gold">
              <span>{error}</span>
              <button type="button" onClick={retryLastPrompt} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs uppercase tracking-[0.12em] text-white">
                <RefreshCw className="h-3.5 w-3.5" />
                Retry
              </button>
            </div>
          )}
          <form onSubmit={onSubmit} className="mx-auto flex max-w-4xl items-end gap-3 rounded-[24px] border border-white/10 bg-white/[0.055] p-2">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={1}
              placeholder="Ask NEXNS AI Copilot..."
              className="max-h-32 min-h-12 min-w-0 flex-1 resize-none bg-transparent px-4 py-3 leading-6 text-white outline-none placeholder:text-slate-500"
              aria-label="Ask NEXNS AI Copilot"
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void sendPrompt(input);
                }
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="purple-button interactive-glow grid h-12 w-12 shrink-0 place-items-center rounded-2xl disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Send message"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
          <p className="mx-auto mt-3 max-w-4xl text-xs leading-5 text-slate-500">
            NEXNS AI Copilot provides product guidance and general explanations. It does not provide financial, legal, tax, or investment advice.
          </p>
        </footer>
      </section>

      <PreviewModal open={controlOpen} title="NEX AI Control" description="NEXNS AI settings, companion surfaces, memory controls, and product links are organized here." onClose={() => setControlOpen(false)}>
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

function EmptyChat({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  return (
    <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-center py-6">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl border border-cyan/25 bg-cyan/10 text-cyan shadow-[0_0_40px_rgba(0,229,255,0.12)]">
          <Bot className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">Ask NEXNS.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          Use NEXNS AI Copilot to understand prediction signals, Genesis, NEX, NS, creator growth, project activation, and community contribution.
        </p>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {emptyPrompts.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onSelectPrompt(question)}
            className="interactive-glow rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left text-sm font-semibold leading-6 text-slate-100 transition hover:border-cyan/35 hover:bg-cyan/10"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatBubble({ role, text }: { role: ChatRole; text: string }) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  async function copyText() {
    await navigator.clipboard.writeText(text).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neon/20 text-cyan">
          <Bot className="h-5 w-5" />
        </span>
      )}
      <div className={`group min-w-0 ${isUser ? "max-w-[82%] rounded-[24px] bg-neon px-5 py-4 text-white" : "max-w-[88%] px-1 py-2 text-slate-100"}`}>
        <div className="whitespace-pre-wrap break-words leading-8">{text}</div>
        {!isUser && (
          <button
            type="button"
            onClick={() => void copyText()}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.12em] text-slate-400 opacity-100 transition hover:text-white md:opacity-0 md:group-hover:opacity-100"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-cyan" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
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
