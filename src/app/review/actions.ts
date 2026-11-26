"use server";

import { refresh, updateTag } from "next/cache";
import { categories } from "@/content/services";
import { siteConfig } from "@/content/site";
import { isValidKey } from "@/lib/review-keys";
import { addReview, deleteReview, REVIEWS_TAG, ReviewStorageError, setReviewHidden } from "@/lib/reviews";

export type ReviewFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "service" | "rating" | "text", string>>;
};

const serviceNames = new Set([...categories.map((c) => c.name), "Other work"]);
const areaNames = new Set<string>([...siteConfig.serviceAreas, "Other"]);

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/** Customer submits a review from the private link. Published straight away. */
export async function submitReview(_prev: ReviewFormState, formData: FormData): Promise<ReviewFormState> {
  if (!isValidKey("REVIEW_FORM_KEY", formData.get("key"))) {
    return { status: "error", message: "This review link is no longer valid. Please ask us for a new one." };
  }
  // Honeypot: real people never fill this hidden field; bots usually do.
  if (String(formData.get("company") ?? "") !== "") {
    return { status: "success" };
  }

  const name = clean(formData.get("name"), 40);
  const area = clean(formData.get("area"), 40);
  const service = clean(formData.get("service"), 60);
  const rating = Number(formData.get("rating"));
  const text = String(formData.get("text") ?? "").trim().slice(0, 600);

  const fieldErrors: ReviewFormState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Please enter your name.";
  if (!serviceNames.has(service)) fieldErrors.service = "Please choose the work we did.";
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) fieldErrors.rating = "Please choose a star rating.";
  if (text.length < 10) fieldErrors.text = "Please write a few words (at least 10 characters).";
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  try {
    await addReview({ name, area: areaNames.has(area) ? area : "", service, rating, text });
  } catch (error) {
    console.error("Saving review failed", error);
    return {
      status: "error",
      message:
        error instanceof ReviewStorageError
          ? "Sorry, we could not save your review right now. Please send it to us on WhatsApp instead."
          : "Something went wrong. Please try again in a minute.",
    };
  }

  // Show the new review on the website immediately.
  updateTag(REVIEWS_TAG);
  return { status: "success" };
}

/* ---------- Admin actions (private admin page) ---------- */

async function adminAction(formData: FormData, run: (id: string) => Promise<void>) {
  if (!isValidKey("REVIEW_ADMIN_KEY", formData.get("key"))) throw new Error("Not allowed");
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await run(id);
  updateTag(REVIEWS_TAG);
  refresh();
}

export async function hideReviewAction(formData: FormData) {
  await adminAction(formData, (id) => setReviewHidden(id, true));
}

export async function showReviewAction(formData: FormData) {
  await adminAction(formData, (id) => setReviewHidden(id, false));
}

export async function deleteReviewAction(formData: FormData) {
  await adminAction(formData, deleteReview);
}
