import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";

export const metadata: Metadata = { title: "Studio" };

const disciplines = [
  ["01 / Plan", "Architecture", "Site, climate, circulation and proportion."],
  ["02 / Shape", "Interiors", "Rooms, materials, joinery and natural light."],
  ["03 / Extend", "Landscape", "Courtyards, planting and the threshold between inside and out."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About the studio" title="Design is a way of paying attention." description="Architecture, interiors and landscape considered together, with light, material and daily life at the centre." />
      <section className="page-content"><div className="wrap">
        <div className="about-intro"><Reveal><h2>Begin with the life inside.</h2></Reveal><Reveal><p>This studio concept is guided by a simple idea: a building should respond to its climate, its street and the people inside it. Careful planning and tactile materials can make rooms feel calm on day one and richer over time.</p><p>Across homes, workspaces and hospitality settings, the design approach stays attentive to light, circulation and detail.</p></Reveal></div>
        <div className="discipline-grid">{disciplines.map(([number, title, description]) => <Reveal key={number} className="discipline-card"><span>{number}</span><h2>{title}</h2><p>{description}</p></Reveal>)}</div>
      </div></section>
    </>
  );
}
