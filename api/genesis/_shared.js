import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function parseEnvLine(line) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const equalsIndex = trimmed.indexOf("=");
  if (equalsIndex <= 0) return null;

  const key = trimmed.slice(0, equalsIndex).trim();
  let value = trimmed.slice(equalsIndex + 1).trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  return { key, value };
}

function loadLocalEnv() {
  const currentDir = dirname(fileURLToPath(import.meta.url));
  const candidates = [
    resolve(process.cwd(), ".env.local"),
    resolve(currentDir, "..", "..", ".env.local"),
  ];

  for (const filePath of candidates) {
    if (!existsSync(filePath)) continue;
    const lines = readFileSync(filePath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const parsed = parseEnvLine(line);
      if (parsed && process.env[parsed.key] === undefined) {
        process.env[parsed.key] = parsed.value;
      }
    }
    return;
  }
}

loadLocalEnv();

const GENESIS_POOL = 100_000_000;
const GENESIS_HARD_CAP_SOL = 100_000;
const GENESIS_TREASURY_WALLET = "Hei64jtQJLuxZ3dRCkmALqD4gdWAyCyA76wpxmWBrWTy";
const LAMPORTS_PER_SOL = 1_000_000_000;
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || "https://api.mainnet-beta.solana.com";

function json(response, status = 200) {
  return new Response(JSON.stringify(response), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string") {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch {
      return Promise.resolve({});
    }
  }

  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return {
    url: url ? url.replace(/\/$/, "") : "",
    serviceKey,
    configured: Boolean(url && serviceKey),
  };
}

function getSupabaseHeaders() {
  const { serviceKey } = getSupabaseConfig();
  return {
    apikey: serviceKey || "",
    Authorization: `Bearer ${serviceKey || ""}`,
    "Content-Type": "application/json",
  };
}

function normalizeRecord(row) {
  return {
    walletAddress: row.wallet_address,
    contributionAmountSOL: Number(row.contribution_amount_sol),
    transactionSignature: row.transaction_signature,
    timestamp: row.created_at || row.updated_at || new Date().toISOString(),
    treasuryWallet: row.treasury_wallet,
    network: "Solana Mainnet",
    status: "Confirmed",
    estimatedNEXAllocation: Number(row.estimated_nex_allocation),
    lockedNSCredits: Number(row.locked_ns_credits),
  };
}

function maskAddress(address) {
  if (!address || address.length < 10) return address || "";
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

async function solanaRpc(method, params = []) {
  const response = await fetch(SOLANA_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: `nexns-genesis-${method}`,
      method,
      params,
    }),
  });

  if (!response.ok) throw new Error("Solana RPC unavailable.");
  const body = await response.json();
  if (body.error) throw new Error(body.error.message || "Solana RPC error.");
  return body.result;
}

async function supabaseSelect(path) {
  const { url, configured } = getSupabaseConfig();
  if (!configured) throw new Error("Genesis database is not configured.");
  const response = await fetch(`${url}/rest/v1/${path}`, {
    headers: getSupabaseHeaders(),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function supabaseInsert(path, payload) {
  const { url, configured } = getSupabaseConfig();
  if (!configured) throw new Error("Genesis database is not configured.");
  const response = await fetch(`${url}/rest/v1/${path}`, {
    method: "POST",
    headers: {
      ...getSupabaseHeaders(),
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function getConfirmedRecords(limit = 5000) {
  const query = new URLSearchParams({
    status: "eq.Confirmed",
    select:
      "wallet_address,contribution_amount_sol,transaction_signature,treasury_wallet,network,status,estimated_nex_allocation,locked_ns_credits,created_at,updated_at,solscan_url",
    order: "created_at.desc",
    limit: String(limit),
  });
  const rows = await supabaseSelect(`genesis_contributions?${query.toString()}`);
  return rows.map(normalizeRecord);
}

function sumContributions(records) {
  return records.reduce((sum, record) => sum + Number(record.contributionAmountSOL || 0), 0);
}

function uniqueParticipants(records) {
  return new Set(records.map((record) => record.walletAddress)).size;
}

function topContributors(records) {
  const totals = new Map();
  for (const record of records) {
    const current = totals.get(record.walletAddress) || {
      walletAddress: record.walletAddress,
      totalSOL: 0,
      estimatedNEX: 0,
      count: 0,
    };
    current.totalSOL += record.contributionAmountSOL;
    current.estimatedNEX += record.estimatedNEXAllocation;
    current.count += 1;
    totals.set(record.walletAddress, current);
  }
  return Array.from(totals.values()).sort((a, b) => b.totalSOL - a.totalSOL);
}

function buildPublicAnalytics(records) {
  const totalRaisedSOL = sumContributions(records);
  const allocationRate = totalRaisedSOL > 0 ? GENESIS_POOL / totalRaisedSOL : null;
  const estimatedNexPrice = totalRaisedSOL > 0 ? totalRaisedSOL / GENESIS_POOL : null;
  const latestContributions = records.slice(0, 10).map((record) => ({
    walletAddress: maskAddress(record.walletAddress),
    contributionAmountSOL: record.contributionAmountSOL,
    transactionSignature: record.transactionSignature,
    timestamp: record.timestamp,
    estimatedNEXAllocation: record.estimatedNEXAllocation,
    status: record.status,
  }));
  const top = topContributors(records).slice(0, 10).map((record) => ({
    walletAddress: maskAddress(record.walletAddress),
    totalSOL: record.totalSOL,
    estimatedNEX: record.estimatedNEX,
    count: record.count,
  }));

  return {
    totalRaisedSOL,
    participants: uniqueParticipants(records),
    transactionCount: records.length,
    genesisProgress: Math.min((totalRaisedSOL / GENESIS_HARD_CAP_SOL) * 100, 100),
    allocationRate,
    estimatedNexPrice,
    latestContributions,
    topContributors: top,
    genesisCapacitySOL: GENESIS_HARD_CAP_SOL,
    genesisAllocationPoolNEX: GENESIS_POOL,
    genesisStartDate: process.env.GENESIS_START_DATE || process.env.VITE_GENESIS_START_DATE || null,
  };
}

export {
  GENESIS_POOL,
  GENESIS_HARD_CAP_SOL,
  GENESIS_TREASURY_WALLET,
  LAMPORTS_PER_SOL,
  json,
  sendJson,
  readBody,
  getSupabaseConfig,
  normalizeRecord,
  solanaRpc,
  supabaseSelect,
  supabaseInsert,
  getConfirmedRecords,
  sumContributions,
  uniqueParticipants,
  buildPublicAnalytics,
};
