import { getConfirmedRecords, getSupabaseConfig, readBody, sendJson } from "./_shared.js";

async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const adminPassword = process.env.GENESIS_ADMIN_PASSWORD;
  if (!adminPassword) {
    return sendJson(res, 503, { error: "Admin access is not configured." });
  }

  if (!getSupabaseConfig().configured) {
    return sendJson(res, 503, { error: "Genesis database is not configured." });
  }

  try {
    const body = await readBody(req);
    if (body.password !== adminPassword) {
      return sendJson(res, 401, { error: "Invalid Genesis admin password." });
    }

    const records = await getConfirmedRecords(5000);
    return sendJson(res, 200, {
      message: "Genesis admin records loaded from protected server endpoint.",
      records,
    });
  } catch {
    return sendJson(res, 500, { error: "Unable to load Genesis admin records." });
  }
}

export default handler;
