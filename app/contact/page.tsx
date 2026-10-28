import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import DemoForm from "@/components/demo-form";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <><PageHero eyebrow="Start a conversation" title="Let’s talk about your space." description="Tell us what you are imagining, what the site is asking for, and what matters most to you." /><section className="page-content"><div className="wrap contact-layout"><div><span className="eyebrow">Project enquiry</span><h2>Begin with the brief.</h2><p className="form-note">This is a visual demo. Verified studio contact details and a live enquiry channel have not been connected.</p></div><DemoForm /></div></section></>;
}
