"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { siteConfig } from "@/content/site";
import { formatPKR, pkMobileError, whatsappUrl } from "@/lib/utils";
import { Modal } from "@/components/modal";
import { useQuote } from "@/components/quote-provider";
import { WhatsAppIcon } from "@/components/icons";

export function QuoteDrawer() {
  const { lines, estimate, isOpen, close, setQty, remove, clear } = useQuote();
  const [phoneError, setPhoneError] = useState("");

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const area = String(data.get("area") ?? "");
    const phoneProblem = phone ? pkMobileError(phone) : null;
    if (phoneProblem) {
      setPhoneError(`${phoneProblem} Or leave it empty.`);
      return;
    }
    setPhoneError("");

    const message = [
      `Assalam o Alaikum ${siteConfig.name}, I'd like a quote for:`,
      "",
      ...lines.map(
        (l, i) =>
          `${i + 1}. ${l.entry.name} x ${l.qty} (${l.entry.unit}) - ${l.entry.from ? "from " : ""}${formatPKR(l.entry.price * l.qty)}`,
      ),
      "",
      `Estimate: ${formatPKR(estimate)}`,
      ...(name ? [`Name: ${name}`] : []),
      ...(phone ? [`Phone: ${phone}`] : []),
      ...(area ? [`Area: ${area}, ${siteConfig.city}`] : []),
    ].join("\n");

    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <Modal
      open={isOpen}
      onClose={close}
      label="Your quote list"
      className="m-0 ml-auto h-dvh max-h-none w-full max-w-md"
    >
      <div className="drawer-in flex h-full flex-col bg-paper">
        <div className="flex items-center justify-between border-b border-line bg-white px-5 py-4">
          <div>
            <h2 className="text-2xl">Your quote list</h2>
            <p className="text-sm text-steel">Labour rates, sent to us on WhatsApp</p>
          </div>
          <button
            type="button"
            onClick={close}
            className="flex size-10 items-center justify-center rounded-xl hover:bg-paper"
            aria-label="Close quote list"
          >
            <svg viewBox="0 0 24 24" className="size-5" stroke="currentColor" strokeWidth={2} fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
            <p className="text-lg font-semibold">Your quote list is empty</p>
            <p className="text-steel">
              Add the services you need, set quantities, and send them to us in one WhatsApp message.
            </p>
            <Link
              href="/services"
              onClick={close}
              className="rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-deep"
            >
              Browse services
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 py-4">
                  {l.entry.image ? (
                    <Image
                      src={l.entry.image}
                      alt=""
                      width={80}
                      height={60}
                      className="h-15 w-20 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <span aria-hidden="true" className="h-15 w-20 shrink-0 rounded-xl bg-line" />
                  )}
                  <div className="min-w-0 flex-1">
                    <Link href={l.entry.href} onClick={close} className="font-semibold hover:text-brand">
                      {l.entry.name}
                    </Link>
                    <p className="text-sm text-steel">
                      {l.entry.from && "from "}
                      {formatPKR(l.entry.price)} {l.entry.unit}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <QtyStepper
                        label={l.entry.name}
                        value={l.qty}
                        onChange={(q) => setQty(l.key, q)}
                      />
                      <button
                        type="button"
                        onClick={() => remove(l.key)}
                        className="text-sm text-steel underline underline-offset-2 hover:text-live"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-bold whitespace-nowrap tabular-nums">{formatPKR(l.entry.price * l.qty)}</p>
                </li>
              ))}
            </ul>

            <form onSubmit={send} noValidate className="space-y-3 border-t border-line bg-white px-5 py-4">
              <div className="flex items-baseline justify-between">
                <span className="font-semibold">Estimate</span>
                <span className="text-2xl font-extrabold tabular-nums">{formatPKR(estimate)}</span>
              </div>
              <p className="text-sm text-steel">Labour estimate. Final quote confirmed after we check the site.</p>
              <div className="grid grid-cols-2 gap-2">
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Name (optional)"
                  aria-label="Name (optional)"
                  className="rounded-xl border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                />
                <select
                  name="area"
                  aria-label="Area (optional)"
                  defaultValue=""
                  className="rounded-xl border border-line bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                >
                  <option value="">Area (optional)</option>
                  {siteConfig.serviceAreas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Mobile (optional)"
                  aria-label="Mobile (optional)"
                  aria-invalid={!!phoneError}
                  className="col-span-2 rounded-xl border border-line px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-[invalid=true]:border-live"
                />
              </div>
              {phoneError && <p className="text-sm text-live">{phoneError}</p>}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-wa px-5 py-3.5 font-semibold text-white hover:bg-[#178f47]"
              >
                <WhatsAppIcon className="size-5" />
                Send quote request on WhatsApp
              </button>
              <button type="button" onClick={clear} className="w-full text-sm text-steel underline underline-offset-2">
                Clear list
              </button>
            </form>
          </>
        )}
      </div>
    </Modal>
  );
}

export function QtyStepper({
  value,
  onChange,
  label,
  min = 1,
  size = "sm",
}: {
  value: number;
  onChange: (qty: number) => void;
  label: string;
  min?: number;
  size?: "sm" | "lg";
}) {
  const btn = `flex ${size === "lg" ? "size-12" : "size-8"} items-center justify-center text-lg font-semibold hover:bg-brand-soft hover:text-brand disabled:opacity-40`;
  return (
    <div className="inline-flex items-center rounded-xl border border-line bg-white">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Fewer ${label}`}>
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={999}
        value={value}
        onChange={(e) => {
          const n = parseInt(e.target.value, 10);
          if (!Number.isNaN(n)) onChange(Math.max(min, Math.min(n, 999)));
        }}
        aria-label={`Quantity of ${label}`}
        className="w-10 [appearance:textfield] border-x border-line bg-transparent py-1 text-center text-sm tabular-nums focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button type="button" className={btn} onClick={() => onChange(value + 1)} aria-label={`More ${label}`}>
        +
      </button>
    </div>
  );
}
