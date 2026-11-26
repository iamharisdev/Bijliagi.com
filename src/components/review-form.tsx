"use client";

import Link from "next/link";
import { useActionState, useId, useState } from "react";
import { submitReview, type ReviewFormState } from "@/app/review/actions";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckIcon, StarIcon } from "@/components/icons";

const initialState: ReviewFormState = { status: "idle" };
const ratingWords = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-steel/60 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 aria-[invalid=true]:border-live";

export function ReviewForm({ formKey, services, areas }: { formKey: string; services: string[]; areas: readonly string[] }) {
  const id = useId();
  const [state, action, pending] = useActionState(submitReview, initialState);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  // Controlled fields keep what the customer typed if the server asks them to fix something.
  const [values, setValues] = useState({ name: "", area: "", service: "", text: "" });
  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }));
  const errors = state.fieldErrors ?? {};
  const shown = hover || rating;

  if (state.status === "success") {
    return (
      <div className="pop-in py-6 text-center">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full bg-wa/10 text-wa">
          <CheckIcon className="size-10" />
        </span>
        <h2 className="mt-6 text-4xl">Shukriya! Thank you</h2>
        <p className="mx-auto mt-3 max-w-sm text-steel">
          Your review is now on our website. It really helps other families choose a safe electrician.
        </p>
        <Link
          href="/#reviews"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white hover:bg-brand-deep"
        >
          See your review
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="space-y-6">
      <input type="hidden" name="key" value={formKey} />
      {/* Honeypot for bots: hidden from people and screen readers */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Star rating */}
      <fieldset aria-describedby={errors.rating ? `${id}-rating-error` : undefined}>
        <legend className="text-sm font-semibold">How was our work?</legend>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <div className="flex gap-1.5" onMouseLeave={() => setHover(0)}>
            {[1, 2, 3, 4, 5].map((n) => (
              <label key={n} className="cursor-pointer" onMouseEnter={() => setHover(n)}>
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  className="peer sr-only"
                  aria-label={`${n} star${n > 1 ? "s" : ""}, ${ratingWords[n]}`}
                />
                <StarIcon
                  className={cn(
                    "size-11 rounded-lg transition-all duration-150 peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-bright sm:size-12",
                    n <= shown ? "scale-105 text-spark drop-shadow-[0_4px_8px_rgb(255_199_44/0.5)]" : "text-line hover:text-spark/50",
                  )}
                />
              </label>
            ))}
          </div>
          <span className={cn("text-lg font-bold transition-opacity", shown ? "text-ink opacity-100" : "opacity-0")} aria-hidden="true">
            {ratingWords[shown]}
          </span>
        </div>
        {errors.rating && (
          <p id={`${id}-rating-error`} className="mt-2 text-sm text-live">
            {errors.rating}
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Your name" error={errors.name}>
          <input id={`${id}-name`} name="name" value={values.name} onChange={set("name")} autoComplete="name" maxLength={40} placeholder="e.g. Ahmed Khan" className={inputClass} aria-invalid={!!errors.name} />
        </Field>
        <Field id={`${id}-area`} label="Area (optional)">
          <select id={`${id}-area`} name="area" value={values.area} onChange={set("area")} className={inputClass}>
            <option value="">Select area</option>
            {areas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>

      <Field id={`${id}-service`} label="What work did we do?" error={errors.service}>
        <select id={`${id}-service`} name="service" value={values.service} onChange={set("service")} className={inputClass} aria-invalid={!!errors.service}>
          <option value="" disabled>
            Choose the service
          </option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value="Other work">Other work</option>
        </select>
      </Field>

      <Field id={`${id}-text`} label="Your review" error={errors.text}>
        <textarea
          id={`${id}-text`}
          name="text"
          rows={5}
          maxLength={600}
          value={values.text}
          onChange={set("text")}
          placeholder="How was the team, the work and the finish? Would you recommend us?"
          className={inputClass}
          aria-invalid={!!errors.text}
        />
        <p className="mt-1 text-right text-xs text-steel tabular-nums">{values.text.length}/600</p>
      </Field>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl border border-live/30 bg-live/5 px-4 py-3 text-sm text-live">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 text-lg font-semibold text-white shadow-[0_10px_24px_-10px_rgb(22_103_217/0.7)] transition-all hover:bg-brand-deep active:scale-[0.99] disabled:opacity-70"
      >
        {pending ? "Sending…" : "Submit review"}
      </button>
      <p className="text-center text-xs text-steel">Your name, area and review will be shown on our website. Your phone number is never shown.</p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-sm text-live">{error}</p>}
    </div>
  );
}
