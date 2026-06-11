import { ExternalLink, Loader2, LogOut, RefreshCw, Wallet, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSolanaWallet } from "../../lib/wallet/SolanaWalletProvider";
import { getProductWalletProvider, shortenWalletAddress, type ProductWalletOption } from "../../lib/wallet/solanaWallet";

function formatSol(value: number | null) {
  if (value === null) return "Balance unavailable";
  return `${value.toLocaleString("en-US", { maximumFractionDigits: 4 })} SOL`;
}

export function ProductWalletButton({ compact = false }: { compact?: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { connectedWallet, balance, isBalanceLoading, networkWarning } = useSolanaWallet();

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className={`interactive-glow flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/8 text-xs font-semibold text-cyan-100 transition hover:border-cyan/45 hover:bg-cyan/15 ${
          compact ? "px-3 py-2" : "px-3 py-2.5 sm:px-4 sm:text-sm"
        }`}
      >
        <Wallet className="h-4 w-4" />
        {connectedWallet ? (
          <span className={compact ? "hidden" : "hidden sm:inline"}>{shortenWalletAddress(connectedWallet.address)}</span>
        ) : (
          <span className={compact ? "hidden" : "hidden sm:inline"}>Connect Wallet</span>
        )}
        {!compact && <span className="sm:hidden">{connectedWallet ? "Wallet" : "Connect"}</span>}
        {connectedWallet && !compact && (
          <span className="hidden rounded-full bg-cyan/10 px-2 py-1 font-mono text-[0.65rem] text-cyan sm:inline">
            {isBalanceLoading ? "Reading" : formatSol(balance)}
          </span>
        )}
      </button>

      {modalOpen && <ProductWalletModal onClose={() => setModalOpen(false)} />}
      {networkWarning && !compact && <span className="hidden text-xs font-bold text-gold 2xl:inline">{networkWarning}</span>}
    </>
  );
}

export function ProductWalletModal({
  onClose,
  title = "Solana wallet access",
  label = "Product Wallet",
  closeOnConnect = false,
}: {
  onClose: () => void;
  title?: string;
  label?: string;
  closeOnConnect?: boolean;
}) {
  const {
    connectedWallet,
    balance,
    isBalanceLoading,
    walletMessage,
    networkWarning,
    walletOptions,
    isConnecting,
    connectWallet,
    disconnectWallet,
    refreshBalance,
  } = useSolanaWallet();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const modal = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-6 backdrop-blur-xl"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="max-h-[calc(100vh-48px)] w-full max-w-lg overflow-y-auto rounded-[28px] border border-white/10 bg-[#05070d] shadow-[0_32px_120px_rgba(0,0,0,0.75)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <div className="nex-label">{label}</div>
            <h2 className="mt-2 text-2xl font-black text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Connect Phantom, Solflare, or Backpack for product identity and SOL balance. No payment or transaction is triggered here.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition hover:text-white"
            aria-label="Close wallet selector"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {connectedWallet ? (
          <div className="grid gap-4 p-6">
            <div className="rounded-[24px] border border-cyan/20 bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(139,92,246,0.08))] p-5 shadow-[0_20px_70px_rgba(0,229,255,0.08)]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan">Connected</div>
                <div className="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-xs font-bold text-slate-200">
                  {connectedWallet.name}
                </div>
              </div>
              <div className="mt-4 font-mono text-3xl font-black text-white">{shortenWalletAddress(connectedWallet.address)}</div>
              <div className="mt-2 break-all font-mono text-xs text-slate-500">{connectedWallet.address}</div>
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-4">
                <div className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-slate-400">SOL Balance</div>
                <div className="mt-2 font-mono text-2xl font-black text-cyan">{isBalanceLoading ? "Reading..." : formatSol(balance)}</div>
              </div>
              {networkWarning && <div className="mt-3 rounded-xl border border-gold/20 bg-gold/10 p-3 text-sm font-bold text-gold">{networkWarning}</div>}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void refreshBalance()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan/40"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isBalanceLoading ? "animate-spin" : ""}`} />
                Refresh Balance
              </button>
              <button
                type="button"
                onClick={() => void disconnectWallet()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-gold/40 hover:text-gold"
              >
                <LogOut className="h-3.5 w-3.5" />
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 p-6">
            {walletOptions.map((wallet) => (
              <WalletOptionRow
                key={wallet.key}
                wallet={wallet}
                isConnecting={isConnecting === wallet.key}
                onConnect={async () => {
                  const connected = await connectWallet(wallet);
                  if (connected && closeOnConnect) onClose();
                }}
              />
            ))}
          </div>
        )}

        <div className="border-t border-white/10 px-6 py-4 text-xs leading-6 text-slate-500">
          NEXNS never requests private keys, seed phrases, recovery phrases, or manual key entry.
        </div>
        {walletMessage && <div className="border-t border-gold/20 bg-gold/10 px-6 py-4 text-sm font-bold text-gold">{walletMessage}</div>}
      </div>
    </div>
  );

  if (typeof document === "undefined") return modal;
  return createPortal(modal, document.body);
}

function WalletOptionRow({
  wallet,
  isConnecting,
  onConnect,
}: {
  wallet: ProductWalletOption;
  isConnecting: boolean;
  onConnect: () => void | Promise<void>;
}) {
  const isInstalled = Boolean(getProductWalletProvider(wallet.key));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-lg font-black text-white">{wallet.name}</div>
          <div className="mt-1 text-sm leading-6 text-slate-400">{wallet.description}</div>
          <div className={`mt-2 text-xs font-bold ${isInstalled ? "text-cyan" : "text-gold"}`}>
            {isInstalled ? "Detected" : "Wallet not detected. Please install a supported Solana wallet."}
          </div>
        </div>

        {isInstalled ? (
          <button
            type="button"
            onClick={onConnect}
            disabled={isConnecting}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isConnecting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Connect
          </button>
        ) : (
          <a
            href={wallet.installUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan/40"
          >
            Install <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
