import { buildPublicAnalytics, getConfirmedRecords, getSupabaseConfig, readBody, sendJson } from "./_shared.js";

const MAINNET_GENESIS_HASH = "5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp";

function maskValue(value) {
  if (!value) return "";
  if (value.length <= 8) return "****";
  return `${value.slice(0, 4)}****${value.slice(-4)}`;
}

function envStatus(name, value, validator) {
  if (!value) {
    return {
      name,
      status: "missing",
      configured: false,
      maskedValue: "",
      message: `${name} is missing.`,
    };
  }

  const isValid = validator ? validator(value) : true;
  return {
    name,
    status: isValid ? "configured" : "invalid format",
    configured: isValid,
    maskedValue: maskValue(value),
    message: isValid ? `${name} is configured.` : `${name} is configured but does not match the expected format.`,
  };
}

function isUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

async function rpcRequest(rpcUrl, method, params = []) {
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: `nexns-diagnostics-${method}`,
      method,
      params,
    }),
  });

  if (!response.ok) throw new Error(`RPC returned HTTP ${response.status}.`);
  const body = await response.json();
  if (body.error) throw new Error(body.error.message || "RPC returned an error.");
  return body.result;
}

async function checkSolanaRpc() {
  const rpcUrl = process.env.SOLANA_RPC_URL;
  if (!rpcUrl) {
    return {
      status: "missing",
      message: "Solana RPC is not configured.",
      recommendedFix: "Set SOLANA_RPC_URL to a Solana Mainnet RPC endpoint.",
    };
  }

  if (!isUrl(rpcUrl)) {
    return {
      status: "invalid",
      message: "SOLANA_RPC_URL has an invalid format.",
      recommendedFix: "Use a valid HTTP or HTTPS Solana Mainnet RPC URL.",
    };
  }

  try {
    const [genesisHash] = await Promise.all([
      rpcRequest(rpcUrl, "getGenesisHash"),
      rpcRequest(rpcUrl, "getLatestBlockhash", [{ commitment: "confirmed" }]),
    ]);

    if (genesisHash !== MAINNET_GENESIS_HASH) {
      return {
        status: "invalid",
        message: "RPC responded, but it is not Solana Mainnet.",
        recommendedFix: "Point SOLANA_RPC_URL to a Solana Mainnet endpoint.",
      };
    }

    return {
      status: "connected",
      message: "Solana Mainnet RPC connected.",
      recommendedFix: "",
    };
  } catch (error) {
    return {
      status: "unavailable",
      message: "Solana Mainnet RPC is unavailable.",
      error: error instanceof Error ? error.message : "Unknown RPC error.",
      recommendedFix: "Verify SOLANA_RPC_URL and RPC provider availability.",
    };
  }
}

async function checkSupabase() {
  const config = getSupabaseConfig();
  if (!config.configured) {
    return {
      status: "missing",
      message: "Genesis database is not configured.",
      recordQuery: "not checked",
      analyticsBuilder: "not checked",
      recommendedFix: "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the server.",
    };
  }

  try {
    const records = await getConfirmedRecords(1);
    buildPublicAnalytics(records);
    return {
      status: "connected",
      message: "Supabase connected and genesis_contributions can be queried.",
      recordQuery: "ok",
      analyticsBuilder: "ok",
      recommendedFix: "",
    };
  } catch (error) {
    return {
      status: "unavailable",
      message: "Supabase is configured, but Genesis records could not be queried.",
      recordQuery: "failed",
      analyticsBuilder: "not checked",
      error: error instanceof Error ? error.message : "Unknown Supabase error.",
      recommendedFix: "Verify the genesis_contributions table, RLS policy, and service role key.",
    };
  }
}

function endpointExpectations() {
  return [
    { path: "/api/genesis/analytics", methodExpected: "GET" },
    { path: "/api/genesis/wallet-contributions", methodExpected: "GET" },
    { path: "/api/genesis/verify-contribution", methodExpected: "POST" },
    { path: "/api/genesis/admin", methodExpected: "POST" },
  ];
}

async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const adminPassword = process.env.GENESIS_ADMIN_PASSWORD;
  if (!adminPassword) {
    return sendJson(res, 503, { error: "Admin access is not configured." });
  }

  const body = await readBody(req);
  if (body.password !== adminPassword) {
    return sendJson(res, 401, { error: "Invalid Genesis admin password." });
  }

  const serverEnv = [
    envStatus("SUPABASE_URL", process.env.SUPABASE_URL, isUrl),
    envStatus("SUPABASE_SERVICE_ROLE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY),
    envStatus("GENESIS_ADMIN_PASSWORD", process.env.GENESIS_ADMIN_PASSWORD),
    envStatus("GENESIS_START_DATE", process.env.GENESIS_START_DATE),
    envStatus("SOLANA_RPC_URL", process.env.SOLANA_RPC_URL, isUrl),
  ];
  const [supabase, solanaRpc] = await Promise.all([checkSupabase(), checkSolanaRpc()]);

  return sendJson(res, 200, {
    checkedAt: new Date().toISOString(),
    serverEnv,
    supabase,
    solanaRpc,
    api: endpointExpectations(),
  });
}

export default handler;
