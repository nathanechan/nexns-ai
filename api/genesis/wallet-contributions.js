import { getSupabaseConfig, normalizeRecord, sendJson, supabaseSelect } from "./_shared.js";

async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  if (!getSupabaseConfig().configured) {
    return sendJson(res, 200, {
      source: "unconfigured",
      message: "Genesis database is not configured. Local records are being used.",
      records: [],
    });
  }

  try {
    const url = new URL(req.url, "http://localhost");
    const walletAddress = String(url.searchParams.get("wallet_address") || "").trim();
    if (!walletAddress) return sendJson(res, 400, { error: "wallet_address is required." });

    const query = new URLSearchParams({
      wallet_address: `eq.${walletAddress}`,
      select:
        "wallet_address,contribution_amount_sol,transaction_signature,treasury_wallet,network,status,estimated_nex_allocation,locked_ns_credits,created_at,updated_at,solscan_url",
      order: "created_at.desc",
    });
    const rows = await supabaseSelect(`genesis_contributions?${query.toString()}`);
    return sendJson(res, 200, {
      source: "server",
      message: "Genesis records loaded from verified server endpoint.",
      records: rows.map(normalizeRecord),
    });
  } catch {
    return sendJson(res, 500, { error: "Unable to load wallet Genesis records." });
  }
}

export default handler;
