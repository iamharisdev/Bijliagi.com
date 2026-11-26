import { siteConfig } from "@/content/site";

export function formatPKR(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Accepts 03XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX or 00923XXXXXXXXX (spaces/dashes allowed). */
export function isValidPkMobile(value: string): boolean {
  return /^(?:\+92|0092|92|0)3\d{9}$/.test(value.replace(/[\s()-]/g, ""));
}

/** Returns a helpful error for an invalid Pakistani mobile number, or null if it is valid. */
export function pkMobileError(value: string): string | null {
  if (isValidPkMobile(value)) return null;
  const compact = value.replace(/[\s()-]/g, "");
  const local = compact.replace(/^(?:\+92|0092|92|0)/, "");
  const example = "Use 0300 1234567 or +92 300 1234567.";
  if (/^\d+$/.test(local) && local.startsWith("3")) {
    if (local.length < 10) return `This number is ${10 - local.length} digit${local.length === 9 ? "" : "s"} short. ${example}`;
    if (local.length > 10) return `This number has ${local.length - 10} extra digit${local.length === 11 ? "" : "s"}. ${example}`;
  }
  return `Enter a mobile number. ${example}`;
}
