"use client";

import { useState } from "react";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";

export function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const waText = `Assalam o Alaikum! Thank you for choosing us. Please share your review here, it takes one minute: ${url}`;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        readOnly
        value={url}
        onFocus={(e) => e.currentTarget.select()}
        aria-label="Customer review link"
        className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3 font-mono text-sm text-white"
      />
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        }}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-ink hover:bg-brand-soft"
      >
        {copied && <CheckIcon className="size-4 text-wa" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(waText)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-wa px-5 py-3 font-semibold text-white hover:bg-[#178f47]"
      >
        <WhatsAppIcon className="size-4" />
        Send on WhatsApp
      </a>
    </div>
  );
}

/** Submit button that asks before deleting. */
export function ConfirmButton({ children, message, className }: { children: React.ReactNode; message: string; className?: string }) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
