import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of service",
  alternates: { canonical: "/terms" },
};

// TEMPLATE: review with your own terms before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" path="/terms" updated="26 November 2026">
      <h2>Prices</h2>
      <p>We give you a price on WhatsApp or after a site visit where needed. The price is agreed with you before any work starts, and anything extra is agreed first.</p>
      <h2>Contracts</h2>
      <p>Larger jobs are carried out under a written contract that sets out scope, price, materials, timeline and payment milestones. The contract takes priority over this website.</p>
      <h2>Materials</h2>
      <p>Unless the contract says otherwise, rates exclude materials. We can supply material at market price or use material you provide.</p>
      <h2>Scope</h2>
      <p>We do internal electrical work only. Grid work (meters, new connections, poles and street lines) is handled by WAPDA/LESCO.</p>
      <h2>Contact</h2>
      <p>{siteConfig.email}, {siteConfig.phoneDisplay}</p>
    </LegalPage>
  );
}
