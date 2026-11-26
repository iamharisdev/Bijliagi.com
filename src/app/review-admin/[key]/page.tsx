import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { siteConfig } from "@/content/site";
import { isValidKey, MIN_KEY_LENGTH } from "@/lib/review-keys";
import { listAllReviews, type Review } from "@/lib/reviews";
import { absoluteUrl, cn } from "@/lib/utils";
import { deleteReviewAction, hideReviewAction, showReviewAction } from "@/app/review/actions";
import { ConfirmButton, CopyLink } from "@/components/review-admin-tools";
import { StarIcon } from "@/components/icons";

/** Private admin page: only reachable with the admin key, never indexed. */
export const metadata: Metadata = {
  title: "Manage reviews",
  robots: { index: false, follow: false, nocache: true },
};

export default function ReviewAdminPage({ params }: PageProps<"/review-admin/[key]">) {
  return (
    <div className="min-h-[80vh] bg-paper pb-24">
      <Suspense fallback={<p className="wrap py-24 text-steel">Loading reviews…</p>}>
        <AdminContent params={params} />
      </Suspense>
    </div>
  );
}

async function AdminContent({ params }: { params: PageProps<"/review-admin/[key]">["params"] }) {
  const { key } = await params;
  if (!isValidKey("REVIEW_ADMIN_KEY", key)) notFound();
  await connection();

  let reviews: Review[] = [];
  let loadError = "";
  try {
    reviews = await listAllReviews();
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Could not load reviews.";
  }

  const visible = reviews.filter((r) => !r.hidden);
  const average = visible.length ? visible.reduce((sum, r) => sum + r.rating, 0) / visible.length : 0;
  const formKey = process.env.REVIEW_FORM_KEY ?? "";
  const customerLink = formKey.length >= MIN_KEY_LENGTH.REVIEW_FORM_KEY ? absoluteUrl(`/review/${formKey}`) : "";

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink py-12 text-white">
        <div className="circuit absolute inset-0 -z-10" />
        <div className="wrap">
          <p className="text-sm font-bold tracking-[0.14em] text-brand-bright uppercase">Private · {siteConfig.name}</p>
          <h1 className="mt-2 text-5xl text-white">Customer reviews</h1>
          <p className="mt-2 text-white/60">Only you can see this page. Keep this link to yourself.</p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="font-semibold">Link to send to a customer</p>
            <p className="mt-1 mb-4 text-sm text-white/60">After a job, send this on WhatsApp. Their review shows on the website as soon as they submit it.</p>
            {customerLink ? (
              <CopyLink url={customerLink} />
            ) : (
              <p className="text-spark">Set REVIEW_FORM_KEY (6+ characters) in your environment to get the customer link.</p>
            )}
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-3 sm:max-w-xl">
            {[
              { label: "On website", value: visible.length },
              { label: "Hidden", value: reviews.length - visible.length },
              { label: "Average", value: average ? `${average.toFixed(1)} ★` : "–" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <dt className="text-xs text-white/60">{s.label}</dt>
                <dd className="condensed order-first text-3xl font-extrabold">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="wrap mt-10">
        {loadError && <p className="mb-6 rounded-xl border border-live/30 bg-live/5 px-4 py-3 text-live">{loadError}</p>}
        {reviews.length === 0 && !loadError ? (
          <p className="rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center text-steel">
            No reviews yet. Send the link above to your next happy customer.
          </p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li
                key={r.id}
                className={cn("rounded-2xl border bg-white p-5 shadow-card md:p-6", r.hidden ? "border-dashed border-line opacity-70" : "border-line")}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex gap-0.5 text-spark" aria-label={`${r.rating} out of 5`}>
                        {Array.from({ length: 5 }, (_, i) => (
                          <StarIcon key={i} className={cn("size-5", i >= r.rating && "text-line")} />
                        ))}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-bold",
                          r.hidden ? "bg-paper text-steel" : "bg-wa/10 text-wa",
                        )}
                      >
                        {r.hidden ? "Hidden" : "On website"}
                      </span>
                    </div>
                    <p className="mt-2 font-bold">
                      {r.name}
                      {r.area && <span className="font-normal text-steel">, {r.area}</span>}
                    </p>
                    <p className="text-sm text-steel">
                      {r.service} · {new Date(r.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Karachi" })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <form action={r.hidden ? showReviewAction : hideReviewAction}>
                      <input type="hidden" name="key" value={key} />
                      <input type="hidden" name="id" value={r.id} />
                      <button type="submit" className="rounded-xl border border-line px-4 py-2 text-sm font-semibold hover:border-brand hover:text-brand">
                        {r.hidden ? "Show on website" : "Hide"}
                      </button>
                    </form>
                    <form action={deleteReviewAction}>
                      <input type="hidden" name="key" value={key} />
                      <input type="hidden" name="id" value={r.id} />
                      <ConfirmButton
                        message={`Delete the review from ${r.name}? This cannot be undone.`}
                        className="rounded-xl border border-line px-4 py-2 text-sm font-semibold text-live hover:border-live hover:bg-live/5"
                      >
                        Delete
                      </ConfirmButton>
                    </form>
                  </div>
                </div>
                <p className="mt-4 whitespace-pre-line">{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
