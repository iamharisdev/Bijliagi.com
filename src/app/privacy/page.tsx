import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  alternates: { canonical: "/privacy" },
};

// TEMPLATE: review with your own details before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" path="/privacy" updated="26 November 2026">
      <p>This page explains what information {siteConfig.name} collects and how we use it.</p>
      <h2>What we collect</h2>
      <p>This website has no accounts and stores no forms on our servers. When you send a quote request, it opens WhatsApp with your message; we receive only what you send there (for example your name, number, area and the services you need).</p>
      <p>Your quote list is saved in your own browser so it stays when you come back. You can clear it at any time from the quote list.</p>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your request and prepare a quote</li>
        <li>To arrange site visits and carry out work you agree to</li>
      </ul>
      <p>We do not sell or share your details with third parties for marketing.</p>
      <h2>Contact</h2>
      <p>Questions about your data: {siteConfig.email} or {siteConfig.phoneDisplay}.</p>
    </LegalPage>
  );
}
