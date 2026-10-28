import type { Metadata } from "next";
import PageHero from "@/components/page-hero";

export const metadata: Metadata = { title: "FAQs" };

const questions = [
  ["What kinds of projects do you take on?", "The concept studio covers homes, apartments, workplaces and hospitality spaces. The project scope would be shaped around the site, needs and agreed brief."],
  ["Where do you work?", "Share the site location and project scope to discuss whether the studio is a good fit."],
  ["When should I get in touch?", "As early as possible, ideally before the layout, budget and consultant team are fixed. Early input can help align the brief with the site constraints."],
  ["What happens in the first meeting?", "A first conversation can cover your goals, site, timing and budget range. A written proposal can then set out the agreed scope and next steps."],
  ["Do you manage construction?", "Site visits and coordination can be included when they are part of the agreed project scope. Construction services and responsibilities belong in a signed proposal."],
  ["Are the projects on this site built?", "No. The projects are illustrative concept studies. Their locations, sizes and narratives are fictional, and the photography is illustrative."],
];

export default function FAQPage() {
  return <><PageHero eyebrow="Useful details" title="Questions, answered." description="A few useful details about starting a project and exploring the concept work." /><section className="page-content"><div className="wrap faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section></>;
}
