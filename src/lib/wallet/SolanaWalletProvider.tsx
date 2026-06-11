import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
import {
  PRODUCT_WALLET_SESSION_KEY,
  getMainnetWarning,
  getProductWalletProvider,
  productWalletOptions,
  readSolBalance,
  type ProductWalletKey,
  type ProductWalletOption,
} from "./solanaWallet";

type ConnectedProductWallet = {
  key: ProductWalletKey;
  name: string;
  address: string;
};

type StoredProductWallet = {
  key: ProductWalletKey;
  address: string;
};

type SolanaWalletContextValue = {
  connectedWallet: ConnectedProductWallet | null;
  balance: number | null;
  isConnecting: ProductWalletKey | null;
  isBalanceLoading: boolean;
  walletMessage: string;
  networkWarning: string;
  walletOptions: ProductWalletOption[];
  connectWallet: (wallet: ProductWalletOption) => Promise<boolean>;
  disconnectWallet: () => Promise<void>;
  refreshBalance: () => Promise<void>;
};

const SolanaWalletContext = createContext<SolanaWalletContextValue | null>(null);

function readStoredWallet(): StoredProductWallet | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(PRODUCT_WALLET_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredProductWallet;
    if (!parsed.key || !parsed.address) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredWallet(wallet: ConnectedProductWallet | null) {
  if (typeof window === "undefined") return;

  if (!wallet) {
    window.sessionStorage.removeItem(PRODUCT_WALLET_SESSION_KEY);
    return;
  }

  window.sessionStorage.setItem(
    PRODUCT_WALLET_SESSION_KEY,
    JSON.stringify({
      key: wallet.key,
      address: wallet.address,
    }),
  );
}

export function SolanaWalletProvider({ children }: PropsWithChildren) {
  const [connectedWallet, setConnectedWallet] = useState<ConnectedProductWallet | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState<ProductWalletKey | null>(null);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const [walletMessage, setWalletMessage] = useState("");
  const [networkWarning, setNetworkWarning] = useState("");

  async function refreshBalance(address = connectedWallet?.address) {
    if (!address) return;

    setIsBalanceLoading(true);
    try {
      const nextBalance = await readSolBalance(address);
      setBalance(nextBalance);
    } catch {
      setWalletMessage("Balance loading failed. Please try again.");
      setBalance(null);
    } finally {
      setIsBalanceLoading(false);
    }
  }

  async function connectWallet(wallet: ProductWalletOption) {
    const provider = getProductWalletProvider(wallet.key);
    setWalletMessage("");

    if (!provider) {
      setWalletMessage("Wallet not detected. Please install a supported Solana wallet.");
      return false;
    }

    setIsConnecting(wallet.key);
    try {
      const response = await provider.connect();
      const publicKey = response?.publicKey ?? provider.publicKey;
      const address = publicKey?.toString();
      if (!address) {
        setWalletMessage("Wallet connection did not return a public address.");
        return false;
      }

      const nextWallet = { key: wallet.key, name: wallet.name, address };
      setConnectedWallet(nextWallet);
      writeStoredWallet(nextWallet);
      setNetworkWarning(getMainnetWarning(provider));
      await refreshBalance(address);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Wallet connection failed.";
      setWalletMessage(/reject|cancel|denied/i.test(message) ? "User rejected connection." : "Wallet connection failed.");
      return false;
    } finally {
      setIsConnecting(null);
    }
  }

  async function disconnectWallet() {
    if (connectedWallet) {
      const provider = getProductWalletProvider(connectedWallet.key);
      await provider?.disconnect?.().catch(() => undefined);
    }

    setConnectedWallet(null);
    setBalance(null);
    setWalletMessage("");
    setNetworkWarning("");
    writeStoredWallet(null);
  }

  useEffect(() => {
    const stored = readStoredWallet();
    if (!stored) return;

    const wallet = productWalletOptions.find((item) => item.key === stored.key);
    if (!wallet) return;

    const provider = getProductWalletProvider(wallet.key);
    if (!provider) {
      setConnectedWallet({ key: wallet.key, name: wallet.name, address: stored.address });
      setWalletMessage("Wallet provider is not currently detected.");
      return;
    }

    void (async () => {
      try {
        const response = await provider.connect({ onlyIfTrusted: true });
        const address = response?.publicKey?.toString() ?? provider.publicKey?.toString() ?? stored.address;
        const nextWallet = { key: wallet.key, name: wallet.name, address };
        setConnectedWallet(nextWallet);
        writeStoredWallet(nextWallet);
        setNetworkWarning(getMainnetWarning(provider));
        await refreshBalance(address);
      } catch {
        setConnectedWallet({ key: wallet.key, name: wallet.name, address: stored.address });
        await refreshBalance(stored.address);
      }
    })();
  }, []);

  const value = useMemo<SolanaWalletContextValue>(
    () => ({
      connectedWallet,
      balance,
      isConnecting,
      isBalanceLoading,
      walletMessage,
      networkWarning,
      walletOptions: productWalletOptions,
      connectWallet,
      disconnectWallet,
      refreshBalance: () => refreshBalance(),
    }),
    [balance, connectedWallet, isBalanceLoading, isConnecting, networkWarning, walletMessage],
  );

  return <SolanaWalletContext.Provider value={value}>{children}</SolanaWalletContext.Provider>;
}

export function useSolanaWallet() {
  const context = useContext(SolanaWalletContext);
  if (!context) throw new Error("useSolanaWallet must be used inside SolanaWalletProvider.");
  return context;
}
