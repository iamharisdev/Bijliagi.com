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
      <h2>Rates</h2>
      <p>Rates on this website are standard labour rates for {siteConfig.city} and are a guide. The final price is confirmed with you before work starts, after a site visit where needed.</p>
      <h2>Contracts</h2>
      <p>Larger jobs are carried out under a written contract that sets out scope, rates, materials, timeline and payment milestones. The contract takes priority over this website.</p>
      <h2>Materials</h2>
      <p>Unless the contract says otherwise, rates exclude materials. We can supply material at market price or use material you provide.</p>
      <h2>Scope</h2>
      <p>We do internal electrical work only. Grid work (meters, new connections, poles and street lines) is handled by WAPDA/LESCO.</p>
      <h2>Contact</h2>
      <p>{siteConfig.email}, {siteConfig.phoneDisplay}</p>
    </LegalPage>
  );
}
