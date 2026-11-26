/**
 * Customer reviews storage. Server code only: never import this from a "use client" file.
 *
 * Live site: Upstash Redis (free tier). Set these env vars on your host:
 *   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN
 *   (the Vercel "Upstash for Redis" integration sets KV_REST_API_URL + KV_REST_API_TOKEN, which also work)
 * Your computer (npm run dev / npm start without those vars): reviews are saved in .data/reviews.json.
 */
import { cacheLife, cacheTag } from "next/cache";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

export type Review = {
  id: string;
  name: string;
  area: string;
  service: string;
  rating: number;
  text: string;
  /** ISO date */
  createdAt: string;
  hidden: boolean;
};

export const REVIEWS_TAG = "reviews";

const HASH_KEY = "bijliagi:reviews";
const LOCAL_FILE = join(process.cwd(), ".data", "reviews.json");

const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const useRedis = Boolean(redisUrl && redisToken);

export class ReviewStorageError extends Error {}

/* ---------- Storage backends ---------- */

async function redis<T>(command: Array<string | number>): Promise<T> {
  const res = await fetch(redisUrl!, {
    method: "POST",
    headers: { Authorization: `Bearer ${redisToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const data = (await res.json()) as { result?: T; error?: string };
  if (!res.ok || data.error) throw new ReviewStorageError(data.error ?? `Redis error ${res.status}`);
  return data.result as T;
}

async function readLocal(): Promise<Record<string, Review>> {
  try {
    return JSON.parse(await readFile(LOCAL_FILE, "utf8")) as Record<string, Review>;
  } catch {
    return {};
  }
}

async function writeLocal(all: Record<string, Review>) {
  await mkdir(join(process.cwd(), ".data"), { recursive: true });
  await writeFile(LOCAL_FILE, JSON.stringify(all, null, 2));
}

function assertWritable() {
  // Hosting platforms like Vercel have a read-only disk, so a database is required there.
  if (!useRedis && process.env.VERCEL) {
    throw new ReviewStorageError("Review storage is not set up. Add the Upstash Redis env vars on the host.");
  }
}

function isReview(v: unknown): v is Review {
  const r = v as Review;
  return !!r && typeof r.id === "string" && typeof r.name === "string" && typeof r.text === "string" && typeof r.rating === "number";
}

/* ---------- Public API ---------- */

/** Every review, newest first, including hidden ones. Not cached: for the admin page and actions. */
export async function listAllReviews(): Promise<Review[]> {
  let values: unknown[] = [];
  if (useRedis) {
    const flat = (await redis<string[] | null>(["HGETALL", HASH_KEY])) ?? [];
    for (let i = 1; i < flat.length; i += 2) {
      try {
        values.push(JSON.parse(flat[i]));
      } catch {
        // skip a corrupt entry
      }
    }
  } else {
    values = Object.values(await readLocal());
  }
  return values.filter(isReview).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Visible reviews for the website. Cached, and refreshed instantly when a review is added or changed. */
export async function getPublishedReviews(): Promise<Review[]> {
  "use cache";
  cacheTag(REVIEWS_TAG);
  cacheLife("hours");
  try {
    return (await listAllReviews()).filter((r) => !r.hidden);
  } catch {
    // Never break the website because the review store is unreachable.
    return [];
  }
}

export async function addReview(input: Omit<Review, "id" | "createdAt" | "hidden">): Promise<Review> {
  assertWritable();
  const review: Review = { ...input, id: randomUUID(), createdAt: new Date().toISOString(), hidden: false };
  if (useRedis) {
    await redis(["HSET", HASH_KEY, review.id, JSON.stringify(review)]);
  } else {
    const all = await readLocal();
    all[review.id] = review;
    await writeLocal(all);
  }
  return review;
}

export async function setReviewHidden(id: string, hidden: boolean): Promise<void> {
  assertWritable();
  if (useRedis) {
    const raw = await redis<string | null>(["HGET", HASH_KEY, id]);
    if (!raw) return;
    const review = { ...(JSON.parse(raw) as Review), hidden };
    await redis(["HSET", HASH_KEY, id, JSON.stringify(review)]);
  } else {
    const all = await readLocal();
    if (!all[id]) return;
    all[id] = { ...all[id], hidden };
    await writeLocal(all);
  }
}

export async function deleteReview(id: string): Promise<void> {
  assertWritable();
  if (useRedis) {
    await redis(["HDEL", HASH_KEY, id]);
  } else {
    const all = await readLocal();
    delete all[id];
    await writeLocal(all);
  }
}
