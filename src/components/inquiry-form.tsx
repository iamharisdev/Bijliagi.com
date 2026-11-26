"use client";

import { useId, useState, type FormEvent } from "react";
import { siteConfig } from "@/content/site";
import { pkMobileError, whatsappUrl } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons";

type Props = {
  /** Service names for the dropdown (passed from the server to keep this bundle small). */
  serviceOptions: string[];
  defaultService?: string;
};

type Errors = Partial<Record<"name" | "phone" | "service", string>>;

const inputClass =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-ink placeholder:text-steel/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 aria-[invalid=true]:border-live";

export function InquiryForm({ serviceOptions, defaultService = "" }: Props) {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "");
    const area = String(data.get("area") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    const phoneProblem = pkMobileError(phone);
    if (phoneProblem) next.phone = phoneProblem;
    if (!service) next.service = "Choose a service.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    const lines = [
      `Assalam o Alaikum ${siteConfig.name},`,
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
    ];
    if (area) lines.push(`Area: ${area}, ${siteConfig.city}`);
    if (message) lines.push(`Details: ${message}`);

    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Your name" error={errors.name}>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            className={inputClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
          />
        </Field>
        <Field id={`${id}-phone`} label="Mobile / WhatsApp" error={errors.phone}>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0300 1234567 or +92 300 1234567"
            className={inputClass}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${id}-service`} label="Service" error={errors.service}>
          <select
            id={`${id}-service`}
            name="service"
            defaultValue={defaultService}
            className={inputClass}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? `${id}-service-error` : undefined}
          >
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field id={`${id}-area`} label="Area (optional)">
          <select id={`${id}-area`} name="area" defaultValue="" className={inputClass}>
            <option value="">Select area</option>
            {siteConfig.serviceAreas.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>
      </div>

      <Field id={`${id}-message`} label="What do you need done? (optional)">
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          placeholder="e.g. Re-wiring for a 10 marla house, 2 floors"
          className={inputClass}
        />
      </Field>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-wa px-6 py-3.5 font-semibold text-white hover:bg-[#178f47] sm:w-auto"
      >
        <WhatsAppIcon className="size-5" />
        Send on WhatsApp
      </button>

      <p role="status" className="text-sm text-steel">
        {sent
          ? "WhatsApp opened with your message. Press send there to reach us."
          : "Your details open in WhatsApp as a ready message. Nothing is sent until you press send."}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-live">
          {error}
        </p>
      )}
    </div>
  );
}
