import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `How ${siteConfig.name} uses the details you send on WhatsApp and in reviews.`,
  alternates: { canonical: "/privacy" },
};

// TEMPLATE: review with your own details before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" path="/privacy" updated="26 November 2026">
      <p>This page explains what information {siteConfig.name} collects and how we use it.</p>
      <h2>What we collect</h2>
      <p>This website has no accounts. When you contact us about a service, it opens WhatsApp with your message; we receive only what you send there (for example your name, number, area and the work you need).</p>
      <p>If you leave a review through the link we send you, we store the name, area, service, rating and review you enter, and show them on this website. We do not store your phone number with reviews. Ask us on WhatsApp to change or remove your review at any time.</p>
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
