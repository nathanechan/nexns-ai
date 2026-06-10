import { buildPublicAnalytics, getConfirmedRecords, getSupabaseConfig, sendJson } from "./_shared.js";

async function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  if (!getSupabaseConfig().configured) {
    return sendJson(res, 200, {
      source: "unconfigured",
      message: "Genesis cloud analytics are not configured. Local contribution records may still be visible.",
      analytics: buildPublicAnalytics([]),
    });
  }

  try {
    const records = await getConfirmedRecords(5000);
    return sendJson(res, 200, {
      source: "server",
      message: "Verified Genesis analytics loaded.",
      analytics: buildPublicAnalytics(records),
    });
  } catch {
    return sendJson(res, 500, { error: "Unable to load Genesis analytics. Please try again later." });
  }
}

export default handler;
