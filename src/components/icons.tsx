import type { SVGProps } from "react";
import type { CategoryIcon } from "@/content/services";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2c.2-.6.2-1.1.2-1.2l-.4-.3Z" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2.5} {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 2 4 13.5h6.5L9.5 22 20 9.5h-6.6L13.5 2Z" />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.4 7.5 9.5 4.4-1.1 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m8.8 12 2.2 2.2 4.2-4.4" />
    </svg>
  );
}

export function DocIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M6 3h8.5L19 7.5V21H6V3Z" />
      <path d="M14 3v5h5M9 12h7M9 16h7" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function QuoteListIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M9 11h7M9 15h7M9 7h3" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9L12 2.8Z" />
    </svg>
  );
}

/** One icon per service category. */
export function CategoryGlyph({ icon, ...props }: IconProps & { icon: CategoryIcon }) {
  switch (icon) {
    case "wiring":
      return (
        <svg {...stroke} {...props}>
          <path d="M3 7h5a3 3 0 0 1 3 3v4a3 3 0 0 0 3 3h7" />
          <path d="M3 12h3M18 14v6M21 14v6" />
          <circle cx="8" cy="7" r="0.6" fill="currentColor" />
          <path d="M14.5 4 12.5 8h3l-2 4" />
        </svg>
      );
    case "ac":
      return (
        <svg {...stroke} {...props}>
          <rect x="2.5" y="4" width="19" height="9" rx="2" />
          <path d="M6 10h12M7 16.5c0 1.5-1 2-1 3.5M12 16.5c0 1.5-1 2-1 3.5M17 16.5c0 1.5-1 2-1 3.5" />
        </svg>
      );
    case "generator":
      return (
        <svg {...stroke} {...props}>
          <rect x="3" y="6" width="18" height="12" rx="2" />
          <path d="M7 18v2M17 18v2M7 3h4v3" />
          <path d="M13 9.5 11 12.5h2.5L11.5 15.5" />
        </svg>
      );
    case "light":
      return (
        <svg {...stroke} {...props}>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0 0 12 3Z" />
        </svg>
      );
    case "panel":
      return (
        <svg {...stroke} {...props}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7v4M12 7v4M16 7v4M8 15h8" />
        </svg>
      );
    case "solar":
      return (
        <svg {...stroke} {...props}>
          <path d="M4 14h16l-2.5-7h-11L4 14Z" />
          <path d="M9.5 7 8.5 14M14.5 7l1 7M5.3 10.5h13.4M12 14v4M8 21h8M12 18v3" />
          <path d="M19 2.5v1.5M21.5 5H20M17.2 3.2l.9.9" />
        </svg>
      );
    case "cctv":
      return (
        <svg {...stroke} {...props}>
          <path d="m3.5 7.5 13-4 2.5 6-13 4-2.5-6Z" />
          <path d="M19 9.5 21 9l1 2.5-2.2.7M8.5 12.5 10 17H4.5M4.5 14.5v5" />
          <circle cx="8.5" cy="8.8" r="0.7" fill="currentColor" />
        </svg>
      );
    case "plumbing":
      return (
        <svg {...stroke} {...props}>
          <path d="M4 6h6a3 3 0 0 1 3 3v2h5v4h-5" />
          <path d="M4 3v6M18 9v8M18 19.5c0 .8-.7 1.5-1.5 1.5S15 20.3 15 19.5c0-1 1.5-2.5 1.5-2.5S18 18.5 18 19.5Z" />
        </svg>
      );
  }
}
