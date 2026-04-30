import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type LeadPayload = {
  source?: string;
  email?: string;
  name?: string;
  track?: string;
  plan?: string;
  block?: string;
  change?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: LeadPayload;

  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const email = payload.email?.trim().toLowerCase();

  if (!email || !emailPattern.test(email)) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }

  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "leads.json");
  await mkdir(dataDir, { recursive: true });

  let existing: unknown[] = [];
  try {
    existing = JSON.parse(await readFile(filePath, "utf8"));
  } catch {}

  const lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    source: payload.source || "unknown",
    email,
    name: payload.name?.trim() || null,
    track: payload.track || null,
    plan: payload.plan || null,
    block: payload.block?.trim() || null,
    change: payload.change?.trim() || null,
  };

  await writeFile(filePath, JSON.stringify([lead, ...existing], null, 2));

  return Response.json({ ok: true });
}
