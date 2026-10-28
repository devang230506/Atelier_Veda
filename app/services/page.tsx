import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";

export const metadata: Metadata = { title: "Services" };

const services = [
  ["01", "Architecture", "Site planning, concept design and architectural coordination shaped around climate, context and the way people use a space.", "New homes · Extensions · Feasibility"],
  ["02", "Interior design", "Room planning, material palettes, lighting and bespoke details that make interiors feel coherent and practical.", "Homes · Apartments · Hospitality"],
  ["03", "Workplaces", "Work settings that balance daylight, acoustics, shared spaces and the needs of the people who use them every day.", "Studios · Offices · Retail"],
  ["04", "Landscape & lighting", "Outdoor rooms, planting and layered lighting that extend the architecture into the evening and across the seasons.", "Courtyards · Gardens · Lighting plans"],
];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Studio services" title="A considered process, from first conversation to final detail." description="The right scope depends on the site, the brief and the support a project needs." />
      <section className="page-content"><div className="wrap">
        <div className="service-grid">{services.map(([number, title, body, tags]) => <Reveal key={number} className="service-card"><span>{number}</span><h2>{title}</h2><p>{body}</p><p className="eyebrow" style={{ marginTop: "1.2rem", marginBottom: 0 }}>{tags}</p></Reveal>)}</div>
        <div className="service-cta"><h2>Have a project in mind?</h2><Link className="pill-link" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div>
      </div></section>
    </>
  );
}
