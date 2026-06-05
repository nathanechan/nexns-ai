import { Bell, Bot, Coins, Wallet } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductState } from "../../state/productState";
import { ActivityFeed } from "./ActivityFeed";
import { GlassCard } from "./GlassCard";
import { PreviewModal } from "./PreviewModal";

export function HeaderWidgets({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const { activities, predictions } = useProductState();
  const pending = predictions.filter((prediction) => prediction.status === "pending").length;

  return (
    <div className="relative flex items-center justify-end gap-2">
      <GlassCard className={`flex items-center gap-2 border-white/8 bg-black/24 text-xs ${compact ? "px-2.5 py-2" : "px-3 py-2 sm:gap-4 sm:px-4 sm:py-2.5 sm:text-sm"}`}>
        <span className="flex items-center gap-2"><Coins className="h-4 w-4 text-amber-300" /> NEX $0.0248</span>
        {!compact && <span className="hidden text-mint sm:inline">+8.7%</span>}
      </GlassCard>
      <Link to="/companion" className={`${compact ? "interactive-glow grid h-10 w-10 place-items-center px-0 py-0" : "interactive-glow flex px-3 py-2.5 sm:px-4"} items-center gap-2 rounded-full border border-neon/20 bg-white/[0.04] text-xs font-semibold text-purple-100 transition hover:bg-neon/12 sm:text-sm`} aria-label="Open AI chat">
        <Bot className="h-4 w-4" />
        {!compact && "Chat"}
      </Link>
      <button
        type="button"
        onClick={() => setWalletOpen(true)}
        className={`interactive-glow flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/8 text-xs font-semibold text-cyan-100 transition hover:border-cyan/45 hover:bg-cyan/15 ${compact ? "px-3 py-2" : "px-3 py-2.5 sm:px-4 sm:text-sm"}`}
      >
        <Wallet className="h-4 w-4" />
        <span className={compact ? "hidden" : "hidden sm:inline"}>Connect Wallet</span>
        {!compact && <span className="sm:hidden">Wallet</span>}
      </button>
      <button onClick={() => setOpen((value) => !value)} className={`interactive-glow relative rounded-full border border-white/10 bg-white/[0.04] ${compact ? "hidden" : "p-2.5"}`}>
        <Bell className="h-5 w-5 text-slate-300" />
        <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-neon text-xs">{Math.min(9, activities.length + pending)}</span>
      </button>
      {open && <div className="absolute right-0 top-full z-50 mt-3 w-[min(380px,calc(100vw-2rem))]"><ActivityFeed /></div>}
      <PreviewModal
        open={walletOpen}
        title="Wallet Access"
        description="Wallet connection is displayed as a product entry point only. This preview does not connect a wallet, request signatures, transfer tokens, process payment, or initiate blockchain transactions."
        onClose={() => setWalletOpen(false)}
      >
        <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          {["View wallet status", "Review balances", "Prepare account access", "No chain action"].map((item) => (
            <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-3">
              {item}
            </div>
          ))}
        </div>
      </PreviewModal>
    </div>
  );
}
