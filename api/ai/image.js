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
      if (parsed && process.env[parsed.key] === undefined) process.env[parsed.key] = parsed.value;
    }
    return;
  }
}

loadLocalEnv();

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

function buildAgnesImageEndpoint(baseUrl) {
  const normalized = baseUrl.replace(/\/$/, "");
  if (/\/images\/generations$/i.test(normalized)) return normalized;
  return `${normalized}/images/generations`;
}

function extractImageUrl(body) {
  if (typeof body?.data?.[0]?.url === "string") return body.data[0].url;
  return "";
}

async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const baseUrl = process.env.AGNES_API_BASE_URL || "https://apihub.agnes-ai.com/v1";
  const apiKey = process.env.AGNES_API_KEY;
  const model = process.env.AGNES_IMAGE_MODEL;

  if (!apiKey) {
    return sendJson(res, 503, { error: "AI image service is not configured." });
  }
  if (!model) {
    return sendJson(res, 503, { error: "Image model is not configured." });
  }

  try {
    const body = await readBody(req);
    const prompt = String(body?.prompt || "").trim().slice(0, 4000);

    if (!prompt) {
      return sendJson(res, 400, { error: "Prompt is required." });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60_000);

    const providerResponse = await fetch(buildAgnesImageEndpoint(baseUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        prompt,
        size: "1024x768",
        extra_body: {
          response_format: "url",
        },
      }),
    }).finally(() => clearTimeout(timeout));

    const providerBody = await providerResponse.json().catch(() => ({}));
    if (!providerResponse.ok) {
      return sendJson(res, providerResponse.status, {
        error: typeof providerBody?.error?.message === "string" ? providerBody.error.message : "Image generation failed.",
      });
    }

    const imageUrl = extractImageUrl(providerBody);
    if (!imageUrl) return sendJson(res, 502, { error: "Image generation completed but no image URL was returned." });

    return sendJson(res, 200, { imageUrl });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return sendJson(res, 504, { error: "Image generation failed." });
    }
    return sendJson(res, 500, { error: "Image generation failed." });
  }
}

export default handler;
