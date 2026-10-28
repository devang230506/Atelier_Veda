import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/reveal";
import AnimatedHeading from "@/components/animated-heading";
import { projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="project-detail-hero"><img src={project.image} alt={project.alt} fetchPriority="high" decoding="async" /><div className="project-detail-title"><span className="eyebrow">{project.category}</span><AnimatedHeading text={project.title} /></div></section>
      <section className="page-content"><div className="wrap">
        <p className="legal-note">Illustrative concept study. The project, location, area and design narrative are fictional and shown for visual presentation only.</p>
        <dl className="project-facts"><div><dt>Concept location</dt><dd>{project.location}</dd></div><div><dt>Illustrative area</dt><dd>{project.area}</dd></div><div><dt>Concept year</dt><dd>{project.year}</dd></div><div><dt>Palette</dt><dd>{project.palette[0]}</dd></div></dl>
        <div className="project-story"><Reveal><span className="eyebrow">The brief</span><h2>Everyday life, thoughtfully arranged.</h2></Reveal><Reveal><p>{project.summary}</p><p>The concept explores a clear sequence through the space, where natural light, tactile finishes and useful details support a calm daily rhythm.</p></Reveal></div>
        <div className="project-gallery" aria-label={`${project.title} visual study`}>
          {project.gallery.map((image, index) => (
            <Reveal key={image.src} className={`project-gallery-card project-gallery-card-${index + 1}`} motion={index === 0 ? "left" : "right"}>
              <figure><img src={image.src} alt={image.alt} loading="lazy" decoding="async" /><figcaption><span>0{index + 1}</span> Material, light and everyday life</figcaption></figure>
            </Reveal>
          ))}
        </div>
        <div className="project-story"><Reveal><span className="eyebrow">Material direction</span><h2>A restrained palette, with texture in every layer.</h2></Reveal><Reveal><p>{project.palette.join(" · ")}. Materials are explored here as a visual direction, not a construction specification.</p></Reveal></div>
        <div className="project-detail-end"><Link className="text-link" href="/projects"><span aria-hidden="true">←</span> Back to selected work</Link><span className="eyebrow">Atelier Veda / Concept studies</span></div>
      </div></section>
    </>
  );
}
