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

const SYSTEM_PROMPT = `You are NEXNS AI Copilot.
NEXNS is the Global Prediction Growth Infrastructure.
Your role is to help users understand and use NEXNS.
Focus on NEXNS, prediction signals, prediction markets, Signal Creators, users and participants, NEX, NS, Genesis, wallet participation, community contribution, and product guidance.
Rules:
- Do not guarantee token value.
- Do not promise profits.
- Do not provide financial advice.
- Do not claim NEX is live if it is not.
- Explain NEX as the economic layer.
- Explain NS as the participation layer.
- Explain Genesis as future allocation rights.
- When discussing markets, discuss signals, uncertainty, and risks.`;

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

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .slice(-20)
    .map((message) => ({
      role: message?.role === "assistant" ? "assistant" : "user",
      content: String(message?.content || "").slice(0, 8000),
    }))
    .filter((message) => message.content.trim());
}

function buildAgnesEndpoint(baseUrl) {
  const normalized = baseUrl.replace(/\/$/, "");
  if (/\/chat\/completions$/i.test(normalized)) return normalized;
  return `${normalized}/chat/completions`;
}

function extractAssistantMessage(body) {
  if (typeof body?.choices?.[0]?.message?.content === "string") return body.choices[0].message.content;
  if (typeof body?.choices?.[0]?.text === "string") return body.choices[0].text;
  if (typeof body?.output_text === "string") return body.output_text;
  if (typeof body?.message === "string") return body.message;
  if (typeof body?.text === "string") return body.text;
  if (Array.isArray(body?.output)) {
    const text = body.output
      .flatMap((item) => item?.content || [])
      .map((item) => item?.text || "")
      .join("\n")
      .trim();
    if (text) return text;
  }
  return "";
}

async function handler(req, res) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const baseUrl = process.env.AGNES_API_BASE_URL || "https://apihub.agnes-ai.com/v1";
  const apiKey = process.env.AGNES_API_KEY;
  const model = process.env.AGNES_TEXT_MODEL;

  if (!apiKey) {
    return sendJson(res, 503, { error: "AI service is not configured yet." });
  }
  if (!model) {
    return sendJson(res, 503, { error: "AI model is not configured yet." });
  }

  try {
    const body = await readBody(req);
    const messages = normalizeMessages(body.messages);
    const mode = String(body.mode || "Ask NEXNS").slice(0, 80);
    const walletAddress = body.walletAddress ? String(body.walletAddress).slice(0, 80) : "Not connected";
    const pageContext = String(body.pageContext || "NEXNS product").slice(0, 500);

    if (messages.length === 0) {
      return sendJson(res, 400, { error: "Message is required." });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    const providerResponse = await fetch(buildAgnesEndpoint(baseUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "system",
            content: `Current mode: ${mode}. Current page context: ${pageContext}. Connected wallet: ${walletAddress}.`,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 2048,
      }),
    }).finally(() => clearTimeout(timeout));

    const providerBody = await providerResponse.json().catch(() => ({}));
    if (!providerResponse.ok) {
      return sendJson(res, providerResponse.status, {
        error: typeof providerBody?.error?.message === "string" ? providerBody.error.message : "AI response failed. Please try again.",
      });
    }

    const message = extractAssistantMessage(providerBody);
    if (!message) return sendJson(res, 502, { error: "AI provider returned an empty response." });

    return sendJson(res, 200, { message });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return sendJson(res, 504, { error: "AI service timeout. Please try again." });
    }
    return sendJson(res, 500, { error: "AI response failed. Please try again." });
  }
}

export default handler;
