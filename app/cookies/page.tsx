import type { Metadata } from "next";
import LegalPage from "@/components/legal-page";

export const metadata: Metadata = { title: "Cookies and media" };

export default function CookiesPage() {
  return <LegalPage eyebrow="Information" title="Cookies & media." description="A clear note about cookies and files requested from other services." notice="Current demo setup. This page describes the current site and should be reviewed if the owner adds analytics, advertising, embedded media or other tools." sections={[
    { title: "What the site loads", paragraphs: ["The page requests typography from Google Fonts and photographs from Unsplash. Your browser connects to those providers to retrieve the assets. Their policies govern those requests."] },
    { title: "Cookies and local storage", paragraphs: ["This demo has no analytics or advertising tools and does not intentionally set first-party tracking cookies or use local storage. Recheck this if the site changes."] },
    { title: "Managing cookies", paragraphs: ["You can review or clear cookies in your browser settings. If the live site uses non-essential cookies or tracking, add an appropriate consent choice and update this page."] },
    { title: "External media", paragraphs: ["Images are loaded remotely, so they may not appear offline or when a provider is unavailable. Review the applicable licences and provider terms before launch."] },
  ]} />;
}
