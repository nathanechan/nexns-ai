import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Copy,
  ExternalLink,
  Loader2,
  LockKeyhole,
  LogOut,
  Network,
  RefreshCw,
  Send,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { GlassCard } from "../../components/ui/GlassCard";
import {
  fetchGenesisAnalyticsContributions,
  fetchGenesisContributions,
  isGenesisSupabaseConfigured,
  syncGenesisContribution,
  type GenesisContributionRecord,
  type GenesisPublicAnalytics,
  type GenesisTopContributor,
} from "./genesisSupabase";

const GENESIS_POOL = 100_000_000;

const genesisMetrics = [
  ["Genesis Allocation Pool", "100,000,000 NEX"],
  ["Genesis Capacity", "100,000 SOL"],
  ["Duration", "270 Days"],
  ["Minimum Contribution", "1 SOL"],
  ["Network", "Solana Mainnet"],
  ["NS Credits", "1:1 Locked NS"],
];

const timeline = [
  "Genesis Event",
  "Network Formation",
  "Prediction Activation",
  "NS Participation Layer",
  "TGE",
  "Global Growth Network",
];

const restrictedJurisdictions = [
  "United States",
  "Mainland China",
  "Canada",
  "North Korea",
  "Iran",
  "Syria",
  "Cuba",
  "Russia",
  "Belarus",
  "Crimea",
  "Donetsk",
  "Luhansk",
];

const confirmations = [
  "I confirm that I am not located in a restricted jurisdiction.",
  "I understand that NEX is not yet live.",
  "I understand that Genesis participation represents future allocation rights only.",
  "I understand that participation involves risk and does not guarantee future value, liquidity, or profits.",
];

const faqs = [
  [
    "What is NEX Genesis Event?",
    "NEX Genesis Event is the first public participation event of the NEXNS Network and the initial formation layer for Global Prediction Growth Infrastructure.",
  ],
  [
    "Is this a token sale?",
    "Genesis is a future network allocation event. NEX is not yet live, and participation represents future allocation rights rather than immediate token delivery.",
  ],
  [
    "Why does Genesis not have a fixed token price?",
    "Genesis uses collective allocation rather than a fixed token price. Final allocation depends on each participant's verified share of total Genesis contributions after Genesis concludes.",
  ],
  [
    "Why use collective allocation instead of a presale price?",
    "Collective allocation avoids setting a speculative pre-network price. It aligns participants around verified contribution share, network formation, and post-Genesis finalization.",
  ],
  [
    "How is my NEX allocation calculated?",
    "Final NEX allocation equals user contribution divided by total Genesis contribution, multiplied by the 100,000,000 NEX Genesis Allocation Pool.",
  ],
  [
    "What makes NS different from NEX?",
    "NEX is the economic layer of NEXNS. NS represents the participation layer. Genesis participants receive locked NS credits on a 1:1 basis with final NEX allocations, pending future activation through participation, governance, prediction activity, and ecosystem contribution.",
  ],
  [
    "Why is Genesis limited to 100,000 SOL?",
    "The hard cap creates a defined participation boundary for the first Genesis phase and prevents the event from expanding beyond the intended formation capacity.",
  ],
  [
    "When will NEX be distributed?",
    "Distribution is expected after Genesis closes, allocation is calculated, audit is completed, and TGE is announced.",
  ],
  [
    "What happens after Genesis concludes?",
    "After Genesis concludes, verified contribution records are finalized, allocation calculations are completed, Genesis records are reviewed, and the network proceeds toward TGE and future NS participation activation.",
  ],
  [
    "What happens if Genesis reaches 100,000 SOL?",
    "Genesis closes when the 100,000 SOL hard cap is reached, even if the full 270-day duration has not elapsed.",
  ],
  [
    "What happens if 270 days pass before reaching 100,000 SOL?",
    "Genesis closes after 270 days even if the hard cap has not been reached. Final allocations are then calculated from total Genesis contribution.",
  ],
  [
    "Can participants from restricted jurisdictions join?",
    "No. Participation is not available to persons or entities located in restricted jurisdictions, including the listed jurisdictions on this page.",
  ],
  [
    "Is participation guaranteed to create future value?",
    "No. Participation involves technical, market, regulatory, and network risks. No future value, liquidity, exchange listing, or profit is guaranteed.",
  ],
];

const scenarios = [10_000, 50_000, 100_000];

const SOLANA_MAINNET_RPC = "https://api.mainnet-beta.solana.com";
const GENESIS_TREASURY_WALLET = "Hei64jtQJLuxZ3dRCkmALqD4gdWAyCyA76wpxmWBrWTy";
const GENESIS_LOCAL_STORAGE_KEY = "nexns_genesis_contributions";
const GENESIS_HARD_CAP_SOL = 100_000;
const GENESIS_DURATION_DAYS = 270;
const GENESIS_START_DATE = import.meta.env.VITE_GENESIS_START_DATE ?? "";
const SYSTEM_PROGRAM_ID = "11111111111111111111111111111111";
const LAMPORTS_PER_SOL = 1_000_000_000;
const ESTIMATED_NETWORK_FEE_SOL = 0.000005;
const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

type WalletKey = "phantom" | "solflare" | "backpack";

type SolanaProvider = {
  isPhantom?: boolean;
  isSolflare?: boolean;
  isBackpack?: boolean;
  publicKey?: { toString: () => string } | null;
  connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey?: { toString: () => string } } | void>;
  disconnect?: () => Promise<void>;
  signTransaction?: (transaction: GenesisSolanaTransaction) => Promise<GenesisSolanaTransaction>;
  signAndSendTransaction?: (transaction: GenesisSolanaTransaction) => Promise<{ signature?: string } | string>;
  on?: (event: string, callback: (...args: unknown[]) => void) => void;
  off?: (event: string, callback: (...args: unknown[]) => void) => void;
  network?: string;
  cluster?: string;
  connection?: { rpcEndpoint?: string };
  _network?: string;
};

type WalletOption = {
  key: WalletKey;
  name: string;
  installUrl: string;
  description: string;
};

type ConnectedWallet = {
  key: WalletKey;
  name: string;
  address: string;
};

type RpcBlockhash = {
  blockhash: string;
  lastValidBlockHeight: number;
};

type ContributionReceipt = {
  signature: string;
  amount: number;
  walletAddress: string;
  time: string;
  status: "Confirmed";
};

type TransactionStatus = "idle" | "review" | "preparing" | "signing" | "broadcasting" | "confirming" | "recording" | "success" | "failed";

declare global {
  interface Window {
    solana?: SolanaProvider;
    phantom?: { solana?: SolanaProvider };
    solflare?: SolanaProvider;
    backpack?: SolanaProvider | { solana?: SolanaProvider };
  }
}

const walletOptions: WalletOption[] = [
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

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

function estimateAllocation(contribution: number, totalContribution: number) {
  if (!Number.isFinite(contribution) || contribution <= 0) return 0;
  if (!Number.isFinite(totalContribution) || totalContribution <= 0) return 0;
  return (contribution / totalContribution) * GENESIS_POOL;
}

function readGenesisContributionRecords() {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(GENESIS_LOCAL_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored) as GenesisContributionRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeGenesisContributionRecords(records: GenesisContributionRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GENESIS_LOCAL_STORAGE_KEY, JSON.stringify(records));
}

function getWalletRecords(records: GenesisContributionRecord[], walletAddress?: string) {
  if (!walletAddress) return [];
  return records.filter((record) => record.walletAddress === walletAddress);
}

function sumContributions(records: GenesisContributionRecord[]) {
  return records.reduce((sum, record) => sum + record.contributionAmountSOL, 0);
}

function getUniqueParticipantCount(records: GenesisContributionRecord[]) {
  return new Set(records.map((record) => record.walletAddress)).size;
}

function getDaysRemaining() {
  if (!GENESIS_START_DATE) return null;
  const start = new Date(GENESIS_START_DATE);
  if (Number.isNaN(start.getTime())) return null;
  const end = start.getTime() + GENESIS_DURATION_DAYS * 24 * 60 * 60 * 1000;
  return Math.max(Math.ceil((end - Date.now()) / (24 * 60 * 60 * 1000)), 0);
}

function getEstimatedAllocationRate(totalRaisedSOL: number) {
  if (totalRaisedSOL <= 0) return null;
  return GENESIS_POOL / totalRaisedSOL;
}

function getEstimatedNexPrice(totalRaisedSOL: number) {
  if (totalRaisedSOL <= 0) return null;
  return totalRaisedSOL / GENESIS_POOL;
}

function getTopContributors(records: GenesisContributionRecord[]) {
  const totals = new Map<string, { walletAddress: string; totalSOL: number; estimatedNEX: number; count: number }>();

  for (const record of records) {
    const existing = totals.get(record.walletAddress) ?? {
      walletAddress: record.walletAddress,
      totalSOL: 0,
      estimatedNEX: 0,
      count: 0,
    };
    existing.totalSOL += record.contributionAmountSOL;
    existing.estimatedNEX += record.estimatedNEXAllocation;
    existing.count += 1;
    totals.set(record.walletAddress, existing);
  }

  return Array.from(totals.values())
    .sort((first, second) => second.totalSOL - first.totalSOL)
    .slice(0, 10);
}

function mergeContributionRecords(records: GenesisContributionRecord[]) {
  const bySignature = new Map<string, GenesisContributionRecord>();
  for (const record of records) {
    bySignature.set(record.transactionSignature, record);
  }
  return Array.from(bySignature.values()).sort(
    (first, second) => new Date(second.timestamp).getTime() - new Date(first.timestamp).getTime(),
  );
}

function encodeBase58(bytes: Uint8Array) {
  if (bytes.length === 0) return "";
  const digits = [0];

  for (const byte of bytes) {
    let carry = byte;
    for (let index = 0; index < digits.length; index += 1) {
      const value = digits[index] * 256 + carry;
      digits[index] = value % 58;
      carry = Math.floor(value / 58);
    }
    while (carry > 0) {
      digits.push(carry % 58);
      carry = Math.floor(carry / 58);
    }
  }

  let output = "";
  for (const byte of bytes) {
    if (byte !== 0) break;
    output += BASE58_ALPHABET[0];
  }

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    output += BASE58_ALPHABET[digits[index]];
  }

  return output;
}

function decodeBase58(value: string) {
  if (!value) throw new Error("Invalid base58 value.");
  const bytes = [0];

  for (const character of value) {
    const carryIndex = BASE58_ALPHABET.indexOf(character);
    if (carryIndex < 0) throw new Error("Invalid base58 character.");
    let carry = carryIndex;

    for (let index = 0; index < bytes.length; index += 1) {
      const next = bytes[index] * 58 + carry;
      bytes[index] = next & 0xff;
      carry = next >> 8;
    }

    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }

  for (const character of value) {
    if (character !== BASE58_ALPHABET[0]) break;
    bytes.push(0);
  }

  return new Uint8Array(bytes.reverse());
}

function encodeCompactLength(length: number) {
  const output: number[] = [];
  let remaining = length;

  while (true) {
    let element = remaining & 0x7f;
    remaining >>= 7;
    if (remaining === 0) {
      output.push(element);
      break;
    }
    element |= 0x80;
    output.push(element);
  }

  return output;
}

function encodeU64(value: bigint) {
  const output = new Uint8Array(8);
  let remaining = value;
  for (let index = 0; index < 8; index += 1) {
    output[index] = Number(remaining & 0xffn);
    remaining >>= 8n;
  }
  return output;
}

function concatBytes(parts: Uint8Array[]) {
  const totalLength = parts.reduce((sum, item) => sum + item.length, 0);
  const output = new Uint8Array(totalLength);
  let offset = 0;
  for (const item of parts) {
    output.set(item, offset);
    offset += item.length;
  }
  return output;
}

class GenesisPublicKey {
  private readonly bytes: Uint8Array;

  constructor(value: string | Uint8Array) {
    this.bytes = typeof value === "string" ? decodeBase58(value) : value;
    if (this.bytes.length !== 32) throw new Error("Invalid Solana public key.");
  }

  toBytes() {
    return new Uint8Array(this.bytes);
  }

  toBuffer() {
    return this.toBytes();
  }

  toString() {
    return encodeBase58(this.bytes);
  }
}

class GenesisSolanaTransaction {
  feePayer: GenesisPublicKey;
  recentBlockhash: string;
  signatures: Array<{ publicKey: GenesisPublicKey; signature: Uint8Array | null }>;
  private readonly destination: GenesisPublicKey;
  private readonly lamports: bigint;

  constructor({
    from,
    to,
    lamports,
    recentBlockhash,
  }: {
    from: string;
    to: string;
    lamports: bigint;
    recentBlockhash: string;
  }) {
    this.feePayer = new GenesisPublicKey(from);
    this.destination = new GenesisPublicKey(to);
    this.lamports = lamports;
    this.recentBlockhash = recentBlockhash;
    this.signatures = [{ publicKey: this.feePayer, signature: null }];
  }

  serializeMessage() {
    const accountKeys = [
      this.feePayer.toBytes(),
      this.destination.toBytes(),
      new GenesisPublicKey(SYSTEM_PROGRAM_ID).toBytes(),
    ];
    const transferInstruction = concatBytes([
      new Uint8Array([2, 0, 0, 0]),
      encodeU64(this.lamports),
    ]);

    return concatBytes([
      new Uint8Array([1, 0, 1]),
      new Uint8Array(encodeCompactLength(accountKeys.length)),
      ...accountKeys,
      decodeBase58(this.recentBlockhash),
      new Uint8Array(encodeCompactLength(1)),
      new Uint8Array([2]),
      new Uint8Array(encodeCompactLength(2)),
      new Uint8Array([0, 1]),
      new Uint8Array(encodeCompactLength(transferInstruction.length)),
      transferInstruction,
    ]);
  }

  addSignature(publicKey: GenesisPublicKey | { toString: () => string }, signature: Uint8Array) {
    const key = publicKey.toString();
    const index = this.signatures.findIndex((item) => item.publicKey.toString() === key);
    if (index >= 0) this.signatures[index].signature = signature;
  }

  serialize() {
    const signature = this.signatures[0]?.signature;
    if (!signature) throw new Error("Transaction has not been signed.");
    return concatBytes([
      new Uint8Array(encodeCompactLength(1)),
      signature,
      this.serializeMessage(),
    ]);
  }
}

function getWalletProvider(walletKey: WalletKey): SolanaProvider | null {
  if (typeof window === "undefined") return null;

  if (walletKey === "phantom") {
    return window.phantom?.solana ?? (window.solana?.isPhantom ? window.solana : null);
  }

  if (walletKey === "solflare") {
    return window.solflare ?? (window.solana?.isSolflare ? window.solana : null);
  }

  const backpack = window.backpack;
  if (backpack && "solana" in backpack && backpack.solana) return backpack.solana;
  if (backpack && "connect" in backpack) return backpack;
  return window.solana?.isBackpack ? window.solana : null;
}

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

function detectUnsupportedNetwork(provider: SolanaProvider | null) {
  if (!provider) return false;
  const networkValue = [
    provider.network,
    provider.cluster,
    provider._network,
    provider.connection?.rpcEndpoint,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (!networkValue) return false;
  return !networkValue.includes("mainnet");
}

async function fetchSolBalance(address: string) {
  const response = await fetch(SOLANA_MAINNET_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "nexns-genesis-balance",
      method: "getBalance",
      params: [address],
    }),
  });

  if (!response.ok) throw new Error("Unable to read SOL balance.");
  const data = (await response.json()) as { result?: { value?: number }; error?: unknown };
  if (data.error || typeof data.result?.value !== "number") throw new Error("Unable to read SOL balance.");
  return data.result.value / 1_000_000_000;
}

async function callSolanaRpc<T>(method: string, params: unknown[] = []) {
  const response = await fetch(SOLANA_MAINNET_RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: `nexns-genesis-${method}`,
      method,
      params,
    }),
  });

  if (!response.ok) throw new Error("Solana Mainnet RPC is unavailable.");
  const data = (await response.json()) as { result?: T; error?: { message?: string } };
  if (data.error || data.result === undefined) throw new Error(data.error?.message ?? "Solana RPC request failed.");
  return data.result;
}

async function getLatestBlockhash() {
  const result = await callSolanaRpc<{ value: RpcBlockhash }>("getLatestBlockhash", [{ commitment: "confirmed" }]);
  return result.value;
}

async function sendRawTransaction(rawTransaction: Uint8Array) {
  return callSolanaRpc<string>("sendRawTransaction", [
    encodeBase64(rawTransaction),
    {
      encoding: "base64",
      skipPreflight: false,
      preflightCommitment: "confirmed",
    },
  ]);
}

async function confirmSignature(signature: string, lastValidBlockHeight: number) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < 90_000) {
    const status = await callSolanaRpc<{
      value: Array<{ confirmationStatus?: string; err?: unknown } | null>;
    }>("getSignatureStatuses", [[signature], { searchTransactionHistory: true }]);
    const transactionStatus = status.value[0];

    if (transactionStatus?.err) throw new Error("Transaction failed on-chain.");
    if (transactionStatus?.confirmationStatus === "confirmed" || transactionStatus?.confirmationStatus === "finalized") {
      return;
    }

    const blockHeight = await callSolanaRpc<number>("getBlockHeight", [{ commitment: "confirmed" }]);
    if (blockHeight > lastValidBlockHeight) throw new Error("Transaction timeout.");
    await new Promise((resolve) => window.setTimeout(resolve, 1800));
  }

  throw new Error("Transaction timeout.");
}

function encodeBase64(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return window.btoa(binary);
}

function parseContributionAmount(value: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return 0;
  return parsed;
}

function solToLamports(value: number) {
  return BigInt(Math.round(value * LAMPORTS_PER_SOL));
}

export function GenesisPage() {
  const [solAmount, setSolAmount] = useState("1");
  const [openFaq, setOpenFaq] = useState(0);
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<ConnectedWallet | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [walletMessage, setWalletMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState<WalletKey | null>(null);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);
  const [networkWarning, setNetworkWarning] = useState("");
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>("idle");
  const [transactionError, setTransactionError] = useState("");
  const [receipt, setReceipt] = useState<ContributionReceipt | null>(null);
  const [contributionRecords, setContributionRecords] = useState<GenesisContributionRecord[]>(() => readGenesisContributionRecords());
  const [databaseMessage, setDatabaseMessage] = useState(
    isGenesisSupabaseConfigured()
      ? "Genesis database sync is available."
      : "Genesis database is not configured. Local records are being used.",
  );
  const [databaseSource, setDatabaseSource] = useState<"supabase" | "local" | "unconfigured" | "error">(
    isGenesisSupabaseConfigured() ? "local" : "unconfigured",
  );
  const [isDatabaseLoading, setIsDatabaseLoading] = useState(false);
  const [analyticsRecords, setAnalyticsRecords] = useState<GenesisContributionRecord[]>(() => readGenesisContributionRecords());
  const [analyticsMessage, setAnalyticsMessage] = useState(
    isGenesisSupabaseConfigured()
      ? "Genesis analytics are ready to load."
      : "Genesis cloud analytics are not configured. Local contribution records may still be visible.",
  );
  const [analyticsSource, setAnalyticsSource] = useState<"supabase" | "local" | "unconfigured" | "error">(
    isGenesisSupabaseConfigured() ? "local" : "unconfigured",
  );
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);
  const [analyticsSummary, setAnalyticsSummary] = useState<GenesisPublicAnalytics | null>(null);
  const contribution = parseContributionAmount(solAmount);
  const validContribution = Number.isFinite(contribution) && contribution >= 1 ? contribution : 0;

  const activeProvider = connectedWallet ? getWalletProvider(connectedWallet.key) : null;
  const canReviewContribution = Boolean(connectedWallet && validContribution >= 1 && !networkWarning);
  const analyticsTotalSOL = analyticsSummary?.totalRaisedSOL ?? sumContributions(analyticsRecords);
  const estimatedPublicTotalSOL = Math.max(analyticsTotalSOL, 0);
  const estimatedContributionTotalSOL = Math.max(estimatedPublicTotalSOL + validContribution, 1);
  const primaryScenario = useMemo(
    () => estimateAllocation(validContribution, estimatedContributionTotalSOL),
    [estimatedContributionTotalSOL, validContribution],
  );
  const allocationShare = validContribution > 0 ? (validContribution / estimatedContributionTotalSOL) * 100 : 0;
  const walletRecords = useMemo(
    () => getWalletRecords(contributionRecords, connectedWallet?.address),
    [connectedWallet?.address, contributionRecords],
  );
  const walletTotalSOL = useMemo(() => sumContributions(walletRecords), [walletRecords]);
  const walletEstimatedNEX = useMemo(
    () => estimateAllocation(walletTotalSOL, estimatedPublicTotalSOL),
    [estimatedPublicTotalSOL, walletTotalSOL],
  );
  const latestContributions = analyticsSummary?.latestContributions ?? analyticsRecords.slice(0, 10);
  const topContributors = analyticsSummary?.topContributors ?? getTopContributors(analyticsRecords);
  const daysRemaining = getDaysRemaining();
  const allocationRate = analyticsSummary?.allocationRate ?? getEstimatedAllocationRate(analyticsTotalSOL);
  const estimatedNexPrice = analyticsSummary?.estimatedNexPrice ?? getEstimatedNexPrice(analyticsTotalSOL);
  const publicMetrics = useMemo<Array<[string, string, string]>>(
    () => [
      ["Total SOL Raised", `${formatNumber(analyticsTotalSOL)} SOL`, "Verified Contributions"],
      ["Total Participants", `${analyticsSummary?.participants ?? getUniqueParticipantCount(analyticsRecords)}`, "Unique Wallets"],
      ["Genesis Progress", `${(analyticsSummary?.genesisProgress ?? Math.min((analyticsTotalSOL / GENESIS_HARD_CAP_SOL) * 100, 100)).toFixed(2)}%`, "Pending Genesis Finalization"],
      ["Estimated Allocation Rate", allocationRate ? `1 SOL ≈ ${formatNumber(allocationRate)} NEX` : "Pending", "Estimated / Not Final"],
      ["Estimated NEX Price", estimatedNexPrice ? `${estimatedNexPrice.toFixed(9)} SOL per NEX` : "Pending", "Estimated / Not Final"],
      ["Days Remaining", daysRemaining === null ? "Pending" : `${daysRemaining}`, GENESIS_START_DATE ? "Based on Genesis Start Date" : "Start Date Not Configured"],
    ],
    [allocationRate, analyticsRecords, analyticsSummary, analyticsTotalSOL, daysRemaining, estimatedNexPrice],
  );

  async function refreshBalance(address = connectedWallet?.address) {
    if (!address) return;
    setIsBalanceLoading(true);
    try {
      const nextBalance = await fetchSolBalance(address);
      setBalance(nextBalance);
    } catch {
      setWalletMessage("Unable to read SOL balance from Solana Mainnet. Please try again.");
    } finally {
      setIsBalanceLoading(false);
    }
  }

  async function loadWalletContributionRecords(walletAddress: string) {
    setIsDatabaseLoading(true);
    const localRecords = readGenesisContributionRecords();

    try {
      const result = await fetchGenesisContributions(walletAddress);

      if (result.source === "supabase") {
        const mergedRecords = mergeContributionRecords([...result.records, ...localRecords]);
        setContributionRecords(mergedRecords);
        writeGenesisContributionRecords(mergedRecords);
        setDatabaseSource("supabase");
        setDatabaseMessage(result.message);
        return;
      }

      setContributionRecords(localRecords);
      setDatabaseSource(result.source);
      setDatabaseMessage(
        result.source === "unconfigured"
          ? "Genesis database is not configured. Your transaction is confirmed locally, but cloud sync is unavailable."
          : result.message,
      );
    } finally {
      setIsDatabaseLoading(false);
    }
  }

  async function loadPublicAnalytics() {
    setIsAnalyticsLoading(true);
    const localRecords = readGenesisContributionRecords();

    try {
      const result = await fetchGenesisAnalyticsContributions();

      if (result.source === "supabase") {
        const records = mergeContributionRecords(result.records);
        setAnalyticsRecords(records);
        setAnalyticsSummary(result.analytics ?? null);
        setAnalyticsSource("supabase");
        setAnalyticsMessage(result.message);
        return;
      }

      setAnalyticsRecords(localRecords);
      setAnalyticsSummary(null);
      setAnalyticsSource(result.source);
      setAnalyticsMessage(result.message);
    } finally {
      setIsAnalyticsLoading(false);
    }
  }

  async function connectWallet(wallet: WalletOption) {
    const provider = getWalletProvider(wallet.key);
    setWalletMessage("");
    setNetworkWarning("");

    if (!provider) {
      setWalletMessage("Wallet not detected. Please install a supported Solana wallet.");
      return;
    }

    setIsConnecting(wallet.key);
    try {
      const response = await provider.connect();
      const publicKey = response?.publicKey ?? provider.publicKey;
      const address = publicKey?.toString();

      if (!address) {
        setWalletMessage("Wallet connection did not return a public address.");
        return;
      }

      setConnectedWallet({ key: wallet.key, name: wallet.name, address });
      setWalletModalOpen(false);
      setNetworkWarning(detectUnsupportedNetwork(provider) ? "Please connect to Solana Mainnet." : "");
      await refreshBalance(address);
      await loadWalletContributionRecords(address);
    } catch {
      setWalletMessage("Wallet connection was cancelled or could not be completed.");
    } finally {
      setIsConnecting(null);
    }
  }

  async function disconnectWallet() {
    try {
      await activeProvider?.disconnect?.();
    } finally {
      setConnectedWallet(null);
      setBalance(null);
      setNetworkWarning("");
      setWalletMessage("");
      setTransactionStatus("idle");
      setTransactionError("");
    }
  }

  async function submitContribution() {
    setTransactionError("");
    setReceipt(null);

    if (!connectedWallet || !activeProvider) {
      setTransactionStatus("failed");
      setTransactionError("Please connect a supported Solana wallet first.");
      return;
    }

    if (validContribution < 1) {
      setTransactionStatus("failed");
      setTransactionError("Minimum Genesis contribution is 1 SOL.");
      return;
    }

    if (balance !== null && balance < validContribution + ESTIMATED_NETWORK_FEE_SOL) {
      setTransactionStatus("failed");
      setTransactionError("Insufficient SOL balance for this contribution and estimated network fee.");
      return;
    }

    try {
      setTransactionStatus("preparing");
      const latestBlockhash = await getLatestBlockhash();
      const transaction = new GenesisSolanaTransaction({
        from: connectedWallet.address,
        to: GENESIS_TREASURY_WALLET,
        lamports: solToLamports(validContribution),
        recentBlockhash: latestBlockhash.blockhash,
      });

      let signature = "";

      if (activeProvider.signAndSendTransaction) {
        setTransactionStatus("signing");
        const result = await activeProvider.signAndSendTransaction(transaction);
        signature = typeof result === "string" ? result : result.signature ?? "";
      } else if (activeProvider.signTransaction) {
        setTransactionStatus("signing");
        const signedTransaction = await activeProvider.signTransaction(transaction);
        setTransactionStatus("broadcasting");
        signature = await sendRawTransaction(signedTransaction.serialize());
      } else {
        throw new Error("This wallet does not expose a supported Solana transaction signing method.");
      }

      if (!signature) throw new Error("Transaction signature was not returned by the wallet.");

      setTransactionStatus("confirming");
      await confirmSignature(signature, latestBlockhash.lastValidBlockHeight);
      const time = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "medium",
      }).format(new Date());
      const estimatedNEXAllocation = estimateAllocation(validContribution, estimatedContributionTotalSOL);
      const contributionRecord: GenesisContributionRecord = {
        walletAddress: connectedWallet.address,
        contributionAmountSOL: validContribution,
        transactionSignature: signature,
        timestamp: new Date().toISOString(),
        treasuryWallet: GENESIS_TREASURY_WALLET,
        network: "Solana Mainnet",
        status: "Confirmed",
        estimatedNEXAllocation,
        lockedNSCredits: estimatedNEXAllocation,
      };
      const nextRecords = [contributionRecord, ...contributionRecords];

      setReceipt({
        signature,
        amount: validContribution,
        walletAddress: connectedWallet.address,
        time,
        status: "Confirmed",
      });
      const mergedLocalRecords = mergeContributionRecords(nextRecords);
      setContributionRecords(mergedLocalRecords);
      setAnalyticsRecords(mergedLocalRecords);
      writeGenesisContributionRecords(nextRecords);
      setTransactionStatus("recording");
      const syncResult = await syncGenesisContribution(contributionRecord);
      setDatabaseMessage(syncResult.message);
      setDatabaseSource(
        syncResult.status === "recorded" || syncResult.status === "duplicate"
          ? "supabase"
          : syncResult.status === "unconfigured"
            ? "unconfigured"
            : "error",
      );
      if (syncResult.status === "recorded" || syncResult.status === "duplicate") {
        await loadWalletContributionRecords(connectedWallet.address);
        await loadPublicAnalytics();
      }
      setTransactionStatus("success");
      await refreshBalance(connectedWallet.address);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Network Error";
      setTransactionStatus("failed");
      if (/reject|cancel|denied/i.test(message)) {
        setTransactionError("User Rejected Transaction");
      } else if (/insufficient/i.test(message)) {
        setTransactionError("Insufficient SOL Balance");
      } else if (/timeout|expired/i.test(message)) {
        setTransactionError("Transaction Timeout");
      } else {
        setTransactionError(message || "Network Error");
      }
    }
  }

  useEffect(() => {
    if (!connectedWallet || !activeProvider?.on) return undefined;

    const handleDisconnect = () => {
      setConnectedWallet(null);
      setBalance(null);
      setNetworkWarning("");
    };

    activeProvider.on("disconnect", handleDisconnect);
    return () => activeProvider.off?.("disconnect", handleDisconnect);
  }, [activeProvider, connectedWallet]);

  useEffect(() => {
    void loadPublicAnalytics();
  }, []);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px]">
        <section className="relative overflow-hidden rounded-[34px] border border-violet-500/20 bg-black/50 p-6 shadow-[0_24px_100px_rgba(0,0,0,0.34)] md:p-9 xl:p-12">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(0,229,255,0.13),transparent_34%),radial-gradient(circle_at_22%_82%,rgba(124,58,237,0.16),transparent_38%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0_44%,rgba(0,229,255,0.08)_44.2%,transparent_44.8%_62%,rgba(200,169,106,0.08)_62.2%,transparent_62.8%)] opacity-70" />

          <div className="relative grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-[0.68rem] font-black uppercase tracking-[0.22em] text-cyan">
                <Network className="h-3.5 w-3.5" />
                Solana Mainnet / Founding Allocation
              </div>
              <h1 className="mt-7 text-5xl font-black leading-none tracking-[-0.045em] text-white md:text-7xl">
                NEX Genesis Event
              </h1>
              <p className="mt-5 max-w-3xl text-2xl font-black leading-tight text-white md:text-4xl">
                Become a Founding Participant of the Global Prediction Growth Infrastructure.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                The first public participation event of the NEXNS Network.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Genesis participants receive future NEX allocations and locked NS participation credits before network activation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setWalletModalOpen(true)}
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:scale-[1.02] hover:bg-cyan"
                >
                  <Wallet className="h-4 w-4" />
                  {connectedWallet ? shortenAddress(connectedWallet.address) : "Connect Wallet"}
                </button>
                <a
                  href="#genesis-rules"
                  className="interactive-glow inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white"
                >
                  View Genesis Rules <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <WalletStatus
                connectedWallet={connectedWallet}
                balance={balance}
                isBalanceLoading={isBalanceLoading}
                networkWarning={networkWarning}
                walletMessage={walletMessage}
                onConnect={() => setWalletModalOpen(true)}
                onDisconnect={disconnectWallet}
                onRefresh={() => refreshBalance()}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {publicMetrics.map(([label, value, note]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-black/42 p-5">
                  <div className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400">{label}</div>
                  <div className="mt-3 font-mono text-3xl font-black text-white">{value}</div>
                  <div className="mt-2 text-[0.62rem] font-black uppercase tracking-[0.16em] text-gold">{note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-3">
          {genesisMetrics.map(([label, value]) => (
            <GlassCard key={label} className="interactive-glow p-5">
              <div className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400">{label}</div>
              <div className="mt-3 text-2xl font-black text-white">{value}</div>
            </GlassCard>
          ))}
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <GlassCard className="p-6 md:p-8">
            <div className="nex-label">Genesis Allocation Pool</div>
            <div className="mt-4 font-mono text-4xl font-black text-white">100,000,000 NEX</div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Allocated collectively among Genesis participants after Genesis concludes.
            </p>
          </GlassCard>
          <GlassCard className="p-6 md:p-8">
            <div className="nex-label">Locked NS Credits</div>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              NS represents the participation layer of NEXNS. Genesis participants receive locked NS credits on a 1:1 basis with final NEX allocations.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              NS is non-transferable and becomes active through future participation, governance, prediction activity, and ecosystem contribution.
            </p>
          </GlassCard>
        </section>

        <TransparencyCenter
          publicMetrics={publicMetrics}
          analyticsMessage={analyticsMessage}
          analyticsSource={analyticsSource}
          isAnalyticsLoading={isAnalyticsLoading}
          latestContributions={latestContributions}
          topContributors={topContributors}
          totalRaisedSOL={analyticsTotalSOL}
          allocationRate={allocationRate}
          estimatedNexPrice={estimatedNexPrice}
          onRefresh={loadPublicAnalytics}
        />

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan">
                <Calculator className="h-6 w-6" />
              </span>
              <div>
                <div className="nex-label">Genesis Contribution Module</div>
                <h2 className="text-3xl font-black text-white">Enter SOL contribution.</h2>
              </div>
            </div>

            <label className="mt-7 block text-sm font-black uppercase tracking-[0.16em] text-slate-300">
              SOL Contribution
              <input
                value={solAmount}
                onChange={(event) => setSolAmount(event.target.value)}
                inputMode="decimal"
                className="mt-3 w-full rounded-2xl border border-white/10 bg-black/50 px-5 py-4 font-mono text-2xl font-black text-white outline-none transition focus:border-cyan/40"
                placeholder="1"
              />
            </label>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {[1, 5, 10, 25, 50, 100].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSolAmount(String(amount));
                    setTransactionStatus("idle");
                    setTransactionError("");
                  }}
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-sm font-black text-white transition hover:border-cyan/40 hover:text-cyan"
                >
                  {amount}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm leading-6 text-gold">
              Minimum: 1 SOL. Maximum: no limit. Contributions transfer SOL directly to the Genesis treasury wallet on Solana Mainnet.
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Your Contribution", validContribution ? `${formatNumber(validContribution)} SOL` : "Minimum 1 SOL"],
                ["Estimated NEX Allocation", validContribution ? `${formatNumber(primaryScenario)} NEX` : "Pending"],
                ["Locked NS Credits", validContribution ? `${formatNumber(primaryScenario)} Locked NS` : "Pending"],
                ["Allocation Share", validContribution ? `${allocationShare.toFixed(2)}% scenario share` : "Pending"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-slate-400">{label}</div>
                  <div className="mt-2 font-mono text-xl font-black text-white">{value}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-cyan/20 bg-cyan/10 p-5">
              <div className="text-sm font-black text-cyan">Status: Pending Genesis Finalization</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Live allocation depends on final total Genesis contribution after closing and audit.
              </p>
            </div>

            <ContributionFlow
              amount={validContribution}
              connectedWallet={connectedWallet}
              balance={balance}
              networkWarning={networkWarning}
              status={transactionStatus}
              error={transactionError}
              receipt={receipt}
              canReview={canReviewContribution}
              onConnect={() => setWalletModalOpen(true)}
              onReview={() => {
                setTransactionError("");
                setReceipt(null);
                setTransactionStatus("review");
              }}
              onSubmit={submitContribution}
              onRetry={() => {
                setTransactionError("");
                setTransactionStatus("review");
              }}
            />
          </GlassCard>
        </section>

        <MyGenesisStatus
          connectedWallet={connectedWallet}
          walletRecords={walletRecords}
          totalSOL={walletTotalSOL}
          estimatedNEX={walletEstimatedNEX}
          databaseMessage={databaseMessage}
          databaseSource={databaseSource}
          isDatabaseLoading={isDatabaseLoading}
          onConnect={() => setWalletModalOpen(true)}
        />

        <section id="genesis-rules" className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          <GlassCard className="p-6 md:p-8">
            <div className="nex-label">How Allocation Works</div>
            <h2 className="mt-3 text-3xl font-black text-white">No fixed price. Proportional allocation.</h2>

            <div className="mt-7 rounded-[28px] border border-white/10 bg-black/44 p-5">
              <div className="grid gap-3 text-center md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
                {["User Contribution", "/", "Total Genesis Contribution", "x", "100,000,000 NEX", "=", "Final NEX Allocation"].map((item) => (
                  <div
                    key={item}
                    className={item.length <= 1 ? "font-mono text-2xl font-black text-cyan" : "rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 text-sm font-black text-white"}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-gold/20 bg-gold/10 p-5">
              <div className="text-sm font-black uppercase tracking-[0.16em] text-gold">Example</div>
              <p className="mt-3 text-sm leading-7 text-slate-200">
                If total Genesis contribution is 10,000 SOL and a participant contributes 100 SOL, the participant receives:
              </p>
              <div className="mt-3 font-mono text-xl font-black text-white">100 / 10,000 x 100,000,000 = 1,000,000 NEX</div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <div className="nex-label">Scenario View</div>
            <h3 className="mt-3 text-2xl font-black text-white">Placeholder allocation scenarios</h3>
            <div className="mt-6 grid gap-3">
              {scenarios.map((scenario) => (
                <div key={scenario} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div>
                    <div className="text-sm font-black text-white">{formatNumber(scenario)} SOL total</div>
                    <div className="text-xs text-slate-400">Genesis contribution scenario</div>
                  </div>
                  <div className="text-right font-mono text-lg font-black text-cyan">
                    {formatNumber(estimateAllocation(validContribution, scenario))} NEX
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <LayerCard
            icon={<CircleDollarSign className="h-7 w-7" />}
            title="NEX"
            label="Economic Layer"
            copy="NEX represents the economic layer of the NEXNS network and aligns long-term network value."
            tone="gold"
          />
          <LayerCard
            icon={<LockKeyhole className="h-7 w-7" />}
            title="NS"
            label="Participation Layer"
            copy="NS represents the participation layer of NEXNS. Genesis participants receive locked NS credits on a 1:1 basis with final NEX allocations."
            tone="cyan"
          />
        </section>

        <GlassCard className="mt-5 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="nex-label">NEX + NS Relationship</div>
              <h2 className="mt-3 text-3xl font-black text-white">1 Final NEX Allocation = 1 Locked NS Credit</h2>
            </div>
            <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-sm font-bold text-violet-200">
              Locked / Non-transferable / Pending Activation
            </span>
          </div>
          <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-300">
            NS is non-transferable and becomes active through future participation, governance, prediction activity, and ecosystem contribution.
          </p>
        </GlassCard>

        <GlassCard className="mt-5 p-6 md:p-8">
          <div className="nex-label">Genesis Timeline</div>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {timeline.map((step, index) => (
              <div key={step} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="font-mono text-xs font-black text-cyan">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-3 min-h-12 text-sm font-black text-white">{step}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="mt-5 p-6 md:p-8">
          <div className="nex-label">Genesis Manifesto</div>
          <div className="mt-5 max-w-4xl space-y-4 text-xl font-black leading-9 text-white md:text-2xl">
            <p>Every network begins with participation.</p>
            <p>Every economy begins with belief.</p>
            <p>Every future begins with a signal.</p>
          </div>
          <div className="mt-6 grid gap-4 text-sm leading-7 text-slate-300 md:grid-cols-2">
            <p>NEX Genesis is the first public participation event of the NEXNS Network.</p>
            <p>
              By participating in Genesis, contributors help establish the economic and participation foundations of a global prediction growth infrastructure.
            </p>
          </div>
        </GlassCard>

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-gold" />
              <div>
                <div className="nex-label">Eligibility & Restrictions</div>
                <h2 className="text-3xl font-black text-white">Restricted jurisdictions apply.</h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Participation is not available to persons or entities located in restricted jurisdictions.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {restrictedJurisdictions.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300">
                  {item}
                </span>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <div className="grid gap-3">
              {confirmations.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-cyan/30 bg-cyan/10">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan" />
                  </span>
                  <span className="text-sm leading-6 text-slate-200">{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-500">
              These confirmations define the eligibility and risk requirements for Genesis participation.
            </p>
          </GlassCard>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <GlassCard className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-gold" />
              <div>
                <div className="nex-label">Risk Notice</div>
                <h2 className="text-3xl font-black text-white">Participation involves risk.</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3 text-sm leading-7 text-slate-300">
              <p>NEX is not yet live.</p>
              <p>Genesis participation represents future network allocation rights.</p>
              <p>NEX and NS distributions are expected after Genesis closes and TGE occurs.</p>
              <p>Participation involves technical, market, regulatory, and network risks.</p>
              <p>No guarantee of future value, liquidity, exchange listing, or profit is provided.</p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 md:p-8">
            <div className="nex-label">Genesis FAQ</div>
            <div className="mt-5 grid gap-3">
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <button
                    key={question}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-cyan/30"
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span className="font-black text-white">{question}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`} />
                    </span>
                    {isOpen && <span className="mt-3 block text-sm leading-7 text-slate-300">{answer}</span>}
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </section>

        <GlassCard className="mt-5 p-6 md:p-8">
          <div className="grid gap-5 md:grid-cols-[auto_1fr_auto] md:items-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan/20 bg-cyan/10 text-cyan">
              <Clock3 className="h-7 w-7" />
            </span>
            <div>
              <div className="text-xl font-black text-white">Closing Rule</div>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Genesis closes when 100,000 SOL is reached or 270 days have elapsed, whichever occurs first.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 font-mono text-sm font-black text-white">
              Treasury: Hei64...rWTy
            </div>
          </div>
        </GlassCard>

        <GlassCard className="mt-5 p-6 md:p-8">
          <p className="max-w-4xl text-2xl font-black leading-tight text-white md:text-4xl">
            The future of prediction is not built by speculation.
          </p>
          <p className="mt-4 max-w-3xl text-lg font-bold leading-8 text-slate-200">
            It is built by participation. Genesis is where the network begins.
          </p>
        </GlassCard>

        {walletModalOpen && (
          <WalletSelectorModal
            connectedWallet={connectedWallet}
            isConnecting={isConnecting}
            walletMessage={walletMessage}
            onClose={() => setWalletModalOpen(false)}
            onConnect={connectWallet}
          />
        )}
      </div>
    </AppShell>
  );
}

function TransparencyCenter({
  publicMetrics,
  analyticsMessage,
  analyticsSource,
  isAnalyticsLoading,
  latestContributions,
  topContributors,
  totalRaisedSOL,
  allocationRate,
  estimatedNexPrice,
  onRefresh,
}: {
  publicMetrics: Array<[string, string, string]>;
  analyticsMessage: string;
  analyticsSource: "supabase" | "local" | "unconfigured" | "error";
  isAnalyticsLoading: boolean;
  latestContributions: GenesisContributionRecord[];
  topContributors: Array<{ walletAddress: string; totalSOL: number; estimatedNEX: number; count: number }>;
  totalRaisedSOL: number;
  allocationRate: number | null;
  estimatedNexPrice: number | null;
  onRefresh: () => void;
}) {
  const progress = Math.min((totalRaisedSOL / GENESIS_HARD_CAP_SOL) * 100, 100);

  return (
    <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
      <GlassCard className="p-6 md:p-8 xl:col-span-2">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="nex-label">Transparency Center</div>
            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Verified Genesis analytics.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              All metrics displayed are based on verified Genesis contribution records. No allocation is final until Genesis concludes.
            </p>
            <div className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-bold text-slate-300">
              {isAnalyticsLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan" />}
              <span className="font-black uppercase tracking-[0.14em] text-cyan">
                {analyticsSource === "supabase" ? "Supabase Analytics" : analyticsSource === "unconfigured" ? "Local Fallback" : analyticsSource === "error" ? "Analytics Warning" : "Local Records"}
              </span>
              <span>{analyticsMessage}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:border-cyan/40 hover:text-cyan"
          >
            <RefreshCw className={`h-4 w-4 ${isAnalyticsLoading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {publicMetrics.map(([label, value, note]) => (
            <div key={label} className="rounded-[24px] border border-white/10 bg-black/42 p-5">
              <div className="text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-400">{label}</div>
              <div className="mt-3 break-words font-mono text-2xl font-black text-white">{value}</div>
              <div className="mt-2 text-[0.62rem] font-black uppercase tracking-[0.16em] text-gold">{note}</div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6 md:p-8">
        <div className="nex-label">Progress to Hard Cap</div>
        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <div className="font-mono text-4xl font-black text-white">{progress.toFixed(2)}%</div>
            <div className="mt-2 text-sm font-bold text-slate-300">
              {formatNumber(totalRaisedSOL)} / {formatNumber(GENESIS_HARD_CAP_SOL)} SOL
            </div>
          </div>
          <div className="text-right text-xs font-black uppercase tracking-[0.14em] text-gold">Pending Genesis Finalization</div>
        </div>
        <div className="mt-6 h-4 overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan via-violet-400 to-gold transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <ReviewRow label="Genesis Capacity" value={`${formatNumber(GENESIS_HARD_CAP_SOL)} SOL`} mono />
          <ReviewRow label="Genesis Allocation Pool" value={`${formatNumber(GENESIS_POOL)} NEX`} mono />
        </div>
      </GlassCard>

      <GlassCard className="p-6 md:p-8">
        <div className="nex-label">Allocation Rate Panel</div>
        <div className="mt-5 grid gap-3">
          <ReviewRow label="Estimated Rate" value={allocationRate ? `1 SOL ≈ ${formatNumber(allocationRate)} NEX` : "Pending"} mono />
          <ReviewRow label="Estimated NEX Price" value={estimatedNexPrice ? `${estimatedNexPrice.toFixed(9)} SOL per NEX` : "Pending"} mono />
          <ReviewRow label="Status" value="Estimated / Not Final" />
        </div>
        <p className="mt-5 rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm font-bold leading-6 text-gold">
          No guaranteed price or final allocation is shown before Genesis close. Final allocations depend on total verified SOL contributions.
        </p>
      </GlassCard>

      <GlassCard className="p-6 md:p-8">
        <div className="nex-label">Latest Contributions</div>
        <ContributionList
          emptyMessage="No verified Genesis contributions are visible yet."
          records={latestContributions}
        />
      </GlassCard>

      <GlassCard className="p-6 md:p-8">
        <div className="nex-label">Top Contributors</div>
        <TopContributorList contributors={topContributors} />
      </GlassCard>
    </section>
  );
}

function ContributionList({
  records,
  emptyMessage,
}: {
  records: GenesisContributionRecord[];
  emptyMessage: string;
}) {
  if (records.length === 0) {
    return <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-sm text-slate-400">{emptyMessage}</div>;
  }

  return (
    <div className="mt-5 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10">
      {records.map((record) => {
        const date = new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date(record.timestamp));
        return (
          <div key={record.transactionSignature} className="grid gap-3 p-4 text-sm text-slate-200 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="font-mono text-sm font-black text-white">{shortenAddress(record.walletAddress)}</div>
              <div className="mt-1 text-xs text-slate-400">{date}</div>
              <div className="mt-2 text-xs font-bold text-gold">Estimated NEX: {formatNumber(record.estimatedNEXAllocation)}</div>
            </div>
            <div className="flex items-center justify-between gap-4 md:justify-end">
              <div className="font-mono text-lg font-black text-cyan">{formatNumber(record.contributionAmountSOL)} SOL</div>
              <a
                href={`https://solscan.io/tx/${record.transactionSignature}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:text-cyan"
              >
                Solscan <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TopContributorList({
  contributors,
}: {
  contributors: Array<{ walletAddress: string; totalSOL: number; estimatedNEX: number; count: number }>;
}) {
  if (contributors.length === 0) {
    return <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.035] p-5 text-sm text-slate-400">No top contributors are visible yet.</div>;
  }

  return (
    <div className="mt-5 grid gap-3">
      {contributors.map((contributor, index) => (
        <div key={contributor.walletAddress} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center">
          <div className="font-mono text-xs font-black text-cyan">{String(index + 1).padStart(2, "0")}</div>
          <div>
            <div className="font-mono text-sm font-black text-white">{shortenAddress(contributor.walletAddress)}</div>
            <div className="mt-1 text-xs font-bold text-gold">
              {formatNumber(contributor.estimatedNEX)} estimated NEX / {contributor.count} contribution{contributor.count === 1 ? "" : "s"}
            </div>
          </div>
          <div className="font-mono text-lg font-black text-cyan">{formatNumber(contributor.totalSOL)} SOL</div>
        </div>
      ))}
    </div>
  );
}

function MyGenesisStatus({
  connectedWallet,
  walletRecords,
  totalSOL,
  estimatedNEX,
  databaseMessage,
  databaseSource,
  isDatabaseLoading,
  onConnect,
}: {
  connectedWallet: ConnectedWallet | null;
  walletRecords: GenesisContributionRecord[];
  totalSOL: number;
  estimatedNEX: number;
  databaseMessage: string;
  databaseSource: "supabase" | "local" | "unconfigured" | "error";
  isDatabaseLoading: boolean;
  onConnect: () => void;
}) {
  return (
    <GlassCard className="mt-5 p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <div className="nex-label">My Genesis Status</div>
          <h2 className="mt-3 text-3xl font-black text-white">Estimated allocation dashboard.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            All NEX and NS values shown before Genesis close are estimates. Final allocations will be calculated after Genesis closes based on total verified SOL contributions.
          </p>
          <div className="mt-4 inline-flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-2 text-xs font-bold text-slate-300">
            {isDatabaseLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan" />}
            <span className="font-black uppercase tracking-[0.14em] text-cyan">
              {databaseSource === "supabase" ? "Supabase Sync" : databaseSource === "unconfigured" ? "Local Fallback" : databaseSource === "error" ? "Sync Warning" : "Local Records"}
            </span>
            <span>{databaseMessage}</span>
          </div>
        </div>
        <span className="rounded-full border border-gold/20 bg-gold/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-gold">
          Pending Final Allocation
        </span>
      </div>

      {!connectedWallet ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
          <div className="text-lg font-black text-white">Connect wallet to view local Genesis status.</div>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Contribution history is stored locally in this browser until backend sync is enabled.
          </p>
          <button
            type="button"
            onClick={onConnect}
            className="mt-4 rounded-2xl bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-cyan"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              ["Connected Wallet", shortenAddress(connectedWallet.address), "Local wallet"],
              ["Total SOL Contributed", `${formatNumber(totalSOL)} SOL`, "Confirmed local records"],
              ["Estimated NEX Allocation", `${formatNumber(estimatedNEX)} NEX`, "Estimated / Not Final"],
              ["Locked NS Credits", `${formatNumber(estimatedNEX)} NS`, "Pending Activation"],
            ].map(([label, value, note]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="text-[0.66rem] font-black uppercase tracking-[0.16em] text-slate-400">{label}</div>
                <div className="mt-2 break-words font-mono text-xl font-black text-white">{value}</div>
                <div className="mt-2 text-[0.62rem] font-black uppercase tracking-[0.14em] text-gold">{note}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid gap-3 border-b border-white/10 bg-white/[0.035] px-4 py-3 text-[0.66rem] font-black uppercase tracking-[0.14em] text-slate-400 md:grid-cols-[1.15fr_0.85fr_1.2fr_0.7fr_0.6fr]">
              <span>Date</span>
              <span>SOL Amount</span>
              <span>Transaction Hash</span>
              <span>Status</span>
              <span>Solscan</span>
            </div>

            {walletRecords.length === 0 ? (
              <div className="px-4 py-6 text-sm leading-6 text-slate-400">
                No confirmed local Genesis contributions found for this wallet.
              </div>
            ) : (
              <div className="divide-y divide-white/10">
                {walletRecords.map((record) => {
                  const date = new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(record.timestamp));
                  return (
                    <div
                      key={record.transactionSignature}
                      className="grid gap-3 px-4 py-4 text-sm text-slate-200 md:grid-cols-[1.15fr_0.85fr_1.2fr_0.7fr_0.6fr] md:items-center"
                    >
                      <span>{date}</span>
                      <span className="font-mono font-black text-white">{formatNumber(record.contributionAmountSOL)} SOL</span>
                      <span className="break-all font-mono text-xs text-cyan">{shortenAddress(record.transactionSignature)}</span>
                      <span className="font-black text-cyan">{record.status}</span>
                      <a
                        href={`https://solscan.io/tx/${record.transactionSignature}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:text-cyan"
                      >
                        Open <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </GlassCard>
  );
}

function ContributionFlow({
  amount,
  connectedWallet,
  balance,
  networkWarning,
  status,
  error,
  receipt,
  canReview,
  onConnect,
  onReview,
  onSubmit,
  onRetry,
}: {
  amount: number;
  connectedWallet: ConnectedWallet | null;
  balance: number | null;
  networkWarning: string;
  status: TransactionStatus;
  error: string;
  receipt: ContributionReceipt | null;
  canReview: boolean;
  onConnect: () => void;
  onReview: () => void;
  onSubmit: () => void;
  onRetry: () => void;
}) {
  const amountInvalid = amount < 1;
  const insufficientBalance = connectedWallet && balance !== null && balance < amount + ESTIMATED_NETWORK_FEE_SOL;
  const isTransactionBusy = ["preparing", "signing", "broadcasting", "confirming", "recording"].includes(status);
  const actionDisabled = !connectedWallet || amountInvalid || Boolean(networkWarning) || Boolean(insufficientBalance) || isTransactionBusy;
  const statusLabel: Record<TransactionStatus, string> = {
    idle: "",
    review: "",
    preparing: "Preparing transaction",
    signing: "Awaiting wallet signature",
    broadcasting: "Broadcasting transaction",
    confirming: "Confirming on Solana Mainnet",
    recording: "Recording verified contribution",
    success: "",
    failed: "",
  };

  return (
    <div className="mt-5 rounded-[24px] border border-white/10 bg-black/35 p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
          <Send className="h-5 w-5" />
        </span>
        <div>
          <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Real SOL Contribution</div>
          <div className="text-lg font-black text-white">Review, sign, and submit on Solana Mainnet.</div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm leading-6 text-slate-300">
        <p>NEX is not yet live.</p>
        <p>Genesis participation represents future allocation rights.</p>
        <p>NEX and NS distributions are expected after Genesis closes and TGE occurs.</p>
        <p>Participation involves technical, market, and regulatory risks.</p>
      </div>

      <div className="mt-5 grid gap-3">
        {!connectedWallet && <ContributionAlert tone="gold" message="Connect a supported Solana wallet before contributing." />}
        {amountInvalid && <ContributionAlert tone="gold" message="Minimum Genesis contribution is 1 SOL." />}
        {networkWarning && <ContributionAlert tone="gold" message={networkWarning} />}
        {insufficientBalance && <ContributionAlert tone="gold" message="Insufficient SOL balance for this contribution and estimated network fee." />}
      </div>

      {status === "review" && connectedWallet && (
        <div className="mt-5 rounded-2xl border border-cyan/20 bg-cyan/10 p-4">
          <div className="text-sm font-black uppercase tracking-[0.16em] text-cyan">Contribution Review</div>
          <div className="mt-4 grid gap-3">
            <ReviewRow label="Wallet Address" value={shortenAddress(connectedWallet.address)} mono />
            <ReviewRow label="Contribution Amount" value={`${formatNumber(amount)} SOL`} mono />
            <ReviewRow label="Network" value="Solana Mainnet" />
            <ReviewRow label="Destination Wallet" value={`${GENESIS_TREASURY_WALLET.slice(0, 6)}...${GENESIS_TREASURY_WALLET.slice(-6)}`} mono />
            <ReviewRow label="Estimated Network Fee" value={`~${ESTIMATED_NETWORK_FEE_SOL} SOL`} mono />
          </div>
          <p className="mt-4 rounded-xl border border-gold/20 bg-gold/10 p-3 text-sm font-bold leading-6 text-gold">
            Genesis participation is irreversible once the transaction is confirmed.
          </p>
        </div>
      )}

      {isTransactionBusy && (
        <div className="mt-5 rounded-2xl border border-cyan/20 bg-cyan/10 p-4">
          <div className="flex items-center gap-3 text-cyan">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-black uppercase tracking-[0.16em]">
              {statusLabel[status]}
            </span>
          </div>
        </div>
      )}

      {status === "success" && receipt && <ContributionSuccess receipt={receipt} />}

      {status === "failed" && error && (
        <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/10 p-4">
          <div className="text-sm font-black uppercase tracking-[0.16em] text-red-200">Transaction Failed</div>
          <p className="mt-2 text-sm font-bold leading-6 text-red-100">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan/40"
          >
            Retry Contribution
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {!connectedWallet ? (
          <button
            type="button"
            onClick={onConnect}
            disabled={isTransactionBusy}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-cyan"
          >
            Connect Wallet
          </button>
        ) : status === "review" ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={actionDisabled}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-50"
          >
            Sign & Transfer SOL
          </button>
        ) : (
          <button
            type="button"
            onClick={onReview}
            disabled={actionDisabled}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-black transition hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-50"
          >
            Review Contribution
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
      <span className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{label}</span>
      <span className={`${mono ? "font-mono" : ""} text-sm font-black text-white`}>{value}</span>
    </div>
  );
}

function ContributionAlert({ tone, message }: { tone: "gold"; message: string }) {
  return (
    <div className="rounded-xl border border-gold/20 bg-gold/10 px-4 py-3 text-sm font-bold leading-6 text-gold">
      {message}
    </div>
  );
}

function ContributionSuccess({ receipt }: { receipt: ContributionReceipt }) {
  async function copySignature() {
    await navigator.clipboard?.writeText(receipt.signature);
  }

  return (
    <div className="mt-5 rounded-2xl border border-cyan/20 bg-cyan/10 p-4">
      <div className="flex items-center gap-3 text-cyan">
        <CheckCircle2 className="h-5 w-5" />
        <span className="text-sm font-black uppercase tracking-[0.16em]">Contribution Submitted Successfully</span>
      </div>
      <div className="mt-4 grid gap-3">
        <ReviewRow label="Contribution Amount" value={`${formatNumber(receipt.amount)} SOL`} mono />
        <ReviewRow label="Wallet Address" value={shortenAddress(receipt.walletAddress)} mono />
        <ReviewRow label="Transaction Time" value={receipt.time} />
        <ReviewRow label="Status" value={receipt.status} />
        <ReviewRow label="Transaction Signature" value={shortenAddress(receipt.signature)} mono />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copySignature}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan/40"
        >
          <Copy className="h-3.5 w-3.5" />
          Copy Transaction Hash
        </button>
        <a
          href={`https://solscan.io/tx/${receipt.signature}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-cyan/40"
        >
          View on Solscan <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}

function WalletStatus({
  connectedWallet,
  balance,
  isBalanceLoading,
  networkWarning,
  walletMessage,
  onConnect,
  onDisconnect,
  onRefresh,
}: {
  connectedWallet: ConnectedWallet | null;
  balance: number | null;
  isBalanceLoading: boolean;
  networkWarning: string;
  walletMessage: string;
  onConnect: () => void;
  onDisconnect: () => void;
  onRefresh: () => void;
}) {
  if (!connectedWallet) {
    return (
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">Wallet Status</div>
            <div className="mt-1 text-sm font-bold text-white">Not connected</div>
          </div>
          <button
            type="button"
            onClick={onConnect}
            className="rounded-xl border border-cyan/25 bg-cyan/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-cyan transition hover:border-cyan/50"
          >
            Select Wallet
          </button>
        </div>
        {walletMessage && <p className="mt-3 text-sm leading-6 text-gold">{walletMessage}</p>}
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-2xl border border-cyan/20 bg-cyan/10 p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.16em] text-cyan">Connected to Solana</div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-sm font-black text-white">
              {shortenAddress(connectedWallet.address)}
            </span>
            <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-bold text-slate-300">
              {connectedWallet.name}
            </span>
          </div>
          <div className="mt-3 font-mono text-2xl font-black text-white">
            {isBalanceLoading ? "Reading..." : balance === null ? "Balance unavailable" : `${formatNumber(balance)} SOL`}
          </div>
          {networkWarning && <p className="mt-2 text-sm font-bold text-gold">{networkWarning}</p>}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/35 text-slate-200 transition hover:border-cyan/40 hover:text-cyan"
            aria-label="Refresh SOL balance"
          >
            <RefreshCw className={`h-4 w-4 ${isBalanceLoading ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={onDisconnect}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-black/35 text-slate-200 transition hover:border-gold/40 hover:text-gold"
            aria-label="Disconnect wallet"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function WalletSelectorModal({
  connectedWallet,
  isConnecting,
  walletMessage,
  onClose,
  onConnect,
}: {
  connectedWallet: ConnectedWallet | null;
  isConnecting: WalletKey | null;
  walletMessage: string;
  onClose: () => void;
  onConnect: (wallet: WalletOption) => void;
}) {
  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-black/80 px-4 backdrop-blur-xl" role="dialog" aria-modal="true">
      <div className="w-full max-w-lg overflow-hidden rounded-[28px] border border-white/10 bg-[#05070d] shadow-[0_32px_120px_rgba(0,0,0,0.75)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <div className="nex-label">Genesis Wallet</div>
            <h2 className="mt-2 text-2xl font-black text-white">Connect a Solana wallet</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Supported wallets: Phantom, Solflare, and Backpack. No payment or contribution transaction is triggered in this step.
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

        <div className="grid gap-3 p-6">
          {walletOptions.map((wallet) => {
            const provider = getWalletProvider(wallet.key);
            const isInstalled = Boolean(provider);
            const isActive = connectedWallet?.key === wallet.key;
            return (
              <div key={wallet.key} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-black text-white">{wallet.name}</div>
                    <div className="mt-1 text-sm leading-6 text-slate-400">{wallet.description}</div>
                    <div className={`mt-2 text-xs font-bold ${isInstalled ? "text-cyan" : "text-gold"}`}>
                      {isInstalled ? "Detected" : "Wallet not detected"}
                    </div>
                  </div>

                  {isInstalled ? (
                    <button
                      type="button"
                      onClick={() => onConnect(wallet)}
                      disabled={Boolean(isConnecting)}
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-cyan disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isConnecting === wallet.key && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                      {isActive ? "Reconnect" : "Connect"}
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
          })}
        </div>

        <div className="border-t border-white/10 px-6 py-4 text-xs leading-6 text-slate-500">
          NEXNS never requests private keys, seed phrases, or manual key entry.
        </div>

        {walletMessage && <div className="border-t border-gold/20 bg-gold/10 px-6 py-4 text-sm font-bold text-gold">{walletMessage}</div>}
      </div>
    </div>
  );
}

function LayerCard({
  icon,
  title,
  label,
  copy,
  tone,
}: {
  icon: ReactNode;
  title: string;
  label: string;
  copy: string;
  tone: "gold" | "cyan";
}) {
  const toneClass = tone === "gold" ? "border-gold/25 bg-gold/10 text-gold" : "border-cyan/25 bg-cyan/10 text-cyan";

  return (
    <GlassCard className="interactive-glow p-6 md:p-8">
      <div className={`grid h-14 w-14 place-items-center rounded-2xl border ${toneClass}`}>{icon}</div>
      <h3 className="mt-5 text-4xl font-black text-white">{title}</h3>
      <div className={`mt-2 text-sm font-black uppercase tracking-[0.18em] ${tone === "gold" ? "text-gold" : "text-cyan"}`}>
        {label}
      </div>
      <p className="mt-4 text-base leading-7 text-slate-300">{copy}</p>
    </GlassCard>
  );
}
