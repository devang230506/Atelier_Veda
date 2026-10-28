import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return <LegalPage eyebrow="Information" title="Terms of use." description="Basic terms for browsing this concept website." notice="Demo terms only. The site operator, governing law and any project appointment terms must be confirmed before launch." sections={[
    { title: "Using this website", paragraphs: ["You may browse the site for personal, informational use. Do not interfere with the site, attempt unauthorised access or use content in a way that breaks applicable law or another person’s rights."] },
    { title: "Information and project examples", paragraphs: ["Project names, locations, dimensions and narratives are illustrative concept content. Stock photography is not evidence that Atelier Veda completed the depicted work.", "Website content is general information. It is not a quote, construction specification, professional appointment or promise of a particular project result."] },
    { title: "Project engagements", paragraphs: ["Any appointment, fee, deliverable, schedule, site responsibility, intellectual-property licence or construction service must be agreed in a separate written proposal or contract."] },
    { title: "Third-party media", paragraphs: ["The site links to or requests files from third-party services, including Unsplash and Google Fonts. Those services operate independently and have their own terms."] },
  ]} />;
}
