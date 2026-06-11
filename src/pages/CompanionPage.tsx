import {
  BrainCircuit,
  ChevronDown,
  Check,
  Copy,
  Database,
  Download,
  ExternalLink,
  Globe2,
  Image as ImageIcon,
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
import { FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { GlassCard } from "../components/ui/GlassCard";
import { Mascot } from "../components/ui/Mascot";
import { PreviewModal } from "../components/ui/PreviewModal";
import { useSolanaWallet } from "../lib/wallet/SolanaWalletProvider";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type ChatMode = "Ask NEXNS" | "Market Signal" | "Create Prediction" | "Generate Content" | "Research Summary";
type AiCenterTab = "copilot" | "images" | "videos";

const chatModes: ChatMode[] = ["Ask NEXNS", "Market Signal", "Create Prediction", "Generate Content", "Research Summary"];

const emptyPrompts = [
  "What is NEXNS?",
  "Explain NEX and NS.",
  "How does Genesis work?",
  "Help me create a prediction signal.",
  "Analyze a market signal.",
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
  const [activeTab, setActiveTab] = useState<AiCenterTab>("copilot");
  const [modeOpen, setModeOpen] = useState(false);
  const [controlOpen, setControlOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState("");
  const [imageCopied, setImageCopied] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { connectedWallet } = useSolanaWallet();

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

  async function generateImage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const clean = imagePrompt.trim();
    if (!clean || isImageLoading) return;

    setImageError("");
    setImageUrl("");
    setImageCopied(false);
    setIsImageLoading(true);

    try {
      const response = await fetch("/api/ai/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: clean }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof body?.error === "string" ? body.error : "Image generation failed.");
      }

      if (typeof body?.imageUrl !== "string" || !body.imageUrl) {
        throw new Error("Image generation failed.");
      }

      setImageUrl(body.imageUrl);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Image generation failed.";
      setImageError(message);
    } finally {
      setIsImageLoading(false);
    }
  }

  async function copyImageUrl() {
    if (!imageUrl) return;
    await navigator.clipboard.writeText(imageUrl).catch(() => undefined);
    setImageCopied(true);
    window.setTimeout(() => setImageCopied(false), 1200);
  }

  return (
    <AppShell>
      <section className="mx-auto flex h-[calc(100vh-8.5rem)] min-h-[620px] w-full max-w-6xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/72 shadow-[0_0_60px_rgba(124,58,237,0.12)] backdrop-blur-xl max-md:h-[calc(100vh-7.2rem)] max-md:min-h-[560px]">
        <header className="shrink-0 border-b border-white/10 px-5 py-4 md:px-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="h-11 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-cyan via-violet-400 to-purple-700 shadow-[0_0_24px_rgba(0,229,255,0.24)]" />
              <div className="min-w-0">
                <h1 className="truncate text-xl font-black text-white md:text-2xl">NEXNS AI Copilot</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.12em]">
                  <span className="inline-flex items-center gap-2 text-cyan">
                    <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_14px_rgba(0,229,255,0.8)]" />
                    Online
                  </span>
                  <span className="text-slate-500">Powered by NEXNS Intelligence Layer</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="nexns-ai-scrollbar flex max-w-full overflow-x-auto rounded-full border border-white/10 bg-black/35 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("copilot")}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${activeTab === "copilot" ? "bg-white text-black" : "text-slate-500 hover:text-white"}`}
                >
                  Copilot
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("images")}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${activeTab === "images" ? "bg-white text-black" : "text-slate-500 hover:text-white"}`}
                >
                  Images
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("videos")}
                  className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition ${activeTab === "videos" ? "bg-white text-black" : "text-slate-500 hover:text-white"}`}
                >
                  Videos <span className="ml-1 text-[0.58rem] text-gold">Coming Soon</span>
                </button>
              </div>
              {activeTab === "copilot" && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setModeOpen((value) => !value)}
                  className="inline-flex min-w-40 items-center justify-between gap-3 rounded-full border border-cyan/20 bg-black/55 px-4 py-2 text-xs font-bold text-slate-100 shadow-[0_0_24px_rgba(0,229,255,0.08)] outline-none transition hover:border-cyan/45 hover:bg-cyan/10"
                  aria-haspopup="listbox"
                  aria-expanded={modeOpen}
                  aria-label="AI mode"
                >
                  <span>{mode}</span>
                  <ChevronDown className={`h-4 w-4 text-cyan transition ${modeOpen ? "rotate-180" : ""}`} />
                </button>
                {modeOpen && (
                  <div
                    className="nexns-ai-scrollbar absolute right-0 z-[80] mt-2 max-h-64 w-60 overflow-y-auto rounded-2xl border border-cyan/20 bg-slate-950/95 p-2 shadow-[0_22px_70px_rgba(0,0,0,0.46),0_0_34px_rgba(0,229,255,0.1)] backdrop-blur-xl"
                    role="listbox"
                  >
                    {chatModes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        role="option"
                        aria-selected={item === mode}
                        onClick={() => {
                          setMode(item);
                          setModeOpen(false);
                        }}
                        className={`w-full rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${
                          item === mode
                            ? "bg-cyan/14 text-cyan shadow-[inset_0_0_0_1px_rgba(0,229,255,0.22)]"
                            : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              )}
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
                  if (activeTab === "images") {
                    setImagePrompt("");
                    setImageUrl("");
                    setImageError("");
                    setImageCopied(false);
                  } else {
                    setMessages([]);
                    setError("");
                    setLastPrompt("");
                  }
                }}
                className="interactive-glow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200"
              >
                <Trash2 className="h-4 w-4 text-gold" />
                Clear
              </button>
            </div>
          </div>
        </header>

        <div ref={scrollRef} className="nexns-ai-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth px-5 py-6 md:px-10">
          {activeTab === "copilot" && (
            messages.length === 0 ? (
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
            )
          )}
          {activeTab === "images" && (
            <ImageStudio
              prompt={imagePrompt}
              setPrompt={setImagePrompt}
              imageUrl={imageUrl}
              error={imageError}
              copied={imageCopied}
              isLoading={isImageLoading}
              onGenerate={generateImage}
              onCopyImageUrl={() => void copyImageUrl()}
            />
          )}
          {activeTab === "videos" && <ComingSoonPanel title="NEXNS AI Video Studio" copy="Video generation is being prepared for future NEXNS AI Center releases." />}
        </div>

        {activeTab === "copilot" && (
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
              className="nexns-ai-scrollbar max-h-32 min-h-12 min-w-0 flex-1 resize-none bg-transparent px-4 py-3 leading-6 text-white outline-none placeholder:text-slate-500"
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
        )}
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

function ImageStudio({
  prompt,
  setPrompt,
  imageUrl,
  error,
  copied,
  isLoading,
  onGenerate,
  onCopyImageUrl,
}: {
  prompt: string;
  setPrompt: (value: string) => void;
  imageUrl: string;
  error: string;
  copied: boolean;
  isLoading: boolean;
  onGenerate: (event: FormEvent<HTMLFormElement>) => void;
  onCopyImageUrl: () => void;
}) {
  return (
    <div className="mx-auto grid min-h-full max-w-5xl content-center gap-6 py-4">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-cyan/15 bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:p-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-cyan">
            <ImageIcon className="h-4 w-4" />
            Image Studio
          </div>
          <h2 className="mt-5 text-3xl font-black leading-tight text-white md:text-5xl">NEXNS AI Image Studio</h2>
          <p className="mt-4 text-base leading-7 text-slate-300">Generate images with AI.</p>
          <form onSubmit={onGenerate} className="mt-6 grid gap-4">
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              rows={7}
              placeholder="Describe the image you want to generate..."
              className="nexns-ai-scrollbar min-h-44 resize-none rounded-3xl border border-white/10 bg-black/35 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan/35 focus:bg-black/50"
              aria-label="Image prompt"
            />
            {error && <div className="rounded-2xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-bold text-gold">{error}</div>}
            <button
              type="submit"
              disabled={!prompt.trim() || isLoading}
              className="purple-button interactive-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black uppercase tracking-[0.12em] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              {isLoading ? "Generating image..." : "Generate Image"}
            </button>
          </form>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/32 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:p-5">
          <div className="grid min-h-[420px] place-items-center overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/75">
            {isLoading ? (
              <div className="grid place-items-center gap-4 text-center">
                <Loader2 className="h-10 w-10 animate-spin text-cyan" />
                <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan">Generating image...</p>
              </div>
            ) : imageUrl ? (
              <img src={imageUrl} alt="Generated by NEXNS AI Image Studio" className="h-full max-h-[540px] w-full object-contain" />
            ) : (
              <div className="grid place-items-center gap-4 px-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-3xl border border-cyan/20 bg-cyan/10 text-cyan">
                  <ImageIcon className="h-8 w-8" />
                </span>
                <p className="max-w-sm text-sm leading-7 text-slate-400">Your generated image will appear here after the prompt is processed.</p>
              </div>
            )}
          </div>

          {imageUrl && (
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <a href={imageUrl} target="_blank" rel="noreferrer" className="interactive-glow inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-bold text-slate-100">
                <ExternalLink className="h-4 w-4 text-cyan" />
                Open Image
              </a>
              <button type="button" onClick={onCopyImageUrl} className="interactive-glow inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-bold text-slate-100">
                {copied ? <Check className="h-4 w-4 text-cyan" /> : <Copy className="h-4 w-4 text-cyan" />}
                {copied ? "Copied" : "Copy URL"}
              </button>
              <a href={imageUrl} download="nexns-ai-image.png" className="interactive-glow inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-bold text-slate-100">
                <Download className="h-4 w-4 text-cyan" />
                Download
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ComingSoonPanel({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="mx-auto grid min-h-full max-w-3xl place-items-center py-8 text-center">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl border border-gold/20 bg-gold/10 text-gold">
          <Sparkles className="h-8 w-8" />
        </span>
        <h2 className="mt-6 text-3xl font-black text-white">{title}</h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-8 text-slate-300">{copy}</p>
      </div>
    </div>
  );
}

function EmptyChat({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  return (
    <div className="mx-auto flex min-h-full max-w-4xl flex-col justify-center py-6">
      <div className="text-center">
        <div className="mx-auto grid h-28 w-28 place-items-center overflow-hidden rounded-[32px] border border-cyan/25 bg-[radial-gradient(circle_at_50%_25%,rgba(0,229,255,0.22),rgba(139,92,246,0.12),rgba(0,0,0,0.3))] shadow-[0_0_60px_rgba(0,229,255,0.12)] md:h-36 md:w-36">
          <Mascot variant="guiding" className="h-32 w-32 object-contain md:h-40 md:w-40" alt="NEXNS AI Copilot" />
        </div>
        <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-5xl">NEXNS AI Copilot</h2>
        <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-cyan">Your Intelligence Layer for the Global Prediction Growth Infrastructure</p>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
          Ask about NEXNS, Prediction Signals, Genesis, NEX, NS, Signal Creators, and Market Insights.
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
        <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-2xl border border-cyan/20 bg-cyan/10">
          <Mascot variant="thinking" className="h-12 w-12 object-contain" alt="NEXNS AI Copilot" />
        </span>
      )}
      <div className={`group min-w-0 ${isUser ? "max-w-[82%] rounded-[24px] bg-neon px-5 py-4 text-white" : "max-w-[88%] rounded-[24px] border border-white/10 bg-white/[0.045] px-5 py-4 text-slate-100 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"}`}>
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
