import { ArrowLeft, Check, Copy, Loader2, RefreshCw, Send, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mascot } from "../components/ui/Mascot";
import { useSolanaWallet } from "../lib/wallet/SolanaWalletProvider";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const emptyPrompts = [
  "What is blockchain?",
  "Explain AI agents.",
  "What is happening in global markets?",
  "How do prediction markets work?",
  "Help me write a business plan.",
  "Translate Chinese to English.",
  "What are the latest AI trends?",
];

const chatSystemContext =
  "NEXNS Chat is a general AI assistant inside NEXNS. Answer normally across AI, technology, Web3, blockchain, crypto, economics, global markets, politics, business, marketing, research, writing, translation, education, productivity, coding, and general knowledge. Do not force NEXNS references. Discuss NEXNS, Genesis, NEX, NS, or prediction markets only when the user asks. Be natural, strategic, concise when appropriate, detailed when useful, and ask clarifying questions when helpful.";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { connectedWallet } = useSolanaWallet();
  const navigate = useNavigate();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
  }, [input]);

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
          pageContext: chatSystemContext,
          mode: "General AI assistant",
        }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(typeof body?.error === "string" ? body.error : "AI response failed.");
      }

      const answer = typeof body?.message === "string" ? body.message : "NEXNS Chat did not return a response.";
      setMessages((current) => [...current, createMessage("assistant", answer)]);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : "Unable to reach NEXNS Chat.";
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

  function goBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/app");
  }

  return (
    <main className="flex h-[100dvh] min-h-[520px] flex-col overflow-hidden bg-[#050507] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(0,229,255,0.08),transparent_28rem),radial-gradient(circle_at_80%_10%,rgba(124,58,237,0.12),transparent_30rem),linear-gradient(180deg,#050507,#08090d_44%,#020204)]" />

      <header className="relative z-10 shrink-0 border-b border-white/10 bg-[#050507]/88 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex h-12 max-w-5xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 text-sm font-semibold text-slate-200 transition hover:border-cyan/35 hover:bg-cyan/10 hover:text-white"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="min-w-0 text-center">
            <h1 className="truncate text-lg font-black text-white sm:text-xl">NEXNS Chat</h1>
          </div>
          <button
            type="button"
            onClick={() => {
              setMessages([]);
              setError("");
              setLastPrompt("");
            }}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.045] text-slate-300 transition hover:border-cyan/35 hover:bg-cyan/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Clear chat"
            disabled={messages.length === 0 && !error}
            title="Clear chat"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      <section ref={scrollRef} className="nexns-ai-scrollbar relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth px-4 py-6 sm:px-6">
        {messages.length === 0 ? (
          <EmptyChat onSelectPrompt={(prompt) => void sendPrompt(prompt)} />
        ) : (
          <div className="mx-auto grid max-w-5xl gap-5 pb-4">
            {messages.map((message) => (
              <ChatBubble key={message.id} role={message.role} text={message.content} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-3 pl-1 text-sm font-semibold text-cyan">
                <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full border border-cyan/20 bg-cyan/10">
                  <Mascot variant="thinking" className="h-9 w-9 object-contain" alt="NEXNS Chat" />
                </span>
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking
              </div>
            )}
          </div>
        )}
      </section>

      <footer className="relative z-10 shrink-0 border-t border-white/10 bg-[#050507]/92 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
        {error && (
          <div className="mx-auto mb-3 flex max-w-5xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#c8a96a]/25 bg-[#c8a96a]/10 px-4 py-3 text-sm font-semibold text-[#f0d38a]">
            <span>{error}</span>
            <button type="button" onClick={retryLastPrompt} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white">
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </button>
          </div>
        )}

        <form onSubmit={onSubmit} className="mx-auto flex max-w-5xl items-end gap-2 rounded-[24px] border border-white/10 bg-white/[0.055] p-2 shadow-[0_18px_70px_rgba(0,0,0,0.32)] focus-within:border-cyan/30 focus-within:bg-white/[0.07] sm:gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={1}
            placeholder="Ask anything."
            className="nexns-ai-scrollbar max-h-40 min-h-12 min-w-0 flex-1 resize-none bg-transparent px-3 py-3 text-[16px] leading-6 text-white outline-none placeholder:text-slate-500 sm:px-4 sm:text-base"
            aria-label="Ask NEXNS Chat"
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
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white text-black shadow-[0_0_26px_rgba(255,255,255,0.1)] transition hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-45"
            aria-label="Send message"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </form>
        <p className="mx-auto mt-2 max-w-5xl px-1 text-xs leading-5 text-slate-500">
          NEXNS Chat can make mistakes. For financial, legal, medical, or time-sensitive decisions, verify important information.
        </p>
      </footer>
    </main>
  );
}

function EmptyChat({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  return (
    <div className="mx-auto flex min-h-full max-w-5xl flex-col justify-center py-8">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center overflow-hidden rounded-2xl border border-cyan/20 bg-cyan/10 shadow-[0_0_34px_rgba(0,229,255,0.1)]">
          <Mascot variant="thinking" className="h-[4.5rem] w-[4.5rem] object-contain" alt="NEXNS Chat" />
        </div>
        <h2 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl">NEXNS Chat</h2>
        <p className="mt-3 text-lg font-medium text-slate-400">Ask anything.</p>
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {emptyPrompts.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onSelectPrompt(question)}
            className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left text-sm font-semibold leading-6 text-slate-100 transition hover:border-cyan/35 hover:bg-cyan/10"
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
    <div className={`flex gap-3 sm:gap-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full border border-cyan/20 bg-cyan/10 sm:h-9 sm:w-9">
          <Mascot variant="thinking" className="h-9 w-9 object-contain sm:h-10 sm:w-10" alt="NEXNS Chat" />
        </span>
      )}
      <div
        className={`group min-w-0 text-[15px] leading-7 sm:text-base ${
          isUser
            ? "max-w-[88%] rounded-[22px] bg-white px-4 py-3 text-black sm:max-w-[76%] sm:px-5 sm:py-4"
            : "max-w-[92%] rounded-[22px] border border-white/10 bg-white/[0.055] px-4 py-3 text-slate-100 shadow-[0_18px_60px_rgba(0,0,0,0.18)] sm:max-w-[82%] sm:px-5 sm:py-4"
        }`}
      >
        <div className="whitespace-pre-wrap break-words">{text}</div>
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
