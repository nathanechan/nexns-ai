import {
  GENESIS_HARD_CAP_SOL,
  GENESIS_POOL,
  GENESIS_TREASURY_WALLET,
  LAMPORTS_PER_SOL,
  getConfirmedRecords,
  getSupabaseConfig,
  readBody,
  sendJson,
  solanaRpc,
  sumContributions,
  supabaseInsert,
  supabaseSelect,
} from "./_shared.js";

function getTransferToTreasury(transaction) {
  const instructions = transaction?.transaction?.message?.instructions || [];
  for (const instruction of instructions) {
    if (
      instruction?.program === "system" &&
      instruction?.parsed?.type === "transfer" &&
      instruction?.parsed?.info?.destination === GENESIS_TREASURY_WALLET
    ) {
      return instruction.parsed.info;
    }
  }
  return null;
}

function getSignerAddresses(transaction) {
  const accountKeys = transaction?.transaction?.message?.accountKeys || [];
  return accountKeys
    .filter((account) => account?.signer)
    .map((account) => (typeof account.pubkey === "string" ? account.pubkey : account.pubkey?.toString?.()))
    .filter(Boolean);
}

async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const config = getSupabaseConfig();
  if (!config.configured) {
    return sendJson(res, 503, { error: "Genesis database is not configured." });
  }

  try {
    const body = await readBody(req);
    const transactionSignature = String(body.transaction_signature || "").trim();
    const walletAddress = String(body.wallet_address || "").trim();
    const expectedAmountSOL = Number(body.expected_amount_sol);

    if (!transactionSignature || !walletAddress || !Number.isFinite(expectedAmountSOL) || expectedAmountSOL < 1) {
      return sendJson(res, 400, { error: "Invalid Genesis verification request." });
    }

    const duplicateQuery = new URLSearchParams({
      transaction_signature: `eq.${transactionSignature}`,
      select: "transaction_signature",
      limit: "1",
    });
    const duplicateRows = await supabaseSelect(`genesis_contributions?${duplicateQuery.toString()}`);
    if (duplicateRows.length > 0) {
      return sendJson(res, 200, { status: "duplicate", message: "Contribution already recorded." });
    }

    const records = await getConfirmedRecords(5000);
    const currentRaisedSOL = sumContributions(records);
    if (currentRaisedSOL + expectedAmountSOL > GENESIS_HARD_CAP_SOL) {
      return sendJson(res, 409, { error: "Genesis hard cap would be exceeded." });
    }

    const transaction = await solanaRpc("getTransaction", [
      transactionSignature,
      {
        encoding: "jsonParsed",
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      },
    ]);

    if (!transaction) return sendJson(res, 404, { error: "Transaction not found on Solana Mainnet." });
    if (transaction.meta?.err) return sendJson(res, 400, { error: "Transaction failed on-chain." });

    const confirmationStatus = transaction.confirmationStatus || transaction.meta?.confirmationStatus;
    if (confirmationStatus && !["confirmed", "finalized"].includes(confirmationStatus)) {
      return sendJson(res, 400, { error: "Transaction is not confirmed." });
    }

    const transfer = getTransferToTreasury(transaction);
    if (!transfer) {
      return sendJson(res, 400, { error: "Transaction does not transfer SOL to the Genesis treasury wallet." });
    }

    const source = transfer.source;
    const lamports = Number(transfer.lamports || 0);
    const actualAmountSOL = lamports / LAMPORTS_PER_SOL;
    const amountDelta = Math.abs(actualAmountSOL - expectedAmountSOL);

    if (amountDelta > 0.000000001) {
      return sendJson(res, 400, { error: "Transaction amount does not match requested contribution." });
    }

    const signers = getSignerAddresses(transaction);
    if (source !== walletAddress && !signers.includes(walletAddress)) {
      return sendJson(res, 400, { error: "Transaction signer does not match connected wallet." });
    }

    const estimatedTotalAfterSOL = currentRaisedSOL + actualAmountSOL;
    const estimatedNEXAllocation = estimatedTotalAfterSOL > 0 ? (actualAmountSOL / estimatedTotalAfterSOL) * GENESIS_POOL : 0;
    const row = {
      wallet_address: walletAddress,
      contribution_amount_sol: actualAmountSOL,
      transaction_signature: transactionSignature,
      treasury_wallet: GENESIS_TREASURY_WALLET,
      network: "Solana Mainnet",
      status: "Confirmed",
      estimated_nex_allocation: estimatedNEXAllocation,
      locked_ns_credits: estimatedNEXAllocation,
      solscan_url: `https://solscan.io/tx/${transactionSignature}`,
      source_page: "/app/genesis",
      notes: "Server-side verified Genesis contribution.",
    };

    const inserted = await supabaseInsert("genesis_contributions", row);
    return sendJson(res, 200, {
      status: "recorded",
      message: "Contribution verified on-chain and recorded.",
      record: inserted[0],
    });
  } catch (error) {
    return sendJson(res, 500, { error: error instanceof Error ? error.message : "Genesis verification failed." });
  }
}

export default handler;
