export type ProductWalletKey = "phantom" | "solflare" | "backpack";

export type ProductSolanaProvider = {
  isPhantom?: boolean;
  isSolflare?: boolean;
  isBackpack?: boolean;
  publicKey?: { toString: () => string } | null;
  connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey?: { toString: () => string } } | void>;
  disconnect?: () => Promise<void>;
  network?: string;
  cluster?: string;
};

export type ProductWalletOption = {
  key: ProductWalletKey;
  name: string;
  installUrl: string;
  description: string;
};

type WalletWindow = Window & {
  solana?: ProductSolanaProvider;
  phantom?: { solana?: ProductSolanaProvider };
  solflare?: ProductSolanaProvider;
};

export const SOLANA_MAINNET_RPC = "https://api.mainnet-beta.solana.com";
export const LAMPORTS_PER_SOL = 1_000_000_000;
export const PRODUCT_WALLET_SESSION_KEY = "nexns_product_wallet";

export const productWalletOptions: ProductWalletOption[] = [
  {
    key: "phantom",
    name: "Phantom",
    installUrl: "https://phantom.app/",
    description: "Connect with Phantom wallet on Solana.",
  },
  {
    key: "solflare",
    name: "Solflare",
    installUrl: "https://solflare.com/",
    description: "Connect with Solflare wallet on Solana.",
  },
  {
    key: "backpack",
    name: "Backpack",
    installUrl: "https://www.backpack.app/",
    description: "Connect with Backpack wallet on Solana.",
  },
];

export function getProductWalletProvider(walletKey: ProductWalletKey): ProductSolanaProvider | null {
  if (typeof window === "undefined") return null;
  const walletWindow = window as WalletWindow;

  if (walletKey === "phantom") {
    return walletWindow.phantom?.solana ?? (walletWindow.solana?.isPhantom ? walletWindow.solana : null);
  }

  if (walletKey === "solflare") {
    return walletWindow.solflare ?? (walletWindow.solana?.isSolflare ? walletWindow.solana : null);
  }

  return walletWindow.solana?.isBackpack ? walletWindow.solana : null;
}

export function shortenWalletAddress(address: string) {
  if (address.length <= 12) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function getMainnetWarning(provider: ProductSolanaProvider | null) {
  const network = `${provider?.network ?? ""} ${provider?.cluster ?? ""}`.toLowerCase();
  if (!network.trim()) return "";
  if (network.includes("mainnet")) return "";
  return "Please connect to Solana Mainnet.";
}

export async function readSolBalance(address: string) {
  const response = await fetch(SOLANA_MAINNET_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "nexns-product-wallet-balance",
      method: "getBalance",
      params: [address, { commitment: "confirmed" }],
    }),
  });

  if (!response.ok) throw new Error("Solana RPC unavailable.");
  const data = await response.json();
  if (data.error || typeof data.result?.value !== "number") throw new Error("Unable to read SOL balance.");
  return data.result.value / LAMPORTS_PER_SOL;
}
