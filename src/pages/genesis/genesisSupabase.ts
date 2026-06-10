export type GenesisContributionRecord = {
  walletAddress: string;
  contributionAmountSOL: number;
  transactionSignature: string;
  timestamp: string;
  treasuryWallet: string;
  network: "Solana Mainnet";
  status: "Confirmed";
  estimatedNEXAllocation: number;
  lockedNSCredits: number;
};

export type GenesisTopContributor = {
  walletAddress: string;
  totalSOL: number;
  estimatedNEX: number;
  count: number;
};

export type GenesisPublicAnalytics = {
  totalRaisedSOL: number;
  participants: number;
  transactionCount: number;
  genesisProgress: number;
  allocationRate: number | null;
  estimatedNexPrice: number | null;
  latestContributions: GenesisContributionRecord[];
  topContributors: GenesisTopContributor[];
  genesisCapacitySOL: number;
  genesisAllocationPoolNEX: number;
  genesisStartDate: string | null;
};

type ApiContributionRecord = Partial<GenesisContributionRecord> & {
  walletAddress: string;
  contributionAmountSOL: number;
  transactionSignature: string;
  timestamp: string;
  estimatedNEXAllocation?: number;
  lockedNSCredits?: number;
  status?: "Confirmed";
};

type SyncResult =
  | { status: "recorded"; message: string; record?: unknown }
  | { status: "duplicate"; message: string }
  | { status: "unconfigured"; message: string }
  | { status: "error"; message: string };

const GENESIS_TREASURY_WALLET = "Hei64jtQJLuxZ3dRCkmALqD4gdWAyCyA76wpxmWBrWTy";

function normalizeRecord(record: ApiContributionRecord): GenesisContributionRecord {
  return {
    walletAddress: record.walletAddress,
    contributionAmountSOL: Number(record.contributionAmountSOL),
    transactionSignature: record.transactionSignature,
    timestamp: record.timestamp,
    treasuryWallet: record.treasuryWallet ?? GENESIS_TREASURY_WALLET,
    network: "Solana Mainnet",
    status: "Confirmed",
    estimatedNEXAllocation: Number(record.estimatedNEXAllocation ?? 0),
    lockedNSCredits: Number(record.lockedNSCredits ?? record.estimatedNEXAllocation ?? 0),
  };
}

async function readJson<T>(response: Response): Promise<T> {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = typeof body?.error === "string" ? body.error : "Genesis API request failed.";
    throw new Error(message);
  }
  return body as T;
}

export function isGenesisSupabaseConfigured() {
  return true;
}

export async function fetchGenesisContributions(walletAddress: string): Promise<{
  records: GenesisContributionRecord[];
  source: "supabase" | "unconfigured" | "error";
  message: string;
}> {
  try {
    const query = new URLSearchParams({ wallet_address: walletAddress });
    const response = await fetch(`/api/genesis/wallet-contributions?${query.toString()}`);
    const body = await readJson<{ source?: string; message?: string; records?: ApiContributionRecord[] }>(response);
    return {
      records: (body.records ?? []).map(normalizeRecord),
      source: body.source === "unconfigured" ? "unconfigured" : "supabase",
      message: body.message ?? "Genesis records loaded from server endpoint.",
    };
  } catch (error) {
    return {
      records: [],
      source: "error",
      message: error instanceof Error ? error.message : "Unable to load wallet Genesis records.",
    };
  }
}

export async function fetchGenesisAnalyticsContributions(): Promise<{
  records: GenesisContributionRecord[];
  source: "supabase" | "unconfigured" | "error";
  message: string;
  analytics?: GenesisPublicAnalytics;
}> {
  try {
    const response = await fetch("/api/genesis/analytics");
    const body = await readJson<{
      source?: string;
      message?: string;
      analytics?: Omit<GenesisPublicAnalytics, "latestContributions"> & {
        latestContributions: ApiContributionRecord[];
      };
    }>(response);
    const latest = (body.analytics?.latestContributions ?? []).map(normalizeRecord);
    return {
      records: latest,
      source: body.source === "unconfigured" ? "unconfigured" : "supabase",
      message: body.message ?? "Verified Genesis analytics loaded.",
      analytics: body.analytics
        ? {
            ...body.analytics,
            latestContributions: latest,
          }
        : undefined,
    };
  } catch (error) {
    return {
      records: [],
      source: "error",
      message: error instanceof Error ? error.message : "Unable to load Genesis analytics. Please try again later.",
    };
  }
}

export async function fetchGenesisAdminContributions(password: string): Promise<{
  records: GenesisContributionRecord[];
  source: "supabase" | "unconfigured" | "error";
  message: string;
}> {
  try {
    const response = await fetch("/api/genesis/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const body = await readJson<{ message?: string; records?: ApiContributionRecord[] }>(response);
    return {
      records: (body.records ?? []).map(normalizeRecord),
      source: "supabase",
      message: body.message ?? "Genesis admin records loaded from protected server endpoint.",
    };
  } catch (error) {
    return {
      records: [],
      source: "error",
      message: error instanceof Error ? error.message : "Unable to load Genesis admin records.",
    };
  }
}

export async function syncGenesisContribution(record: GenesisContributionRecord): Promise<SyncResult> {
  try {
    const response = await fetch("/api/genesis/verify-contribution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transaction_signature: record.transactionSignature,
        wallet_address: record.walletAddress,
        expected_amount_sol: record.contributionAmountSOL,
      }),
    });
    const body = await readJson<{ status?: string; message?: string; error?: string; record?: unknown }>(response);
    if (body.status === "duplicate") {
      return { status: "duplicate", message: body.message ?? "Contribution already recorded." };
    }
    return {
      status: "recorded",
      message: body.message ?? "Contribution verified and recorded.",
      record: body.record,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Genesis verification failed. Your transaction is confirmed locally, but cloud sync is unavailable.",
    };
  }
}
