import { randomUUID } from "node:crypto";
import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type StoredRating = {
  projectSlug: string;
  projectName: string;
  score: number;
  comment: string;
};

type StoredSubmission = {
  id: string;
  createdAt: string;
  visitorName: string;
  ratings: StoredRating[];
};

const storagePath =
  process.env.RATINGS_STORAGE_PATH ??
  path.join(process.cwd(), "data", "ratings.jsonl");
const maxRequestBytes = 16 * 1024;
const rateLimitWindowMs = 10 * 60 * 1000;
const maxSubmissionsPerWindow = 10;
const submissionAttempts = new Map<string, { count: number; resetAt: number }>();

class RequestBodyTooLargeError extends Error {}

function isRateLimited(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0].trim();
  const address = forwardedFor || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const current = submissionAttempts.get(address);

  if (current && current.resetAt > now) {
    if (current.count >= maxSubmissionsPerWindow) return true;
    current.count += 1;
    return false;
  }

  if (submissionAttempts.size >= 5000) {
    for (const [key, attempt] of submissionAttempts) {
      if (attempt.resetAt <= now) submissionAttempts.delete(key);
    }
    if (submissionAttempts.size >= 5000) {
      submissionAttempts.delete(submissionAttempts.keys().next().value ?? "");
    }
  }

  submissionAttempts.set(address, {
    count: 1,
    resetAt: now + rateLimitWindowMs
  });
  return false;
}

async function readRequestJson(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    throw new RequestBodyTooLargeError();
  }

  const reader = request.body?.getReader();
  if (!reader) return null;

  const decoder = new TextDecoder();
  let bytesRead = 0;
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytesRead += value.byteLength;
    if (bytesRead > maxRequestBytes) {
      await reader.cancel();
      throw new RequestBodyTooLargeError();
    }
    text += decoder.decode(value, { stream: true });
  }

  text += decoder.decode();
  return JSON.parse(text) as unknown;
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function cleanScore(value: unknown) {
  const score = Number(value);

  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.min(10, Math.max(0, Math.round(score)));
}

function readAdminToken(request: NextRequest) {
  const auth = request.headers.get("authorization") ?? "";

  if (auth.startsWith("Bearer ")) {
    return auth.slice(7).trim();
  }

  return "";
}

function requireAdmin(request: NextRequest) {
  const expected = process.env.RATINGS_ADMIN_TOKEN;

  if (!expected) {
    return NextResponse.json(
      { error: "RATINGS_ADMIN_TOKEN n'est pas configuré." },
      { status: 503 }
    );
  }

  if (readAdminToken(request) !== expected) {
    return NextResponse.json({ error: "Accès refusé." }, { status: 401 });
  }

  return null;
}

async function readSubmissions() {
  let content = "";

  try {
    content = await readFile(/* turbopackIgnore: true */ storagePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  return content
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line) as StoredSubmission;
      } catch {
        return null;
      }
    })
    .filter((submission): submission is StoredSubmission => submission !== null)
    .reverse();
}

async function forwardToWebhook(submission: StoredSubmission) {
  const webhookUrl = process.env.RATINGS_WEBHOOK_URL;

  if (!webhookUrl) {
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(submission)
    });
  } catch {
    // La copie webhook ne doit pas empêcher l'enregistrement local.
  }
}

export async function GET(request: NextRequest) {
  const unauthorized = requireAdmin(request);

  if (unauthorized) {
    return unauthorized;
  }

  const submissions = await readSubmissions();

  return NextResponse.json({ submissions });
}

export async function POST(request: NextRequest) {
  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: "Trop d'avis envoyés. Réessaie dans quelques minutes." },
      { status: 429, headers: { "Retry-After": String(rateLimitWindowMs / 1000) } }
    );
  }

  let body: {
    visitorName?: unknown;
    ratings?: unknown;
  } | null;

  try {
    body = (await readRequestJson(request)) as typeof body;
  } catch (error) {
    const tooLarge = error instanceof RequestBodyTooLargeError;
    return NextResponse.json(
      { error: tooLarge ? "Avis trop volumineux." : "Avis invalide." },
      { status: tooLarge ? 413 : 400 }
    );
  }

  if (!body || typeof body.ratings !== "object" || Array.isArray(body.ratings)) {
    return NextResponse.json({ error: "Avis invalide." }, { status: 400 });
  }

  const ratings = Object.entries(body.ratings as Record<string, unknown>).map(
    ([projectSlug, rating]) => {
      const source =
        rating && typeof rating === "object" && !Array.isArray(rating)
          ? (rating as Record<string, unknown>)
          : {};

      return {
        projectSlug: cleanText(projectSlug, 80),
        projectName:
          cleanText(source.projectName, 120) || cleanText(projectSlug, 80),
        score: cleanScore(source.score),
        comment: cleanText(source.comment, 1200)
      };
    }
  );

  if (ratings.length === 0) {
    return NextResponse.json({ error: "Aucun projet noté." }, { status: 400 });
  }

  const submission: StoredSubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    visitorName: cleanText(body.visitorName, 120),
    ratings
  };

  await mkdir(path.dirname(storagePath), { recursive: true });
  await appendFile(storagePath, `${JSON.stringify(submission)}\n`, "utf8");
  await forwardToWebhook(submission);

  return NextResponse.json({ ok: true, id: submission.id });
}
