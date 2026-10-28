import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return <LegalPage eyebrow="Information" title="Accessibility." description="The design aims to make the studio’s work and information usable by as many people as possible." notice="This statement describes the current concept demo. The site has not been independently audited, and no conformance level is claimed." sections={[
    { title: "Current approach", paragraphs: ["The site includes keyboard focus styles, a skip link, responsive layouts, text alternatives for project images and support for reduced motion. The room scene also has direct chapter buttons and a static fallback."] },
    { title: "Known limits", paragraphs: ["Contrast, keyboard use, screen reader behavior, zoom and motion settings should be reviewed across supported browsers before launch. The 3D view is an enhancement; the written chapter content remains available in HTML."] },
    { title: "Report an issue", paragraphs: ["The contact form is a local demo and does not transmit messages. Add a working accessibility contact after studio launch details are confirmed."] },
  ]} />;
}
