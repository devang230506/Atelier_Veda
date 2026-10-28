import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return <LegalPage eyebrow="Information" title="Privacy policy." description="How this concept website handles information and third-party media." notice="Demo policy draft. The legal operator, privacy contact, form provider and retention terms must be confirmed before this page is used for a live service." sections={[
    { title: "Who operates this site", paragraphs: ["This concept website uses the name Atelier Veda. The legal operator has not been identified. Add the registered name, postal address and working privacy contact before launch."] },
    { title: "Information handled by this demo", paragraphs: ["The contact form runs only in your browser. Submitting it shows a demo message, resets the fields and does not send the entered name, email or project details.", "The site requests fonts from Google Fonts and images from Unsplash. Browsers connect to those providers to retrieve the files, subject to their own privacy terms."] },
    { title: "Future enquiries", paragraphs: ["No enquiry service is connected. Before enabling one, explain the data collected, purpose and lawful basis, retention period, recipients and how people can contact the operator or make a request."] },
    { title: "Cookies and storage", paragraphs: ["This demo does not store contact form submissions or intentionally use first-party analytics and advertising cookies. Recheck this statement if a form provider, analytics, booking system or other third-party service is added."] },
    { title: "Questions and updates", paragraphs: ["No privacy contact channel is configured. Add the verified operator name and contact method before launch, and update this page whenever the site’s data use changes."] },
  ]} />;
}
