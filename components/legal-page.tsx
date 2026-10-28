import PageHero from "@/components/page-hero";

export type LegalSection = { title: string; paragraphs: string[] };

export default function LegalPage({ eyebrow, title, description, notice, sections }: {
  eyebrow: string;
  title: string;
  description: string;
  notice: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="page-content"><div className="wrap legal-copy">
        <p className="legal-note">{notice}</p>
        <p><strong>Last updated:</strong> 28 October 2026</p>
        {sections.map((section) => <article key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</article>)}
      </div></section>
    </>
  );
}
